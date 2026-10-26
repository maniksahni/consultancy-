/**
 * Branded Althéa emails. Inline styles and tables only: that is what Gmail, Outlook and Apple Mail render reliably.
 * Colours follow the website: deep ink, lilac-to-rose accent, warm ivory card.
 */

var BRAND = {
  ink: '#0b0a12', card: '#ffffff', paper: '#f7f3ee', text: '#1d1830', muted: '#6b6578', line: '#ece6dd',
  lilac: '#8b6dff', rose: '#ff6fa3', gold: '#c99a5b', green: '#1d9e75',
  logo: 'https://altheaconsulting.in/brand/icon-192-v20261025.png'
};

function esc_(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function whenClient_(b) {
  var start = new Date(b.start);
  return {
    day: fmt_(start, b.timeZone, 'EEEE d MMMM yyyy'),
    time: fmt_(start, b.timeZone, 'HH:mm') + '–' + fmt_(new Date(b.end), b.timeZone, 'HH:mm') + ' ' + fmt_(start, b.timeZone, 'z'),
    paris: fmt_(start, settings_().timeZone, 'HH:mm') + ' in Paris',
    short: fmt_(start, b.timeZone, 'EEE d MMM, HH:mm z')
  };
}

function googleCalendarLink_(b) {
  var f = function (iso) { return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent('Althéa consultation with ' + settings_().ownerName)
    + '&dates=' + f(b.start) + '/' + f(b.end)
    + '&details=' + encodeURIComponent('Google Meet: ' + b.meetLink)
    + '&location=' + encodeURIComponent(b.meetLink);
}

function button_(href, label, solid) {
  var bg = solid === false ? '#ffffff' : BRAND.lilac;
  var color = solid === false ? BRAND.text : '#ffffff';
  var border = solid === false ? '1px solid ' + BRAND.line : '0';
  var gradient = solid === false ? '' : 'background-image:linear-gradient(100deg,' + BRAND.lilac + ',' + BRAND.rose + ');';
  return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 8px 6px 0;display:inline-table"><tr><td style="border-radius:999px;background:' + bg + ';' + gradient + 'border:' + border + '">'
    + '<a href="' + esc_(href) + '" style="display:inline-block;padding:13px 24px;font:600 15px/1.2 Helvetica,Arial,sans-serif;color:' + color + ';text-decoration:none;border-radius:999px">' + esc_(label) + '</a></td></tr></table>';
}

function layout_(preheader, inner) {
  var s = settings_();
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    + '<body style="margin:0;padding:0;background:' + BRAND.paper + '">'
    + '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' + esc_(preheader) + '</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + BRAND.paper + '"><tr><td align="center" style="padding:24px 12px">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">'
    + '<tr><td style="background:' + BRAND.ink + ';border-radius:22px 22px 0 0;padding:26px 30px">'
    + '<table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    + '<td style="padding-right:12px"><img src="' + BRAND.logo + '" width="40" height="40" alt="" style="display:block;border-radius:10px"></td>'
    + '<td style="font:600 21px/1.1 Georgia,\'Times New Roman\',serif;color:#ffffff;letter-spacing:-.3px">' + esc_(s.brandName) + '</td>'
    + '</tr></table>'
    + '<div style="height:3px;margin-top:20px;border-radius:3px;background:' + BRAND.lilac + ';background-image:linear-gradient(90deg,' + BRAND.lilac + ',' + BRAND.rose + ',' + BRAND.gold + ')"></div>'
    + '</td></tr>'
    + '<tr><td style="background:' + BRAND.card + ';padding:30px;border-radius:0 0 22px 22px;font:400 15px/1.65 Helvetica,Arial,sans-serif;color:' + BRAND.text + '">' + inner
    + '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid ' + BRAND.line + ';padding-top:18px;width:100%"><tr><td style="font:400 14px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.muted + '">'
    + '<strong style="color:' + BRAND.text + ';font-family:Georgia,serif;font-size:16px">' + esc_(s.ownerName) + '</strong><br>' + esc_(s.ownerRole) + ' · Paris, France<br>'
    + '<a href="' + s.siteUrl + '" style="color:' + BRAND.lilac + ';text-decoration:none">altheaconsulting.in</a>'
    + '</td></tr></table></td></tr>'
    + '<tr><td style="padding:16px 8px;text-align:center;font:400 12px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.muted + '">'
    + esc_(s.brandName) + ' · Independent study, settling and career guidance from Paris.</td></tr>'
    + '</table></td></tr></table></body></html>';
}

function meetingCard_(b, w) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 6px;border-radius:16px;background:#f4f0ff;border:1px solid #e2dafe"><tr><td style="padding:18px 20px">'
    + '<div style="font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.lilac + '">Your 15-minute call</div>'
    + '<div style="margin-top:6px;font:600 22px/1.25 Georgia,serif;color:' + BRAND.text + '">' + esc_(w.day) + '</div>'
    + '<div style="margin-top:2px;font:600 17px/1.4 Helvetica,Arial,sans-serif;color:' + BRAND.text + '">' + esc_(w.time) + ' <span style="font-weight:400;color:' + BRAND.muted + '">(' + esc_(w.paris) + ')</span></div>'
    + '<div style="margin-top:8px;font:400 14px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.muted + '">Google Meet · ' + esc_(settings_().ownerName) + ' · Booking ' + esc_(b.id) + '</div>'
    + '</td></tr></table>';
}

var PREP_ITEMS = [
  ['Your current status', 'Where you are today (studying, working, gap year), and when you want to start.'],
  ['Your education background', 'Degree, university, passing year, grades or CGPA, and any backlogs or gaps.'],
  ['Your experience', 'Internships, jobs, projects, certifications and achievements, with dates.'],
  ['The problems you are facing', 'What is blocking you: choosing a country or course, budget, admission, visa, language or career doubts.'],
  ['Your top three questions', 'Write them down so we cover what matters most in 15 minutes.']
];

function prepBlock_(compact) {
  var items = PREP_ITEMS.map(function (p, i) {
    return '<tr><td valign="top" style="padding:8px 12px 8px 0;font:600 13px/1 Helvetica,Arial,sans-serif;color:#ffffff"><div style="width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background:' + BRAND.lilac + '">' + (i + 1) + '</div></td>'
      + '<td style="padding:6px 0;font:400 14.5px/1.55 Helvetica,Arial,sans-serif;color:' + BRAND.text + '"><strong>' + esc_(p[0]) + '</strong>' + (compact ? '' : '<br><span style="color:' + BRAND.muted + '">' + esc_(p[1]) + '</span>') + '</td></tr>';
  }).join('');
  return '<h2 style="margin:26px 0 8px;font:600 20px/1.25 Georgia,serif;color:' + BRAND.text + '">Before we meet, please be ready with</h2>'
    + '<table role="presentation" cellpadding="0" cellspacing="0" width="100%">' + items + '</table>'
    + (compact ? '' : '<div style="margin-top:14px;padding:14px 16px;border-radius:14px;background:' + BRAND.paper + ';font:400 14px/1.6 Helvetica,Arial,sans-serif;color:' + BRAND.text + '">'
      + '<strong>Keep handy:</strong> mark sheets or transcripts, your CV, test scores (IELTS, TOEFL, TEF/DELF, GRE/GMAT if any), a rough budget, and any courses or universities you have shortlisted.</div>');
}

function agendaBlock_() {
  var rows = [['0–3 min', 'We understand your profile and goal.'], ['3–12 min', 'Your options, honest advice and the problems you raised.'], ['12–15 min', 'Clear next steps and what to do this week.']];
  return '<h2 style="margin:26px 0 8px;font:600 20px/1.25 Georgia,serif;color:' + BRAND.text + '">How the 15 minutes will go</h2>'
    + '<table role="presentation" cellpadding="0" cellspacing="0" width="100%">' + rows.map(function (r) {
      return '<tr><td style="padding:7px 14px 7px 0;white-space:nowrap;font:600 13px/1.4 Helvetica,Arial,sans-serif;color:' + BRAND.lilac + '">' + r[0] + '</td><td style="padding:7px 0;font:400 14.5px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.text + ';border-bottom:1px solid ' + BRAND.line + '">' + r[1] + '</td></tr>';
    }).join('') + '</table>';
}

/**
 * Sends from the Hostinger mailbox through the Hostinger Mail API when HOSTINGER_MAIL_TOKEN is set: Hostinger signs
 * mail for altheaconsulting.in, so Gmail accepts it, and a copy lands in Sent. MailApp is the fallback: it reaches
 * Hostinger inboxes, but Gmail blocks it because Google cannot sign mail for the domain.
 */
function send_(to, subject, html, text, replyTo) {
  var s = settings_();
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('HOSTINGER_MAIL_TOKEN');
  if (token) {
    try {
      var call = function (method, path, body) {
        var res = UrlFetchApp.fetch('https://api.mail.hostinger.com/api/v1' + path, {
          method: method, contentType: 'application/json', muteHttpExceptions: true, headers: { Authorization: 'Bearer ' + token },
          payload: body ? JSON.stringify(body) : undefined
        });
        if (res.getResponseCode() >= 300) throw new Error('Hostinger Mail ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
        return res.getContentText() ? JSON.parse(res.getContentText()) : {};
      };
      var mailbox = props.getProperty('HOSTINGER_MAILBOX_ID');
      if (!mailbox) {
        var boxes = call('get', '/me').data.mailboxes;
        mailbox = (boxes.filter(function (m) { return m.address.toLowerCase() === s.ownerEmail.toLowerCase(); })[0] || boxes[0]).resourceId;
        props.setProperty('HOSTINGER_MAILBOX_ID', mailbox);
      }
      call('post', '/mailboxes/' + mailbox + '/send', { to: [to], displayName: s.brandName, subject: subject, html: html, text: text });
      return;
    } catch (err) {
      console.error(err);
    }
  }
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, body: text, name: s.brandName, replyTo: replyTo || s.ownerEmail });
}

