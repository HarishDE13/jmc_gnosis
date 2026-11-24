# JMC Gnosis website

Free UGC-NET / SET Journalism & Mass Communication study material. English site; live classes in Tamil are coming soon.
Plain HTML, CSS and JavaScript with no build step. Edit a file on GitHub, commit, and the live site updates in about a minute.

Live site: https://harishde13.github.io/jmc_gnosis/

## Quick edits

| What | Where |
| --- | --- |
| Instagram handle, WhatsApp number, email | `assets/js/config.js` (empty values are hidden on the site) |
| Study materials and their Google Drive links | `assets/js/materials-data.js` |
| Unit names and focus lines | `assets/js/materials-data.js` (`GNOSIS_UNITS`) |

## Easiest way: manage materials from a Google Sheet

The site can read its materials list straight from a Google Sheet, so adding a row is all it takes.

1. Create a Google Sheet and import `JMC-Gnosis-materials-template.csv` (File → Import → Upload → Replace current sheet).
2. File → Share → **Publish to web** → choose the sheet tab and **Comma-separated values (.csv)** → Publish. Copy the link.
3. Paste that link into `sheetCsvUrl` in `assets/js/config.js` (one time only).

Columns: **Title**, **Type** (Guide, Notes, PYQ, Revision, Practice paper), **Unit** (1–10 or "Whole paper"), **Link** (Drive link, sharing set to "Anyone with the link"), **Date added** (YYYY-MM-DD), **Featured** (Yes on one row: the guide shown on Home and Guide pages), **Description** (optional), **Show** (No hides a row).
New rows appear on the site within about 5 minutes. If the sheet can't be reached, the site falls back to `materials-data.js`.

## Add a new study material (without the sheet)

1. Upload the PDF to Google Drive and set sharing to **Anyone with the link**.
2. Open `assets/js/materials-data.js` on GitHub and click the pencil icon.
3. Paste the Drive link into the `url` of the matching line (or copy a line and edit it), and set `added` to today's date:
   ```js
   { unit: 3, type: "notes", title: "Unit 3 notes: reporting & editing", url: "https://drive.google.com/file/d/.../view?usp=sharing", added: "2026-12-01" },
   ```
4. Commit. The file gets **Quick look** (in-page preview) and **Download PDF** buttons, plus a NEW tag for 21 days.

The JRF Cracking Guide is the line with `featured: true`. Its link powers the preview and Download PDF buttons on the home, guide and materials pages.

## Pages

- `index.html` home
- `guide.html` JRF Cracking Guide reader with download
- `materials.html` free downloads with search, unit and type filters
- `classes.html` live classes in Tamil (coming soon)
- `links.html` link-in-bio page for Instagram: `https://harishde13.github.io/jmc_gnosis/links.html`
- `about.html`, `contact.html`, `privacy.html`, `404.html`

## Custom domain (later)

In GitHub go to **Settings → Pages → Custom domain**, enter your domain and add the DNS records GitHub shows. Then replace `https://harishde13.github.io/jmc_gnosis/` with your domain in the HTML `<head>` tags, `robots.txt` and `sitemap.xml`.
