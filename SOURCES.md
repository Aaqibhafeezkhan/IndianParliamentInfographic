# Data Sources & Methodology

Indian Parliament Explorer uses official Digital Sansad member sources for production membership data.

## Production sources

| Dataset | Official source | API | Coverage |
| --- | --- | --- | --- |
| Lok Sabha | https://sansad.in/ls/members | https://sansad.in/api_ls/member | 18th Lok Sabha sitting members |
| Rajya Sabha | https://sansad.in/rs/members | https://sansad.in/api_rs/member/sitting-members | Current sitting members |

Digital Sansad is the Parliament of India's official digital platform. The explorer retrieves member records at runtime so the displayed membership data reflects the official endpoints available when the page is loaded. The retrieval timestamp is shown in the application.

## Source-backed fields

The explorer treats member identity, house, party, state/UT, constituency where supplied, membership status, terms and available biographical fields as source-backed when returned by the official endpoint.

## Fields deliberately not inferred

Attendance, questions, debates, bills, assets, liabilities and criminal cases are not copied from the archived dataset and are not guessed from third-party sources. They remain unavailable until separately validated against authoritative records for the relevant scope and date.

## Derived values

Counts, party shares, state shares, house totals, rankings and comparisons are calculated from the official member records loaded by the application. They are derived statistics, not directly sourced facts.

## Freshness

The application records the retrieval time for each browser session. "Current" means current to the official endpoint response at retrieval time; it does not mean permanently current. Historical snapshots require a separately versioned dataset with an explicit as-of date.

## Archive

`legacy.html` is retained as an archival copy of the previous application. It is not used by the production loader and must not be treated as an authoritative data source.

## Reuse

The repository links to official sources for validation. Public accessibility does not automatically grant unrestricted rights to reproduce protected images, logos, PDFs or other assets. Third-party material should be reused only where its terms permit it.

## Independent project disclaimer

**Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.**

## Correction policy

A data correction should identify the affected field, official source used for verification, retrieval date and the scope/as-of date of the corrected record.
