/**
 * Althéa website content studio: pages, blog articles, media and site-wide SEO, edited from /admin.
 *
 * Everything lives in this spreadsheet (sheets "Pages", "Media", "SEO") and a Drive folder for photos.
 * The website build (GitHub Action) reads only PUBLISHED content through ?action=cms and turns it into
 * real static pages; drafts never leave this sheet. ?action=cmsVersion lets the publish workflow check
 * cheaply whether anything changed since the live site was built.
 */
var PAGE_HEADERS = ['Slug', 'Type', 'Status', 'Title', 'Excerpt', 'Body', 'Sort', 'Featured image', 'Image alt', 'Category', 'Author', 'Reading time', 'Layout', 'Show hero', 'In header', 'In footer', 'Meta title', 'Meta description', 'Created', 'Updated', 'Published at'];
var MEDIA_HEADERS = ['Id', 'Name', 'Path', 'Mime', 'Bytes', 'Width', 'Height', 'Alt', 'Uploaded'];
var PAGE_TYPES = ['blog', 'page', 'landing'];
var PAGE_LAYOUTS = ['standard', 'wide'];
var MEDIA_MIMES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
var MEDIA_MAX_BYTES = 8 * 1024 * 1024;
var BODY_MAX = 48000; // a Sheets cell holds 50,000 characters
var SEO_DEFAULTS = {
  instagram: 'https://www.instagram.com/helloharshitainparis/', linkedin: '', facebook: '', youtube: '',
  googleVerification: '', bingVerification: '',
  robotsDisallow: '', sitemapExclude: '',
  faq: '[]', llmsIntro: '',
  blogTitle: 'Study in France journal', blogIntro: 'Practical, checked guidance on studying, settling and working in France, written from Paris.'
};

function cmsSheets_() {
  var ss = spreadsheet_();
  var pages = sheet_(ss, 'Pages', PAGE_HEADERS);
  var media = sheet_(ss, 'Media', MEDIA_HEADERS);
  var seo = sheet_(ss, 'SEO', ['Key', 'Value']);
  return { ss: ss, pages: pages, media: media, seo: seo };
}

function cmsRows_(sh, headers) {
  if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getDisplayValues().map(function (r, i) {
    var o = { _row: i + 2 };
    headers.forEach(function (h, j) { o[h] = r[j]; });
    return o;
  });
}

function cmsPageView_(r) {
  return {
    slug: r['Slug'], type: r['Type'] || 'blog', status: r['Status'] || 'Draft', title: r['Title'], excerpt: r['Excerpt'], body: r['Body'],
    sort: Number(r['Sort']) || 0, image: r['Featured image'], imageAlt: r['Image alt'], category: r['Category'], author: r['Author'],
    readingTime: r['Reading time'], layout: r['Layout'] || 'standard', showHero: r['Show hero'] !== 'no', inHeader: r['In header'] === 'yes',
    inFooter: r['In footer'] === 'yes', metaTitle: r['Meta title'], metaDescription: r['Meta description'],
    created: r['Created'], updated: r['Updated'], publishedAt: r['Published at']
  };
}

function cmsMediaView_(r) {
  return { id: r['Id'], name: r['Name'], path: r['Path'], mime: r['Mime'], bytes: Number(r['Bytes']) || 0, width: Number(r['Width']) || 0, height: Number(r['Height']) || 0, alt: r['Alt'], uploaded: r['Uploaded'] };
}

function cmsSeo_(sh) {
  var out = {};
  Object.keys(SEO_DEFAULTS).forEach(function (k) { out[k] = SEO_DEFAULTS[k]; });
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 2).getDisplayValues().forEach(function (r) {
    var k = String(r[0]).trim();
    if (k in SEO_DEFAULTS) out[k] = String(r[1]);
  });
  return out;
}

