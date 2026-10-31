# Data Sources & Methodology

Indian Parliament Explorer automatically loads member records from the published JSON snapshots maintained by RTI Wiki. The application does not call Digital Sansad APIs directly.

## Member data sources

| Dataset | Runtime JSON source | Underlying source | Snapshot date |
| --- | --- | --- | --- |
| Lok Sabha | https://righttoinformation.wiki/static/data/ls-mps.json | Digital Sansad member directory / `sansad.in/api_ls/member` | Read from `meta.as_of` at runtime |
| Rajya Sabha | https://righttoinformation.wiki/static/data/rs-mps.json | Rajya Sabha Secretariat member directory at `rsdoc.nic.in/MemberGetData/getmemberall` | Read from `meta.as_of` at runtime |

Provider dataset catalogue and licensing: https://righttoinformation.wiki/static/data/csv/

The provider states that the member snapshots are regenerated weekly and publishes them under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Attribution: **RTI Wiki — righttoinformation.wiki**.

## Loading and caching

On first visit, the application requests both JSON snapshots and validates that each contains a metadata object and a sufficiently sized members array. It maps only the fields needed by the explorer into a normalized member record.

After a successful load, the normalized records are cached in browser local storage. On later visits, cached records are rendered immediately while the application checks the remote snapshots again. A failed refresh does not replace or delete the last successful cache. The Refresh data control retries the same sources.

The app displays each source's `meta.as_of` value separately from the browser retrieval timestamp. The source date is the provider's stated snapshot date, not a claim that every field was independently checked on that date. If a source snapshot is stale, the app may also be stale.

## Normalized fields

The application maps member name, House, party, state/UT, constituency where available, sitting status, terms, age, gender, profession and education where present. Rajya Sabha term information is displayed from the available oath and term-end dates. Optional values remain unavailable when the source does not provide them.

Attendance, questions, debates, bills, assets, liabilities and criminal-case fields are not inferred from biographical records. Derived counts and representation statistics are calculated from the loaded member records.

## Historical and activity references

The History view links to Parliament Digital Library material. The Activity view links to official parliamentary resources and does not calculate member performance rankings.

- Lok Sabha: https://sansad.in/ls/siteMap
- Lok Sabha House Business: https://sansad.in/ls/business
- Lok Sabha Committees: https://sansad.in/ls/committee/committee-members
- Rajya Sabha House Business: https://sansad.in/rs/house-business
- Rajya Sabha Dashboard: https://sansad.in/rs/dashboard
- Rajya Sabha Sitemap: https://sansad.in/rs/siteMap
- Parliament Digital Library: https://eparlib.sansad.in/

## Independent project

**Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.**
