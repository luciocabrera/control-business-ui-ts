import{R as c}from"./vendor-2ae8ef6f.js";function b(){return b=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},b.apply(this,arguments)}function be(e,r){if(e==null)return{};var n={},t=Object.keys(e),a,i;for(i=0;i<t.length;i++)a=t[i],!(r.indexOf(a)>=0)&&(n[a]=e[a]);return n}var xe=["bottom","height","left","right","top","width"],ye=function(r,n){return r===void 0&&(r={}),n===void 0&&(n={}),xe.some(function(t){return r[t]!==n[t]})},z=new Map,oe,Oe=function e(){var r=[];z.forEach(function(n,t){var a=t.getBoundingClientRect();ye(a,n.rect)&&(n.rect=a,r.push(n))}),r.forEach(function(n){n.callbacks.forEach(function(t){return t(n.rect)})}),oe=window.requestAnimationFrame(e)};function Me(e,r){return{observe:function(){var t=z.size===0;z.has(e)?z.get(e).callbacks.push(r):z.set(e,{rect:void 0,hasRectChanged:!1,callbacks:[r]}),t&&Oe()},unobserve:function(){var t=z.get(e);if(t){var a=t.callbacks.indexOf(r);a>=0&&t.callbacks.splice(a,1),t.callbacks.length||z.delete(e),z.size||cancelAnimationFrame(oe)}}}}var K=typeof window<"u"?c.useLayoutEffect:c.useEffect;function $e(e,r){r===void 0&&(r={width:0,height:0});var n=c.useState(e.current),t=n[0],a=n[1],i=c.useReducer(Ce,r),v=i[0],d=i[1],x=c.useRef(!1);return K(function(){e.current!==t&&a(e.current)}),K(function(){if(t&&!x.current){x.current=!0;var m=t.getBoundingClientRect();d({rect:m})}},[t]),c.useEffect(function(){if(t){var m=Me(t,function(k){d({rect:k})});return m.observe(),function(){m.unobserve()}}},[t]),v}function Ce(e,r){var n=r.rect;return e.height!==n.height||e.width!==n.width?n:e}var ke=function(){return 50},we=function(r){return r},Fe=function(r,n){var t=n?"offsetWidth":"offsetHeight";return r[t]},Te=function(r){for(var n=Math.max(r.start-r.overscan,0),t=Math.min(r.end+r.overscan,r.size-1),a=[],i=n;i<=t;i++)a.push(i);return a};function je(e){var r,n=e.size,t=n===void 0?0:n,a=e.estimateSize,i=a===void 0?ke:a,v=e.overscan,d=v===void 0?1:v,x=e.paddingStart,m=x===void 0?0:x,k=e.paddingEnd,fe=k===void 0?0:k,M=e.parentRef,w=e.horizontal,y=e.scrollToFn,le=e.useObserver,ve=e.initialRect,H=e.onScrollElement,_=e.scrollOffsetFn,D=e.keyExtractor,G=D===void 0?we:D,J=e.measureSize,Q=J===void 0?Fe:J,U=e.rangeExtractor,V=U===void 0?Te:U,de=w?"width":"height",F=w?"scrollLeft":"scrollTop",S=c.useRef({scrollOffset:0,measurements:[]}),X=c.useState(0),me=X[0],Y=X[1];S.current.scrollOffset=me;var he=le||$e,ge=he(M,ve),Se=ge[de];S.current.outerSize=Se;var $=c.useCallback(function(s){M.current&&(M.current[F]=s)},[M,F]),Z=y||$;y=c.useCallback(function(s){Z(s,$)},[$,Z]);var ee=c.useState({}),re=ee[0],j=ee[1],pe=c.useCallback(function(){return j({})},[]),T=c.useRef([]),O=c.useMemo(function(){var s=T.current.length>0?Math.min.apply(Math,T.current):0;T.current=[];for(var f=S.current.measurements.slice(0,s),u=s;u<t;u++){var l=G(u),o=re[l],p=f[u-1]?f[u-1].end:m,h=typeof o=="number"?o:i(u),g=p+h;f[u]={index:u,start:p,size:h,end:g,key:l}}return f},[i,re,m,t,G]),te=(((r=O[t-1])==null?void 0:r.end)||m)+fe;S.current.measurements=O,S.current.totalSize=te;var C=H?H.current:M.current,A=c.useRef(_);A.current=_,K(function(){if(!C){Y(0);return}var s=function(u){var l=A.current?A.current(u):C[F];Y(l)};return s(),C.addEventListener("scroll",s,{capture:!1,passive:!0}),function(){C.removeEventListener("scroll",s)}},[C,F]);var ne=Le(S.current),ae=ne.start,se=ne.end,B=c.useMemo(function(){return V({start:ae,end:se,overscan:d,size:O.length})},[ae,se,d,O.length,V]),ue=c.useRef(Q);ue.current=Q;var Re=c.useMemo(function(){for(var s=[],f=function(p,h){var g=B[p],I=O[g],E=b(b({},I),{},{measureRef:function(L){if(L){var q=ue.current(L,w);if(q!==E.size){var ce=S.current.scrollOffset;E.start<ce&&$(ce+(q-E.size)),T.current.push(g),j(function(Ee){var W;return b(b({},Ee),{},(W={},W[E.key]=q,W))})}}}});s.push(E)},u=0,l=B.length;u<l;u++)f(u);return s},[B,$,w,O]),ie=c.useRef(!1);K(function(){ie.current&&j({}),ie.current=!0},[i]);var P=c.useCallback(function(s,f){var u=f===void 0?{}:f,l=u.align,o=l===void 0?"start":l,p=S.current,h=p.scrollOffset,g=p.outerSize;o==="auto"&&(s<=h?o="start":s>=h+g?o="end":o="start"),o==="start"?y(s):o==="end"?y(s-g):o==="center"&&y(s-g/2)},[y]),N=c.useCallback(function(s,f){var u=f===void 0?{}:f,l=u.align,o=l===void 0?"auto":l,p=be(u,["align"]),h=S.current,g=h.measurements,I=h.scrollOffset,E=h.outerSize,R=g[Math.max(0,Math.min(s,t-1))];if(R){if(o==="auto")if(R.end>=I+E)o="end";else if(R.start<=I)o="start";else return;var L=o==="center"?R.start+R.size/2:o==="end"?R.end:R.start;P(L,b({align:o},p))}},[P,t]),ze=c.useCallback(function(){for(var s=arguments.length,f=new Array(s),u=0;u<s;u++)f[u]=arguments[u];N.apply(void 0,f),requestAnimationFrame(function(){N.apply(void 0,f)})},[N]);return{virtualItems:Re,totalSize:te,scrollToOffset:P,scrollToIndex:ze,measure:pe}}var Ie=function(r,n,t,a){for(;r<=n;){var i=(r+n)/2|0,v=t(i);if(v<a)r=i+1;else if(v>a)n=i-1;else return i}return r>0?r-1:0};function Le(e){for(var r=e.measurements,n=e.outerSize,t=e.scrollOffset,a=r.length-1,i=function(m){return r[m].start},v=Ie(0,a,i,t),d=v;d<a&&r[d].end<t+n;)d++;return{start:v,end:d}}export{je as u};
