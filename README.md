# Indian Parliament Explorer

An independent, browser-based civic-data explorer for exploring current parliamentary representation from official Digital Sansad member sources.

**Live demo:** https://aaqibhafeezkhan.github.io/IndianParliamentInfographic/

## Current scope

- Official-source Lok Sabha and Rajya Sabha member loading at runtime.
- Overview of house, party and state representation.
- Search and filtering across official member records.
- Member profiles and side-by-side comparison.
- Calculated representation analytics.
- CSV export of the loaded official member directory.
- Explicit provenance and data-freshness information.
- Shareable URLs that preserve the selected view and member-directory filters.
- Keyboard-accessible member-row selection and direct links to member profiles.
- Historical Parliament reference timeline with official archival links.
- Official parliamentary activity discovery links for questions, debates, legislation and committees.
- Responsive GitHub Pages interface.

## Data and validation

Production member data is retrieved from Digital Sansad at runtime:

- Lok Sabha: https://sansad.in/ls/members
- Rajya Sabha: https://sansad.in/rs/members

The application does not use `legacy.html` as a production data source. That file is retained as an archive of the previous implementation. Presentation and interface behavior are separated into `styles.css` and `app.js`; current official-source normalization lives in `data/official-loader.js`.

Run the dependency-free checks with Node.js 18 or newer:

```sh
node scripts/validate-data.mjs
node scripts/check-live-data.mjs
```

The first command checks repository contracts and source metadata without making network requests. The second requests both official endpoints, validates response shape, duplicate IDs and required identity fields, and reports missing party/state values and record counts. It retries transient failures and exits non-zero for invalid responses. It does not store member records or make claims about data-reuse rights.

To save a local JSON quality report (containing counts and issue summaries, not member records):

```sh
node scripts/check-live-data.mjs --report live-data-report.json
```

To compare counts with a previous report:

```sh
node scripts/check-live-data.mjs --baseline live-data-report.json
```

Live endpoint availability and response shape can change. A successful check is not a manual audit of every member record and is not a legal determination that the source data can be redistributed.

Performance and declaration fields such as attendance, questions, debates, bills, assets, liabilities and criminal cases are not invented or inherited from the archive. They remain unavailable until separately validated from authoritative records.

See [`SOURCES.md`](SOURCES.md) for provenance and methodology, [`DATA-LICENSE.md`](DATA-LICENSE.md) for reuse boundaries, and [`LICENSE.md`](LICENSE.md) for the license covering original project code.

The **History** view indexes the 1st–18th Lok Sabha chronology and links to the Parliament Digital Library for historical member research. Rajya Sabha history is linked to official Rajya Sabha publications. Historical political statistics and complete historical membership datasets are not embedded unless separately validated.

The **Activity** view links to official Digital Sansad resources for questions, debates, legislation and committees. Activity records are not copied into the application and are not used to calculate member performance or participation rankings.

## Deployment

The project remains a static GitHub Pages application. No server runtime or GitHub Actions workflow is required.

## Disclaimer

Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.
