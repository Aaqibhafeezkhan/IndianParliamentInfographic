import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const values=new Map(),localStorage={getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)},window={};
const makeMembers=(prefix,count,house)=>Array.from({length:count},(_,index)=>({name:prefix+' Member '+(index+1),party:'TEST',party_full:'Test Party',state:'Test State',constituency:house==='Lok Sabha'?'Test Seat':'',gender:index%2?'Female':'Male',official:{mp_code:index+1,age:40+index%30,dob:'01/01/1980',no_of_terms:house==='Lok Sabha'?2:undefined,oath_date:'2024-06-01T00:00:00',term_end:'2030-06-01T00:00:00',profession:'Public service',qualification:'Graduate'}}));
let fail=false;
const fetch=async url=>{if(fail)return {ok:false,status:503,json:async()=>({})};const isLok=url.includes('ls-mps.json');return {ok:true,status:200,json:async()=>({meta:{as_of:'2026-06-19'},members:makeMembers(isLok?'Lok Sabha':'Rajya Sabha',isLok?401:201,isLok?'Lok Sabha':'Rajya Sabha')})}};
const source=await readFile(new URL('../data/loader.js',import.meta.url),'utf8');
vm.runInNewContext(source,{window,localStorage,Date,JSON,String,Number,Set,Object,Array,Error,RegExp,Promise,fetch});
const data=window.ParliamentData,loaded=await data.refresh();
if(loaded.members.length!==602)throw new Error('Both House datasets were not loaded.');
if(loaded.members[0].house!=='Lok Sabha'||loaded.members[401].house!=='Rajya Sabha')throw new Error('House normalization failed.');
if(loaded.members[0].id!=='LS-1'||loaded.members[401].id!=='RS-1')throw new Error('Stable source member IDs were not generated.');
if(loaded.members[0].party!=='TEST'||loaded.members[0].constituency!=='Test Seat'||loaded.members[401].state!=='Test State')throw new Error('Source fields were not mapped.');
if(loaded.source!=='RTI Wiki'||loaded.sourceAsOf.lokSabha!=='2026-06-19'||loaded.sourceAsOf.rajyaSabha!=='2026-06-19')throw new Error('Source provenance metadata was not retained.');
if(loaded.coverage.lokSabha!=='Loaded'||loaded.coverage.rajyaSabha!=='Loaded')throw new Error('House coverage was not detected.');
fail=true;let rejected=false;try{await data.refresh()}catch(error){rejected=/request failed/.test(error.message)}
if(!rejected||data.load().members.length!==602)throw new Error('A failed refresh replaced or removed the previous successful cache.');
data.clear();if(data.load().members.length!==0)throw new Error('Clearing the cached dataset failed.');
console.log('Automatic source loading, both-House normalization, provenance, browser caching and failed-refresh preservation tests passed.');
