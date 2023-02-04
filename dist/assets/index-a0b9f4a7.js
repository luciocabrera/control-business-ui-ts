import{r as i,b as oe,O as Ie,u as ae,c as Q,d as se,L as Z,e as K,f,R as Ee,B as De}from"./vendor-2ae8ef6f.js";import{s as m,U as H,C as F}from"./styled-components-e6489abd.js";import{u as Re,a as Ne}from"./swr-04965976.js";import{E as ie,h as E}from"./use-context-selector-6b0b0676.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();var D={},Te={get exports(){return D},set exports(e){D=e}},L={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fe=i,Le=Symbol.for("react.element"),ze=Symbol.for("react.fragment"),Me=Object.prototype.hasOwnProperty,Pe=Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,qe={key:!0,ref:!0,__self:!0,__source:!0};function le(e,t,r){var n,a={},s=null,c=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(c=t.ref);for(n in t)Me.call(t,n)&&!qe.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:Le,type:e,key:s,ref:c,props:a,_owner:Pe.current}}L.Fragment=ze;L.jsx=le;L.jsxs=le;(function(e){e.exports=L})(Te);const _=D.Fragment,o=D.jsx,u=D.jsxs;var A={},ee=oe;A.createRoot=ee.createRoot,A.hydrateRoot=ee.hydrateRoot;const je="modulepreload",Oe=function(e){return"/"+e},te={},I=function(t,r,n){if(!r||r.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(r.map(s=>{if(s=Oe(s),s in te)return;te[s]=!0;const c=s.endsWith(".css"),l=c?'[rel="stylesheet"]':"";if(!!n)for(let d=a.length-1;d>=0;d--){const g=a[d];if(g.href===s&&(!c||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${l}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":je,c||(h.as="script",h.crossOrigin=""),h.href=s,document.head.appendChild(h),c)return new Promise((d,g)=>{h.addEventListener("load",d),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t())},Ve=e=>{e&&e instanceof Function&&I(()=>import("./web-vitals-7b71ae84.js"),[]).then(({getCLS:t,getFID:r,getFCP:n,getLCP:a,getTTFB:s})=>{t(e),r(e),n(e),a(e),s(e)})},Ae=({inverse:e,warning:t})=>t?`background: rgb(157 34 34 / 77%);
    color: var(--special-text-color);
    border: solid 1px var(--special-text-color);
    margin-left: auto`:e?`background: var(--special-text-color);
    color:  rgb(157 105 34);
    border: solid 1px rgb(157 105 34);`:`background: rgb(157 105 34);
    color: var(--special-text-color);
    border: solid 1px var(--special-text-color);`,Be=m.button`
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px;
  min-width: 80px;
  :hover {
    opacity: 0.6;
    border: solid 1px rgb(157 105 34);
  }

  ${Ae}
`,S=i.memo(({children:e,onClick:t,inverse:r=!1,warning:n=!1,id:a})=>o(Be,{id:a,onClick:t,inverse:r,type:"button",warning:n,children:e}));Promise.resolve();const Ue=async(e,t)=>{const r=await fetch(e,t);return ce(r)},Qe=e=>(e.headers.get("content-type")||"").split(";").includes("application/json"),He=async(e,t)=>{const r=await fetch(e,t);return{response:await ce(r),status:r.status}},We=async(e,t)=>{let r="";if(t){const a=await e.json();r=`${(a==null?void 0:a.error)||""}  :  ${(a==null?void 0:a.message)||""}`}else r=Je(e.status);const n=new Error(r);throw n.cause=e.status,n},ce=async e=>{const t=Qe(e);return e.ok?t?e.json():e:We(e,t)},Je=e=>{switch(e){case 401:return"You should be logged in to execute this action";case 403:return"You don't have enough privileges to execute this action";case 404:return"API endpoint could not be found";case 500:return"Something went wrong, please try again later. If this error persists, please reach out";default:return String(e)}},Xe=(e,t="date",r=!1)=>{if(!e)return"";const n=e instanceof Date?e:new Date(e);switch(t){case"date":return r?n.toISOString().slice(0,10):n.toLocaleDateString();case"datetime":default:return r?n.toISOString():n.toLocaleString()}},xr=({dateToCheck:e,from:t,to:r})=>{const n=new Date(e);return t<=n&&n<=r},Ge=()=>navigator.languages&&navigator.languages.length&&navigator.languages[0]||navigator.language||"en",Ye=(e,t="number")=>{const r=e??0,n=Ge();switch(t){case"currency":return new Intl.NumberFormat(n,{style:"currency",currency:"EUR"}).format(r);case"number":default:return new Intl.NumberFormat().format(r)}},O=(e,t=2)=>Number(Math.round(parseFloat(e+"e"+t))+"e-"+t),Ze=(e,t)=>{let r=[];return e.forEach(n=>{if(["group","row"].includes(n.type))r=[...r,...Ze(n.fields||[],t)];else{const a=n,s=typeof a.required=="function"?a.required(t):a.required;if(a.accessor)if(s&&ue(t[a.accessor]))r.push({accessor:a.accessor,hasErrors:!0,errorMessage:`The ${a.label} is mandatory!`,value:t[a.accessor]});else{const c=de(a,t);r.push(...c)}}}),r},Ke=(e,t)=>{let r=[];const n=e;if((typeof n.required=="function"?n.required(t):n.required)&&ue(t))r.push({accessor:n.accessor,hasErrors:!0,errorMessage:`The ${n.label} is mandatory`,value:t});else{const s=de(n,{[n.accessor]:t});r.push(...s)}return r},de=(e,t)=>{var c;const r=[],n=t[e.accessor];let a="",s=!1;return(c=e.rules)==null||c.forEach(l=>{a="",s=!1,l.type==="required"&&(n||(s=!0,a=l.message||`The ${e.label}' is mandatory!`)),l.type==="length"&&n.length!==l.value&&(s=!0,a=l.message||`The ${e.label}'s length must be exactly ${l.value} characters!`),l.type==="minLength"&&n.length<l.value&&(s=!0,a=l.message||`The ${e.label}'s length must be greater than ${l.value} characters!`),l.type==="maxLength"&&n.length>l.value&&(s=!0,a=l.message||`The ${e.label}'s length must be lower than ${l.value} characters!`),l.type==="regex"&&l.value&&n.match(l.value)===null&&(s=!0,a=l.message||`The specified ${e.label} is wrong, it should comply with the following regex expression ${l.value}!`),s&&r.push({accessor:e.accessor,hasErrors:s,errorMessage:a,value:n})}),r},ue=e=>typeof e=="number"?!1:typeof e=="string"?e.trim().length===0:Array.isArray(e)?e.length===0:typeof e=="object"?e==null||Object.keys(e).length===0:typeof e=="boolean"?!1:!e,pe=(e,t)=>{let r={};return e==null||e.forEach(n=>{if(["group","row"].includes(n.type))r={...r,...pe(n.fields||[],t)};else{const a=n,{accessor:s}=a;s&&(r[s]=(t==null?void 0:t[s])??(a==null?void 0:a.value)??"")}}),r},et=(e,t)=>{const r={hasErrors:!1,errorMessage:""};return t!=null&&t.length&&(t==null?void 0:t.filter(n=>n.accessor===e.accessor).map(n=>({hasErrors:n.hasErrors,errorMessage:n.errorMessage}))[0])||r},he="/assets/check-ebc5a996.svg",me="/assets/error-837f793e.svg",B="/assets/info-543031cd.svg",ge="/assets/warning-ada9fa06.svg",tt=(e,t,r)=>{let n=null;const a=Math.floor(Math.random()*101+1);switch(r){case"success":n={id:a,title:t||"Success",description:e,backgroundColor:"#5cb85c",icon:he};break;case"danger":case"error":n={id:a,title:t||"Danger",description:e,backgroundColor:"#d9534f",icon:me};break;case"info":n={id:a,title:t||"Info",description:e,backgroundColor:"#5bc0de",icon:B};break;case"warning":n={id:a,title:t||"Warning",description:e,backgroundColor:"#f0ad4e",icon:ge};break;default:n={id:a,title:t||"Default",description:e,backgroundColor:"#5bc0de",icon:B};break}return n},rt=(e,t,r,n,a,s)=>{let c=null;const l=Math.floor(Math.random()*101+1);switch(r){case"success":c={id:l,title:t||"Success",description:e,backgroundColor:"#5cb85c",icon:he,onClose:n,onAccept:a,isConfirmation:s};break;case"danger":case"error":c={id:l,title:t||"Danger",description:e,backgroundColor:"#d9534f",icon:me,onClose:n,onAccept:a,isConfirmation:s};break;case"info":c={id:l,title:t||"Info",description:e,backgroundColor:"#5bc0de",icon:B,onClose:n,onAccept:a,isConfirmation:s};break;case"warning":c={id:l,title:t||"Warning",description:e,backgroundColor:"#f0ad4e",icon:ge,onClose:n,onAccept:a,isConfirmation:s};break;default:c={id:l,title:t||"Default",description:e,backgroundColor:"#5bc0de",onClose:n,onAccept:a,isConfirmation:s};break}return c},vr=e=>!!e.size,nt=e=>!0,fe=(e,t)=>{let r={};return e!=null&&e.omitDefaultHeaders||(r.accept="application/json",r["content-type"]="application/json"),r.Authorization=`Bearer ${t}`,r={...r,...e==null?void 0:e.headers},e==null||delete e.headers,e==null||delete e.omitDefaultHeaders,{headers:r,...e}},W=({endpointUrl:e,transformData:t,refreshInterval:r})=>{const n="token",a=nt(),{data:s,error:c,mutate:l,isValidating:p,isLoading:h}=Re(e&&a?e:void 0,async d=>{try{const g=fe({},n),b=await Ue(d,g);return t!==void 0?t(b):b}catch(g){throw console.error(g),g}},{refreshInterval:r,onErrorRetry:(d,g,b,y,{retryCount:k})=>{d.status===404||d.cause===404||k>=2||setTimeout(()=>y({retryCount:k}),5e3)}});return{isLoading:h,isValidating:p,data:s,error:c,mutate:l}},J=e=>{const t=W(e);return{...t,data:t.data??[]}},z=()=>Ne(),M=()=>{const e="token";return i.useCallback(async(t,r)=>{const n=fe(r,e);return He(t,n)},[e])},v={countries:"/geo/countries",regions:"/geo/regions",cities:"/geo/cities",companies:"/companies",invoices:"/api/invoices",customers:"/api/people",products:"/api/products",documentTypes:"/api/document_types",titles:"/api/titles",auth:{login:"/auth/login"}},yr=()=>J({endpointUrl:v.customers}),ot=()=>{const{mutate:e}=z();return i.useCallback(()=>e(`${v.customers}`),[e])},wr=e=>W({endpointUrl:e?`${v.customers}/${e}`:void 0}),kr=()=>{const{mutate:e}=z();return i.useCallback(t=>e(`${v.customers}/${t}`),[e])},Cr=()=>{const e=M();return i.useCallback(async t=>{const{customerId:r,...n}=t,a={method:r?"PUT":"POST",body:JSON.stringify(n)},s=r?`${v.customers}/${r??""}`:v.customers;return e(s,a)},[e])},at=()=>{const e=M();return i.useCallback(async t=>{const r={method:"DELETE"};return e(`${v.customers}/${t}`,r)},[e])},Sr=()=>J({endpointUrl:v.invoices}),st=()=>{const{mutate:e}=z();return i.useCallback(()=>e(`${v.invoices}`),[e])},V=({type:e,record:t})=>{var r,n;return e==="daily_current_month"?new Date(t.date).toLocaleDateString():e==="yearly"?((r=t.year)==null?void 0:r.toString())??"":e==="monthly"?((n=t.period)==null?void 0:n.toString())??"":""},$r=(e="daily_current_month")=>J({endpointUrl:`${v.invoices}/stats/${e}`,transformData:t=>{const r=[],n=[],a=[];return t.forEach(s=>{r.push({date:V({type:e,record:s}),value:O(s.invoicesCount)}),n.push({date:V({type:e,record:s}),value:O(s.subtotalSum)}),a.push({date:V({type:e,record:s}),value:O(s.taxesSum)})}),{invoices:[{label:"Invoices",data:r}],amounts:[{label:"Sub Total",data:n},{label:"Taxes",data:a}],data:t}}}),_r=e=>W({endpointUrl:e?`${v.invoices}/${e}`:void 0}),Ir=()=>{const{mutate:e}=z();return i.useCallback(t=>e(`${v.invoices}/${t}`),[e])},Er=()=>{const e=M();return i.useCallback(async t=>{const{invoiceId:r,...n}=t,a={method:t.invoiceId?"PUT":"POST",body:JSON.stringify(n)},s=r?`${v.invoices}/${r??""}`:v.invoices;return e(s,a)},[e])},it=()=>{const e=M();return i.useCallback(async t=>{const r={method:"DELETE"};return e(`${v.invoices}/${t}`,r)},[e])},Dr=()=>9,lt=()=>{const[e,t]=i.useState([]),r=i.useCallback(a=>{const s=e.findIndex(c=>c.id===a);e.splice(s,1),t([...e])},[e]);i.useEffect(()=>{const a=setInterval(()=>{e.length>0&&r(e[0].id)},6e3);return()=>clearInterval(a)},[r,e]);const n=i.useCallback((a,s,c)=>{const l=tt(s,c,a);l&&t(p=>[...p,l])},[]);return{toasts:e,addToast:i.useCallback(n,[n]),deleteToast:i.useCallback(r,[r])}},P=ie(null),ct=({children:e})=>u(P.Provider,{value:lt(),children:[e,o(tr,{})]}),be=()=>E(P,e=>e==null?void 0:e.addToast),dt=()=>E(P,e=>e==null?void 0:e.deleteToast),ut=()=>E(P,e=>e==null?void 0:e.toasts),pt=()=>{const[e,t]=i.useState([]),r=i.useCallback(a=>{const s=e.findIndex(c=>c.id===a);e.splice(s,1),t([...e])},[e]),n=i.useCallback((a,s,c,l,p,h)=>{const d=rt(a,s,c,l,p,h);d&&t(g=>[...g,d])},[]);return{notifications:e,addNotification:i.useCallback(n,[n]),deleteNotification:i.useCallback(r,[r])}},q=ie(null),ht=({children:e})=>u(q.Provider,{value:pt(),children:[e,o(rr,{})]}),xe=()=>E(q,e=>e==null?void 0:e.addNotification),mt=()=>E(q,e=>e==null?void 0:e.deleteNotification),gt=()=>E(q,e=>e==null?void 0:e.notifications),ft=m.section`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`,Rr=m.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  gap: 1rem;
  margin-left: 0.2rem;
  border: none;

  a {
    background: transparent;
    cursor: pointer;
    width: 22px;
    border-radius: 50%;
    height: 22px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    color: #1b4734;
    border: solid 1px #1b4734;
    :hover {
      opacity: 0.6;
      border: solid 1px rgb(157 105 34);
    }
    span {
      font-size: 0.85rem;
      display: flex;
    }
  }
  svg {
    height: 1rem;
    width: 1rem;
  }
