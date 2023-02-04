import{q as A,r as N,s as X,t as M,w as O,x as S,y as $,d as j,j as s,E as k,g as B,z as R}from"./index-a0b9f4a7.js";import{r,u as U,d as z}from"./vendor-2ae8ef6f.js";import{P as Z}from"./PageSpinner-9a0c75ea.js";import"./swr-04965976.js";import{F as G,C as H}from"./Form-41bf580f.js";import"./styled-components-e6489abd.js";import"./use-context-selector-6b0b0676.js";const J=()=>A({endpointUrl:N.documentTypes}),K=()=>A({endpointUrl:N.titles}),Q=e=>{var i,t;const{data:n,isLoading:a}=J(),{data:d,isLoading:g}=K(),p=r.useMemo(()=>d==null?void 0:d.map(l=>({label:l.name,value:l.titleId})),[d]),y=r.useMemo(()=>n==null?void 0:n.map(l=>({label:l.name,value:l.documentTypeId})),[n]);return{fields:r.useMemo(()=>{var l,v;return[{type:"row",fields:[{accessor:"documentTypeId",label:"Id Type",type:"select",required:!0,options:y,value:e==null?void 0:e.documentTypeId},{accessor:"documentId",label:"ID",type:"text",required:!0,placeholder:"Enter the Person's ID",value:e==null?void 0:e.documentId,rules:[{type:"minLength",value:4},{type:"maxLength",value:24}]}]},{type:"row",fields:[{accessor:"titleId",label:"Title",type:"select",required:!0,options:p,value:e==null?void 0:e.titleId},{accessor:"initials",label:"Initials",type:"text",placeholder:"Enter the Person's Initials",value:e==null?void 0:e.initials,rules:[{type:"maxLength",value:10}]},{accessor:"firstName",label:"First Name",type:"text",placeholder:"Enter the Person's First Name",value:e==null?void 0:e.firstName,rules:[{type:"maxLength",value:50}]},{accessor:"lastName",label:"Last Name",type:"text",placeholder:"Enter the Person's Last Name",required:!0,value:e==null?void 0:e.lastName,rules:[{type:"maxLength",value:50}]}]},{type:"row",fields:[{accessor:"phone",label:"Phone Number",type:"text",value:(l=e==null?void 0:e.defaultPhone)==null?void 0:l.phone,rules:[{type:"maxLength",value:16}]},{accessor:"email",label:"Email",type:"text",value:(v=e==null?void 0:e.defaultEmail)==null?void 0:v.email,rules:[{type:"maxLength",value:120}]}]},{label:"Address",type:"group",fields:[{type:"row",fields:[{accessor:"line1",label:"Line 1",type:"text",placeholder:"Street",required:!0,value:e==null?void 0:e.defaultAddress.line1,rules:[{type:"maxLength",value:50}]},{accessor:"line2",label:"Line 2",type:"text",placeholder:"Apartment, suite, house number, etc.",value:e==null?void 0:e.defaultAddress.line2,rules:[{type:"maxLength",value:50}]}]},{type:"row",fields:[{accessor:"country",label:"Country",type:"text",required:!0,value:e==null?void 0:e.defaultAddress.country,rules:[{type:"maxLength",value:50}]},{accessor:"region",label:"State / Province",type:"text",required:!0,value:e==null?void 0:e.defaultAddress.region,rules:[{type:"maxLength",value:50}]}]},{type:"row",fields:[{accessor:"city",label:"City / Town",type:"text",required:!0,value:e==null?void 0:e.defaultAddress.city,rules:[{type:"maxLength",value:50}]},{accessor:"postalCode",label:"ZIP / Postal code",type:"text",required:!0,placeholder:"XXXX XX",maxLength:16,value:e==null?void 0:e.defaultAddress.postalCode,rules:[{type:"maxLength",value:16}]}]}]}]},[e==null?void 0:e.defaultAddress.city,e==null?void 0:e.defaultAddress.country,e==null?void 0:e.defaultAddress.line1,e==null?void 0:e.defaultAddress.line2,e==null?void 0:e.defaultAddress.postalCode,e==null?void 0:e.defaultAddress.region,(i=e==null?void 0:e.defaultEmail)==null?void 0:i.email,(t=e==null?void 0:e.defaultPhone)==null?void 0:t.phone,e==null?void 0:e.documentId,e==null?void 0:e.documentTypeId,e==null?void 0:e.firstName,e==null?void 0:e.initials,e==null?void 0:e.lastName,e==null?void 0:e.titleId,y,p])}},le=()=>{const{customerId:e}=U(),n=e==="new"||!e,{data:a,isLoading:d}=X(n?void 0:e),g=M(),p=O(),y=S(),h=z(),i=$(),t=j(),{fields:l}=Q(a),v=r.useCallback(async w=>{const{firstName:T,lastName:E,documentId:F,documentTypeId:x,titleId:o,initials:q,phone:C,email:L,...D}=w,b=e==="new"?void 0:e,I={companyId:1,customerId:b,initials:q,firstName:T,lastName:E,documentId:F,documentTypeId:typeof x=="string"?parseInt(x,10):x,titleId:typeof o=="string"?parseInt(o,10):o,addresses:[{...D,main:!0}],phones:C?[{phone:C,main:!0}]:[],emails:L?[{email:L,main:!0}]:[]};n?I.createdBy=1:I.updatedBy=1;try{const f=await y(I);[200,201].includes((f==null?void 0:f.status)||0)&&(g(),p(b),i==null||i("success","Customer successfully saved",`The Customer ${a==null?void 0:a.firstName} ${a==null?void 0:a.lastName} has been successfully saved.`),h("/customers"))}catch(f){const u=f;t==null||t(s(k,{errors:u.cause.errors}),"Error Saving Customer","error")}},[t,i,a==null?void 0:a.firstName,a==null?void 0:a.lastName,e,n,h,y,p,g]),P=r.useCallback(()=>h("/customers"),[h]);return(d||!l)&&!n?s(Z,{}):s(B,{initialFields:l,initialData:a,children:s(G,{icon:s(H,{}),title:`${n?"New":"Edit"} Customer`,onAccept:v,onFinish:P,actions:s(R,{customer:a}),viewMode:!1,height:"600px",width:"850px"})})};export{le as default};
