import { readFile } from 'node:fs/promises';

const readJson = async path => JSON.parse(await readFile(new URL('../' + path, import.meta.url), 'utf8'));
const failures = [];
const metadata = await readJson('data/metadata.json');
const schema = await readJson('data/schema.json');
const history = await readJson('data/history.json');
const loader = await readFile(new URL('../data/official-loader.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');

for (const [key, sourceUrl] of [['lokSabha', 'https://sansad.in/ls/members'], ['rajyaSabha', 'https://sansad.in/rs/members']]) {
  const dataset = metadata.datasets?.[key];
  if (!dataset) {
    failures.push('Missing metadata dataset: ' + key);
  } else {
    if (dataset.sourceUrl !== sourceUrl) failures.push('Unexpected official source URL for ' + key);
    if (!dataset.apiUrl?.startsWith('https://sansad.in/')) failures.push('Missing official HTTPS API URL for ' + key);
    if (!dataset.retrievedAt || !dataset.asOf) failures.push('Missing retrieval/as-of metadata contract for ' + key);
  }
}
for (const field of ['id', 'name', 'house', 'party', 'state', 'constituency']) {
  if (!(field in schema)) failures.push('Schema missing required field: ' + field);
}
if (JSON.stringify(schema.house?.values) !== JSON.stringify(['Lok Sabha', 'Rajya Sabha'])) {
  failures.push('House must be a normalized two-value enum');
}
const entries = history.lokSabha || [];
const numbers = entries.map(item => Number.parseInt(String(item.house || ''), 10)).filter(Number.isFinite);
if (entries.length !== 18 || numbers.length !== 18 || numbers.some((value, index) => value !== index + 1)) {
  failures.push('Historical chronology must contain Lok Sabha terms 1 through 18 in order');
}
if (entries.some(item => !item.archiveUrl?.startsWith('https://eparlib.sansad.in/'))) {
  failures.push('Every Lok Sabha history entry must link to the official archive');
}
if (!loader.includes('api_ls/member') || !loader.includes('api_rs/member/sitting-members')) {
  failures.push('Production loader does not reference both official House APIs');
}
if (loader.includes('legacy.html') || loader.includes('Function(') || loader.includes('eval(')) {
  failures.push('Production loader must not parse archived HTML or evaluate source text');
}
if (!html.includes('id="methodology"') || !html.includes('https://sansad.in/ls/members') || !html.includes('https://sansad.in/rs/members')) {
  failures.push('Methodology view must link to both official source directories');
}
if (!html.includes('aria-label=') || !styles.includes(':focus-visible')) {
  failures.push('Expected accessible labels and visible keyboard focus styles');
}
if (html.includes('<style') || html.includes('<script>')) failures.push('Application CSS and JavaScript should remain external to index.html');
if (!app.includes('restoreUrlState') || !app.includes('renderOverview')) failures.push('Extracted app.js is missing expected application entry points');
if (!readme.includes('node scripts/check-live-data.mjs')) {
  failures.push('README must document the live data validation command');
}
if (failures.length) {
  console.error('Data validation failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exitCode = 1;
} else {
  console.log('Static data contract validation passed. Run scripts/check-live-data.mjs separately to inspect live source responses.');
}