function cmsSlug_(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

function cmsNow_() { return new Date().toISOString(); }

/* ------------------------------------------------------------------ admin */

function adminCms_() {
  var s = cmsSheets_();
  return {
    ok: true,
    pages: cmsRows_(s.pages, PAGE_HEADERS).filter(function (r) { return r['Slug']; }).map(cmsPageView_),
    media: cmsRows_(s.media, MEDIA_HEADERS).filter(function (r) { return r['Id']; }).map(cmsMediaView_).reverse(),
    seo: cmsSeo_(s.seo),
    version: cmsVersion_()
  };
}

function adminSavePage_(body) {
  var p = body.page || {};
  var type = PAGE_TYPES.indexOf(p.type) !== -1 ? p.type : 'blog';
  var title = clean_(p.title, 160);
  if (!title) return { ok: false, error: 'Add a title.' };
  var slug = cmsSlug_(p.slug || title);
  if (!slug) return { ok: false, error: 'The URL needs at least one letter or number.' };
  var reserved = (body.reserved || []).map(String);
  if (type !== 'blog' && reserved.indexOf(slug) !== -1) return { ok: false, error: '/' + slug + ' is already a page on the website. Choose another URL.' };
  var html = String(p.body || '');
  if (!html.trim()) return { ok: false, error: 'Write the content first.' };
  if (html.length > BODY_MAX) return { ok: false, error: 'The content is too long (' + html.length + ' characters, the limit is ' + BODY_MAX + '). Split it into two articles.' };
  var status = p.status === 'Published' ? 'Published' : 'Draft';

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var s = cmsSheets_();
    var rows = cmsRows_(s.pages, PAGE_HEADERS);
    var original = clean_(p.originalSlug, 80);
    var existing = rows.filter(function (r) { return r['Slug'] === (original || slug); })[0];
    var clash = rows.filter(function (r) { return r['Slug'] === slug && r !== existing; })[0];
    if (clash) return { ok: false, error: 'Another page already uses /' + slug + '. Choose a different URL.' };
    var now = cmsNow_();
    var publishedAt = existing && existing['Published at'] ? existing['Published at'] : (status === 'Published' ? now : '');
    var row = [
      slug, type, status, title, clean_(p.excerpt, 400), html, String(Math.round(Number(p.sort) || 0)),
      clean_(p.image, 300), clean_(p.imageAlt, 160), clean_(p.category, 60), clean_(p.author, 80) || settings_().ownerName,
      clean_(p.readingTime, 30), PAGE_LAYOUTS.indexOf(p.layout) !== -1 ? p.layout : 'standard',
      p.showHero === false ? 'no' : 'yes', p.inHeader ? 'yes' : 'no', p.inFooter ? 'yes' : 'no',
      clean_(p.metaTitle, 70), clean_(p.metaDescription, 170),
      existing ? existing['Created'] : now, now, publishedAt
    ];
    var target = existing ? existing._row : s.pages.getLastRow() + 1;
    s.pages.getRange(target, 1, 1, row.length).setNumberFormat('@').setValues([row]);
    return { ok: true, page: cmsPageView_(cmsRows_(s.pages, PAGE_HEADERS).filter(function (r) { return r['Slug'] === slug; })[0]), version: cmsVersion_() };
  } finally { lock.releaseLock(); }
}

function adminDeletePage_(body) {
  var slug = clean_(body.slug, 80);
  var s = cmsSheets_();
  var row = cmsRows_(s.pages, PAGE_HEADERS).filter(function (r) { return r['Slug'] === slug; })[0];
  if (!row) return { ok: false, error: 'That page no longer exists.' };
  s.pages.deleteRow(row._row);
  return { ok: true, version: cmsVersion_() };
}

function cmsMediaFolder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('MEDIA_FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { /* recreated below */ } }
  var folder = DriveApp.createFolder('Althéa website media');
  props.setProperty('MEDIA_FOLDER_ID', folder.getId());
  return folder;
}

function adminUploadMedia_(body) {
  var mime = String(body.mime || '');
  var ext = MEDIA_MIMES[mime];
  if (!ext) return { ok: false, error: 'Upload a JPG, PNG, WebP or GIF image.' };
  var bytes;
  try { bytes = Utilities.base64Decode(String(body.data || '')); } catch (e) { return { ok: false, error: 'That file could not be read.' }; }
  if (!bytes.length) return { ok: false, error: 'That file is empty.' };
  if (bytes.length > MEDIA_MAX_BYTES) return { ok: false, error: 'Images must be under 8 MB.' };
  var base = cmsSlug_(String(body.name || 'image').replace(/\.[a-z0-9]+$/i, '')) || 'image';
  var name = base + '-' + Utilities.getUuid().slice(0, 6) + '.' + ext;
  var file = cmsMediaFolder_().createFile(Utilities.newBlob(bytes, mime, name));
  // Shared by link so the admin can preview it before the site is rebuilt; IDs are unguessable.
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var s = cmsSheets_();
  var row = [file.getId(), name, '/uploads/' + name, mime, String(bytes.length), String(Math.round(Number(body.width) || 0)), String(Math.round(Number(body.height) || 0)), clean_(body.alt, 160), cmsNow_()];
  s.media.getRange(s.media.getLastRow() + 1, 1, 1, row.length).setNumberFormat('@').setValues([row]);
  return { ok: true, media: cmsMediaView_(cmsRows_(s.media, MEDIA_HEADERS).filter(function (r) { return r['Id'] === file.getId(); })[0]) };
}

function adminUpdateMedia_(body) {
  var s = cmsSheets_();
  var row = cmsRows_(s.media, MEDIA_HEADERS).filter(function (r) { return r['Id'] === String(body.id); })[0];
  if (!row) return { ok: false, error: 'That image no longer exists.' };
  s.media.getRange(row._row, MEDIA_HEADERS.indexOf('Alt') + 1).setNumberFormat('@').setValue(clean_(body.alt, 160));
  return { ok: true };
}

