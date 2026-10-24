import{d as k,r as s,M as S,j as R,l as T,n as I,P as W,o as q,q as A,L as D}from"./proxy-BD4_X5Nx.js";/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Q=k("chevron-left",H);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Y=k("chevron-right",K);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Z=k("x",U);function L(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function X(...e){return o=>{let t=!1;const r=e.map(i=>{const n=L(i,o);return!t&&typeof n=="function"&&(t=!0),n});if(t)return()=>{for(let i=0;i<r.length;i++){const n=r[i];typeof n=="function"?n():L(e[i],null)}}}}function B(...e){return s.useCallback(X(...e),e)}class F extends s.Component{getSnapshotBeforeUpdate(o){const t=this.props.childRef.current;if(t&&o.isPresent&&!this.props.isPresent){const r=t.offsetParent,i=T(r)&&r.offsetWidth||0,n=this.props.sizeRef.current;n.height=t.offsetHeight||0,n.width=t.offsetWidth||0,n.top=t.offsetTop,n.left=t.offsetLeft,n.right=i-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function G({children:e,isPresent:o,anchorX:t,root:r}){const i=s.useId(),n=s.useRef(null),p=s.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:x}=s.useContext(S),E=B(n,e?.ref);return s.useInsertionEffect(()=>{const{width:c,height:g,top:f,left:a,right:d}=p.current;if(o||!n.current||!c||!g)return;const m=t==="left"?`left: ${a}`:`right: ${d}`;n.current.dataset.motionPopId=i;const u=document.createElement("style");x&&(u.nonce=x);const v=r??document.head;return v.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${c}px !important;
            height: ${g}px !important;
            ${m}px !important;
            top: ${f}px !important;
          }
        `),()=>{v.contains(u)&&v.removeChild(u)}},[o]),R.jsx(F,{isPresent:o,childRef:n,sizeRef:p,children:s.cloneElement(e,{ref:E})})}const V=({children:e,initial:o,isPresent:t,onExitComplete:r,custom:i,presenceAffectsLayout:n,mode:p,anchorX:x,root:E})=>{const c=I(J),g=s.useId();let f=!0,a=s.useMemo(()=>(f=!1,{id:g,initial:o,isPresent:t,custom:i,onExitComplete:d=>{c.set(d,!0);for(const m of c.values())if(!m)return;r&&r()},register:d=>(c.set(d,!1),()=>c.delete(d))}),[t,c,r]);return n&&f&&(a={...a}),s.useMemo(()=>{c.forEach((d,m)=>c.set(m,!1))},[t]),s.useEffect(()=>{!t&&!c.size&&r&&r()},[t]),p==="popLayout"&&(e=R.jsx(G,{isPresent:t,anchorX:x,root:E,children:e})),R.jsx(W.Provider,{value:a,children:e})};function J(){return new Map}const w=e=>e.key||"";function _(e){const o=[];return s.Children.forEach(e,t=>{s.isValidElement(t)&&o.push(t)}),o}const ee=({children:e,custom:o,initial:t=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:n="sync",propagate:p=!1,anchorX:x="left",root:E})=>{const[c,g]=q(p),f=s.useMemo(()=>_(e),[e]),a=p&&!c?[]:f.map(w),d=s.useRef(!0),m=s.useRef(f),u=I(()=>new Map),[v,z]=s.useState(f),[C,$]=s.useState(f);A(()=>{d.current=!1,m.current=f;for(let h=0;h<C.length;h++){const l=w(C[h]);a.includes(l)?u.delete(l):u.get(l)!==!0&&u.set(l,!1)}},[C,a.length,a.join("-")]);const M=[];if(f!==v){let h=[...f];for(let l=0;l<C.length;l++){const y=C[l],P=w(y);a.includes(P)||(h.splice(l,0,y),M.push(y))}return n==="wait"&&M.length&&(h=M),$(_(h)),z(f),null}const{forceRender:b}=s.useContext(D);return R.jsx(R.Fragment,{children:C.map(h=>{const l=w(h),y=p&&!c?!1:f===C||a.includes(l),P=()=>{if(u.has(l))u.set(l,!0);else return;let j=!0;u.forEach(N=>{N||(j=!1)}),j&&(b?.(),$(m.current),p&&g?.(),r&&r())};return R.jsx(V,{isPresent:y,initial:!d.current||t?void 0:!1,custom:o,presenceAffectsLayout:i,mode:n,root:E,onExitComplete:y?void 0:P,anchorX:x,children:h},l)})})};export{ee as A,Q as C,Z as X,Y as a};
