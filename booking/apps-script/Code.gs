/**
 * Althéa Consulting · consultation booking backend.
 *
 * Runs inside Harshita's own Google account as a Google Apps Script web app, so there is
 * no server to host and no token that expires. The website calls it to:
 *   - list free 15-minute slots (her weekly hours minus everything already in her calendar)
 *   - book a slot: Google Calendar event with a Meet link, invite to client and owner,
 *     branded confirmation email, and a row in the "Althéa bookings" Google Sheet
 *   - record post-meeting feedback
 *   - power the admin page (clients, statuses, notes, availability), protected by ADMIN_KEY
 * A 5-minute trigger sends the 24-hour and 1-hour reminders and marks calls Completed when they end.
 * The feedback email is sent from the admin page, with the package Harshita writes for that student.
 *
 * Setup: see booking/SETUP.md. Run setup() once from the editor, then deploy as a web app.
 */

var DEFAULT_SETTINGS = {
  slotMinutes: 15,
  bufferMinutes: 5,
  maxPerDay: 8,
  minNoticeHours: 12,
  windowDays: 21,
  timeZone: 'Europe/Paris',
  siteUrl: 'https://altheaconsulting.in',
  ownerName: 'Harshita Kohli',
  ownerRole: 'Career Coach & France Expert',
  ownerEmail: 'harshita@altheaconsulting.in',
  brandName: 'Althéa Consulting',
  whatsapp: '33755749029'
};

var DEFAULT_AVAILABILITY = [
  ['Mon', '10:00', '16:00'], ['Tue', '10:00', '16:00'], ['Wed', '10:00', '16:00'],
  ['Thu', '10:00', '16:00'], ['Fri', '10:00', '16:00']
];

var BOOKING_HEADERS = ['ID', 'Token', 'Booked on', 'Status', 'Meeting (Paris time)', 'Start ISO', 'End ISO', 'Client time zone',
  'Name', 'Email', 'WhatsApp', 'Destination', 'Level', 'Intake', 'Current status', 'Education background', 'Work experience',
  'Challenges', 'Wants to explore', 'Found us via', 'Meet link', 'Calendar event ID',
  'Reminder 24h sent', 'Reminder 1h sent', 'Feedback email sent', 'Rating', 'Feedback', 'Notes', 'Home country', 'Package'];

var DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var STATUSES = ['Booked', 'Completed', 'Attended', 'No-show', 'Cancelled', 'New enquiry', 'Contacted'];

/* ------------------------------------------------------------------ setup */

/** Run once from the Apps Script editor: creates the sheet, default hours, admin key and the reminder trigger. */
function setup() {
  var ss = spreadsheet_();
  sheet_(ss, 'Bookings', BOOKING_HEADERS).getRange(1, 1, 2000, BOOKING_HEADERS.length).setNumberFormat('@');
  var availability = sheet_(ss, 'Availability', ['Day', 'Start (HH:MM, Paris)', 'End (HH:MM, Paris)']);
  if (availability.getLastRow() < 2) availability.getRange(2, 1, DEFAULT_AVAILABILITY.length, 3).setNumberFormat('@').setValues(DEFAULT_AVAILABILITY);
  sheet_(ss, 'Blocked dates', ['Date (YYYY-MM-DD)', 'Reason']);
  var settings = sheet_(ss, 'Settings', ['Key', 'Value']);
  if (settings.getLastRow() < 2) {
    var rows = Object.keys(DEFAULT_SETTINGS).map(function (key) { return [key, DEFAULT_SETTINGS[key]]; });
    settings.getRange(2, 1, rows.length, 2).setValues(rows);
  }
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ADMIN_KEY')) props.setProperty('ADMIN_KEY', Utilities.getUuid().replace(/-/g, '').slice(0, 20));
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'tick') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('tick').timeBased().everyMinutes(5).create();
  Logger.log('Sheet: ' + ss.getUrl());
  Logger.log('ADMIN KEY (use this to sign in at ' + DEFAULT_SETTINGS.siteUrl + '/admin): ' + props.getProperty('ADMIN_KEY'));
}

function spreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  var ss = SpreadsheetApp.create('Althéa bookings');
  props.setProperty('SHEET_ID', ss.getId());
  var first = ss.getSheets()[0];
  first.setName('Bookings');
  return ss;
}

function sheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1b1530').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

/* ------------------------------------------------------------------ http */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'slots';
  try {
    if (action === 'slots') return json_({ ok: true, timeZone: settings_().timeZone, durationMinutes: settings_().slotMinutes, slots: computeSlots_() });
    if (action === 'ping') return json_({ ok: true });
    return json_({ ok: false, error: 'Unknown action.' });
  } catch (err) {
    return json_({ ok: false, error: 'Times could not be loaded. Please try again.' });
  }
}

function doPost(e) {
  var body;
  try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, error: 'Bad request.' }); }
  try {
    switch (body.action) {
      case 'book': return json_(book_(body));
      case 'enquiry': return json_(enquiry_(body));
      case 'feedback': return json_(feedback_(body));
      case 'admin.data': return json_(adminGuard_(body) || adminData_());
      case 'admin.update': return json_(adminGuard_(body) || adminUpdate_(body));
      case 'admin.cancel': return json_(adminGuard_(body) || adminCancel_(body));
      case 'admin.sendFeedback': return json_(adminGuard_(body) || adminSendFeedback_(body));
      case 'admin.saveAvailability': return json_(adminGuard_(body) || adminSaveAvailability_(body));
      default: return json_({ ok: false, error: 'Unknown action.' });
    }
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Something went wrong. Please try again in a moment.' });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------ settings and availability */

function settings_() {
  if (settings_.cache) return settings_.cache;
  var out = {};
  Object.keys(DEFAULT_SETTINGS).forEach(function (k) { out[k] = DEFAULT_SETTINGS[k]; });
  var sh = spreadsheet_().getSheetByName('Settings');
  if (sh && sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues().forEach(function (r) {
      var key = String(r[0]).trim();
      if (!key || !(key in DEFAULT_SETTINGS)) return;
      out[key] = typeof DEFAULT_SETTINGS[key] === 'number' ? Number(r[1]) || DEFAULT_SETTINGS[key] : String(r[1] || DEFAULT_SETTINGS[key]);
    });
  }
  settings_.cache = out;
  return out;
}

/** { 1: [[600, 960]], ... } minutes after midnight in Paris; ISO weekday 1 = Monday. */
function availability_() {
  var out = {};
  var sh = spreadsheet_().getSheetByName('Availability');
  if (!sh || sh.getLastRow() < 2) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues().forEach(function (r) {
    var day = DAY_NAMES.indexOf(String(r[0]).trim().slice(0, 3)) + 1;
    var start = minutes_(r[1]), end = minutes_(r[2]);
    if (day < 1 || start === null || end === null || end <= start) return;
    (out[day] = out[day] || []).push([start, end]);
  });
  return out;
}

function blockedDates_() {
  var set = {};
  var sh = spreadsheet_().getSheetByName('Blocked dates');
  if (!sh || sh.getLastRow() < 2) return set;
  sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function (r) { var d = String(r[0]).trim(); if (/^\d{4}-\d{2}-\d{2}$/.test(d)) set[d] = true; });
  return set;
}

function minutes_(hhmm) {
  var m = String(hhmm).trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  var h = Number(m[1]), mi = Number(m[2]);
  return h > 24 || mi > 59 ? null : h * 60 + mi;
}

/* ------------------------------------------------------------------ time zones */

function offsetMinutes_(date, tz) {
  var s = Utilities.formatDate(date, tz, 'Z');
  var sign = s.charAt(0) === '-' ? -1 : 1;
  return sign * (Number(s.substr(1, 2)) * 60 + Number(s.substr(3, 2)));
}

/** The instant at local wall-clock time y-m-d h:mi in time zone tz (DST-safe). */
function zoned_(y, m, d, minutesOfDay, tz) {
  var guess = Date.UTC(y, m - 1, d, 0, minutesOfDay);
  var off = offsetMinutes_(new Date(guess), tz);
  var t = guess - off * 60000;
  var off2 = offsetMinutes_(new Date(t), tz);
  if (off2 !== off) t = guess - off2 * 60000;
  return new Date(t);
}

