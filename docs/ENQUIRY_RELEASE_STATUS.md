# Enquiry release status — 14 October 2026

Registered the `Althea public website` web app in consultancyworld2; existing Firestore database is `(default)` in nam5. SDK configuration is stored in ignored local environment configuration. No service-account credential is committed.

Real database transport verification passed: invalid payload denied; valid synthetic enquiry persisted with server timestamp; public read denied; authenticated administrator verified and deleted the QA record. This is transport/rules verification, **not** a successful production browser booking.

Production collection remains disabled until these missing values are supplied:
- reCAPTCHA v3 / Firebase App Check registration and site key for the public domains;
- owner-confirmed privacy contact and retention period;
- owner-confirmed WhatsApp/contact details (current links removed).

No success state is displayed for a failed or disabled submission. Schema, consent, honeypot, Firestore validation, success/error UI and destination prefill are implemented. Appointment confirmation remains separate from enquiry receipt.
