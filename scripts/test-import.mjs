import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const values=new Map(),localStorage={getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)},window={};
const source=await readFile(new URL('../data/loader.js',import.meta.url),'utf8');
vm.runInNewContext(source,{window,localStorage,Date,JSON,String,Number,Set,Object,Array,Error,RegExp,Promise});
const data=window.ParliamentData,csv='memberId,name,house,party,state,constituency,age\nLS-1,"Asha, Rao",Lok Sabha,ABC,Maharashtra,Pune,42\nRS-1,Imran Khan,Rajya Sabha,XYZ,Delhi,,51';
const rows=data.parseCsv(csv),members=data.normalizeRecords(rows);
if(members.length!==2||members[0].name!=='Asha, Rao'||members[0].house!=='Lok Sabha'||members[1].house!=='Rajya Sabha')throw new Error('CSV parsing or House normalization failed.');
if(members[0].age!==42||members[1].constituency!=='—')throw new Error('Optional field normalization failed.');
let duplicateRejected=false;try{data.normalizeRecords([rows[0],{...rows[0],name:'Another member'}])}catch(error){duplicateRejected=/Duplicate member ID/.test(error.message)}
if(!duplicateRejected)throw new Error('Duplicate IDs were not rejected.');
let invalidHouseRejected=false;try{data.normalizeRecords([{name:'Unknown House',house:'Senate'}])}catch(error){invalidHouseRejected=/Unsupported House/.test(error.message)}
if(!invalidHouseRejected)throw new Error('Unsupported House values were not rejected.');
await data.importFile({name:'members.csv',text:async()=>csv});
let loaded=data.load();if(loaded.members.length!==2||loaded.fileName!=='members.csv'||loaded.coverage.rajyaSabha!=='Imported')throw new Error('CSV import or browser persistence failed.');
let failedImportRejected=false;try{await data.importFile({name:'bad.json',text:async()=>JSON.stringify([{name:'Invalid',house:'Senate'}])})}catch(error){failedImportRejected=/Unsupported House/.test(error.message)}
if(!failedImportRejected||data.load().fileName!=='members.csv')throw new Error('A failed import overwrote the saved dataset.');
await data.importFile({name:'members.json',text:async()=>JSON.stringify({members:[{id:'JSON-1',name:'JSON Member',house:'RS',party:'ABC'}]})});
loaded=data.load();if(loaded.members.length!==1||loaded.members[0].house!=='Rajya Sabha'||loaded.fileName!=='members.json')throw new Error('JSON import failed.');
data.clear();if(data.load().members.length!==0)throw new Error('Clearing the local dataset failed.');
console.log('CSV/JSON import, normalization, validation, duplicate detection and local persistence tests passed.');