function validTz_(tz) {
  return typeof tz === 'string' && /^[A-Za-z_]+(\/[A-Za-z0-9_+\-]+){0,2}$/.test(tz) ? tz : 'Asia/Kolkata';
}

function fmt_(date, tz, pattern) { return Utilities.formatDate(date, tz, pattern); }

/* ------------------------------------------------------------------ slots */

function busy_(from, to) {
  var res = Calendar.Freebusy.query({ timeMin: from.toISOString(), timeMax: to.toISOString(), items: [{ id: 'primary' }] });
  return ((res.calendars && res.calendars.primary && res.calendars.primary.busy) || []).map(function (b) {
    return [new Date(b.start).getTime(), new Date(b.end).getTime()];
  });
}

function bookingsPerDay_(tz) {
  var counts = {};
  rows_().forEach(function (r) {
    if (r['Status'] !== 'Booked' || !r['Start ISO']) return;
    var key = fmt_(new Date(r['Start ISO']), tz, 'yyyy-MM-dd');
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

/** ISO start times of every free slot inside the booking window. */
function computeSlots_() {
  var s = settings_(), tz = s.timeZone;
  var now = new Date();
  var earliest = now.getTime() + s.minNoticeHours * 3600000;
  var until = new Date(now.getTime() + s.windowDays * 86400000);
  var busy = busy_(now, until);
  var hours = availability_(), blocked = blockedDates_(), perDay = bookingsPerDay_(tz);
  var buffer = s.bufferMinutes * 60000, length = s.slotMinutes * 60000;
  var out = [];
  for (var day = 0; day <= s.windowDays; day++) {
    var noon = new Date(now.getTime() + day * 86400000);
    var key = fmt_(noon, tz, 'yyyy-MM-dd');
    var weekday = Number(fmt_(noon, tz, 'u'));
    if (blocked[key] || !hours[weekday]) continue;
    var left = s.maxPerDay - (perDay[key] || 0);
    if (left <= 0) continue;
    var parts = key.split('-').map(Number);
    hours[weekday].forEach(function (range) {
      for (var m = range[0]; m + s.slotMinutes <= range[1]; m += s.slotMinutes) {
        if (left <= 0) return;
        var start = zoned_(parts[0], parts[1], parts[2], m, tz).getTime();
        if (start < earliest) continue;
        var end = start + length;
        var clash = busy.some(function (b) { return start < b[1] + buffer && end + buffer > b[0]; });
        if (!clash) out.push(new Date(start).toISOString());
      }
    });
  }
  return out;
}

/* ------------------------------------------------------------------ booking */

var FIELD_LIMITS = { fullName: 80, email: 120, phone: 32, targetCountry: 32, level: 40, intake: 40, currentStatus: 60, homeCountry: 60, background: 300, experience: 300, challenges: 500, message: 400, referralSource: 60 };

function clean_(value, limit) {
  return String(value == null ? '' : value).replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, limit);
}

function book_(body) {
  if (body.website) return { ok: false, error: 'Bad request.' };
  var d = {};
  Object.keys(FIELD_LIMITS).forEach(function (k) { d[k] = clean_(body[k], FIELD_LIMITS[k]); });
  d.email = d.email.replace(/\s/g, '').toLowerCase();
  if (!d.fullName || !d.phone || !d.message || !d.currentStatus || !d.homeCountry) return { ok: false, error: 'Please complete the required fields.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(d.email)) return { ok: false, error: 'Enter a valid email address.' };
  var start = new Date(body.start);
  if (isNaN(start.getTime())) return { ok: false, error: 'Choose a time for your call.' };
  var clientTz = validTz_(body.timeZone);

  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var already = rows_().filter(function (r) { return r['Email'] === d.email && r['Status'] === 'Booked' && new Date(r['Start ISO']).getTime() > Date.now(); })[0];
    if (already) return { ok: false, code: 'already-booked', error: 'You already have a call booked for ' + fmt_(new Date(already['Start ISO']), clientTz, 'EEE d MMM, HH:mm z') + '. Check your email for the Meet link, or reply to that email to change it.' };
    if (computeSlots_().indexOf(start.toISOString()) === -1) return { ok: false, code: 'slot-taken', error: 'That time was just taken. Please pick another slot.' };

    var s = settings_();
    var end = new Date(start.getTime() + s.slotMinutes * 60000);
    var id = 'ALT-' + fmt_(new Date(), s.timeZone, 'yyMMdd') + '-' + Utilities.getUuid().slice(0, 4).toUpperCase();
    var token = Utilities.getUuid().replace(/-/g, '');
    var event = Calendar.Events.insert({
      summary: 'Althéa consultation · ' + d.fullName,
      description: profileText_(d, id),
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: d.email, displayName: d.fullName }],
      conferenceData: { createRequest: { requestId: id, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 10 }, { method: 'email', minutes: 60 }] },
      guestsCanInviteOthers: false,
      guestsCanModify: false
    }, 'primary', { conferenceDataVersion: 1, sendUpdates: 'all' });
    var meet = event.hangoutLink || meetFromConference_(event) || '';

    var row = {};
    row['ID'] = id; row['Token'] = token; row['Booked on'] = fmt_(new Date(), s.timeZone, 'yyyy-MM-dd HH:mm');
    row['Status'] = 'Booked'; row['Meeting (Paris time)'] = fmt_(start, s.timeZone, 'EEE d MMM yyyy, HH:mm');
    row['Start ISO'] = start.toISOString(); row['End ISO'] = end.toISOString(); row['Client time zone'] = clientTz;
    row['Name'] = d.fullName; row['Email'] = d.email; row['WhatsApp'] = d.phone; row['Destination'] = d.targetCountry;
    row['Level'] = d.level; row['Intake'] = d.intake; row['Current status'] = d.currentStatus; row['Home country'] = d.homeCountry; row['Education background'] = d.background;
    row['Work experience'] = d.experience; row['Challenges'] = d.challenges; row['Wants to explore'] = d.message; row['Found us via'] = d.referralSource;
    row['Meet link'] = meet; row['Calendar event ID'] = event.id;
    appendRow_(row);

    var booking = bookingView_(row), confirmationSent = false, ownerNoticeSent = false;
    try {
      sendClientConfirmation_(booking);
      confirmationSent = true;
    } catch (emailError) {
      console.error('Client confirmation failed for ' + id + ': ' + emailError);
    }
    try {
      sendOwnerNotification_(booking);
      ownerNoticeSent = true;
    } catch (emailError) {
      console.error('Owner notification failed for ' + id + ': ' + emailError);
    }
    return { ok: true, id: id, start: booking.start, end: booking.end, meetLink: meet, timeZone: clientTz,
      confirmationSent: confirmationSent, ownerNoticeSent: ownerNoticeSent };
  } finally {
    lock.releaseLock();
  }
}

