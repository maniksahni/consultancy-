# Switching on consultation booking (one time, about 20 minutes)

Everything runs inside **harshita@altheaconsulting.in**'s own Google account: free, no server, nothing that expires.
Until step 6 is done, the website's "Book now" sends the student's details on WhatsApp instead, so no enquiry is lost.

## 1. Make harshita@altheaconsulting.in a Google account (5 min)

The mailbox stays at Hostinger. This only adds Google Calendar, Meet, Sheets and Apps Script to the same address.

1. Open https://accounts.google.com/signup in a private browser window.
2. Enter name **Harshita Kohli**, birthday and gender.
3. On "Choose your Gmail address", click **Use your existing email** and type `harshita@altheaconsulting.in`.
4. Google emails a code to that address: open it in Hostinger webmail and enter the code.
5. Set a strong password and turn on 2-step verification.
6. Open https://calendar.google.com once and set **Settings → Time zone → (GMT+01:00) Paris**.

## 2. Let Google send email for altheaconsulting.in (2 min, stops emails going to spam)

In **Hostinger → Domains → altheaconsulting.in → DNS / Nameservers → DNS records**, edit the existing TXT record that starts with `v=spf1` so it reads exactly:

```
v=spf1 include:_spf.mail.hostinger.com include:_spf.google.com ~all
```

Keep only one `v=spf1` record. Changes can take up to an hour to apply.

## 3. Create the booking script (5 min)

Signed in as harshita@altheaconsulting.in:

1. Open https://script.google.com and click **New project**. Name it **Althéa bookings**.
2. Left bar: **⚙ Project Settings** → tick **Show "appsscript.json" manifest file in editor**.
3. Back in **Editor**, replace the contents of these files with the files in this folder:
   - `appsscript.json` ← `booking/apps-script/appsscript.json`
   - `Code.gs` ← `booking/apps-script/Code.gs`
   - click **+ → Script**, name it `Emails`, paste `booking/apps-script/Emails.gs`
4. Click **Save** (💾).

## 4. Run setup once (2 min)

1. In the function list at the top choose **setup**, click **Run**.
2. Google asks for permission: **Review permissions → harshita@altheaconsulting.in → Advanced → Go to Althéa bookings (unsafe) → Allow**.
   "Unsafe" only means Google hasn't reviewed your private script; it runs only in your account.
3. Open **Execution log**. It shows:
   - the link to the new **Althéa bookings** Google Sheet (clients, availability, blocked dates, settings)
   - your **ADMIN KEY**: copy it somewhere safe. You use it to sign in at https://altheaconsulting.in/admin

Optional: choose **previewEmails** and **Run** to receive every email design in your inbox.

## 5. Publish the script (2 min)

1. **Deploy → New deployment → ⚙ → Web app**.
2. Description `v1`, **Execute as: Me**, **Who has access: Anyone**. Click **Deploy**.
3. Copy the **Web app URL** (it ends in `/exec`).

## 6. Connect the website

Put the URL in `src/config/booking.ts`:

```ts
export const bookingEndpoint = "https://script.google.com/macros/s/…/exec";
```

Then build and deploy the site. Live slots, bookings, emails and the admin page now work.

## 7. Make student emails reach Gmail (5 min, needed)

Google can't sign email for altheaconsulting.in from a personal Google account, so Gmail blocks those emails ("Message blocked"). The script sends through Hostinger instead, which signs for the domain and keeps a copy in Sent:

1. **Hostinger → Emails → altheaconsulting.in → Agentic mail → API access → Set up**: create a token for harshita@altheaconsulting.in and copy it (it is shown once).
2. Apps Script → **⚙ Project Settings → Script Properties → Add property**: `HOSTINGER_MAIL_TOKEN` = the token.
3. Paste the new `appsscript.json` (it adds permission to call Hostinger), run **previewEmails** once and allow the new permission, then publish a new version (below).

If Hostinger ever fails, emails fall back to Google automatically.

## Everyday use

- **Change hours, holidays, call length:** https://altheaconsulting.in/admin → **Availability** (or edit the Sheet).
- **See clients:** admin → **Upcoming** / **All clients**, or the Google Sheet.
- **Cancel a call:** admin → **Cancel call** (Google emails the student). Deleting the event in Google Calendar also works.
- **Anything already in your Google Calendar blocks those times automatically.**

## What happens on each booking

1. Google Calendar event with a Meet link; invite to the student and to you.
2. Branded email to the student: Meet link, time in their zone and Paris time, preparation checklist, how the 15 minutes go.
3. Email to you with the student's full profile and a Join Meet button.
4. A row in the Google Sheet.
5. Reminder emails 24 hours and 1 hour before (skipped if booked very late).
6. Within 5 minutes of the call ending: "How was your call?" email with a 1–5 rating; answers appear in admin → Feedback and are emailed to you.

## Updating the script later

Edit the code, then **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. The URL stays the same.
