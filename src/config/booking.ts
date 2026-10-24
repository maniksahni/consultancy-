/**
 * Consultation booking backend: the Google Apps Script web app URL from booking/SETUP.md
 * (https://script.google.com/macros/s/…/exec). While empty, "Book now" sends the details on WhatsApp instead.
 */
export const bookingEndpoint = "https://script.google.com/macros/s/AKfycbynKSM_zh2iuIPyZ8hhy7JxIwpBoFNlzqvaqVz_Fulr3AqOmVUXvKFMa-kHQTFWtY79/exec";

/** Length of a consultation, in minutes. The backend's Settings sheet is the source of truth once live. */
export const meetingMinutes = 15;