/** A "Learn French" request: saved as a client row (no call, no calendar event) for Harshita to follow up from admin. */
function enquiry_(body) {
  if (body.website) return { ok: false, error: 'Bad request.' };
  var name = clean_(body.name, 80), email = clean_(body.email, 120).replace(/\s/g, '').toLowerCase();
  var level = clean_(body.level, 40), goal = clean_(body.goal, 60), message = clean_(body.message, 600);
  var phone = clean_(body.phone, 32);
  if (!name || !phone || !level || !goal || !message) return { ok: false, error: 'Please complete the required fields.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { ok: false, error: 'Enter a valid email address.' };
  var s = settings_();
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var row = {};
    row['ID'] = 'FR-' + fmt_(new Date(), s.timeZone, 'yyMMdd') + '-' + Utilities.getUuid().slice(0, 4).toUpperCase();
    row['Booked on'] = fmt_(new Date(), s.timeZone, 'yyyy-MM-dd HH:mm');
    row['Status'] = 'New enquiry';
    row['Client time zone'] = validTz_(body.timeZone);
    row['Name'] = name; row['Email'] = email; row['WhatsApp'] = phone;
    row['Destination'] = 'Learn French'; row['Level'] = level; row['Intake'] = clean_(body.availability, 120);
    row['Wants to explore'] = goal + ': ' + message; row['Found us via'] = 'Learn French page';
    appendRow_(row);
    return { ok: true, id: row['ID'] };
  } finally {
    lock.releaseLock();
  }
}

