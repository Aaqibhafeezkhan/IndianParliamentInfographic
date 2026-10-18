import { readFile, writeFile } from 'node:fs/promises';

const SOURCES = {
  lokSabha: {
    house: 'Lok Sabha',
    sourceUrl: 'https://sansad.in/ls/members',
    endpoint: 'https://sansad.in/api_ls/member',
  },
  rajyaSabha: {
    house: 'Rajya Sabha',
    sourceUrl: 'https://sansad.in/rs/members',
    endpoint: 'https://sansad.in/api_rs/member/sitting-members',
  },
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function requestJson(url, label) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(20000),
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`${label}: HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(500 * attempt);
    }
  }
  throw new Error(`${label} request failed after 3 attempts: ${lastError?.message || 'unknown error'}`);
}

async function loadLokSabha() {
  const records = [];
  let page = 1;
  let totalPages = 1;
  const pageSize = 42;
  while (page <= totalPages) {
    if (page > 100) throw new Error('Lok Sabha pagination exceeded the safety limit of 100 pages');
    const url = `${SOURCES.lokSabha.endpoint}?loksabha=18&state=&party=&gender=&ageFrom=&ageTo=&noOfTerms=&page=${page}&size=${pageSize}&searchText=&constituency=&sitting=1&locale=en&month=&profession=&otherProfession=&constituencyCategory=&positionCode=&qualification=&noOfChildren=&isFreedomFighter=&memberStatus=s`;
    const payload = await requestJson(url, 'Lok Sabha');
    if (!payload || !Array.isArray(payload.membersDtoList)) {
      throw new Error('Lok Sabha response shape changed: expected membersDtoList array');
    }
    const rows = payload.membersDtoList;
    const reportedPages = Number(payload.metaDatasDto?.totalPages);
    if (Number.isFinite(reportedPages) && reportedPages > 0) totalPages = reportedPages;
    records.push(...rows.map(member => ({
      id: member.mpsno == null ? '' : `LS-${member.mpsno}`,
      name: member.mpFirstLastName || [member.initial, member.firstName, member.lastName].filter(Boolean).join(' '),
      house: SOURCES.lokSabha.house,
      party: member.partySname || member.partyFname || '',
      state: (member.stateName || '').trim(),
      sourceUrl: SOURCES.lokSabha.sourceUrl,
    })));
    if (!rows.length) break;
    page++;
  }
  return records;
}

async function loadRajyaSabha() {
  const payload = await requestJson(SOURCES.rajyaSabha.endpoint, 'Rajya Sabha');
  const rows = Array.isArray(payload) ? payload : payload?.membersDtoList || payload?.data || payload?.content;
  if (!Array.isArray(rows)) throw new Error('Rajya Sabha response shape changed: expected an array of member records');
  return rows.map((member, index) => ({
    id: member.mpCode != null ? `RS-${member.mpCode}` : member.mpsno != null ? `RS-${member.mpsno}` : member.memberId != null ? `RS-${member.memberId}` : '',
    name: member.memberName || member.mpName || member.name || '',
    house: SOURCES.rajyaSabha.house,
    party: member.partySname || member.partyShortName || member.party || member.partyFname || member.partyName || '',
    state: (member.stateName || member.state || '').trim(),
    sourceUrl: SOURCES.rajyaSabha.sourceUrl,
  }));
}

function summarize(house, records) {
  const ids = new Map();
  const duplicates = [];
  for (const record of records) {
    if (!record.id) continue;
    if (ids.has(record.id)) duplicates.push(record.id);
    ids.set(record.id, true);
  }
  const missing = field => records.filter(record => !String(record[field] || '').trim()).length;
  return {
    house,
    recordCount: records.length,
    uniqueIdCount: ids.size,
    duplicateIdCount: duplicates.length,
    duplicateIds: duplicates.slice(0, 20),
    missingIdCount: missing('id'),
    missingNameCount: missing('name'),
    missingPartyCount: missing('party'),
    missingStateCount: missing('state'),
    sourceUrl: SOURCES[house === 'Lok Sabha' ? 'lokSabha' : 'rajyaSabha'].sourceUrl,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const reportIndex = args.indexOf('--report');
  const baselineIndex = args.indexOf('--baseline');
  const reportPath = reportIndex >= 0 ? args[reportIndex + 1] : null;
  const baselinePath = baselineIndex >= 0 ? args[baselineIndex + 1] : null;
  if (reportIndex >= 0 && (!reportPath || reportPath.startsWith('--'))) throw new Error('--report requires a file path');
  if (baselineIndex >= 0 && (!baselinePath || baselinePath.startsWith('--'))) throw new Error('--baseline requires a previous report path');

  const [lokSabha, rajyaSabha] = await Promise.all([loadLokSabha(), loadRajyaSabha()]);
  const datasets = [summarize('Lok Sabha', lokSabha), summarize('Rajya Sabha', rajyaSabha)];
  const failures = [];
  for (const dataset of datasets) {
    if (dataset.recordCount === 0) failures.push(`${dataset.house} returned no records`);
    if (dataset.duplicateIdCount > 0) failures.push(`${dataset.house} contains duplicate IDs`);
    if (dataset.missingIdCount > 0) failures.push(`${dataset.house} contains records without IDs`);
    if (dataset.missingNameCount > 0) failures.push(`${dataset.house} contains records without names`);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    sources: 'Official Digital Sansad runtime endpoints; live response only, not a historical snapshot',
    datasets,
    failures,
  };
  if (baselinePath) {
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    report.baselineComparison = datasets.map(current => {
      const previous = baseline.datasets?.find(item => item.house === current.house);
      return {
        house: current.house,
        previousCount: previous?.recordCount ?? null,
        currentCount: current.recordCount,
        delta: previous ? current.recordCount - previous.recordCount : null,
        baselineAvailable: Boolean(previous),
      };
    });
  }
  const output = JSON.stringify(report, null, 2);
  console.log(output);
  if (reportPath) await writeFile(reportPath, output + '\n', 'utf8');
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(`Live data check failed: ${error.message}`);
  process.exitCode = 1;
});
