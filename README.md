# JMC Genosis website

Free UGC-NET / SET Journalism & Mass Communication study materials in Tamil and English.
Plain HTML, CSS and JavaScript. No build step: edit a file on GitHub, commit, and the site updates in about a minute.

Live site: https://harishde13.github.io/jmc_genosis/

## Before launch: fill these in

| What | Where |
| --- | --- |
| Instagram handle, WhatsApp number, email | `assets/js/config.js` |
| Download links for each PDF | `assets/js/materials-data.js` (the `url` field) |
| Founder / teacher names and photo | `about.html` (look for the yellow "to fill" note) |
| Unit names (check against the official UGC syllabus, code 063) | `assets/js/materials-data.js` (`GENOSIS_UNITS`) |
| Tamil wording review by a native speaker | `assets/js/main.js` (the `TA` list at the top) |

Anything not filled in shows a small yellow **to fill** tag on the site.

## Add a new study material

1. Upload the PDF to Google Drive. Set sharing to **Anyone with the link**.
2. Open `assets/js/materials-data.js` on GitHub and click the pencil icon.
3. Paste the link into the `url` of the matching line, or copy a line and change it. Example:
   ```js
   { unit: 3, lang: "ta", type: "notes", title: "Unit 3 notes in Tamil", titleTa: "அலகு 3 குறிப்புகள் (தமிழ்)", url: "https://drive.google.com/...", added: "2026-12-01" },
   ```
4. Commit. The file shows a **Download PDF** button (and a NEW tag for 14 days).

## Pages

- `index.html` home
- `materials.html` free downloads with unit, language and type filters
- `links.html` link-in-bio page: put `https://harishde13.github.io/jmc_genosis/links.html` in your Instagram bio
- `about.html`, `contact.html`, `privacy.html`, `404.html`

## Custom domain (later)

Buy a domain (for example `jmcgenosis.in`), then in GitHub go to **Settings → Pages → Custom domain**, enter it, and add the DNS records GitHub shows. After that, replace `https://harishde13.github.io/jmc_genosis/` with your domain in the HTML `<head>` tags, `robots.txt` and `sitemap.xml`.
