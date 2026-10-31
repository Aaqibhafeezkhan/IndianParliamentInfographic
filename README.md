# Indian Parliament Explorer

An independent browser-based civic-data explorer for parliamentary representation across Lok Sabha and Rajya Sabha using a locally imported member dataset.

**Live demo:** https://aaqibhafeezkhan.github.io/IndianParliamentInfographic/

## Features

- Offline-first member explorer for both Houses.
- CSV and JSON import with normalization and validation.
- Local browser persistence; member workflows use the saved records rather than a live member API.
- Overview, search, filtering, sorting, analytics and cross-House comparisons.
- Member profiles, shareable view/filter URLs and filtered CSV export.
- Historical Parliament reference timeline and official activity links.
- Responsive GitHub Pages interface.

## Import member data

The application does not call the Digital Sansad API and does not bundle official member records. This removes the external API as a runtime dependency without assuming permission to redistribute official records.

1. Select **Import data** in the header.
2. Choose a CSV file with a header row or a JSON array.
3. A JSON object may wrap records in a `members`, `data` or `records` array.
4. The app validates and normalizes the records, then saves them in the current browser.
5. Once the page is loaded, disconnect from the network; member search, filters, analytics, comparisons, profiles and export continue using the saved data. A later visit still needs the static site assets to load.

Recognized headings include `name`/`memberName`, `house`/`chamber`, `party`/`partyName`, `state`/`stateName`, `constituency`/`constName`, `id`/`memberId`, `status`, `age`, `gender`, `terms`/`totalTerms`, `termList`/`term`, `profession`, `education`/`qualification`, and `officialProfile`/`profileUrl`.

Member name and House are required. House values may be `Lok Sabha`/`LS` or `Rajya Sabha`/`RS`. Optional missing values remain unavailable. IDs are generated from House and name when absent. Duplicate IDs and unsupported House values are rejected; a failed import does not replace the previous saved dataset.

Official reference directories:

- Lok Sabha: https://sansad.in/ls/members
- Rajya Sabha: https://sansad.in/rs/members

Imported records are user-provided. The local import timestamp is not a source publication date or proof of currentness or verification. Check source terms before copying or redistributing records. Use **Clear data** to remove the local dataset. Browser storage is not synchronized across devices.

## Data integrity

Attendance, questions, debates, bills, assets, liabilities and criminal-case values are not invented. Counts, shares, rankings and comparisons are derived from the imported records.

See [`SOURCES.md`](SOURCES.md), [`DATA-LICENSE.md`](DATA-LICENSE.md), and [`LICENSE.md`](LICENSE.md).

The **History** view links to official historical archives without embedding an unvalidated historical membership dataset. The **Activity** view links to official parliamentary resources but does not calculate member performance rankings.

## Validation

With Node.js 18 or newer, run:

```sh
node scripts/validate-data.mjs
node scripts/test-import.mjs
```

Both checks run locally without network requests.

## Deployment

The project remains a static GitHub Pages application. No server runtime or GitHub Actions workflow is required.

## Disclaimer

Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.