/* ------------------------------------------------------------------ messages */

function sendClientConfirmation_(b) {
  var w = whenClient_(b), s = settings_();
  var inner = '<h1 style="margin:0 0 6px;font:600 28px/1.15 Georgia,serif;color:' + BRAND.text + '">Bonjour ' + esc_(b.firstName) + ', your call is booked.</h1>'
    + '<p style="margin:0;color:' + BRAND.muted + '">Thank you for choosing Althéa. ' + esc_(s.ownerName) + ' is looking forward to meeting you.</p>'
    + meetingCard_(b, w)
    + '<div style="margin:14px 0 4px">' + button_(b.meetLink, 'Join Google Meet') + button_(googleCalendarLink_(b), 'Add to Google Calendar', false) + '</div>'
    + '<p style="margin:6px 0 0;font-size:13px;color:' + BRAND.muted + '">Meet link: <a href="' + esc_(b.meetLink) + '" style="color:' + BRAND.lilac + '">' + esc_(b.meetLink) + '</a><br>A calendar invitation from Google is on its way too.</p>'
    + prepBlock_(false)
    + agendaBlock_()
    + '<h2 style="margin:26px 0 8px;font:600 20px/1.25 Georgia,serif;color:' + BRAND.text + '">Need to change the time?</h2>'
    + '<p style="margin:0">Reply to this email with your booking number <strong>' + esc_(b.id) + '</strong> and a few times that suit you.</p>';
  var text = 'Bonjour ' + b.firstName + ', your 15-minute call with ' + s.ownerName + ' is booked.\n\n' + w.day + '\n' + w.time + ' (' + w.paris + ')\nGoogle Meet: ' + b.meetLink + '\nBooking: ' + b.id + '\n\n'
    + 'Before we meet, please be ready with:\n' + PREP_ITEMS.map(function (p, i) { return (i + 1) + '. ' + p[0] + ': ' + p[1]; }).join('\n')
    + '\n\nKeep handy: mark sheets, CV, test scores, a rough budget and your shortlist.\n\nTo reschedule, reply to this email with your booking number.';
  send_(b.email, 'Your call with ' + s.ownerName + ' is booked · ' + w.short, layout_('Your 15-minute call is confirmed. Join with Google Meet.', inner), text);
}