function meetFromConference_(event) {
  var points = (event.conferenceData && event.conferenceData.entryPoints) || [];
  for (var i = 0; i < points.length; i++) if (points[i].entryPointType === 'video') return points[i].uri;
  return '';
}

/** Google controls the invitation email's appearance. Keep its event description concise and student-facing;
 * the student's private intake profile belongs only in the owner notification. */
function profileText_(d, id) {
  var s = settings_();
  return '<b>Your 15-minute call with ' + esc_(s.ownerName) + ' is booked.</b><br>'
    + esc_(s.brandName) + ' · Booking ' + esc_(id) + '<br><br>'
    + 'Join using the Google Meet link in this invitation.<br><br>'
    + '<b>Before we meet</b><br>Think about your current status, education and experience, the questions or challenges you want to discuss, and your top three priorities.<br><br>'
    + '<b>Keep handy</b><br>Transcripts or mark sheets, your CV, language or test scores, a rough budget and any courses or universities you have shortlisted.<br><br>'
    + 'Need to change the time? Reply to your confirmation email with booking number ' + esc_(id) + '.<br><br>'
    + '<a href="' + s.siteUrl + '">altheaconsulting.in</a>';
}

/* ------------------------------------------------------------------ sheet rows */

var headersChecked_ = false;
function bookingsSheet_() {
  var sh = sheet_(spreadsheet_(), 'Bookings', BOOKING_HEADERS);
  // Columns added later (e.g. 'Home country') get their header written once on an existing sheet.
  if (!headersChecked_) {
    var head = sh.getRange(1, 1, 1, BOOKING_HEADERS.length).getDisplayValues()[0];
    BOOKING_HEADERS.forEach(function (h, i) { if (!head[i]) sh.getRange(1, i + 1).setValue(h).setFontWeight('bold').setBackground('#1b1530').setFontColor('#ffffff'); });
    headersChecked_ = true;
  }
  return sh;
}

function rows_() {
  var sh = bookingsSheet_();
  if (sh.getLastRow() < 2) return [];
  var values = sh.getRange(1, 1, sh.getLastRow(), BOOKING_HEADERS.length).getDisplayValues();
  var head = values[0];
  return values.slice(1).map(function (v, i) {
    var o = { _row: i + 2 };
    head.forEach(function (h, c) { o[h] = v[c]; });
    return o;
  });
}

