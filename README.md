# Fusing Journal website

Standalone static marketing website for https://fusingjournal.com. Website files are in `site/`. There are no dependencies or build steps. Open `site/index.html` for a local preview, or serve the folder with any static HTTP server.

This repository contains only website assets, separate from the mobile app. The interactive sample project and CSS glass illustration are illustrative. Store links are pending.

## Deployment

In Settings → Pages, select **GitHub Actions** as the build source. The workflow publishes only `site/` after pushes to `main` or a manual workflow run. Private repository Pages requires an eligible GitHub paid plan. Keep the repository private; do not change its visibility to resolve hosting eligibility without the owner's approval.

In Settings → Pages, save **fusingjournal.com** as the custom domain before changing DNS. With an Actions deployment, the custom domain is configured in repository settings rather than a CNAME file. Enable Enforce HTTPS once the certificate is available.

At GoDaddy, configure the following website records after the custom domain is saved in GitHub:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | fnomore.github.io |

Replace conflicting website records only. Preserve email MX and email-related TXT/CNAME records. Review any existing apex AAAA records so they do not route IPv6 visitors to an old host. DNS and HTTPS issuance may take up to 24 hours. GitHub recommends verifying domain ownership in account Pages settings first; use the exact TXT record it provides.

Official setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Email confirmation

Public destination: **https://fusingjournal.com/email-confirmed.html**.

This page is not linked from the marketing site and requests no indexing. Supabase verifies the email before redirecting to the page; the page itself does not verify tokens or create sessions. It handles successful signup redirects and error redirects, and removes query/fragment tokens from the address bar without storing or forwarding them.

After the domain serves correctly over HTTPS, set Supabase Authentication → URL Configuration → Site URL to this full destination, because the current mobile signup does not pass `emailRedirectTo`. Add the exact destination to Redirect URLs for explicit redirects. Keep `{{ .ConfirmationURL }}` in the confirmation email template so clicking the email actually verifies the address. Do not replace that verification link with the landing page URL directly.

Check a fresh signup end to end: receive email, follow verification link, see confirmation page, and sign in through the mobile app. Also check expired-link handling. Supabase configuration is managed separately from this repository.