function sendOwnerNotification_(b) {
  var s = settings_(), start = new Date(b.start);
  var paris = fmt_(start, s.timeZone, 'EEE d MMM, HH:mm');
  var clientTime = fmt_(start, b.timeZone, 'HH:mm z');
  // Only what the student filled in; the form asks for the help needed and where they are now.
  var rows = [['Help needed', b.message], ['Current status', b.currentStatus], ['From', b.homeCountry], ['WhatsApp', b.phone], ['Email', b.email], ['Destination', b.destination],
    ['Level', b.level], ['Intake', b.intake], ['Education', b.background], ['Experience', b.experience], ['Challenges', b.challenges], ['Found us via', b.source]]
    .filter(function (r) { return r[1]; });
  var inner = '<h1 style="margin:0 0 6px;font:600 28px/1.15 Georgia,serif;color:' + BRAND.text + '">New booking: ' + esc_(b.name) + '</h1>'
    + '<p style="margin:0;color:' + BRAND.muted + '">Booked on altheaconsulting.in. The Meet invitation is already in your Google Calendar.</p>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 6px;border-radius:16px;background:#f4f0ff;border:1px solid #e2dafe"><tr><td style="padding:18px 20px">'
    + '<div style="font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.lilac + '">15-minute call · ' + esc_(b.id) + '</div>'
    + '<div style="margin-top:6px;font:600 22px/1.25 Georgia,serif;color:' + BRAND.text + '">' + esc_(fmt_(start, s.timeZone, 'EEEE d MMMM yyyy')) + '</div>'
    + '<div style="margin-top:2px;font:600 17px/1.4 Helvetica,Arial,sans-serif;color:' + BRAND.text + '">' + esc_(fmt_(start, s.timeZone, 'HH:mm')) + ' Paris <span style="font-weight:400;color:' + BRAND.muted + '">(' + esc_(clientTime) + ' for ' + esc_(b.firstName) + ')</span></div>'
    + '<div style="margin-top:8px;font:400 14px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.muted + '">Google Meet · ' + esc_(b.email) + '</div>'
    + '</td></tr></table>'
    + '<div style="margin:16px 0 6px">' + button_(b.meetLink, 'Join Google Meet') + '</div>'
    + '<h2 style="margin:26px 0 8px;font:600 20px/1.25 Georgia,serif;color:' + BRAND.text + '">Student profile</h2>'
    + '<table role="presentation" cellpadding="0" cellspacing="0" width="100%">' + rows.map(function (r) {
      return '<tr><td valign="top" style="padding:9px 14px 9px 0;width:130px;font:600 13px/1.4 Helvetica,Arial,sans-serif;color:' + BRAND.muted + ';border-bottom:1px solid ' + BRAND.line + '">' + esc_(r[0]) + '</td><td style="padding:9px 0;font:400 14.5px/1.5 Helvetica,Arial,sans-serif;color:' + BRAND.text + ';border-bottom:1px solid ' + BRAND.line + '">' + esc_(r[1]) + '</td></tr>';
    }).join('') + '</table>'
    + '<div style="margin:18px 0 0">' + button_(s.siteUrl + '/admin', 'Open admin', false) + '</div>';
  var text = 'New booking ' + b.id + ': ' + b.name + '\n' + paris + ' Paris (' + clientTime + ' client)\nMeet: ' + b.meetLink + '\n\n' + rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
  send_(settings_().ownerEmail, 'New booking: ' + b.name + ' · ' + paris + ' Paris', layout_('New 15-minute consultation booked.', inner), text, b.email);
}

