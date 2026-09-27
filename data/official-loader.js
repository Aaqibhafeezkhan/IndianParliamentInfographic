window.ParliamentData={
  async load(){
    const retrievedAt=new Date().toISOString();
    const results=await Promise.allSettled([this.loadLokSabha(),this.loadRajyaSabha()]);
    const members=[];
    const sources={
      lokSabha:{status:'failed',sourceUrl:'https://sansad.in/ls/members',apiUrl:'https://sansad.in/api_ls/member',error:null},
      rajyaSabha:{status:'failed',sourceUrl:'https://sansad.in/rs/members',apiUrl:'https://sansad.in/api_rs/member/sitting-members',error:null}
    };
    if(results[0].status==='fulfilled'){members.push(...results[0].value);sources.lokSabha.status='loaded'}else{sources.lokSabha.error=results[0].reason?.message||'Unknown source error'}
    if(results[1].status==='fulfilled'){members.push(...results[1].value);sources.rajyaSabha.status='loaded'}else{sources.rajyaSabha.error=results[1].reason?.message||'Unknown source error'}
    if(!members.length)throw new Error('Neither official Digital Sansad member source could be loaded.');
    return {members,retrievedAt,sources,complete:sources.lokSabha.status==='loaded'&&sources.rajyaSabha.status==='loaded',coverage:{lokSabha:'18th Lok Sabha sitting members',rajyaSabha:'Current sitting Rajya Sabha members'}};
  },
  async requestJson(url,label){
    let lastError;
    for(let attempt=1;attempt<=3;attempt++){
      try{
        const response=await fetch(url,{headers:{Accept:'application/json, text/plain, */*'},cache:'no-store'});
        if(!response.ok)throw new Error(label+' source returned HTTP '+response.status);
        return await response.json();
      }catch(error){
        lastError=error;
        if(attempt<3)await new Promise(resolve=>setTimeout(resolve,500*attempt));
      }
    }
    throw lastError||new Error(label+' source request failed');
  },
  async loadLokSabha(){
    const members=[];
    let page=1;
    let totalPages=1;
    const size=42;
    while(page<=totalPages){
      const url='https://sansad.in/api_ls/member?loksabha=18&state=&party=&gender=&ageFrom=&ageTo=&noOfTerms=&page='+page+'&size='+size+'&searchText=&constituency=&sitting=1&locale=en&month=&profession=&otherProfession=&constituencyCategory=&positionCode=&qualification=&noOfChildren=&isFreedomFighter=&memberStatus=s';
      const payload=await this.requestJson(url,'Lok Sabha');
      const rows=payload.membersDtoList||[];
      const serverTotalPages=Number(payload.metaDatasDto?.totalPages);
      if(Number.isFinite(serverTotalPages)&&serverTotalPages>0)totalPages=serverTotalPages;
      members.push(...rows.map(m=>this.normalizeLokSabha(m)));
      if(!rows.length)break;
      page++;
    }
    if(!members.length)throw new Error('Lok Sabha source returned no member records');
    return members;
  },
  async loadRajyaSabha(){
    const payload=await this.requestJson('https://sansad.in/api_rs/member/sitting-members','Rajya Sabha');
    const rows=Array.isArray(payload)?payload:payload.membersDtoList||payload.data||payload.content||[];
    const members=rows.map((m,i)=>this.normalizeRajyaSabha(m,i));
    if(!members.length)throw new Error('Rajya Sabha source returned no member records');
    return members;
  },
  normalizeLokSabha(m){
    return {id:'LS-'+m.mpsno,house:'Lok Sabha',name:m.mpFirstLastName||[m.initial,m.firstName,m.lastName].filter(Boolean).join(' '),party:m.partySname||m.partyFname||'—',partyFull:m.partyFname||'—',state:(m.stateName||'').trim(),constituency:(m.constName||'').trim(),status:m.status||'—',terms:m.noOfTerms??'—',termList:m.lsExpr||'—',age:m.age??null,gender:m.gender==='FEMALE'?'Female':m.gender==='MALE'?'Male':m.gender||'—',profession:(m.profession||'').trim(),education:(m.qualification||'').trim(),dob:m.dob||null,imageUrl:m.imageUrl||null,officialProfile:m.profileUrl||null,attendance:null,questionsAsked:null,debatesParticipated:null,billsIntroduced:null,assetsInCr:null,liabilitiesInCr:null,criminalCases:null,isCabinet:null,derivedScore:null};
  },
  normalizeRajyaSabha(m,i){
    return {id:'RS-'+(m.mpCode||m.mpsno||m.memberId||i),house:'Rajya Sabha',name:m.memberName||m.mpName||m.name||'—',party:m.partySname||m.partyShortName||m.party||'—',partyFull:m.partyFname||m.partyName||m.party||'—',state:(m.stateName||m.state||'').trim(),constituency:'—',status:m.status||'Sitting',terms:m.totalTerms??m.noOfTerms??'—',termList:m.term||m.currentTerm||'—',age:m.age??null,gender:m.gender==='FEMALE'?'Female':m.gender==='MALE'?'Male':m.gender||'—',profession:m.profession||'—',education:m.qualification||'—',dob:m.dob||null,imageUrl:m.imageUrl||null,officialProfile:m.profileUrl||null,attendance:null,questionsAsked:null,debatesParticipated:null,billsIntroduced:null,assetsInCr:null,liabilitiesInCr:null,criminalCases:null,isCabinet:null,derivedScore:null};
  }
};