/** Values are stored as plain text; a leading = + - @ is escaped so nothing a visitor types runs as a formula. */
function safeCell_(value) {
  var v = value == null ? '' : String(value);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function appendRow_(row) {
  var sh = bookingsSheet_();
  var next = sh.getLastRow() + 1;
  sh.getRange(next, 1, 1, BOOKING_HEADERS.length).setNumberFormat('@')
    .setValues([BOOKING_HEADERS.map(function (h) { return safeCell_(row[h]); })]);
}

function setCell_(rowIndex, header, value) {
  bookingsSheet_().getRange(rowIndex, BOOKING_HEADERS.indexOf(header) + 1).setNumberFormat('@').setValue(safeCell_(value));
}

function findRow_(id) { return rows_().filter(function (r) { return r['ID'] === id; })[0]; }

/** Shape used by the email templates and the admin page. */
function bookingView_(r) {
  return {
    id: r['ID'], token: r['Token'], status: r['Status'], bookedOn: r['Booked on'],
    start: r['Start ISO'], end: r['End ISO'], timeZone: validTz_(r['Client time zone']),
    name: r['Name'], firstName: String(r['Name']).split(' ')[0], email: r['Email'], phone: r['WhatsApp'],
    destination: r['Destination'], level: r['Level'], intake: r['Intake'], currentStatus: r['Current status'], homeCountry: r['Home country'] || '',
    background: r['Education background'], experience: r['Work experience'], challenges: r['Challenges'],
    message: r['Wants to explore'], source: r['Found us via'], meetLink: r['Meet link'], eventId: r['Calendar event ID'],
    reminder24: r['Reminder 24h sent'], reminder1: r['Reminder 1h sent'], feedbackSent: r['Feedback email sent'],
    rating: r['Rating'], feedback: r['Feedback'], notes: r['Notes'], package: r['Package'] || ''
  };
}

/* ------------------------------------------------------------------ reminders and feedback (5-minute trigger) */

function tick() {
  var now = Date.now();
  rows_().forEach(function (r) {
    if (r['Status'] !== 'Booked' || !r['Start ISO']) return;
    var start = new Date(r['Start ISO']).getTime(), end = new Date(r['End ISO']).getTime();
    var booked = new Date(String(r['Booked on']).replace(' ', 'T') + ':00').getTime() || 0;
    var b = bookingView_(r);
    try {
      if (start - now < 26 * 3600000 && end > now && eventCancelled_(r['Calendar event ID'])) { setCell_(r._row, 'Status', 'Cancelled'); return; }
      if (!r['Reminder 24h sent'] && now >= start - 24 * 3600000 && now < start - 2 * 3600000) {
        if (start - booked > 26 * 3600000) sendReminder_(b, 'day');
        setCell_(r._row, 'Reminder 24h sent', 'yes');
      }
      if (!r['Reminder 1h sent'] && now >= start - 65 * 60000 && now < start) {
        if (start - booked > 2 * 3600000) sendReminder_(b, 'hour');
        setCell_(r._row, 'Reminder 1h sent', 'yes');
      }
      // The feedback email waits for Harshita: she adds the student's package in admin and sends it.
      if (now >= end) setCell_(r._row, 'Status', 'Completed');
    } catch (err) { console.error('tick ' + r['ID'] + ': ' + err); }
  });
}

function eventCancelled_(eventId) {
  if (!eventId) return false;
  try { return Calendar.Events.get('primary', eventId).status === 'cancelled'; } catch (err) { return false; }
}

function feedback_(body) {
  var r = findRow_(clean_(body.id, 40));
  if (!r || r['Token'] !== String(body.token)) return { ok: false, error: 'This feedback link is not valid.' };
  var rating = Math.round(Number(body.rating) || 0);
  if (rating < 1 || rating > 5) return { ok: false, error: 'Choose a rating from 1 to 5.' };
  var comment = clean_(body.comment, 1000);
  setCell_(r._row, 'Rating', rating);
  setCell_(r._row, 'Feedback', comment);
  if (r['Status'] === 'Completed') setCell_(r._row, 'Status', 'Attended');
  sendOwnerFeedback_(bookingView_(r), rating, comment);
  return { ok: true, firstName: String(r['Name']).split(' ')[0] };
}

/* ------------------------------------------------------------------ admin */

function adminGuard_(body) {
  var cache = CacheService.getScriptCache();
  var fails = Number(cache.get('admin-fails') || 0);
  if (fails >= 20) return { ok: false, error: 'Too many attempts. Try again in 15 minutes.' };
  var key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!key || String(body.key || '') !== key) {
    cache.put('admin-fails', String(fails + 1), 900);
    return { ok: false, code: 'unauthorized', error: 'Wrong admin key.' };
  }
  return null;
}

function adminData_() {
  var s = settings_();
  var bookings = rows_().map(function (r) { var v = bookingView_(r); delete v.token; return v; }).reverse();
  var availability = [];
  var hours = availability_();
  Object.keys(hours).forEach(function (day) { hours[day].forEach(function (rg) { availability.push({ day: DAY_NAMES[day - 1], start: hhmm_(rg[0]), end: hhmm_(rg[1]) }); }); });
  var blocked = [];
  var bsh = spreadsheet_().getSheetByName('Blocked dates');
  if (bsh && bsh.getLastRow() > 1) bsh.getRange(2, 1, bsh.getLastRow() - 1, 2).getDisplayValues().forEach(function (r) { if (r[0]) blocked.push({ date: r[0], reason: r[1] }); });
  return {
    ok: true, bookings: bookings, availability: availability, blocked: blocked, statuses: STATUSES,
    settings: { slotMinutes: s.slotMinutes, bufferMinutes: s.bufferMinutes, maxPerDay: s.maxPerDay, minNoticeHours: s.minNoticeHours, windowDays: s.windowDays, timeZone: s.timeZone },
    sheetUrl: spreadsheet_().getUrl()
  };
}