function sendReminder_(b, which) {
  var w = whenClient_(b), s = settings_();
  var title = which === 'day' ? 'See you tomorrow, ' + b.firstName + '.' : 'We start in one hour, ' + b.firstName + '.';
  var inner = '<h1 style="margin:0 0 6px;font:600 26px/1.2 Georgia,serif;color:' + BRAND.text + '">' + esc_(title) + '</h1>'
    + '<p style="margin:0;color:' + BRAND.muted + '">A quick reminder of your call with ' + esc_(s.ownerName) + '.</p>'
    + meetingCard_(b, w)
    + '<div style="margin:14px 0 4px">' + button_(b.meetLink, 'Join Google Meet') + '</div>'
    + prepBlock_(true)
    + '<p style="margin:18px 0 0;color:' + BRAND.muted + '">Join from a quiet place with a stable connection. Can\'t make it? Reply to this email and we will find a new time.</p>';
  var text = title + '\n' + w.day + ', ' + w.time + ' (' + w.paris + ')\nGoogle Meet: ' + b.meetLink;
  send_(b.email, (which === 'day' ? 'Tomorrow: ' : 'In 1 hour: ') + 'your call with ' + s.ownerName + ' · ' + w.short, layout_(title, inner), text);
}

function sendFeedbackRequest_(b) {
  var s = settings_();
  var base = s.siteUrl + '/feedback?id=' + encodeURIComponent(b.id) + '&t=' + encodeURIComponent(b.token);
  var stars = [1, 2, 3, 4, 5].map(function (n) {
    return '<td style="padding:0 4px"><a href="' + base + '&r=' + n + '" style="display:inline-block;width:46px;height:46px;line-height:46px;text-align:center;border-radius:50%;border:1px solid #e2dafe;background:#f4f0ff;font:600 18px/46px Helvetica,Arial,sans-serif;color:' + BRAND.lilac + ';text-decoration:none">' + n + '</a></td>';
  }).join('');
  var inner = '<h1 style="margin:0 0 6px;font:600 28px/1.15 Georgia,serif;color:' + BRAND.text + '">Merci, ' + esc_(b.firstName) + '. How was your call?</h1>'
    + '<p style="margin:0 0 18px;color:' + BRAND.muted + '">It takes ten seconds and helps ' + esc_(s.ownerName) + ' guide every student better. Tap a number: 1 is poor, 5 is excellent.</p>'
    + '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px"><tr>' + stars + '</tr></table>'
    + '<div style="margin:16px 0 0">' + button_(base, 'Tell us about your meeting') + '</div>'
    + '<h2 style="margin:26px 0 8px;font:600 20px/1.25 Georgia,serif;color:' + BRAND.text + '">Your next steps</h2>'
    + '<p style="margin:0">Keep your notes from today handy. If you would like Althéa to support your application, visa or move to France, simply reply to this email.</p>';
  var text = 'Merci ' + b.firstName + '! How was your call with ' + s.ownerName + '? Rate it in ten seconds: ' + base;
  send_(b.email, 'How was your call with ' + s.ownerName + '?', layout_('Rate your call in ten seconds.', inner), text);
}

