import{b as i,T as p,j as t,D as b,A as n,G as d,a as y,J as h,F as T}from"./index-a0b9f4a7.js";import{r as s,c as m,L as r,O as C}from"./vendor-2ae8ef6f.js";import{V as x,R as f}from"./ReadOnlyHookedTable-5f576435.js";import"./swr-04965976.js";import"./Form-41bf580f.js";import{C as S}from"./CopyIcon-6c8dade6.js";import{N as k}from"./NewIcon-1fb8d883.js";import"./styled-components-e6489abd.js";import"./use-context-selector-6b0b0676.js";import"./@tanstack/react-table-e9a5a890.js";import"./react-virtual-793d5da3.js";import"./@tanstack/match-sorter-utils-120d5a33.js";const w=s.memo(({invoiceId:e})=>{const o=m();return i(p,{children:[t(r,{to:`${(e==null?void 0:e.toString())??""}`,"aria-label":`View invoice ${(e==null?void 0:e.toString())??""}`,state:{backgroundLocation:o},children:t(x,{})}),t(r,{to:`${(e==null?void 0:e.toString())??""}/copy`,"aria-label":`Copy invoice ${(e==null?void 0:e.toString())??""}`,state:{backgroundLocation:o},children:t(S,{})})]})}),D=({row:{original:{date:e}}})=>t(b,{date:e}),K=({row:{original:{total:e}}})=>n(e,"currency"),L=({row:{original:{subtotal:e}}})=>n(e,"currency"),F=({row:{original:{taxes:e}}})=>n(e,"currency"),M=({row:{original:{invoiceId:e}}})=>t(w,{invoiceId:e}),u=()=>{const e=s.useMemo(()=>[{accessorKey:"invoice",header:"Invoice"},{accessorKey:"date",header:"Date",cell:D,filterFn:(a,$,c,j)=>{var l;const g=((l=a==null?void 0:a.original)==null?void 0:l.date)??"";return d({dateToCheck:g,from:c[0],to:c[1]})}},{accessorKey:"customer",header:"Customer"},{accessorKey:"subtotal",header:"Subtotal",cell:L},{accessorKey:"taxes",header:"Taxes",cell:F},{accessorKey:"total",header:"Total",cell:K},{id:"actions",header:"",enableResizing:!1,maxSize:10,size:10,cell:M}],[]),o=s.useMemo(()=>[{id:"invoice",name:"Invoice"},{id:"documentId",name:"ID",type:"date"},{id:"customer",name:"Customer"},{id:"subtotal",name:"Sub Total",type:"number"},{id:"taxes",name:"Total",type:"number"},{id:"total",name:"Total",type:"number"}],[]);return{columns:e,columnMeta:o}},A="Invoices",N=()=>{const e=h(),o=m(),{columns:a}=u();return i(T,{children:[t(f,{dataHook:e,columns:a,height:"calc(100vh - 120px)",title:A,actions:t(r,{to:"new","aria-label":"New invoice",state:{backgroundLocation:o},children:t(k,{})})}),t(C,{})]})},U=()=>{const{columnMeta:e}=u();return t(y,{columnMeta:e,children:t(N,{})})};export{U as default};