function hhmm_(m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }

function adminUpdate_(body) {
  var r = findRow_(clean_(body.id, 40));
  if (!r) return { ok: false, error: 'Booking not found.' };
  if (body.status && STATUSES.indexOf(body.status) !== -1) setCell_(r._row, 'Status', body.status);
  if (typeof body.notes === 'string') setCell_(r._row, 'Notes', clean_(body.notes, 2000));
  return { ok: true };
}

/** Package text keeps its line breaks; tags and control characters are removed. */
function cleanText_(value, limit) {
  return String(value == null ? '' : value).replace(/<[^>]*>/g, '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, limit);
}

/** Sends (or re-sends) the feedback email with the package Harshita wrote for this student. */
function adminSendFeedback_(body) {
  var r = findRow_(clean_(body.id, 40));
  if (!r) return { ok: false, error: 'Booking not found.' };
  if (!r['Start ISO']) return { ok: false, error: 'Feedback emails are for calls only.' };
  var pkg = cleanText_(body.package, 3000);
  setCell_(r._row, 'Package', pkg);
  var b = bookingView_(r);
  b.package = pkg;
  sendFeedbackRequest_(b);
  var sentOn = fmt_(new Date(), settings_().timeZone, 'yyyy-MM-dd HH:mm');
  setCell_(r._row, 'Feedback email sent', sentOn);
  if (r['Status'] === 'Booked') setCell_(r._row, 'Status', 'Completed');
  return { ok: true, sentOn: sentOn };
}

function adminCancel_(body) {
  var r = findRow_(clean_(body.id, 40));
  if (!r) return { ok: false, error: 'Booking not found.' };
  if (r['Calendar event ID']) {
    try { Calendar.Events.remove('primary', r['Calendar event ID'], { sendUpdates: 'all' }); } catch (err) { console.warn(err); }
  }
  setCell_(r._row, 'Status', 'Cancelled');
  return { ok: true };
}

function adminSaveAvailability_(body) {
  var ss = spreadsheet_();
  var rows = (body.availability || []).map(function (a) { return [String(a.day).slice(0, 3), String(a.start), String(a.end)]; })
    .filter(function (r) { return DAY_NAMES.indexOf(r[0]) !== -1 && minutes_(r[1]) !== null && minutes_(r[2]) !== null && minutes_(r[2]) > minutes_(r[1]); });
  var av = ss.getSheetByName('Availability');
  if (av.getLastRow() > 1) av.getRange(2, 1, av.getLastRow() - 1, 3).clearContent();
  if (rows.length) av.getRange(2, 1, rows.length, 3).setNumberFormat('@').setValues(rows);

  var blocked = (body.blocked || []).map(function (b) { return [String(b.date), clean_(b.reason, 120)]; }).filter(function (r) { return /^\d{4}-\d{2}-\d{2}$/.test(r[0]); });
  var bl = ss.getSheetByName('Blocked dates');
  if (bl.getLastRow() > 1) bl.getRange(2, 1, bl.getLastRow() - 1, 2).clearContent();
  if (blocked.length) bl.getRange(2, 1, blocked.length, 2).setNumberFormat('@').setValues(blocked);

  var st = ss.getSheetByName('Settings');
  var incoming = body.settings || {};
  var current = st.getLastRow() > 1 ? st.getRange(2, 1, st.getLastRow() - 1, 2).getValues() : [];
  ['slotMinutes', 'bufferMinutes', 'maxPerDay', 'minNoticeHours', 'windowDays'].forEach(function (key) {
    var value = Math.round(Number(incoming[key]));
    if (!isFinite(value) || value < 0 || value > 240) return;
    var idx = -1;
    current.forEach(function (r, i) { if (r[0] === key) idx = i; });
    if (idx === -1) st.appendRow([key, value]); else st.getRange(idx + 2, 2).setValue(value);
  });
  settings_.cache = null;
  return { ok: true };
}