function sendOwnerFeedback_(b, rating, comment) {
  var inner = '<div style="font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.green + '">Feedback · ' + esc_(b.id) + '</div>'
    + '<h1 style="margin:6px 0 4px;font:600 26px/1.2 Georgia,serif;color:' + BRAND.text + '">' + esc_(b.name) + ' rated the call ' + rating + '/5</h1>'
    + (comment ? '<p style="margin:12px 0 0;padding:14px 16px;border-radius:14px;background:' + BRAND.paper + '">“' + esc_(comment) + '”</p>' : '');
  send_(settings_().ownerEmail, 'Feedback ' + rating + '/5 from ' + b.name, layout_('New feedback from ' + b.name, inner), b.name + ' rated the call ' + rating + '/5. ' + comment, b.email);
}

/** Sends one branded client confirmation to the owner mailbox for design review. */
function previewEmails() {
  var me = settings_().ownerEmail;
  var start = new Date(Date.now() + 2 * 86400000);
  var b = { id: 'ALT-PREVIEW', token: 'preview', start: start.toISOString(), end: new Date(start.getTime() + 15 * 60000).toISOString(), timeZone: 'Asia/Kolkata',
    name: 'Rahul Sharma', firstName: 'Rahul', email: me, phone: '+91 98765 43210', destination: 'France', level: "Master's", intake: 'September 2027',
    currentStatus: 'Working professional', background: 'B.Tech CSE, 2023, 8.1 CGPA', experience: 'Software engineer at TCS, 2 years',
    challenges: 'Confused between France and Germany; budget around ₹25 lakh', message: "Master's in data science", source: 'Instagram', meetLink: 'https://meet.google.com/abc-defg-hij' };
  sendClientConfirmation_(b);
}
