const REQUIRED_FIELDS=['id','name','party','state','constituency'];

export async function loadParliamentData({datasetUrl='legacy.html',metadataUrl='data/metadata.json'}={}){
  const [metadataResponse,datasetResponse]=await Promise.all([fetch(metadataUrl,{cache:'no-store'}),fetch(datasetUrl,{cache:'no-store'})]);
  if(!metadataResponse.ok)throw new Error('data metadata unavailable');
  if(!datasetResponse.ok)throw new Error('inherited dataset unavailable');
  const metadata=await metadataResponse.json();
  const html=await datasetResponse.text();
  const match=html.match(/const mps = (\[[\s\S]*?\]);\s*let filteredMPs/);
  if(!match)throw new Error('inherited member dataset not found');
  const members=Function('return '+match[1])();
  const invalid=members.filter(member=>REQUIRED_FIELDS.some(field=>member[field]===undefined||member[field]===null||member[field]===''));
  return {metadata,members,validation:{recordCount:members.length,invalidRequiredRecords:invalid.length,valid:invalid.length===0}};
}

export function derivedScore(member){
  return Math.round((Number(member.attendance||0)*.4)+(Math.min(Number(member.questionsAsked||0)/3,100)*.3)+(Math.min(Number(member.debatesParticipated||0),100)*.3));
}

export function dataStatusLabel(metadata){
  if(metadata.status==='verified')return 'Verified dataset';
  if(metadata.status==='partially-verified')return 'Partially verified dataset';
  return 'Inherited dataset · verification required';
}
