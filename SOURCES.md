# Data Sources & Methodology

Indian Parliament Explorer is an offline-first viewer. Member records are supplied by the user through CSV or JSON import and stored in the browser. The production application does not call Digital Sansad APIs and does not bundle official member records.

## Reference sources

| Dataset | Official reference directory | Application behavior |
| --- | --- | --- |
| Lok Sabha | https://sansad.in/ls/members | Manual verification or preparation of an imported file |
| Rajya Sabha | https://sansad.in/rs/members | Manual verification or preparation of an imported file |

These links are references only. The member directory, search, filters, analytics, comparison, profiles and CSV export do not require access to these websites.

## Import contract

The app accepts CSV with a header row or JSON arrays / objects containing a `members`, `data` or `records` array. Member name and House are required. Party, state/UT, constituency, status, terms and biographical fields are optional. House values normalize to `Lok Sabha` or `Rajya Sabha`.

Imported records are labelled user-provided. The app records the local import timestamp and filename; it does not infer source publication date, verification status or current membership status. Data is stored in browser local storage and is not uploaded.

## Derived values and freshness

Counts, party shares, state shares, House totals, rankings and comparisons are calculated from imported records. The import timestamp indicates when the file was loaded, not its data as-of date. Users should verify the actual source and date before drawing current conclusions. Once the page is loaded, member calculations and directory interactions use the saved local records without a member-data API request. A later visit still requires the static site assets to load.

## Archive and reuse

`legacy.html` is archival only and is not loaded by the production app. Public accessibility does not automatically grant rights to reproduce protected datasets, photographs, logos or PDFs. The app does not download official records or redistribute an official-source snapshot. Users are responsible for confirming the permitted use of files they import.

## Correction reporting

Use the [repository issue form](https://github.com/Aaqibhafeezkhan/IndianParliamentInfographic/issues/new?template=blank). Include member name/ID, field, dataset filename, as-of date if known, and reference URL.

## Independent project

**Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.**

## Shareable navigation

View and filter state is stored in the URL. Member profile fragments identify records in the locally imported dataset; recipients must import a compatible dataset in their own browser for those links to resolve.

## Historical and activity references

The History view links to Parliament Digital Library material. The Activity view links to official parliamentary resources and does not copy activity records into the app.

- Lok Sabha: https://sansad.in/ls/siteMap
- Lok Sabha House Business: https://sansad.in/ls/business
- Lok Sabha Committees: https://sansad.in/ls/committee/committee-members
- Rajya Sabha House Business: https://sansad.in/rs/house-business
- Rajya Sabha Dashboard: https://sansad.in/rs/dashboard
- Rajya Sabha Sitemap: https://sansad.in/rs/siteMap
- Parliament Digital Library: https://eparlib.sansad.in/
