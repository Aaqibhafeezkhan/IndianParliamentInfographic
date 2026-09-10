window.ParliamentData={
  async load(){
    const retrievedAt=new Date().toISOString();
    const [lokSabha,rajyaSabha]=await Promise.all([this.loadLokSabha(),this.loadRajyaSabha()]);
    return {members:[...lokSabha,...rajyaSabha],retrievedAt,sources:{lokSabha:'https://sansad.in/ls/members',rajyaSabha:'https://sansad.in/rs/members'},coverage:{lokSabha:'18th Lok Sabha sitting members',rajyaSabha:'Current sitting Rajya Sabha members'}};
  },
  async loadLokSabha(){
    const members=[];
    for(let page=1;page<=8;page++){
      const url=`https://sansad.in/api_ls/member?loksabha=18&state=&party=&gender=&ageFrom=&ageTo=&noOfTerms=&page=${page}&size=100&searchText=&constituency=&sitting=1&locale=en&month=&profession=&otherProfession=&constituencyCategory=&positionCode=&qualification=&noOfChildren=&isFreedomFighter=&memberStatus=s`;
      const response=await fetch(url,{headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error(`Lok Sabha source returned ${response.status}`);
      const payload=await response.json();
      const rows=payload.membersDtoList||[];
      members.push(...rows.map(m=>this.normalizeLokSabha(m)));
      if(rows.length<100)break;
    }
    return members;
  },
  async loadRajyaSabha(){
    const response=await fetch('https://sansad.in/api_rs/member/sitting-members',{headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error(`Rajya Sabha source returned ${response.status}`);
    const payload=await response.json();
    const rows=Array.isArray(payload)?payload:payload.membersDtoList||payload.data||payload.content||[];
    return rows.map((m,i)=>this.normalizeRajyaSabha(m,i));
  },
  normalizeLokSabha(m){
    return {id:`LS-${m.mpsno}`,house:'Lok Sabha',name:m.mpFirstLastName||[m.initial,m.firstName,m.lastName].filter(Boolean).join(' '),party:m.partySname||m.partyFname||'—',partyFull:m.partyFname||'—',state:(m.stateName||'').trim(),constituency:(m.constName||'').trim(),status:m.status||'—',terms:m.noOfTerms??'—',termList:m.lsExpr||'—',age:m.age??null,gender:m.gender==='FEMALE'?'Female':m.gender==='MALE'?'Male':m.gender||'—',profession:(m.profession||'').trim(),education:(m.qualification||'').trim(),dob:m.dob||null,imageUrl:m.imageUrl||null,officialProfile:m.profileUrl||null,attendance:null,questionsAsked:null,debatesParticipated:null,billsIntroduced:null,assetsInCr:null,liabilitiesInCr:null,criminalCases:null,isCabinet:null,derivedScore:null};
  },
  normalizeRajyaSabha(m,i){
    return {id:`RS-${m.mpCode||m.mpsno||m.memberId||i}`,house:'Rajya Sabha',name:m.memberName||m.mpName||m.name||'—',party:m.partySname||m.partyShortName||m.party||'—',partyFull:m.partyFname||m.partyName||m.party||'—',state:(m.stateName||m.state||'').trim(),constituency:'—',status:m.status||'Sitting',terms:m.totalTerms??m.noOfTerms??'—',termList:m.term||m.currentTerm||'—',age:m.age??null,gender:m.gender==='FEMALE'?'Female':m.gender==='MALE'?'Male':m.gender||'—',profession:m.profession||'—',education:m.qualification||'—',dob:m.dob||null,imageUrl:m.imageUrl||null,officialProfile:m.profileUrl||null,attendance:null,questionsAsked:null,debatesParticipated:null,billsIntroduced:null,assetsInCr:null,liabilitiesInCr:null,criminalCases:null,isCabinet:null,derivedScore:null};
  }
};
