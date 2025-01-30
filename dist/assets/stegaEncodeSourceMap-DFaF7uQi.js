import{C as V}from"./index-B4B2NzEn.js";const C=/_key\s*==\s*['"](.*)['"]/;function G(n){return typeof n=="string"?C.test(n.trim()):typeof n=="object"&&"_key"in n}function W(n){if(!Array.isArray(n))throw new Error("Path is not an array");return n.reduce((t,r,i)=>{const e=typeof r;if(e==="number")return`${t}[${r}]`;if(e==="string")return`${t}${i===0?"":"."}${r}`;if(G(r)&&r._key)return`${t}[_key=="${r._key}"]`;if(Array.isArray(r)){const[s,o]=r;return`${t}[${s}:${o}]`}throw new Error(`Unsupported path segment \`${JSON.stringify(r)}\``)},"")}const x={"\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","'":"\\'","\\":"\\\\"},U={"\\f":"\f","\\n":`
`,"\\r":"\r","\\t":"	","\\'":"'","\\\\":"\\"};function K(n){return`$${n.map(t=>typeof t=="string"?`['${t.replace(/[\f\n\r\t'\\]/g,r=>x[r])}']`:typeof t=="number"?`[${t}]`:t._key!==""?`[?(@._key=='${t._key.replace(/['\\]/g,r=>x[r])}')]`:`[${t._index}]`).join("")}`}function A(n){const t=[],r=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;let i;for(;(i=r.exec(n))!==null;){if(i[1]!==void 0){const e=i[1].replace(/\\(\\|f|n|r|t|')/g,s=>U[s]);t.push(e);continue}if(i[2]!==void 0){t.push(parseInt(i[2],10));continue}if(i[3]!==void 0){const e=i[3].replace(/\\(\\')/g,s=>U[s]);t.push({_key:e,_index:-1});continue}}return t}function L(n){return n.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._key!=="")return{_key:t._key};if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function z(n){return n.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function B(n,t){if(!(t!=null&&t.mappings))return;const r=K(z(n));if(t.mappings[r]!==void 0)return{mapping:t.mappings[r],matchedPath:r,pathSuffix:""};const i=Object.entries(t.mappings).filter(([p])=>r.startsWith(p)).sort(([p],[d])=>d.length-p.length);if(i.length==0)return;const[e,s]=i[0],o=r.substring(e.length);return{mapping:s,matchedPath:e,pathSuffix:o}}function H(n){return n!==null&&Array.isArray(n)}function R(n){return typeof n=="object"&&n!==null}function k(n,t,r=[]){if(H(n))return n.map((i,e)=>{if(R(i)){const s=i._key;if(typeof s=="string")return k(i,t,r.concat({_key:s,_index:e}))}return k(i,t,r.concat(e))});if(R(n)){if(n._type==="block"||n._type==="span"){const i={...n};return n._type==="block"?i.children=k(n.children,t,r.concat("children")):n._type==="span"&&(i.text=k(n.text,t,r.concat("text"))),i}return Object.fromEntries(Object.entries(n).map(([i,e])=>[i,k(e,t,r.concat(i))]))}return t(n,r)}function X(n,t,r){return k(n,(i,e)=>{if(typeof i!="string")return i;const s=B(e,t);if(!s)return i;const{mapping:o,matchedPath:p}=s;if(o.type!=="value"||o.source.type!=="documentValue")return i;const d=t.documents[o.source.document],f=t.paths[o.source.path],u=A(p),y=A(f).concat(e.slice(u.length));return r({sourcePath:y,sourceDocument:d,resultPath:e,value:i})})}const S="drafts.";function Q(n){return n.startsWith(S)?n.slice(S.length):n}function Y(n){const{baseUrl:t,workspace:r="default",tool:i="default",id:e,type:s,path:o,projectId:p,dataset:d}=n;if(!t)throw new Error("baseUrl is required");if(!o)throw new Error("path is required");if(!e)throw new Error("id is required");if(t!=="/"&&t.endsWith("/"))throw new Error("baseUrl must not end with a slash");const f=r==="default"?void 0:r,u=i==="default"?void 0:i,y=Q(e),$=Array.isArray(o)?W(L(o)):o,h=new URLSearchParams({baseUrl:t,id:y,type:s,path:$});f&&h.set("workspace",f),u&&h.set("tool",u),p&&h.set("projectId",p),d&&h.set("dataset",d),e.startsWith(S)&&h.set("isDraft","");const _=[t==="/"?"":t];f&&_.push(f);const w=["mode=presentation",`id=${y}`,`type=${s}`,`path=${encodeURIComponent($)}`];return u&&w.push(`tool=${u}`),_.push("intent","edit",`${w.join(";")}?${h}`),_.join("/")}function Z(n){let t=typeof n=="string"?n:n.baseUrl;return t!=="/"&&(t=t.replace(/\/$/,"")),typeof n=="string"?{baseUrl:t}:{...n,baseUrl:t}}const m=({sourcePath:n,resultPath:t,value:r})=>{if(g(r)||v(r))return!1;const i=n.at(-1);return!(n.at(-2)==="slug"&&i==="current"||typeof i=="string"&&(i.startsWith("_")||i.endsWith("Id"))||n.some(e=>e==="meta"||e==="metadata"||e==="openGraph"||e==="seo")||T(n)||T(t)||typeof i=="string"&&F.has(i))},F=new Set(["color","colour","currency","email","format","gid","hex","href","hsl","hsla","icon","id","index","key","language","layout","link","linkAction","locale","lqip","page","path","ref","rgb","rgba","route","secret","slug","status","tag","template","theme","type","textTheme","unit","url","username","variant","website"]);function g(n){return/^\d{4}-\d{2}-\d{2}/.test(n)?!!Date.parse(n):!1}function v(n){try{new URL(n,n.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}function T(n){return n.some(t=>typeof t=="string"&&t.match(/type/i)!==null)}const E=20;function tt(n,t,r){var d,f,u,y,$,h,_,w,P;const{filter:i,logger:e,enabled:s}=r;if(!s){const a="config.enabled must be true, don't call this function otherwise";throw(d=e==null?void 0:e.error)==null||d.call(e,`[@sanity/client]: ${a}`,{result:n,resultSourceMap:t,config:r}),new TypeError(a)}if(!t)return(f=e==null?void 0:e.error)==null||f.call(e,"[@sanity/client]: Missing Content Source Map from response body",{result:n,resultSourceMap:t,config:r}),n;if(!r.studioUrl){const a="config.studioUrl must be defined";throw(u=e==null?void 0:e.error)==null||u.call(e,`[@sanity/client]: ${a}`,{result:n,resultSourceMap:t,config:r}),new TypeError(a)}const o={encoded:[],skipped:[]},p=X(n,t,({sourcePath:a,sourceDocument:l,resultPath:b,value:c})=>{if((typeof i=="function"?i({sourcePath:a,resultPath:b,filterDefault:m,sourceDocument:l,value:c}):m({sourcePath:a,resultPath:b,filterDefault:m,sourceDocument:l,value:c}))===!1)return e&&o.skipped.push({path:I(a),value:`${c.slice(0,E)}${c.length>E?"...":""}`,length:c.length}),c;e&&o.encoded.push({path:I(a),value:`${c.slice(0,E)}${c.length>E?"...":""}`,length:c.length});const{baseUrl:j,workspace:O,tool:N}=Z(typeof r.studioUrl=="function"?r.studioUrl(l):r.studioUrl);if(!j)return c;const{_id:D,_type:M,_projectId:q,_dataset:J}=l;return V(c,{origin:"sanity.io",href:Y({baseUrl:j,workspace:O,tool:N,id:D,type:M,path:a,...!r.omitCrossDatasetReferenceData&&{dataset:J,projectId:q}})},!1)});if(e){const a=o.skipped.length,l=o.encoded.length;if((a||l)&&((y=(e==null?void 0:e.groupCollapsed)||e.log)==null||y("[@sanity/client]: Encoding source map into result"),($=e.log)==null||$.call(e,`[@sanity/client]: Paths encoded: ${o.encoded.length}, skipped: ${o.skipped.length}`)),o.encoded.length>0&&((h=e==null?void 0:e.log)==null||h.call(e,"[@sanity/client]: Table of encoded paths"),(_=(e==null?void 0:e.table)||e.log)==null||_(o.encoded)),o.skipped.length>0){const b=new Set;for(const{path:c}of o.skipped)b.add(c.replace(C,"0").replace(/\[\d+\]/g,"[]"));(w=e==null?void 0:e.log)==null||w.call(e,"[@sanity/client]: List of skipped paths",[...b.values()])}(a||l)&&((P=e==null?void 0:e.groupEnd)==null||P.call(e))}return p}function I(n){return W(L(n))}var nt=Object.freeze({__proto__:null,stegaEncodeSourceMap:tt});export{X as encodeIntoResult,tt as stegaEncodeSourceMap,nt as stegaEncodeSourceMap$1};
