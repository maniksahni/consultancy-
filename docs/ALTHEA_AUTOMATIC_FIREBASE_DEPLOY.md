# Althéa Consulting — one-time Firebase authorization, then automatic production deployment

## Current Firebase Hosting setup

- GitHub repo: `maniksahni/consultancy-`
- Firebase project ID: `consultancyworld2`
- Existing Firebase Hosting default site: `https://consultancyworld2.web.app`
- Workflow: `.github/workflows/althea-deploy.yml` runs automatically after **every push/merge to `main`** (and supports manual runs).
- The same Firebase Hosting live-channel deployment appears on every custom domain **already connected to the same Hosting site**. There is no separate command to publish to the custom domain.
- The custom domain has **not yet been verified by this repository**. Do not assume `altheaconsulting.in` is registered or connected merely because it was considered as a candidate.

## One-time setup A — register and connect your actual domain

1. In https://console.firebase.google.com/project/consultancyworld2/hosting/sites open the `consultancyworld2` Hosting site.
2. Select **Add custom domain**. Enter the *actually purchased* exact hostname (e.g. `altheaconsulting.in` only if that is yours).
3. Add the DNS records exactly as displayed by the Firebase **Hosting** setup wizard at the domain registrar. Do not copy DNS IP values from old guides.
4. Wait for status **Connected** and valid HTTPS. Prefer one canonical hostname; set a redirect for the other (`www` versus apex) in the Firebase wizard.
5. Under GitHub repository **Settings → Secrets and variables → Actions → Variables**, add `ALTHEA_CUSTOM_DOMAIN` with the exact hostname **without `https://`, path, or trailing slash**. This sets the build's canonical URL and the postdeploy verification target.
6. Until `ALTHEA_CUSTOM_DOMAIN` is configured, canonical URLs and deploy checks use `consultancyworld2.web.app`. Never index unconnected hostnames.

## One-time setup B — authorize GitHub without sharing keys in chat

**Preferred Firebase-supported setup:** With access to the correct Firebase project and GitHub repository, run the following from a checked-out copy of the repo on your own machine:

```sh
npx firebase-tools login
npx firebase-tools init hosting:github
```

Follow the authenticated prompts for Firebase project `consultancyworld2` and GitHub repo `maniksahni/consultancy-`. Firebase CLI will provision a deploy-capable service account and store its JSON **encrypted in GitHub Secrets**; you do not need to copy the key to a chat.

**Important:** You already have a tested production workflow. Do not commit another generated untested `deploy-prod.yml` in addition to it. This existing workflow accepts either repo secret:
- `FIREBASE_SERVICE_ACCOUNT_CONSULTANCYWORLD2` (preferred)
- `FIREBASE_SERVICE_ACCOUNT` (fallback)

If the setup wizard picked another name, adjust the secret *reference* or create the correctly named GitHub Actions secret using secure GitHub Settings; never commit a private key into the repo or send it through ChatGPT.

Alternative: in GCP IAM for Firebase project `consultancyworld2`, create a dedicated minimal-permission deploy service account per the Firebase Hosting Action docs, then put its entire JSON in the repo's **Actions secret** `FIREBASE_SERVICE_ACCOUNT_CONSULTANCYWORLD2`. Limit key access, rotate on suspicion of exposure, and do not reuse personal credentials.

GitHub Actions settings links:
- Secrets: https://github.com/maniksahni/consultancy-/settings/secrets/actions
- Variables: https://github.com/maniksahni/consultancy-/settings/variables/actions
- Deploy workflow: https://github.com/maniksahni/consultancy-/actions/workflows/althea-deploy.yml

## Release gate and guarantee

On every main push the workflow will:
1. **Fail loudly** when the service-account secret is absent or belongs to another Firebase project. It will never quietly skip deployment while appearing successful.
2. Install locked dependencies, type-check, build Next.js static export using the configured canonical host, and validate its SEO/sitemap/JSON-LD/size budgets.
3. Check responsive layouts and interactions across existing QA viewports. Failing tests **block the live deploy**.
4. Embed a public, non-secret `/deploy-meta.json` file holding the built Git commit SHA.
5. Deploy the **tested** export to Firebase Hosting's `live` channel (project `consultancyworld2`).
6. Fetch the marker over HTTPS from the custom domain (or default web.app URL if no domain variable yet), verifying the *exact new SHA*. Any failed public verification reports a **failed** workflow.

This deploy automation is persistent once the one-time credential and domain configuration are supplied, even when no ChatGPT conversation is open. It does **not** grant ChatGPT access to your private Firebase credentials.

## Troubleshooting

- Missing key → credential validation fails before the build. Configure Firebase CLI GitHub integration once.
- Correct key, incorrect permissions → deploy action fails; review deploy service-account IAM roles.
- Deploy succeeds, domain check fails → verify that the domain is connected to the **same Firebase Hosting site**, verify registrar DNS and SSL, then retry the workflow.
- Domain value with `https://` → workflow rejects malformed values; supply hostname only.
- Wrong custom-domain canonical → update `ALTHEA_CUSTOM_DOMAIN`, rebuild and redeploy.
- Two rapid merges → concurrency prevents overlapping production deployments.
- No release should claim success unless the workflow's final domain SHA verification passes.