function adminDeleteMedia_(body) {
  var s = cmsSheets_();
  var row = cmsRows_(s.media, MEDIA_HEADERS).filter(function (r) { return r['Id'] === String(body.id); })[0];
  if (!row) return { ok: false, error: 'That image no longer exists.' };
  var used = cmsRows_(s.pages, PAGE_HEADERS).filter(function (p) { return p['Featured image'] === row['Path'] || String(p['Body']).indexOf(row['Path']) !== -1; }).map(function (p) { return p['Title']; });
  if (used.length && !body.force) return { ok: false, code: 'in-use', error: 'This image is used in: ' + used.join(', ') + '. Remove it there first.' };
  try { DriveApp.getFileById(row['Id']).setTrashed(true); } catch (e) { /* already gone from Drive */ }
  s.media.deleteRow(row._row);
  return { ok: true, version: cmsVersion_() };
}

function adminSaveSeo_(body) {
  var incoming = body.seo || {};
  var s = cmsSheets_();
  var current = s.seo.getLastRow() > 1 ? s.seo.getRange(2, 1, s.seo.getLastRow() - 1, 1).getDisplayValues().map(function (r) { return r[0]; }) : [];
  var url = function (v) { v = clean_(v, 200); return /^https:\/\/[^\s]+$/.test(v) ? v : ''; };
  var faq = [];
  try { faq = (Array.isArray(incoming.faq) ? incoming.faq : JSON.parse(incoming.faq || '[]')).slice(0, 40).map(function (f) { return { q: clean_(f.q, 200), a: clean_(f.a, 900) }; }).filter(function (f) { return f.q && f.a; }); } catch (e) { faq = []; }
  var values = {
    instagram: url(incoming.instagram), linkedin: url(incoming.linkedin), facebook: url(incoming.facebook), youtube: url(incoming.youtube),
    googleVerification: clean_(incoming.googleVerification, 100).replace(/[^\w-]/g, ''), bingVerification: clean_(incoming.bingVerification, 100).replace(/[^\w-]/g, ''),
    // One path per line, each starting with "/"; the site root itself can never be blocked.
    robotsDisallow: String(incoming.robotsDisallow || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(function (l) { return /^\/[\w\-./*?=&%]+$/.test(l); }).slice(0, 50).join('\n'),
    sitemapExclude: String(incoming.sitemapExclude || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(function (l) { return /^\/[\w\-./]+$/.test(l); }).slice(0, 200).join('\n'),
    faq: JSON.stringify(faq), llmsIntro: clean_(incoming.llmsIntro, 1200),
    blogTitle: clean_(incoming.blogTitle, 70) || SEO_DEFAULTS.blogTitle, blogIntro: clean_(incoming.blogIntro, 300) || SEO_DEFAULTS.blogIntro
  };
  Object.keys(values).forEach(function (k) {
    var i = current.indexOf(k);
    var r = i === -1 ? s.seo.getLastRow() + 1 : i + 2;
    if (i === -1) current.push(k);
    s.seo.getRange(r, 1, 1, 2).setNumberFormat('@').setValues([[k, values[k]]]);
  });
  return { ok: true, seo: cmsSeo_(s.seo), version: cmsVersion_() };
}

/* ------------------------------------------------------------------ public (read by the website build) */

function cmsPublished_() {
  var s = cmsSheets_();
  var pages = cmsRows_(s.pages, PAGE_HEADERS).filter(function (r) { return r['Slug'] && r['Status'] === 'Published'; }).map(cmsPageView_);
  var used = {};
  pages.forEach(function (p) {
    if (p.image) used[p.image] = true;
    (String(p.body).match(/\/uploads\/[\w\-.]+/g) || []).forEach(function (m) { used[m] = true; });
  });
  var media = cmsRows_(s.media, MEDIA_HEADERS).filter(function (r) { return r['Id'] && used[r['Path']]; }).map(cmsMediaView_);
  return { pages: pages, media: media, seo: cmsSeo_(s.seo) };
}

function cmsVersion_() {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, JSON.stringify(cmsPublished_()), Utilities.Charset.UTF_8);
  return digest.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}

function publicCms_() {
  var data = cmsPublished_();
  data.ok = true;
  data.version = cmsVersion_();
  return data;
}

/** Only files listed in the Media sheet AND used by published content can be fetched this way. */
function publicMediaFile_(id) {
  var data = cmsPublished_();
  var item = data.media.filter(function (m) { return m.id === id; })[0];
  if (!item) return { ok: false, error: 'Not found.' };
  var blob = DriveApp.getFileById(id).getBlob();
  return { ok: true, path: item.path, mime: item.mime, data: Utilities.base64Encode(blob.getBytes()) };
}