`,bt=e=>{const t=i.useRef(e),r=i.useCallback(()=>t.current,[]),n=i.useRef(new Set),a=i.useCallback(c=>{t.current={...t.current,...c},n.current.forEach(l=>l())},[]),s=i.useCallback(c=>(n.current.add(c),()=>n.current.delete(c)),[]);return{get:i.useCallback(()=>r(),[r]),set:i.useCallback(c=>a(c),[a]),subscribe:i.useCallback(c=>s(c),[s])}},xt={get:()=>{},set:()=>{},subscribe:e=>e},vt={formMetaData:{submittedCounter:0,initialData:void 0,initialFields:[]},handleSetFormMetaData:()=>{}},X=i.createContext({data:xt,metaData:vt}),yt=e=>{const t=i.useContext(X);if(!t)throw new Error("Store not found");return[i.useSyncExternalStore(t.data.subscribe,()=>e(t.data.get())),t.data.set]},wt=e=>{const t=i.useContext(X);if(!t)throw new Error("Store not found");const r=i.useMemo(()=>e(t.metaData.formMetaData),[e,t.metaData.formMetaData]),n=i.useCallback(a=>{t.metaData.handleSetFormMetaData(a)},[t.metaData]);return[r,n]},Nr=({children:e,initialData:t,initialFields:r})=>{const[n,a]=i.useState({submittedCounter:0,initialData:{},initialFields:[]}),s=i.useMemo(()=>pe(r,t),[t,r]),c=bt(s),l=i.useCallback(h=>{a(d=>({...d,...h}))},[]);i.useEffect(()=>{a(h=>({...h,initialData:t,initialFields:r}))},[t,r]);const p=i.useMemo(()=>({data:c,metaData:{formMetaData:n,handleSetFormMetaData:l}}),[c,n,l]);return o(X.Provider,{value:p,children:u(ft,{children:[o(j,{}),e]})})};var kt=(e=>(e.setColumnFilters="setColumnFilters",e.setColumnMeta="setColumnMeta",e.setSorting="setSorting",e.toggleShowColumnFilters="toggleShowColumnFilters",e))(kt||{});const U={columnFilters:[],columnMeta:[],sorting:[],filterQuery:"",sortingQuery:"",fullQuery:"",showColumnFilters:!1},Ct=(e,t)=>{const{type:r}=t;switch(r){case"setColumnMeta":return{...e,columnMeta:t.payload.columnMeta};case"setColumnFilters":const n=t.payload.columnFilters.map(s=>{const c=e.columnMeta.find(l=>l.id===s.id);switch((c==null?void 0:c.type)||""){case"date":case"datetime":const l=s.value;return`&filter=${s.id} gt ${l[0].toISOString()}&filter=${s.id} lt ${l[1].toISOString()}`;case"number":const p=s.value;return`&filter=${s.id} gt ${p[0]}&filter=${s.id} lt ${p[1]} `;case"enum":return`&filter=${s.id} equals ${s.value}`;default:return`&filter=${s.id} contains ${s.value} `}}).join("");return{...e,showColumnFilters:!1,columnFilters:t.payload.columnFilters,filterQuery:n,fullQuery:`${n}${e.sortingQuery}`};case"setSorting":const a=t.payload.sorting.map(s=>`&orderBy=${s.id} ${s.desc?"desc":"asc"}`).join("");return{...e,sorting:t.payload.sorting,sortingQuery:a,fullQuery:`${e.filterQuery}${a}`};case"toggleShowColumnFilters":return{...e,showColumnFilters:!e.showColumnFilters};default:return e}},ve=i.createContext({state:U,dispatch:()=>null}),St=e=>{const[t,r]=i.useReducer(Ct,{...U,columnMeta:e??U.columnMeta});return{state:t,dispatch:r}},Tr=()=>({...i.useContext(ve)}),Fr=({children:e,columnMeta:t})=>o(ve.Provider,{value:St(t),children:e}),Lr=i.memo(({field:e,...t})=>{const{options:r,type:n,label:a,accessor:s,readonly:c,placeholder:l,normalize:p,rules:h,textAlign:d,required:g}=e,[b,y]=yt($=>$[e.accessor]),[k]=wt($=>$.submittedCounter),w=k>0?Ke(e,b):[],C=et(e,w),Se=i.useCallback($=>{var Y;const _e=(Y=$.target.options[$.target.selectedIndex])==null?void 0:Y.value;y({[e.accessor]:_e})},[e.accessor,y]),$e=i.useCallback($=>{y({[e.accessor]:$.target.value})},[e.accessor,y]);switch(e.type){case"select":return o(Ft,{onChange:Se,value:b,accessor:s,options:r,label:a,readonly:c,required:g,type:n,...t,...C},`field-select-${e.accessor}`);case"text":default:return o(Rt,{onChange:$e,accessor:s,readonly:c,label:a,required:g,type:n,normalize:p,rules:h,placeholder:l,textAlign:d,...t,...C,value:b},`field-input-${e.accessor}`)}}),zr=m.form`
  container-type: inline-size;
  container-name: form-container;
  border-radius: 12px;
  background: var(--form-bg-color);
  box-shadow: 6px 6px 22px 1px rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: relative;
  ${({width:e})=>e?`width: ${e}`:""};
  ${({height:e})=>e?`height: ${e}`:""};
  max-width: 95%;
  max-height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  fieldset {
    min-width: 300px;
  }
  header {
    min-height: 40px;
    max-height: 40px;
    .close {
      right: 1.5rem;
      position: absolute;
    }
  }
  legend {
    font-weight: bold;
    color: var(--text-strong-color);
    margin-left: 8px;
    padding-left: 6px;
    padding-right: 6px;
    top: -2px;
    position: relative;
  }
  main {
    padding: 2rem 4rem;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
  }
  footer {
    padding: 0.25rem 2rem;
    display: flex;
    gap: 1rem;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    background: linear-gradient(135deg, white 20%, #c2e5da 0%, rgb(237 224 194) 100%);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`,Mr=m.fieldset`
  background: var(--form-bg-color);
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
  min-width: 300px;
`,Pr=m.fieldset`
  background:var(--form-bg-color);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border-color: var(--border-color);
  border: 1px solid;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  min-width: 300px;
  }
`,qr=m.div`
  container-type: inline-size;
  background: var(--form-bg-color);
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${({width:e})=>e||"100"}%;
  align-content: flex-start;
  align-items: flex-start;
`,$t=m.div`
  min-width: 300px;
  width: ${({width:e})=>e??100}%;
  padding: 0;
  flex: auto;
  fieldset {
    align-content: stretch;
    background: var(--form-bg-color);
    padding: 0;
    border-radius: var(--border-radius);
    border-color: var(--border-color);
    border: 1px solid;
    display: flex;
    :focus-within {
      background: var(--input-focus-color);
      border-color: var(--special-shadow-color);
      color: var(--special-shadow-color);
      legend {
        color: var(--special-shadow-color);
      }
    }
  }
`,_t=m.span`
  font-size: 12px;
  line-height: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 16px;
  padding: 4px 10px 0px 10px;
`,It=m.span`
  color: red;
`,ye=i.memo(({label:e,placeholder:t,required:r,viewMode:n,...a})=>{var c;e=e&&r?`${e}  *`:e,t=t&&r?`${t}  *`:t;const s=a.helperText||"";return u($t,{width:a.width,viewMode:n,children:[u("fieldset",{children:[o("legend",{children:o("label",{htmlFor:a.accessor,children:e})}),a.children]},`field-${a.accessor}`),u(_t,{children:[o(It,{children:a.hasErrors?a.errorMessage:s}),!a.disabled&&a.maxLength&&a.value&&["text","password"].includes(a.type)&&o("span",{children:`${(c=a.value)==null?void 0:c.toString().length} / ${a.maxLength}`})]})]})}),Et=m.input`
  width: calc(100% - 14px);
  border: none;
  background: var(--form-bg-color);
  text-align: ${({textAlign:e})=>e||"left"};
  color: var(--text-color);
  border-radius: 10px;
  padding-left: 10px;
  top: -3px;
  position: relative;
  :focus-visible {
    outline: none;
    background: var(--input-focus-color);
    color: var(--special-shadow-color);
  }
`,Dt=i.memo(i.forwardRef(({textAlign:e,...t},r)=>{var y;const{accessor:n,type:a,readonly:s,placeholder:c,value:l,onChange:p,normalize:h,rules:d}=t,g=(h==null?void 0:h(l))??l??"",b=(y=d==null?void 0:d.filter(k=>k.type==="maxLength"))==null?void 0:y.map(k=>k.value)[0];return o(ye,{maxLength:b,ref:r,...t,children:o(Et,{name:n,value:g,onChange:p,maxLength:b,type:a,id:n,readOnly:s,placeholder:c,autoComplete:"off",textAlign:e})})})),Rt=Dt,Nt=m.select`
  width: 100%;
  border: none;
  background: var(--form-bg-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding-left: 10px;
  border-radius: 10px;
  top: -3px;
  position: relative;
  :focus-visible {
    outline: none;
    background: var(--input-focus-color);
    color: var(--special-shadow-color);
  }
`,Tt=i.memo(i.forwardRef((e,t)=>{const{accessor:r,options:n,value:a,label:s,onChange:c}=e;return o(ye,{...e,ref:t,children:u(Nt,{name:r,"select-name":r,title:r,"aria-label":r,"aria-labelledby":r,id:r,value:a,disabled:e.readonly,onChange:l=>{l.preventDefault(),c==null||c(l)},children:[u("option",{value:"",children:["Choose ",s]},"default-option"),n==null?void 0:n.map(l=>o("option",{id:`item-${l.value}`,value:l.value,children:l.label},`item-${l.value}`))]})})})),Ft=Tt,Lt=m.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 10;
`,j=i.memo(({children:e})=>o(Lt,{children:e})),G=({children:e,el:t="fragment"})=>{const[r]=i.useState(document.createElement(t));return i.useEffect(()=>(document.body.appendChild(r),()=>{document.body.removeChild(r)}),[]),oe.createPortal(e,r)},zt=m.header`
  display: flex;
  gap: 1rem;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;

  padding: 0 1.5rem;
  padding: 0.4rem 1.2rem;
  justify-content: flex-start;

  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
  font-weight: 400;
  height: 40px;

  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);

  img {
    height: 2rem;
    width: 2rem;
  }
  h1,
  span {
    margin: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .children-content {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-direction: row;
    gap: 1rem;
  }

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 2px solid transparent;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-repeat: no-repeat;
  background-origin: padding-box, border-box;
  background: linear-gradient(135deg, white 20%, #c2e5da8a 0%, rgb(239 216 165 / 53%) 100%);
  height: var(--navbar-root-height);
  font-family: '72override', var(--font-family);
  font-size: var(--large-font-size);
  font-weight: 600;
  max-height: 40px;
  padding: 0 1.5rem;
  border: 1px solid grey;
  color: var(--header-bg-color);

  .title-content {
    background: linear-gradient(to right, #03542f 0%, #d19000 100%);
    -webkit-background-clip: text;
  }
`,Mt=e=>typeof e=="string"?o("img",{src:e,alt:""}):e,jr=i.memo(({icon:e,title:t,subtitle:r,children:n,onClose:a})=>u(zt,{children:[e&&Mt(e),u("div",{className:"title-content",children:[t&&o("span",{children:t}),r&&o("span",{children:r})]}),n&&o("div",{className:"children-content",children:n}),a&&o("button",{type:"button",onClick:a,className:"close","data-dismiss":"modal",children:"×"})]})),x=()=>o(j,{children:o(Qt,{size:"lg"})}),Pt="_expander_1l3uv_163",qt="_resizer_1l3uv_179",jt="_isResizing_1l3uv_233",Or={"table-wrapper":"_table-wrapper_1l3uv_1","header-wrapper":"_header-wrapper_1l3uv_141","header-icon":"_header-icon_1l3uv_155",expander:Pt,resizer:qt,"simple-td":"_simple-td_1l3uv_197",isResizing:jt};i.memo(({onAccept:e,onClose:t,message:r,title:n,isConfirmation:a=!1})=>u(G,{"data-testid":"modal-portal",children:[o(j,{}),o("div",{className:"fade",id:"myModal",role:"dialog",children:o("div",{className:"modal-dialog",style:{zIndex:"100"},children:u("div",{className:"modal-content",children:[u("div",{className:"modal-header",children:[o("button",{type:"button",onClick:t,className:"close","data-dismiss":"modal",children:"×"}),o("h4",{className:"modal-title",children:n})]}),o("div",{className:"modal-body",children:o(_,{children:r})}),u("div",{className:"modal-footer",children:[e&&o(S,{className:"btn btn-default","data-dismiss":"modal",onClick:e,children:"Accept"}),a&&t&&o(S,{className:"btn btn-default","data-dismiss":"modal",onClick:t,children:"Cancel"})]})]})})})]}));const Ot=[{text:"Customers",path:"customers"},{text:"Invoices",path:"invoices"}],Vt=m.div`
  padding: 1rem 1.5rem;
  width: calc(100% - 3rem);
  height: calc(100% - 4.5rem);
`;m.header`
  background-color: var(--header-bg-color);
  z-index: 1;
  position: relative;
  padding: 10px;
  font-size: larger;
  color: white;
  font-weight: bolder;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
`;const At=i.memo(()=>u(_,{children:[o(lr,{routes:Ot}),o(Vt,{children:o(Ie,{})})]})),Bt=({size:e})=>{switch(e){case"md":return`height: 5rem;
            width: 5rem;`;case"lg":return`height: 10rem;
            width: 10rem;`;case"sm":default:return`height: 1rem;
            width: 1rem;`}},R=H`
  to {
     -webkit-transform: rotate(360deg);
    transform: rotate(360deg);

  }
`,Ut=m.div`
  ${Bt}
  border-radius: 50%;
  border-top: 2px solid #03ade0;
  border-right: 2px solid transparent;
  -webkit-animation: ${R} 0.6s linear infinite;
  animation: ${R} 0.6s linear infinite;
  :not(:required):before {
    border-radius: 50%;
    -webkit-animation: ${R} 0.6s linear infinite;
    animation: ${R} 0.6s linear infinite;
  }
`,Qt=i.memo(({size:e="md"})=>o(Ut,{size:e}));m.nav`
  float: left;
  width: 42px;
  background: var(--form-bg-color); // #cccccc87; //  #ccc;
  color: var(--nav-text-color);
  position: absolute;
  height: calc(100% - 42.5px);
  ul {
    list-style-type: none;
    padding: 0;
    li {
      text-align: center;
      padding-bottom: 1rem;
    }
  }
  img,
  svg {
    width: 24px;
  }
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
`;const Vr=i.memo(({customer:e})=>{const{customerId:t,action:r}=ae(),n=t==="new"||!t,a=!n&&r==="edit",s=Q(),c=xe(),l=be(),p=at(),h=ot(),d=se(),g=i.useCallback(async()=>{try{const w=await p(e==null?void 0:e.peopleId);[200,204].includes((w==null?void 0:w.status)||0)?l==null||l("success","Customer successfully deleted",`The Customer ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName} has been successfully removed.`):l==null||l("error","Error Deleting Customer",`An error has ocurred when trying to delete The Customer ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}. Please try again.`),h==null||h(),s.pathname!=="/customers"&&d("/customers")}catch(w){l==null||l("error","Error Deleting Customer",w.message)}},[p,e==null?void 0:e.peopleId,e==null?void 0:e.firstName,e==null?void 0:e.lastName,h,s.pathname,d,l]),b=i.useCallback(()=>{c==null||c("Are you sure you want to delete the current Customer?","Confirm Deletion","warning",void 0,g,!0)},[c,g]),y=i.useCallback(w=>{w.preventDefault(),d("/customers")},[d]),k=i.useCallback(w=>{w.preventDefault(),d("edit")},[d]);return u(_,{children:[!n&&!a&&o(S,{id:"customer-actions-button-edit",onClick:k,children:"Edit"}),o(S,{id:"customer-actions-button-cancel",inverse:!0,onClick:y,children:"Cancel"}),!n&&o(S,{id:"customer-actions-button-delete",onClick:b,warning:!0,children:"Delete"})]})}),Ar=i.memo(({invoice:e})=>{const{invoiceId:t,action:r}=ae(),n=t==="new"||!t,a=r==="edit"&&!n,s=r==="copy"&&!n,c=Q(),l=xe(),p=be(),h=it(),d=st(),g=se(),b=i.useCallback(async()=>{try{const C=await h(e==null?void 0:e.invoiceId);[200,204].includes((C==null?void 0:C.status)||0)?p==null||p("success","Invoice successfully deleted",`The Invoice ${e==null?void 0:e.invoice} has been successfully removed.`):p==null||p("error","Error Deleting Invoice",`An error has ocurred when trying to delete The Invoice ${e==null?void 0:e.invoice}. Please try again.`),d==null||d(),c.pathname!=="/invoices"&&g("/invoices")}catch(C){p==null||p("error","Error Deleting Invoice",C.message)}},[h,e==null?void 0:e.invoiceId,e==null?void 0:e.invoice,d,c.pathname,g,p]),y=i.useCallback(()=>{l==null||l("Are you sure you want to delete the current Invoice?","Confirm Deletion","warning",void 0,b,!0)},[l,b]),k=i.useCallback(C=>{C.preventDefault(),g("/invoices")},[g]),w=i.useCallback(C=>{C.preventDefault(),g("edit")},[g]);return u(_,{children:[!n&&!a&&!s&&o(S,{id:"invoice-actions-button-edit",onClick:w,children:"Edit"}),o(S,{id:"invoice-actions-button-cancel",inverse:!0,onClick:k,children:"Cancel"}),!n&&!s&&o(S,{id:"invoice-actions-button-delete",onClick:y,warning:!0,children:"Delete"})]})}),we=H`
	from {
	  transform: translateX(100%);
	  
	}
	to {
	  transform: translateX(0);
	}
`,ke=H`
	from {
		transform: translateX(-100%);
		
	}
	to {
		transform: translateX(0);
	}`,Ht=F`
  top: 12px;
  right: 12px;
  transition: transform 0.6s ease-in-out;
  animation: ${we} 0.7s;
`,Wt=F`
  bottom: 12px;
  right: 12px;
  transition: transform 0.6s ease-in-out;
  animation: ${we} 0.7s;
`,Jt=F`
  top: 12px;
  left: 12px;
  transition: transform 0.6s ease-in;
  animation: ${ke} 0.7s;
`,Xt=F`
  bottom: 12px;
  left: 12px;
  transition: transform 0.6s ease-in;
  animation: ${ke} 0.7s;
`,Ce=({position:e})=>{switch(e){case"topRight":return Ht;case"topLeft":return Jt;case"bottomLeft":return Xt;case"bottomRight":default:return Wt}},Gt=m.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999;

  button {
    position: relative;
    right: -0.3em;
    top: -0.3em;
    float: right;
    font-weight: 700;
    color: #fff;
    outline: none;
    border: none;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.8;
    line-height: 1;
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
  }

  ${Ce}
`,Yt=m.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  margin-bottom: 15px;
  width: 300px;
  max-height: 100px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  background-color: ${({backgroundColor:e})=>e};

  height: 50px;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;

  :hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }

  ${Ce}
`,Zt=m.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`,Kt=m.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,er=m.div`
  float: left;
  margin-right: 15px;
  img {
    width: 30px;
    height: 30px;
  }
`,tr=({position:e="bottomRight"})=>{const t=ut(),r=dt();return o(G,{children:o(Gt,{id:"toast-container",position:e,children:t==null?void 0:t.map((n,a)=>u(Yt,{backgroundColor:n.backgroundColor,position:e,children:[o("button",{type:"button",onClick:()=>r==null?void 0:r(n.id),children:"X"}),o(er,{children:o("img",{src:n.icon,alt:""})}),u(_,{children:[o(Zt,{children:n.title}),o(Kt,{children:n.description})]})]},a))})})},rr=i.memo(()=>{const e=gt(),t=mt();return((e==null?void 0:e.length)??0)===0?null:o(G,{children:u(_,{children:[o(j,{}),e==null?void 0:e.map(({id:r,icon:n,onAccept:a,onClose:s,description:c,title:l,isConfirmation:p=!1},h)=>o("div",{className:"fade",id:"myModal",role:"dialog",children:o("div",{className:"modal-dialog",style:{zIndex:"100"},children:u("div",{className:"modal-content",children:[u("div",{className:"modal-header",children:[n&&o("img",{src:n,alt:"",width:"32px",height:"32px"}),o("h4",{className:"modal-title",children:l}),o("button",{type:"button",onClick:d=>{s==null||s(d),t==null||t(r)},className:"close","data-dismiss":"modal",children:"×"})]}),o("div",{className:"modal-body",children:o(_,{children:c})}),u("div",{className:"modal-footer",children:[o(S,{className:"btn btn-default","data-dismiss":"modal",onClick:()=>{a==null||a(),t==null||t(r)},children:"Accept"}),p&&o(S,{className:"btn btn-default","data-dismiss":"modal",inverse:!0,onClick:d=>{s==null||s(d),t==null||t(r)},children:"Cancel"})]})]})})},h))]})})}),Br=i.memo(({errors:e})=>typeof e=="string"?o("p",{children:e}):o("ul",{children:e.map((t,r)=>o("li",{children:t},`list-err-${r}`))})),Ur=i.memo(({date:e,output:t,utc:r})=>o(_,{children:Xe(e,t,r)})),nr=m.div`
  margin: 0;
  padding: 0;
  text-align: right;
`,Qr=i.memo(({value:e,output:t})=>o(nr,{children:Ye(e,t)})),Hr=m.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({active:e})=>e&&`
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`,Wr=m.div`
  display: flex;
`,Jr=m.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  position: relative;
  display: flex;
  margin: 0;
  left: 0;
  top: 0;
  flex-direction: column;
`,or=m.button`
  background: transparent;
  cursor: pointer;
  width: 24px;
  border-radius: 50%;
  height: 24px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  color: #1b4734;
  border: solid 1px #1b4734;
  :hover {
    opacity: 0.6;
    border: solid 1px rgb(157 105 34);
  }
  span {
    font-size: 0.85rem;
    display: flex;
  }
`,Xr=i.memo(({onClick:e,icon:t,disabled:r=!1,id:n,title:a="button"})=>o(or,{id:n,onClick:e,type:"button",title:a,disabled:r,children:t})),ar=m.nav`
  width: 100%;
  background: linear-gradient(135deg, var(--header-bg-color) 0%, rgba(253, 187, 45, 1) 100%);
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    column-gap: 1.8rem;
    color: var(--nav-text-color);
    li {
      text-align: center;
      a {
        color: inherit;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        column-gap: 0.5rem;
        text-decoration: none;
      }
    }
  }
  img,
  svg {
    width: 24px;
  }
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
  position: relative;
  display: flex;
  height: var(--navbar-root-height);
  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
  font-weight: 400;
  box-sizing: border-box;

  #app-home {
    padding: 0 1.5rem;
  }
`,sr=()=>o("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 1024 1024",height:"2rem",width:"2rem",xmlns:"http://www.w3.org/2000/svg",children:o("path",{d:"M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"})}),ir=i.memo(({routes:e})=>o(ar,{children:u("ul",{children:[o("li",{id:"app-home",children:o(Z,{to:"/","aria-label":"Go Home",children:o(sr,{})})},"home"),e.map(t=>o("li",{children:u(Z,{to:t.path,"aria-label":`Go to ${t.text}`,children:[t.icon," ",t.text]})},t.text))]})})),lr=ir,cr=i.lazy(()=>I(()=>import("./Customers-8797ef41.js"),["assets/Customers-8797ef41.js","assets/vendor-2ae8ef6f.js","assets/ReadOnlyHookedTable-5f576435.js","assets/Form-41bf580f.js","assets/@tanstack/react-table-e9a5a890.js","assets/swr-04965976.js","assets/react-virtual-793d5da3.js","assets/@tanstack/match-sorter-utils-120d5a33.js","assets/ReadOnlyHookedTable-412a1563.css","assets/NewIcon-1fb8d883.js","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),N=i.lazy(()=>I(()=>import("./Customer-0c7b9753.js"),["assets/Customer-0c7b9753.js","assets/vendor-2ae8ef6f.js","assets/PageSpinner-9a0c75ea.js","assets/swr-04965976.js","assets/Form-41bf580f.js","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),re=i.lazy(()=>I(()=>import("./ViewCustomer-6bc40616.js"),["assets/ViewCustomer-6bc40616.js","assets/vendor-2ae8ef6f.js","assets/PageSpinner-9a0c75ea.js","assets/Form-41bf580f.js","assets/swr-04965976.js","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),dr=i.lazy(()=>I(()=>import("./Invoices-56fe8ea5.js"),["assets/Invoices-56fe8ea5.js","assets/vendor-2ae8ef6f.js","assets/ReadOnlyHookedTable-5f576435.js","assets/Form-41bf580f.js","assets/@tanstack/react-table-e9a5a890.js","assets/swr-04965976.js","assets/react-virtual-793d5da3.js","assets/@tanstack/match-sorter-utils-120d5a33.js","assets/ReadOnlyHookedTable-412a1563.css","assets/CopyIcon-6c8dade6.js","assets/NewIcon-1fb8d883.js","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),T=i.lazy(()=>I(()=>import("./Invoice-42087fa6.js"),["assets/Invoice-42087fa6.js","assets/vendor-2ae8ef6f.js","assets/PageSpinner-9a0c75ea.js","assets/Form-41bf580f.js","assets/swr-04965976.js","assets/InvoiceDetailsField-07452ad4.js","assets/ReadOnlyTable-45e8a839.js","assets/@tanstack/react-table-e9a5a890.js","assets/react-virtual-793d5da3.js","assets/@tanstack/match-sorter-utils-120d5a33.js","assets/CopyIcon-6c8dade6.js","assets/NewIcon-1fb8d883.js","assets/InvoiceDetailsField-60ceadc4.css","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),ne=i.lazy(()=>I(()=>import("./ViewInvoice-c558b8aa.js"),["assets/ViewInvoice-c558b8aa.js","assets/InvoiceDetailsField-07452ad4.js","assets/vendor-2ae8ef6f.js","assets/ReadOnlyTable-45e8a839.js","assets/@tanstack/react-table-e9a5a890.js","assets/react-virtual-793d5da3.js","assets/@tanstack/match-sorter-utils-120d5a33.js","assets/PageSpinner-9a0c75ea.js","assets/swr-04965976.js","assets/Form-41bf580f.js","assets/CopyIcon-6c8dade6.js","assets/NewIcon-1fb8d883.js","assets/InvoiceDetailsField-60ceadc4.css","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js"])),ur=i.lazy(()=>I(()=>import("./Home-ca48bc30.js"),["assets/Home-ca48bc30.js","assets/vendor-2ae8ef6f.js","assets/ReadOnlyTable-45e8a839.js","assets/@tanstack/react-table-e9a5a890.js","assets/react-virtual-793d5da3.js","assets/@tanstack/match-sorter-utils-120d5a33.js","assets/react-charts-4dd82eba.js","assets/swr-04965976.js","assets/styled-components-e6489abd.js","assets/use-context-selector-6b0b0676.js","assets/Home-6d417aa0.css"])),pr=()=>{const e=Q(),t=e==null?void 0:e.state;return o(ct,{children:u(ht,{children:[o(K,{location:(t==null?void 0:t.backgroundLocation)||e,children:u(f,{path:"/",element:o(At,{}),children:[o(f,{index:!0,element:o(i.Suspense,{fallback:o(x,{}),children:o(ur,{})})}),u(f,{path:"customers",element:o(i.Suspense,{fallback:o(x,{}),children:o(cr,{})}),children:[o(f,{path:"new",element:o(i.Suspense,{fallback:o(x,{}),children:o(N,{})})}),o(f,{path:":customerId/:action",element:o(i.Suspense,{fallback:o(x,{}),children:o(N,{})})}),o(f,{path:":customerId",element:o(i.Suspense,{fallback:o(x,{}),children:o(re,{})})})]}),u(f,{path:"invoices",element:o(i.Suspense,{fallback:o(x,{}),children:o(dr,{})}),children:[o(f,{path:"new",element:o(i.Suspense,{fallback:o(x,{}),children:o(T,{})})}),o(f,{path:":invoiceId/:action",element:o(i.Suspense,{fallback:o(x,{}),children:o(T,{})})}),o(f,{path:":invoiceId",element:o(i.Suspense,{fallback:o(x,{}),children:o(ne,{})})})]}),o(f,{path:"*",element:o("div",{children:"No Match"})})]})}),(t==null?void 0:t.backgroundLocation)&&u(K,{children:[u(f,{path:"customers",children:[o(f,{path:"new",element:o(i.Suspense,{fallback:o(x,{}),children:o(N,{})})}),o(f,{path:":customerId/:action",element:o(i.Suspense,{fallback:o(x,{}),children:o(N,{})})}),o(f,{path:":customerId",element:o(i.Suspense,{fallback:o(x,{}),children:o(re,{})})})]}),u(f,{path:"invoices",children:[o(f,{path:"new",element:o(i.Suspense,{fallback:o(x,{}),children:o(T,{})})}),o(f,{path:":invoiceId/:action",element:o(i.Suspense,{fallback:o(x,{}),children:o(T,{})})}),o(f,{path:":invoiceId",element:o(i.Suspense,{fallback:o(x,{}),children:o(ne,{})})})]})]})]})})},hr=A.createRoot(document.getElementById("root"));hr.render(o(Ee.StrictMode,{children:o(De,{children:o(pr,{})})}));Ve();export{Wr as $,Ye as A,S as B,qr as C,Ur as D,Br as E,_ as F,xr as G,jr as H,Xr as I,Sr as J,Xe as K,_r as L,st as M,Ir as N,j as O,Er as P,Ar as Q,Dr as R,Qt as S,Rr as T,Ke as U,et as V,Ft as W,Qr as X,G as Y,Or as Z,Jr as _,Fr as a,Hr as a0,$r as a1,u as b,Tr as c,xe as d,kt as e,Rt as f,Nr as g,x as h,vr as i,o as j,yt as k,wt as l,Lr as m,Mr as n,Pr as o,zr as p,J as q,v as r,wr as s,ot as t,yr as u,Ze as v,kr as w,Cr as x,be as y,Vr as z};
