# Indian Parliament Explorer

An independent browser-based civic-data explorer for parliamentary representation across Lok Sabha and Rajya Sabha.

**Live demo:** https://aaqibhafeezkhan.github.io/IndianParliamentInfographic/

## Features

- Automatic first-visit loading of Lok Sabha and Rajya Sabha member records.
- Browser caching and a manual **Refresh data** action.
- Source snapshot dates and browser retrieval time shown separately.
- Overview, search, filtering, sorting, analytics and cross-House comparisons.
- Member profiles, shareable view/filter URLs and filtered CSV export.
- Historical Parliament reference timeline and official activity links.
- Responsive GitHub Pages interface.

## Automatic member data

Visitors do not need to upload a file. The application retrieves the two published JSON snapshots from RTI Wiki:

- Lok Sabha: https://righttoinformation.wiki/static/data/ls-mps.json
- Rajya Sabha: https://righttoinformation.wiki/static/data/rs-mps.json

The snapshots are attributed to RTI Wiki and are published under **CC BY 4.0**. The underlying member records are sourced from Digital Sansad / the Rajya Sabha Secretariat, with some biographical enrichment from Wikipedia. See [SOURCES.md](SOURCES.md) and [DATA-LICENSE.md](DATA-LICENSE.md).

The app caches a successful response in browser storage. On later visits it displays the cached records immediately and checks the source again. If a refresh fails, the last successful cache remains available. Use **Refresh data** to retry manually.

The source's `meta.as_of` date is shown separately from the browser retrieval timestamp. A successful download does not mean the source snapshot is real-time or independently verified by this project. Check the displayed as-of dates before relying on time-sensitive membership details.

## Data integrity

Only fields present in the source snapshots are mapped into the explorer. Attendance, questions, debates, bills, assets, liabilities and criminal-case values remain unavailable unless separately validated from authoritative records. Counts, shares, rankings and comparisons are derived from the loaded member records.

The application does not call Digital Sansad APIs directly. It retrieves the published RTI Wiki JSON files, so member data loading does not depend on the Sansad API being available to each visitor.

## Validation

With Node.js 18 or newer, run:

```sh
node scripts/validate-data.mjs
node scripts/test-import.mjs
```

## Deployment

The project remains a static GitHub Pages application. No server runtime is required.

## Disclaimer

Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.
