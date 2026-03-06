import{t as e}from"./chunk-VELTKBKT-BS_1GhEh.js";import"./chunk-JIN56HTB-BBcgWnC4.js";import"./chunk-QU3B7NT4-CuptLHbn.js";import"./chunk-H3VCZNTA-O9rD3RUM.js";import"./chunk-2GQ4VGNJ-X_4-wKSD.js";import"./chunk-IZTHCGIV-Qd0mwD86.js";import{t}from"./chunk-AEOMTBSW-iFh_90lJ.js";import{t as n}from"./chunk-DP67YELV-MsA0SYJC.js";import"./chunk-F4DMTYAW-DKpzn82l.js";import"./chunk-4LFU3G5Q-DFOz1z2x.js";import"./chunk-KID2L7ER-BP9W2GOF.js";import"./chunk-UM65NYKJ-Dj9r318c.js";import"./chunk-FVP5ZV7C-CgF_5V5B.js";import{W as r,c as i,p as a,q as o}from"./chunk-56PIJBDL-DrVmnJ3c.js";import{B as s,D as c,E as l,T as u,U as d,_ as f,g as p,o as m,s as h,t as g}from"./chunk-SQX4BMY3-CiT7LMtx.js";import{t as _}from"./chunk-JAUDZS37-yJckuqhm.js";import"./chunk-XBXGYYE5-NaC6275h.js";import{a as v,t as y}from"./chunk-H7M3GQKH-ChY0oJl7.js";import"./chunk-AF5KMHPR-B_3l3607.js";var b=p.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:e(()=>structuredClone(w),`getConfig`),clear:e(()=>{S=new Map,C=x.showData,f()},`clear`),setDiagramTitle:s,getDiagramTitle:l,setAccTitle:h,getAccTitle:u,setAccDescription:m,getAccDescription:g,addSection:e(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),o.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:e(()=>S,`getSections`),setShowData:e(e=>{C=e},`setShowData`),getShowData:e(()=>C,`getShowData`)},E=e((e,n)=>{t(e,n),n.setShowData(e.showData),e.sections.map(n.addSection)},`populateDb`),D={parse:e(async e=>{let t=await n(`pie`,e);o.debug(t),E(t,T)},`parse`)},O=e(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),k=e(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return i().value(e=>e.value)(n)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:e((e,t,n,i)=>{o.debug(`rendering pie chart
`+e);let s=i.db,l=d(),u=v(s.getConfig(),l.pie),f=_(t),p=f.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=l,[h]=y(m.pieOuterStrokeWidth);h??=2;let g=u.textPosition,b=r().innerRadius(0).outerRadius(185),x=r().innerRadius(185*g).outerRadius(185*g);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+h/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=k(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=a(w);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=p.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));f.attr(`viewBox`,`0 0 ${j} 450`),c(f,450,j,u.useMaxWidth)},`draw`)},styles:O};export{A as diagram};