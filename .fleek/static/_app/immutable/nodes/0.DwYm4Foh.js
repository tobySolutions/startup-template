import{F as O,s as H,G as g,l as te,f as _,h as p,n as T,k as V,I as ne,e as oe,c as se,o as C,i as b,U as P,V as Q,x as ie,a as ae,g as re,y as le,z as ce,A as me}from"../chunks/scheduler.D8fFf-op.js";import{S as U,i as B,c as de,a as ue,m as fe,t as A,b as q,d as he}from"../chunks/index.C4Drof7a.js";import{d as G,w as h}from"../chunks/index.7X9LQzY4.js";let z,D;function j(o){if(typeof document>"u")return;clearTimeout(z),clearTimeout(D);const e=document.createElement("style"),n=document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);e.appendChild(n);const t=()=>document.head.appendChild(e),i=()=>document.head.removeChild(e);if(typeof window.getComputedStyle<"u"){t(),o(),window.getComputedStyle(e).opacity,i();return}if(typeof window.requestAnimationFrame<"u"){t(),o(),window.requestAnimationFrame(i);return}t(),z=window.setTimeout(()=>{o(),D=window.setTimeout(i,120)},120)}function F(o){return o.filter(e=>e.length>0)}const R={getItem:o=>null,setItem:(o,e)=>{}},y=typeof document<"u",ge=["dark","light","system"],M=h("mode-watcher-mode"),E=h("mode-watcher-theme"),W=_e(),K=we(),X=h(void 0),Y=Se(),L=h(!0),Z=h([]),x=h([]),ye=be();ke();function _e(){const o="system",e=y?localStorage:R,n=e.getItem(i());let t=N(n)?n:o;function i(){return O(M)}const{subscribe:a,set:s}=h(t,()=>{if(!y)return;const l=m=>{if(m.key!==i())return;const u=m.newValue;N(u)?s(t=u):s(t=o)};return addEventListener("storage",l),()=>removeEventListener("storage",l)});function r(l){s(t=l),e.setItem(i(),t)}return{subscribe:a,set:r}}function Se(){const o=y?localStorage:R,e=o.getItem(t());let n=e??"";function t(){return O(E)}const{subscribe:i,set:a}=h(n,()=>{if(!y)return;const r=l=>{if(l.key!==t())return;const m=l.newValue;a(m===null?n="":n=m)};return addEventListener("storage",r),()=>removeEventListener("storage",r)});function s(r){a(n=r),o.setItem(t(),n)}return{subscribe:i,set:s}}function we(){let e=!0;const{subscribe:n,set:t}=h(void 0,()=>{if(!y)return;const s=l=>{e&&t(l.matches?"light":"dark")},r=window.matchMedia("(prefers-color-scheme: light)");return r.addEventListener("change",s),()=>r.removeEventListener("change",s)});function i(){if(!y)return;const s=window.matchMedia("(prefers-color-scheme: light)");t(s.matches?"light":"dark")}function a(s){e=s}return{subscribe:n,query:i,tracking:a}}function be(){const{subscribe:o}=G([W,K,X,L,Z,x],([e,n,t,i,a,s])=>{if(!y)return;const r=e==="system"?n:e,l=F(a),m=F(s);function u(){const d=document.documentElement,f=document.querySelector('meta[name="theme-color"]');r==="light"?(l.length&&d.classList.remove(...l),m.length&&d.classList.add(...m),d.style.colorScheme="light",f&&t&&f.setAttribute("content",t.light)):(m.length&&d.classList.remove(...m),l.length&&d.classList.add(...l),d.style.colorScheme="dark",f&&t&&f.setAttribute("content",t.dark))}return i?j(u):u(),r});return{subscribe:o}}function ke(){const{subscribe:o}=G([Y,L],([e,n])=>{if(!y)return;function t(){document.documentElement.setAttribute("data-theme",e)}return n?j(t):t(),e});return{subscribe:o}}function N(o){return typeof o!="string"?!1:ge.includes(o)}function Ce(o){W.set(o)}function Te(o){Y.set(o)}function v({defaultMode:o,themeColors:e,darkClassNames:n=["dark"],lightClassNames:t=[],defaultTheme:i=""}){const a=document.documentElement,s=localStorage.getItem("mode-watcher-mode")||o,r=localStorage.getItem("mode-watcher-theme")||i,l=s==="light"||s==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches;if(l?(n.length&&a.classList.remove(...n),t.length&&a.classList.add(...t)):(t.length&&a.classList.remove(...t),n.length&&a.classList.add(...n)),a.style.colorScheme=l?"light":"dark",e){const m=document.querySelector('meta[name="theme-color"]');m&&m.setAttribute("content",s==="light"?e.light:e.dark)}r&&(a.setAttribute("data-theme",r),localStorage.setItem("mode-watcher-theme",r)),localStorage.setItem("mode-watcher-mode",s)}function J(o){let e,n;return{c(){e=oe("meta"),this.h()},l(t){e=se(t,"META",{name:!0,content:!0}),this.h()},h(){C(e,"name","theme-color"),C(e,"content",n=o[0].dark)},m(t,i){b(t,e,i)},p(t,i){i&1&&n!==(n=t[0].dark)&&C(e,"content",n)},d(t){t&&_(e)}}}function Me(o){let e,n="<script>("+v.toString()+")("+JSON.stringify(o[2])+");<\/script>",t;return{c(){e=new P(!1),t=g(),this.h()},l(i){e=Q(i,!1),t=g(),this.h()},h(){e.a=t},m(i,a){e.m(n,i,a),b(i,t,a)},p:T,d(i){i&&(_(t),e.d())}}}function Ee(o){let e,n=`<script nonce=${o[1]}>(`+v.toString()+")("+JSON.stringify(o[2])+");<\/script>",t;return{c(){e=new P(!1),t=g(),this.h()},l(i){e=Q(i,!1),t=g(),this.h()},h(){e.a=t},m(i,a){e.m(n,i,a),b(i,t,a)},p(i,a){a&2&&n!==(n=`<script nonce=${i[1]}>(`+v.toString()+")("+JSON.stringify(i[2])+");<\/script>")&&e.p(n)},d(i){i&&(_(t),e.d())}}}function Ke(o){let e,n,t=o[0]&&J(o);function i(r,l){return r[1]?Ee:Me}let a=i(o),s=a(o);return{c(){t&&t.c(),e=g(),s.c(),n=g()},l(r){const l=te("svelte-1nen96w",document.head);t&&t.l(l),e=g(),s.l(l),n=g(),l.forEach(_)},m(r,l){t&&t.m(document.head,null),p(document.head,e),s.m(document.head,null),p(document.head,n)},p(r,[l]){r[0]?t?t.p(r,l):(t=J(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null),a===(a=i(r))&&s?s.p(r,l):(s.d(1),s=a(r),s&&(s.c(),s.m(n.parentNode,n)))},i:T,o:T,d(r){t&&t.d(r),_(e),s.d(r),_(n)}}}function Ne(o,e,n){let t,i,a;V(o,E,c=>n(12,i=c)),V(o,M,c=>n(13,a=c));let{track:s=!0}=e,{defaultMode:r="system"}=e,{themeColors:l=void 0}=e,{disableTransitions:m=!0}=e,{darkClassNames:u=["dark"]}=e,{lightClassNames:d=[]}=e,{defaultTheme:f=""}=e,{nonce:k=""}=e,{themeStorageKey:S="mode-watcher-theme"}=e,{modeStorageKey:w="mode-watcher-mode"}=e;ne(()=>{const c=ye.subscribe(()=>{});K.tracking(s),K.query();const I=localStorage.getItem(a);Ce(N(I)?I:r);const ee=localStorage.getItem(i);return Te(ee||f),()=>{c()}});const $={defaultMode:r,themeColors:l,darkClassNames:u,lightClassNames:d,defaultTheme:f,modeStorageKey:w,themeStorageKey:S};return o.$$set=c=>{"track"in c&&n(3,s=c.track),"defaultMode"in c&&n(4,r=c.defaultMode),"themeColors"in c&&n(0,l=c.themeColors),"disableTransitions"in c&&n(5,m=c.disableTransitions),"darkClassNames"in c&&n(6,u=c.darkClassNames),"lightClassNames"in c&&n(7,d=c.lightClassNames),"defaultTheme"in c&&n(8,f=c.defaultTheme),"nonce"in c&&n(9,k=c.nonce),"themeStorageKey"in c&&n(10,S=c.themeStorageKey),"modeStorageKey"in c&&n(11,w=c.modeStorageKey)},o.$$.update=()=>{o.$$.dirty&32&&L.set(m),o.$$.dirty&1&&X.set(l),o.$$.dirty&64&&Z.set(u),o.$$.dirty&128&&x.set(d),o.$$.dirty&2048&&M.set(w),o.$$.dirty&1024&&E.set(S),o.$$.dirty&512&&n(1,t=typeof window>"u"?k:"")},[l,t,$,s,r,m,u,d,f,k,S,w]}class ve extends U{constructor(e){super(),B(this,e,Ne,Ke,H,{track:3,defaultMode:4,themeColors:0,disableTransitions:5,darkClassNames:6,lightClassNames:7,defaultTheme:8,nonce:9,themeStorageKey:10,modeStorageKey:11})}}function Le(o){let e,n,t;e=new ve({});const i=o[1].default,a=ie(i,o,o[0],null);return{c(){de(e.$$.fragment),n=ae(),a&&a.c()},l(s){ue(e.$$.fragment,s),n=re(s),a&&a.l(s)},m(s,r){fe(e,s,r),b(s,n,r),a&&a.m(s,r),t=!0},p(s,[r]){a&&a.p&&(!t||r&1)&&le(a,i,s,s[0],t?me(i,s[0],r,null):ce(s[0]),null)},i(s){t||(A(e.$$.fragment,s),A(a,s),t=!0)},o(s){q(e.$$.fragment,s),q(a,s),t=!1},d(s){s&&_(n),he(e,s),a&&a.d(s)}}}function Ie(o,e,n){let{$$slots:t={},$$scope:i}=e;return o.$$set=a=>{"$$scope"in a&&n(0,i=a.$$scope)},[i,t]}class qe extends U{constructor(e){super(),B(this,e,Ie,Le,H,{})}}export{qe as component};