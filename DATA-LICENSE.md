# Data and third-party material reuse audit

## Scope

The MIT license in LICENSE.md applies only to original project code and documentation owned by the repository copyright holder. It does not license third-party material.

## Current production inputs

| Material | Source | Current handling | Reuse status |
| --- | --- | --- | --- |
| Lok Sabha member records | RTI Wiki JSON snapshot; underlying source: Digital Sansad | Retrieved at runtime, normalized and cached in the visitor's browser | RTI Wiki publishes the snapshot under CC BY 4.0; attribution is displayed and documented |
| Rajya Sabha member records | RTI Wiki JSON snapshot; underlying source: Rajya Sabha Secretariat | Retrieved at runtime, normalized and cached in the visitor's browser | RTI Wiki publishes the snapshot under CC BY 4.0; attribution is displayed and documented |
| Biographical enrichment | Wikipedia, as included by the provider | Only selected member fields are mapped; biographies are not reproduced | Subject to the applicable source terms and attribution |
| Historical references | https://eparlib.sansad.in/ and official Rajya Sabha publications | Links and limited chronology metadata | Rights for copied publication material must be reviewed separately |
| Archived implementation | legacy.html | Kept as archive; excluded from production loading | Field-level provenance and rights have not been independently audited |
| UI styling and code | Repository-authored files | Used by this project | Covered by LICENSE.md to the extent owned by the repository copyright holder |

## Attribution

The provider's dataset catalogue identifies the member snapshots as **CC BY 4.0** and requests attribution to **RTI Wiki — righttoinformation.wiki**. The application links to the provider's source catalogue and records the provider and underlying source URLs in its methodology.

## Release restrictions

- Do not imply that RTI Wiki or Digital Sansad endorses this project.
- Do not describe the provider's snapshot as real-time; display its stated as-of date.
- Do not add copied official photographs, logos, PDFs or bulk datasets unless the applicable permission or license has been verified.
- Do not populate attendance, questions, debates, bills, assets, liabilities or criminal-case fields without separate authoritative evidence.
- Recheck the provider's license and attribution terms before changing the source or redistributing a separate data package.

## Audit status

**Open / partially audited.** The provider states CC BY 4.0 for its published datasets. This file is not a legal opinion and does not independently verify every upstream record or third-party enrichment field.
