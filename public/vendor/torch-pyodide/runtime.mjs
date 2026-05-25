var cc=Object.defineProperty;var dc=(e,t)=>{for(var r in t)cc(e,r,{get:t[r],enumerable:!0})};var Hn=null;async function Ls(){if(Hn)return Hn;let t=Xt().limits;return Hn={workgroupSharedMemory:!0,timestampQuery:!1,subgroups:!1,limits:{maxComputeWorkgroupSizeX:t.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.maxComputeWorkgroupSizeZ,maxComputeInvocationsPerWorkgroup:t.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupsPerDimension:t.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.maxStorageBufferBindingSize,maxBufferSize:t.maxBufferSize},platform:{browser:"unknown",gpu:"unknown"}},Hn}var Ie="0.8.2",p=Symbol(`typegpu:${Ie}:$internal`),X=Symbol(`typegpu:${Ie}:$gpuValueOf`),oe=Symbol(`typegpu:${Ie}:$getNameForward`),Nt=Symbol(`typegpu:${Ie}:$providing`),Re=Symbol(`typegpu:${Ie}:$ownSnippet`),H=Symbol(`typegpu:${Ie}:$resolve`),Zt=Symbol(`typegpu:${Ie}:$repr`),Uy=Symbol(`typegpu:${Ie}:$gpuRepr`),Oy=Symbol(`typegpu:${Ie}:$reprPartial`),Iy=Symbol(`typegpu:${Ie}:$memIdent`),Hy=Symbol(`typegpu:${Ie}:$invalidStorageSchema`),Cy=Symbol(`typegpu:${Ie}:$validUniformSchema`),Ly=Symbol(`typegpu:${Ie}:$validVertexSchema`),Vy=Symbol(`typegpu:${Ie}:$invalidSchemaReason`);function q(e){return!!e?.[p]}var Se={[p]:!0,type:"void",toString(){return"void"}},pc=["bool","f32","f16","i32","u32","u16","vec2f","vec2h","vec2i","vec2u","vec2<bool>","vec3f","vec3h","vec3i","vec3u","vec3<bool>","vec4f","vec4h","vec4i","vec4u","vec4<bool>","mat2x2f","mat3x3f","mat4x4f","struct","array","ptr","atomic","decorated","abstractInt","abstractFloat","void","texture_1d","texture_storage_1d","texture_2d","texture_storage_2d","texture_multisampled_2d","texture_depth_2d","texture_depth_multisampled_2d","texture_2d_array","texture_storage_2d_array","texture_depth_2d_array","texture_cube","texture_depth_cube","texture_cube_array","texture_depth_cube_array","texture_3d","texture_storage_3d","texture_external","sampler","sampler_comparison"];function ne(e){let t=e;return q(t)&&typeof t.kind=="string"&&t.kind.startsWith("vec")}function Fn(e){let t=e;return q(t)&&typeof t.type=="string"&&t.type.startsWith("vec2")}function Gn(e){let t=e;return q(t)&&typeof t.type=="string"&&t.type.startsWith("vec3")}function js(e){let t=e;return q(t)&&typeof t.type=="string"&&t.type.startsWith("vec4")}function Ke(e){return Fn(e)||Gn(e)||js(e)}function ot(e){let t=e;return q(t)&&typeof t.kind?.startsWith=="function"&&t.kind.startsWith("mat")}function Ws(e){return q(e)&&e?.type==="mat2x2f"}function qs(e){return q(e)&&e?.type==="mat3x3f"}function hc(e){return q(e)&&e?.type==="mat4x4f"}function Qt(e){return Ws(e)||qs(e)||hc(e)}function Ys(e){return ne(e)&&["vec2f","vec3f","vec4f"].includes(e.kind)}function _t(e){return q(e)&&pc.includes(e?.type)}function He(e){return q(e)&&e?.type==="array"}function _e(e){return q(e)&&e?.type==="struct"}function Nn(e){return q(e)&&e?.type==="ptr"}function Ks(e){return q(e)&&e?.type==="atomic"}function Xs(e){return q(e)&&e?.type==="@align"}function Qs(e){return q(e)&&e?.type==="@size"}function zo(e){return q(e)&&e?.type==="@location"}function Ao(e){return q(e)&&e?.type==="@builtin"}function $t(e){return q(e)&&e?.type==="decorated"}function jn(e){return q(e)&&e.type==="void"}function wt(e){let t=e?.type;return q(e)&&(t==="abstractInt"||t==="abstractFloat"||t==="f32"||t==="f16"||t==="i32"||t==="u32")}function Wn(e){let t=e?.type;return q(e)&&(t==="f16"||t==="vec2h"||t==="vec3h"||t==="vec4h")}var Kr=!1,Po=!1;Object.assign(globalThis,{__TYPEGPU_AUTONAME__:(e,t)=>(dr(e)&&q(e)&&!k(e)&&e.$name(t),e)});var Xr=globalThis,Jt=(Kr||Po)&&{get enabled(){return!!Xr.__TYPEGPU_MEASURE_PERF__},record(e,t){let r=Xr.__TYPEGPU_PERF_RECORDS__??=new Map,n=r.get(e);n||(n=[],r.set(e,n)),n.push(t)}}||void 0;function Eo(e){return!!e?.[oe]}function k(e){return Eo(e)?k(e[oe]):pr(e)?.name}function Q(e,t){Eo(e)&&Q(e[oe],t),mc(e,{name:t})}function dr(e){return!!e?.$name}function er(e){return!!pr(e)?.ast}function pr(e){return Xr.__TYPEGPU_META__.get(e)}function mc(e,t){Xr.__TYPEGPU_META__??=new WeakMap;let r=Xr.__TYPEGPU_META__;r.set(e,{...r.get(e),...t})}var Zs=["uint8","uint8x2","uint8x4","sint8","sint8x2","sint8x4","unorm8","unorm8x2","unorm8x4","snorm8","snorm8x2","snorm8x4","uint16","uint16x2","uint16x4","sint16","sint16x2","sint16x4","unorm16","unorm16x2","unorm16x4","snorm16","snorm16x2","snorm16x4","float16","float16x2","float16x4","float32","float32x2","float32x3","float32x4","uint32","uint32x2","uint32x3","uint32x4","sint32","sint32x2","sint32x3","sint32x4","unorm10-10-10-2","unorm8x4-bgra"],Ro={f32:"float32",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",f16:"float16",vec2h:"float16x2",vec4h:"float16x4",u32:"uint32",vec2u:"uint32x2",vec3u:"uint32x3",vec4u:"uint32x4",i32:"sint32",vec2i:"sint32x2",vec3i:"sint32x3",vec4i:"sint32x4"};function Bt(e){return e.type==="decorated"||e.type==="loose-decorated"?e.inner:e}var fc=["unstruct","disarray","loose-decorated",...Zs];function Dt(e){return q(e)&&fc.includes(e?.type)}function Ut(e){return q(e)&&e?.type==="disarray"}function ut(e){return q(e)&&e?.type==="unstruct"}function Ot(e){return q(e)&&e?.type==="loose-decorated"}function Yr(e){return e.attribs?.find(Xs)?.params[0]}function gc(e){return e.attribs?.find(Qs)?.params[0]}function xt(e){return e.attribs?.find(zo)?.params[0]}function Tt(e){return _t(e)||Dt(e)}var ze={type:"unknown",toString(){return"unknown"}},Js=class{constructor(e,t,r){this.name=e,this.lhs=t,this.operator=r}},ea=class{constructor(e){this.matrix=e}},ta=class{constructor(e){this.op=e,Q(this,"consoleLog")}[p]=!0},Vs="Invariant failed";function lt(e,t){if(e)return;if(!Kr)throw new Error(Vs);let r=typeof t=="function"?t():t,n=r?`${Vs}: ${r}`:Vs;throw new Error(n)}var tr=class Gs extends Error{constructor(t,r){let n=r.map(i=>`- ${er(i)?`fn*:${k(i)}`:i}`);n.length>20&&(n=[...n.slice(0,11),"...",...n.slice(-10)]),super(`Resolution of the following tree failed:
${n.join(`
`)}: ${t&&typeof t=="object"&&"message"in t?t.message:t}`),this.cause=t,this.trace=r,Object.setPrototypeOf(this,Gs.prototype)}appendToTrace(t){let r=[t,...this.trace];return new Gs(this.cause,r)}},ra=class Ns extends Error{constructor(t,r){let n=r.map(i=>`- ${i}`);n.length>20&&(n=[...n.slice(0,11),"...",...n.slice(-10)]),super(`Execution of the following tree failed:
${n.join(`
`)}: ${t&&typeof t=="object"&&"message"in t?t.message:t}`),this.cause=t,this.trace=r,Object.setPrototypeOf(this,Ns.prototype)}appendToTrace(t){let r=[t,...this.trace];return new Ns(this.cause,r)}},ko=class Bo extends Error{constructor(t){super(`Missing value for '${t}'`),this.slot=t,Object.setPrototypeOf(this,Bo.prototype)}},$o=class Do extends Error{constructor(t){super(`Buffer '${k(t)??"<unnamed>"}' is not bindable as a uniform. Use .$usage('uniform') to allow it.`),Object.setPrototypeOf(this,Do.prototype)}},na=class Uo extends Error{constructor(t,r){super(`The function '${t??"<unnamed>"}' is missing links to the following external values: ${r}.`),Object.setPrototypeOf(this,Uo.prototype)}},qn=class Oo extends Error{constructor(t){super(`Missing bind groups for layouts: '${[...t].map(r=>k(r)??"<unnamed>").join(", ")}'. Please provide it using pipeline.with(bindGroup).(...)`),Object.setPrototypeOf(this,Oo.prototype)}},ia=class Io extends Error{constructor(t){super(`Missing vertex buffers for layouts: '${[...t].map(r=>k(r)??"<unnamed>").join(", ")}'. Please provide it using pipeline.with(layout, buffer).(...)`),Object.setPrototypeOf(this,Io.prototype)}},sa=class Ho extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Ho.prototype)}},aa=class Co extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Co.prototype)}},Ce=class Lo extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Lo.prototype)}};function Yn(e){return e?.resourceType==="slot"}function Kn(e){return e?.resourceType==="derived"}function Xn(e){return e?.[Nt]!==void 0}function Qr(e){return e?.resourceType==="accessor"}var Vo=class{constructor(e,t){this.value=e,this.dataType=t}};function Zr(e){return e instanceof Vo}function Jr(e){return wt(e.dataType)}function w(e,t){if(Kr&&Zr(e))throw new Error("Cannot nest snippets");return new Vo(e,Bt(t))}var oa=class{type="normal"},Fo=class{type="codegen"},Go=class{constructor(e,t){this.buffers=e,this.vars=t}type="simulate"};function ua(e){return!!e?.[H]}function Qn(e){return e?.[Re]}function No(e){return typeof e=="number"||typeof e=="boolean"||typeof e=="string"||ua(e)||_t(e)||Yn(e)||Kn(e)||Xn(e)}function Zn(e){return!!e&&typeof e=="object"&&"getMappedRange"in e&&"mapAsync"in e}var Cn=!1;function jo(e){if(Cn)return e();try{return Cn=!0,e()}finally{Cn=!1}}function en(){return Cn}var Gt;function la(e,t){if(lt(Gt===void 0||Gt===e,"Cannot nest context providers"),Gt===e)return t();Gt=e;try{return t()}finally{Gt=void 0}}function jt(){return Gt}var ca=new oa;function tn(){return Gt?.mode??ca}function Xe(){return Gt?.mode.type==="codegen"}function y(e,...t){let r=jt();function n(s){return Zr(s)?r.resolve(s.value,s.dataType).value:s}let i="";for(let s=0;s<e.length;++s){i+=e[s];let a=t[s];Array.isArray(a)?i+=a.filter(o=>o!==void 0).map(n).join(", "):a&&(i+=n(a))}return i}function rr(e,t){throw new Error(`Failed to handle ${e} at ${t}`)}var da={rank:Number.POSITIVE_INFINITY,action:"none"};function Ln(e,t){let r=Bt(e),n=Bt(t);if(r.type===n.type)return{rank:0,action:"none"};if(r.type==="abstractFloat"){if(n.type==="f32")return{rank:1,action:"none"};if(n.type==="f16")return{rank:2,action:"none"}}if(r.type==="abstractInt"){if(n.type==="i32")return{rank:3,action:"none"};if(n.type==="u32")return{rank:4,action:"none"};if(n.type==="abstractFloat")return{rank:5,action:"none"};if(n.type==="f32")return{rank:6,action:"none"};if(n.type==="f16")return{rank:7,action:"none"}}return Ke(r)&&Ke(n)?Ln(r.primitive,n.primitive):Qt(r)&&Qt(n)?{rank:0,action:"none"}:da}function yc(e,t){let r=Bt(e),n=Bt(t);if(r.type==="ptr"&&Ln(r.inner,n).rank<Number.POSITIVE_INFINITY)return{rank:0,action:"deref"};if(n.type==="ptr"&&Ln(r,n.inner).rank<Number.POSITIVE_INFINITY)return{rank:1,action:"ref"};let i={f32:0,f16:1,i32:2,u32:3,bool:4};if(r.type in i&&n.type in i){let s=r.type,a=n.type;if(s!==a){let o=i[s];return{rank:i[a]<o?10:20,action:"cast",targetType:n}}}if(r.type==="abstractFloat"){if(n.type==="u32")return{rank:2,action:"cast",targetType:n};if(n.type==="i32")return{rank:1,action:"cast",targetType:n}}return da}function bc(e,t,r){let n=Ln(e,t);return n.rank<Number.POSITIVE_INFINITY?n:r?yc(e,t):da}function _o(e,t,r){let n;for(let s of t){let a=[],o=0;for(let u of e){let l=bc(u,s,r);if(o+=l.rank,l.rank===Number.POSITIVE_INFINITY)break;a.push(l)}o<(n?.sum??Number.POSITIVE_INFINITY)&&(n={type:s,details:a,sum:o})}if(!n)return;let i=n.details.map((s,a)=>({sourceIndex:a,action:s.action,...s.action==="cast"&&{targetType:s.targetType}}));return{targetType:n.type,actions:i,hasImplicitConversions:i.some(s=>s.action==="cast")}}function Jn(e,t){if(e.length===0)return;let r=[...new Set((t||e).map(Bt))],n=_o(e,r,!1);if(n)return n;let i=_o(e,r,!0);if(i)return i}function vc(e,t,r){if(t.action==="none")return w(e.value,r);switch(t.action){case"ref":return w(y`&${e}`,r);case"deref":return w(y`*${e}`,r);case"cast":return r(e);default:rr(t.action,"applyActionToSnippet")}}function Ae(e,t){if(e.some(n=>n.type==="unknown"))return;let r=Jn(e,t);if(r)return e.map(()=>r.targetType)}function hr(e,t,r=!0){let n=e.map(s=>s.dataType);if(n.some(s=>s.type==="unknown"))return;Kr&&Array.isArray(t)&&t.length===0&&console.warn("convertToCommonType was called with an empty restrictTo array, which prevents any conversions from being made. If you intend to allow all conversions, pass undefined instead. If this was intended call the function conditionally since the result will always be undefined.");let i=Jn(n,t);if(i)return(Po||Kr)&&r&&i.hasImplicitConversions&&console.warn(`Implicit conversions from [
${e.map(s=>`  ${s.value}: ${s.dataType.type}`).join(`,
`)}
] to ${i.targetType.type} are supported, but not recommended.
Consider using explicit conversions instead.`),e.map((s,a)=>{let o=i.actions[a];return lt(o,"Action should not be undefined"),vc(s,o,i.targetType)})}function ei(e,t,r=!0){if(t===e.dataType)return w(e.value,t);if(e.dataType.type==="unknown")return w(y`${w(e.value,t)}`,t);let n=hr([e],[t],r);if(!n)throw new Ce(`Cannot convert value of type '${e.dataType.type}' to type '${t.type}'`);return n[0]}function Wo(e,t){return Object.keys(e.propTypes).map(r=>{let n=t[r];if(!n)throw new Error(`Missing property ${r}`);let i=e.propTypes[r];return hr([n],[i])?.[0]??n})}function _c(e){return typeof e!="string"&&Qn(e)===void 0}function ge(e,t,r,n="keep"){let i=((...s)=>Xe()?t(...s):e(...s));return Q(i,r),i.toString=()=>r,Object.defineProperty(i,p,{value:{jsImpl:e,gpuImpl:t,argConversionHint:n}}),i}var Ue=class extends Error{constructor(e){super(e),this.name=this.constructor.name}};function T(e){let t=(...n)=>{let{argTypes:i,returnType:s}=typeof e.signature=="function"?e.signature(...n.map(o=>o.dataType)):e.signature,a=n.map((o,u)=>ei(o,i[u],!e.ignoreImplicitCastWarning));if(a.every(o=>_c(o.value))&&typeof e.normalImpl=="function")try{return w(e.normalImpl(...a.map(o=>o.value)),s)}catch(o){if(!(o instanceof Ue))throw o}return w(e.codegenImpl(...a),s)},r=((...n)=>{if(Xe())return t(...n);if(typeof e.normalImpl=="string")throw new Ue(e.normalImpl);return e.normalImpl(...n)});return Q(r,e.name),r.toString=()=>e.name,Object.defineProperty(r,p,{value:{jsImpl:e.normalImpl,gpuImpl:t,argConversionHint:"keep"}}),r}var rn={[p]:!0,type:"abstractInt",toString(){return"abstractInt"}},Qe={[p]:!0,type:"abstractFloat",toString(){return"abstractFloat"}},wc=T({name:"bool",signature:e=>({argTypes:e?[e]:[],returnType:te}),normalImpl(e){return e===void 0?!1:typeof e=="boolean"?e:!!e},codegenImpl:e=>e.dataType.type==="bool"?y`${e}`:y`bool(${e})`}),te=Object.assign(wc,{type:"bool"}),xc=T({name:"u32",signature:e=>({argTypes:e?[e]:[],returnType:A}),normalImpl(e){return e===void 0?0:typeof e=="boolean"?e?1:0:(e&4294967295)>>>0},codegenImpl:e=>e.dataType.type==="u32"?y`${e}`:y`u32(${e})`}),A=Object.assign(xc,{type:"u32"}),Tc=T({name:"i32",signature:e=>({argTypes:e?[e]:[],returnType:W}),normalImpl(e){return e===void 0?0:typeof e=="boolean"?e?1:0:e|0},codegenImpl:e=>e.dataType.type==="i32"?y`${e}`:y`i32(${e})`}),Mc={[p]:!0,type:"u16"},W=Object.assign(Tc,{type:"i32"}),Sc=T({name:"f32",signature:e=>({argTypes:e?[e]:[],returnType:g}),normalImpl(e){return e===void 0?0:typeof e=="boolean"?e?1:0:Math.fround(e)},codegenImpl:e=>e.dataType.type==="f32"?y`${e}`:y`f32(${e})`}),g=Object.assign(Sc,{type:"f32"}),qo=new ArrayBuffer(4),zc=new Float32Array(qo),Ac=new Uint32Array(qo);function Pc(e){zc[0]=e;let t=Ac[0],r=t>>>31&1,n=t>>>23&255,i=t&8388607;return n===255?r<<15|31744|(i?512:0):(n=n-127+15,n<=0?n<-10?r<<15:(i=(i|8388608)>>1-n,i=i+4096>>13,r<<15|i):n>=31||(i=i+4096,i&8388608&&(i=0,++n,n>=31))?r<<15|31744:r<<15|n<<10|i>>13)}function Ec(e){let t=e&32768?-1:1,r=e>>10&31,n=e&1023;return r===0?n?t*n*2**-24:t*0:r===31?n?Number.NaN:t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t*(1+n/1024)*2**(r-15)}function Rc(e){return Ec(Pc(e))}var kc=T({name:"f16",signature:e=>({argTypes:e?[e]:[],returnType:de}),normalImpl(e){return e===void 0?0:typeof e=="boolean"?e?1:0:Rc(e)},codegenImpl:e=>e.dataType.type==="f16"?y`${e}`:y`f16(${e})`}),de=Object.assign(kc,{type:"f16"}),pa=class extends Array{castElement(){return this[p].elementSchema[p].jsImpl}[H](){let e=this[p].elementSchema;return this.every(t=>!t)?w(`${this.kind}()`,e):this.every(t=>this[0]===t)?w(`${this.kind}(${this[0]})`,e):w(`${this.kind}(${this.join(", ")})`,e)}toString(){return this[H]().value}get xx(){return new this._Vec2(this[0],this[0])}get xy(){return new this._Vec2(this[0],this[1])}get xz(){return new this._Vec2(this[0],this[2])}get xw(){return new this._Vec2(this[0],this[3])}get yx(){return new this._Vec2(this[1],this[0])}get yy(){return new this._Vec2(this[1],this[1])}get yz(){return new this._Vec2(this[1],this[2])}get yw(){return new this._Vec2(this[1],this[3])}get zx(){return new this._Vec2(this[2],this[0])}get zy(){return new this._Vec2(this[2],this[1])}get zz(){return new this._Vec2(this[2],this[2])}get zw(){return new this._Vec2(this[2],this[3])}get wx(){return new this._Vec2(this[3],this[0])}get wy(){return new this._Vec2(this[3],this[1])}get wz(){return new this._Vec2(this[3],this[2])}get ww(){return new this._Vec2(this[3],this[3])}get xxx(){return new this._Vec3(this[0],this[0],this[0])}get xxy(){return new this._Vec3(this[0],this[0],this[1])}get xxz(){return new this._Vec3(this[0],this[0],this[2])}get xxw(){return new this._Vec3(this[0],this[0],this[3])}get xyx(){return new this._Vec3(this[0],this[1],this[0])}get xyy(){return new this._Vec3(this[0],this[1],this[1])}get xyz(){return new this._Vec3(this[0],this[1],this[2])}get xyw(){return new this._Vec3(this[0],this[1],this[3])}get xzx(){return new this._Vec3(this[0],this[2],this[0])}get xzy(){return new this._Vec3(this[0],this[2],this[1])}get xzz(){return new this._Vec3(this[0],this[2],this[2])}get xzw(){return new this._Vec3(this[0],this[2],this[3])}get xwx(){return new this._Vec3(this[0],this[3],this[0])}get xwy(){return new this._Vec3(this[0],this[3],this[1])}get xwz(){return new this._Vec3(this[0],this[3],this[2])}get xww(){return new this._Vec3(this[0],this[3],this[3])}get yxx(){return new this._Vec3(this[1],this[0],this[0])}get yxy(){return new this._Vec3(this[1],this[0],this[1])}get yxz(){return new this._Vec3(this[1],this[0],this[2])}get yxw(){return new this._Vec3(this[1],this[0],this[3])}get yyx(){return new this._Vec3(this[1],this[1],this[0])}get yyy(){return new this._Vec3(this[1],this[1],this[1])}get yyz(){return new this._Vec3(this[1],this[1],this[2])}get yyw(){return new this._Vec3(this[1],this[1],this[3])}get yzx(){return new this._Vec3(this[1],this[2],this[0])}get yzy(){return new this._Vec3(this[1],this[2],this[1])}get yzz(){return new this._Vec3(this[1],this[2],this[2])}get yzw(){return new this._Vec3(this[1],this[2],this[3])}get ywx(){return new this._Vec3(this[1],this[3],this[0])}get ywy(){return new this._Vec3(this[1],this[3],this[1])}get ywz(){return new this._Vec3(this[1],this[3],this[2])}get yww(){return new this._Vec3(this[1],this[3],this[3])}get zxx(){return new this._Vec3(this[2],this[0],this[0])}get zxy(){return new this._Vec3(this[2],this[0],this[1])}get zxz(){return new this._Vec3(this[2],this[0],this[2])}get zxw(){return new this._Vec3(this[2],this[0],this[3])}get zyx(){return new this._Vec3(this[2],this[1],this[0])}get zyy(){return new this._Vec3(this[2],this[1],this[1])}get zyz(){return new this._Vec3(this[2],this[1],this[2])}get zyw(){return new this._Vec3(this[2],this[1],this[3])}get zzx(){return new this._Vec3(this[2],this[2],this[0])}get zzy(){return new this._Vec3(this[2],this[2],this[1])}get zzz(){return new this._Vec3(this[2],this[2],this[2])}get zzw(){return new this._Vec3(this[2],this[2],this[3])}get zwx(){return new this._Vec3(this[2],this[3],this[0])}get zwy(){return new this._Vec3(this[2],this[3],this[1])}get zwz(){return new this._Vec3(this[2],this[3],this[2])}get zww(){return new this._Vec3(this[2],this[3],this[3])}get wxx(){return new this._Vec3(this[3],this[0],this[0])}get wxy(){return new this._Vec3(this[3],this[0],this[1])}get wxz(){return new this._Vec3(this[3],this[0],this[2])}get wxw(){return new this._Vec3(this[3],this[0],this[3])}get wyx(){return new this._Vec3(this[3],this[1],this[0])}get wyy(){return new this._Vec3(this[3],this[1],this[1])}get wyz(){return new this._Vec3(this[3],this[1],this[2])}get wyw(){return new this._Vec3(this[3],this[1],this[3])}get wzx(){return new this._Vec3(this[3],this[2],this[0])}get wzy(){return new this._Vec3(this[3],this[2],this[1])}get wzz(){return new this._Vec3(this[3],this[2],this[2])}get wzw(){return new this._Vec3(this[3],this[2],this[3])}get wwx(){return new this._Vec3(this[3],this[3],this[0])}get wwy(){return new this._Vec3(this[3],this[3],this[1])}get wwz(){return new this._Vec3(this[3],this[3],this[2])}get www(){return new this._Vec3(this[3],this[3],this[3])}get xxxx(){return new this._Vec4(this[0],this[0],this[0],this[0])}get xxxy(){return new this._Vec4(this[0],this[0],this[0],this[1])}get xxxz(){return new this._Vec4(this[0],this[0],this[0],this[2])}get xxxw(){return new this._Vec4(this[0],this[0],this[0],this[3])}get xxyx(){return new this._Vec4(this[0],this[0],this[1],this[0])}get xxyy(){return new this._Vec4(this[0],this[0],this[1],this[1])}get xxyz(){return new this._Vec4(this[0],this[0],this[1],this[2])}get xxyw(){return new this._Vec4(this[0],this[0],this[1],this[3])}get xxzx(){return new this._Vec4(this[0],this[0],this[2],this[0])}get xxzy(){return new this._Vec4(this[0],this[0],this[2],this[1])}get xxzz(){return new this._Vec4(this[0],this[0],this[2],this[2])}get xxzw(){return new this._Vec4(this[0],this[0],this[2],this[3])}get xxwx(){return new this._Vec4(this[0],this[0],this[3],this[0])}get xxwy(){return new this._Vec4(this[0],this[0],this[3],this[1])}get xxwz(){return new this._Vec4(this[0],this[0],this[3],this[2])}get xxww(){return new this._Vec4(this[0],this[0],this[3],this[3])}get xyxx(){return new this._Vec4(this[0],this[1],this[0],this[0])}get xyxy(){return new this._Vec4(this[0],this[1],this[0],this[1])}get xyxz(){return new this._Vec4(this[0],this[1],this[0],this[2])}get xyxw(){return new this._Vec4(this[0],this[1],this[0],this[3])}get xyyx(){return new this._Vec4(this[0],this[1],this[1],this[0])}get xyyy(){return new this._Vec4(this[0],this[1],this[1],this[1])}get xyyz(){return new this._Vec4(this[0],this[1],this[1],this[2])}get xyyw(){return new this._Vec4(this[0],this[1],this[1],this[3])}get xyzx(){return new this._Vec4(this[0],this[1],this[2],this[0])}get xyzy(){return new this._Vec4(this[0],this[1],this[2],this[1])}get xyzz(){return new this._Vec4(this[0],this[1],this[2],this[2])}get xyzw(){return new this._Vec4(this[0],this[1],this[2],this[3])}get xywx(){return new this._Vec4(this[0],this[1],this[3],this[0])}get xywy(){return new this._Vec4(this[0],this[1],this[3],this[1])}get xywz(){return new this._Vec4(this[0],this[1],this[3],this[2])}get xyww(){return new this._Vec4(this[0],this[1],this[3],this[3])}get xzxx(){return new this._Vec4(this[0],this[2],this[0],this[0])}get xzxy(){return new this._Vec4(this[0],this[2],this[0],this[1])}get xzxz(){return new this._Vec4(this[0],this[2],this[0],this[2])}get xzxw(){return new this._Vec4(this[0],this[2],this[0],this[3])}get xzyx(){return new this._Vec4(this[0],this[2],this[1],this[0])}get xzyy(){return new this._Vec4(this[0],this[2],this[1],this[1])}get xzyz(){return new this._Vec4(this[0],this[2],this[1],this[2])}get xzyw(){return new this._Vec4(this[0],this[2],this[1],this[3])}get xzzx(){return new this._Vec4(this[0],this[2],this[2],this[0])}get xzzy(){return new this._Vec4(this[0],this[2],this[2],this[1])}get xzzz(){return new this._Vec4(this[0],this[2],this[2],this[2])}get xzzw(){return new this._Vec4(this[0],this[2],this[2],this[3])}get xzwx(){return new this._Vec4(this[0],this[2],this[3],this[0])}get xzwy(){return new this._Vec4(this[0],this[2],this[3],this[1])}get xzwz(){return new this._Vec4(this[0],this[2],this[3],this[2])}get xzww(){return new this._Vec4(this[0],this[2],this[3],this[3])}get xwxx(){return new this._Vec4(this[0],this[3],this[0],this[0])}get xwxy(){return new this._Vec4(this[0],this[3],this[0],this[1])}get xwxz(){return new this._Vec4(this[0],this[3],this[0],this[2])}get xwxw(){return new this._Vec4(this[0],this[3],this[0],this[3])}get xwyx(){return new this._Vec4(this[0],this[3],this[1],this[0])}get xwyy(){return new this._Vec4(this[0],this[3],this[1],this[1])}get xwyz(){return new this._Vec4(this[0],this[3],this[1],this[2])}get xwyw(){return new this._Vec4(this[0],this[3],this[1],this[3])}get xwzx(){return new this._Vec4(this[0],this[3],this[2],this[0])}get xwzy(){return new this._Vec4(this[0],this[3],this[2],this[1])}get xwzz(){return new this._Vec4(this[0],this[3],this[2],this[2])}get xwzw(){return new this._Vec4(this[0],this[3],this[2],this[3])}get xwwx(){return new this._Vec4(this[0],this[3],this[3],this[0])}get xwwy(){return new this._Vec4(this[0],this[3],this[3],this[1])}get xwwz(){return new this._Vec4(this[0],this[3],this[3],this[2])}get xwww(){return new this._Vec4(this[0],this[3],this[3],this[3])}get yxxx(){return new this._Vec4(this[1],this[0],this[0],this[0])}get yxxy(){return new this._Vec4(this[1],this[0],this[0],this[1])}get yxxz(){return new this._Vec4(this[1],this[0],this[0],this[2])}get yxxw(){return new this._Vec4(this[1],this[0],this[0],this[3])}get yxyx(){return new this._Vec4(this[1],this[0],this[1],this[0])}get yxyy(){return new this._Vec4(this[1],this[0],this[1],this[1])}get yxyz(){return new this._Vec4(this[1],this[0],this[1],this[2])}get yxyw(){return new this._Vec4(this[1],this[0],this[1],this[3])}get yxzx(){return new this._Vec4(this[1],this[0],this[2],this[0])}get yxzy(){return new this._Vec4(this[1],this[0],this[2],this[1])}get yxzz(){return new this._Vec4(this[1],this[0],this[2],this[2])}get yxzw(){return new this._Vec4(this[1],this[0],this[2],this[3])}get yxwx(){return new this._Vec4(this[1],this[0],this[3],this[0])}get yxwy(){return new this._Vec4(this[1],this[0],this[3],this[1])}get yxwz(){return new this._Vec4(this[1],this[0],this[3],this[2])}get yxww(){return new this._Vec4(this[1],this[0],this[3],this[3])}get yyxx(){return new this._Vec4(this[1],this[1],this[0],this[0])}get yyxy(){return new this._Vec4(this[1],this[1],this[0],this[1])}get yyxz(){return new this._Vec4(this[1],this[1],this[0],this[2])}get yyxw(){return new this._Vec4(this[1],this[1],this[0],this[3])}get yyyx(){return new this._Vec4(this[1],this[1],this[1],this[0])}get yyyy(){return new this._Vec4(this[1],this[1],this[1],this[1])}get yyyz(){return new this._Vec4(this[1],this[1],this[1],this[2])}get yyyw(){return new this._Vec4(this[1],this[1],this[1],this[3])}get yyzx(){return new this._Vec4(this[1],this[1],this[2],this[0])}get yyzy(){return new this._Vec4(this[1],this[1],this[2],this[1])}get yyzz(){return new this._Vec4(this[1],this[1],this[2],this[2])}get yyzw(){return new this._Vec4(this[1],this[1],this[2],this[3])}get yywx(){return new this._Vec4(this[1],this[1],this[3],this[0])}get yywy(){return new this._Vec4(this[1],this[1],this[3],this[1])}get yywz(){return new this._Vec4(this[1],this[1],this[3],this[2])}get yyww(){return new this._Vec4(this[1],this[1],this[3],this[3])}get yzxx(){return new this._Vec4(this[1],this[2],this[0],this[0])}get yzxy(){return new this._Vec4(this[1],this[2],this[0],this[1])}get yzxz(){return new this._Vec4(this[1],this[2],this[0],this[2])}get yzxw(){return new this._Vec4(this[1],this[2],this[0],this[3])}get yzyx(){return new this._Vec4(this[1],this[2],this[1],this[0])}get yzyy(){return new this._Vec4(this[1],this[2],this[1],this[1])}get yzyz(){return new this._Vec4(this[1],this[2],this[1],this[2])}get yzyw(){return new this._Vec4(this[1],this[2],this[1],this[3])}get yzzx(){return new this._Vec4(this[1],this[2],this[2],this[0])}get yzzy(){return new this._Vec4(this[1],this[2],this[2],this[1])}get yzzz(){return new this._Vec4(this[1],this[2],this[2],this[2])}get yzzw(){return new this._Vec4(this[1],this[2],this[2],this[3])}get yzwx(){return new this._Vec4(this[1],this[2],this[3],this[0])}get yzwy(){return new this._Vec4(this[1],this[2],this[3],this[1])}get yzwz(){return new this._Vec4(this[1],this[2],this[3],this[2])}get yzww(){return new this._Vec4(this[1],this[2],this[3],this[3])}get ywxx(){return new this._Vec4(this[1],this[3],this[0],this[0])}get ywxy(){return new this._Vec4(this[1],this[3],this[0],this[1])}get ywxz(){return new this._Vec4(this[1],this[3],this[0],this[2])}get ywxw(){return new this._Vec4(this[1],this[3],this[0],this[3])}get ywyx(){return new this._Vec4(this[1],this[3],this[1],this[0])}get ywyy(){return new this._Vec4(this[1],this[3],this[1],this[1])}get ywyz(){return new this._Vec4(this[1],this[3],this[1],this[2])}get ywyw(){return new this._Vec4(this[1],this[3],this[1],this[3])}get ywzx(){return new this._Vec4(this[1],this[3],this[2],this[0])}get ywzy(){return new this._Vec4(this[1],this[3],this[2],this[1])}get ywzz(){return new this._Vec4(this[1],this[3],this[2],this[2])}get ywzw(){return new this._Vec4(this[1],this[3],this[2],this[3])}get ywwx(){return new this._Vec4(this[1],this[3],this[3],this[0])}get ywwy(){return new this._Vec4(this[1],this[3],this[3],this[1])}get ywwz(){return new this._Vec4(this[1],this[3],this[3],this[2])}get ywww(){return new this._Vec4(this[1],this[3],this[3],this[3])}get zxxx(){return new this._Vec4(this[2],this[0],this[0],this[0])}get zxxy(){return new this._Vec4(this[2],this[0],this[0],this[1])}get zxxz(){return new this._Vec4(this[2],this[0],this[0],this[2])}get zxxw(){return new this._Vec4(this[2],this[0],this[0],this[3])}get zxyx(){return new this._Vec4(this[2],this[0],this[1],this[0])}get zxyy(){return new this._Vec4(this[2],this[0],this[1],this[1])}get zxyz(){return new this._Vec4(this[2],this[0],this[1],this[2])}get zxyw(){return new this._Vec4(this[2],this[0],this[1],this[3])}get zxzx(){return new this._Vec4(this[2],this[0],this[2],this[0])}get zxzy(){return new this._Vec4(this[2],this[0],this[2],this[1])}get zxzz(){return new this._Vec4(this[2],this[0],this[2],this[2])}get zxzw(){return new this._Vec4(this[2],this[0],this[2],this[3])}get zxwx(){return new this._Vec4(this[2],this[0],this[3],this[0])}get zxwy(){return new this._Vec4(this[2],this[0],this[3],this[1])}get zxwz(){return new this._Vec4(this[2],this[0],this[3],this[2])}get zxww(){return new this._Vec4(this[2],this[0],this[3],this[3])}get zyxx(){return new this._Vec4(this[2],this[1],this[0],this[0])}get zyxy(){return new this._Vec4(this[2],this[1],this[0],this[1])}get zyxz(){return new this._Vec4(this[2],this[1],this[0],this[2])}get zyxw(){return new this._Vec4(this[2],this[1],this[0],this[3])}get zyyx(){return new this._Vec4(this[2],this[1],this[1],this[0])}get zyyy(){return new this._Vec4(this[2],this[1],this[1],this[1])}get zyyz(){return new this._Vec4(this[2],this[1],this[1],this[2])}get zyyw(){return new this._Vec4(this[2],this[1],this[1],this[3])}get zyzx(){return new this._Vec4(this[2],this[1],this[2],this[0])}get zyzy(){return new this._Vec4(this[2],this[1],this[2],this[1])}get zyzz(){return new this._Vec4(this[2],this[1],this[2],this[2])}get zyzw(){return new this._Vec4(this[2],this[1],this[2],this[3])}get zywx(){return new this._Vec4(this[2],this[1],this[3],this[0])}get zywy(){return new this._Vec4(this[2],this[1],this[3],this[1])}get zywz(){return new this._Vec4(this[2],this[1],this[3],this[2])}get zyww(){return new this._Vec4(this[2],this[1],this[3],this[3])}get zzxx(){return new this._Vec4(this[2],this[2],this[0],this[0])}get zzxy(){return new this._Vec4(this[2],this[2],this[0],this[1])}get zzxz(){return new this._Vec4(this[2],this[2],this[0],this[2])}get zzxw(){return new this._Vec4(this[2],this[2],this[0],this[3])}get zzyx(){return new this._Vec4(this[2],this[2],this[1],this[0])}get zzyy(){return new this._Vec4(this[2],this[2],this[1],this[1])}get zzyz(){return new this._Vec4(this[2],this[2],this[1],this[2])}get zzyw(){return new this._Vec4(this[2],this[2],this[1],this[3])}get zzzx(){return new this._Vec4(this[2],this[2],this[2],this[0])}get zzzy(){return new this._Vec4(this[2],this[2],this[2],this[1])}get zzzz(){return new this._Vec4(this[2],this[2],this[2],this[2])}get zzzw(){return new this._Vec4(this[2],this[2],this[2],this[3])}get zzwx(){return new this._Vec4(this[2],this[2],this[3],this[0])}get zzwy(){return new this._Vec4(this[2],this[2],this[3],this[1])}get zzwz(){return new this._Vec4(this[2],this[2],this[3],this[2])}get zzww(){return new this._Vec4(this[2],this[2],this[3],this[3])}get zwxx(){return new this._Vec4(this[2],this[3],this[0],this[0])}get zwxy(){return new this._Vec4(this[2],this[3],this[0],this[1])}get zwxz(){return new this._Vec4(this[2],this[3],this[0],this[2])}get zwxw(){return new this._Vec4(this[2],this[3],this[0],this[3])}get zwyx(){return new this._Vec4(this[2],this[3],this[1],this[0])}get zwyy(){return new this._Vec4(this[2],this[3],this[1],this[1])}get zwyz(){return new this._Vec4(this[2],this[3],this[1],this[2])}get zwyw(){return new this._Vec4(this[2],this[3],this[1],this[3])}get zwzx(){return new this._Vec4(this[2],this[3],this[2],this[0])}get zwzy(){return new this._Vec4(this[2],this[3],this[2],this[1])}get zwzz(){return new this._Vec4(this[2],this[3],this[2],this[2])}get zwzw(){return new this._Vec4(this[2],this[3],this[2],this[3])}get zwwx(){return new this._Vec4(this[2],this[3],this[3],this[0])}get zwwy(){return new this._Vec4(this[2],this[3],this[3],this[1])}get zwwz(){return new this._Vec4(this[2],this[3],this[3],this[2])}get zwww(){return new this._Vec4(this[2],this[3],this[3],this[3])}get wxxx(){return new this._Vec4(this[3],this[0],this[0],this[0])}get wxxy(){return new this._Vec4(this[3],this[0],this[0],this[1])}get wxxz(){return new this._Vec4(this[3],this[0],this[0],this[2])}get wxxw(){return new this._Vec4(this[3],this[0],this[0],this[3])}get wxyx(){return new this._Vec4(this[3],this[0],this[1],this[0])}get wxyy(){return new this._Vec4(this[3],this[0],this[1],this[1])}get wxyz(){return new this._Vec4(this[3],this[0],this[1],this[2])}get wxyw(){return new this._Vec4(this[3],this[0],this[1],this[3])}get wxzx(){return new this._Vec4(this[3],this[0],this[2],this[0])}get wxzy(){return new this._Vec4(this[3],this[0],this[2],this[1])}get wxzz(){return new this._Vec4(this[3],this[0],this[2],this[2])}get wxzw(){return new this._Vec4(this[3],this[0],this[2],this[3])}get wxwx(){return new this._Vec4(this[3],this[0],this[3],this[0])}get wxwy(){return new this._Vec4(this[3],this[0],this[3],this[1])}get wxwz(){return new this._Vec4(this[3],this[0],this[3],this[2])}get wxww(){return new this._Vec4(this[3],this[0],this[3],this[3])}get wyxx(){return new this._Vec4(this[3],this[1],this[0],this[0])}get wyxy(){return new this._Vec4(this[3],this[1],this[0],this[1])}get wyxz(){return new this._Vec4(this[3],this[1],this[0],this[2])}get wyxw(){return new this._Vec4(this[3],this[1],this[0],this[3])}get wyyx(){return new this._Vec4(this[3],this[1],this[1],this[0])}get wyyy(){return new this._Vec4(this[3],this[1],this[1],this[1])}get wyyz(){return new this._Vec4(this[3],this[1],this[1],this[2])}get wyyw(){return new this._Vec4(this[3],this[1],this[1],this[3])}get wyzx(){return new this._Vec4(this[3],this[1],this[2],this[0])}get wyzy(){return new this._Vec4(this[3],this[1],this[2],this[1])}get wyzz(){return new this._Vec4(this[3],this[1],this[2],this[2])}get wyzw(){return new this._Vec4(this[3],this[1],this[2],this[3])}get wywx(){return new this._Vec4(this[3],this[1],this[3],this[0])}get wywy(){return new this._Vec4(this[3],this[1],this[3],this[1])}get wywz(){return new this._Vec4(this[3],this[1],this[3],this[2])}get wyww(){return new this._Vec4(this[3],this[1],this[3],this[3])}get wzxx(){return new this._Vec4(this[3],this[2],this[0],this[0])}get wzxy(){return new this._Vec4(this[3],this[2],this[0],this[1])}get wzxz(){return new this._Vec4(this[3],this[2],this[0],this[2])}get wzxw(){return new this._Vec4(this[3],this[2],this[0],this[3])}get wzyx(){return new this._Vec4(this[3],this[2],this[1],this[0])}get wzyy(){return new this._Vec4(this[3],this[2],this[1],this[1])}get wzyz(){return new this._Vec4(this[3],this[2],this[1],this[2])}get wzyw(){return new this._Vec4(this[3],this[2],this[1],this[3])}get wzzx(){return new this._Vec4(this[3],this[2],this[2],this[0])}get wzzy(){return new this._Vec4(this[3],this[2],this[2],this[1])}get wzzz(){return new this._Vec4(this[3],this[2],this[2],this[2])}get wzzw(){return new this._Vec4(this[3],this[2],this[2],this[3])}get wzwx(){return new this._Vec4(this[3],this[2],this[3],this[0])}get wzwy(){return new this._Vec4(this[3],this[2],this[3],this[1])}get wzwz(){return new this._Vec4(this[3],this[2],this[3],this[2])}get wzww(){return new this._Vec4(this[3],this[2],this[3],this[3])}get wwxx(){return new this._Vec4(this[3],this[3],this[0],this[0])}get wwxy(){return new this._Vec4(this[3],this[3],this[0],this[1])}get wwxz(){return new this._Vec4(this[3],this[3],this[0],this[2])}get wwxw(){return new this._Vec4(this[3],this[3],this[0],this[3])}get wwyx(){return new this._Vec4(this[3],this[3],this[1],this[0])}get wwyy(){return new this._Vec4(this[3],this[3],this[1],this[1])}get wwyz(){return new this._Vec4(this[3],this[3],this[1],this[2])}get wwyw(){return new this._Vec4(this[3],this[3],this[1],this[3])}get wwzx(){return new this._Vec4(this[3],this[3],this[2],this[0])}get wwzy(){return new this._Vec4(this[3],this[3],this[2],this[1])}get wwzz(){return new this._Vec4(this[3],this[3],this[2],this[2])}get wwzw(){return new this._Vec4(this[3],this[3],this[2],this[3])}get wwwx(){return new this._Vec4(this[3],this[3],this[3],this[0])}get wwwy(){return new this._Vec4(this[3],this[3],this[3],this[1])}get wwwz(){return new this._Vec4(this[3],this[3],this[3],this[2])}get wwww(){return new this._Vec4(this[3],this[3],this[3],this[3])}},nn=class extends pa{e0;e1;constructor(e,t){super(2),this.e0=this.castElement()(e),this.e1=this.castElement()(t??e)}get 0(){return this.e0}get 1(){return this.e1}set 0(e){this.e0=this.castElement()(e)}set 1(e){this.e1=this.castElement()(e)}get x(){return this[0]}get y(){return this[1]}set x(e){this[0]=this.castElement()(e)}set y(e){this[1]=this.castElement()(e)}},sn=class extends pa{e0;e1;e2;constructor(e,t,r){super(3),this.e0=this.castElement()(e),this.e1=this.castElement()(t??e),this.e2=this.castElement()(r??e)}get 0(){return this.e0}get 1(){return this.e1}get 2(){return this.e2}set 0(e){this.e0=this.castElement()(e)}set 1(e){this.e1=this.castElement()(e)}set 2(e){this.e2=this.castElement()(e)}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this[0]=this.castElement()(e)}set y(e){this[1]=this.castElement()(e)}set z(e){this[2]=this.castElement()(e)}},an=class extends pa{e0;e1;e2;e3;constructor(e,t,r,n){super(4),this.e0=this.castElement()(e),this.e1=this.castElement()(t??e),this.e2=this.castElement()(r??e),this.e3=this.castElement()(n??e)}get 0(){return this.e0}get 1(){return this.e1}get 2(){return this.e2}get 3(){return this.e3}set 0(e){this.e0=this.castElement()(e)}set 1(e){this.e1=this.castElement()(e)}set 2(e){this.e2=this.castElement()(e)}set 3(e){this.e3=this.castElement()(e)}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(e){this[0]=e}set y(e){this[1]=e}set z(e){this[2]=e}set w(e){this[3]=e}},ha=class Yo extends nn{get[p](){return{elementSchema:g}}get kind(){return"vec2f"}get _Vec2(){return Yo}get _Vec3(){return ba}get _Vec4(){return Ta}},ma=class Ko extends nn{get[p](){return{elementSchema:de}}get kind(){return"vec2h"}get _Vec2(){return Ko}get _Vec3(){return va}get _Vec4(){return Ma}},fa=class Xo extends nn{get[p](){return{elementSchema:W}}get kind(){return"vec2i"}get _Vec2(){return Xo}get _Vec3(){return _a}get _Vec4(){return Sa}},ga=class Qo extends nn{get[p](){return{elementSchema:A}}get kind(){return"vec2u"}get _Vec2(){return Qo}get _Vec3(){return wa}get _Vec4(){return za}},ya=class Zo extends nn{get[p](){return{elementSchema:te}}get kind(){return"vec2<bool>"}get _Vec2(){return Zo}get _Vec3(){return xa}get _Vec4(){return Aa}},ba=class Jo extends sn{get[p](){return{elementSchema:g}}get kind(){return"vec3f"}get _Vec2(){return ha}get _Vec3(){return Jo}get _Vec4(){return Ta}},va=class eu extends sn{get[p](){return{elementSchema:de}}get kind(){return"vec3h"}get _Vec2(){return ma}get _Vec3(){return eu}get _Vec4(){return Ma}},_a=class tu extends sn{get[p](){return{elementSchema:W}}get kind(){return"vec3i"}get _Vec2(){return fa}get _Vec3(){return tu}get _Vec4(){return Sa}},wa=class ru extends sn{get[p](){return{elementSchema:A}}get kind(){return"vec3u"}get _Vec2(){return ga}get _Vec3(){return ru}get _Vec4(){return za}},xa=class nu extends sn{get[p](){return{elementSchema:te}}get kind(){return"vec3<bool>"}get _Vec2(){return ya}get _Vec3(){return nu}get _Vec4(){return Aa}},Ta=class iu extends an{get[p](){return{elementSchema:g}}get kind(){return"vec4f"}get _Vec2(){return ha}get _Vec3(){return ba}get _Vec4(){return iu}},Ma=class su extends an{get[p](){return{elementSchema:de}}get kind(){return"vec4h"}get _Vec2(){return ma}get _Vec3(){return va}get _Vec4(){return su}},Sa=class au extends an{get[p](){return{elementSchema:W}}get kind(){return"vec4i"}get _Vec2(){return fa}get _Vec3(){return _a}get _Vec4(){return au}},za=class ou extends an{get[p](){return{elementSchema:A}}get kind(){return"vec4u"}get _Vec2(){return ga}get _Vec3(){return wa}get _Vec4(){return ou}},Aa=class uu extends an{get[p](){return{elementSchema:te}}get kind(){return"vec4<bool>"}get _Vec2(){return ya}get _Vec3(){return xa}get _Vec4(){return uu}},K=$e(ha,g),Fe=$e(ma,de),fe=$e(fa,W),Ee=$e(ga,A),ct=$e(ya,te),ye=$e(ba,g),Ge=$e(va,de),Pe=$e(_a,W),le=$e(wa,A),dt=$e(xa,te),_=$e(Ta,g),Ne=$e(Ma,de),J=$e(Sa,W),ee=$e(za,A),pt=$e(Aa,te),on={vec2f:K,vec2h:Fe,vec2i:fe,vec2u:Ee,"vec2<bool>":ct,vec3f:ye,vec3h:Ge,vec3i:Pe,vec3u:le,"vec3<bool>":dt,vec4f:_,vec4h:Ne,vec4i:J,vec4u:ee,"vec4<bool>":pt};function $e(e,t){let{kind:r,length:n}=new e,i=T({name:r,signature:(...a)=>({argTypes:a.map(o=>{let u=Bt(o);return Ke(u)?u:t}),returnType:s}),normalImpl:(...a)=>{let o=new Array(a.length),u=0;for(let l of a)if(typeof l=="number"||typeof l=="boolean")o[u++]=l;else for(let c=0;c<l.length;++c)o[u++]=l[c];if(o.length<=1||o.length===n)return new e(...o);throw new Error(`'${r}' constructor called with invalid number of arguments.`)},ignoreImplicitCastWarning:!0,codegenImpl:(...a)=>y`${r}(${a})`}),s=Object.assign(i,{type:r,primitive:t,[Zt]:void 0});return s}var L=class{constructor(e){this.type=e}[p]=!0},vt={uint8:A,uint8x2:Ee,uint8x4:ee,sint8:W,sint8x2:fe,sint8x4:J,unorm8:g,unorm8x2:K,unorm8x4:_,snorm8:g,snorm8x2:K,snorm8x4:_,uint16:A,uint16x2:Ee,uint16x4:ee,sint16:W,sint16x2:fe,sint16x4:J,unorm16:g,unorm16x2:K,unorm16x4:_,snorm16:g,snorm16x2:K,snorm16x4:_,float16:g,float16x2:K,float16x4:_,float32:g,float32x2:K,float32x3:ye,float32x4:_,uint32:A,uint32x2:Ee,uint32x3:le,uint32x4:ee,sint32:W,sint32x2:fe,sint32x3:Pe,sint32x4:J,"unorm10-10-10-2":_,"unorm8x4-bgra":_},Pa=new Set(Object.keys(vt)),Bc=new L("uint8"),$c=new L("uint8x2"),Dc=new L("uint8x4"),Uc=new L("sint8"),Oc=new L("sint8x2"),Ic=new L("sint8x4"),Hc=new L("unorm8"),Cc=new L("unorm8x2"),Lc=new L("unorm8x4"),Vc=new L("snorm8"),Fc=new L("snorm8x2"),Gc=new L("snorm8x4"),Nc=new L("uint16"),jc=new L("uint16x2"),Wc=new L("uint16x4"),qc=new L("sint16"),Yc=new L("sint16x2"),Kc=new L("sint16x4"),Xc=new L("unorm16"),Qc=new L("unorm16x2"),Zc=new L("unorm16x4"),Jc=new L("snorm16"),ed=new L("snorm16x2"),td=new L("snorm16x4"),rd=new L("float16"),nd=new L("float16x2"),id=new L("float16x4"),sd=new L("float32"),ad=new L("float32x2"),od=new L("float32x3"),ud=new L("float32x4"),ld=new L("uint32"),cd=new L("uint32x2"),dd=new L("uint32x3"),pd=new L("uint32x4"),hd=new L("sint32"),md=new L("sint32x2"),fd=new L("sint32x3"),gd=new L("sint32x4"),yd=new L("unorm10-10-10-2"),bd=new L("unorm8x4-bgra");function Ea(e){return q(e)&&Pa.has(e?.type)}function nr(e){let t=String(e);if(t!=="[object Object]")return t;try{return JSON.stringify(e)}catch(r){return console.error("Error parsing JSON:",r),"<invalid json>"}}function Vn(e){return ne(e)||ot(e)?e.toString():Array.isArray(e)?`[${e.map(Vn).join(", ")}]`:e&&typeof e=="object"?`{ ${Object.entries(e).map(([t,r])=>`${t}: ${Vn(r)}`).join(", ")} }`:String(e)}var vd={f32:4,f16:2,i32:4,u32:4,bool:4,u16:2,vec2f:8,vec2h:4,vec2i:8,vec2u:8,vec2b:8,vec3f:16,vec3h:8,vec3i:16,vec3u:16,vec3b:16,vec4f:16,vec4h:8,vec4i:16,vec4u:16,vec4b:16,mat2x2f:8,mat3x3f:16,mat4x4f:16,atomic:4};function _d(e){let t=e?.type,r=vd[t];if(r!==void 0)return r;if(_e(e))return Object.values(e.propTypes).map(ce).reduce((n,i)=>n>i?n:i);if(He(e))return ce(e.elementType);if(ut(e)){let n=Object.values(e.propTypes)[0];return n?Yr(n)??1:1}if(Ut(e))return Yr(e.elementType)??1;if($t(e)||Ot(e))return Yr(e)??ce(e.inner);if(Pa.has(t))return 1;throw new Error(`Cannot determine alignment of data: ${nr(e)}`)}function wd(e){if(ut(e)){let t=Object.values(e.propTypes)[0];return t?Ve(t):1}return Ut(e)?Ve(e.elementType):Ot(e)?Yr(e)??Ve(e.inner):Yr(e)??1}var wo=new WeakMap,xo=new WeakMap;function ce(e){let t=wo.get(e);return t===void 0&&(t=_d(e),wo.set(e,t)),t}function Ve(e){let t=xo.get(e);return t===void 0&&(t=wd(e),xo.set(e,t)),t}var Oe=(e,t)=>{let r=t-1,n=~r;return(e&r)===0?e:(e&n)+t},xd={bool:4,f32:4,f16:2,i32:4,u32:4,u16:2,vec2f:8,vec2h:4,vec2i:8,vec2u:8,"vec2<bool>":8,vec3f:12,vec3h:6,vec3i:12,vec3u:12,"vec3<bool>":12,vec4f:16,vec4h:8,vec4i:16,vec4u:16,"vec4<bool>":16,mat2x2f:16,mat3x3f:48,mat4x4f:64,uint8:1,uint8x2:2,uint8x4:4,sint8:1,sint8x2:2,sint8x4:4,unorm8:1,unorm8x2:2,unorm8x4:4,snorm8:1,snorm8x2:2,snorm8x4:4,uint16:2,uint16x2:4,uint16x4:8,sint16:2,sint16x2:4,sint16x4:8,unorm16:2,unorm16x2:4,unorm16x4:8,snorm16:2,snorm16x2:4,snorm16x4:8,float16:2,float16x2:4,float16x4:8,float32:4,float32x2:8,float32x3:12,float32x4:16,uint32:4,uint32x2:8,uint32x3:12,uint32x4:16,sint32:4,sint32x2:8,sint32x3:12,sint32x4:16,"unorm10-10-10-2":4,"unorm8x4-bgra":4,atomic:4};function Td(e){let t=0,r=e.propTypes;for(let n of Object.values(r)){if(Number.isNaN(t))throw new Error("Only the last property of a struct can be unbounded");if(t=Oe(t,ce(n)),t+=j(n),Number.isNaN(t)&&n.type!=="array")throw new Error("Cannot nest unbounded struct within another struct")}return Oe(t,ce(e))}function Md(e){let t=0,r=e.propTypes;for(let n of Object.values(r)){let i=Ve(n);t=Oe(t,i),t+=j(n)}return t}function Sd(e){let t=xd[e?.type];if(t!==void 0)return t;if(_e(e))return Td(e);if(ut(e))return Md(e);if(He(e)){if(e.elementCount===0)return Number.NaN;let r=ce(e.elementType);return Oe(j(e.elementType),r)*e.elementCount}if(Ut(e)){let r=Ve(e.elementType);return Oe(j(e.elementType),r)*e.elementCount}if($t(e)||Ot(e))return gc(e)??j(e.inner);throw new Error(`Cannot determine size of data: ${e}`)}var To=new WeakMap;function j(e){let t=To.get(e);return t===void 0&&(t=Sd(e),To.set(e,t)),t}function lu(e,t){return $t(e)?new Mo(e.inner,[t,...e.attribs]):Ot(e)?new So(e.inner,[t,...e.attribs]):Dt(e)?new So(e,[t]):new Mo(e,[t])}function un(e,t){return lu(t,{[p]:!0,type:"@location",params:[e]})}function Wt(e){return($t(e)||Ot(e))&&e.attribs.find(Ao)!==void 0}function ln(e){return!$t(e)&&!Ot(e)?"":e.attribs.map(t=>t.params.length===0?`${t.type} `:`${t.type}(${t.params.join(", ")}) `).join("")}var cu=class{constructor(e,t){this.inner=e,this.attribs=t;let r=t.find(Xs)?.params[0],n=t.find(Qs)?.params[0];if(r!==void 0){if(r<=0)throw new Error(`Custom data alignment must be a positive number, got: ${r}.`);if(Math.log2(r)%1!==0)throw new Error(`Alignment has to be a power of 2, got: ${r}.`);if(_t(this.inner)&&r%ce(this.inner)!==0)throw new Error(`Custom alignment has to be a multiple of the standard data alignment. Got: ${r}, expected multiple of: ${ce(this.inner)}.`)}if(n!==void 0){if(n<j(this.inner))throw new Error(`Custom data size cannot be smaller then the standard data size. Got: ${n}, expected at least: ${j(this.inner)}.`);if(n<=0)throw new Error(`Custom data size must be a positive number. Got: ${n}.`)}}[p]=!0},Mo=class extends cu{[p]=!0;type="decorated"},So=class extends cu{[p]=!0;type="loose-decorated"};function mr(e,t){let r=e?.type,n=r in vt?vt[r]:e;return typeof n!="function"?t:t===void 0?n():n(t)}function je(e){return du(e,!1)}function we(e){return du(e,!0)}function du(e,t){let r=n=>Object.fromEntries(Object.entries(e).map(([i,s])=>[i,mr(s,n?.[i])]));return Object.setPrototypeOf(r,zd),r.propTypes=e,Object.defineProperty(r,p,{value:{isAbstruct:t}}),r}var zd={type:"struct",$name(e){return Q(this,e),this},toString(){return`struct:${k(this)??"<unnamed>"}`}},Ze=ge(((e,t)=>t===void 0?r=>Fs(e,r):Fs(e,t)),(e,t)=>{if(t?.value===void 0){let r=n=>Ze[p].gpuImpl(e,n);return r[p]=!0,w(r,ze)}if(typeof t.value!="number")throw new Error(`Cannot create array schema with count unknown at compile-time: '${t.value}'`);return w(Fs(e.value,t.value),e.value)},"arrayOf");function Fs(e,t){let r=n=>{if(n&&n.length!==t)throw new Error(`Array schema of ${t} elements of type ${e.type} called with ${n.length} argument(s).`);return Array.from({length:t},(i,s)=>mr(e,n?.[s]))};if(Object.setPrototypeOf(r,Ad),Number.isNaN(j(e)))throw new Error("Cannot nest runtime sized arrays.");if(r.elementType=e,!Number.isInteger(t)||t<0)throw new Error(`Cannot create array schema with invalid element count: ${t}.`);return r.elementCount=t,r}var Ad={[p]:!0,type:"array",toString(){return`arrayOf(${this.elementType}, ${this.elementCount})`}};function Be(e,t){return lu(e,{[p]:!0,type:"@builtin",params:[t]})}var Ra={vertexIndex:Be(A,"vertex_index"),instanceIndex:Be(A,"instance_index"),position:Be(_,"position"),clipDistances:Be(Ze(A,8),"clip_distances"),frontFacing:Be(te,"front_facing"),fragDepth:Be(g,"frag_depth"),sampleIndex:Be(A,"sample_index"),sampleMask:Be(A,"sample_mask"),localInvocationId:Be(le,"local_invocation_id"),localInvocationIndex:Be(A,"local_invocation_index"),globalInvocationId:Be(le,"global_invocation_id"),workgroupId:Be(le,"workgroup_id"),numWorkgroups:Be(le,"num_workgroups"),subgroupInvocationId:Be(A,"subgroup_invocation_id"),subgroupSize:Be(A,"subgroup_size")};var ka={};dc(ka,{FORMAT_VERSION:()=>Ed,FuncParameterType:()=>ti,NodeTypeCatalog:()=>Pd});var Pd={block:0,binaryExpr:1,assignmentExpr:2,logicalExpr:3,unaryExpr:4,numericLiteral:5,call:6,memberAccess:7,indexAccess:8,return:10,if:11,let:12,const:13,for:14,while:15,continue:16,break:17,arrayExpr:100,preUpdate:101,postUpdate:102,stringLiteral:103,objectExpr:104},ti={identifier:"i",destructuredObject:"d"},Ed=1;function fr(e,t){for(let[r,n]of Object.entries(t))e[r]=n,n&&(typeof n=="object"||typeof n=="function")&&k(n)===void 0&&Q(n,r)}function fu(e,t,r){let n=[...e.matchAll(/:\s*(?<arg>.*?)\s*[,)]/g)].map(i=>i?i[1]:void 0);r(Object.fromEntries(t.flatMap((i,s)=>{let a=n?n[s]:void 0;return _e(i)&&a!==void 0?[[a,i]]:[]})))}function Ba(e,t,r){let n=e.match(/->\s(?<output>[\w\d_]+)\s{/),i=n?n[1]?.trim():void 0;_e(t)&&i&&!/\s/g.test(i)&&r({[i]:t})}function Rd(e){return new RegExp(`(?<![\\w\\$_.])${e.replaceAll(".","\\.").replaceAll("$","\\$")}(?![\\w\\$_])`,"g")}function cn(e,t,r){return Object.entries(t).reduce((n,[i,s])=>{let a=Rd(i);if(r&&i!=="Out"&&i!=="In"&&!a.test(r)&&console.warn(`The external '${i}' wasn't used in the resolved template.`),No(s)||Dt(s)||er(s))return n.replaceAll(a,e.resolve(s).value);if(s!==null&&typeof s=="object"){let o=[...r.matchAll(new RegExp(`${i.replaceAll(".","\\.").replaceAll("$","\\$")}\\.(?<prop>.*?)(?![\\w\\$_])`,"g"))].map(u=>u[1]);return[...new Set(o)].reduce((u,l)=>l&&l in s?cn(e,{[`${i}.${l}`]:s[l]},u):u,n)}return console.warn(`During resolution, the external '${i}' has been omitted. Only primitives, TGPU resources and plain JS objects can be used as externals.`),n},r)}function kd(e){let{strippedCode:t,argRange:r}=Bd(e),n=new gu(t);n.consume("(");let i=[];for(;!n.isAt(")");){let a=[];for(;n.isAt("@");)n.parseUntil(pu,hu),n.consume(")"),a.push(n.lastParsed);n.parseUntil(Dd);let o=n.lastParsed,u;n.isAt(":")&&(n.consume(":"),n.parseUntil(Ud,Id),u=n.lastParsed),i.push({identifier:o,attributes:a,type:u}),n.isAt(",")&&n.consume(",")}n.consume(")");let s;if(n.isAt("->")){n.consume("->");let a=[];for(;n.isAt("@");)n.parseUntil(pu,hu),n.consume(")"),a.push(n.lastParsed);s={type:n.str.slice(n.pos),attributes:a}}return{args:i,ret:s,range:{begin:r[0],end:r[1]}}}function Bd(e){let t=new gu(e),r="",n;for(;!t.isFinished();){if(t.isAt($d)){t.advanceBy(1);continue}if(t.isAt("//")){t.consume("//"),t.parseUntil(yu),t.advanceBy(1);continue}if(t.isAt("/*")){t.parseUntil(Od,Hd),t.consume("*/");continue}if(t.isAt("{"))return{strippedCode:r,argRange:[n,t.pos]};t.isAt("(")&&n===void 0&&(n=t.pos),n!==void 0&&(r+=t.str[t.pos]),t.advanceBy(1)}throw new Error("Invalid wgsl code!")}var gu=class{constructor(e){this.str=e,this.#t=0}#e;#t;get pos(){return this.#t}get lastParsed(){if(this.#e===void 0)throw new Error("Parse was not called yet!");return this.str.slice(this.#e,this.pos)}isFinished(){return this.#t>=this.str.length}isAt(e){if(typeof e=="string"){for(let t=0;t<e.length;t++)if(this.str[this.#t+t]!==e[t])return!1;return!0}for(let t of e)if(this.isAt(t))return!0;return!1}parseUntil(e,t){this.#e=this.#t;let r=0;for(;this.#t<this.str.length;){if(t&&this.isAt(t[0])&&(r+=1),t&&this.isAt(t[1])&&(r-=1),r===0&&this.isAt(e))return this.#t;this.#t+=1}throw new Error("Reached the end of the string without finding a match!")}advanceBy(e){this.#t+=e}consume(e){if(!this.isAt(e))throw new Error(`Expected '${e}' at position ${this.#t}, but found '${this.str.slice(this.#t,this.#t+e.length)}'`);this.advanceBy(e.length)}},yu=new Set([`
`,"\v","\f","\r","\x85","\u2028","\u2029"]),$d=new Set([...yu," ","	","\u200E","\u200F"]),pu=new Set([")"]),Dd=new Set([":",",",")"]),Ud=new Set([",",")"]),Od=new Set(["*/"]),hu=["(",")"],Id=["<",">"],Hd=["/*","*/"];function gr(e,t=""){let r=[],n={applyExternals(s){r.push(s)},resolve(s,a,o){let u={};for(let $ of r)fr(u,$);let l=s.getUniqueName(this);if(typeof e=="string"){if(!o)throw new Error("Explicit return type is required for string implementation");let $=cn(s,u,e),I="",G="";if(t!==""){let C=_e(a[0])?`(in: ${s.resolve(a[0]).value})`:"()",Y=_t(o)?ln(o):"",Me=o!==Se?_e(o)?`-> ${s.resolve(o).value}`:`-> ${Y!==""?Y:"@location(0)"} ${s.resolve(o).value}`:"";I=`${C} ${Me} `,G=$}else{let C=kd($);if(C.args.length!==a.length)throw new Error(`WGSL implementation has ${C.args.length} arguments, while the shell has ${a.length} arguments.`);let Y=C.args.map((ke,Ye)=>`${ke.identifier}: ${mu(s,`parameter ${ke.identifier}`,ke.type,a[Ye])}`).join(", "),Me=o===Se?"":`-> ${mu(s,"return type",C.ret?.type,o)}`;I=`(${Y}) ${Me}`,G=$.slice(C.range.end)}return s.addDeclaration(`${t}fn ${l}${I}${G}`),w(l,o)}let c=pr(e);if(c?.externals){let $=Object.fromEntries(Object.entries(c.externals).filter(([I])=>!(I in u)));fr(u,$)}let d=c?.ast;if(!d)throw new Error("Missing metadata for tgpu.fn function body (either missing 'use gpu' directive, or misconfigured `unplugin-typegpu`)");let h=d.externalNames.filter($=>!($ in u));if(h.length>0)throw new na(k(this),h);let m=d.params[1];m&&m.type==="i"&&t!==""&&fr(u,{[m.name]:Bt(o)});let f=[],v=[];for(let[$,I]of a.entries()){let G=d.params[$];switch(G?.type){case ti.identifier:{let C=G.name,Y=w(s.makeNameValid(C),I);f.push(Y),Y.value!==C&&v.push([C,Y]);break}case ti.destructuredObject:{f.push(w(`_arg_${$}`,I)),v.push(...G.props.map(({name:C,alias:Y})=>[Y,w(`_arg_${$}.${C}`,a[$].propTypes[C])]));break}case void 0:f.push(w(`_arg_${$}`,I))}}let{head:x,body:M,returnType:U}=s.fnToWgsl({args:f,argAliases:Object.fromEntries(v),returnType:o,body:d.body,externalMap:u});return s.addDeclaration(`${t}fn ${l}${s.resolve(x).value}${s.resolve(M).value}`),w(l,U)}},i=k(e);return i!==void 0&&Q(n,i),n}function mu(e,t,r,n){let i=e.resolve(n).value.replace(/\s/g,"");if(!r)return i;let s=r.replace(/\s/g,"");if(s!==i)throw new Error(`Type mismatch between TGPU shell and WGSL code string: ${t}, JS type "${i}", WGSL type "${s}".`);return r}function Cd(e,t={}){let r=0,n=new Set;return Object.fromEntries(Object.entries(e??{}).map(([i,s])=>{let a=xt(s);if(a!==void 0){if(n.has(a))throw new Error("Duplicate custom location attributes found");n.add(a)}return[i,s]}).map(([i,s])=>{if(Wt(s))return[i,s];if(xt(s)!==void 0)return[i,s];if(t[i])return[i,un(t[i],s)];for(;n.has(r);)r++;return[i,un(r++,s)]}))}function yr(e,t={}){return Tt(e)?jn(e)||xt(e)!==void 0?e:un(0,e):je(Cd(e,t))}function dn(e,...t){return Ld(e)?Vd(e,...t):e}function Ld(e){return Array.isArray(e)&&"raw"in e&&Array.isArray(e.raw)&&e.raw.every(t=>typeof t=="string")}function Vd(e,...t){return e.slice(1).reduce((r,n,i)=>`${r}${t[i]}${n}`,e[0])}function bu(e){if(Object.keys(e.out).length===0)throw new Error("A vertexFn output cannot be empty since it must include the 'position' builtin.");let t={in:e.in,out:e.out,argTypes:e.in&&Object.keys(e.in).length!==0?[yr(e.in)]:[],isEntry:!0},r=(n,...i)=>Fd(t,dn(n,...i));return Object.assign(Object.assign(r,t),{does:r})}function Fd(e,t){let r=gr(t,"@vertex "),n=e.argTypes[0];return{shell:e,$uses(i){return r.applyExternals(i),this},[p]:!0,[oe]:r,$name(i){return Q(r,i),dr(n)&&n.$name(`${i}_Input`),this},[H](i){let s=yr(e.out,i.varyingLocations).$name(`${k(this)??""}_Output`);return typeof t=="string"&&(n&&r.applyExternals({In:n}),r.applyExternals({Out:s})),r.resolve(i,e.argTypes,s)},toString(){return`vertexFn:${k(r)??"<unnamed>"}`}}}var Ua=class{};function Oa(e){let t=ge((...n)=>{let i=[];for(let s of n)if(typeof s=="number")i.push(s);else for(let a=0;a<s.length;++a)i.push(s[a]);if(i.length!==0&&i.length!==e.columns*e.rows)throw new Error(`'${e.type}' constructor called with invalid number of arguments.`);for(let s=i.length;s<e.columns*e.rows;++s)i.push(0);return new e.MatImpl(...i)},(...n)=>w(y`${e.type}(${n})`,r),e.type),r=Object.assign(t,{type:e.type,identity:Zd[e.columns],translation:e.columns===4?Jd:void 0,scaling:e.columns===4?ep:void 0,rotationX:e.columns===4?tp:void 0,rotationY:e.columns===4?rp:void 0,rotationZ:e.columns===4?np:void 0});return r}var Gd=class extends Ua{[p]=!0;columns;length=4;constructor(...e){super(),this.columns=[this.makeColumn(e[0],e[1]),this.makeColumn(e[2],e[3])]}get 0(){return this.columns[0].x}get 1(){return this.columns[0].y}get 2(){return this.columns[1].x}get 3(){return this.columns[1].y}set 0(e){this.columns[0].x=e}set 1(e){this.columns[0].y=e}set 2(e){this.columns[1].x=e}set 3(e){this.columns[1].y=e}*[Symbol.iterator](){yield this[0],yield this[1],yield this[2],yield this[3]}[H](){return w(`${this.kind}(${Array.from({length:this.length}).map((e,t)=>this[t]).join(", ")})`,gt)}toString(){return this[H]().value}},Nd=class extends Gd{kind="mat2x2f";makeColumn(e,t){return K(e,t)}},jd=class extends Ua{[p]=!0;columns;length=12;constructor(...e){super(),this.columns=[this.makeColumn(e[0],e[1],e[2]),this.makeColumn(e[3],e[4],e[5]),this.makeColumn(e[6],e[7],e[8])]}get 0(){return this.columns[0].x}get 1(){return this.columns[0].y}get 2(){return this.columns[0].z}get 3(){return 0}get 4(){return this.columns[1].x}get 5(){return this.columns[1].y}get 6(){return this.columns[1].z}get 7(){return 0}get 8(){return this.columns[2].x}get 9(){return this.columns[2].y}get 10(){return this.columns[2].z}get 11(){return 0}set 0(e){this.columns[0].x=e}set 1(e){this.columns[0].y=e}set 2(e){this.columns[0].z=e}set 3(e){}set 4(e){this.columns[1].x=e}set 5(e){this.columns[1].y=e}set 6(e){this.columns[1].z=e}set 7(e){}set 8(e){this.columns[2].x=e}set 9(e){this.columns[2].y=e}set 10(e){this.columns[2].z=e}set 11(e){}*[Symbol.iterator](){for(let e=0;e<12;e++)yield this[e]}[H](){return w(`${this.kind}(${this[0]}, ${this[1]}, ${this[2]}, ${this[4]}, ${this[5]}, ${this[6]}, ${this[8]}, ${this[9]}, ${this[10]})`,yt)}toString(){return this[H]().value}},Wd=class extends jd{kind="mat3x3f";makeColumn(e,t,r){return ye(e,t,r)}},qd=class extends Ua{[p]=!0;columns;constructor(...e){super(),this.columns=[this.makeColumn(e[0],e[1],e[2],e[3]),this.makeColumn(e[4],e[5],e[6],e[7]),this.makeColumn(e[8],e[9],e[10],e[11]),this.makeColumn(e[12],e[13],e[14],e[15])]}length=16;get 0(){return this.columns[0].x}get 1(){return this.columns[0].y}get 2(){return this.columns[0].z}get 3(){return this.columns[0].w}get 4(){return this.columns[1].x}get 5(){return this.columns[1].y}get 6(){return this.columns[1].z}get 7(){return this.columns[1].w}get 8(){return this.columns[2].x}get 9(){return this.columns[2].y}get 10(){return this.columns[2].z}get 11(){return this.columns[2].w}get 12(){return this.columns[3].x}get 13(){return this.columns[3].y}get 14(){return this.columns[3].z}get 15(){return this.columns[3].w}set 0(e){this.columns[0].x=e}set 1(e){this.columns[0].y=e}set 2(e){this.columns[0].z=e}set 3(e){this.columns[0].w=e}set 4(e){this.columns[1].x=e}set 5(e){this.columns[1].y=e}set 6(e){this.columns[1].z=e}set 7(e){this.columns[1].w=e}set 8(e){this.columns[2].x=e}set 9(e){this.columns[2].y=e}set 10(e){this.columns[2].z=e}set 11(e){this.columns[2].w=e}set 12(e){this.columns[3].x=e}set 13(e){this.columns[3].y=e}set 14(e){this.columns[3].z=e}set 15(e){this.columns[3].w=e}*[Symbol.iterator](){for(let e=0;e<16;e++)yield this[e]}[H](){return w(`${this.kind}(${Array.from({length:this.length}).map((e,t)=>this[t]).join(", ")})`,be)}toString(){return this[H]().value}},Yd=class extends qd{kind="mat4x4f";makeColumn(e,t,r,n){return _(e,t,r,n)}},Kd=ge(()=>gt(1,0,0,1),()=>w("mat2x2f(1, 0, 0, 1)",gt),"identity2"),Xd=ge(()=>yt(1,0,0,0,1,0,0,0,1),()=>w("mat3x3f(1, 0, 0, 0, 1, 0, 0, 0, 1)",yt),"identity3"),Qd=ge(()=>be(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),()=>w("mat4x4f(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",be),"identity4"),Zd={2:Kd,3:Xd,4:Qd},Jd=ge(e=>be(1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1),e=>w(y`mat4x4f(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${e}.x, ${e}.y, ${e}.z, 1)`,be),"translation4"),ep=ge(e=>be(e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1),e=>w(y`mat4x4f(${e}.x, 0, 0, 0, 0, ${e}.y, 0, 0, 0, 0, ${e}.z, 0, 0, 0, 0, 1)`,be),"scaling4"),tp=ge(e=>be(1,0,0,0,0,Math.cos(e),Math.sin(e),0,0,-Math.sin(e),Math.cos(e),0,0,0,0,1),e=>w(y`mat4x4f(1, 0, 0, 0, 0, cos(${e}), sin(${e}), 0, 0, -sin(${e}), cos(${e}), 0, 0, 0, 0, 1)`,be),"rotationX4"),rp=ge(e=>be(Math.cos(e),0,-Math.sin(e),0,0,1,0,0,Math.sin(e),0,Math.cos(e),0,0,0,0,1),e=>w(y`mat4x4f(cos(${e}), 0, -sin(${e}), 0, 0, 1, 0, 0, sin(${e}), 0, cos(${e}), 0, 0, 0, 0, 1)`,be),"rotationY4"),np=ge(e=>be(Math.cos(e),Math.sin(e),0,0,-Math.sin(e),Math.cos(e),0,0,0,0,1,0,0,0,0,1),e=>w(y`mat4x4f(cos(${e}), sin(${e}), 0, 0, -sin(${e}), cos(${e}), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`,be),"rotationZ4"),gt=Oa({type:"mat2x2f",rows:2,columns:2,MatImpl:Nd}),yt=Oa({type:"mat3x3f",rows:3,columns:3,MatImpl:Wd}),be=Oa({type:"mat4x4f",rows:4,columns:4,MatImpl:Yd});function ip(e){return e?.[X]}var sp={f:{1:g,2:K,3:ye,4:_},h:{1:de,2:Fe,3:Ge,4:Ne},i:{1:W,2:fe,3:Pe,4:J},u:{1:A,2:Ee,3:le,4:ee},b:{1:te,2:ct,3:dt,4:pt}},ap={vec2f:K,vec2h:Fe,vec2i:fe,vec2u:Ee,"vec2<bool>":ct,vec3f:ye,vec3h:Ge,vec3i:Pe,vec3u:le,"vec3<bool>":dt,vec4f:_,vec4h:Ne,vec4i:J,vec4u:ee,"vec4<bool>":pt,mat2x2f:gt,mat3x3f:yt,mat4x4f:be};function Da(e,t){if(_e(e)||ut(e))return e.propTypes[t]??ze;if(e===te||wt(e))return ze;let r=t.length;if(Ke(e)&&r>=1&&r<=4){let n=e.type.includes("bool")?"b":e.type[4],i=sp[n][r];if(i)return i}return ze}var vu={mat2x2f:K,mat3x3f:ye,mat4x4f:_};function $a(e){return He(e)||Ut(e)?e.elementType:Ke(e)?e.primitive:e.type in vu?vu[e.type]:ze}function vn(e){return e>=2**63||e<-(2**63)?w(e,Qe):Number.isInteger(e)?(Number.isSafeInteger(e)||console.warn(`The integer ${e} exceeds the safe integer range and may have lost precision.`),w(e,rn)):w(e,Qe)}function Dr(e){return e.type==="abstractFloat"?g:e.type==="abstractInt"?W:e}function zu(e){return e.map(t=>w(t.value,Dr(t.dataType)))}function fn(e){return Zr(e)?e:Qn(e)||(ne(e)||ot(e)?w(e,ap[e.kind]):typeof e=="string"||typeof e=="function"||typeof e=="object"||typeof e=="symbol"||typeof e>"u"||e===null?w(e,ze):typeof e=="number"?vn(e):typeof e=="boolean"?w(e,te):w(e,ze))}var it={get(e,t){if(t in e)return Reflect.get(e,t);if(t==="toString"||t===Symbol.toStringTag||t===Symbol.toPrimitive)return()=>e.toString();if(typeof t=="symbol")return;let r=Qn(e).dataType,n=Da(r,String(t));if(n.type!=="unknown")return new Proxy({[p]:!0,[H]:i=>w(`${i.resolve(e).value}.${String(t)}`,n),get[Re](){return w(this,n)},toString:()=>`${String(e)}.${t}`},it)}};function _n(e){let t=e;for(;;){let r=ip(t);if(!r)break;t=r}return t}function ai(e,t){return new op(e,t)}var op=class{constructor(e,t){this.dataType=e,this.#e=t}[p]={};#e;$name(e){return Q(this,e),this}[H](e){let t=e.getUniqueName(this),r=e.resolve(this.dataType).value,n=e.resolve(this.#e,this.dataType).value;return e.addDeclaration(`const ${t}: ${r} = ${n};`),w(t,this.dataType)}toString(){return`const:${k(this)??"<unnamed>"}`}get[X](){let e=this.dataType;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`const:${k(this)??"<unnamed>"}.$`},it)}get value(){return Xe()?this[X]:this.#e}get $(){return this.value}};function Ia(){return{[p]:!0,type:"sampler",[Zt]:void 0}}function Ha(){return{[p]:!0,type:"sampler_comparison",[Zt]:void 0}}function Au(e){return!!e[p]&&e.type==="sampler"}function Pu(e){return!!e[p]&&e.type==="sampler_comparison"}function oi(e){if("multisampled"in e){if(e.multisampled){if(e.dimension==="2d")return cp(e.sampleType);throw new Error(`Multisampled textures only support '2d' dimension, got '${e.dimension}'`)}switch(e.dimension){case"1d":return up(e.sampleType);case"2d":return lp(e.sampleType);case"2d-array":return dp(e.sampleType);case"3d":return mp(e.sampleType);case"cube":return pp(e.sampleType);case"cube-array":return hp(e.sampleType);default:throw new Error(`Unsupported texture dimension: '${e.dimension}'`)}}if(!("access"in e))throw new Error("Descriptor is neither a sampled nor a storage texture");switch(e.dimension){case"1d":return fp(e.format,e.access);case"2d":return gp(e.format,e.access);case"2d-array":return yp(e.format,e.access);case"3d":return bp(e.format,e.access);default:throw new Error(`Unsupported storage texture dimension: '${e.dimension}'`)}}function ur(e,t){let r=e.startsWith("texture_depth")?["depth","float","unfilterable-float"]:t.sampleType.type==="i32"?["sint"]:t.sampleType.type==="u32"?["uint"]:["float","unfilterable-float"];return{[p]:!0,[Zt]:void 0,type:e,bindingSampleType:r,...t}}function ui(e,t){return{[p]:!0,[Zt]:void 0,type:e,...t}}var _u=new Map,Ur={"write-only":"write","read-only":"read","read-write":"read_write"};function st(e,t){let r=_u.get(e);return r||(r=t(),_u.set(e,r)),r}function up(e){let t=e||g,r=`texture_1d<${t.type}>`;return st(r,()=>ur("texture_1d",{dimension:"1d",sampleType:t,multisampled:!1}))}function lp(e){let t=e||g,r=`texture_2d<${t.type}>`;return st(r,()=>ur("texture_2d",{dimension:"2d",sampleType:t,multisampled:!1}))}function cp(e){let t=e||g,r=`texture_multisampled_2d<${t.type}>`;return st(r,()=>ur("texture_multisampled_2d",{dimension:"2d",sampleType:t,multisampled:!0}))}function dp(e){let t=e||g,r=`texture_2d_array<${t.type}>`;return st(r,()=>ur("texture_2d_array",{dimension:"2d-array",sampleType:t,multisampled:!1}))}function pp(e){let t=e||g,r=`texture_cube<${t.type}>`;return st(r,()=>ur("texture_cube",{dimension:"cube",sampleType:t,multisampled:!1}))}function hp(e){let t=e||g,r=`texture_cube_array<${t.type}>`;return st(r,()=>ur("texture_cube_array",{dimension:"cube-array",sampleType:t,multisampled:!1}))}function mp(e){let t=e||g,r=`texture_3d<${t.type}>`;return st(r,()=>ur("texture_3d",{dimension:"3d",sampleType:t,multisampled:!1}))}function fp(e,t){let r=t||"write-only",n=`texture_storage_1d<${e}, ${Ur[r]}>`;return st(n,()=>ui("texture_storage_1d",{dimension:"1d",format:e,access:r}))}function gp(e,t){let r=t||"write-only",n=`texture_storage_2d<${e}, ${Ur[r]}>`;return st(n,()=>ui("texture_storage_2d",{dimension:"2d",format:e,access:r}))}function yp(e,t){let r=t||"write-only",n=`texture_storage_2d_array<${e}, ${Ur[r]}>`;return st(n,()=>ui("texture_storage_2d_array",{dimension:"2d-array",format:e,access:r}))}function bp(e,t){let r=t||"write-only",n=`texture_storage_3d<${e}, ${Ur[r]}>`;return st(n,()=>ui("texture_storage_3d",{dimension:"3d",format:e,access:r}))}function Eu(){return st("texture_external",()=>({[p]:!0,[Zt]:void 0,type:"texture_external",dimension:"2d"}))}function Ru(e){return!!e[p]&&typeof e.multisampled=="boolean"}function li(e){return!!e[p]&&typeof e.format=="string"&&typeof e.access=="string"}function ku(e){return new vp(e)}var vp=class{constructor(e){this.inner=e}[p]=!0;type="atomic"},or=(e,t,r)=>{if(e===t)return 0;let n=N((r-e)/(t-e),0,1);return n*n*(3-2*n)},N=(e,t,r)=>Math.min(Math.max(t,e),r),br=(e,t)=>t===0?e:Math.trunc(e/t);function ht(e){let t=new DataView(new ArrayBuffer(4));return t.setUint32(0,e,!0),t.getFloat32(0,!0)}function mt(e){let t=new DataView(new ArrayBuffer(4));return t.setUint32(0,e,!0),t.getInt32(0,!0)}var Je=ct[p].jsImpl,rt=K[p].jsImpl,Ht=Fe[p].jsImpl,kr=fe[p].jsImpl,gn=Ee[p].jsImpl,et=dt[p].jsImpl,We=ye[p].jsImpl,Mt=Ge[p].jsImpl,Br=Pe[p].jsImpl,yn=le[p].jsImpl,tt=pt[p].jsImpl,nt=_[p].jsImpl,Ct=Ne[p].jsImpl,$r=J[p].jsImpl,bn=ee[p].jsImpl,vr=e=>Math.sqrt(e.x**2+e.y**2),_r=e=>Math.sqrt(e.x**2+e.y**2+e.z**2),wr=e=>Math.sqrt(e.x**2+e.y**2+e.z**2+e.w**2),ri=(e,t)=>e.x*t.x+e.y*t.y,ni=(e,t)=>e.x*t.x+e.y*t.y+e.z*t.z,ii=(e,t)=>e.x*t.x+e.y*t.y+e.z*t.z+e.w*t.w,ae=e=>t=>rt(e(t.x),e(t.y)),pe=e=>t=>Ht(e(t.x),e(t.y)),xr=e=>t=>kr(e(t.x),e(t.y)),pn=e=>t=>gn(e(t.x),e(t.y)),se=e=>t=>We(e(t.x),e(t.y),e(t.z)),he=e=>t=>Mt(e(t.x),e(t.y),e(t.z)),Tr=e=>t=>Br(e(t.x),e(t.y),e(t.z)),hn=e=>t=>yn(e(t.x),e(t.y),e(t.z)),re=e=>t=>nt(e(t.x),e(t.y),e(t.z),e(t.w)),me=e=>t=>Ct(e(t.x),e(t.y),e(t.z),e(t.w)),Mr=e=>t=>$r(e(t.x),e(t.y),e(t.z),e(t.w)),mn=e=>t=>bn(e(t.x),e(t.y),e(t.z),e(t.w)),wu=e=>t=>{let r=t.columns;return gt(ae(e)(r[0]),ae(e)(r[1]))},xu=e=>t=>{let r=t.columns;return yt(se(e)(r[0]),se(e)(r[1]),se(e)(r[2]))},Tu=e=>t=>{let r=t.columns;return be(re(e)(r[0]),re(e)(r[1]),re(e)(r[2]),re(e)(r[3]))},It=e=>(t,r)=>rt(e(t.x,r.x),e(t.y,r.y)),ir=e=>(t,r)=>Ht(e(t.x,r.x),e(t.y,r.y)),Sr=e=>(t,r)=>kr(e(t.x,r.x),e(t.y,r.y)),zr=e=>(t,r)=>gn(e(t.x,r.x),e(t.y,r.y)),St=e=>(t,r)=>We(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z)),sr=e=>(t,r)=>Mt(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z)),Ar=e=>(t,r)=>Br(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z)),Pr=e=>(t,r)=>yn(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z)),ft=e=>(t,r)=>nt(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z),e(t.w,r.w)),ar=e=>(t,r)=>Ct(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z),e(t.w,r.w)),Er=e=>(t,r)=>$r(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z),e(t.w,r.w)),Rr=e=>(t,r)=>bn(e(t.x,r.x),e(t.y,r.y),e(t.z,r.z),e(t.w,r.w)),_p=e=>(t,r)=>{let n=t.columns,i=r.columns;return gt(It(e)(n[0],i[0]),It(e)(n[1],i[1]))},wp=e=>(t,r)=>{let n=t.columns,i=r.columns;return yt(St(e)(n[0],i[0]),St(e)(n[1],i[1]),St(e)(n[2],i[2]))},xp=e=>(t,r)=>{let n=t.columns,i=r.columns;return be(ft(e)(n[0],i[0]),ft(e)(n[1],i[1]),ft(e)(n[2],i[2]),ft(e)(n[3],i[3]))},Tp=e=>(t,r,n)=>rt(e(t.x,r.x,n.x),e(t.y,r.y,n.y)),Mp=e=>(t,r,n)=>Ht(e(t.x,r.x,n.x),e(t.y,r.y,n.y)),Sp=e=>(t,r,n)=>We(e(t.x,r.x,n.x),e(t.y,r.y,n.y),e(t.z,r.z,n.z)),zp=e=>(t,r,n)=>Mt(e(t.x,r.x,n.x),e(t.y,r.y,n.y),e(t.z,r.z,n.z)),Ap=e=>(t,r,n)=>nt(e(t.x,r.x,n.x),e(t.y,r.y,n.y),e(t.z,r.z,n.z),e(t.w,r.w,n.w)),Pp=e=>(t,r,n)=>Ct(e(t.x,r.x,n.x),e(t.y,r.y,n.y),e(t.z,r.z,n.z),e(t.w,r.w,n.w)),O={eq:{vec2f:(e,t)=>Je(e.x===t.x,e.y===t.y),vec2h:(e,t)=>Je(e.x===t.x,e.y===t.y),vec2i:(e,t)=>Je(e.x===t.x,e.y===t.y),vec2u:(e,t)=>Je(e.x===t.x,e.y===t.y),"vec2<bool>":(e,t)=>Je(e.x===t.x,e.y===t.y),vec3f:(e,t)=>et(e.x===t.x,e.y===t.y,e.z===t.z),vec3h:(e,t)=>et(e.x===t.x,e.y===t.y,e.z===t.z),vec3i:(e,t)=>et(e.x===t.x,e.y===t.y,e.z===t.z),vec3u:(e,t)=>et(e.x===t.x,e.y===t.y,e.z===t.z),"vec3<bool>":(e,t)=>et(e.x===t.x,e.y===t.y,e.z===t.z),vec4f:(e,t)=>tt(e.x===t.x,e.y===t.y,e.z===t.z,e.w===t.w),vec4h:(e,t)=>tt(e.x===t.x,e.y===t.y,e.z===t.z,e.w===t.w),vec4i:(e,t)=>tt(e.x===t.x,e.y===t.y,e.z===t.z,e.w===t.w),vec4u:(e,t)=>tt(e.x===t.x,e.y===t.y,e.z===t.z,e.w===t.w),"vec4<bool>":(e,t)=>tt(e.x===t.x,e.y===t.y,e.z===t.z,e.w===t.w)},lt:{vec2f:(e,t)=>Je(e.x<t.x,e.y<t.y),vec2h:(e,t)=>Je(e.x<t.x,e.y<t.y),vec2i:(e,t)=>Je(e.x<t.x,e.y<t.y),vec2u:(e,t)=>Je(e.x<t.x,e.y<t.y),vec3f:(e,t)=>et(e.x<t.x,e.y<t.y,e.z<t.z),vec3h:(e,t)=>et(e.x<t.x,e.y<t.y,e.z<t.z),vec3i:(e,t)=>et(e.x<t.x,e.y<t.y,e.z<t.z),vec3u:(e,t)=>et(e.x<t.x,e.y<t.y,e.z<t.z),vec4f:(e,t)=>tt(e.x<t.x,e.y<t.y,e.z<t.z,e.w<t.w),vec4h:(e,t)=>tt(e.x<t.x,e.y<t.y,e.z<t.z,e.w<t.w),vec4i:(e,t)=>tt(e.x<t.x,e.y<t.y,e.z<t.z,e.w<t.w),vec4u:(e,t)=>tt(e.x<t.x,e.y<t.y,e.z<t.z,e.w<t.w)},or:{"vec2<bool>":(e,t)=>Je(e.x||t.x,e.y||t.y),"vec3<bool>":(e,t)=>et(e.x||t.x,e.y||t.y,e.z||t.z),"vec4<bool>":(e,t)=>tt(e.x||t.x,e.y||t.y,e.z||t.z,e.w||t.w)},all:{"vec2<bool>":e=>e.x&&e.y,"vec3<bool>":e=>e.x&&e.y&&e.z,"vec4<bool>":e=>e.x&&e.y&&e.z&&e.w},abs:{vec2f:ae(Math.abs),vec2h:pe(Math.abs),vec2i:xr(Math.abs),vec2u:pn(Math.abs),vec3f:se(Math.abs),vec3h:he(Math.abs),vec3i:Tr(Math.abs),vec3u:hn(Math.abs),vec4f:re(Math.abs),vec4h:me(Math.abs),vec4i:Mr(Math.abs),vec4u:mn(Math.abs)},atan2:{vec2f:It(Math.atan2),vec2h:ir(Math.atan2),vec3f:St(Math.atan2),vec3h:sr(Math.atan2),vec4f:ft(Math.atan2),vec4h:ar(Math.atan2)},acos:{vec2f:ae(Math.acos),vec2h:pe(Math.acos),vec2i:xr(Math.acos),vec2u:pn(Math.acos),vec3f:se(Math.acos),vec3h:he(Math.acos),vec3i:Tr(Math.acos),vec3u:hn(Math.acos),vec4f:re(Math.acos),vec4h:me(Math.acos),vec4i:Mr(Math.acos),vec4u:mn(Math.acos)},acosh:{vec2f:ae(Math.acosh),vec2h:pe(Math.acosh),vec3f:se(Math.acosh),vec3h:he(Math.acosh),vec4f:re(Math.acosh),vec4h:me(Math.acosh)},asin:{vec2f:ae(Math.asin),vec2h:pe(Math.asin),vec3f:se(Math.asin),vec3h:he(Math.asin),vec4f:re(Math.asin),vec4h:me(Math.asin)},asinh:{vec2f:ae(Math.asinh),vec2h:pe(Math.asinh),vec3f:se(Math.asinh),vec3h:he(Math.asinh),vec4f:re(Math.asinh),vec4h:me(Math.asinh)},atan:{vec2f:ae(Math.atan),vec2h:pe(Math.atan),vec3f:se(Math.atan),vec3h:he(Math.atan),vec4f:re(Math.atan),vec4h:me(Math.atan)},atanh:{vec2f:ae(Math.atanh),vec2h:pe(Math.atanh),vec3f:se(Math.atanh),vec3h:he(Math.atanh),vec4f:re(Math.atanh),vec4h:me(Math.atanh)},ceil:{vec2f:ae(Math.ceil),vec2h:pe(Math.ceil),vec3f:se(Math.ceil),vec3h:he(Math.ceil),vec4f:re(Math.ceil),vec4h:me(Math.ceil)},clamp:{vec2f:(e,t,r)=>rt(N(e.x,t.x,r.x),N(e.y,t.y,r.y)),vec2h:(e,t,r)=>Ht(N(e.x,t.x,r.x),N(e.y,t.y,r.y)),vec2i:(e,t,r)=>kr(N(e.x,t.x,r.x),N(e.y,t.y,r.y)),vec2u:(e,t,r)=>gn(N(e.x,t.x,r.x),N(e.y,t.y,r.y)),vec3f:(e,t,r)=>We(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z)),vec3h:(e,t,r)=>Mt(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z)),vec3i:(e,t,r)=>Br(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z)),vec3u:(e,t,r)=>yn(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z)),vec4f:(e,t,r)=>nt(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z),N(e.w,t.w,r.w)),vec4h:(e,t,r)=>Ct(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z),N(e.w,t.w,r.w)),vec4i:(e,t,r)=>$r(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z),N(e.w,t.w,r.w)),vec4u:(e,t,r)=>bn(N(e.x,t.x,r.x),N(e.y,t.y,r.y),N(e.z,t.z,r.z),N(e.w,t.w,r.w))},length:{vec2f:vr,vec2h:vr,vec3f:_r,vec3h:_r,vec4f:wr,vec4h:wr},add:{vec2f:It((e,t)=>e+t),vec2h:ir((e,t)=>e+t),vec2i:Sr((e,t)=>e+t),vec2u:zr((e,t)=>e+t),vec3f:St((e,t)=>e+t),vec3h:sr((e,t)=>e+t),vec3i:Ar((e,t)=>e+t),vec3u:Pr((e,t)=>e+t),vec4f:ft((e,t)=>e+t),vec4h:ar((e,t)=>e+t),vec4i:Er((e,t)=>e+t),vec4u:Rr((e,t)=>e+t),mat2x2f:_p((e,t)=>e+t),mat3x3f:wp((e,t)=>e+t),mat4x4f:xp((e,t)=>e+t)},smoothstep:{vec2f:Tp(or),vec2h:Mp(or),vec3f:Sp(or),vec3h:zp(or),vec4f:Ap(or),vec4h:Pp(or)},addMixed:{vec2f:(e,t)=>ae(r=>r+t)(e),vec2h:(e,t)=>pe(r=>r+t)(e),vec2i:(e,t)=>xr(r=>r+t)(e),vec2u:(e,t)=>pn(r=>r+t)(e),vec3f:(e,t)=>se(r=>r+t)(e),vec3h:(e,t)=>he(r=>r+t)(e),vec3i:(e,t)=>Tr(r=>r+t)(e),vec3u:(e,t)=>hn(r=>r+t)(e),vec4f:(e,t)=>re(r=>r+t)(e),vec4h:(e,t)=>me(r=>r+t)(e),vec4i:(e,t)=>Mr(r=>r+t)(e),vec4u:(e,t)=>mn(r=>r+t)(e),mat2x2f:(e,t)=>wu(r=>r+t)(e),mat3x3f:(e,t)=>xu(r=>r+t)(e),mat4x4f:(e,t)=>Tu(r=>r+t)(e)},mulSxV:{vec2f:(e,t)=>ae(r=>e*r)(t),vec2h:(e,t)=>pe(r=>e*r)(t),vec2i:(e,t)=>xr(r=>e*r)(t),vec2u:(e,t)=>pn(r=>e*r)(t),vec3f:(e,t)=>se(r=>e*r)(t),vec3h:(e,t)=>he(r=>e*r)(t),vec3i:(e,t)=>Tr(r=>e*r)(t),vec3u:(e,t)=>hn(r=>e*r)(t),vec4f:(e,t)=>re(r=>e*r)(t),vec4h:(e,t)=>me(r=>e*r)(t),vec4i:(e,t)=>Mr(r=>e*r)(t),vec4u:(e,t)=>mn(r=>e*r)(t),mat2x2f:(e,t)=>wu(r=>e*r)(t),mat3x3f:(e,t)=>xu(r=>e*r)(t),mat4x4f:(e,t)=>Tu(r=>e*r)(t)},mulVxV:{vec2f:It((e,t)=>e*t),vec2h:ir((e,t)=>e*t),vec2i:Sr((e,t)=>e*t),vec2u:zr((e,t)=>e*t),vec3f:St((e,t)=>e*t),vec3h:sr((e,t)=>e*t),vec3i:Ar((e,t)=>e*t),vec3u:Pr((e,t)=>e*t),vec4f:ft((e,t)=>e*t),vec4h:ar((e,t)=>e*t),vec4i:Er((e,t)=>e*t),vec4u:Rr((e,t)=>e*t),mat2x2f:(e,t)=>{let r=e.columns,n=t.columns;return gt(r[0].x*n[0].x+r[1].x*n[0].y,r[0].y*n[0].x+r[1].y*n[0].y,r[0].x*n[1].x+r[1].x*n[1].y,r[0].y*n[1].x+r[1].y*n[1].y)},mat3x3f:(e,t)=>{let r=e.columns,n=t.columns;return yt(r[0].x*n[0].x+r[1].x*n[0].y+r[2].x*n[0].z,r[0].y*n[0].x+r[1].y*n[0].y+r[2].y*n[0].z,r[0].z*n[0].x+r[1].z*n[0].y+r[2].z*n[0].z,r[0].x*n[1].x+r[1].x*n[1].y+r[2].x*n[1].z,r[0].y*n[1].x+r[1].y*n[1].y+r[2].y*n[1].z,r[0].z*n[1].x+r[1].z*n[1].y+r[2].z*n[1].z,r[0].x*n[2].x+r[1].x*n[2].y+r[2].x*n[2].z,r[0].y*n[2].x+r[1].y*n[2].y+r[2].y*n[2].z,r[0].z*n[2].x+r[1].z*n[2].y+r[2].z*n[2].z)},mat4x4f:(e,t)=>{let r=e.columns,n=t.columns;return be(r[0].x*n[0].x+r[1].x*n[0].y+r[2].x*n[0].z+r[3].x*n[0].w,r[0].y*n[0].x+r[1].y*n[0].y+r[2].y*n[0].z+r[3].y*n[0].w,r[0].z*n[0].x+r[1].z*n[0].y+r[2].z*n[0].z+r[3].z*n[0].w,r[0].w*n[0].x+r[1].w*n[0].y+r[2].w*n[0].z+r[3].w*n[0].w,r[0].x*n[1].x+r[1].x*n[1].y+r[2].x*n[1].z+r[3].x*n[1].w,r[0].y*n[1].x+r[1].y*n[1].y+r[2].y*n[1].z+r[3].y*n[1].w,r[0].z*n[1].x+r[1].z*n[1].y+r[2].z*n[1].z+r[3].z*n[1].w,r[0].w*n[1].x+r[1].w*n[1].y+r[2].w*n[1].z+r[3].w*n[1].w,r[0].x*n[2].x+r[1].x*n[2].y+r[2].x*n[2].z+r[3].x*n[2].w,r[0].y*n[2].x+r[1].y*n[2].y+r[2].y*n[2].z+r[3].y*n[2].w,r[0].z*n[2].x+r[1].z*n[2].y+r[2].z*n[2].z+r[3].z*n[2].w,r[0].w*n[2].x+r[1].w*n[2].y+r[2].w*n[2].z+r[3].w*n[2].w,r[0].x*n[3].x+r[1].x*n[3].y+r[2].x*n[3].z+r[3].x*n[3].w,r[0].y*n[3].x+r[1].y*n[3].y+r[2].y*n[3].z+r[3].y*n[3].w,r[0].z*n[3].x+r[1].z*n[3].y+r[2].z*n[3].z+r[3].z*n[3].w,r[0].w*n[3].x+r[1].w*n[3].y+r[2].w*n[3].z+r[3].w*n[3].w)}},mulMxV:{mat2x2f:(e,t)=>{let r=e.columns;return rt(r[0].x*t.x+r[1].x*t.y,r[0].y*t.x+r[1].y*t.y)},mat3x3f:(e,t)=>{let r=e.columns;return We(r[0].x*t.x+r[1].x*t.y+r[2].x*t.z,r[0].y*t.x+r[1].y*t.y+r[2].y*t.z,r[0].z*t.x+r[1].z*t.y+r[2].z*t.z)},mat4x4f:(e,t)=>{let r=e.columns;return nt(r[0].x*t.x+r[1].x*t.y+r[2].x*t.z+r[3].x*t.w,r[0].y*t.x+r[1].y*t.y+r[2].y*t.z+r[3].y*t.w,r[0].z*t.x+r[1].z*t.y+r[2].z*t.z+r[3].z*t.w,r[0].w*t.x+r[1].w*t.y+r[2].w*t.z+r[3].w*t.w)}},mulVxM:{mat2x2f:(e,t)=>{let r=t.columns;return rt(e.x*r[0].x+e.y*r[0].y,e.x*r[1].x+e.y*r[1].y)},mat3x3f:(e,t)=>{let r=t.columns;return We(e.x*r[0].x+e.y*r[0].y+e.z*r[0].z,e.x*r[1].x+e.y*r[1].y+e.z*r[1].z,e.x*r[2].x+e.y*r[2].y+e.z*r[2].z)},mat4x4f:(e,t)=>{let r=t.columns;return nt(e.x*r[0].x+e.y*r[0].y+e.z*r[0].z+e.w*r[0].w,e.x*r[1].x+e.y*r[1].y+e.z*r[1].z+e.w*r[1].w,e.x*r[2].x+e.y*r[2].y+e.z*r[2].z+e.w*r[2].w,e.x*r[3].x+e.y*r[3].y+e.z*r[3].z+e.w*r[3].w)}},div:{vec2f:It((e,t)=>e/t),vec2h:ir((e,t)=>e/t),vec2i:Sr(br),vec2u:zr(br),vec3f:St((e,t)=>e/t),vec3h:sr((e,t)=>e/t),vec3i:Ar(br),vec3u:Pr(br),vec4f:ft((e,t)=>e/t),vec4h:ar((e,t)=>e/t),vec4i:Er(br),vec4u:Rr(br)},dot:{vec2f:ri,vec2h:ri,vec2i:ri,vec2u:ri,vec3f:ni,vec3h:ni,vec3i:ni,vec3u:ni,vec4f:ii,vec4h:ii,vec4i:ii,vec4u:ii},normalize:{vec2f:e=>{let t=vr(e);return rt(e.x/t,e.y/t)},vec2h:e=>{let t=vr(e);return Ht(e.x/t,e.y/t)},vec2i:e=>{let t=vr(e);return kr(e.x/t,e.y/t)},vec2u:e=>{let t=vr(e);return gn(e.x/t,e.y/t)},vec3f:e=>{let t=_r(e);return We(e.x/t,e.y/t,e.z/t)},vec3h:e=>{let t=_r(e);return Mt(e.x/t,e.y/t,e.z/t)},vec3i:e=>{let t=_r(e);return Br(e.x/t,e.y/t,e.z/t)},vec3u:e=>{let t=_r(e);return yn(e.x/t,e.y/t,e.z/t)},vec4f:e=>{let t=wr(e);return nt(e.x/t,e.y/t,e.z/t,e.w/t)},vec4h:e=>{let t=wr(e);return Ct(e.x/t,e.y/t,e.z/t,e.w/t)},vec4i:e=>{let t=wr(e);return $r(e.x/t,e.y/t,e.z/t,e.w/t)},vec4u:e=>{let t=wr(e);return bn(e.x/t,e.y/t,e.z/t,e.w/t)}},cross:{vec3f:(e,t)=>We(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),vec3h:(e,t)=>Mt(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x)},mod:{vec2f:It((e,t)=>e%t),vec2h:ir((e,t)=>e%t),vec2i:Sr((e,t)=>e%t),vec2u:zr((e,t)=>e%t),vec3f:St((e,t)=>e%t),vec3h:sr((e,t)=>e%t),vec3i:Ar((e,t)=>e%t),vec3u:Pr((e,t)=>e%t),vec4f:ft((e,t)=>e%t),vec4h:ar((e,t)=>e%t),vec4i:Er((e,t)=>e%t),vec4u:Rr((e,t)=>e%t)},floor:{vec2f:ae(Math.floor),vec2h:pe(Math.floor),vec3f:se(Math.floor),vec3h:he(Math.floor),vec4f:re(Math.floor),vec4h:me(Math.floor)},max:{vec2f:It(Math.max),vec2h:ir(Math.max),vec2i:Sr(Math.max),vec2u:zr(Math.max),vec3f:St(Math.max),vec3h:sr(Math.max),vec3i:Ar(Math.max),vec3u:Pr(Math.max),vec4f:ft(Math.max),vec4h:ar(Math.max),vec4i:Er(Math.max),vec4u:Rr(Math.max)},min:{vec2f:It(Math.min),vec2h:ir(Math.min),vec2i:Sr(Math.min),vec2u:zr(Math.min),vec3f:St(Math.min),vec3h:sr(Math.min),vec3i:Ar(Math.min),vec3u:Pr(Math.min),vec4f:ft(Math.min),vec4h:ar(Math.min),vec4i:Er(Math.min),vec4u:Rr(Math.min)},pow:{vec2f:(e,t)=>rt(e.x**t.x,e.y**t.y),vec2h:(e,t)=>Ht(e.x**t.x,e.y**t.y),vec3f:(e,t)=>We(e.x**t.x,e.y**t.y,e.z**t.z),vec3h:(e,t)=>Mt(e.x**t.x,e.y**t.y,e.z**t.z),vec4f:(e,t)=>nt(e.x**t.x,e.y**t.y,e.z**t.z,e.w**t.w),vec4h:(e,t)=>Ct(e.x**t.x,e.y**t.y,e.z**t.z,e.w**t.w)},sign:{vec2f:ae(Math.sign),vec2h:pe(Math.sign),vec2i:xr(Math.sign),vec3f:se(Math.sign),vec3h:he(Math.sign),vec3i:Tr(Math.sign),vec4f:re(Math.sign),vec4h:me(Math.sign),vec4i:Mr(Math.sign)},sqrt:{vec2f:ae(Math.sqrt),vec2h:pe(Math.sqrt),vec3f:se(Math.sqrt),vec3h:he(Math.sqrt),vec4f:re(Math.sqrt),vec4h:me(Math.sqrt)},mix:{vec2f:(e,t,r)=>typeof r=="number"?rt(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r):rt(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y),vec2h:(e,t,r)=>typeof r=="number"?Ht(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r):Ht(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y),vec3f:(e,t,r)=>typeof r=="number"?We(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r,e.z*(1-r)+t.z*r):We(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y,e.z*(1-r.z)+t.z*r.z),vec3h:(e,t,r)=>typeof r=="number"?Mt(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r,e.z*(1-r)+t.z*r):Mt(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y,e.z*(1-r.z)+t.z*r.z),vec4f:(e,t,r)=>typeof r=="number"?nt(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r,e.z*(1-r)+t.z*r,e.w*(1-r)+t.w*r):nt(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y,e.z*(1-r.z)+t.z*r.z,e.w*(1-r.w)+t.w*r.w),vec4h:(e,t,r)=>typeof r=="number"?Ct(e.x*(1-r)+t.x*r,e.y*(1-r)+t.y*r,e.z*(1-r)+t.z*r,e.w*(1-r)+t.w*r):Ct(e.x*(1-r.x)+t.x*r.x,e.y*(1-r.y)+t.y*r.y,e.z*(1-r.z)+t.z*r.z,e.w*(1-r.w)+t.w*r.w)},sin:{vec2f:ae(Math.sin),vec2h:pe(Math.sin),vec3f:se(Math.sin),vec3h:he(Math.sin),vec4f:re(Math.sin),vec4h:me(Math.sin)},cos:{vec2f:ae(Math.cos),vec2h:pe(Math.cos),vec3f:se(Math.cos),vec3h:he(Math.cos),vec4f:re(Math.cos),vec4h:me(Math.cos)},cosh:{vec2f:ae(Math.cosh),vec2h:pe(Math.cosh),vec3f:se(Math.cosh),vec3h:he(Math.cosh),vec4f:re(Math.cosh),vec4h:me(Math.cosh)},exp:{vec2f:ae(Math.exp),vec2h:pe(Math.exp),vec3f:se(Math.exp),vec3h:he(Math.exp),vec4f:re(Math.exp),vec4h:me(Math.exp)},exp2:{vec2f:ae(e=>2**e),vec2h:pe(e=>2**e),vec3f:se(e=>2**e),vec3h:he(e=>2**e),vec4f:re(e=>2**e),vec4h:me(e=>2**e)},log:{vec2f:ae(Math.log),vec2h:pe(Math.log),vec3f:se(Math.log),vec3h:he(Math.log),vec4f:re(Math.log),vec4h:me(Math.log)},log2:{vec2f:ae(Math.log2),vec2h:pe(Math.log2),vec3f:se(Math.log2),vec3h:he(Math.log2),vec4f:re(Math.log2),vec4h:me(Math.log2)},fract:{vec2f:ae(e=>e-Math.floor(e)),vec2h:pe(e=>e-Math.floor(e)),vec3f:se(e=>e-Math.floor(e)),vec3h:he(e=>e-Math.floor(e)),vec4f:re(e=>e-Math.floor(e)),vec4h:me(e=>e-Math.floor(e))},isCloseToZero:{vec2f:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t,vec2h:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t,vec3f:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t&&Math.abs(e.z)<=t,vec3h:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t&&Math.abs(e.z)<=t,vec4f:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t&&Math.abs(e.z)<=t&&Math.abs(e.w)<=t,vec4h:(e,t)=>Math.abs(e.x)<=t&&Math.abs(e.y)<=t&&Math.abs(e.z)<=t&&Math.abs(e.w)<=t},neg:{vec2f:ae(e=>-e),vec2h:pe(e=>-e),vec2i:xr(e=>-e),vec2u:pn(e=>-e),"vec2<bool>":e=>Je(!e.x,!e.y),vec3f:se(e=>-e),vec3h:he(e=>-e),vec3i:Tr(e=>-e),vec3u:hn(e=>-e),"vec3<bool>":e=>et(!e.x,!e.y,!e.z),vec4f:re(e=>-e),vec4h:me(e=>-e),vec4i:Mr(e=>-e),vec4u:mn(e=>-e),"vec4<bool>":e=>tt(!e.x,!e.y,!e.z,!e.w)},select:{vec2f:(e,t,r)=>rt(r.x?t.x:e.x,r.y?t.y:e.y),vec2h:(e,t,r)=>Ht(r.x?t.x:e.x,r.y?t.y:e.y),vec2i:(e,t,r)=>kr(r.x?t.x:e.x,r.y?t.y:e.y),vec2u:(e,t,r)=>gn(r.x?t.x:e.x,r.y?t.y:e.y),"vec2<bool>":(e,t,r)=>Je(r.x?t.x:e.x,r.y?t.y:e.y),vec3f:(e,t,r)=>We(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z),vec3h:(e,t,r)=>Mt(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z),vec3i:(e,t,r)=>Br(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z),vec3u:(e,t,r)=>yn(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z),"vec3<bool>":(e,t,r)=>et(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z),vec4f:(e,t,r)=>nt(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z,r.w?t.w:e.w),vec4h:(e,t,r)=>Ct(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z,r.w?t.w:e.w),vec4i:(e,t,r)=>$r(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z,r.w?t.w:e.w),vec4u:(e,t,r)=>bn(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z,r.w?t.w:e.w),"vec4<bool>":(e,t,r)=>tt(r.x?t.x:e.x,r.y?t.y:e.y,r.z?t.z:e.z,r.w?t.w:e.w)},tanh:{vec2f:ae(Math.tanh),vec2h:pe(Math.tanh),vec3f:se(Math.tanh),vec3h:he(Math.tanh),vec4f:re(Math.tanh),vec4h:me(Math.tanh)},bitcastU32toF32:{vec2u:e=>rt(ht(e.x),ht(e.y)),vec3u:e=>We(ht(e.x),ht(e.y),ht(e.z)),vec4u:e=>nt(ht(e.x),ht(e.y),ht(e.z),ht(e.w))},bitcastU32toI32:{vec2u:e=>kr(mt(e.x),mt(e.y)),vec3u:e=>Br(mt(e.x),mt(e.y),mt(e.z)),vec4u:e=>$r(mt(e.x),mt(e.y),mt(e.z),mt(e.w))}};function Bu(e,t){if(typeof e=="number"&&typeof t=="number")return e+t;if(typeof e=="number"&&ne(t))return O.addMixed[t.kind](t,e);if(ne(e)&&typeof t=="number")return O.addMixed[e.kind](e,t);if(ne(e)&&ne(t)||ot(e)&&ot(t))return O.add[e.kind](e,t);throw new Error("Add/Sub called with invalid arguments.")}var $u=T({name:"add",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:wt(t[0])?t[1]:t[0]}},normalImpl:Bu,codegenImpl:(e,t)=>y`(${e} + ${t})`});function Ep(e,t){return Bu(e,Du(-1,t))}var Or=T({name:"sub",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:wt(t[0])?t[1]:t[0]}},normalImpl:Ep,codegenImpl:(e,t)=>y`(${e} - ${t})`});function Du(e,t){if(typeof e=="number"&&typeof t=="number")return e*t;if(typeof e=="number"&&(ne(t)||ot(t)))return O.mulSxV[t.kind](e,t);if((ne(e)||ot(e))&&typeof t=="number")return O.mulSxV[e.kind](t,e);if(ne(e)&&ne(t))return O.mulVxV[e.kind](e,t);if(Ys(e)&&ot(t))return O.mulVxM[t.kind](e,t);if(ot(e)&&Ys(t))return O.mulMxV[e.kind](e,t);if(ot(e)&&ot(t))return O.mulVxV[e.kind](e,t);throw new Error("Mul called with invalid arguments.")}var Ca=T({name:"mul",signature:(...e)=>{let t=Ae(e)??e,r=wt(t[0])?t[1]:wt(t[1])||t[0].type.startsWith("vec")?t[0]:t[1].type.startsWith("vec")?t[1]:t[0];return{argTypes:t,returnType:r}},normalImpl:Du,codegenImpl:(e,t)=>y`(${e} * ${t})`});function Rp(e,t){if(typeof e=="number"&&typeof t=="number")return e/t;if(typeof e=="number"&&ne(t)){let r=on[t.kind][p].jsImpl;return O.div[t.kind](r(e),t)}if(ne(e)&&typeof t=="number"){let r=on[e.kind][p].jsImpl;return O.div[e.kind](e,r(t))}if(ne(e)&&ne(t))return O.div[e.kind](e,t);throw new Error("Div called with invalid arguments.")}var Uu=T({name:"div",signature:(...e)=>{let t=Ae(e,[g,de,Qe])??e;return{argTypes:t,returnType:wt(t[0])?t[1]:t[0]}},normalImpl:Rp,codegenImpl:(e,t)=>y`(${e} / ${t})`,ignoreImplicitCastWarning:!0}),cb=T({name:"mod",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:wt(t[0])?t[1]:t[0]}},normalImpl(e,t){if(typeof e=="number"&&typeof t=="number")return e%t;if(typeof e=="number"&&ne(t)){let r=on[t.kind];return O.mod[t.kind](r(e),t)}if(ne(e)&&typeof t=="number"){let r=on[e.kind];return O.mod[e.kind](e,r(t))}if(ne(e)&&ne(t))return O.mod[e.kind](e,t);throw new Error("Mod called with invalid arguments, expected types: number or vector.")},codegenImpl:(e,t)=>y`(${e} % ${t})`});function kp(e){return typeof e=="number"?-e:O.neg[e.kind](e)}var db=T({name:"neg",signature:e=>({argTypes:[e],returnType:e}),normalImpl:kp,codegenImpl:e=>y`-(${e})`});function Bp(e){return typeof e=="number"?Math.abs(e):O.abs[e.kind](e)}var pb=T({name:"abs",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Bp,codegenImpl:e=>y`abs(${e})`});function $p(e){return typeof e=="number"?Math.acos(e):O.acos[e.kind](e)}var hb=T({name:"acos",signature:e=>({argTypes:[e],returnType:e}),normalImpl:$p,codegenImpl:e=>y`acos(${e})`});function Dp(e){return typeof e=="number"?Math.acosh(e):O.acosh[e.kind](e)}var mb=T({name:"acosh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Dp,codegenImpl:e=>y`acosh(${e})`});function Up(e){return typeof e=="number"?Math.asin(e):O.asin[e.kind](e)}var fb=T({name:"asin",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Up,codegenImpl:e=>y`asin(${e})`});function Op(e){return typeof e=="number"?Math.asinh(e):O.asinh[e.kind](e)}var gb=T({name:"asinh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Op,codegenImpl:e=>y`asinh(${e})`});function Ip(e){return typeof e=="number"?Math.atan(e):O.atan[e.kind](e)}var yb=T({name:"atan",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Ip,codegenImpl:e=>y`atan(${e})`});function Hp(e){return typeof e=="number"?Math.atanh(e):O.atanh[e.kind](e)}var bb=T({name:"atanh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Hp,codegenImpl:e=>y`atanh(${e})`});function Cp(e,t){return typeof e=="number"&&typeof t=="number"?Math.atan2(e,t):O.atan2[e.kind](e,t)}var vb=T({name:"atan2",signature:(...e)=>{let t=Ae(e,[g,de,Qe])??e;return{argTypes:t,returnType:t[0]}},normalImpl:Cp,codegenImpl:(e,t)=>y`atan2(${e}, ${t})`});function Lp(e){return typeof e=="number"?Math.ceil(e):O.ceil[e.kind](e)}var Ou=T({name:"ceil",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Lp,codegenImpl:e=>y`ceil(${e})`});function Vp(e,t,r){return typeof e=="number"?Math.min(Math.max(t,e),r):O.clamp[e.kind](e,t,r)}var _b=T({name:"clamp",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:t[0]}},normalImpl:Vp,codegenImpl:(e,t,r)=>y`clamp(${e}, ${t}, ${r})`});function Fp(e){return typeof e=="number"?Math.cos(e):O.cos[e.kind](e)}var wb=T({name:"cos",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Fp,codegenImpl:e=>y`cos(${e})`});function Gp(e){return typeof e=="number"?Math.cosh(e):O.cosh[e.kind](e)}var xb=T({name:"cosh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Gp,codegenImpl:e=>y`cosh(${e})`}),Tb=T({name:"countLeadingZeros",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for countLeadingZeros not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`countLeadingZeros(${e})`}),Mb=T({name:"countOneBits",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for countOneBits not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`countOneBits(${e})`}),Sb=T({name:"countTrailingZeros",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for countTrailingZeros not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`countTrailingZeros(${e})`}),zb=T({name:"cross",signature:(e,t)=>({argTypes:[e,t],returnType:e}),normalImpl:(e,t)=>O.cross[e.kind](e,t),codegenImpl:(e,t)=>y`cross(${e}, ${t})`});function Np(e){if(typeof e=="number")return e*180/Math.PI;throw new Ue("CPU implementation for degrees on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var Ab=T({name:"degrees",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Np,codegenImpl:e=>y`degrees(${e})`}),Pb=T({name:"determinant",signature:e=>({argTypes:[e],returnType:g}),normalImpl:"CPU implementation for determinant not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`determinant(${e})`});function jp(e,t){return typeof e=="number"&&typeof t=="number"?Math.abs(e-t):th(Or(e,t))}var Eb=T({name:"distance",signature:(e,t)=>({argTypes:[e,t],returnType:Wn(e)?de:g}),normalImpl:jp,codegenImpl:(e,t)=>y`distance(${e}, ${t})`}),Wp=T({name:"dot",signature:(e,t)=>({argTypes:[e,t],returnType:e.primitive}),normalImpl:(e,t)=>O.dot[e.kind](e,t),codegenImpl:(e,t)=>y`dot(${e}, ${t})`}),Rb=T({name:"dot4U8Packed",signature:(e,t)=>({argTypes:[A,A],returnType:A}),normalImpl:"CPU implementation for dot4U8Packed not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t)=>y`dot4U8Packed(${e}, ${t})`}),kb=T({name:"dot4I8Packed",signature:(e,t)=>({argTypes:[A,A],returnType:W}),normalImpl:"CPU implementation for dot4I8Packed not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t)=>y`dot4I8Packed(${e}, ${t})`});function qp(e){return typeof e=="number"?Math.exp(e):O.exp[e.kind](e)}var Bb=T({name:"exp",signature:e=>({argTypes:[e],returnType:e}),normalImpl:qp,codegenImpl:e=>y`exp(${e})`});function Yp(e){return typeof e=="number"?2**e:O.exp2[e.kind](e)}var $b=T({name:"exp2",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Yp,codegenImpl:e=>y`exp2(${e})`}),Db=T({name:"extractBits",signature:(e,t,r)=>({argTypes:[e,A,A],returnType:e}),normalImpl:"CPU implementation for extractBits not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t,r)=>y`extractBits(${e}, ${t}, ${r})`}),Ub=T({name:"faceForward",signature:(e,t,r)=>({argTypes:[e,t,r],returnType:e}),normalImpl:"CPU implementation for faceForward not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t,r)=>y`faceForward(${e}, ${t}, ${r})`}),Ob=T({name:"firstLeadingBit",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for firstLeadingBit not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`firstLeadingBit(${e})`}),Ib=T({name:"firstTrailingBit",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for firstTrailingBit not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`firstTrailingBit(${e})`});function Kp(e){return typeof e=="number"?Math.floor(e):O.floor[e.kind](e)}var Hb=T({name:"floor",signature:(...e)=>({argTypes:e,returnType:e[0]}),normalImpl:Kp,codegenImpl:e=>y`floor(${e})`});function Xp(e,t,r){if(typeof e=="number")return e*t+r;throw new Ue("CPU implementation for fma on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var Cb=T({name:"fma",signature:(e,t,r)=>({argTypes:[e,t,r],returnType:e}),normalImpl:Xp,codegenImpl:(e,t,r)=>y`fma(${e}, ${t}, ${r})`});function Qp(e){return typeof e=="number"?e-Math.floor(e):O.fract[e.kind](e)}var Lb=T({name:"fract",signature:(...e)=>({argTypes:e,returnType:e[0]}),normalImpl:Qp,codegenImpl:e=>y`fract(${e})`}),Zp={f32:we({fract:g,exp:W}),f16:we({fract:de,exp:W}),abstractFloat:we({fract:Qe,exp:rn}),vec2f:we({fract:K,exp:fe}),vec3f:we({fract:ye,exp:Pe}),vec4f:we({fract:_,exp:J}),vec2h:we({fract:Fe,exp:fe}),vec3h:we({fract:Ge,exp:Pe}),vec4h:we({fract:Ne,exp:J})},Vb=ge(e=>{throw new Ue("CPU implementation for frexp not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")},e=>{let t=Zp[e.dataType.type];if(!t)throw new Error(`Unsupported data type for frexp: ${e.dataType.type}. Supported types are f32, f16, abstractFloat, vec2f, vec3f, vec4f, vec2h, vec3h, vec4h.`);return w(y`frexp(${e})`,t)},"frexp"),Fb=T({name:"insertBits",signature:(e,t,r,n)=>({argTypes:[e,t,A,A],returnType:e}),normalImpl:"CPU implementation for insertBits not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t,r,n)=>y`insertBits(${e}, ${t}, ${r}, ${n})`});function Jp(e){if(typeof e=="number")return 1/Math.sqrt(e);throw new Ue("CPU implementation for inverseSqrt on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var Gb=T({name:"inverseSqrt",signature:e=>({argTypes:[e],returnType:e}),normalImpl:Jp,codegenImpl:e=>y`inverseSqrt(${e})`}),Nb=T({name:"ldexp",signature:(e,t)=>{switch(e.type){case"abstractFloat":return{argTypes:[Qe,rn],returnType:e};case"f32":case"f16":return{argTypes:[e,W],returnType:e};case"vec2f":case"vec2h":return{argTypes:[e,fe],returnType:e};case"vec3f":case"vec3h":return{argTypes:[e,Pe],returnType:e};case"vec4f":case"vec4h":return{argTypes:[e,J],returnType:e};default:throw new Error(`Unsupported data type for ldexp: ${e.type}. Supported types are abstractFloat, f32, f16, vec2f, vec2h, vec3f, vec3h, vec4f, vec4h.`)}},normalImpl:"CPU implementation for ldexp not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:(e,t)=>y`ldexp(${e}, ${t})`});function eh(e){return typeof e=="number"?Math.abs(e):O.length[e.kind](e)}var th=T({name:"length",signature:e=>({argTypes:[e],returnType:Wn(e)?de:g}),normalImpl:eh,codegenImpl:e=>y`length(${e})`});function rh(e){return typeof e=="number"?Math.log(e):O.log[e.kind](e)}var jb=T({name:"log",signature:e=>({argTypes:[e],returnType:e}),normalImpl:rh,codegenImpl:e=>y`log(${e})`});function nh(e){return typeof e=="number"?Math.log2(e):O.log2[e.kind](e)}var Wb=T({name:"log2",signature:e=>({argTypes:[e],returnType:e}),normalImpl:nh,codegenImpl:e=>y`log2(${e})`});function ih(e,t){return typeof e=="number"?Math.max(e,t):O.max[e.kind](e,t)}var qb=T({name:"max",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:t[0]}},normalImpl:ih,codegenImpl:(e,t)=>y`max(${e}, ${t})`});function sh(e,t){return typeof e=="number"?Math.min(e,t):O.min[e.kind](e,t)}var Yb=T({name:"min",signature:(...e)=>{let t=Ae(e)??e;return{argTypes:t,returnType:t[0]}},normalImpl:sh,codegenImpl:(e,t)=>y`min(${e}, ${t})`});function ah(e,t,r){if(typeof e=="number"){if(typeof r!="number"||typeof t!="number")throw new Error("When e1 and e2 are numbers, the blend factor must be a number.");return e*(1-r)+t*r}if(typeof e=="number"||typeof t=="number")throw new Error("e1 and e2 need to both be vectors of the same kind.");return O.mix[e.kind](e,t,r)}var Kb=T({name:"mix",signature:(e,t,r)=>({argTypes:[e,t,r],returnType:e}),normalImpl:ah,codegenImpl:(e,t,r)=>y`mix(${e}, ${t}, ${r})`}),oh={f32:we({fract:g,whole:g}),f16:we({fract:de,whole:de}),abstractFloat:we({fract:Qe,whole:Qe}),vec2f:we({fract:K,whole:K}),vec3f:we({fract:ye,whole:ye}),vec4f:we({fract:_,whole:_}),vec2h:we({fract:Fe,whole:Fe}),vec3h:we({fract:Ge,whole:Ge}),vec4h:we({fract:Ne,whole:Ne})},Xb=T({name:"modf",signature:e=>{let t=oh[e.type];if(!t)throw new Error(`Unsupported data type for modf: ${e.type}. Supported types are f32, f16, abstractFloat, vec2f, vec3f, vec4f, vec2h, vec3h, vec4h.`);return{argTypes:[e],returnType:t}},normalImpl:"CPU implementation for modf not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`modf(${e})`}),Qb=T({name:"normalize",signature:e=>({argTypes:[e],returnType:e}),normalImpl:e=>O.normalize[e.kind](e),codegenImpl:e=>y`normalize(${e})`});function uh(e,t){if(typeof e=="number"&&typeof t=="number")return e**t;if(ne(e)&&ne(t))return O.pow[e.kind](e,t);throw new Error("Invalid arguments to pow()")}var lh=T({name:"pow",signature:(...e)=>{let t=Ae(e,[g,de,Qe])??e;return{argTypes:t,returnType:wt(t[0])?t[1]:t[0]}},normalImpl:uh,codegenImpl:(e,t)=>y`pow(${e}, ${t})`}),Zb=T({name:"quantizeToF16",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for quantizeToF16 not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`quantizeToF16(${e})`});function ch(e){if(typeof e=="number")return e*Math.PI/180;throw new Ue("CPU implementation for radians on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var Jb=T({name:"radians",signature:(...e)=>{let t=Ae(e,[g,de,Qe])??e;return{argTypes:t,returnType:t[0]}},normalImpl:ch,codegenImpl:e=>y`radians(${e})`}),ev=T({name:"reflect",signature:(e,t)=>({argTypes:[e,t],returnType:e}),normalImpl:(e,t)=>Or(e,Ca(2*Wp(t,e),t)),codegenImpl:(e,t)=>y`reflect(${e}, ${t})`}),tv=ge((e,t,r)=>{throw new Ue("CPU implementation for refract not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")},(e,t,r)=>w(y`refract(${e}, ${t}, ${r})`,e.dataType),"refract",(e,t,r)=>[e.dataType,t.dataType,Wn(e)?de:g]),rv=T({name:"reverseBits",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for reverseBits not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`reverseBits(${e})`});function dh(e){if(typeof e=="number")return Math.round(e);throw new Ue("CPU implementation for round on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var nv=T({name:"round",signature:e=>({argTypes:[e],returnType:e}),normalImpl:dh,codegenImpl:e=>y`round(${e})`});function ph(e){if(typeof e=="number")return Math.max(0,Math.min(1,e));throw new Ue("CPU implementation for saturate on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var iv=T({name:"saturate",signature:e=>({argTypes:[e],returnType:e}),normalImpl:ph,codegenImpl:e=>y`saturate(${e})`});function hh(e){return typeof e=="number"?Math.sign(e):O.sign[e.kind](e)}var sv=T({name:"sign",signature:e=>({argTypes:[e],returnType:e}),normalImpl:hh,codegenImpl:e=>y`sign(${e})`});function mh(e){return typeof e=="number"?Math.sin(e):O.sin[e.kind](e)}var av=T({name:"sin",signature:e=>({argTypes:[e],returnType:e}),normalImpl:mh,codegenImpl:e=>y`sin(${e})`});function fh(e){if(typeof e=="number")return Math.sinh(e);throw new Ue("CPU implementation for sinh on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var ov=T({name:"sinh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:fh,codegenImpl:e=>y`sinh(${e})`});function gh(e,t,r){return typeof r=="number"?or(e,t,r):O.smoothstep[r.kind](e,t,r)}var uv=T({name:"smoothstep",signature:(e,t,r)=>({argTypes:[e,t,r],returnType:r}),normalImpl:gh,codegenImpl:(e,t,r)=>y`smoothstep(${e}, ${t}, ${r})`});function yh(e){return typeof e=="number"?Math.sqrt(e):O.sqrt[e.kind](e)}var lv=T({name:"sqrt",signature:e=>({argTypes:[e],returnType:e}),normalImpl:yh,codegenImpl:e=>y`sqrt(${e})`});function bh(e,t){if(typeof e=="number")return e<=t?1:0;throw new Ue("CPU implementation for step on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var cv=T({name:"step",signature:(...e)=>{let t=Ae(e,[g,de,Qe])??e;return{argTypes:t,returnType:t[0]}},normalImpl:bh,codegenImpl:(e,t)=>y`step(${e}, ${t})`});function vh(e){if(typeof e=="number")return Math.tan(e);throw new Ue("CPU implementation for tan on vectors not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues")}var dv=T({name:"tan",signature:e=>({argTypes:[e],returnType:e}),normalImpl:vh,codegenImpl:e=>y`tan(${e})`});function _h(e){return typeof e=="number"?Math.tanh(e):O.tanh[e.kind](e)}var pv=T({name:"tanh",signature:e=>({argTypes:[e],returnType:e}),normalImpl:_h,codegenImpl:e=>y`tanh(${e})`}),hv=T({name:"transpose",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for transpose not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`transpose(${e})`}),mv=T({name:"trunc",signature:e=>({argTypes:[e],returnType:e}),normalImpl:"CPU implementation for trunc not implemented yet. Please submit an issue at https://github.com/software-mansion/TypeGPU/issues",codegenImpl:e=>y`trunc(${e})`}),{NodeTypeCatalog:ie}=ka,wh=["==","!=","<","<=",">",">=","<<",">>","+","-","*","/","%","|","^","&","&&","||"],xh=["&&","||","==","!=","<","<=",">",">="],Th=["vec2f","vec3f","vec4f","vec2h","vec3h","vec4h","vec2i","vec3i","vec4i","vec2u","vec3u","vec4u","mat2x2f","mat3x3f","mat4x4f"],Mu={add:$u,sub:Or,mul:Ca,div:Uu};function Su(e,t,r){return r?xh.includes(t)?te:t==="="?r:e:t==="!"||t==="~"?te:e}var Mh={"+":$u[p].gpuImpl,"-":Or[p].gpuImpl,"*":Ca[p].gpuImpl,"/":Uu[p].gpuImpl,"**":lh[p].gpuImpl},Sh=class{#e=void 0;initGenerator(e){this.#e=e}get ctx(){if(!this.#e)throw new Error("WGSL Generator has not yet been initialized. Please call initialize(ctx) before using the generator.");return this.#e}block([e,t]){this.ctx.pushBlockScope();try{this.ctx.indent();let r=t.map(n=>this.statement(n)).join(`
`);return this.ctx.dedent(),`{
${r}
${this.ctx.pre}}`}finally{this.ctx.popBlockScope()}}blockVariable(e,t){let r=w(this.ctx.makeNameValid(e),t);return this.ctx.defineVariable(e,r),r}identifier(e){if(!e)throw new Error("Cannot resolve an empty identifier");let t=this.ctx.getById(e);if(!t)throw new Error(`Identifier ${e} not found`);return t}typedExpression(e,t){let r=this.ctx.expectedType;this.ctx.expectedType=t;try{let n=this.expression(e);return ei(n,t)}finally{this.ctx.expectedType=r}}expression(e){if(typeof e=="string")return this.identifier(e);if(typeof e=="boolean")return w(e,te);if(e[0]===ie.logicalExpr||e[0]===ie.binaryExpr||e[0]===ie.assignmentExpr){let[t,r,n,i]=e,s=this.expression(r),a=this.expression(i),o=Mh[n];if(o)return o(s,a);let u=e[0]===ie.assignmentExpr?s.dataType.type==="ptr"?[s.dataType.inner]:[s.dataType]:void 0,[l,c]=hr([s,a],u)??[s,a],d=this.ctx.resolve(l.value,l.dataType).value,h=this.ctx.resolve(c.value,c.dataType).value,m=Su(l.dataType,n,c.dataType);return w(wh.includes(n)?`(${d} ${n} ${h})`:`${d} ${n} ${h}`,m)}if(e[0]===ie.postUpdate){let[t,r,n]=e,i=this.expression(n),s=this.ctx.resolve(i.value,i.dataType).value;return w(`${s}${r}`,i.dataType)}if(e[0]===ie.unaryExpr){let[t,r,n]=e,i=this.expression(n),s=this.ctx.resolve(i.value,i.dataType).value,a=Su(i.dataType,r);return w(`${r}${s}`,a)}if(e[0]===ie.memberAccess){let[t,r,n]=e,i=this.expression(r);if(i.value===console)return w(new ta(n),ze);if(Th.includes(i.dataType.type)&&n in Mu)return{value:new Js(n,i,Mu[n][p].gpuImpl),dataType:ze};if(i.dataType.type==="unknown"){let s=i.value[n];return fn(s)}return Nn(i.dataType)?w(`(*${this.ctx.resolve(i.value).value}).${n}`,Da(i.dataType.inner,n)):He(i.dataType)&&n==="length"?i.dataType.elementCount===0?w(`arrayLength(&${this.ctx.resolve(i.value).value})`,A):w(String(i.dataType.elementCount),rn):Qt(i.dataType)&&n==="columns"?w(new ea(i),ze):Ke(i.dataType)&&ne(i.value)?fn(i.value[n]):w(`${this.ctx.resolve(i.value).value}.${n}`,Da(i.dataType,n))}if(e[0]===ie.indexAccess){let[t,r,n]=e,i=this.expression(r),s=this.expression(n),a=this.ctx.resolve(s.value,s.dataType).value;if(i.value instanceof ea)return w(y`${i.value.matrix}[${a}]`,$a(i.value.matrix.dataType));let o=this.ctx.resolve(i.value,i.dataType).value;if(i.dataType.type==="unknown"){if(Array.isArray(n)&&n[0]===ie.numericLiteral)return fn(i.value[n[1]]);throw new Error(`Unable to index a value of unknown type with index ${a}. If the value is an array, to address this, consider one of the following approaches: (1) declare the array using 'tgpu.const', (2) store the array in a buffer, or (3) define the array within the GPU function scope.`)}if(Qt(i.dataType))throw new Error("The only way of accessing matrix elements in TGSL is through the 'columns' property.");return Nn(i.dataType)?w(`(*${o})[${a}]`,$a(i.dataType.inner)):w(`${o}[${a}]`,Tt(i.dataType)?$a(i.dataType):ze)}if(e[0]===ie.numericLiteral){let t=typeof e[1]=="string"?vn(Ah(e[1])):vn(e[1]);if(!t)throw new Error(`Invalid numeric literal ${e[1]}`);return t}if(e[0]===ie.call){let[t,r,n]=e,i=this.expression(r);if(_e(i.value)||He(i.value)){if(n.length>1)throw new Ce("Array and struct schemas should always be called with at most 1 argument");if(!n[0])return w(`${this.ctx.resolve(i.value).value}()`,i.value);let a=this.typedExpression(n[0],i.value);return w(this.ctx.resolve(a.value,i.value).value,i.value)}if(i.value===ai)throw new Error("Constants cannot be defined within TypeGPU function scope. To address this, move the constant definition outside the function scope.");if(i.value instanceof Js){if(!n[0])throw new Ce(`An infix operator '${i.value.name}' was called without any arguments`);let a=this.expression(n[0]);return i.value.operator(i.value.lhs,a)}if(!q(i.value)){let a=n.map(u=>this.expression(u)),o=this.ctx.shelllessRepo.get(i.value,a);if(o)return this.ctx.withResetIndentLevel(()=>{let u=this.ctx.resolve(o);return w(y`${u.value}(${a})`,u.dataType)});throw new Error(`Function '${k(i.value)??String(i.value)}' is not marked with the 'use gpu' directive and cannot be used in a shader`)}let s=i.value[p]?.argConversionHint??"keep";try{let a;if(Array.isArray(s))a=n.map((u,l)=>{let c=s[l];if(!c)throw new Ce(`Function '${k(i.value)}' was called with too many arguments`);return this.typedExpression(u,c)});else{let u=n.map(l=>this.expression(l));s==="keep"?a=u:s==="unify"?a=hr(u)??u:a=s(...u).map((l,c)=>[l,u[c]]).map(([l,c])=>ei(c,l))}if(i.value instanceof ta)return this.ctx.generateLog(i.value.op,a);let o=i.value(...a);if(!Zr(o))throw new Error("Functions running in codegen mode must return snippets");return o}catch(a){throw new tr(a,[{toString:()=>k(i.value)}])}}if(e[0]===ie.objectExpr){let t=e[1],r=this.ctx.expectedType;if(!r||!_e(r))throw new Ce(`No target type could be inferred for object with keys [${Object.keys(t).join(", ")}], please wrap the object in the corresponding schema.`);let n=Object.fromEntries(Object.entries(r.propTypes).map(([s,a])=>{let o=t[s];if(o===void 0)throw new Ce(`Missing property ${s} in object literal for struct ${r}`);let u=this.typedExpression(o,a);return[s,u]})),i=Wo(r,n);return w(y`${this.ctx.resolve(r).value}(${i})`,r)}if(e[0]===ie.arrayExpr){let[t,r]=e,n=this.ctx.expectedType,i,s;if(He(n)){if(i=n.elementType,s=r.map(o=>this.typedExpression(o,i)),s.length!==n.elementCount)throw new Ce(`Cannot create value of type '${n}' from an array of length: ${s.length}`)}else{let o=r.map(l=>this.expression(l));if(o.length===0)throw new Ce("Cannot infer the type of an empty array literal.");let u=hr(o);if(!u)throw new Ce("The given values cannot be automatically converted to a common type. Consider wrapping the array in an appropriate schema");s=u,i=Dr(s[0]?.dataType)}let a=`array<${this.ctx.resolve(i).value}, ${s.length}>`;return w(y`${a}(${s})`,Ze[p].jsImpl(i,s.length))}if(e[0]===ie.stringLiteral)return w(e[1],ze);if(e[0]===ie.preUpdate)throw new Error("Cannot use pre-updates in TGSL.");zh(e)}functionDefinition(e){return this.block(e)}statement(e){if(typeof e=="string")return`${this.ctx.pre}${this.ctx.resolve(this.identifier(e).value).value};`;if(typeof e=="boolean")return`${this.ctx.pre}${e?"true":"false"};`;if(e[0]===ie.return){let t=e[1];if(t!==void 0){let r=this.ctx.topFunctionReturnType,n=r?this.typedExpression(t,r):this.expression(t);return lt(n.dataType.type!=="unknown","Return type should be known"),this.ctx.reportReturnType(n.dataType),y`${this.ctx.pre}return ${n};`}return`${this.ctx.pre}return;`}if(e[0]===ie.if){let[t,r,n,i]=e,s=this.typedExpression(r,te),a=s.value===!1?void 0:this.block(si(n)),o=s.value===!0||!i?void 0:this.block(si(i));return s.value===!0?`${this.ctx.pre}${a}`:s.value===!1?o?`${this.ctx.pre}${o}`:"":o?y`\
${this.ctx.pre}if (${s}) ${a}
${this.ctx.pre}else ${o}`:y`${this.ctx.pre}if (${s}) ${a}`}if(e[0]===ie.let||e[0]===ie.const){let[t,r,n]=e,i=n!==void 0?this.expression(n):void 0;if(!i)throw new Error(`Cannot create variable '${r}' without an initial value.`);if(Dt(i.dataType))throw new Error(`Cannot create variable '${r}' with loose data type.`);let s=this.blockVariable(r,Dr(i.dataType));return y`${this.ctx.pre}var ${s.value} = ${i};`}if(e[0]===ie.block)return this.block(e);if(e[0]===ie.for){let[t,r,n,i,s]=e,[a,o,u]=this.ctx.withResetIndentLevel(()=>[r?this.statement(r):void 0,n?this.typedExpression(n,te):void 0,i?this.statement(i):void 0]),l=a?a.slice(0,-1):"",c=u?u.slice(0,-1):"",d=this.block(si(s));return y`${this.ctx.pre}for (${l}; ${o}; ${c}) ${d}`}if(e[0]===ie.while){let[t,r,n]=e,i=this.typedExpression(r,te),s=this.ctx.resolve(i.value).value,a=this.block(si(n));return`${this.ctx.pre}while (${s}) ${a}`}return e[0]===ie.continue?`${this.ctx.pre}continue;`:e[0]===ie.break?`${this.ctx.pre}break;`:`${this.ctx.pre}${this.ctx.resolve(this.expression(e).value).value};`}};function zh(e){throw new Error(`'${nr(e)}' was not handled by the WGSL generator.`)}function Ah(e){return/^0x[0-9a-f]+$/i.test(e)?Number.parseInt(e):/^0b[01]+$/i.test(e)?Number.parseInt(e.slice(2),2):Number.parseFloat(e)}function si(e){return typeof e!="object"||e[0]!==ie.block?[ie.block,[e]]:e}var Ph=new Sh,La=Ph;var Iu=Object.defineProperty,Eh=(e,t,r)=>t in e?Iu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Rh=(e,t)=>{for(var r in t)Iu(e,r,{get:t[r],enumerable:!0})},F=(e,t,r)=>Eh(e,typeof t!="symbol"?t+"":t,r),kh={};Rh(kh,{BufferReader:()=>zt,BufferWriter:()=>At,MaxValue:()=>ve,Measurer:()=>ue,UnresolvedReferenceError:()=>lr,ValidationError:()=>ci,arrayOf:()=>Oh,bool:()=>Hh,byte:()=>Nh,chars:()=>im,concat:()=>um,dynamicArrayOf:()=>cm,f16:()=>em,f32:()=>rm,f32Array:()=>zm,f64Array:()=>Am,generic:()=>am,genericEnum:()=>om,i16:()=>Wh,i16Array:()=>Mm,i32:()=>Xh,i32Array:()=>Sm,i8:()=>Fh,i8Array:()=>Tm,keyed:()=>hm,object:()=>sm,optional:()=>fm,string:()=>Lh,tupleOf:()=>bm,u16:()=>Yh,u16Array:()=>wm,u32:()=>Zh,u32Array:()=>xm,u8:()=>Fu,u8Array:()=>vm,u8ClampedArray:()=>_m});var lr=class Hu extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Hu.prototype)}},ci=class Cu extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Cu.prototype)}},Bh=class{constructor(){F(this,"size",Number.NaN),F(this,"unbounded",this),F(this,"isUnbounded",!0)}add(){return this}fork(){return this}},$h=new Bh,ue=class Lu{constructor(){F(this,"size",0),F(this,"unbounded",$h),F(this,"isUnbounded",!1)}add(t){return this.size+=t,this}fork(){let t=new Lu;return t.size=this.size,t}},ve=Symbol("The biggest (in amount of bytes needed) value a schema can represent"),Te=class{constructor(){F(this,"__unwrapped")}resolveReferences(e){}seekProperty(e,t){return null}},Dh=class{constructor(e){this.key=e}},xn={STRING:"string",ENUM:"enum"},Uh=class extends Te{constructor(e,t){super(),this._unstableElementSchema=e,this.length=t,F(this,"elementSchema"),this.elementSchema=e}resolveReferences(e){this.elementSchema=e.resolve(this._unstableElementSchema)}write(e,t){if(t.length!==this.length)throw new ci(`Expected array of length ${this.length}, got ${t.length}`);for(let r of t)this.elementSchema.write(e,r)}read(e){let t=[];for(let r=0;r<this.length;++r)t.push(this.elementSchema.read(e));return t}get maxSize(){return this.elementSchema.measure(ve).size*this.length}measure(e,t=new ue){for(let r=0;r<this.length;++r)this.elementSchema.measure(e===ve?ve:e[r],t);return t}};function Oh(e,t){return new Uh(e,t)}var Ih=class extends Te{constructor(){super(...arguments),F(this,"maxSize",1)}read(e){return e.readBool()}write(e,t){e.writeBool(t)}measure(e,t=new ue){return t.add(1)}},Hh=new Ih,Vu=class wn extends Te{static get _encoder(){return wn._cachedEncoder||(wn._cachedEncoder=new TextEncoder),wn._cachedEncoder}read(t){return t.readString()}write(t,r){t.writeString(r)}measure(t,r=new ue){if(t===ve)return r.unbounded;let n=wn._encoder.encode(t);return r.add(n.byteLength+1)}};F(Vu,"_cachedEncoder");var Ch=Vu,Lh=new Ch,Vh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",1)}read(e){return e.readInt8()}write(e,t){e.writeInt8(t)}measure(e,t=new ue){return t.add(1)}},Fh=new Vh,Gh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",1)}read(e){return e.readUint8()}write(e,t){e.writeUint8(t)}measure(e,t=new ue){return t.add(1)}},Fu=new Gh,Nh=Fu,jh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",2)}read(e){return e.readInt16()}write(e,t){e.writeInt16(t)}measure(e,t=new ue){return t.add(2)}},Wh=new jh,qh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",2)}read(e){return e.readUint16()}write(e,t){e.writeUint16(t)}measure(e,t=new ue){return t.add(2)}},Yh=new qh,Kh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",4)}read(e){return e.readInt32()}write(e,t){e.writeInt32(t)}measure(e,t=new ue){return t.add(4)}},Xh=new Kh,Qh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",4)}read(e){return e.readUint32()}write(e,t){e.writeUint32(t)}measure(e,t=new ue){return t.add(4)}},Zh=new Qh,Jh=class extends Te{constructor(){super(...arguments),F(this,"maxSize",2)}read(e){return e.readFloat16()}write(e,t){e.writeFloat16(t)}measure(e,t=new ue){return t.add(2)}},em=new Jh,tm=class extends Te{constructor(){super(...arguments),F(this,"maxSize",4)}read(e){return e.readFloat32()}write(e,t){e.writeFloat32(t)}measure(e,t=new ue){return t.add(4)}},rm=new tm,nm=class extends Te{constructor(e){super(),this.length=e}write(e,t){if(t.length!==this.length)throw new ci(`Expected char-string of length ${this.length}, got ${t.length}`);for(let r=0;r<t.length;++r)e.writeUint8(t.charCodeAt(r))}read(e){let t="";for(let r=0;r<this.length;++r)t+=String.fromCharCode(e.readByte());return t}measure(e,t=new ue){return t.add(this.length)}};function im(e){return new nm(e)}function qt(e){return Object.entries(e)}function Gu(e,t){let r={};for(let[n,i]of qt(t))r[n]=e.resolve(i);return r}var Va=class extends Te{constructor(e){super(),this._properties=e,F(this,"properties"),this.properties=e}resolveReferences(e){this.properties=Gu(e,this._properties)}write(e,t){for(let[r,n]of qt(this.properties))n.write(e,t[r])}read(e){let t={};for(let[r,n]of qt(this.properties))t[r]=n.read(e);return t}get maxSize(){let e=new ue;for(let t of Object.values(this.properties))t.measure(ve,e);return e.size}measure(e,t=new ue){for(let[r,n]of qt(this.properties))n.measure(e===ve?ve:e[r],t);return t}seekProperty(e,t){let r=0;for(let[n,i]of qt(this.properties)){if(n===t)return{bufferOffset:r,schema:i};r+=i.measure(e).size}return null}};function sm(e){return new Va(e)}var Nu=class extends Te{constructor(e,t,r){super(),this.keyedBy=e,this._subTypeMap=r,F(this,"_baseObject"),F(this,"subTypeMap"),this._baseObject=new Va(t),this.subTypeMap=r}resolveReferences(e){this._baseObject.resolveReferences(e),this.subTypeMap=Gu(e,this._subTypeMap)}write(e,t){let r=t.type,n=this.subTypeMap[r]||null;if(n===null)throw new Error(`Unknown sub-type '${r.toString()}' in among '${JSON.stringify(Object.keys(this.subTypeMap))}'`);this.keyedBy===xn.ENUM?e.writeUint8(t.type):e.writeString(t.type),this._baseObject.write(e,t);for(let[i,s]of qt(n.properties))s.write(e,t[i])}read(e){let t=this.keyedBy===xn.ENUM?e.readByte():e.readString(),r=this.subTypeMap[t]||null;if(r===null)throw new Error(`Unknown sub-type '${t}' in among '${JSON.stringify(Object.keys(this.subTypeMap))}'`);let n=this._baseObject.read(e);if(n.type=t,r!==null)for(let[i,s]of qt(r.properties))n[i]=s.read(e);return n}measure(e,t=new ue){if(this._baseObject.measure(e,t),this.keyedBy===xn.ENUM)t.add(1);else if(e!==ve)t.add(e.type.length+1);else return t.unbounded;if(e===ve){let r=Object.values(this.subTypeMap).map(n=>{let i=t.fork();for(let s of Object.values(n.properties))s.measure(ve,i);return[n,i.size]}).reduce((n,i)=>n[1]>i[1]?n:i)[0];for(let n of Object.values(r.properties))n.measure(ve,t)}else{let r=e.type,n=this.subTypeMap[r]||null;if(n===null)throw new Error(`Unknown sub-type '${r.toString()}', expected one of '${JSON.stringify(Object.keys(this.subTypeMap))}'`);for(let[i,s]of qt(n.properties))s.measure(e[i],t)}return t}};function am(e,t){return new Nu(xn.STRING,e,t)}function om(e,t){return new Nu(xn.ENUM,e,t)}function um(e){return new Va(Object.fromEntries(e.flatMap(({properties:t})=>Object.entries(t))))}var lm=class extends Te{constructor(e){super(),this._unstableElementType=e,F(this,"elementType"),this.elementType=e}resolveReferences(e){this.elementType=e.resolve(this._unstableElementType)}write(e,t){e.writeUint32(t.length);for(let r of t)this.elementType.write(e,r)}read(e){let t=[],r=e.readUint32();for(let n=0;n<r;++n)t.push(this.elementType.read(e));return t}get maxSize(){return this.measure(ve).size}measure(e,t=new ue){if(e===ve)return t.unbounded;t.add(4);for(let r of e)this.elementType.measure(r,t);return t}seekProperty(e,t){if(typeof t=="symbol")return null;let r=Number.parseInt(String(t),10);if(Number.isNaN(r))return null;if(e===ve)return{bufferOffset:this.elementType.measure(ve).size*r,schema:this.elementType};if(r>=e.length)return null;let n=new ue;for(let i=0;i<r;++i)this.elementType.measure(e[i],n);return{bufferOffset:n.size,schema:this.elementType}}};function cm(e){return new lm(e)}var ju=class{constructor(e){F(this,"__unwrapped"),F(this,"ref"),this.ref=new Dh(e)}resolveReferences(){throw new lr("Tried to resolve a reference directly. Do it through a RefResolver instead.")}read(){throw new lr("Tried to read a reference directly. Resolve it instead.")}write(){throw new lr("Tried to write a reference directly. Resolve it instead.")}measure(){throw new lr("Tried to measure size of a reference directly. Resolve it instead.")}seekProperty(){throw new lr("Tried to seek property of a reference directly. Resolve it instead.")}},dm=class{constructor(){F(this,"registry",{})}hasKey(e){return this.registry[e]!==void 0}register(e,t){this.registry[e]=t}resolve(e){if(e instanceof ju){let r=e.ref.key;if(this.registry[r]!==void 0)return this.registry[r];throw new lr(`Couldn't resolve reference to ${r}. Unknown key.`)}return e.resolveReferences(this),e}},pm=class{constructor(e,t){this.key=e,F(this,"__unwrapped"),F(this,"__keyDefinition"),F(this,"innerType"),this.innerType=t(new ju(e)),this.resolveReferences(new dm)}resolveReferences(e){e.hasKey(this.key)||(e.register(this.key,this.innerType),this.innerType.resolveReferences(e))}read(e){return this.innerType.read(e)}write(e,t){this.innerType.write(e,t)}get maxSize(){return this.measure(ve).size}measure(e,t=new ue){return this.innerType.measure(e,t)}seekProperty(e,t){return this.innerType.seekProperty(e,t)}};function hm(e,t){return new pm(e,t)}var mm=class extends Te{constructor(e){super(),this._innerUnstableSchema=e,F(this,"innerSchema"),this.innerSchema=e}resolveReferences(e){this.innerSchema=e.resolve(this._innerUnstableSchema)}write(e,t){t!=null?(e.writeBool(!0),this.innerSchema.write(e,t)):e.writeBool(!1)}read(e){if(e.readBool())return this.innerSchema.read(e)}get maxSize(){return this.measure(ve).size}measure(e,t=new ue){return e!==void 0&&this.innerSchema.measure(e,t),t.add(1)}};function fm(e){return new mm(e)}function gm(e,t){return t.map(r=>e.resolve(r))}var ym=class extends Te{constructor(e){super(),this._unstableSchemas=e,F(this,"schemas"),this.schemas=e}resolveReferences(e){this.schemas=gm(e,this._unstableSchemas)}write(e,t){if(t.length!==this.schemas.length)throw new ci(`Expected tuple of length ${this.schemas.length}, got ${t.length}`);for(let r=0;r<this.schemas.length;++r)this.schemas[r].write(e,t[r])}read(e){let t=[];for(let r=0;r<this.schemas.length;++r)t.push(this.schemas[r].read(e));return t}get maxSize(){return this.measure(ve).size}measure(e,t=new ue){for(let r=0;r<this.schemas.length;++r)this.schemas[r].measure(e===ve?ve:e[r],t);return t}};function bm(e){return new ym(e)}var Lt=class extends Te{constructor(e,t){super(),this.length=e,this._arrayConstructor=t,F(this,"byteLength"),this.byteLength=e*t.BYTES_PER_ELEMENT}write(e,t){e.writeSlice(t)}read(e){let t=new ArrayBuffer(this.byteLength),r=new this._arrayConstructor(t,0,this.length);return e.readSlice(r,0,this.byteLength),r}measure(e,t=new ue){return t.add(this.byteLength)}},vm=e=>new Lt(e,Uint8Array),_m=e=>new Lt(e,Uint8ClampedArray),wm=e=>new Lt(e,Uint16Array),xm=e=>new Lt(e,Uint32Array),Tm=e=>new Lt(e,Int8Array),Mm=e=>new Lt(e,Int16Array),Sm=e=>new Lt(e,Int32Array),zm=e=>new Lt(e,Float32Array),Am=e=>new Lt(e,Float64Array);function Pm(){let e=new Uint8Array(4),t=new Uint32Array(e.buffer);return t[0]=1,e[0]===0}function Fa(){return Pm()?"big":"little"}function Ga(e){let t=0,r=e;return r&&"buffer"in r&&"byteOffset"in r&&(t+=r.byteOffset,r=r.buffer),{buffer:r,byteOffset:t,byteLength:e.byteLength}}var Wu=class{constructor(e,t){F(this,"dataView"),F(this,"littleEndian"),F(this,"needsByteSwap"),F(this,"byteOffset",0),F(this,"endianness");let{byteOffset:r=0,endianness:n="system"}=t??{};this.byteOffset=r;let i=Fa();this.endianness=n==="system"?i:n,this.littleEndian=this.endianness==="little",this.needsByteSwap=this.endianness!==i;let s=Ga(e);this.byteOffset+=s.byteOffset,this.dataView=new DataView(s.buffer)}get currentByteOffset(){return this.byteOffset}seekTo(e){this.byteOffset=e}skipBytes(e){this.byteOffset+=e}},zt=class extends Wu{constructor(){super(...arguments),F(this,"_cachedTextDecoder")}get _textDecoder(){return this._cachedTextDecoder||(this._cachedTextDecoder=new TextDecoder(void 0,{fatal:!0})),this._cachedTextDecoder}readBool(){return this.dataView.getUint8(this.byteOffset++)!==0}readByte(){return this.dataView.getUint8(this.byteOffset++)}readInt8(){return this.dataView.getInt8(this.byteOffset++)}readUint8(){return this.dataView.getUint8(this.byteOffset++)}readInt16(){let e=this.dataView.getInt16(this.byteOffset,this.littleEndian);return this.byteOffset+=2,e}readUint16(){let e=this.dataView.getUint16(this.byteOffset,this.littleEndian);return this.byteOffset+=2,e}readInt32(){let e=this.dataView.getInt32(this.byteOffset,this.littleEndian);return this.byteOffset+=4,e}readUint32(){let e=this.dataView.getUint32(this.byteOffset,this.littleEndian);return this.byteOffset+=4,e}readFloat16(){let e=this.dataView.getFloat16(this.byteOffset,this.littleEndian);return this.byteOffset+=2,e}readFloat32(){let e=this.dataView.getFloat32(this.byteOffset,this.littleEndian);return this.byteOffset+=4,e}readString(){let e=0;for(;this.byteOffset+e<this.dataView.byteLength&&this.dataView.getUint8(this.byteOffset+e++)!==0;);let t=this._textDecoder.decode(new Uint8Array(this.dataView.buffer,this.byteOffset,e-1));return this.byteOffset+=e,t}readSlice(e,t,r){let n=Ga(e),i=new Uint8Array(n.buffer,n.byteOffset+t),s=e.BYTES_PER_ELEMENT;if(this.needsByteSwap&&s>1)for(let a=0;a<r;a+=s)for(let o=s-1;o>=0;o--)i[a+o]=this.dataView.getUint8(this.byteOffset++);else i.set(new Uint8Array(this.dataView.buffer,this.byteOffset,r)),this.byteOffset+=r}},At=class extends Wu{constructor(){super(...arguments),F(this,"_cachedTextEncoder")}get _textEncoder(){return this._cachedTextEncoder||(this._cachedTextEncoder=new TextEncoder),this._cachedTextEncoder}writeBool(e){this.dataView.setUint8(this.byteOffset++,e?1:0)}writeByte(e){this.dataView.setUint8(this.byteOffset++,e)}writeInt8(e){this.dataView.setInt8(this.byteOffset++,e)}writeUint8(e){this.dataView.setUint8(this.byteOffset++,e)}writeInt16(e){this.dataView.setInt16(this.byteOffset,e,this.littleEndian),this.byteOffset+=2}writeUint16(e){this.dataView.setUint16(this.byteOffset,e,this.littleEndian),this.byteOffset+=2}writeInt32(e){this.dataView.setInt32(this.byteOffset,e,this.littleEndian),this.byteOffset+=4}writeUint32(e){this.dataView.setUint32(this.byteOffset,e,this.littleEndian),this.byteOffset+=4}writeFloat16(e){this.dataView.setFloat16(this.byteOffset,e,this.littleEndian),this.byteOffset+=2}writeFloat32(e){this.dataView.setFloat32(this.byteOffset,e,this.littleEndian),this.byteOffset+=4}writeString(e){let t=this._textEncoder.encodeInto(e,new Uint8Array(this.dataView.buffer,this.byteOffset));this.byteOffset+=t.written,this.dataView.setUint8(this.byteOffset++,0)}writeSlice(e){let t=Ga(e),r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=e.BYTES_PER_ELEMENT;if(this.needsByteSwap&&n>1)for(let i=0;i<r.length;i+=n)for(let s=n-1;s>=0;s--)this.dataView.setUint8(this.byteOffset++,r[i+s]);else new Uint8Array(this.dataView.buffer,this.byteOffset).set(r),this.byteOffset+=r.length}};var qu=T({name:"bitcastU32toF32",normalImpl:(e=>typeof e=="number"?ht(e):O.bitcastU32toF32[e.kind](e)),codegenImpl:e=>y`bitcast<f32>(${e})`,signature:(...e)=>{let t=Ae(e,[A])??e;return{argTypes:t,returnType:Ke(t[0])?t[0].type==="vec2u"?K:t[0].type==="vec3u"?ye:_:g}}}),Yu=T({name:"bitcastU32toI32",normalImpl:(e=>typeof e=="number"?mt(e):O.bitcastU32toI32[e.kind](e)),codegenImpl:e=>y`bitcast<i32>(${e})`,signature:(...e)=>{let t=Ae(e,[A])??e;return{argTypes:t,returnType:Ke(t[0])?t[0].type==="vec2u"?fe:t[0].type==="vec3u"?Pe:J:W}}}),Ku=ge(e=>{let t=new ArrayBuffer(4);new At(t).writeUint32(e);let r=new zt(t);return K(r.readFloat16(),r.readFloat16())},e=>w(y`unpack2x16float(${e})`,K),"unpack2x16float"),e_=ge(e=>{let t=new ArrayBuffer(4),r=new At(t);r.writeFloat16(e.x),r.writeFloat16(e.y);let n=new zt(t);return A(n.readUint32())},e=>w(y`pack2x16float(${e})`,A),"pack2x16float"),t_=ge(e=>{let t=new ArrayBuffer(4);new At(t).writeUint32(e);let r=new zt(t);return _(r.readUint8()/255,r.readUint8()/255,r.readUint8()/255,r.readUint8()/255)},e=>w(y`unpack4x8unorm(${e})`,_),"unpack4x8unorm"),r_=ge(e=>{let t=new ArrayBuffer(4),r=new At(t);r.writeUint8(e.x*255),r.writeUint8(e.y*255),r.writeUint8(e.z*255),r.writeUint8(e.w*255);let n=new zt(t);return A(n.readUint32())},e=>w(y`pack4x8unorm(${e})`,A),"pack4x8unorm");function Ir(e){return e.type.includes("2")?ct:e.type.includes("3")?dt:pt}var Xu=T({name:"allEq",signature:(...e)=>({argTypes:e,returnType:te}),normalImpl:(e,t)=>ja(Tn(e,t)),codegenImpl:(e,t)=>y`all(${e} == ${t})`}),Tn=(e,t)=>O.eq[e.kind](e,t),n_=T({name:"eq",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:Tn,codegenImpl:(e,t)=>y`(${e} == ${t})`}),i_=T({name:"ne",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:(e,t)=>Vt(Tn(e,t)),codegenImpl:(e,t)=>y`(${e} != ${t})`}),di=(e,t)=>O.lt[e.kind](e,t),s_=T({name:"lt",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:di,codegenImpl:(e,t)=>y`(${e} < ${t})`}),a_=T({name:"le",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:(e,t)=>Na(di(e,t),Tn(e,t)),codegenImpl:(e,t)=>y`(${e} <= ${t})`}),o_=T({name:"gt",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:(e,t)=>Qu(Vt(di(e,t)),Vt(Tn(e,t))),codegenImpl:(e,t)=>y`(${e} > ${t})`}),u_=T({name:"ge",signature:(...e)=>({argTypes:e,returnType:Ir(e[0])}),normalImpl:(e,t)=>Vt(di(e,t)),codegenImpl:(e,t)=>y`(${e} >= ${t})`}),Vt=e=>O.neg[e.kind](e),l_=T({name:"not",signature:(...e)=>({argTypes:e,returnType:e[0]}),normalImpl:Vt,codegenImpl:e=>y`!(${e})`}),Na=(e,t)=>O.or[e.kind](e,t),c_=T({name:"or",signature:(...e)=>({argTypes:e,returnType:e[0]}),normalImpl:Na,codegenImpl:(e,t)=>y`(${e} | ${t})`}),Qu=(e,t)=>Vt(Na(Vt(e),Vt(t))),d_=T({name:"and",signature:(...e)=>({argTypes:e,returnType:e[0]}),normalImpl:Qu,codegenImpl:(e,t)=>y`(${e} & ${t})`}),ja=e=>O.all[e.kind](e),p_=T({name:"all",signature:(...e)=>({argTypes:e,returnType:te}),normalImpl:ja,codegenImpl:e=>y`all(${e})`}),h_=T({name:"any",signature:(...e)=>({argTypes:e,returnType:te}),normalImpl:e=>!ja(Vt(e)),codegenImpl:e=>y`any(${e})`}),m_=T({name:"isCloseTo",signature:(...e)=>({argTypes:e,returnType:te}),normalImpl:(e,t,r=.01)=>typeof e=="number"&&typeof t=="number"?Math.abs(e-t)<r:ne(e)&&ne(t)?O.isCloseToZero[e.kind](Or[p].jsImpl(e,t),r):!1,codegenImpl:(e,t,r=w(.01,g))=>Jr(e)&&Jr(t)?y`(abs(f32(${e}) - f32(${t})) <= ${r})`:!Jr(e)&&!Jr(t)?y`all(abs(${e} - ${t}) <= (${e} - ${e}) + ${r})`:"false"});function Rm(e,t,r){return typeof r=="boolean"?r?t:e:O.select[e.kind](e,t,r)}var f_=T({name:"select",signature:(e,t,r)=>{let[n,i]=Ae([e,t])??[e,t];return{argTypes:[n,i,r],returnType:n}},normalImpl:Rm,codegenImpl:(e,t,r)=>y`select(${e}, ${t}, ${r})`}),Hr={r8unorm:{channelType:g,vectorType:_,texelSize:1,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only","read-write"]},r8snorm:{channelType:g,vectorType:_,texelSize:1,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only"]},r8uint:{channelType:A,vectorType:ee,texelSize:1,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},r8sint:{channelType:W,vectorType:J,texelSize:1,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rg8unorm:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only"]},rg8snorm:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only"]},rg8uint:{channelType:A,vectorType:ee,texelSize:2,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rg8sint:{channelType:W,vectorType:J,texelSize:2,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rgba8unorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only","read-write"]},"rgba8unorm-srgb":{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:null},rgba8snorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rgba8uint:{channelType:A,vectorType:ee,texelSize:4,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba8sint:{channelType:W,vectorType:J,texelSize:4,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},bgra8unorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only"]},"bgra8unorm-srgb":{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:null},r16unorm:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},r16snorm:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},r16uint:{channelType:A,vectorType:ee,texelSize:2,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},r16sint:{channelType:W,vectorType:J,texelSize:2,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},r16float:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only","read-write"]},rg16unorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rg16snorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rg16uint:{channelType:A,vectorType:ee,texelSize:4,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rg16sint:{channelType:W,vectorType:J,texelSize:4,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rg16float:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only"]},rgba16unorm:{channelType:g,vectorType:_,texelSize:8,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rgba16snorm:{channelType:g,vectorType:_,texelSize:8,sampleTypes:["unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rgba16uint:{channelType:A,vectorType:ee,texelSize:8,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba16sint:{channelType:W,vectorType:J,texelSize:8,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba16float:{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only","read-write"]},r32uint:{channelType:A,vectorType:ee,texelSize:4,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},r32sint:{channelType:W,vectorType:J,texelSize:4,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},r32float:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rg32uint:{channelType:A,vectorType:ee,texelSize:8,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only"]},rg32sint:{channelType:W,vectorType:J,texelSize:8,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only"]},rg32float:{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba32uint:{channelType:A,vectorType:ee,texelSize:16,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba32sint:{channelType:W,vectorType:J,texelSize:16,sampleTypes:["sint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgba32float:{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!1,canResolve:!1,storageBindings:["write-only","read-only","read-write"]},rgb10a2uint:{channelType:A,vectorType:ee,texelSize:4,sampleTypes:["uint"],aspects:["color"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:["write-only","read-only"]},rgb10a2unorm:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only"]},rg11b10ufloat:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!0,canBlend:!0,canMultisample:!0,canResolve:!0,storageBindings:["write-only","read-only"]},rgb9e5ufloat:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},stencil8:{channelType:A,vectorType:ee,texelSize:1,sampleTypes:["uint"],aspects:["stencil"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},depth16unorm:{channelType:g,vectorType:_,texelSize:2,sampleTypes:["depth","unfilterable-float"],aspects:["depth"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},depth24plus:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["depth","unfilterable-float"],aspects:["depth"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},"depth24plus-stencil8":{channelType:g,vectorType:_,texelSize:4,sampleTypes:["depth","unfilterable-float"],aspects:["depth","stencil"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},depth32float:{channelType:g,vectorType:_,texelSize:4,sampleTypes:["depth","unfilterable-float"],aspects:["depth"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},"depth32float-stencil8":{channelType:g,vectorType:_,texelSize:4,sampleTypes:["depth","unfilterable-float"],aspects:["depth","stencil"],canRenderAttachment:!0,canBlend:!1,canMultisample:!0,canResolve:!1,storageBindings:null},"bc1-rgba-unorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc1-rgba-unorm-srgb":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc2-rgba-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc2-rgba-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc3-rgba-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc3-rgba-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc4-r-unorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc4-r-snorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc5-rg-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc5-rg-snorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc6h-rgb-ufloat":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc6h-rgb-float":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc7-rgba-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"bc7-rgba-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgb8unorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgb8unorm-srgb":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgb8a1unorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgb8a1unorm-srgb":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgba8unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"etc2-rgba8unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"eac-r11unorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"eac-r11snorm":{channelType:g,vectorType:_,texelSize:8,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"eac-rg11unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"eac-rg11snorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-4x4-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-4x4-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-5x4-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-5x4-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-5x5-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-5x5-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-6x5-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-6x5-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-6x6-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-6x6-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x5-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x5-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x6-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x6-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x8-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-8x8-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x5-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x5-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x6-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x6-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x8-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x8-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x10-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-10x10-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-12x10-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-12x10-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-12x12-unorm":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null},"astc-12x12-unorm-srgb":{channelType:g,vectorType:_,texelSize:16,sampleTypes:["float","unfilterable-float"],aspects:["color"],canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1,storageBindings:null}};function Wa(e,t){let r=Hr[e];if(!r)throw new Error(`Unknown texture format: ${e}`);let n={...r};switch(e){case"r32float":case"rg32float":case"rgba32float":t.features.has("float32-filterable")||(n={...n,sampleTypes:r.sampleTypes.filter(i=>i!=="float")}),t.features.has("float32-blendable")||(n={...n,canBlend:!1});break;case"bgra8unorm":t.features.has("bgra8unorm-storage")||(n={...n,storageBindings:null});break;case"rg11b10ufloat":t.features.has("rg11b10ufloat-renderable")||(n={...n,canRenderAttachment:!1,canBlend:!1,canMultisample:!1,canResolve:!1});break}if(n.storageBindings){let i=t.features.has("texture-formats-tier1"),s=t.features.has("texture-formats-tier2"),a=[...n.storageBindings],o=["r8unorm","r8uint","r8sint","r16uint","r16sint","r16float","rgba8unorm","rgba8uint","rgba8sint","rgba16uint","rgba16sint","rgba16float","r32uint","r32sint","r32float","rgba32uint","rgba32sint","rgba32float"],u=["r8snorm","rg8unorm","rg8snorm","rg8uint","rg8sint","rgba8snorm","r16unorm","r16snorm","rg16unorm","rg16snorm","rg16uint","rg16sint","rg16float","rgba16unorm","rgba16snorm","rgb10a2uint","rgb10a2unorm","rg11b10ufloat"];o.includes(e)&&!s&&(a=a.filter(l=>l!=="read-write")),u.includes(e)&&!i&&(a=a.filter(l=>l!=="write-only"&&l!=="read-only")),n={...n,storageBindings:a.length>0?a:null}}return n}var qa=["f16","clip_distances","dual_source_blending","subgroups","primitive_index"],Ya={f16:"shader-f16",clip_distances:"clip-distances",dual_source_blending:"dual-source-blending",subgroups:"subgroups",primitive_index:"primitive-index"};function km(e){return new Bm(e)}var Bm=class{constructor(e){this.declaration=e}[p]=!0;externalsToApply=[];$uses(e){return this.externalsToApply.push(e),this}[H](e){let t={};for(let n of this.externalsToApply)fr(t,n);let r=cn(e,t,this.declaration);return e.addDeclaration(r),w("",Se)}toString(){return`declare: ${this.declaration}`}};function pl(e){let t={argTypes:e.in&&Object.keys(e.in).length!==0?[yr(e.in)]:[],returnType:Se,workgroupSize:[e.workgroupSize[0]??1,e.workgroupSize[1]??1,e.workgroupSize[2]??1],isEntry:!0},r=(n,...i)=>$m(t,e.workgroupSize,dn(n,...i));return Object.assign(Object.assign(r,t),{does:r})}function $m(e,t,r){let n=gr(r,`@compute @workgroup_size(${t.join(", ")}) `),i=e.argTypes[0];return{shell:e,$uses(s){return n.applyExternals(s),this},[p]:!0,[oe]:n,$name(s){return Q(n,s),dr(i)&&i.$name(`${s}_Input`),this},[H](s){return n.resolve(s,e.argTypes,e.returnType)},toString(){return`computeFn:${k(n)??"<unnamed>"}`}}}function Z(e,t){let r={[p]:!0,argTypes:e,returnType:t??Se,isEntry:!1};return Object.assign((n,...i)=>Um(r,dn(n,...i)),r)}function hl(e){return q(e)&&e?.resourceType==="function"}function Dm([e,t]){return`${k(e)??"<unnamed>"}=${t}`}function Um(e,t){let r=gr(t,""),n={shell:e,resourceType:"function",$uses(a){return r.applyExternals(a),this},[oe]:r,$name(a){return Q(r,a),this},with(a,o){return ml(s,[[Qr(a)?a.slot:a,o]])},[H](a){return typeof t=="string"&&(fu(t,e.argTypes,r.applyExternals),Ba(t,e.returnType,r.applyExternals)),r.resolve(a,e.argTypes,e.returnType)}},i=ge((...a)=>jo(()=>{try{if(typeof t=="string")throw new Error("Cannot execute on the CPU functions constructed with raw WGSL");let o=a.map((l,c)=>mr(e.argTypes[c],l)),u=t(...o);return mr(e.returnType,u)}catch(o){throw o instanceof ra?o.appendToTrace(s):new ra(o,[s])}}),(...a)=>w(new fl(s,a),e.returnType),"tgpuFnCall",e.argTypes),s=Object.assign(i,n);return s[p].implementation=t,Object.defineProperty(s,"toString",{value(){return`fn:${k(r)??"<unnamed>"}`}}),s}function ml(e,t){let r={resourceType:"function",shell:e.shell,[Nt]:{inner:e,pairs:t},$uses(s){return e.$uses(s),this},[oe]:e,$name(s){return e.$name(s),this},with(s,a){return ml(i,[...t,[Qr(s)?s.slot:s,a]])}},n=ge((...s)=>e(...s),(...s)=>w(new fl(i,s),e.shell.returnType),"tgpuFnCall",e.shell.argTypes),i=Object.assign(n,r);return i[p].implementation=e[p].implementation,Object.defineProperty(i,"toString",{value(){return`fn:${k(e)??"<unnamed>"}[${t.map(Dm).join(", ")}]`}}),i[p].implementation=e[p].implementation,i}var fl=class{[p]=!0;[Re];[oe];#e;#t;constructor(e,t){this.#e=e,this.#t=t,this[oe]=e,this[Re]=w(this,this.#e.shell.returnType)}[H](e){return e.withResetIndentLevel(()=>w(y`${e.resolve(this.#e).value}(${this.#t})`,this.#e.shell.returnType))}toString(){return`call:${k(this)??"<unnamed>"}`}};function Om(e){let t={in:e.in,out:e.out,returnType:yr(e.out),isEntry:!0},r=(n,...i)=>Im(t,dn(n,...i));return Object.assign(Object.assign(r,t),{does:r})}function Im(e,t){let r=gr(t,"@fragment "),n=e.returnType;return typeof t=="string"&&Ba(t,n,i=>r.applyExternals(i)),{shell:e,outputType:n,$uses(i){return r.applyExternals(i),this},[p]:!0,[oe]:r,$name(i){return Q(r,i),dr(n)&&n.$name(`${i}_Output`),this},[H](i){let s=e.in?yr(e.in,i.varyingLocations).$name(`${k(this)??""}_Input`):void 0;return s&&r.applyExternals({In:s}),r.applyExternals({Out:n}),r.resolve(i,s?[s]:[],e.returnType)},toString(){return`fragmentFn:${k(r)??"<unnamed>"}`}}}var gl=new Set(["alias","break","case","const","const_assert","continue","continuing","default","diagnostic","discard","else","enable","false","fn","for","if","let","loop","override","requires","return","struct","switch","true","var","while","NULL","Self","abstract","active","alignas","alignof","as","asm","asm_fragment","async","attribute","auto","await","become","cast","catch","class","co_await","co_return","co_yield","coherent","column_major","common","compile","compile_fragment","concept","const_cast","consteval","constexpr","constinit","crate","debugger","decltype","delete","demote","demote_to_helper","do","dynamic_cast","enum","explicit","export","extends","extern","external","fallthrough","filter","final","finally","friend","from","fxgroup","get","goto","groupshared","highp","impl","implements","import","inline","instanceof","interface","layout","lowp","macro","macro_rules","match","mediump","meta","mod","module","move","mut","mutable","namespace","new","nil","noexcept","noinline","nointerpolation","non_coherent","noncoherent","noperspective","null","nullptr","of","operator","package","packoffset","partition","pass","patch","pixelfragment","precise","precision","premerge","priv","protected","pub","public","readonly","ref","regardless","register","reinterpret_cast","require","resource","restrict","self","set","shared","sizeof","smooth","snorm","static","static_assert","static_cast","std","subroutine","super","target","template","this","thread_local","throw","trait","try","type","typedef","typeid","typename","typeof","union","unless","unorm","unsafe","unsized","use","using","varying","virtual","volatile","wgsl","where","with","writeonly","yield"]);function yl(e){if(e==="_"||e.startsWith("__")||/\s/.test(e))throw new Error(`Invalid identifier '${e}'. Choose an identifier without whitespaces or leading underscores.`);let t=e.split("_")[0];return!gl.has(t)}var bl=class{makeValid(e){return yl(e)?e:this.makeUnique(e)}},Hm=class extends bl{lastUniqueId=0;makeUnique(e){let t;return e?(t=e.replaceAll(/\s/g,"_"),t=t.replaceAll(/[^\w\d]/g,"")):t="item",`${t}_${this.lastUniqueId++}`}},Cm=class extends bl{_usedNames=new Set(gl);makeUnique(e){if(e===void 0)throw new Error("Unnamed item found when using a strict name registry");let t=0,r=e;for(;this._usedNames.has(r);)t++,r=`${e}_${t}`;return this._usedNames.add(r),r}};function Lm(e,t){let r=gr(t,"");return{[p]:!0,[oe]:r,resourceType:"shellless-impl",[H](n){return r.resolve(n,e,void 0)},toString(){return`fn*:${k(r)??"<unnamed>"}`}}}var Vm=class{cache=new Map;get(e,t){let r=pr(e);if(!r?.ast)return;if(!t&&r.ast.params.length>0)throw new Error(`Cannot resolve '${k(e)}' directly, because it expects arguments. Either call it from another function, or wrap it in a shell`);let n=(t??[]).map(a=>Dr(a.dataType)),i=this.cache.get(e);if(i){let a=i.find(o=>o.argTypes.every((u,l)=>u===n[l]));if(a)return a.value}else i=[],this.cache.set(e,i);let s=Lm(n,e);return i.push({argTypes:n,value:s}),s}},Fm=class{[p];constructor(e){this[p]={nameRegistry:e,shelllessRepo:new Vm,memoizedResolves:new WeakMap,memoizedDerived:new WeakMap,listeners:{name:new Set}}}on(e,t){if(e==="name"){let r=this[p].listeners.name;return r.add(t),()=>r.delete(t)}throw new Error(`Unsupported event: ${e}`)}};function Gm(e,t){let r=e.nameRegistry.makeUnique(k(t));for(let n of e.listeners.name)n({target:t,name:r});return r}function En(e){let{names:t="random"}=e||{};return new Fm(t==="strict"?new Cm:new Hm)}function zi(e){return typeof e?.format=="string"}function Nm(e,t){let r=[];if(Tt(e)){if(!zi(t))throw new Error("Shader expected a single attribute, not a record of attributes to be passed in.");return r.push(t._layout),{usedVertexLayouts:r,bufferDefinitions:[{arrayStride:t._layout.stride,stepMode:t._layout.stepMode,attributes:[{format:t.format,offset:t.offset,shaderLocation:xt(e)??0}]}]}}let n=[],i=new WeakMap,s=0;for(let[a,o]of Object.entries(e)){if(Wt(o))continue;let u=t[a];if(!u)throw new Error(`An attribute by the name of '${a}' was not provided to the shader.`);let l=u._layout,c=i.get(l);c||(r.push(l),c=[],n.push({arrayStride:l.stride,stepMode:l.stepMode,attributes:c}),i.set(l,c)),s=xt(o)??s,c.push({format:u.format,offset:u.offset,shaderLocation:s++})}return{usedVertexLayouts:r,bufferDefinitions:n}}var jm=["bool","f32","f16","i32","u32","vec2f","vec3f","vec4f","vec2h","vec3h","vec4h","vec2i","vec3i","vec4i","vec2u","vec3u","vec4u","vec2<bool>","vec3<bool>","vec4<bool>","mat2x2f","mat3x3f","mat4x4f","texture_external"];function Wm(e){return jm.includes(e.type)}function Za(e,[t,r]){if(!yl(t))throw new Error(`Property key '${t}' is a reserved WGSL word. Choose a different name.`);return`  ${ln(r)}${t}: ${e.resolve(r).value},
`}function qm(e,t){if(t[p].isAbstruct)throw new Error("Cannot resolve abstract struct types to WGSL.");let r=e.getUniqueName(t);return e.addDeclaration(`struct ${r} {
${Object.entries(t.propTypes).map(n=>Za(e,n)).join("")}}`),r}function Ym(e,t){let r=e.getUniqueName(t);return e.addDeclaration(`struct ${r} {
${Object.entries(t.propTypes).map(n=>zi(n[1])?Za(e,[n[0],vt[n[1].format]]):Za(e,n)).join("")}
}`),r}function Km(e,t){let r=e.resolve(t.elementType).value;return t.elementCount===0?`array<${r}>`:`array<${r}, ${t.elementCount}>`}function Xm(e,t){let r=e.resolve(zi(t.elementType)?vt[t.elementType.format]:t.elementType).value;return t.elementCount===0?`array<${r}>`:`array<${r}, ${t.elementCount}>`}function vl(e,t){if(Dt(t))return t.type==="unstruct"?Ym(e,t):t.type==="disarray"?Xm(e,t):t.type==="loose-decorated"?e.resolve(zi(t.inner)?vt[t.inner.format]:t.inner).value:e.resolve(vt[t.type]).value;if(Wm(t))return t.type;if(t.type==="struct")return qm(e,t);if(t.type==="array")return Km(e,t);if(t.type==="atomic")return`atomic<${vl(e,t.inner)}>`;if(t.type==="decorated")return e.resolve(t.inner).value;if(t.type==="ptr")return t.addressSpace==="storage"?`ptr<storage, ${e.resolve(t.inner).value}, ${t.access==="read-write"?"read_write":t.access}>`:`ptr<${t.addressSpace}, ${e.resolve(t.inner).value}>`;if(t.type==="abstractInt"||t.type==="abstractFloat"||t.type==="void"||t.type==="u16")throw new Error(`${t.type} has no representation in WGSL`);if(li(t))return`${t.type}<${t.format}, ${Ur[t.access]}>`;if(Ru(t))return t.type.startsWith("texture_depth")?t.type:`${t.type}<${t.sampleType.type}>`;if(Pu(t)||Au(t))return t.type;rr(t,"resolveData")}var _l=class Ja{constructor(t){this.bindings=t}with(t,r){return new Ja([...this.bindings,[Qr(t)?t.slot:t,r]])}pipe(t){let r=t(this);return new Ja([...this.bindings,...r.bindings])}};function*Qm(e){let t=0;for(;;)e.has(t)||(yield t),t++}function Zm(e,t){let r="size"in e?e.size:e.currentByteOffset,n=t-1,i=r&n;"skipBytes"in e?e.skipBytes(t-i&n):e.add(t-i&n)}var xe=Zm,Zu=new WeakMap;function wl(e){let t=Zu.get(e);if(t)return t;let r=new ue,n={},i;for(let s in e.propTypes){let a=e.propTypes[s];if(a===void 0)throw new Error(`Property ${s} is undefined in struct`);let o=r.size;xe(r,ut(e)?Ve(a):ce(a)),i&&(i.padding=r.size-o);let u=j(a);n[s]={offset:r.size,size:u},i=n[s],r.add(u)}return i&&(i.padding=Oe(j(e),ce(e))-r.size),Zu.set(e,n),n}var Jm=(()=>{try{return new Function("return true"),!0}catch{return!1}})(),Ka=new WeakMap,pi={u32:"u32",vec2u:"u32",vec3u:"u32",vec4u:"u32",u16:"u16",i32:"i32",vec2i:"i32",vec3i:"i32",vec4i:"i32",f32:"f32",vec2f:"f32",vec3f:"f32",vec4f:"f32",f16:"f16",vec2h:"f16",vec3h:"f16",vec4h:"f16",mat2x2f:"f32",mat3x3f:"f32",mat4x4f:"f32"},ef={uint8:"u8",uint8x2:"u8",uint8x4:"u8",sint8:"i8",sint8x2:"i8",sint8x4:"i8",unorm8:"u8",unorm8x2:"u8",unorm8x4:"u8",snorm8:"i8",snorm8x2:"i8",snorm8x4:"i8",uint16:"u16",uint16x2:"u16",uint16x4:"u16",sint16:"i16",sint16x2:"i16",sint16x4:"i16",unorm16:"u16",unorm16x2:"u16",unorm16x4:"u16",snorm16:"i16",snorm16x2:"i16",snorm16x4:"i16",float16:"f16",float16x2:"f16",float16x4:"f16",float32:"f32",float32x2:"f32",float32x3:"f32",float32x4:"f32",uint32:"u32",uint32x2:"u32",uint32x3:"u32",uint32x4:"u32",sint32:"i32",sint32x2:"i32",sint32x3:"i32",sint32x4:"i32"},hi={u32:"setUint32",i32:"setInt32",f32:"setFloat32",u16:"setUint16",i16:"setInt16",f16:"setFloat16",u8:"setUint8",i8:"setInt8"},tf={unorm8:e=>`Math.round(${e} * 255)`,unorm8x2:e=>`Math.round(${e} * 255)`,unorm8x4:e=>`Math.round(${e} * 255)`,snorm8:e=>`Math.round(${e} * 127)`,snorm8x2:e=>`Math.round(${e} * 127)`,snorm8x4:e=>`Math.round(${e} * 127)`,unorm16:e=>`Math.round(${e} * 65535)`,unorm16x2:e=>`Math.round(${e} * 65535)`,unorm16x4:e=>`Math.round(${e} * 65535)`,snorm16:e=>`Math.round(${e} * 32767)`,snorm16x2:e=>`Math.round(${e} * 32767)`,snorm16x4:e=>`Math.round(${e} * 32767)`},Ju={"unorm10-10-10-2":{writeFunction:"setUint32",generator:(e,t)=>`output.setUint32(${e}, ((${t}.x*1023&0x3FF)<<22)|((${t}.y*1023&0x3FF)<<12)|((${t}.z*1023&0x3FF)<<2)|(${t}.w*3&3), littleEndian);
`},"unorm8x4-bgra":{writeFunction:"setUint8",generator:(e,t)=>{let r=["z","y","x","w"],n="";for(let i=0;i<4;i++)n+=`output.setUint8((${e} + ${i}), Math.round(${t}.${r[i]} * 255), littleEndian);
`;return n}}};function fi(e,t,r,n=0){let i=["i","j","k"][n]||`i${n}`;if(Ks(e)||$t(e))return fi(e.inner,t,r,n);if(_e(e)||ut(e)){let a=wl(e),o="";for(let[u,l]of Object.entries(a)){let c=e.propTypes[u];c&&(o+=fi(c,`(${t} + ${l.offset})`,`${r}.${u}`,n))}return o}if(He(e)||Ut(e)){let a=Oe(j(e.elementType),ce(e)),o="";return o+=`for (let ${i} = 0; ${i} < ${e.elementCount}; ${i}++) {
`,o+=fi(e.elementType,`(${t} + ${i} * ${a})`,`${r}[${i}]`,n+1),o+=`}
`,o}if(Ke(e)){let a=pi[e.type],o="",u=hi[a],l=["x","y","z","w"],c=Fn(e)?2:Gn(e)?3:4;for(let d=0;d<c;d++)o+=`output.${u}((${t} + ${d*4}), ${r}.${l[d]}, littleEndian);
`;return o}if(Qt(e)){let a=pi[e.type],o=hi[a],u=Ws(e)?2:qs(e)?3:4,l=u*u,c=Oe(u*4,8),d="";for(let h=0;h<l;h++){let m=Math.floor(h/u),f=h%u,v=m*c+f*4;d+=`output.${o}((${t} + ${v}), ${r}.columns[${m}].${["x","y","z","w"][f]}, littleEndian);
`}return d}if(Ea(e)){let a=e.type;if(a in Ju)return Ju[a].generator(t,r);let o=ef[a],u=hi[o],l=vt[a],c=js(l)?4:Gn(l)?3:Fn(l)?2:1,d=o==="u8"||o==="i8"?1:o==="u16"||o==="i16"||o==="f16"?2:4,h=["x","y","z","w"],m=tf[a],f="";for(let v=0;v<c;v++){let x=c===1?r:`${r}.${h[v]}`,M=m?m(x):x;f+=`output.${u}((${t} + ${v*d}), ${M}, littleEndian);
`}return f}if(!Object.hasOwn(pi,e.type))throw new Error(`Primitive ${e.type} is unsupported by compiled writer`);let s=pi[e.type];return`output.${hi[s]}(${t}, ${r}, littleEndian);
`}function el(e){if(!Jm){console.warn("This environment does not allow eval - using default writer as fallback");return}if(Ka.has(e))return Ka.get(e);try{let t=fi(e,"offset","value",0),r=new Function("output","offset","value","littleEndian=true",t);return Ka.set(e,r),r}catch(t){console.warn(`Failed to compile writer for schema: ${e}
Reason: ${t instanceof Error?t.message:String(t)}
Falling back to default writer`)}}var Lr={bool(){throw new Error("Booleans are not host-shareable")},f32(e,t,r){e.writeFloat32(r)},f16(e,t,r){e.writeFloat16(r)},i32(e,t,r){e.writeInt32(r)},u32(e,t,r){e.writeUint32(r)},u16(e,t,r){e.writeUint16(r)},vec2f(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y)},vec2h(e,t,r){e.writeFloat16(r.x),e.writeFloat16(r.y)},vec2i(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y)},vec2u(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y)},"vec2<bool>"(){throw new Error("Booleans are not host-shareable")},vec3f(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y),e.writeFloat32(r.z)},vec3h(e,t,r){e.writeFloat16(r.x),e.writeFloat16(r.y),e.writeFloat16(r.z)},vec3i(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y),e.writeInt32(r.z)},vec3u(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y),e.writeUint32(r.z)},"vec3<bool>"(){throw new Error("Booleans are not host-shareable")},vec4f(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y),e.writeFloat32(r.z),e.writeFloat32(r.w)},vec4h(e,t,r){e.writeFloat16(r.x),e.writeFloat16(r.y),e.writeFloat16(r.z),e.writeFloat16(r.w)},vec4i(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y),e.writeInt32(r.z),e.writeInt32(r.w)},vec4u(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y),e.writeUint32(r.z),e.writeUint32(r.w)},"vec4<bool>"(){throw new Error("Booleans are not host-shareable")},mat2x2f(e,t,r){for(let n=0;n<r.length;++n)e.writeFloat32(r[n])},mat3x3f(e,t,r){for(let n=0;n<r.length;++n)e.writeFloat32(r[n])},mat4x4f(e,t,r){for(let n=0;n<r.length;++n)e.writeFloat32(r[n])},struct(e,t,r){let n=ce(t);xe(e,n);for(let[i,s]of Object.entries(t.propTypes))xe(e,ce(s)),_i(e,s,r[i]);xe(e,n)},array(e,t,r){if(t.elementCount===0)throw new Error("Cannot write using a runtime-sized schema.");let n=ce(t);xe(e,n);let i=e.currentByteOffset;for(let s=0;s<Math.min(t.elementCount,r.length);s++)xe(e,n),_i(e,t.elementType,r[s]);e.seekTo(i+j(t))},ptr(){throw new Error("Pointers are not host-shareable")},atomic(e,t,r){Lr[t.inner.type]?.(e,t,r)},decorated(e,t,r){let n=Ve(t);xe(e,n);let i=e.currentByteOffset;Lr[t.inner?.type]?.(e,t.inner,r),e.seekTo(i+j(t))},uint8(e,t,r){e.writeUint8(r)},uint8x2(e,t,r){e.writeUint8(r.x),e.writeUint8(r.y)},uint8x4(e,t,r){e.writeUint8(r.x),e.writeUint8(r.y),e.writeUint8(r.z),e.writeUint8(r.w)},sint8(e,t,r){e.writeInt8(r)},sint8x2(e,t,r){e.writeInt8(r.x),e.writeInt8(r.y)},sint8x4(e,t,r){e.writeInt8(r.x),e.writeInt8(r.y),e.writeInt8(r.z),e.writeInt8(r.w)},unorm8(e,t,r){e.writeUint8(Math.round(r*255))},unorm8x2(e,t,r){e.writeUint8(Math.round(r.x*255)),e.writeUint8(Math.round(r.y*255))},unorm8x4(e,t,r){e.writeUint8(Math.round(r.x*255)),e.writeUint8(Math.round(r.y*255)),e.writeUint8(Math.round(r.z*255)),e.writeUint8(Math.round(r.w*255))},snorm8(e,t,r){e.writeInt8(Math.round(r*127))},snorm8x2(e,t,r){e.writeInt8(Math.round(r.x*127)),e.writeInt8(Math.round(r.y*127))},snorm8x4(e,t,r){e.writeInt8(Math.round(r.x*127)),e.writeInt8(Math.round(r.y*127)),e.writeInt8(Math.round(r.z*127)),e.writeInt8(Math.round(r.w*127))},uint16(e,t,r){e.writeUint16(r)},uint16x2(e,t,r){e.writeUint16(r.x),e.writeUint16(r.y)},uint16x4(e,t,r){e.writeUint16(r.x),e.writeUint16(r.y),e.writeUint16(r.z),e.writeUint16(r.w)},sint16(e,t,r){e.writeInt16(r)},sint16x2(e,t,r){e.writeInt16(r.x),e.writeInt16(r.y)},sint16x4(e,t,r){e.writeInt16(r.x),e.writeInt16(r.y),e.writeInt16(r.z),e.writeInt16(r.w)},unorm16(e,t,r){e.writeUint16(r*65535)},unorm16x2(e,t,r){e.writeUint16(r.x*65535),e.writeUint16(r.y*65535)},unorm16x4(e,t,r){e.writeUint16(r.x*65535),e.writeUint16(r.y*65535),e.writeUint16(r.z*65535),e.writeUint16(r.w*65535)},snorm16(e,t,r){e.writeInt16(Math.round(r*32767))},snorm16x2(e,t,r){e.writeInt16(Math.round(r.x*32767)),e.writeInt16(Math.round(r.y*32767))},snorm16x4(e,t,r){e.writeInt16(Math.round(r.x*32767)),e.writeInt16(Math.round(r.y*32767)),e.writeInt16(Math.round(r.z*32767)),e.writeInt16(Math.round(r.w*32767))},float16(e,t,r){e.writeFloat16(r)},float16x2(e,t,r){e.writeFloat16(r.x),e.writeFloat16(r.y)},float16x4(e,t,r){e.writeFloat16(r.x),e.writeFloat16(r.y),e.writeFloat16(r.z),e.writeFloat16(r.w)},float32(e,t,r){e.writeFloat32(r)},float32x2(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y)},float32x3(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y),e.writeFloat32(r.z)},float32x4(e,t,r){e.writeFloat32(r.x),e.writeFloat32(r.y),e.writeFloat32(r.z),e.writeFloat32(r.w)},uint32(e,t,r){e.writeUint32(r)},uint32x2(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y)},uint32x3(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y),e.writeUint32(r.z)},uint32x4(e,t,r){e.writeUint32(r.x),e.writeUint32(r.y),e.writeUint32(r.z),e.writeUint32(r.w)},sint32(e,t,r){e.writeInt32(r)},sint32x2(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y)},sint32x3(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y),e.writeInt32(r.z)},sint32x4(e,t,r){e.writeInt32(r.x),e.writeInt32(r.y),e.writeInt32(r.z),e.writeInt32(r.w)},"unorm10-10-10-2"(e,t,r){let n=0;n|=(r.x*1023&1023)<<22,n|=(r.y*1023&1023)<<12,n|=(r.z*1023&1023)<<2,n|=r.w*3&3,e.writeUint32(n)},"unorm8x4-bgra"(e,t,r){e.writeUint8(r.z*255),e.writeUint8(r.y*255),e.writeUint8(r.x*255),e.writeUint8(r.w*255)},disarray(e,t,r){let n=ce(t);xe(e,n);let i=e.currentByteOffset;for(let s=0;s<Math.min(t.elementCount,r.length);s++)xe(e,n),Lr[t.elementType?.type]?.(e,t.elementType,r[s]);e.seekTo(i+j(t))},unstruct(e,t,r){let n=t.propTypes;for(let[i,s]of Object.entries(n))Lr[s.type]?.(e,s,r[i])},"loose-decorated"(e,t,r){let n=Ve(t);xe(e,n);let i=e.currentByteOffset,s=Lr[t.inner?.type];return s?.(e,t.inner,r),e.seekTo(i+j(t)),r}};function _i(e,t,r){let n=Lr[t.type];if(!n)throw new Error(`Cannot write data of type '${t.type}'.`);n(e,t,r)}var rf={bool(){throw new Error("Booleans are not host-shareable")},f32(e){return e.readFloat32()},f16(e){return e.readFloat16()},i32(e){return e.readInt32()},u32(e){return e.readUint32()},u16(e){return e.readUint16()},vec2f(e){return K(e.readFloat32(),e.readFloat32())},vec3f(e){return ye(e.readFloat32(),e.readFloat32(),e.readFloat32())},vec4f(e){return _(e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32())},vec2h(e){return Fe(e.readFloat16(),e.readFloat16())},vec3h(e){return Ge(e.readFloat16(),e.readFloat16(),e.readFloat16())},vec4h(e){return Ne(e.readFloat16(),e.readFloat16(),e.readFloat16(),e.readFloat16())},vec2i(e){return fe(e.readInt32(),e.readInt32())},vec3i(e){return Pe(e.readInt32(),e.readInt32(),e.readInt32())},vec4i(e){return J(e.readInt32(),e.readInt32(),e.readInt32(),e.readInt32())},vec2u(e){return Ee(e.readUint32(),e.readUint32())},vec3u(e){return le(e.readUint32(),e.readUint32(),e.readUint32())},vec4u(e){return ee(e.readUint32(),e.readUint32(),e.readUint32(),e.readUint32())},"vec2<bool>"(){throw new Error("Booleans are not host-shareable")},"vec3<bool>"(){throw new Error("Booleans are not host-shareable")},"vec4<bool>"(){throw new Error("Booleans are not host-shareable")},mat2x2f(e){return gt(e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32())},mat3x3f(e){let t=()=>{let r=e.readFloat32();return e.readFloat32(),r};return yt(e.readFloat32(),e.readFloat32(),t(),e.readFloat32(),e.readFloat32(),t(),e.readFloat32(),e.readFloat32(),t())},mat4x4f(e){return be(e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32())},struct(e,t){let r=ce(t);xe(e,r);let n={},i=t.propTypes;for(let[s,a]of Object.entries(i))xe(e,ce(a)),n[s]=Rt(e,a);return xe(e,r),n},array(e,t){if(t.elementCount===0)throw new Error("Cannot read using a runtime-sized schema.");let r=ce(t),n=[];for(let i=0;i<t.elementCount;i++){xe(e,r);let s=t.elementType,a=Rt(e,s);n.push(a)}return xe(e,r),n},ptr(){throw new Error("Pointers are not host-shareable")},atomic(e,t){return Rt(e,t.inner)},decorated(e,t){let r=Ve(t);xe(e,r);let n=e.currentByteOffset,i=Rt(e,t.inner);return e.seekTo(n+j(t)),i},uint8:e=>e.readUint8(),uint8x2:e=>Ee(e.readUint8(),e.readUint8()),uint8x4:e=>ee(e.readUint8(),e.readUint8(),e.readUint8(),e.readUint8()),sint8:e=>e.readInt8(),sint8x2:e=>fe(e.readInt8(),e.readInt8()),sint8x4:e=>J(e.readInt8(),e.readInt8(),e.readInt8(),e.readInt8()),unorm8:e=>e.readUint8()/255,unorm8x2:e=>K(e.readUint8()/255,e.readUint8()/255),unorm8x4:e=>_(e.readUint8()/255,e.readUint8()/255,e.readUint8()/255,e.readUint8()/255),snorm8:e=>e.readInt8()/127,snorm8x2:e=>K(e.readInt8()/127,e.readInt8()/127),snorm8x4:e=>_(e.readInt8()/127,e.readInt8()/127,e.readInt8()/127,e.readInt8()/127),uint16:e=>e.readUint16(),uint16x2:e=>Ee(e.readUint16(),e.readUint16()),uint16x4:e=>ee(e.readUint16(),e.readUint16(),e.readUint16(),e.readUint16()),sint16:e=>e.readInt16(),sint16x2:e=>fe(e.readInt16(),e.readInt16()),sint16x4:e=>J(e.readInt16(),e.readInt16(),e.readInt16(),e.readInt16()),unorm16:e=>e.readUint16()/65535,unorm16x2:e=>K(e.readUint16()/65535,e.readUint16()/65535),unorm16x4:e=>_(e.readUint16()/65535,e.readUint16()/65535,e.readUint16()/65535,e.readUint16()/65535),snorm16:e=>e.readInt16()/32767,snorm16x2:e=>K(e.readInt16()/32767,e.readInt16()/32767),snorm16x4:e=>_(e.readInt16()/32767,e.readInt16()/32767,e.readInt16()/32767,e.readInt16()/32767),float16(e){return e.readFloat16()},float16x2:e=>K(e.readFloat16(),e.readFloat16()),float16x4:e=>_(e.readFloat16(),e.readFloat16(),e.readFloat16(),e.readFloat16()),float32:e=>e.readFloat32(),float32x2:e=>K(e.readFloat32(),e.readFloat32()),float32x3:e=>ye(e.readFloat32(),e.readFloat32(),e.readFloat32()),float32x4:e=>_(e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32()),uint32:e=>e.readUint32(),uint32x2:e=>Ee(e.readUint32(),e.readUint32()),uint32x3:e=>le(e.readUint32(),e.readUint32(),e.readUint32()),uint32x4:e=>ee(e.readUint32(),e.readUint32(),e.readUint32(),e.readUint32()),sint32:e=>e.readInt32(),sint32x2:e=>fe(e.readInt32(),e.readInt32()),sint32x3:e=>Pe(e.readInt32(),e.readInt32(),e.readInt32()),sint32x4:e=>J(e.readInt32(),e.readInt32(),e.readInt32(),e.readInt32()),"unorm10-10-10-2"(e){let t=e.readUint32(),r=(t>>22)/1023,n=(t>>12&1023)/1023,i=(t>>2&1023)/1023,s=(t&3)/3;return _(r,n,i,s)},"unorm8x4-bgra"(e){let t=e.readByte()/255,r=e.readByte()/255,n=e.readByte()/255,i=e.readByte()/255;return _(n,r,t,i)},unstruct(e,t){let r={},n=t.propTypes;for(let[i,s]of Object.entries(n))r[i]=Rt(e,s);return r},disarray(e,t){let r=ce(t),n=[];for(let i=0;i<t.elementCount;i++)xe(e,r),n.push(Rt(e,t.elementType));return xe(e,r),n},"loose-decorated"(e,t){xe(e,Ve(t));let r=e.currentByteOffset,n=Rt(e,t.inner);return e.seekTo(r+j(t)),n}};function Rt(e,t){let r=rf[t.type];if(!r)throw new Error(`Cannot read data of type '${t.type}'.`);return r(e,t)}function nf(e,t){let r=j(e);if(r===0||t===void 0||t===null)return[];let n=new ArrayBuffer(r),i=new At(n),s=[];function a(l,c,d,h){if(c!=null){if(_e(l)||ut(l)){let m=wl(l);for(let[f,v]of Object.entries(m)){let x=l.propTypes[f];if(!x)continue;let M=c[f];M!==void 0&&a(x,M,d+v.offset,v.padding??h)}return}if(He(l)||Ut(l)){let m=l,f=Oe(j(m.elementType),ce(m.elementType));if(!Array.isArray(c))throw new Error("Partial value for array must be an array");let v=c??[];v.sort((x,M)=>x.idx-M.idx);for(let{idx:x,value:M}of v)a(m.elementType,M,d+x*f,f-j(m.elementType))}else{let m=j(l);i.seekTo(d),_i(i,l,c),s.push({start:d,end:d+m,padding:h})}}}if(a(e,t,0),s.length===0)return[];let o=[],u=s[0];for(let l=1;l<s.length;l++){let c=s[l];if(!c||!u)throw new Error("Internal error: missing segment");c.start===u.end+(u.padding??0)?(u.end=c.end,u.padding=c.padding):(o.push({data:new Uint8Array(n,u.start,u.end-u.start)}),u=c)}if(!u)throw new Error("Internal error: missing segment");return o.push({data:new Uint8Array(n,u.start,u.end-u.start)}),o}function wi(e){return!!e?.usableAsStorage}var tl=class xl extends Error{constructor(t){super(`Resource '${k(t)??"<unnamed>"}' cannot be bound as 'storage'. Use .$usage('storage') to allow it.`),Object.setPrototypeOf(this,xl.prototype)}};function Tl(e){return!!e.usableAsUniform}var Ml={uniform:"uniform",mutable:"storage, read_write",readonly:"storage, read"},oo=class{constructor(e,t){this.usage=e,this.buffer=t,this[p]={dataType:t.dataType},this[oe]=t}resourceType="buffer-usage";[p];[oe];$name(e){return this.buffer.$name(e),this}[H](e){let t=this.buffer.dataType,r=e.getUniqueName(this),{group:n,binding:i}=e.allocateFixedEntry(this.usage==="uniform"?{uniform:t}:{storage:t,access:this.usage},this.buffer),s=Ml[this.usage];return e.addDeclaration(`@group(${n}) @binding(${i}) var<${s}> ${r}: ${e.resolve(t).value};`),w(r,t)}toString(){return`${this.usage}:${k(this)??"<unnamed>"}`}get[X](){let e=this.buffer.dataType;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.usage}:${k(this)??"<unnamed>"}.$`},it)}get $(){let e=tn(),t=en();if(e.type==="normal")throw new aa(t?`Cannot access ${String(this.buffer)}. TypeGPU functions that depends on GPU resources need to be part of a compute dispatch, draw call or simulation`:".$ and .value are inaccessible during normal JS execution. Try `.read()`");return e.type==="codegen"?this[X]:e.type==="simulate"?(e.buffers.has(this.buffer)||e.buffers.set(this.buffer,mr(this.buffer.dataType,this.buffer.initial)),e.buffers.get(this.buffer)):rr(e,"bufferUsage.ts#TgpuFixedBufferImpl/$")}get value(){return this.$}set $(e){let t=tn(),r=en();if(t.type==="normal")throw new aa(r?`Cannot access ${String(this.buffer)}. TypeGPU functions that depends on GPU resources need to be part of a compute dispatch, draw call or simulation`:".$ and .value are inaccessible during normal JS execution. Try `.write()`");if(t.type==="codegen")throw new Error("Unreachable bufferUsage.ts#TgpuFixedBufferImpl/$");if(t.type==="simulate"){t.buffers.set(this.buffer,e);return}rr(t,"bufferUsage.ts#TgpuFixedBufferImpl/$")}set value(e){this.$=e}},rl=class{constructor(e,t,r){this.usage=e,this.dataType=t,this[p]={dataType:t},this.#e=r,Q(this,r.key)}[p];resourceType="buffer-usage";#e;[H](e){let t=this.dataType,r=e.getUniqueName(this),n=e.allocateLayoutEntry(this.#e.layout),i=Ml[this.usage];return e.addDeclaration(`@group(${n}) @binding(${this.#e.idx}) var<${i}> ${r}: ${e.resolve(t).value};`),w(r,t)}toString(){return`${this.usage}:${k(this)??"<unnamed>"}`}get[X](){let e=this.dataType;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.usage}:${k(this)??"<unnamed>"}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to buffer values is possible only as part of a compute dispatch or draw call. Try .read() or .write() instead")}get value(){return this.$}},nl=new WeakMap;function sf(e){if(!wi(e))throw new Error(`Cannot pass ${e} to asMutable, as it is not allowed to be used as storage. To allow it, call .$usage('storage') when creating the buffer.`);let t=nl.get(e);return t||(t=new oo("mutable",e),nl.set(e,t)),t}var il=new WeakMap;function af(e){if(!wi(e))throw new Error(`Cannot pass ${e} to asReadonly, as it is not allowed to be used as storage. To allow it, call .$usage('storage') when creating the buffer.`);let t=il.get(e);return t||(t=new oo("readonly",e),il.set(e,t)),t}var sl=new WeakMap;function of(e){if(!Tl(e))throw new Error(`Cannot pass ${e} to asUniform, as it is not allowed to be used as a uniform. To allow it, call .$usage('uniform') when creating the buffer.`);let t=sl.get(e);return t||(t=new oo("uniform",e),sl.set(e,t)),t}var uf={uniform:of,mutable:sf,readonly:af};function mi(e,t,r){return _t(t)?new al(e,t,r):new al(e,t,r,["storage","uniform"])}function zn(e){return e.resourceType==="buffer"}var lf=Fa(),al=class{constructor(e,t,r,n){this.dataType=t,this.initialOrBuffer=r,this._disallowedUsages=n,this.#e=e.device,Zn(r)?(this._ownBuffer=!1,this._buffer=r):(this._ownBuffer=!0,this.initial=r)}[p]=!0;resourceType="buffer";flags=GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;#e;_buffer=null;_ownBuffer;_destroyed=!1;_hostBuffer;initial;usableAsUniform=!1;usableAsStorage=!1;usableAsVertex=!1;usableAsIndex=!1;get buffer(){if(this._destroyed)throw new Error("This buffer has been destroyed");return this._buffer||(this._buffer=this.#e.createBuffer({size:j(this.dataType),usage:this.flags,mappedAtCreation:!!this.initial,label:k(this)??"<unnamed>"}),this.initial&&(this._writeToTarget(this._buffer.getMappedRange(),this.initial),this._buffer.unmap())),this._buffer}get destroyed(){return this._destroyed}$name(e){return Q(this,e),this._buffer&&(this._buffer.label=e),this}$usage(...e){for(let t of e){if(this._disallowedUsages?.includes(t))throw new Error(`Buffer of type ${this.dataType.type} cannot be used as ${t}`);this.flags|=t==="uniform"?GPUBufferUsage.UNIFORM:0,this.flags|=t==="storage"?GPUBufferUsage.STORAGE:0,this.flags|=t==="vertex"?GPUBufferUsage.VERTEX:0,this.flags|=t==="index"?GPUBufferUsage.INDEX:0,this.usableAsUniform=this.usableAsUniform||t==="uniform",this.usableAsStorage=this.usableAsStorage||t==="storage",this.usableAsVertex=this.usableAsVertex||t==="vertex",this.usableAsIndex=this.usableAsIndex||t==="index"}return this}$addFlags(e){if(!this._ownBuffer)throw new Error("Cannot add flags to a buffer that is not managed by TypeGPU.");return e&GPUBufferUsage.MAP_READ?(this.flags=GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,this):e&GPUBufferUsage.MAP_WRITE?(this.flags=GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE,this):(this.flags|=e,this)}compileWriter(){el(this.dataType)}_writeToTarget(e,t){let r=el(this.dataType);if(r)try{r(new DataView(e),0,t,lf==="little");return}catch(n){console.error(`Error when using compiled writer for buffer ${k(this)??"<unnamed>"} - this is likely a bug, please submit an issue at https://github.com/software-mansion/TypeGPU/issues
Using fallback writer instead.`,n)}_i(new At(e),this.dataType,t)}write(e){let t=this.buffer;if(t.mapState==="mapped"){let n=t.getMappedRange();this._writeToTarget(n,e);return}let r=j(this.dataType);this._hostBuffer||(this._hostBuffer=new ArrayBuffer(r)),this._writeToTarget(this._hostBuffer,e),this.#e.queue.writeBuffer(t,0,this._hostBuffer,0,r)}writePartial(e){let t=this.buffer,r=nf(this.dataType,e);if(t.mapState==="mapped"){let n=t.getMappedRange(),i=new Uint8Array(n);for(let s of r)i.set(s.data,s.data.byteOffset)}else for(let n of r)this.#e.queue.writeBuffer(t,n.data.byteOffset,n.data,0,n.data.byteLength)}clear(){let e=this.buffer;if(e.mapState==="mapped"){new Uint8Array(e.getMappedRange()).fill(0);return}let t=this.#e.createCommandEncoder();t.clearBuffer(e),this.#e.queue.submit([t.finish()])}copyFrom(e){if(this.buffer.mapState==="mapped")throw new Error("Cannot copy to a mapped buffer.");let t=j(this.dataType),r=this.#e.createCommandEncoder();r.copyBufferToBuffer(e.buffer,0,this.buffer,0,t),this.#e.queue.submit([r.finish()])}async read(){let e=this.buffer;if(e.mapState==="mapped"){let i=e.getMappedRange();return Rt(new zt(i),this.dataType)}if(e.usage&GPUBufferUsage.MAP_READ){await e.mapAsync(GPUMapMode.READ);let i=e.getMappedRange(),s=Rt(new zt(i),this.dataType);return e.unmap(),s}let t=this.#e.createBuffer({size:j(this.dataType),usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),r=this.#e.createCommandEncoder();r.copyBufferToBuffer(e,0,t,0,j(this.dataType)),this.#e.queue.submit([r.finish()]),await t.mapAsync(GPUMapMode.READ,0,j(this.dataType));let n=Rt(new zt(t.getMappedRange()),this.dataType);return t.unmap(),t.destroy(),n}as(e){return uf[e]?.(this)}destroy(){this._destroyed||(this._destroyed=!0,this._ownBuffer&&this._buffer?.destroy())}toString(){return`buffer:${k(this)??"<unnamed>"}`}};function cf(e,t){return new Al(Ia(),e,t)}function df(e,t){return new Al(Ha(),e,t)}function Sl(e){let t=e;return t?.resourceType==="sampler"&&!!t[p]}function zl(e){let t=e;return t?.resourceType==="sampler-comparison"&&!!t[p]}var pf=class{constructor(e,t){this.schema=e,this.#e=t,this.resourceType=e.type==="sampler_comparison"?"sampler-comparison":"sampler",Q(this,t.key)}[p]={unwrap:void 0};resourceType;#e;[H](e){let t=e.getUniqueName(this),r=e.allocateLayoutEntry(this.#e.layout);return e.addDeclaration(`@group(${r}) @binding(${this.#e.idx}) var ${t}: ${e.resolve(this.schema).value};`),w(t,this.schema)}get[X](){let e=this.schema;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.toString()}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to sampler values is possible only as part of a compute dispatch or draw call.")}get value(){return this.$}toString(){return`${this.resourceType}:${k(this)??"<unnamed>"}`}},Al=class{constructor(e,t,r){this.schema=e,this.#r=t,this.#n=r,this.resourceType=e.type==="sampler_comparison"?"sampler-comparison":"sampler",this[p]={unwrap:()=>(this.#t||(this.#t=this.#n.device.createSampler({...this.#r,label:k(this)??"<unnamed>"})),this.#t)},this.#e=t.minFilter==="linear"||t.magFilter==="linear"||t.mipmapFilter==="linear"}[p];resourceType;#e;#t=null;#r;#n;[H](e){let t=e.getUniqueName(this),{group:r,binding:n}=e.allocateFixedEntry(this.schema.type==="sampler_comparison"?{sampler:"comparison"}:{sampler:this.#e?"filtering":"non-filtering"},this);return e.addDeclaration(`@group(${r}) @binding(${n}) var ${t}: ${e.resolve(this.schema).value};`),w(t,this.schema)}get[X](){let e=this.schema;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.toString()}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to sampler values is possible only as part of a compute dispatch or draw call.")}get value(){return this.$}$name(e){return Q(this,e),this}toString(){return`${this.resourceType}:${k(this)??"<unnamed>"}`}},hf=class{constructor(e,t){this.schema=e,this.#e=t,Q(this,t.key)}resourceType="external-texture";[p]=!0;#e;[H](e){let t=e.getUniqueName(this),r=e.allocateLayoutEntry(this.#e.layout);return e.addDeclaration(`@group(${r}) @binding(${this.#e.idx}) var ${t}: ${e.resolve(this.schema).value};`),w(t,Eu())}get[X](){let e=this.schema;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`textureExternal:${k(this)??"<unnamed>"}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to texture views values is possible only as part of a compute dispatch or draw call. Try .read() or .write() instead")}get value(){return this.$}toString(){return`textureExternal:${k(this)??"<unnamed>"}`}};function eo(e){let{videoWidth:t,videoHeight:r}=e;if(t&&r)return{width:t,height:r};let{naturalWidth:n,naturalHeight:i}=e;if(n&&i)return{width:n,height:i};let{codedWidth:s,codedHeight:a}=e;if(s&&a)return{width:s,height:a};let{width:o,height:u}=e||HTMLCanvasElement||OffscreenCanvas||HTMLImageElement||ImageData;if(!o||!u)throw new Error("Cannot determine dimensions of the provided image source.");return{width:o,height:u}}var to=new WeakMap;function Pl(e){let t=to.get(e);return t||(t=new Map,to.set(e,t)),t}function mf(e){let t=to.get(e);t&&t.clear()}function ff(e,t,r=0,n){if(t.dimension!=="2d")throw new Error("Cannot generate mipmaps for non-2D textures: only 2D textures are currently supported.");let i=n??t.mipLevelCount-r,s=Wa(t.format,e);if(![...s.sampleTypes].some(a=>a==="float"||a==="unfilterable-float"))throw new Error(`Cannot generate mipmaps for format '${t.format}': only float and unfilterable-float formats are currently supported.`);if(!s.canRenderAttachment)throw new Error(`Cannot generate mipmaps for format '${t.format}': format does not support render attachments.`);for(let a=0;a<t.depthOrArrayLayers;a++)for(let o=r;o<r+i-1;o++){let u=o,l=o+1;bf(e,t,u,l,a)}}function gf(e,t,r,n){if(t.dimension==="3d")throw new Error("Cannot resample to 3D textures: only 2D textures are currently supported.");let i=Hr[t.format];if(![...i.sampleTypes].some(s=>s==="float"||s==="unfilterable-float"))throw new Error(`Cannot resample to format '${t.format}': only float and unfilterable-float formats are currently supported.`);if(!i.canRenderAttachment)throw new Error(`Cannot resample to format '${t.format}': format does not support render attachments.`);return yf(e,t,r,n)}function yf(e,t,r,n=0){let i=[...Hr[t.format].sampleTypes].includes("float"),s=`${i?"filterable":"unfilterable"}`,a=Pl(e),o=a.get(s);if(!o){let x=e.createShaderModule({code:`
struct VertexOutput {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  let pos = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
  let uv = array<vec2f, 3>(vec2f(0, 1), vec2f(2, 1), vec2f(0, -1));

  var output: VertexOutput;
  output.pos = vec4f(pos[vertexIndex], 0, 1);
  output.uv = uv[vertexIndex];
  return output;
}
      `}),M=e.createSampler({magFilter:i?"linear":"nearest",minFilter:i?"linear":"nearest"}),U=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:i?"filtering":"non-filtering"}}]}),$=e.createPipelineLayout({bindGroupLayouts:[U]}),I=e.createShaderModule({code:`
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  ${i?"return textureSample(inputTexture, inputSampler, uv);":`let texelCoord = vec2u(uv * vec2f(textureDimensions(inputTexture)));
        return textureLoad(inputTexture, texelCoord, 0);`}
}
      `});o={vertexShader:x,fragmentShader:I,bindGroupLayout:U,pipelineLayout:$,sampler:M},a.set(s,o)}let u=e.createTexture({size:[...Object.values(eo(r))],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST}),{width:l,height:c}=eo(r);e.queue.copyExternalImageToTexture({source:r},{texture:u},[l,c,1]);let d=e.createTexture({size:[t.width,t.height,1],format:t.format,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}),h=e.createRenderPipeline({layout:o.pipelineLayout,vertex:{module:o.vertexShader},fragment:{module:o.fragmentShader,targets:[{format:t.format}]},primitive:{topology:"triangle-list"}}),m=e.createBindGroup({layout:o.bindGroupLayout,entries:[{binding:0,resource:u.createView()},{binding:1,resource:o.sampler}]}),f=e.createCommandEncoder(),v=f.beginRenderPass({colorAttachments:[{view:d.createView(),loadOp:"clear",storeOp:"store"}]});v.setPipeline(h),v.setBindGroup(0,m),v.draw(3),v.end(),f.copyTextureToTexture({texture:d},{texture:t,origin:{x:0,y:0,z:n}},{width:t.width,height:t.height,depthOrArrayLayers:1}),e.queue.submit([f.finish()]),u.destroy(),d.destroy()}function bf(e,t,r,n,i){let s=[...Wa(t.format,e).sampleTypes].includes("float"),a=`${s?"filterable":"unfilterable"}`,o=Pl(e),u=o.get(a);if(!u){let v=e.createShaderModule({code:`
struct VertexOutput {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  let pos = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
  let uv = array<vec2f, 3>(vec2f(0, 1), vec2f(2, 1), vec2f(0, -1));

  var output: VertexOutput;
  output.pos = vec4f(pos[vertexIndex], 0, 1);
  output.uv = uv[vertexIndex];
  return output;
}
      `}),x=e.createShaderModule({code:`
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  return textureSample(inputTexture, inputSampler, uv);
}
      `}),M=e.createSampler({magFilter:s?"linear":"nearest",minFilter:s?"linear":"nearest"}),U=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:s?"float":"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:s?"filtering":"non-filtering"}}]}),$=e.createPipelineLayout({bindGroupLayouts:[U]});u={vertexShader:v,fragmentShader:x,bindGroupLayout:U,pipelineLayout:$,sampler:M},o.set(a,u)}let l=e.createRenderPipeline({layout:u.pipelineLayout,vertex:{module:u.vertexShader},fragment:{module:u.fragmentShader,targets:[{format:t.format}]},primitive:{topology:"triangle-list"}}),c=t.createView({baseMipLevel:r,dimension:"2d",mipLevelCount:1,...i!==void 0&&{baseArrayLayer:i,arrayLayerCount:1}}),d=t.createView({baseMipLevel:n,dimension:"2d",mipLevelCount:1,...i!==void 0&&{baseArrayLayer:i,arrayLayerCount:1}}),h=e.createBindGroup({layout:u.bindGroupLayout,entries:[{binding:0,resource:c},{binding:1,resource:u.sampler}]}),m=e.createCommandEncoder(),f=m.beginRenderPass({colorAttachments:[{view:d,loadOp:"clear",storeOp:"store"}]});f.setPipeline(l),f.setBindGroup(0,h),f.draw(3),f.end(),e.queue.submit([m.finish()])}function vf(e){return{dimension:e.dimension??"2d",sampleType:Hr[e.format].channelType,multisampled:(e.sampleCount??1)!==1}}function _f(e){return e==="depth24plus-stencil8"||e==="depth32float-stencil8"?["depth","stencil"]:e==="depth16unorm"||e==="depth24plus"||e==="depth32float"?["depth"]:e==="stencil8"?["stencil"]:["color"]}function wf(e,t){return new xf(e,t)}function An(e){return e?.resourceType==="texture"&&!!e[p]}function xi(e){return e?.resourceType==="texture-view"&&!!e[p]}var xf=class{constructor(e,t){this.props=e;let r=e.format;this.#s=t,this.#e=Hr[r],this.#t=e.size[0]*(e.size[1]??1)*(e.size[2]??1)*this.#e.texelSize,this.aspects=_f(r),this[p]={unwrap:()=>{if(this.#r)throw new Error("This texture has been destroyed");return this.#i||(this.#i=t.device.createTexture({label:k(this)??"<unnamed>",format:e.format,size:e.size,usage:this.#n,dimension:e.dimension??"2d",viewFormats:e.viewFormats??[],mipLevelCount:e.mipLevelCount??1,sampleCount:e.sampleCount??1})),this.#i}}}[p];resourceType="texture";aspects;usableAsSampled=!1;usableAsStorage=!1;usableAsRender=!1;#e;#t;#r=!1;#n=GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC;#i=null;#s;$name(e){return Q(this,e),this}$usage(...e){let t=e.includes("storage"),r=e.includes("sampled"),n=e.includes("render");return this.#n|=r?GPUTextureUsage.TEXTURE_BINDING:0,this.#n|=t?GPUTextureUsage.STORAGE_BINDING:0,this.#n|=n?GPUTextureUsage.RENDER_ATTACHMENT:0,this.usableAsStorage||=t,this.usableAsSampled||=r,this.usableAsRender||=n,this}createView(e,t){return new Tf(e??oi(vf(this.props)),this,t)}#a(e=0){let t=2**e,[r,n,i]=[Math.max(1,Math.floor((this.props.size[0]??1)/t)),Math.max(1,Math.floor((this.props.size[1]??1)/t)),Math.max(1,Math.floor((this.props.size[2]??1)/t))];this.#s.device.queue.writeTexture({texture:this[p].unwrap(),mipLevel:e},new Uint8Array(r*n*i*this.#e.texelSize),{bytesPerRow:this.#e.texelSize*r,rowsPerImage:n},[r,n,i])}clear(e="all"){if(e==="all"){let t=this.props.mipLevelCount??1;for(let r=0;r<t;r++)this.#a(r)}else this.#a(e)}generateMipmaps(e=0,t){if(this.usableAsRender===!1)throw new Error("generateMipmaps called without specifying 'render' usage. Add it via the $usage('render') method.");let r=t??(this.props.mipLevelCount??1)-e;if(r<=1){console.warn(`generateMipmaps is a no-op: would generate ${r} mip levels (base: ${e}, total: ${this.props.mipLevelCount??1})`);return}if(e>=(this.props.mipLevelCount??1))throw new Error(`Base mip level ${e} is out of range. Texture has ${this.props.mipLevelCount??1} mip levels.`);ff(this.#s.device,this[p].unwrap(),e,r)}write(e,t=0){if(e instanceof ArrayBuffer||ArrayBuffer.isView(e)){this.#u(e,t);return}let r=this.props.dimension??"2d";if(!Array.isArray(e)){this.#o(e,r==="3d"?0:void 0);return}let n=this.props.size[2]??1;e.length>n&&console.warn(`Too many image sources provided. Expected ${n} layers, got ${e.length}. Extra sources will be ignored.`);for(let i=0;i<Math.min(e.length,n);i++){let s=e[i];s&&this.#o(s,i)}}#u(e,t){let r=Math.max(1,this.props.size[0]>>t),n=Math.max(1,(this.props.size[1]??1)>>t),i=Math.max(1,(this.props.size[2]??1)>>t),s=r*n*i*this.#e.texelSize,a=e.byteLength??e.byteLength;if(a!==s)throw new Error(`Buffer size mismatch. Expected ${s} bytes for mip level ${t}, got ${a} bytes.`);this.#s.device.queue.writeTexture({texture:this[p].unwrap(),mipLevel:t},e,{bytesPerRow:this.#e.texelSize*r,rowsPerImage:n},[r,n,i])}#o(e,t){let r=this.props.size[0],n=this.props.size[1]??1,{width:i,height:s}=eo(e);if(i!==r||s!==n){gf(this.#s.device,this[p].unwrap(),e,t);return}this.#s.device.queue.copyExternalImageToTexture({source:e},{texture:this[p].unwrap(),...t!==void 0&&{origin:{x:0,y:0,z:t}}},t!==void 0?[r,n,1]:this.props.size)}copyFrom(e){if(e.props.format!==this.props.format)throw new Error(`Texture format mismatch. Source texture has format ${e.props.format}, target texture has format ${this.props.format}`);if(e.props.size[0]!==this.props.size[0]||(e.props.size[1]??1)!==(this.props.size[1]??1)||(e.props.size[2]??1)!==(this.props.size[2]??1))throw new Error(`Texture size mismatch. Source texture has size ${e.props.size.join("x")}, target texture has size ${this.props.size.join("x")}`);let t=this.#s.device.createCommandEncoder();t.copyTextureToTexture({texture:e[p].unwrap()},{texture:this[p].unwrap()},e.props.size),this.#s.device.queue.submit([t.finish()])}get destroyed(){return this.#r}destroy(){this.#r||(this.#r=!0,this.#i?.destroy())}},Tf=class{constructor(e,t,r){this.schema=e,this.#e=t,this.#r=r,this[p]={unwrap:()=>{if(!this.#t){let n=this.schema,i;li(n)?i={label:k(this)??"<unnamed>",format:this.#r?.format??n.format,dimension:n.dimension}:i={label:k(this)??"<unnamed>",format:this.#r?.format??this.#e.props.format,dimension:n.dimension},this.#r?.mipLevelCount!==void 0&&(i.mipLevelCount=this.#r.mipLevelCount),this.#r?.arrayLayerCount!==void 0&&(i.arrayLayerCount=this.#r.arrayLayerCount),this.#t=this.#e[p].unwrap().createView(i)}return this.#t}}}[p];resourceType="texture-view";#e;#t;#r;$name(e){return Q(this,e),this.#t&&(this.#t.label=e),this}get[X](){let e=this.schema;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.toString()}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to texture view values is possible only as part of a compute dispatch or draw call. Try .read() or .write() instead")}get value(){return this.$}toString(){return`textureView:${k(this)??"<unnamed>"}`}[H](e){let t=e.getUniqueName(this),{group:r,binding:n}=e.allocateFixedEntry(li(this.schema)?{storageTexture:this.schema}:{texture:this.schema,sampleType:this.#r?.sampleType??this.schema.bindingSampleType[0]},this);return e.addDeclaration(`@group(${r}) @binding(${n}) var ${t}: ${e.resolve(this.schema).value};`),w(t,this.schema)}},ol=class{constructor(e,t){this.schema=e,this.#e=t,Q(this,t.key)}[p]={unwrap:void 0};resourceType="texture-view";#e;toString(){return`textureView:${k(this)??"<unnamed>"}`}[H](e){let t=e.getUniqueName(this),r=e.allocateLayoutEntry(this.#e.layout);return e.addDeclaration(`@group(${r}) @binding(${this.#e.idx}) var ${t}: ${e.resolve(this.schema).value};`),w(t,this.schema)}get[X](){let e=this.schema;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`${this.toString()}.$`},it)}get $(){if(Xe())return this[X];throw new Error("Direct access to texture views values is possible only as part of a compute dispatch or draw call. Try .read() or .write() instead")}get value(){return this.$}};function Mf(e){return!!e?.usableAsSampled}var Sf=class El extends Error{constructor(t){super(`Resource '${k(t)??"<unnamed>"}' cannot be bound as 'sampled'. Use .$usage('sampled') to allow it.`),Object.setPrototypeOf(this,El.prototype)}};function zf(e){let t={};for(let[r,n]of Object.entries(e)){if(n===null){t[r]=null;continue}if("texture"in n&&typeof n.texture=="string"){let i=n.texture;t[r]={...n,texture:oi({dimension:n.viewDimension??"2d",sampleType:i==="sint"?W:i==="uint"?A:g,multisampled:n.multisampled??!1})}}else if("storageTexture"in n&&typeof n.storageTexture=="string"){let i={readonly:"read-only",writeonly:"write-only",mutable:"read-write"};t[r]={...n,storageTexture:oi({access:i[n.access??"writeonly"],format:n.storageTexture,dimension:n.viewDimension??"2d"})}}else"externalTexture"in n&&Object.keys(n.externalTexture).length===0?t[r]={...n,externalTexture:{type:"texture_external",dimension:"2d"}}:t[r]=n}return t}function Rl(e){let t=zf(e);return new Pf(t)}function kl(e){return!!e&&e.resourceType==="bind-group-layout"}function Ti(e){return!!e&&e.resourceType==="bind-group"}var Af=class Bl extends Error{constructor(t,r){super(`Bind group '${t??"<unnamed>"}' is missing a required binding '${r}'`),Object.setPrototypeOf(this,Bl.prototype)}},ul=["compute","fragment"],Mn=["compute","vertex","fragment"],Pf=class{constructor(e){this.entries=e;let t=0;for(let[r,n]of Object.entries(e)){if(n===null){t++;continue}let i={layout:this,key:r,idx:t};if("uniform"in n&&(this.bound[r]=new rl("uniform",n.uniform,i)),"storage"in n){let s="type"in n.storage?n.storage:n.storage(0);this.bound[r]=new rl(n.access??"readonly",s,i)}"texture"in n&&(this.bound[r]=new ol(n.texture,i)),"storageTexture"in n&&(this.bound[r]=new ol(n.storageTexture,i)),"externalTexture"in n&&(this.bound[r]=new hf(n.externalTexture,i)),"sampler"in n&&(this.bound[r]=new pf(n.sampler==="comparison"?Ha():Ia(),i)),Object.defineProperty(this.value,r,{get:()=>this.bound[r].value}),t++}}[p]=!0;_index;resourceType="bind-group-layout";bound={};value={};$=this.value;get[X](){return this.$}toString(){return`bindGroupLayout:${k(this)??"<unnamed>"}`}get index(){return this._index}$name(e){return Q(this,e),this}$idx(e){return this._index=e,this}unwrap(e){return e.device.createBindGroupLayout({label:k(this)??"<unnamed>",entries:Object.values(this.entries).map((t,r)=>{if(t===null)return null;let n=t.visibility,i={binding:r,visibility:0};if("uniform"in t)n=n??Mn,i.buffer={type:"uniform"};else if("storage"in t)n=n??(t.access==="mutable"?ul:Mn),i.buffer={type:t.access==="mutable"?"storage":"read-only-storage"};else if("sampler"in t)n=n??Mn,i.sampler={type:t.sampler};else if("texture"in t){n=n??Mn;let{multisampled:s,dimension:a,bindingSampleType:o}=t.texture;i.texture={sampleType:t.sampleType??o[0],viewDimension:a,multisampled:s}}else if("storageTexture"in t){n=n??ul;let{dimension:s,access:a,format:o}=t.storageTexture;i.storageTexture={access:a,format:o,viewDimension:s}}else"externalTexture"in t&&(n=n??Mn,i.externalTexture={});return n?.includes("compute")&&(i.visibility|=GPUShaderStage.COMPUTE),n?.includes("vertex")&&(i.visibility|=GPUShaderStage.VERTEX),n?.includes("fragment")&&(i.visibility|=GPUShaderStage.FRAGMENT),i}).filter(t=>t!==null)})}},$l=class{constructor(e,t){this.layout=e,this.entries=t;for(let r of Object.keys(e.entries))if(e.entries[r]!==null&&!(r in t))throw new Af(k(e),r)}resourceType="bind-group";unwrap(e){return e.device.createBindGroup({label:k(this.layout)??"<unnamed>",layout:e.unwrap(this.layout),entries:Object.entries(this.layout.entries).map(([t,r],n)=>{if(r===null)return null;let i=this.entries[t];if(i===void 0)throw new Error(`'${t}' is a resource required to populate bind group layout '${k(this.layout)??"<unnamed>"}'.`);if("uniform"in r){let s;if(zn(i)){if(!Tl(i))throw new $o(i);s={buffer:e.unwrap(i)}}else s={buffer:i};return{binding:n,resource:s}}if("storage"in r){let s;if(zn(i)){if(!wi(i))throw new tl(i);s={buffer:e.unwrap(i)}}else s={buffer:i};return{binding:n,resource:s}}if("texture"in r){let s;if(An(i)){if(!Mf(i))throw new Sf(i);s=e.unwrap(i.createView(r.texture))}else xi(i)?s=e.unwrap(i):s=i;return{binding:n,resource:s}}if("storageTexture"in r){let s;if(An(i)){if(!wi(i))throw new tl(i);s=e.unwrap(i.createView(r.storageTexture))}else xi(i)?s=e.unwrap(i):s=i;return{binding:n,resource:s}}if("sampler"in r)return zl(i)||Sl(i)?{binding:n,resource:e.unwrap(i)}:{binding:n,resource:i};if("externalTexture"in r)return{binding:n,resource:i};throw new Error(`Malformed bind group entry: ${nr(i)}`)}).filter(t=>t!==null)})}};function Mi(e){return new Ef(e)}var Ef=class{constructor(e=void 0){this.defaultValue=e}[p]=!0;resourceType="slot";$name(e){return Q(this,e),this}areEqual(e,t){return Object.is(e,t)}toString(){return`slot:${k(this)??"<unnamed>"}`}get[X](){let e=jt();if(!e)throw new Error("Cannot access tgpu.slot's value outside of resolution.");return _n(e.unwrap(this))}get value(){return this[X]}get $(){return this.value}};function Si(e,t){return new Dl("private",e,t)}function ll(e){return new Dl("workgroup",e)}var Dl=class{[p]={};#e;#t;#r;constructor(e,t,r){this.#e=e,this.#t=t,this.#r=r}[H](e){let t=e.getUniqueName(this),r=`var<${this.#e}> ${t}: ${e.resolve(this.#t).value}`;return this.#r?e.addDeclaration(`${r} = ${e.resolve(this.#r,this.#t).value};`):e.addDeclaration(`${r};`),w(t,this.#t)}$name(e){return Q(this,e),this}toString(){return`var:${k(this)??"<unnamed>"}`}get[X](){let e=this.#t;return new Proxy({[p]:!0,get[Re](){return w(this,e)},[H]:t=>t.resolve(this),toString:()=>`var:${k(this)??"<unnamed>"}.$`},it)}get $(){let e=tn(),t=en();if(e.type==="normal")throw new sa(t?`Cannot access variable '${k(this)??"<unnamed>"}'. TypeGPU functions that depends on GPU resources need to be part of a compute dispatch, draw call or simulation`:"TypeGPU variables are inaccessible during normal JS execution. If you wanted to simulate GPU behavior, try `tgpu.simulate()`");return e.type==="codegen"?this[X]:e.type==="simulate"?(e.vars[this.#e].has(this)||e.vars[this.#e].set(this,this.#r),e.vars[this.#e].get(this)):rr(e,"tgpuVariable.ts#TgpuVarImpl/$")}set $(e){let t=tn(),r=en();if(t.type==="normal")throw new sa(r?`Cannot access ${String(this)}. TypeGPU functions that depends on GPU resources need to be part of a compute dispatch, draw call or simulation`:"TypeGPU variables are inaccessible during normal JS execution. If you wanted to simulate GPU behavior, try `tgpu.simulate()`");if(t.type==="codegen")throw new Error("Unreachable tgpuVariable.ts#TgpuVarImpl/$");if(t.type==="simulate"){t.vars[this.#e].set(this,e);return}rr(t,"tgpuVariable.ts#TgpuVarImpl/$")}get value(){return this.$}set value(e){this.$=e}},Ul=Si(A,0).$name("dataBlockIndex"),Ol=Si(A,0).$name("dataByteIndex"),Il=Mi().$name("dataBuffer"),Rf=Z([],A)`() {
  let i = dataByteIndex;
  dataByteIndex = dataByteIndex + 1u;
  return i;
}`.$uses({dataByteIndex:Ol}).$name("nextByteIndex"),R="dataBuffer[dataBlockIndex].serializedData[nextByteIndex()]",Hl={f32:Z([g])`(n) => {
  ${R} = bitcast<u32>(n);
}`,f16:Z([de])`(n) => {
  ${R} = pack2x16float(vec2f(f32(n), 0.0));
}`,i32:Z([W])`(n) => {
  ${R} = bitcast<u32>(n);
}`,u32:Z([A])`(n) => {
  ${R} = n;
}`,bool:Z([te])`(b) => {
  ${R} = u32(b);
}`,vec2f:Z([K])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
}`,vec3f:Z([ye])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
  ${R} = bitcast<u32>(v.z);
}`,vec4f:Z([_])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
  ${R} = bitcast<u32>(v.z);
  ${R} = bitcast<u32>(v.w);
}`,vec2h:Z([Fe])`(v) => {
  ${R} = pack2x16float(vec2f(f32(v.x), f32(v.y)));
}`,vec3h:Z([Ge])`(v) => {
  ${R} = pack2x16float(vec2f(f32(v.x), f32(v.y)));
  ${R} = pack2x16float(vec2f(f32(v.z), 0.0));
}`,vec4h:Z([Ne])`(v) => {
  ${R} = pack2x16float(vec2f(f32(v.x), f32(v.y)));
  ${R} = pack2x16float(vec2f(f32(v.z), f32(v.w)));
}`,vec2i:Z([fe])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
}`,vec3i:Z([Pe])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
  ${R} = bitcast<u32>(v.z);
}`,vec4i:Z([J])`(v) => {
  ${R} = bitcast<u32>(v.x);
  ${R} = bitcast<u32>(v.y);
  ${R} = bitcast<u32>(v.z);
  ${R} = bitcast<u32>(v.w);
}`,vec2u:Z([Ee])`(v) => {
  ${R} = v.x;
  ${R} = v.y;
}`,vec3u:Z([le])`(v) => {
  ${R} = v.x;
  ${R} = v.y;
  ${R} = v.z;
}`,vec4u:Z([ee])`(v) => {
  ${R} = v.x;
  ${R} = v.y;
  ${R} = v.z;
  ${R} = v.w;
}`,"vec2<bool>":Z([ct])`(v) => {
  ${R} = u32(v.x);
  ${R} = u32(v.y);
}`,"vec3<bool>":Z([dt])`(v) => {
  ${R} = u32(v.x);
  ${R} = u32(v.y);
  ${R} = u32(v.z);
}`,"vec4<bool>":Z([pt])`(v) => {
  ${R} = u32(v.x);
  ${R} = u32(v.y);
  ${R} = u32(v.z);
  ${R} = u32(v.w);
}`,mat2x2f:Z([gt])`(m) => {
  ${R} = bitcast<u32>(m[0][0]);
  ${R} = bitcast<u32>(m[0][1]);
  ${R} = bitcast<u32>(m[1][0]);
  ${R} = bitcast<u32>(m[1][1]);
}`,mat3x3f:Z([yt])`(m) => {
  ${R} = bitcast<u32>(m[0][0]);
  ${R} = bitcast<u32>(m[0][1]);
  ${R} = bitcast<u32>(m[0][2]);
  ${R} = 0u;
  ${R} = bitcast<u32>(m[1][0]);
  ${R} = bitcast<u32>(m[1][1]);
  ${R} = bitcast<u32>(m[1][2]);
  ${R} = 0u;
  ${R} = bitcast<u32>(m[2][0]);
  ${R} = bitcast<u32>(m[2][1]);
  ${R} = bitcast<u32>(m[2][2]);
  ${R} = 0u;
}`,mat4x4f:Z([be])`(m) => {
  ${R} = bitcast<u32>(m[0][0]);
  ${R} = bitcast<u32>(m[0][1]);
  ${R} = bitcast<u32>(m[0][2]);
  ${R} = bitcast<u32>(m[0][3]);
  ${R} = bitcast<u32>(m[1][0]);
  ${R} = bitcast<u32>(m[1][1]);
  ${R} = bitcast<u32>(m[1][2]);
  ${R} = bitcast<u32>(m[1][3]);
  ${R} = bitcast<u32>(m[2][0]);
  ${R} = bitcast<u32>(m[2][1]);
  ${R} = bitcast<u32>(m[2][2]);
  ${R} = bitcast<u32>(m[2][3]);
  ${R} = bitcast<u32>(m[3][0]);
  ${R} = bitcast<u32>(m[3][1]);
  ${R} = bitcast<u32>(m[3][2]);
  ${R} = bitcast<u32>(m[3][3]);
}`};for(let[e,t]of Object.entries(Hl))t.$name(`serialize${e[0].toLocaleUpperCase()}${e.slice(1)}`).$uses({dataBlockIndex:Ul,nextByteIndex:Rf,dataBuffer:Il});function Cl(e){return`(${e.map((t,r)=>`_arg_${r}`).join(", ")})`}function Ll(e,t){let r=Hl[e.type];if(r)return r.with(Il,t);if(_e(e)){let n=Object.keys(e.propTypes),i=Object.values(e.propTypes),s=Vl(i,t);return Z([e])`(arg) {\n  propsSerializer(${n.map(a=>`arg.${a}`).join(", ")});\n}`.$uses({propsSerializer:s}).$name(`${k(e)??"struct"}Serializer`)}if(He(e)){let n=e.elementType,i=e.elementCount,s=Ll(n,t);return Z([e])`(arg) {\n${Array.from({length:i},(a,o)=>`  elementSerializer(arg[${o}]);`).join(`
`)}\n}`.$uses({elementSerializer:s}).$name("arraySerializer")}throw new Error(`Cannot serialize data of type ${e.type}`)}function Vl(e,t){let r={},n=Z(e),i=Cl(e),s=e.map((a,o)=>(r[`serializer${o}`]=Ll(a,t),`  serializer${o}(_arg_${o});`)).join(`
`);return n`${i} {\n${s}\n}`.$uses(r).$name("compoundSerializer")}function kf(e,t,r,n,i){let s=t.map(j).reduce((u,l)=>u+l,0);if(s>i.logSizeLimit)throw new Error(`Logged data needs to fit in ${i.logSizeLimit} bytes (one of the logs requires ${s} bytes). Consider increasing the limit by passing appropriate options to tgpu.init().`);let a=Vl(t,r).$name(`log${e}serializer`),o=Cl(t);return Z(t)`${o} {
  dataBlockIndex = atomicAdd(&indexBuffer, 1);
  if (dataBlockIndex >= ${i.logCountLimit}) {
    return;
  }
  dataBuffer[dataBlockIndex].id = ${e};
  dataByteIndex = 0;

  compoundSerializer${o};
}`.$uses({indexBuffer:n,dataBuffer:r,dataBlockIndex:Ul,dataByteIndex:Ol,compoundSerializer:a}).$name(`log${e}`)}var Bf=["log","debug","info","warn","error","clear"],$f={logCountLimit:64,logSizeLimit:252,messagePrefix:" GPU "},Fl=w("/* console.log() */",Se),Df=class{get logResources(){}generateLog(){return console.warn("'console.log' is currently only supported in compute pipelines."),Fl}},Uf=class{#e;#t;#r=1;#n;#i;constructor(e){this.#e={...$f,...e[p].logOptions},this.#t=new Map;let t=je({id:A,serializedData:Ze(A,Math.ceil(this.#e.logSizeLimit/4))}).$name("SerializedLogData");this.#i=e.createMutable(Ze(t,this.#e.logCountLimit)).$name("dataBuffer"),this.#n=e.createMutable(ku(A)).$name("indexBuffer")}generateLog(e,t,r){if(!Bf.includes(t))return console.warn(`Unsupported log method '${t}' was used in TGSL.`),Fl;let n=zu(r),i=this.#r++,s=n.filter(u=>u.dataType!==ze),a=kf(i,s.map(u=>u.dataType),this.#i,this.#n,this.#e),o=n.map(u=>u.dataType===ze?u.value:u.dataType);return this.#t.set(i,{op:t,argTypes:o}),w(y`${e.resolve(a).value}(${s})`,Se)}get logResources(){return this.#r===1?void 0:{dataBuffer:this.#i,indexBuffer:this.#n,options:this.#e,logIdToMeta:this.#t}}},Gl="#CATCHALL#",Of=class{_stack=[];_itemDepth=0;get itemDepth(){return this._itemDepth}get topItem(){let e=this._stack[this._stack.length-1];if(!e||e.type!=="item")throw new Error("Internal error, expected item layer to be on top.");return e}get topFunctionScope(){return this._stack.findLast(e=>e.type==="functionScope")}pushItem(){this._itemDepth++,this._stack.push({type:"item",usedSlots:new Set})}popItem(){this.pop("item")}pushSlotBindings(e){this._stack.push({type:"slotBinding",bindingMap:new WeakMap(e)})}popSlotBindings(){this.pop("slotBinding")}pushFunctionScope(e,t,r,n){let i={type:"functionScope",args:e,argAliases:t,returnType:r,externalMap:n,reportedReturnTypes:new Set};return this._stack.push(i),i}popFunctionScope(){this.pop("functionScope")}pushBlockScope(){this._stack.push({type:"blockScope",declarations:new Map})}popBlockScope(){this.pop("blockScope")}pop(e){let t=this._stack[this._stack.length-1];if(!t||e&&t.type!==e)throw new Error(`Internal error, expected a ${e} layer to be on top.`);this._stack.pop(),e==="item"&&this._itemDepth--}readSlot(e){for(let t=this._stack.length-1;t>=0;--t){let r=this._stack[t];if(r?.type==="item")r.usedSlots.add(e);else if(r?.type==="slotBinding"){let n=r.bindingMap.get(e);if(n!==void 0)return n}else if(!(r?.type==="functionScope"||r?.type==="blockScope"))throw new Error("Unknown layer type.")}return e.defaultValue}getSnippetById(e){for(let t=this._stack.length-1;t>=0;--t){let r=this._stack[t];if(r?.type==="functionScope"){let n=r.args.find(s=>s.value===e);if(n!==void 0)return n;if(r.argAliases[e])return r.argAliases[e];let i=r.externalMap[e];return i!=null?fn(i):void 0}if(r?.type==="blockScope"){let n=r.declarations.get(e);if(n!==void 0)return n}}}defineBlockVariable(e,t){if(t.dataType.type==="unknown")throw Error(`Tried to define variable '${e}' of unknown type`);for(let r=this._stack.length-1;r>=0;--r){let n=this._stack[r];if(n?.type==="blockScope"){n.declarations.set(e,t);return}}throw new Error("No block scope found to define a variable in.")}},gi=["","  ","    ","      ","        ","          ","            ","              ","                "],Xa=gi.length-1,If=class{identLevel=0;get pre(){return gi[this.identLevel]??gi[Xa].repeat(this.identLevel/Xa)+gi[this.identLevel%Xa]}indent(){let e=this.pre;return this.identLevel++,e}dedent(){return this.identLevel--,this.pre}withResetLevel(e){let t=this.identLevel;this.identLevel=0;try{return e()}finally{this.identLevel=t}}},Nl=class{#e;#t;_indentController=new If;_itemStateStack=new Of;#r=[];_declarations=[];_varyingLocations;#n=new WeakSet;#i;get varyingLocations(){return this._varyingLocations}[p]={itemStateStack:this._itemStateStack};bindGroupLayoutsToPlaceholderMap=new Map;_nextFreeLayoutPlaceholderIdx=0;fixedBindings=[];enableExtensions;expectedType;constructor(e){this.enableExtensions=e.enableExtensions,this.#t=e.shaderGenerator??La,this.#i=e.root?new Uf(e.root):new Df,this.#e=e.namespace[p]}getUniqueName(e){return Gm(this.#e,e)}makeNameValid(e){return this.#e.nameRegistry.makeValid(e)}get pre(){return this._indentController.pre}get topFunctionReturnType(){let e=this._itemStateStack.topFunctionScope;return lt(e,"Internal error, expected function scope to be present."),e.returnType}get shelllessRepo(){return this.#e.shelllessRepo}indent(){return this._indentController.indent()}dedent(){return this._indentController.dedent()}withResetIndentLevel(e){return this._indentController.withResetLevel(e)}getById(e){let t=this._itemStateStack.getSnippetById(e);return t===void 0?null:t}defineVariable(e,t){this._itemStateStack.defineBlockVariable(e,t)}reportReturnType(e){let t=this._itemStateStack.topFunctionScope;lt(t,"Internal error, expected function scope to be present."),t.reportedReturnTypes.add(e)}pushBlockScope(){this._itemStateStack.pushBlockScope()}popBlockScope(){this._itemStateStack.popBlockScope()}generateLog(e,t){return this.#i.generateLog(this,e,t)}get logResources(){return this.#i.logResources}fnToWgsl(e){let t=this._itemStateStack.pushFunctionScope(e.args,e.argAliases,e.returnType,e.externalMap);try{this.#t.initGenerator(this);let r=this.#t.functionDefinition(e.body),n=e.returnType;if(!n){let i=[...t.reportedReturnTypes];if(i.length===0)n=Se;else{let s=Jn(i);s&&!s.hasImplicitConversions&&(n=s.targetType)}if(!n)throw new Error(`Expected function to have a single return type, got [${i.join(", ")}]. Cast explicitly to the desired type.`);n=Dr(n)}return{head:Hf(this,e.args,n),body:r,returnType:n}}finally{this._itemStateStack.popFunctionScope()}}addDeclaration(e){this._declarations.push(e)}allocateLayoutEntry(e){let t=this.bindGroupLayoutsToPlaceholderMap,r=t.get(e);return r||(r=`#BIND_GROUP_LAYOUT_${this._nextFreeLayoutPlaceholderIdx++}#`,t.set(e,r)),r}allocateFixedEntry(e,t){let r=this.fixedBindings.length;return this.fixedBindings.push({layoutEntry:e,resource:t}),{group:Gl,binding:r}}readSlot(e){let t=this._itemStateStack.readSlot(e);if(t===void 0)throw new ko(e);return t}withSlots(e,t){this._itemStateStack.pushSlotBindings(e);try{return t()}finally{this._itemStateStack.popSlotBindings()}}withVaryingLocations(e,t){this._varyingLocations=e;try{return t()}finally{this._varyingLocations=void 0}}unwrap(e){if(Xn(e))return this.withSlots(e[Nt].pairs,()=>this.unwrap(e[Nt].inner));let t=e;for(;;)if(Yn(t))t=this.readSlot(t);else if(Kn(t))t=this._getOrCompute(t);else break;return t}_getOrCompute(e){let t=this.#e.memoizedDerived.get(e)??[];this._itemStateStack.pushItem();try{for(let i of t)if([...i.slotToValueMap.entries()].every(([s,a])=>s.areEqual(this._itemStateStack.readSlot(s),a)))return i.result;this.pushMode(new oa);let r;try{r=e["~compute"]()}finally{this.popMode("normal")}let n=new Map;for(let i of this._itemStateStack.topItem.usedSlots)n.set(i,this._itemStateStack.readSlot(i));return t.push({slotToValueMap:n,result:r}),this.#e.memoizedDerived.set(e,t),r}catch(r){throw r instanceof tr?r.appendToTrace(e):new tr(r,[e])}finally{this._itemStateStack.popItem()}}_getOrInstantiate(e){let t=this.#e.memoizedResolves.get(e)??[];this._itemStateStack.pushItem();try{for(let i of t)if([...i.slotToValueMap.entries()].every(([s,a])=>s.areEqual(this._itemStateStack.readSlot(s),a)))return i.result;let r;if(Tt(e))r=w(vl(this,e),Se);else if(Kn(e)||Yn(e))r=this.resolve(this.unwrap(e));else if(ua(e))r=e[H](this);else if(er(e)){let i=this.#e.shelllessRepo.get(e,void 0);if(!i)throw new Error(`Couldn't resolve ${e.name}. Make sure it's a function that accepts no arguments, or call it from another TypeGPU function.`);return this.withResetIndentLevel(()=>this.resolve(i))}else throw new TypeError(`Unresolvable internal value: ${nr(e)}`);let n=new Map;for(let i of this._itemStateStack.topItem.usedSlots)n.set(i,this._itemStateStack.readSlot(i));return t.push({slotToValueMap:n,result:r}),this.#e.memoizedResolves.set(e,t),r}catch(r){throw r instanceof tr?r.appendToTrace(e):new tr(r,[e])}finally{this._itemStateStack.popItem()}}resolve(e,t){if(hl(e)||er(e)){if(this.#n.has(e)&&!this.#e.memoizedResolves.has(e))throw new Error(`Recursive function ${e} detected. Recursion is not allowed on the GPU.`);this.#n.add(e)}if(Xn(e))return this.withSlots(e[Nt].pairs,()=>this.resolve(e[Nt].inner,t));if(q(e)||er(e)){if(this._itemStateStack.itemDepth===0)try{this.pushMode(new Fo);let r=la(this,()=>this._getOrInstantiate(e));return w(`${[...this._declarations].join(`

`)}${r.value}`,Se)}finally{this.popMode("codegen")}return this._getOrInstantiate(e)}if(typeof e=="number"){let r=t??vn(e).dataType;if(lt(r.type!=="unknown","Schema has to be known for resolving numbers"),r.type==="abstractInt")return w(`${e}`,r);if(r.type==="u32")return w(`${e}u`,r);if(r.type==="i32")return w(`${e}i`,r);let n=e.toExponential(),i=r.type==="abstractFloat"&&Number.isInteger(e)?`${e}.`:`${e}`,s=n.length<i.length?n:i;return r.type==="f32"?w(`${s}f`,r):r.type==="f16"?w(`${s}h`,r):w(s,r)}if(typeof e=="boolean")return w(e?"true":"false",te);if(typeof e=="string")return w(e,Se);if(t&&He(t)){if(!Array.isArray(e))throw new Ce(`Cannot coerce ${e} into value of type '${t}'`);if(t.elementCount!==e.length)throw new Ce(`Cannot create value of type '${t}' from an array of length: ${e.length}`);let r=this.resolve(t.elementType);return w(y`array<${r}, ${t.elementCount}>(${e.map(n=>w(n,t.elementType))})`,t)}if(Array.isArray(e))return w(y`array(${e.map(r=>this.resolve(r))})`,ze);if(t&&_e(t))return w(y`${this.resolve(t)}(${Object.entries(t.propTypes).map(([r,n])=>w(e[r],n))})`,t);throw new Ce(`Value ${e} (as json: ${nr(e)}) is not resolvable${t?` to type ${t.type}`:""}`)}pushMode(e){this.#r.push(e)}popMode(e){let t=this.#r.pop();e!==void 0&&lt(t?.type===e,"Unexpected mode")}get mode(){return this.#r[this.#r.length-1]??ca}};function Pn(e,t){let r=new Nl(t),n=(t.config?r.withSlots(t.config(new _l([])).bindings,()=>r.resolve(e)):r.resolve(e)).value,i=r.bindGroupLayoutsToPlaceholderMap,s=[],a=new Set([...i.keys()].map(d=>d.index).filter(d=>d!==void 0)),o=Qm(a),u=r.fixedBindings.map((d,h)=>[String(h),d.layoutEntry]),l=()=>{let d=o.next().value,h=Rl(Object.fromEntries(u));return s[d]=h,n=n.replaceAll(Gl,String(d)),[d,new $l(h,Object.fromEntries(r.fixedBindings.map((m,f)=>[String(f),m.resource])))]},c=u.length>0?l():void 0;for(let[d,h]of i.entries()){let m=d.index??o.next().value;s[m]=d,n=n.replaceAll(h,String(m))}return t.enableExtensions&&t.enableExtensions.length>0&&(n=`${t.enableExtensions.map(d=>`enable ${d};`).join(`
`)}

${n}`),{code:n,usedBindGroupLayouts:s,catchall:c,logResources:r.logResources}}function Hf(e,t,r){let n=t.map(i=>`${i.value}: ${e.resolve(i.dataType).value}`).join(", ");return r.type!=="void"?`(${n}) -> ${ln(r)}${e.resolve(r).value} `:`(${n}) `}function jl(e){let t=e;return t?.resourceType==="compute-pipeline"&&!!t[p]}function Wl(e){let t=e;return t?.resourceType==="render-pipeline"&&!!t[p]}function Cf(e){return Wl(e)||jl(e)}function ql(e){let{externals:t,shaderGenerator:r,template:n,names:i="random",config:s,enableExtensions:a}=e,o={};fr(o,t??{});let u={[p]:!0,[H](c){return w(cn(c,o,n??""),Se)},toString:()=>"<root>"},l=Object.values(t).filter(Cf);if(l.length>1)throw new Error(`Found ${l.length} pipelines but can only resolve one at a time.`);return Pn(u,{namespace:typeof i=="string"?En({names:i}):i,enableExtensions:a,shaderGenerator:r,config:s,root:l[0]?.[p].branch})}function Lf(e){return ql(e).code}function Vf(e){let t=jt()??new Nl({namespace:En(),shaderGenerator:La}),r=[1,1,1],n=[1,1,1],i=[r[0]*n[0],r[1]*n[1],r[2]*n[2]],s=new Map,a=Array.from({length:r[0]},()=>Array.from({length:r[1]},()=>Array.from({length:r[2]},()=>new Map))),o=Array.from({length:i[0]},()=>Array.from({length:i[1]},()=>Array.from({length:i[2]},()=>new Map))),u=Array.from({length:i[0]},(l,c)=>Array.from({length:i[1]},(d,h)=>Array.from({length:i[2]},(m,f)=>{let v=Math.floor(c/n[0]),x=Math.floor(h/n[1]),M=Math.floor(f/n[2]);return new Go(s,{private:o[c][h][f],workgroup:a[v][x][M]})})));t.pushMode(u[0][0][0]);try{return{value:la(t,e),buffers:s,privateVars:o,workgroupVars:a}}finally{t.popMode("simulate")}}function Ff(e,t,r,n){return new Gf(e,t,r,n)}function uo(e){let t=e;return t?.resourceType==="query-set"&&!!t[p]}var Gf=class{constructor(e,t,r,n){this.type=t,this.count=r,this.rawQuerySet=n,this.#e=e.device,this._ownQuerySet=!n,this._querySet=n||null}resourceType="query-set";#e;_querySet=null;_ownQuerySet;_destroyed=!1;_available=!0;_readBuffer=null;_resolveBuffer=null;get querySet(){if(this._destroyed)throw new Error("This QuerySet has been destroyed.");return this.rawQuerySet?this.rawQuerySet:this._querySet?this._querySet:(this._querySet=this.#e.createQuerySet({type:this.type,count:this.count}),this._querySet)}get destroyed(){return this._destroyed}get available(){return this._available}get[p](){let e=this;return{get readBuffer(){return e._readBuffer||(e._readBuffer=e.#e.createBuffer({size:e.count*BigUint64Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ})),e._readBuffer},get resolveBuffer(){return e._resolveBuffer||(e._resolveBuffer=e.#e.createBuffer({size:e.count*BigUint64Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC})),e._resolveBuffer}}}$name(e){return Q(this,e),this._querySet&&(this._querySet.label=e),this}resolve(){if(this._destroyed)throw new Error("This QuerySet has been destroyed.");if(!this._available)throw new Error("This QuerySet is busy resolving or reading.");let e=this.#e.createCommandEncoder();e.resolveQuerySet(this.querySet,0,this.count,this[p].resolveBuffer,0),this.#e.queue.submit([e.finish()])}async read(){if(!this._resolveBuffer)throw new Error("QuerySet must be resolved before reading.");this._available=!1;try{let e=this.#e.createCommandEncoder();e.copyBufferToBuffer(this[p].resolveBuffer,0,this[p].readBuffer,0,this.count*BigUint64Array.BYTES_PER_ELEMENT),this.#e.queue.submit([e.finish()]);let t=this[p].readBuffer;await t.mapAsync(GPUMapMode.READ);let r=new BigUint64Array(t.getMappedRange().slice());return t.unmap(),Array.from(r)}finally{this._available=!0}}destroy(){this._destroyed||(this._destroyed=!0,this._querySet&&this._ownQuerySet&&this._querySet.destroy(),this._readBuffer?.destroy(),this._resolveBuffer?.destroy(),this._readBuffer=this._resolveBuffer=null)}},cl=class{constructor(e){this._make=e}_map=new WeakMap;getOrMake(e,...t){if(this._map.has(e))return this._map.get(e);let r=this._make(e,...t);return this._map.set(e,r),r}};var Qa=class{constructor(e,t){this.resourceType=e,this.buffer=t,this[oe]=t,this.#e=this.buffer.as(this.resourceType)}[p]=!0;[oe];#e;$name(e){return Q(this[oe],e),this}write(e){this.buffer.write(e)}writePartial(e){this.buffer.writePartial(e)}read(){return this.buffer.read()}get[X](){return this.#e.$}get $(){return this.#e.$}get value(){return this.$}[H](e){return e.resolve(this.#e)}},V=e=>qu(e??0),Pt=e=>Yu(e??0),Cr=e=>Ku(e??0),Nf={f32:e=>V(e[0]),f16:e=>Cr(e[0]).x,i32:e=>Pt(e[0]),u32:e=>e[0]??0,bool:e=>!!e[0],vec2f:e=>K(V(e[0]),V(e[1])),vec3f:e=>ye(V(e[0]),V(e[1]),V(e[2])),vec4f:e=>_(V(e[0]),V(e[1]),V(e[2]),V(e[3])),vec2h(e){let t=Cr(e[0]);return Fe(t.x,t.y)},vec3h(e){let t=Cr(e[0]),r=Cr(e[1]);return Ge(t.x,t.y,r.x)},vec4h(e){let t=Cr(e[0]),r=Cr(e[1]);return Ne(t.x,t.y,r.x,r.y)},vec2i:e=>fe(Pt(e[0]),Pt(e[1])),vec3i:e=>Pe(Pt(e[0]),Pt(e[1]),Pt(e[2])),vec4i:e=>J(Pt(e[0]),Pt(e[1]),Pt(e[2]),Pt(e[3])),vec2u:e=>Ee(e[0]??0,e[1]??0),vec3u:e=>le(e[0]??0,e[1]??0,e[2]??0),vec4u:e=>ee(e[0]??0,e[1]??0,e[2]??0,e[3]??0),"vec2<bool>":e=>ct(!!e[0],!!e[1]),"vec3<bool>":e=>dt(!!e[0],!!e[1],!!e[2]),"vec4<bool>":e=>pt(!!e[0],!!e[1],!!e[2],!!e[3]),mat2x2f:e=>gt(V(e[0]),V(e[1]),V(e[2]),V(e[3])),mat3x3f:e=>yt(V(e[0]),V(e[1]),V(e[2]),V(e[4]),V(e[5]),V(e[6]),V(e[8]),V(e[9]),V(e[10])),mat4x4f:e=>be(V(e[0]),V(e[1]),V(e[2]),V(e[3]),V(e[4]),V(e[5]),V(e[6]),V(e[7]),V(e[8]),V(e[9]),V(e[10]),V(e[11]),V(e[12]),V(e[13]),V(e[14]),V(e[15]))};function jf(e,t){let r=Nf[t.type];if(r)return r(e);if(_e(t)){let n=Object.keys(t.propTypes),i=Object.values(t.propTypes),s=ro(e,i);return Object.fromEntries(n.map((a,o)=>[a,s[o]]))}if(He(t)){let n=t.elementType,i=t.elementCount;return ro(e,Array.from({length:i},()=>n))}throw new Error(`Cannot deserialize data of type ${t.type}`)}function ro(e,t){let r=0;return t.map(n=>{if(!_t(n))return n;let i=Math.ceil(j(n)/4),s=jf(e.subarray(r,r+i),n);return r+=i,s})}function Wf(e,t){return ro(e,t).map(Vn)}function no(e){let{indexBuffer:t,dataBuffer:r,logIdToMeta:n,options:i}=e;r.read().then(s=>{s.filter(a=>a.id).forEach(({id:a,serializedData:o})=>{let{argTypes:u,op:l}=n.get(a),c=Wf(new Uint32Array(o),u);c.length===0&&c.push(""),console[l](`%c${i.messagePrefix}%c ${c[0]}`,"background: #936ff5; color: white;","color: inherit; background: none",...c.slice(1))})}),t.read().then(s=>{s>i.logCountLimit&&console.warn(`Log count limit per dispatch (${i.logCountLimit}) exceeded by ${s-i.logCountLimit} calls. Consider increasing the limit by passing appropriate options to tgpu.init().`)}),r.buffer.clear(),t.buffer.clear()}function Yl(e,t,r){if(!r.enabledFeatures.has("timestamp-query"))throw new Error('Performance callback requires the "timestamp-query" feature to be enabled on GPU device.');return e.timestampWrites?{...e,performanceCallback:t}:{...e,performanceCallback:t,hasAutoQuerySet:!0,timestampWrites:{querySet:r.createQuerySet("timestamp",2),beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}}function Kl(e,t,r){if(!r.enabledFeatures.has("timestamp-query"))throw new Error('Timestamp writes require the "timestamp-query" feature to be enabled on GPU device.');e.hasAutoQuerySet&&e.timestampWrites&&e.timestampWrites.querySet.destroy();let n={querySet:t.querySet};return t.beginningOfPassWriteIndex!==void 0&&(n.beginningOfPassWriteIndex=t.beginningOfPassWriteIndex),t.endOfPassWriteIndex!==void 0&&(n.endOfPassWriteIndex=t.endOfPassWriteIndex),{...e,hasAutoQuerySet:!1,timestampWrites:n}}function Xl(e,t){if(!e.timestampWrites)return{};let{querySet:r,beginningOfPassWriteIndex:n,endOfPassWriteIndex:i}=e.timestampWrites,s={querySet:uo(r)?t.unwrap(r):r};return n!==void 0&&(s.beginningOfPassWriteIndex=n),i!==void 0&&(s.endOfPassWriteIndex=i),{timestampWrites:s}}function io({root:e,priors:t}){let r=t.timestampWrites?.querySet,n=t.performanceCallback;if(!r)throw new Error("Cannot dispatch workgroups with performance callback without a query set.");if(!uo(r))throw new Error("Performance callback with raw GPUQuerySet is not supported. Use TgpuQuerySet instead.");let i=e.device.createCommandEncoder();i.resolveQuerySet(e.unwrap(r),0,r.count,r[p].resolveBuffer,0),e.device.queue.submit([i.finish()]),e.device.queue.onSubmittedWorkDone().then(async()=>{if(!r.available)return;let s=await r.read(),a=s[t.timestampWrites?.beginningOfPassWriteIndex??0],o=s[t.timestampWrites?.endOfPassWriteIndex??1];if(a===void 0||o===void 0)throw new Error("QuerySet did not return valid timestamps.");await n(a,o)})}function qf(e,t,r){return new Yf(new Kf(e,t,r),{})}var Yf=class Sn{constructor(t,r){this._core=t,this._priors=r,this[p]={get rawPipeline(){return t.unwrap().pipeline},get priors(){return r},get branch(){return t.branch}},this[oe]=t}[p];resourceType="compute-pipeline";[oe];[H](t){return t.resolve(this._core)}toString(){return`computePipeline:${k(this)??"<unnamed>"}`}get rawPipeline(){return this._core.unwrap().pipeline}with(t,r){return Ti(t)?new Sn(this._core,{...this._priors,bindGroupLayoutMap:new Map([...this._priors.bindGroupLayoutMap??[],[t.layout,t]])}):new Sn(this._core,{...this._priors,bindGroupLayoutMap:new Map([...this._priors.bindGroupLayoutMap??[],[t,r]])})}withPerformanceCallback(t){let r=Yl(this._priors,t,this._core.branch);return new Sn(this._core,r)}withTimestampWrites(t){let r=Kl(this._priors,t,this._core.branch);return new Sn(this._core,r)}dispatchWorkgroups(t,r,n){let i=this._core.unwrap(),{branch:s}=this._core,a={label:k(this._core)??"<unnamed>",...Xl(this._priors,s)},o=s.device.createCommandEncoder(),u=o.beginComputePass(a);u.setPipeline(i.pipeline);let l=new Set(i.usedBindGroupLayouts);if(i.usedBindGroupLayouts.forEach((c,d)=>{if(i.catchall&&d===i.catchall[0])u.setBindGroup(d,s.unwrap(i.catchall[1])),l.delete(c);else{let h=this._priors.bindGroupLayoutMap?.get(c);h!==void 0&&(l.delete(c),u.setBindGroup(d,s.unwrap(h)))}}),l.size>0)throw new qn(l);u.dispatchWorkgroups(t,r,n),u.end(),s.device.queue.submit([o.finish()]),i.logResources&&no(i.logResources),this._priors.performanceCallback&&io({root:s,priors:this._priors})}$name(t){return Q(this._core,t),this}},Kf=class{constructor(e,t,r){this.branch=e,this._slotBindings=t,this._entryFn=r}[p]=!0;_memo;[H](e){return e.withSlots(this._slotBindings,()=>(e.resolve(this._entryFn),w("",Se)))}toString(){return"computePipelineCore"}unwrap(){if(this._memo===void 0){let e=this.branch.device,t=qa.filter(c=>this.branch.enabledFeatures.has(Ya[c])),r,n,i=En({names:this.branch.nameRegistrySetting});if(Jt?.enabled){let c=performance.mark("typegpu:resolution:start");r=Pn(this,{namespace:i,enableExtensions:t,shaderGenerator:this.branch.shaderGenerator,root:this.branch}),n=performance.measure("typegpu:resolution",{start:c.name})}else r=Pn(this,{namespace:i,enableExtensions:t,shaderGenerator:this.branch.shaderGenerator,root:this.branch});let{code:s,usedBindGroupLayouts:a,catchall:o,logResources:u}=r;o!==void 0&&a[o[0]]?.$name(`${k(this)??"<unnamed>"} - Automatic Bind Group & Layout`);let l=e.createShaderModule({label:`${k(this)??"<unnamed>"} - Shader`,code:s});this._memo={pipeline:e.createComputePipeline({label:k(this)??"<unnamed>",layout:e.createPipelineLayout({label:`${k(this)??"<unnamed>"} - Pipeline Layout`,bindGroupLayouts:a.map(c=>this.branch.unwrap(c))}),compute:{module:l}}),usedBindGroupLayouts:a,catchall:o,logResources:u},Jt?.enabled&&(async()=>{let c=performance.mark("typegpu:compile-start");await e.queue.onSubmittedWorkDone();let d=performance.measure("typegpu:compiled",{start:c.name});Jt?.record("resolution",{resolveDuration:n?.duration,compileDuration:d.duration,wgslSize:s.length})})()}return this._memo}};function dl(e,t="vertex"){return new Xf(e,t)}function Ql(e){return e?.resourceType==="vertex-layout"}var so=Symbol("defaultAttribEntry");function yi(e,t,r,n,i){if($t(t)||Ot(t)){let s=xt(t);return s!==void 0&&(n[i??so]=s),yi(e,t.inner,Oe(r,Ve(t)),n)}if(_e(t)){let s=r,a=t.propTypes;return Object.fromEntries(Object.entries(a).map(([o,u])=>{s=Oe(s,ce(u));let l=[o,yi(e,u,s,n,o)];return s+=j(u),l}))}if(ut(t)){let s=r,a=t.propTypes;return Object.fromEntries(Object.entries(a).map(([o,u])=>{s=Oe(s,Ve(u));let l=[o,yi(e,u,s,n,o)];return s+=j(u),l}))}if("type"in t&&typeof t.type=="string"){if(Zs.includes(t.type))return{_layout:e,format:t.type,offset:r};let s=Ro[t.type];if(s)return{_layout:e,format:s,offset:r}}throw new Error(`Unsupported data used in vertex layout: ${String(t)}`)}var Xf=class{constructor(e,t){this.schemaForCount=e,this.stepMode=t;let r=e(0);this.stride=Oe(j(r.elementType),ce(r)),this.attrib=yi(this,r.elementType,0,this._customLocationMap)}[p]=!0;resourceType="vertex-layout";stride;attrib;_customLocationMap={};get vertexLayout(){if(this._customLocationMap[so]!==void 0){if(typeof this.attrib.format!="string"||typeof this.attrib.offset!="number")throw new Error("Single attribute vertex layouts must have a format and offset.");return{arrayStride:this.stride,stepMode:this.stepMode,attributes:[{format:this.attrib.format,offset:this.attrib.offset,shaderLocation:this._customLocationMap[so]}]}}if(!Object.keys(this.attrib).every(e=>this._customLocationMap[e]!==void 0))throw new Error("All attributes must have custom locations in order to unwrap a vertex layout.");return{arrayStride:this.stride,stepMode:this.stepMode,attributes:[...Object.entries(this.attrib).map(([e,t])=>({format:t.format,offset:t.offset,shaderLocation:this._customLocationMap[e]}))]}}$name(e){return Q(this,e),this}};function Qf(e){return typeof e?.loadOp=="string"}function Zf(e,t){if(Tt(e)){if(!Qf(t))throw new Error("Expected a single color attachment, not a record.");return[t]}let r=[];for(let n of Object.keys(e)){let i=e[n];if(Wt(i))continue;let s=t[n];if(!s)throw new Error(`A color attachment by the name of '${n}' was not provided to the shader.`);r.push(s)}return r}function Jf(e){return typeof e?.format=="string"}function eg(e,t){if(Tt(e)){if(jn(e))return[];if(!Jf(t))throw new Error("Expected a single color target configuration, not a record.");return[t]}let r=[];for(let n of Object.keys(e)){let i=e[n];if(Wt(i))continue;let s=t[n];if(!s)throw new Error(`A color target by the name of '${n}' was not provided to the shader.`);r.push(s)}return r}function Zl(e){return new tg(new rg(e),{})}var tg=class Et{[p];resourceType="render-pipeline";[oe];hasIndexBuffer=!1;constructor(t,r){this[p]={core:t,priors:r,branch:t.options.branch},this[oe]=t}[H](t){return t.resolve(this[p].core)}toString(){return`renderPipeline:${k(this)??"<unnamed>"}`}$name(t){return Q(this[p].core,t),this}with(t,r){let n=this[p];if(Ti(t))return new Et(n.core,{...n.priors,bindGroupLayoutMap:new Map([...n.priors.bindGroupLayoutMap??[],[t.layout,t]])});if(kl(t))return new Et(n.core,{...n.priors,bindGroupLayoutMap:new Map([...n.priors.bindGroupLayoutMap??[],[t,r]])});if(Ql(t))return new Et(n.core,{...n.priors,vertexLayoutMap:new Map([...n.priors.vertexLayoutMap??[],[t,r]])});throw new Error("Unsupported value passed into .with()")}withPerformanceCallback(t){let r=this[p],n=Yl(r.priors,t,r.core.options.branch);return new Et(r.core,n)}withTimestampWrites(t){let r=this[p],n=Kl(r.priors,t,r.core.options.branch);return new Et(r.core,n)}withColorAttachment(t){let r=this[p];return new Et(r.core,{...r.priors,colorAttachment:t})}withDepthStencilAttachment(t){let r=this[p];return new Et(r.core,{...r.priors,depthStencilAttachment:t})}withIndexBuffer(t,r,n,i){let s=this[p];if(Zn(t)){if(typeof r!="string")throw new Error("If a GPUBuffer is passed, indexFormat must be provided.");return new Et(s.core,{...s.priors,indexBuffer:{buffer:t,indexFormat:r,offsetBytes:n,sizeBytes:i}})}let a={u32:"uint32",u16:"uint16"},o=t.dataType.elementType;return new Et(s.core,{...s.priors,indexBuffer:{buffer:t,indexFormat:a[o.type],offsetBytes:r!==void 0?r*j(o):void 0,sizeBytes:i!==void 0?i*j(o):void 0}})}setupRenderPass(t){let r=this[p],n=r.core.unwrap(),{branch:i,fragmentFn:s}=r.core.options,a=s?Zf(s.shell.out,r.priors.colorAttachment??{}).map(d=>An(d.view)?{...d,view:i.unwrap(d.view).createView()}:xi(d.view)?{...d,view:i.unwrap(d.view)}:d):[null],o={label:k(r.core)??"<unnamed>",colorAttachments:a,...Xl(r.priors,i)};if(r.priors.depthStencilAttachment!==void 0){let d=r.priors.depthStencilAttachment;An(d.view)?o.depthStencilAttachment={...d,view:i.unwrap(d.view).createView()}:o.depthStencilAttachment=d}let u=t.beginRenderPass(o);u.setPipeline(n.pipeline);let l=new Set(n.usedBindGroupLayouts);n.usedBindGroupLayouts.forEach((d,h)=>{if(n.catchall&&h===n.catchall[0])u.setBindGroup(h,i.unwrap(n.catchall[1])),l.delete(d);else{let m=r.priors.bindGroupLayoutMap?.get(d);m!==void 0&&(l.delete(d),u.setBindGroup(h,i.unwrap(m)))}});let c=new Set(r.core.usedVertexLayouts);if(r.core.usedVertexLayouts.forEach((d,h)=>{let m=r.priors.vertexLayoutMap?.get(d);m&&(c.delete(d),u.setVertexBuffer(h,i.unwrap(m)))}),l.size>0)throw new qn(l);if(c.size>0)throw new ia(c);return u}draw(t,r,n,i){let s=this[p],{branch:a}=s.core.options,{logResources:o}=s.core.unwrap(),u=a.device.createCommandEncoder(),l=this.setupRenderPass(u);l.draw(t,r,n,i),l.end(),a.device.queue.submit([u.finish()]),o&&no(o),s.priors.performanceCallback&&io({root:a,priors:s.priors})}drawIndexed(t,r,n,i,s){let a=this[p];if(!a.priors.indexBuffer)throw new Error("No index buffer set for this render pipeline.");let{logResources:o}=a.core.unwrap(),{branch:u}=a.core.options,{buffer:l,indexFormat:c,offsetBytes:d,sizeBytes:h}=a.priors.indexBuffer,m=u.device.createCommandEncoder(),f=this.setupRenderPass(m);Zn(l)?f.setIndexBuffer(l,c,d,h):f.setIndexBuffer(u.unwrap(l),c,d,h),f.drawIndexed(t,r,n,i,s),f.end(),u.device.queue.submit([m.finish()]),o&&no(o),a.priors.performanceCallback&&io({root:u,priors:a.priors})}},rg=class{constructor(e){this.options=e;let t=Nm(e.vertexFn.shell.in??{},e.vertexAttribs);this._vertexBufferLayouts=t.bufferDefinitions,this.usedVertexLayouts=t.usedVertexLayouts,this._targets=e.fragmentFn&&e.targets?eg(e.fragmentFn.shell.out,e.targets):[null]}[p]=!0;usedVertexLayouts;_memo;_vertexBufferLayouts;_targets;[H](e){let{vertexFn:t,fragmentFn:r,slotBindings:n}=this.options,i=ng(t.shell.out,r?.shell.in,k(t)??"<unnamed>",k(r)??"<unnamed>");return e.withVaryingLocations(i,()=>e.withSlots(n,()=>(e.resolve(t),r&&e.resolve(r),w("",Se))))}toString(){return"renderPipelineCore"}unwrap(){if(this._memo===void 0){let{branch:e,primitiveState:t,depthStencilState:r,multisampleState:n}=this.options,i=e.device,s=qa.filter(x=>e.enabledFeatures.has(Ya[x])),a,o,u=En({names:e.nameRegistrySetting});if(Jt?.enabled){let x=performance.mark("typegpu:resolution:start");a=Pn(this,{namespace:u,enableExtensions:s,shaderGenerator:e.shaderGenerator,root:e}),o=performance.measure("typegpu:resolution",{start:x.name})}else a=Pn(this,{namespace:u,enableExtensions:s,shaderGenerator:e.shaderGenerator,root:e});let{code:l,usedBindGroupLayouts:c,catchall:d,logResources:h}=a;d!==void 0&&c[d[0]]?.$name(`${k(this)??"<unnamed>"} - Automatic Bind Group & Layout`);let m=i.createShaderModule({label:`${k(this)??"<unnamed>"} - Shader`,code:l}),f={layout:i.createPipelineLayout({label:`${k(this)??"<unnamed>"} - Pipeline Layout`,bindGroupLayouts:c.map(x=>e.unwrap(x))}),vertex:{module:m,buffers:this._vertexBufferLayouts}},v=k(this);v!==void 0&&(f.label=v),this.options.fragmentFn&&(f.fragment={module:m,targets:this._targets}),t&&(_t(t.stripIndexFormat)?f.primitive={...t,stripIndexFormat:{u32:"uint32",u16:"uint16"}[t.stripIndexFormat.type]}:f.primitive=t),r&&(f.depthStencil=r),n&&(f.multisample=n),this._memo={pipeline:i.createRenderPipeline(f),usedBindGroupLayouts:c,catchall:d,logResources:h},Jt?.enabled&&(async()=>{let x=performance.mark("typegpu:compile-start");await i.queue.onSubmittedWorkDone();let M=performance.measure("typegpu:compiled",{start:x.name});Jt?.record("resolution",{resolveDuration:o?.duration,compileDuration:M.duration,wgslSize:l.length})})()}return this._memo}};function ng(e,t,r,n){let i={},s=new Set;function a(u,l){i[u]=l,s.add(l)}for(let[u,l]of Object.entries(e)){let c=xt(l);c!==void 0&&a(u,c)}for(let[u,l]of Object.entries(t??{})){let c=xt(l);c!==void 0&&(i[u]===void 0?a(u,c):i[u]!==c&&console.warn(`Mismatched location between vertexFn (${r}) output (${i[u]}) and fragmentFn (${n}) input (${c}) for the key "${u}", using the location set on vertex output.`))}let o=0;for(let u of Object.keys(e??{}))if(!(Wt(e[u])||i[u]!==void 0)){for(;s.has(o);)o++;a(u,o)}return i}function ig(e){if(e.includes(0))throw new Error("Size and workgroupSize cannot contain zeroes.");return le(e[0]??1,e[1]??1,e[2]??1)}var sg=[le(1,1,1),le(256,1,1),le(16,16,1),le(8,8,4)],ag=class Jl{#e;#t;#r;#n;#i;constructor(t,r,n,i){this.#e=t,this.#t=r,this.#r=n,this.#n=i,this.#i=le()}with(t){return new Jl(this.#e,this.#t.with(t),this.#r,this.#n)}dispatchThreads(...t){let r=ig(t),n=Ou(ye(r).div(ye(this.#n)));Xu(r,this.#i)||(this.#i=r,this.#r.write(r)),this.#t.dispatchWorkgroups(n.x,n.y,n.z)}get pipeline(){return this.#t}get sizeUniform(){return this.#r}},og=class ao{constructor(t,r){this._getRoot=t,this._slotBindings=r}with(t,r){return new ao(this._getRoot,[...this._slotBindings,[Qr(t)?t.slot:t,r]])}withCompute(t){return new ug(this._getRoot(),this._slotBindings,t)}createGuardedComputePipeline(t){let r=this._getRoot();if(t.length>=4)throw new Error("Guarded compute callback only supports up to three dimensions.");let n=sg[t.length],i=Z([A,A,A])(t),s=r.createUniform(le),a=pl({workgroupSize:n,in:{id:Ra.globalInvocationId}})`{
  if (any(in.id >= sizeUniform)) {
    return;
  }
  wrappedCallback(in.id.x, in.id.y, in.id.z);
}`.$uses({sizeUniform:s,wrappedCallback:i}),o=this.withCompute(a).createPipeline();return new ag(r,o,s,n)}withVertex(t,r){return new lg({branch:this._getRoot(),primitiveState:void 0,depthStencilState:void 0,slotBindings:this._slotBindings,vertexFn:t,vertexAttribs:r,multisampleState:void 0})}pipe(t){let r=t(new _l([]));return new ao(this._getRoot,[...this._slotBindings,...r.bindings])}},ug=class{constructor(e,t,r){this._root=e,this._slotBindings=t,this._entryFn=r}createPipeline(){return qf(this._root,this._slotBindings,this._entryFn)}},lg=class bi{constructor(t){this._options=t}withFragment(t,r,n){return lt(typeof t!="string","Just type mismatch validation"),lt(typeof r!="string","Just type mismatch validation"),new cg({...this._options,fragmentFn:t,targets:r})}withPrimitive(t){return new bi({...this._options,primitiveState:t})}withDepthStencil(t){return new bi({...this._options,depthStencilState:t})}withMultisample(t){return new bi({...this._options,multisampleState:t})}createPipeline(){return Zl({...this._options,fragmentFn:null,targets:null})}},cg=class vi{constructor(t){this._options=t}withPrimitive(t){return new vi({...this._options,primitiveState:t})}withDepthStencil(t){return new vi({...this._options,depthStencilState:t})}withMultisample(t){return new vi({...this._options,multisampleState:t})}createPipeline(){return Zl(this._options)}},ec=class extends og{constructor(e,t,r,n,i){super(()=>this,[]),this.device=e,this.nameRegistrySetting=t,this._ownDevice=r,this.shaderGenerator=i,this["~unstable"]=this,this[p]={logOptions:n}}"~unstable";_unwrappedBindGroupLayouts=new cl(e=>e.unwrap(this));_unwrappedBindGroups=new cl(e=>e.unwrap(this));[p];get enabledFeatures(){return new Set(this.device.features)}createBuffer(e,t){return mi(this,e,t)}createUniform(e,t){let r=mi(this,e,t).$usage("uniform");return new Qa("uniform",r)}createMutable(e,t){let r=mi(this,e,t).$usage("storage");return new Qa("mutable",r)}createReadonly(e,t){let r=mi(this,e,t).$usage("storage");return new Qa("readonly",r)}createQuerySet(e,t,r){return Ff(this,e,t,r)}createBindGroup(e,t){return new $l(e,t)}destroy(){mf(this.device),this._ownDevice&&this.device.destroy()}createTexture(e){return wf(e,this)}createSampler(e){return cf(e,this)}createComparisonSampler(e){return df(e,this)}unwrap(e){if(jl(e))return e[p].rawPipeline;if(Wl(e))return e[p].core.unwrap().pipeline;if(kl(e))return this._unwrappedBindGroupLayouts.getOrMake(e);if(Ti(e))return this._unwrappedBindGroups.getOrMake(e);if(zn(e))return e.buffer;if(An(e))return e[p].unwrap();if(xi(e)){if(!e[p].unwrap)throw new Error("Cannot unwrap laid-out texture view as it has no underlying resource.");return e[p].unwrap()}if(Ql(e))return e.vertexLayout;if(Sl(e)||zl(e)){if(e[p].unwrap)return e[p].unwrap();throw new Error("Cannot unwrap laid-out sampler.")}if(uo(e))return e.querySet;throw new Error(`Unknown resource type: ${e}`)}beginRenderPass(e,t){let r=this.device.createCommandEncoder(),n=r.beginRenderPass(e),i=new Map,s=new Map,a,o=()=>{if(!a)throw new Error("Cannot draw without a call to pass.setPipeline");let{core:u,priors:l}=a[p],c=u.unwrap();n.setPipeline(c.pipeline);let d=new Set(c.usedBindGroupLayouts);c.usedBindGroupLayouts.forEach((m,f)=>{if(c.catchall&&f===c.catchall[0])n.setBindGroup(f,this.unwrap(c.catchall[1])),d.delete(m);else{let v=l.bindGroupLayoutMap?.get(m)??i.get(m);v!==void 0&&(d.delete(m),Ti(v)?n.setBindGroup(f,this.unwrap(v)):n.setBindGroup(f,v))}});let h=new Set;if(u.usedVertexLayouts.forEach((m,f)=>{let v=l.vertexLayoutMap?.get(m),x=v?{buffer:v,offset:void 0,size:void 0}:s.get(m);!x||!x.buffer?h.add(m):zn(x.buffer)?n.setVertexBuffer(f,this.unwrap(x.buffer),x.offset,x.size):n.setVertexBuffer(f,x.buffer,x.offset,x.size)}),d.size>0)throw new qn(d);if(h.size>0)throw new ia(h)};t({setViewport(...u){n.setViewport(...u)},setScissorRect(...u){n.setScissorRect(...u)},setBlendConstant(...u){n.setBlendConstant(...u)},setStencilReference(...u){n.setStencilReference(...u)},beginOcclusionQuery(...u){n.beginOcclusionQuery(...u)},endOcclusionQuery(...u){n.endOcclusionQuery(...u)},executeBundles(...u){n.executeBundles(...u)},setPipeline(u){a=u},setIndexBuffer:(u,l,c,d)=>{zn(u)?n.setIndexBuffer(this.unwrap(u),l,c,d):n.setIndexBuffer(u,l,c,d)},setVertexBuffer(u,l,c,d){s.set(u,{buffer:l,offset:c,size:d})},setBindGroup(u,l){i.set(u,l)},draw(u,l,c,d){o(),n.draw(u,l,c,d)},drawIndexed(...u){o(),n.drawIndexed(...u)},drawIndirect(...u){o(),n.drawIndirect(...u)},drawIndexedIndirect(...u){o(),n.drawIndexedIndirect(...u)}}),n.end(),this.device.queue.submit([r.finish()])}flush(){console.warn("flush() has been deprecated, and has no effect.")}};async function dg(e){let{adapter:t,device:r,unstable_names:n="random",unstable_logOptions:i}=e??{};if(!navigator.gpu)throw new Error("WebGPU is not supported by this browser.");let s=await navigator.gpu.requestAdapter(t);if(!s)throw new Error("Could not find a compatible GPU");let a=[];for(let u of r?.requiredFeatures??[]){if(!s.features.has(u))throw new Error(`Requested feature "${u}" is not supported by the adapter.`);a.push(u)}for(let u of r?.optionalFeatures??[])s.features.has(u)?a.push(u):console.warn(`Optional feature "${u}" is not supported by the adapter.`);let o=await s.requestDevice({...r,requiredFeatures:a});return new ec(o,n,!0,i??{},e?.shaderGenerator)}function pg(e){let{device:t,unstable_names:r="random",unstable_logOptions:n}=e??{};return new ec(t,r,!1,n??{},e?.shaderGenerator)}function hg(e,t){return new mg(e,t)}var mg=class{constructor(e,t=void 0){this.schema=e,this.defaultValue=t,this.slot=Mi(t),this[oe]=this.slot}[p]=!0;[oe];resourceType="accessor";slot;get[X](){return new Proxy({[p]:!0,[Re]:this.#e(),[H]:e=>e.resolve(this),toString:()=>`accessor:${k(this)??"<unnamed>"}.$`},it)}#e(){let e=jt(),t=_n(e.unwrap(this.slot));return hl(t)?t[p].gpuImpl():w(t,this.schema)}$name(e){return this.slot.$name(e),this}toString(){return`accessor:${k(this)??"<unnamed>"}`}get value(){if(Xe())return this[X];throw new Error("`tgpu.accessor` relies on GPU resources and cannot be accessed outside of a compute dispatch or draw call")}get $(){return this.value}[H](e){let t=this.#e();return w(e.resolve(t.value,t.dataType).value,t.dataType)}};function fg(e){return yg(e)}function gg([e,t]){return`${k(e)??"<unnamed>"}=${t}`}function yg(e){if(jt())throw new Error("Cannot create tgpu.derived objects at the resolution stage.");return{[p]:!0,resourceType:"derived","~compute":e,get[X](){let t=jt();if(!t)throw new Error("Cannot access tgpu.derived's value outside of resolution.");return _n(t.unwrap(this))},get value(){return this[X]},get $(){return this.value},with(t,r){return tc(this,[[t,r]])},toString(){return"derived"}}}function tc(e,t){return{[p]:!0,resourceType:"derived","~compute"(){throw new Error("'~compute' should never be read on bound derived items.")},[Nt]:{inner:e,pairs:t},get[X](){let r=jt();if(!r)throw new Error("Cannot access tgpu.derived's value outside of resolution.");return _n(r.unwrap(this))},get value(){return this[X]},get $(){return this.value},with(r,n){return tc(e,[...t,[r,n]])},toString(){return`derived[${t.map(gg).join(", ")}]`}}}var bg={fn:Z,bindGroupLayout:Rl,vertexLayout:dl,slot:Mi,init:dg,initFromDevice:pg,resolve:Lf,resolveWithContext:ql,privateVar:Si,workgroupVar:ll,const:ai,"~unstable":{fn:Z,fragmentFn:Om,vertexFn:bu,computeFn:pl,vertexLayout:dl,namespace:En,derived:fg,slot:Mi,accessor:hg,privateVar:Si,workgroupVar:ll,const:ai,declare:km,simulate:Vf}},lo=bg;var Rn=null;async function rc(e){return Rn||(e?Rn=lo.initFromDevice({device:e}):Rn=await lo.init(),Rn)}var mw={f32Array:e=>Ze(g,e),i32Array:e=>Ze(W,e),u32Array:e=>Ze(A,e),ElementwiseParams:je({size:A,_pad1:A,_pad2:A,_pad3:A}),ScalarParams:je({scalar:g,size:A,_pad1:A,_pad2:A}),MatmulParams:je({M:A,K:A,N:A,_pad:A}),ReduceParams:je({inputSize:A,_pad1:A,_pad2:A,_pad3:A})};var fw={FillParams:je({value:g,length:A}),RngParams:je({seed:A,length:A}),Dims2D:je({dim0:A,dim1:A})};var Yt=null,co=null,_g=null,Ai=!1,kn=null;async function Vr(e){if(!Ai)return kn||(kn=(async()=>{let t=e||(typeof navigator<"u"?navigator.gpu:null);if(!t)throw new Error("WebGPU provider not found. In a browser, WebGPU may not be supported. In Node.js, you must provide a WebGPU implementation (e.g. via @torchjsorg/torch.node.js).");let r=await t.requestAdapter();if(!r)throw new Error("Failed to get WebGPU adapter");co=r;let n=[];r.features&&r.features.has("timestamp-query")&&n.push("timestamp-query"),Yt=await r.requestDevice({requiredFeatures:n,requiredLimits:{maxBufferSize:r.limits.maxBufferSize,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize}}),"lost"in Yt&&Yt.lost&&Yt.lost.then(i=>{console.error("WebGPU device lost:",i.message),Ai=!1,Yt=null,kn=null}),Ai=!0,_g=await rc(Yt),await Ls()})(),kn)}function kt(){if(!Yt)throw new Error("WebGPU not initialized. Call torch.init() first.");return Yt}function Xt(){if(!co)throw new Error("WebGPU not initialized. Call torch.init() first.");return co}function Fr(){return Ai}function wg(){return typeof process<"u"&&process.versions?.node!==void 0}var po,nc;wg()?(po={MAP_READ:1,MAP_WRITE:2,COPY_SRC:4,COPY_DST:8,INDEX:16,VERTEX:32,UNIFORM:64,STORAGE:128,INDIRECT:256,QUERY_RESOLVE:512},nc={READ:1,WRITE:2}):(po={MAP_READ:GPUBufferUsage?.MAP_READ??1,MAP_WRITE:GPUBufferUsage?.MAP_WRITE??2,COPY_SRC:GPUBufferUsage?.COPY_SRC??4,COPY_DST:GPUBufferUsage?.COPY_DST??8,INDEX:GPUBufferUsage?.INDEX??16,VERTEX:GPUBufferUsage?.VERTEX??32,UNIFORM:GPUBufferUsage?.UNIFORM??64,STORAGE:GPUBufferUsage?.STORAGE??128,INDIRECT:GPUBufferUsage?.INDIRECT??256,QUERY_RESOLVE:GPUBufferUsage?.QUERY_RESOLVE??512},nc={READ:GPUMapMode?.READ??1,WRITE:GPUMapMode?.WRITE??2});var b=po;var ic=new Map;function S(e,t="main"){let r=`${e}:${t}`,n=ic.get(r);if(n)return n;let i=kt(),s=i.createShaderModule({code:e});return typeof s.getCompilationInfo=="function"&&s.getCompilationInfo().then(a=>{for(let o of a.messages){let u=o.type==="error"?"error":o.type==="warning"?"warn":"log";console[u](`[WGSL ${t}] ${o.type}: ${o.message} (line ${o.lineNum}:${o.linePos})`)}}),n=i.createComputePipeline({layout:"auto",compute:{module:s,entryPoint:t}}),ic.set(r,n),n}function P(e,t,r){let n=kt(),i=xg(t)?t.map((u,l)=>({binding:l,resource:{buffer:u,offset:0,size:u.size}})):t,s=n.createBindGroup({layout:e.getBindGroupLayout(0),entries:i}),a=n.createCommandEncoder(),o=a.beginComputePass();o.setPipeline(e),o.setBindGroup(0,s),o.dispatchWorkgroups(...r),o.end(),n.queue.submit([a.finish()])}function B(e,t=256){let r=Math.ceil(e/t);if(r<=65535)return[r,1,1];if(r<=65535*65535){let n=Math.ceil(Math.sqrt(r)),i=Math.ceil(r/n);return[n,i,1]}else throw new Error(`Tensor too large: ${e} elements exceeds WebGPU limits`)}async function E(){if(!globalThis.__TORCH_PYODIDE_SYNC_EAGER__)return;await kt().queue.onSubmittedWorkDone()}function xg(e){return e.length===0||!("binding"in e[0])}var Ft=`@group(0) @binding(0) var<storage, read> a: array<f32>;\r
@group(0) @binding(1) var<storage, read> b: array<f32>;\r
@group(0) @binding(2) var<storage, read_write> result: array<f32>;\r
\r
@compute @workgroup_size(256)\r
fn add(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = a[idx] + b[idx];\r
}\r
\r
@compute @workgroup_size(256)\r
fn sub(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = a[idx] - b[idx];\r
}\r
\r
@compute @workgroup_size(256)\r
fn mul(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = a[idx] * b[idx];\r
}\r
\r
@compute @workgroup_size(256)\r
fn div_op(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = a[idx] / b[idx];\r
}\r
\r
@compute @workgroup_size(256)\r
fn atan2_op(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = atan2(a[idx], b[idx]);\r
}\r
\r
@compute @workgroup_size(256)\r
fn hypot_op(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = sqrt(a[idx] * a[idx] + b[idx] * b[idx]);\r
}\r
\r
@compute @workgroup_size(256)\r
fn logaddexp(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    let x = a[idx];\r
    let y = b[idx];\r
    let max_val = max(x, y);\r
    result[idx] = max_val + log(exp(x - max_val) + exp(y - max_val));\r
}\r
\r
@compute @workgroup_size(256)\r
fn bitwise_and(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = bitcast<f32>(bitcast<i32>(a[idx]) & bitcast<i32>(b[idx]));\r
}\r
\r
@compute @workgroup_size(256)\r
fn bitwise_or(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = bitcast<f32>(bitcast<i32>(a[idx]) | bitcast<i32>(b[idx]));\r
}\r
\r
@compute @workgroup_size(256)\r
fn bitwise_xor(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
    let idx = global_id.x;\r
    if (idx >= arrayLength(&result)) { return; }\r
    result[idx] = bitcast<f32>(bitcast<i32>(a[idx]) ^ bitcast<i32>(b[idx]));\r
}\r
\r
@compute @workgroup_size(256)
fn heaviside(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = select(0.0, 1.0, a[idx] >= 0.0);
}

fn integer_pow(base: f32, exponent: f32) -> f32 {
    let rounded = floor(exponent + 0.5);
    var n = i32(abs(rounded));
    var acc = 1.0;
    var factor = base;
    while (n > 0) {
        if ((n % 2) == 1) {
            acc = acc * factor;
        }
        factor = factor * factor;
        n = n / 2;
    }
    if (rounded < 0.0) {
        return 1.0 / acc;
    }
    return acc;
}

@compute @workgroup_size(256)
fn pow_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let exponent = b[idx];
    let rounded = floor(exponent + 0.5);
    if (abs(exponent - rounded) < 0.000001 && abs(rounded) <= 64.0) {
        result[idx] = integer_pow(a[idx], exponent);
    } else {
        result[idx] = pow(a[idx], exponent);
    }
}
`;var Gr=`@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;

@compute @workgroup_size(256)
fn neg(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = -input[idx];
}

@compute @workgroup_size(256)
fn abs_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = abs(input[idx]);
}

@compute @workgroup_size(256)
fn sqrt_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = sqrt(input[idx]);
}

@compute @workgroup_size(256)
fn exp_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = exp(input[idx]);
}

@compute @workgroup_size(256)
fn exp2_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = exp2(input[idx]);
}

@compute @workgroup_size(256)
fn log_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = log(input[idx]);
}

@compute @workgroup_size(256)
fn log10(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = log(input[idx]) / 2.302585092994046;
}

@compute @workgroup_size(256)
fn log2_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = log2(input[idx]);
}

@compute @workgroup_size(256)
fn log1p(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = log(1.0 + input[idx]);
}

@compute @workgroup_size(256)
fn tanh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = tanh(input[idx]);
}

@compute @workgroup_size(256)
fn sigmoid(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = 1.0 / (1.0 + exp(-input[idx]));
}

@compute @workgroup_size(256)
fn relu(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = max(0.0, input[idx]);
}

@compute @workgroup_size(256)
fn sin_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = sin(input[idx]);
}

@compute @workgroup_size(256)
fn cos_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = cos(input[idx]);
}

@compute @workgroup_size(256)
fn tan_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = tan(input[idx]);
}

@compute @workgroup_size(256)
fn acos_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = acos(input[idx]);
}

@compute @workgroup_size(256)
fn asin_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = asin(input[idx]);
}

@compute @workgroup_size(256)
fn atan_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = atan(input[idx]);
}

@compute @workgroup_size(256)
fn cosh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = cosh(input[idx]);
}

@compute @workgroup_size(256)
fn sinh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = sinh(input[idx]);
}

@compute @workgroup_size(256)
fn acosh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = log(x + sqrt(x * x - 1.0));
}

@compute @workgroup_size(256)
fn asinh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = log(x + sqrt(x * x + 1.0));
}

@compute @workgroup_size(256)
fn atanh_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = 0.5 * log((1.0 + x) / (1.0 - x));
}

@compute @workgroup_size(256)
fn ceil_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = ceil(input[idx]);
}

@compute @workgroup_size(256)
fn floor_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = floor(input[idx]);
}

@compute @workgroup_size(256)
fn round_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    // WGSL round() uses round-half-to-even (banker's rounding), matching PyTorch
    result[idx] = round(input[idx]);
}

@compute @workgroup_size(256)
fn trunc_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = trunc(input[idx]);
}

@compute @workgroup_size(256)
fn frac_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let val = input[idx];
    result[idx] = val - trunc(val);
}

@compute @workgroup_size(256)
fn reciprocal_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = 1.0 / input[idx];
}

@compute @workgroup_size(256)
fn rsqrt_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = inverseSqrt(input[idx]);
}

@compute @workgroup_size(256)
fn square_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let val = input[idx];
    result[idx] = val * val;
}

const POS_INF: f32 = 1e30;  // Large finite value approximating infinity
const NEG_INF: f32 = -1e30; // Large negative value

fn erf(x: f32) -> f32 {
    let s = sign(x);
    let a = abs(x);
    let t = 1.0 / (1.0 + 0.3275911 * a);
    let y = 1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * exp(-a * a);
    return s * y;
}

@compute @workgroup_size(256)
fn erf_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = erf(input[idx]);
}

@compute @workgroup_size(256)
fn gelu(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    // Exact GELU: 0.5 * x * (1 + erf(x / sqrt(2)))
    result[idx] = 0.5 * x * (1.0 + erf(x * 0.7071067811865475));
}

@compute @workgroup_size(256)
fn softplus_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = select(log(1.0 + exp(x)), x, x > 20.0);
}

@compute @workgroup_size(256)
fn silu_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = x * (1.0 / (1.0 + exp(-x)));
}

@compute @workgroup_size(256)
fn mish_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    let sp = select(log(1.0 + exp(x)), x, x > 20.0);
    result[idx] = x * tanh(sp);
}

@compute @workgroup_size(256)
fn hardsigmoid_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = clamp(x / 6.0 + 0.5, 0.0, 1.0);
}

@compute @workgroup_size(256)
fn hardswish_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = x * clamp(x / 6.0 + 0.5, 0.0, 1.0);
}

@compute @workgroup_size(256)
fn softsign_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = x / (1.0 + abs(x));
}

@compute @workgroup_size(256)
fn tanhshrink_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = x - tanh(x);
}

@compute @workgroup_size(256)
fn isnan_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let bits = bitcast<u32>(input[idx]);
    let is_nan = ((bits & 0x7f800000u) == 0x7f800000u) && ((bits & 0x007fffffu) != 0u);
    result[idx] = select(0.0, 1.0, is_nan);
}

@compute @workgroup_size(256)
fn isinf_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let bits = bitcast<u32>(input[idx]);
    let is_inf = ((bits & 0x7f800000u) == 0x7f800000u) && ((bits & 0x007fffffu) == 0u);
    result[idx] = select(0.0, 1.0, is_inf);
}

@compute @workgroup_size(256)
fn isfinite_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let bits = bitcast<u32>(input[idx]);
    let is_nan_or_inf = (bits & 0x7f800000u) == 0x7f800000u;
    result[idx] = select(1.0, 0.0, is_nan_or_inf);
}

@compute @workgroup_size(256)
fn isposinf_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let bits = bitcast<u32>(input[idx]);
    let is_pos_inf = bits == 0x7f800000u;
    result[idx] = select(0.0, 1.0, is_pos_inf);
}

@compute @workgroup_size(256)
fn isneginf_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let bits = bitcast<u32>(input[idx]);
    let is_neg_inf = bits == 0xff800000u;
    result[idx] = select(0.0, 1.0, is_neg_inf);
}

@compute @workgroup_size(256)
fn sign_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = sign(input[idx]);
}

@compute @workgroup_size(256)
fn sgn_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = select(select(0.0, -1.0, x < 0.0), 1.0, x > 0.0);
}

@compute @workgroup_size(256)
fn erfc_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = 1.0 - erf(input[idx]);
}

@compute @workgroup_size(256)
fn expm1_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = exp(input[idx]) - 1.0;
}

@compute @workgroup_size(256)
fn deg2rad_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = input[idx] * 0.017453292519943295;
}

@compute @workgroup_size(256)
fn rad2deg_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = input[idx] * 57.29577951308232;
}

@compute @workgroup_size(256)
fn logical_not_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = select(1.0, 0.0, input[idx] != 0.0);
}

@compute @workgroup_size(256)
fn i0_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = abs(input[idx]);
    // Modified Bessel function I0 using polynomial approximation
    let t = x / 3.75;
    let t2 = t * t;
    var y: f32;
    if (x < 3.75) {
        // I0(x) = 1 + 3.5156229*t^2 + 3.0899424*t^4 + 1.2067492*t^6 + 0.2659732*t^8 + 0.0360768*t^10 + 0.0045813*t^12
        y = 1.0 + 3.5156229 * t2 + 3.0899424 * t2 * t2 + 1.2067492 * t2 * t2 * t2 + 0.2659732 * t2 * t2 * t2 * t2 + 0.0360768 * t2 * t2 * t2 * t2 * t2 + 0.0045813 * t2 * t2 * t2 * t2 * t2 * t2;
    } else {
        // I0(x) = exp(x) / sqrt(x) * (0.39894228 + 0.01328592/t + 0.00225319/t^2 - 0.00157565/t^3 + 0.00916281/t^4 - 0.02057706/t^5 + 0.02635537/t^6 - 0.01647633/t^7 + 0.00392377/t^8)
        let inv_t = 1.0 / t;
        y = exp(x) * (0.39894228 + 0.01328592 * inv_t + 0.00225319 * inv_t * inv_t - 0.00157565 * inv_t * inv_t * inv_t + 0.00916281 * inv_t * inv_t * inv_t * inv_t - 0.02057706 * inv_t * inv_t * inv_t * inv_t * inv_t + 0.02635537 * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t - 0.01647633 * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t + 0.00392377 * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t * inv_t) * inverseSqrt(x);
    }
    result[idx] = y;
}

// Lanczos approximation for lgamma
fn lgamma_impl(x: f32) -> f32 {
    // Lanczos coefficients
    let coeffs = array<f32, 7>(76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953005e-5, 0.0);
    var y = x;
    var tmp = x + 5.5;
    tmp = tmp - (x + 0.5) * log(tmp);
    var ser = 1.000000000190015;
    for (var j = 0u; j < 6u; j = j + 1u) {
        y = y + 1.0;
        ser = ser + coeffs[j] / y;
    }
    return -tmp + log(2.5066282746310005 * ser / x);
}

@compute @workgroup_size(256)
fn lgamma_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    result[idx] = lgamma_impl(input[idx]);
}

@compute @workgroup_size(256)
fn digamma_op(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    // Digamma approximation using asymptotic series
    var y = x;
    var psi = 0.0;
    if (x <= 0.0) {
        // Reflection formula
        if (ceil(x) == x) {
            result[idx] = POS_INF; // +inf for integer <= 0
            return;
        }
        psi = 3.141592653589793 / tan(3.141592653589793 * x);
        y = 1.0 - x;
    }
    if (y < 10.0) {
        // Use recurrence to bring argument above 10
        let n = u32(10.0 - y) + 1u;
        for (var i = 0u; i < n; i = i + 1u) {
            psi = psi - 1.0 / y;
            y = y + 1.0;
        }
    }
    // Asymptotic series for large argument
    psi = psi + log(y) - 0.5 / y;
    let y2 = y * y;
    psi = psi - 1.0 / (12.0 * y2);
    psi = psi + 1.0 / (120.0 * y2 * y2);
    psi = psi - 1.0 / (252.0 * y2 * y2 * y2);
    psi = psi + 1.0 / (240.0 * y2 * y2 * y2 * y2);
    // Apply sign for x <= 0
    if (input[idx] <= 0.0) {
        psi = psi + 3.141592653589793 / tan(3.141592653589793 * input[idx]);
    }
    result[idx] = psi;
}`;var Pi=`struct Params {
    value: f32,
    length: u32,
}

@group(0) @binding(0) var<storage, read_write> result: array<f32>;
@group(0) @binding(1) var<uniform> params: Params;

@compute @workgroup_size(256)
fn fill(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= params.length) {
        return;
    }
    result[idx] = params.value;
}
`;var Bn=`struct RNGParams {
    seed: u32,
    length: u32,
}

@group(0) @binding(0) var<storage, read_write> output: array<f32>;
@group(0) @binding(1) var<uniform> params: RNGParams;

fn xorshift(state: u32) -> u32 {
    var x = state;
    x ^= x << 13u;
    x ^= x >> 17u;
    x ^= x << 5u;
    return x;
}

fn uint_to_float(x: u32) -> f32 {
    return f32(x) / 4294967296.0;
}

@compute @workgroup_size(256)
fn rand(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= params.length) {
        return;
    }
    var state = params.seed ^ (idx * 1664525u + 1013904223u);
    state = xorshift(state);
    output[idx] = uint_to_float(state);
}

@compute @workgroup_size(256)
fn randn(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= params.length) {
        return;
    }
    var state1 = params.seed ^ (idx * 1664525u + 1013904223u);
    state1 = xorshift(state1);
    var state2 = xorshift(state1);
    let u1 = uint_to_float(state1);
    let u2 = uint_to_float(state2);
    let r = sqrt(-2.0 * log(max(u1, 0.0000001)));
    let theta = 6.283185307179586 * u2;
    output[idx] = r * cos(theta);
}
`;var Ei=`struct Params {
    length: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

var<workgroup> shared_data: array<f32, 256>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>,
       @builtin(local_invocation_id) local_id: vec3<u32>,
       @builtin(workgroup_id) workgroup_id: vec3<u32>) {
    let idx = global_id.x;
    let lid = local_id.x;
    if (idx < params.length) {
        shared_data[lid] = input[idx];
    } else {
        shared_data[lid] = 0.0;
    }
    workgroupBarrier();
    for (var stride = 128u; stride > 0u; stride >>= 1u) {
        if (lid < stride) {
            shared_data[lid] += shared_data[lid + stride];
        }
        workgroupBarrier();
    }
    if (lid == 0u) {
        result[workgroup_id.x] = shared_data[0];
    }
}
`;var Ri=`struct Params {
    length: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

var<workgroup> shared_data: array<f32, 256>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>,
              @builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
    let idx = global_id.x;
    let lid = local_id.x;
    if (idx < params.length) {
        shared_data[lid] = input[idx];
    } else {
        shared_data[lid] = -1.0e38;
    }
    workgroupBarrier();
    for (var stride = 128u; stride > 0u; stride >>= 1u) {
        if (lid < stride) {
            shared_data[lid] = max(shared_data[lid], shared_data[lid + stride]);
        }
        workgroupBarrier();
    }
    if (lid == 0u) {
        result[workgroup_id.x] = shared_data[0];
    }
}
`;var ki=`struct Params {
    length: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

var<workgroup> shared_data: array<f32, 256>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>,
              @builtin(local_invocation_id) local_id: vec3<u32>,
              @builtin(workgroup_id) workgroup_id: vec3<u32>) {
    let idx = global_id.x;
    let lid = local_id.x;
    if (idx < params.length) {
        shared_data[lid] = input[idx];
    } else {
        shared_data[lid] = 1.0e38;
    }
    workgroupBarrier();
    for (var stride = 128u; stride > 0u; stride >>= 1u) {
        if (lid < stride) {
            shared_data[lid] = min(shared_data[lid], shared_data[lid + stride]);
        }
        workgroupBarrier();
    }
    if (lid == 0u) {
        result[workgroup_id.x] = shared_data[0];
    }
}
`;var Bi=`struct Params {
    length: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

var<workgroup> shared_data: array<f32, 256>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>,
       @builtin(local_invocation_id) local_id: vec3<u32>,
       @builtin(workgroup_id) workgroup_id: vec3<u32>) {
    let idx = global_id.x;
    let lid = local_id.x;
    if (idx < params.length) {
        shared_data[lid] = input[idx];
    } else {
        shared_data[lid] = 1.0;
    }
    workgroupBarrier();
    for (var stride = 128u; stride > 0u; stride >>= 1u) {
        if (lid < stride) {
            shared_data[lid] *= shared_data[lid + stride];
        }
        workgroupBarrier();
    }
    if (lid == 0u) {
        result[workgroup_id.x] = shared_data[0];
    }
}
`;var $i=`struct Params {
    batch_size: u32,    // outerSize: number of reduction groups
    reduce_size: u32,   // dimSize: size of the dimension being reduced
    inner_size: u32,    // innerSize: elements within each slice
    op: u32,            // operation: 0=sum, 1=mean, 2=max, 3=min, 4=prod, 5=any, 6=all
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let output_idx = global_id.x;
    let max_idx = params.batch_size * params.inner_size;
    if (output_idx >= max_idx) {
        return;
    }

    // Calculate which batch and inner position this work item handles
    let batch_idx = output_idx / params.inner_size;
    let inner_idx = output_idx % params.inner_size;

    var acc: f32;
    // Initialization based on op
    if (params.op == 0u || params.op == 1u || params.op == 5u) {
        acc = 0.0;
    } else if (params.op == 2u) {
        acc = -1e38;  // Approximate -FLT_MAX for max
    } else if (params.op == 3u) {
        acc = 1e38;   // Approximate FLT_MAX for min
    } else if (params.op == 4u || params.op == 6u) {
        acc = 1.0;
    }

    // Iterate over the reduce dimension, accounting for inner stride
    // global_idx = batch_idx * (reduce_size * inner_size) + r * inner_size + inner_idx
    let stride = params.reduce_size * params.inner_size;
    let batch_base = batch_idx * stride;
    for (var r = 0u; r < params.reduce_size; r++) {
        let global_idx = batch_base + r * params.inner_size + inner_idx;
        let val = input[global_idx];
        if (params.op == 0u || params.op == 1u) {
            acc += val;
        } else if (params.op == 2u) {
            acc = max(acc, val);
        } else if (params.op == 3u) {
            acc = min(acc, val);
        } else if (params.op == 4u) {
            acc *= val;
        } else if (params.op == 5u) {
            if (val != 0.0) { acc = 1.0; break; }
        } else if (params.op == 6u) {
            if (val == 0.0) { acc = 0.0; break; }
        }
    }

    if (params.op == 1u) {
        output[output_idx] = acc / f32(params.reduce_size);
    } else {
        output[output_idx] = acc;
    }
}
`;var $n=`struct Dims {
    M: u32,
    K: u32,
    N: u32,
    batch: u32,
}

@group(0) @binding(0) var<storage, read> A: array<f32>;
@group(0) @binding(1) var<storage, read> B: array<f32>;
@group(0) @binding(2) var<storage, read_write> C: array<f32>;
@group(0) @binding(3) var<uniform> dims: Dims;

const TILE_SIZE: u32 = 16u;
var<workgroup> tileA: array<array<f32, 16>, 16>;
var<workgroup> tileB: array<array<f32, 16>, 16>;

@compute @workgroup_size(16, 16)
fn matmul(@builtin(global_invocation_id) global_id: vec3<u32>,
          @builtin(local_invocation_id) local_id: vec3<u32>) {
    let row = global_id.y;
    let col = global_id.x;
    let localRow = local_id.y;
    let localCol = local_id.x;
    var sum: f32 = 0.0;
    let numTiles = (dims.K + TILE_SIZE - 1u) / TILE_SIZE;
    for (var t = 0u; t < numTiles; t++) {
        let aRow = row;
        let aCol = t * TILE_SIZE + localCol;
        if (aRow < dims.M && aCol < dims.K) {
            tileA[localRow][localCol] = A[aRow * dims.K + aCol];
        } else {
            tileA[localRow][localCol] = 0.0;
        }
        let bRow = t * TILE_SIZE + localRow;
        let bCol = col;
        if (bRow < dims.K && bCol < dims.N) {
            tileB[localRow][localCol] = B[bRow * dims.N + bCol];
        } else {
            tileB[localRow][localCol] = 0.0;
        }
        workgroupBarrier();
        for (var k = 0u; k < TILE_SIZE; k++) {
            sum += tileA[localRow][k] * tileB[k][localCol];
        }
        workgroupBarrier();
    }
    if (row < dims.M && col < dims.N) {
        C[row * dims.N + col] = sum;
    }
}

@compute @workgroup_size(256)
fn matmul_2d(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    let totalElements = dims.M * dims.N;
    if (idx >= totalElements) {
        return;
    }
    let row = idx / dims.N;
    let col = idx % dims.N;
    var sum: f32 = 0.0;
    for (var k = 0u; k < dims.K; k++) {
        sum += A[row * dims.K + k] * B[k * dims.N + col];
    }
    C[idx] = sum;
}

@compute @workgroup_size(256)
fn matmul_3d(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    let totalElements = dims.batch * dims.M * dims.N;
    if (idx >= totalElements) {
        return;
    }
    
    let n = idx % dims.N;
    let m = (idx / dims.N) % dims.M;
    let b = idx / (dims.N * dims.M);
    
    var sum: f32 = 0.0;
    for (var k = 0u; k < dims.K; k++) {
        sum += A[(b * dims.M + m) * dims.K + k] * B[(b * dims.K + k) * dims.N + n];
    }
    C[idx] = sum;
}
`;var Di=`struct Dims {
    rows: u32,
    cols: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> dims: Dims;

@compute @workgroup_size(256)
fn transpose_2d(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    let total = dims.rows * dims.cols;
    if (idx >= total) {
        return;
    }
    let row = idx / dims.cols;
    let col = idx % dims.cols;
    let out_idx = col * dims.rows + row;
    output[out_idx] = input[idx];
}
`;var Ui=`// Log-softmax shader
// Computes log(softmax(x)) along the last dimension

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> dims: vec2<u32>;  // (batch_size, num_classes)

@compute @workgroup_size(1)
fn log_softmax(@builtin(global_invocation_id) gid: vec3<u32>) {
    let batch_idx = gid.x;
    let num_classes = dims.y;

    if (batch_idx >= dims.x) {
        return;
    }

    let offset = batch_idx * num_classes;

    // Find max for numerical stability
    var max_val = input[offset];
    for (var i = 1u; i < num_classes; i++) {
        max_val = max(max_val, input[offset + i]);
    }

    // Compute sum of exp(x - max)
    var sum_exp = 0.0;
    for (var i = 0u; i < num_classes; i++) {
        sum_exp += exp(input[offset + i] - max_val);
    }

    // Compute log_softmax = x - max - log(sum_exp)
    let log_sum_exp = log(sum_exp);
    for (var i = 0u; i < num_classes; i++) {
        output[offset + i] = input[offset + i] - max_val - log_sum_exp;
    }
}
`;var Oi=`// NLL Loss shader
// Computes negative log likelihood loss: -input[targets]

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> targets: array<i32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;
@group(0) @binding(3) var<uniform> dims: vec2<u32>;  // (batch_size, num_classes)

@compute @workgroup_size(256)
fn nll_loss(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let batch_size = dims.x;
    let num_classes = dims.y;

    if (idx >= batch_size) {
        return;
    }

    // Get target class for this batch item
    let target_class = targets[idx];

    // Loss is -log_prob[target_class]
    let log_prob = input[idx * num_classes + u32(target_class)];
    output[idx] = -log_prob;
}
`;var Ii=`// Argmax shader - finds index of max value along the last dimension

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<i32>;
@group(0) @binding(2) var<uniform> dims: vec2<u32>;  // (batch_size, num_elements)

@compute @workgroup_size(256)
fn argmax(@builtin(global_invocation_id) gid: vec3<u32>) {
    let batch_idx = gid.x;
    let batch_size = dims.x;
    let num_elements = dims.y;

    if (batch_idx >= batch_size) {
        return;
    }

    let offset = batch_idx * num_elements;

    // Find max value and its index
    var max_val = input[offset];
    var max_idx = 0u;

    for (var i = 1u; i < num_elements; i++) {
        let val = input[offset + i];
        if (val > max_val) {
            max_val = val;
            max_idx = i;
        }
    }

    output[batch_idx] = i32(max_idx);
}
`;var Hi=`// Argmin shader - finds index of min value along the last dimension

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<i32>;
@group(0) @binding(2) var<uniform> dims: vec2<u32>;  // (batch_size, num_elements)

@compute @workgroup_size(256)
fn argmin(@builtin(global_invocation_id) gid: vec3<u32>) {
    let batch_idx = gid.x;
    let batch_size = dims.x;
    let num_elements = dims.y;

    if (batch_idx >= batch_size) {
        return;
    }

    let offset = batch_idx * num_elements;

    // Find min value and its index
    var min_val = input[offset];
    var min_idx = 0u;

    for (var i = 1u; i < num_elements; i++) {
        let val = input[offset + i];
        if (val < min_val) {
            min_val = val;
            min_idx = i;
        }
    }

    output[batch_idx] = i32(min_idx);
}
`;var Nr=`// Element-wise comparison operations

@group(0) @binding(0) var<storage, read> a: array<f32>;
@group(0) @binding(1) var<storage, read> b: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;

// Element-wise equality: output[i] = 1.0 if a[i] == b[i], else 0.0
@compute @workgroup_size(256)
fn eq(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] == b[idx]);
}

// Element-wise not equal
@compute @workgroup_size(256)
fn ne(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] != b[idx]);
}

// Element-wise less than
@compute @workgroup_size(256)
fn lt(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] < b[idx]);
}

// Element-wise less than or equal
@compute @workgroup_size(256)
fn le(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] <= b[idx]);
}

// Element-wise greater than
@compute @workgroup_size(256)
fn gt(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] > b[idx]);
}

// Element-wise greater than or equal
@compute @workgroup_size(256)
fn ge(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&a)) {
        return;
    }
    output[idx] = select(0.0, 1.0, a[idx] >= b[idx]);
}

@compute @workgroup_size(256)
fn maximum_op(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&output)) { return; }
    output[idx] = max(a[idx], b[idx]);
}

@compute @workgroup_size(256)
fn minimum_op(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&output)) { return; }
    output[idx] = min(a[idx], b[idx]);
}

@compute @workgroup_size(256)
fn fmax_op(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&output)) { return; }
    // fmax in PyTorch handles NaNs differently (propagates non-NaN if one is NaN)
    // WGSL max() behavior on NaN is same as JS Math.max (propagates NaN)
    // To match fmax: if one is NaN, take the other.
    let va = a[idx];
    let vb = b[idx];
    if (va != va) { output[idx] = vb; }
    else if (vb != vb) { output[idx] = va; }
    else { output[idx] = max(va, vb); }
}

@compute @workgroup_size(256)
fn fmin_op(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&output)) { return; }
    let va = a[idx];
    let vb = b[idx];
    if (va != va) { output[idx] = vb; }
    else if (vb != vb) { output[idx] = va; }
    else { output[idx] = min(va, vb); }
}
`;var Ci=`/**\r
 * Index select (gather) operation along a dimension.\r
 * For 2D tensors: output[i, j] = input[indices[i], j] when dim=0\r
 *                 output[i, j] = input[i, indices[j]] when dim=1\r
 */\r
\r
@group(0) @binding(0) var<storage, read> input: array<f32>;\r
@group(0) @binding(1) var<storage, read> indices: array<f32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r
\r
struct Params {\r
  dim: u32,           // Dimension to index along\r
  input_dim0: u32,    // Input shape[0]\r
  input_dim1: u32,    // Input shape[1]\r
  num_indices: u32,   // Number of indices\r
}\r
\r
@group(0) @binding(3) var<uniform> params: Params;\r
\r
@compute @workgroup_size(256)\r
fn index_select_2d(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
  let output_size = select(params.num_indices * params.input_dim1,\r
                           params.input_dim0 * params.num_indices,\r
                           params.dim == 0u);\r
  let idx = global_id.x;\r
  if (idx >= output_size) {\r
    return;\r
  }\r
\r
  if (params.dim == 0u) {\r
    // Indexing along dim 0: output[i, j] = input[indices[i], j]\r
    let i = idx / params.input_dim1;\r
    let j = idx % params.input_dim1;\r
    let input_row = u32(indices[i]);\r
    output[idx] = input[input_row * params.input_dim1 + j];\r
  } else {\r
    // Indexing along dim 1: output[i, j] = input[i, indices[j]]\r
    let i = idx / params.num_indices;\r
    let j = idx % params.num_indices;\r
    let input_col = u32(indices[j]);\r
    output[idx] = input[i * params.input_dim1 + input_col];\r
  }\r
}\r
\r
// For 1D tensors: simple gather\r
@compute @workgroup_size(256)\r
fn index_select_1d(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
  let idx = global_id.x;\r
  if (idx >= params.num_indices) {\r
    return;\r
  }\r
\r
  let input_idx = u32(indices[idx]);\r
  output[idx] = input[input_idx];\r
}\r
`;var Li=`/**
 * Slice operation for tensors.
 * Supports multi-dimensional slicing with start:stop:step semantics.
 */

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

// Slice parameters for each dimension (up to 4D)
struct SliceParams {
  // Input shape (padded to 4D)
  input_shape: vec4<u32>,
  // Output shape (padded to 4D)
  output_shape: vec4<u32>,
  // Start indices for each dimension
  starts: vec4<i32>,
  // Step sizes for each dimension
  steps: vec4<i32>,
  // Number of dimensions
  ndim: u32,
  // Total output elements
  output_size: u32,
  _pad0: u32,
  _pad1: u32,
}

@group(0) @binding(2) var<uniform> params: SliceParams;

@compute @workgroup_size(256)
fn slice(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let idx = global_id.x;
  if (idx >= params.output_size) {
    return;
  }

  // Compute strides (left-aligned)
  var out_strides: array<u32, 4>;
  var in_strides: array<u32, 4>;
  
  for (var i = 0u; i < 4u; i++) {
    out_strides[i] = 1u;
    in_strides[i] = 1u;
  }

  if (params.ndim > 0u) {
    out_strides[params.ndim - 1u] = 1u;
    in_strides[params.ndim - 1u] = 1u;
    for (var d = i32(params.ndim) - 2; d >= 0; d--) {
      out_strides[d] = out_strides[d + 1] * params.output_shape[d + 1];
      in_strides[d] = in_strides[d + 1] * params.input_shape[d + 1];
    }
  }

  // Convert flat output index to multi-dimensional output coordinates
  var out_coords: array<u32, 4>;
  var remaining = idx;

  for (var d = 0u; d < params.ndim; d++) {
    out_coords[d] = remaining / out_strides[d];
    remaining = remaining % out_strides[d];
  }

  // Map output coordinates to input coordinates using slice params
  var in_idx = 0u;
  for (var d = 0u; d < params.ndim; d++) {
    let in_coord = u32(params.starts[d]) + out_coords[d] * u32(params.steps[d]);
    in_idx += in_coord * in_strides[d];
  }

  output[idx] = input[in_idx];
}
`;var Vi=`/**\r
 * Slice backward operation for tensors.\r
 * Maps gradients from sliced shape back to original shape.\r
 */\r
\r
@group(0) @binding(0) var<storage, read> grad_output: array<f32>;\r
@group(0) @binding(1) var<storage, read_write> grad_input: array<f32>;\r
\r
// Slice parameters for each dimension (up to 4D)\r
struct SliceParams {\r
  // Input shape (the sliced tensor shape, padded to 4D)\r
  input_shape: vec4<u32>,\r
  // Output shape (the original full tensor shape, padded to 4D)\r
  output_shape: vec4<u32>,\r
  // Start indices for each dimension\r
  starts: vec4<i32>,\r
  // Step sizes for each dimension\r
  steps: vec4<i32>,\r
  // Number of dimensions\r
  ndim: u32,\r
  // Total elements in the grad_output (sliced tensor)\r
  grad_size: u32,\r
  _pad0: u32,\r
  _pad1: u32,\r
}\r
\r
@group(0) @binding(2) var<uniform> params: SliceParams;\r
\r
@compute @workgroup_size(256)\r
fn slice_backward(@builtin(global_invocation_id) global_id: vec3<u32>) {\r
  let idx = global_id.x;\r
  if (idx >= params.grad_size) {\r
    return;\r
  }\r
\r
  // Compute strides (left-aligned)\r
  var out_strides: array<u32, 4>;\r
  var in_strides: array<u32, 4>;\r
  \r
  for (var i = 0u; i < 4u; i++) {\r
    out_strides[i] = 1u;\r
    in_strides[i] = 1u;\r
  }\r
\r
  if (params.ndim > 0u) {\r
    out_strides[params.ndim - 1u] = 1u;\r
    in_strides[params.ndim - 1u] = 1u;\r
    for (var d = i32(params.ndim) - 2; d >= 0; d--) {\r
      // output_shape is the original tensor shape\r
      out_strides[d] = out_strides[d + 1] * params.output_shape[d + 1];\r
      // input_shape is the sliced tensor shape\r
      in_strides[d] = in_strides[d + 1] * params.input_shape[d + 1];\r
    }\r
  }\r
\r
  // Convert flat index of grad_output (which is sliced shape) to multi-dimensional coordinates\r
  var in_coords: array<u32, 4>;\r
  var remaining = idx;\r
\r
  for (var d = 0u; d < params.ndim; d++) {\r
    in_coords[d] = remaining / in_strides[d];\r
    remaining = remaining % in_strides[d];\r
  }\r
\r
  // Map coordinates to original tensor coordinates\r
  var out_idx = 0u;\r
  for (var d = 0u; d < params.ndim; d++) {\r
    let out_coord = u32(params.starts[d]) + in_coords[d] * u32(params.steps[d]);\r
    out_idx += out_coord * out_strides[d];\r
  }\r
\r
  // Atomically add the gradient (since multiple sliced indices could theoretically map to same original index if step=0, but step > 0 normally)\r
  // For standard slice, it's safe to just assign, but we can just use simple assignment since slices are unique.\r
  grad_input[out_idx] = grad_output[idx];\r
}\r
`;var Fi=`// NLL Loss backward shader
// Computes gradient: -1/batch_size at target index, 0 elsewhere

@group(0) @binding(0) var<storage, read> targets: array<i32>;
@group(0) @binding(1) var<storage, read_write> grad_input: array<f32>;

struct Params {
  batch_size: u32,
  num_classes: u32,
  scale: f32,  // 1.0 for sum reduction, 1/batch_size for mean
  _pad: u32,
}

@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn nll_loss_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let total_size = params.batch_size * params.num_classes;

  if (idx >= total_size) {
    return;
  }

  // Compute batch index and class index
  let batch_idx = idx / params.num_classes;
  let class_idx = idx % params.num_classes;

  // Get target for this batch
  let target_class = u32(targets[batch_idx]);

  // Gradient is -scale at target index, 0 elsewhere
  if (class_idx == target_class) {
    grad_input[idx] = -params.scale;
  } else {
    grad_input[idx] = 0.0;
  }
}
`;var Gi=`/**
 * Log softmax backward gradient computation.
 * grad[i,j] = gradOutput[i,j] - softmax[i,j] * sum_k(gradOutput[i,k])
 * @status implemented
 */

@group(0) @binding(0) var<storage, read> grad_output: array<f32>;
@group(0) @binding(1) var<storage, read> softmax: array<f32>;
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;

struct Dims {
  batch_size: u32,
  num_classes: u32,
}
@group(0) @binding(3) var<uniform> dims: Dims;

@compute @workgroup_size(256)
fn log_softmax_backward(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let idx = global_id.x;
  let total = dims.batch_size * dims.num_classes;
  if (idx >= total) { return; }

  let i = idx / dims.num_classes;  // batch index
  let j = idx % dims.num_classes;  // class index

  // Sum gradOutput along row i
  var grad_sum = 0.0;
  for (var k = 0u; k < dims.num_classes; k++) {
    grad_sum += grad_output[i * dims.num_classes + k];
  }

  // grad[i,j] = gradOutput[i,j] - softmax[i,j] * grad_sum
  grad_input[idx] = grad_output[idx] - softmax[idx] * grad_sum;
}
`;var Ni=`// Softmax backward gradient computation.
// grad_input = softmax * (grad_output - sum(grad_output * softmax) along last dim)

@group(0) @binding(0) var<storage, read> grad_output: array<f32>;
@group(0) @binding(1) var<storage, read> softmax: array<f32>;
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;

struct Dims {
  batch_size: u32,
  num_classes: u32,
  _pad0: u32,
  _pad1: u32,
}

@group(0) @binding(3) var<uniform> dims: Dims;

@compute @workgroup_size(64)
fn softmax_backward(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let idx = global_id.x;
  let total = dims.batch_size * dims.num_classes;
  if (idx >= total) { return; }

  let row = idx / dims.num_classes;
  let col = idx % dims.num_classes;

  var dot: f32 = 0.0;
  for (var k: u32 = 0u; k < dims.num_classes; k = k + 1u) {
    let offset = row * dims.num_classes + k;
    dot = dot + grad_output[offset] * softmax[offset];
  }

  let out_idx = row * dims.num_classes + col;
  let s = softmax[out_idx];
  grad_input[out_idx] = s * (grad_output[out_idx] - dot);
}

`;var ji=`struct Params {
  value: f32,
  size: u32,
  _pad1: u32,
  _pad2: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> mask: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;
@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= params.size) { return; }

  // mask == 0 means we use original value, mask != 0 means we use fill value
  if (mask[idx] != 0.0) {
    output[idx] = params.value;
  } else {
    output[idx] = input[idx];
  }
}
`;var Wi=`@group(0) @binding(0) var<storage, read> condition: array<f32>;
@group(0) @binding(1) var<storage, read> x: array<f32>;
@group(0) @binding(2) var<storage, read> y: array<f32>;
@group(0) @binding(3) var<storage, read_write> result: array<f32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    if (idx >= arrayLength(&result)) { return; }
    if (condition[idx] > 0.0) {
        result[idx] = x[idx];
    } else {
        result[idx] = y[idx];
    }
}
`;var qi=`@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> gamma: array<f32>;
@group(0) @binding(2) var<storage, read> beta: array<f32>;
@group(0) @binding(3) var<storage, read_write> output: array<f32>;

struct Params {
  batch_size: u32,
  normalized_size: u32,
  eps: f32,
  _pad: u32,
}
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let batch_idx = gid.x;
  if (batch_idx >= params.batch_size) { return; }

  let offset = batch_idx * params.normalized_size;

  // Compute mean
  var sum = 0.0;
  for (var i = 0u; i < params.normalized_size; i++) {
    sum += input[offset + i];
  }
  let mean = sum / f32(params.normalized_size);

  // Compute variance
  var var_sum = 0.0;
  for (var i = 0u; i < params.normalized_size; i++) {
    let diff = input[offset + i] - mean;
    var_sum += diff * diff;
  }
  let variance = var_sum / f32(params.normalized_size);
  let inv_std = 1.0 / sqrt(variance + params.eps);

  // Normalize and apply affine transform
  for (var i = 0u; i < params.normalized_size; i++) {
    let normalized = (input[offset + i] - mean) * inv_std;
    output[offset + i] = gamma[i] * normalized + beta[i];
  }
}
`;var Yi=`@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

struct Params {
  rows: u32,
  cols: u32,
  diagonal: i32,
  _pad: u32,
}
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let total = params.rows * params.cols;
  if (idx >= total) { return; }

  let row = idx / params.cols;
  let col = idx % params.cols;

  // Keep element if col <= row + diagonal
  if (i32(col) <= i32(row) + params.diagonal) {
    output[idx] = input[idx];
  } else {
    output[idx] = 0.0;
  }
}
`;var Ki=`@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

struct Params {
  rows: u32,
  cols: u32,
  diagonal: i32,
  _pad: u32,
}
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let total = params.rows * params.cols;
  if (idx >= total) { return; }

  let row = idx / params.cols;
  let col = idx % params.cols;

  if (i32(col) >= i32(row) + params.diagonal) {
    output[idx] = input[idx];
  } else {
    output[idx] = 0.0;
  }
}
`;var Xi=`struct Params {
    batch_size: u32,
    dim_size: u32,
    stride: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = arrayLength(&output);
    if (idx >= total) { return; }

    let stride_after = params.stride;
    let dim_size = params.dim_size;
    
    let after_idx = idx % stride_after;
    let mid_idx = (idx / stride_after) % dim_size;
    let before_idx = idx / (stride_after * dim_size);
    
    let flipped_mid = dim_size - 1u - mid_idx;
    let input_idx = (before_idx * dim_size + flipped_mid) * stride_after + after_idx;
    
    output[idx] = input[input_idx];
}
`;var Qi=`struct Params {
    batch_size: u32,
    reduce_size: u32,
    _pad1: u32,
    _pad2: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let batch_idx = gid.x;
    if (batch_idx >= params.batch_size) { return; }

    let offset = batch_idx * params.reduce_size;
    var acc: f32 = 0.0;
    for (var i = 0u; i < params.reduce_size; i++) {
        acc += input[offset + i];
        output[offset + i] = acc;
    }
}
`;var Zi=`struct Params {
    batch_size: u32,
    reduce_size: u32,
    _pad1: u32,
    _pad2: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let batch_idx = gid.x;
    if (batch_idx >= params.batch_size) { return; }

    let offset = batch_idx * params.reduce_size;
    var acc: f32 = 1.0;
    for (var i = 0u; i < params.reduce_size; i++) {
        acc *= input[offset + i];
        output[offset + i] = acc;
    }
}
`;var Ji=`struct Params {
    min_val: f32,
    max_val: f32,
    total: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= params.total) { return; }
    
    result[idx] = clamp(input[idx], params.min_val, params.max_val);
}
`;var es=`struct Dims {
    N: u32,
    batch: u32,
    k: u32, // current step
}

@group(0) @binding(0) var<storage, read_write> A: array<f32>;
@group(0) @binding(1) var<uniform> dims: Dims;

// Pass 1: Update column k
@compute @workgroup_size(256)
fn cholesky_step1(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let b = global_id.x;
    if (b >= dims.batch) {
        return;
    }
    
    let n = dims.N;
    let k = dims.k;
    let offset = b * n * n;
    
    let akk = A[offset + k * n + k];
    if (akk <= 0.0) {
        // Matrix is not positive definite
        // In PyTorch, this would throw an error or return NaN
        // For now we just set to NaN or something
        A[offset + k * n + k] = bitcast<f32>(0x7fc00000u);
        return;
    }
    
    let sqrt_akk = sqrt(akk);
    A[offset + k * n + k] = sqrt_akk;
    
    for (var i = k + 1u; i < n; i++) {
        A[offset + i * n + k] /= sqrt_akk;
    }
}

// Pass 2: Rank-1 update of the remaining submatrix
@compute @workgroup_size(16, 16)
fn cholesky_step2(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let i = global_id.y + dims.k + 1u;
    let j = global_id.x + dims.k + 1u;
    let b = global_id.z;
    
    let n = dims.N;
    let k = dims.k;
    
    if (b >= dims.batch || i >= n || j >= n || j > i) {
        return;
    }
    
    let offset = b * n * n;
    let val = A[offset + i * n + k] * A[offset + j * n + k];
    A[offset + i * n + j] -= val;
}

// Full Cholesky for small matrices in a single pass (if N is small)
@compute @workgroup_size(256)
fn cholesky_small(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let b = global_id.x;
    if (b >= dims.batch) {
        return;
    }
    
    let n = dims.N;
    let offset = b * n * n;
    
    for (var k = 0u; k < n; k++) {
        var akk = A[offset + k * n + k];
        for (var s = 0u; s < k; s++) {
            let lks = A[offset + k * n + s];
            akk -= lks * lks;
        }
        
        if (akk <= 0.0) {
            A[offset + k * n + k] = bitcast<f32>(0x7fc00000u);
            return;
        }
        
        let sqrt_akk = sqrt(akk);
        A[offset + k * n + k] = sqrt_akk;
        
        for (var i = k + 1u; i < n; i++) {
            var aik = A[offset + i * n + k];
            for (var s = 0u; s < k; s++) {
                aik -= A[offset + i * n + s] * A[offset + k * n + s];
            }
            A[offset + i * n + k] = aik / sqrt_akk;
        }
    }
    
    // Zero out upper triangle
    for (var i = 0u; i < n; i++) {
        for (var j = i + 1u; j < n; j++) {
            A[offset + i * n + j] = 0.0;
        }
    }
}
`;var ts=`struct Dims {
    N: u32,
    M: u32, // num RHS columns (for B)
    batch: u32,
    k: u32, // current step
}

@group(0) @binding(0) var<storage, read> A: array<f32>;
@group(0) @binding(1) var<storage, read_write> B: array<f32>;
@group(0) @binding(2) var<uniform> dims: Dims;

// Forward substitution step (for lower triangular)
// AX = B => X_kj = (B_kj - sum_{s=0}^{k-1} A_ks * X_sj) / A_kk
@compute @workgroup_size(256)
fn forward_sub_step(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let j = global_id.x; // column of B
    let b = global_id.y; // batch
    if (j >= dims.M || b >= dims.batch) {
        return;
    }
    
    let n = dims.N;
    let k = dims.k;
    let offsetA = b * n * n;
    let offsetB = b * n * dims.M;
    
    var val = B[offsetB + k * dims.M + j];
    for (var s = 0u; s < k; s++) {
        val -= A[offsetA + k * n + s] * B[offsetB + s * dims.M + j];
    }
    
    B[offsetB + k * dims.M + j] = val / A[offsetA + k * n + k];
}

// Backward substitution step (for upper triangular)
// AX = B => X_kj = (B_kj - sum_{s=k+1}^{n-1} A_ks * X_sj) / A_kk
@compute @workgroup_size(256)
fn backward_sub_step(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let j = global_id.x; // column of B
    let b = global_id.y; // batch
    if (j >= dims.M || b >= dims.batch) {
        return;
    }
    
    let n = dims.N;
    let k = dims.k;
    let offsetA = b * n * n;
    let offsetB = b * n * dims.M;
    
    var val = B[offsetB + k * dims.M + j];
    for (var s = k + 1u; s < n; s++) {
        val -= A[offsetA + k * n + s] * B[offsetB + s * dims.M + j];
    }
    
    B[offsetB + k * dims.M + j] = val / A[offsetA + k * n + k];
}
`;var Dn=`struct Dims {
    N: u32,
    batch: u32,
    k: u32,
}

@group(0) @binding(0) var<storage, read_write> A: array<f32>;
@group(0) @binding(1) var<storage, read_write> P: array<u32>;
@group(0) @binding(2) var<uniform> dims: Dims;

@compute @workgroup_size(256)
fn lu_pivot(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let b = global_id.x;
    if (b >= dims.batch) {
        return;
    }
    
    // Explicit use of P to ensure it's in the layout
    if (P[0] == 0xffffffffu) { return; }

    let n = dims.N;
    let k = dims.k;
    let offset = b * n * n;
    let pOffset = b * n;
    
    var maxVal: f32 = 0.0;
    var pivotRow: u32 = k;
    for (var i = k; i < n; i = i + 1u) {
        let val = abs(A[offset + i * n + k]);
        if (val > maxVal) {
            maxVal = val;
            pivotRow = i;
        }
    }
    
    if (pivotRow != k) {
        for (var j = 0u; j < n; j = j + 1u) {
            let temp = A[offset + k * n + j];
            A[offset + k * n + j] = A[offset + pivotRow * n + j];
            A[offset + pivotRow * n + j] = temp;
        }
        let tempP = P[pOffset + k];
        P[pOffset + k] = P[pOffset + pivotRow];
        P[pOffset + pivotRow] = tempP;
    }
}

@compute @workgroup_size(16, 16)
fn lu_update(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let i = global_id.y + dims.k + 1u;
    let j = global_id.x + dims.k + 1u;
    let b = global_id.z;
    
    let n = dims.N;
    let k = dims.k;
    
    if (b >= dims.batch || i >= n) {
        return;
    }
    
    // Explicit use of P to ensure it's in the layout
    if (P[0] == 0xffffffffu) { return; }

    let offset = b * n * n;
    
    if (j == k + 1u) {
        let pivotVal = A[offset + k * n + k];
        if (abs(pivotVal) > 1e-9) {
            A[offset + i * n + k] /= pivotVal;
        }
    }
    
    workgroupBarrier();
    
    if (j < n) {
        A[offset + i * n + j] -= A[offset + i * n + k] * A[offset + k * n + j];
    }
}
`;var rs=`struct Params {
    batch: u32,
    in_channels: u32,
    out_channels: u32,
    in_h: u32,
    in_w: u32,
    out_h: u32,
    out_w: u32,
    kernel_h: u32,
    kernel_w: u32,
    stride_h: u32,
    stride_w: u32,
    pad_h: u32,
    pad_w: u32,
    groups: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> weight: array<f32>;
@group(0) @binding(2) var<storage, read> bias: array<f32>;
@group(0) @binding(3) var<storage, read_write> output: array<f32>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(256)
fn conv2d(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.batch * params.out_channels * params.out_h * params.out_w;
    if (idx >= total) { return; }

    let ow = idx % params.out_w;
    let oh = (idx / params.out_w) % params.out_h;
    let oc = (idx / (params.out_w * params.out_h)) % params.out_channels;
    let b = idx / (params.out_channels * params.out_h * params.out_w);

    let ic_per_group = params.in_channels / params.groups;
    let g = oc / (params.out_channels / params.groups);

    var sum = 0.0;
    for (var kc = 0u; kc < ic_per_group; kc++) {
        let ic = g * ic_per_group + kc;
        for (var kh = 0u; kh < params.kernel_h; kh++) {
            let ih = i32(oh * params.stride_h + kh) - i32(params.pad_h);
            for (var kw = 0u; kw < params.kernel_w; kw++) {
                let iw = i32(ow * params.stride_w + kw) - i32(params.pad_w);
                if (ih >= 0 && i32(ih) < i32(params.in_h) && iw >= 0 && i32(iw) < i32(params.in_w)) {
                    let inp_idx = ((b * params.in_channels + ic) * params.in_h + u32(ih)) * params.in_w + u32(iw);
                    let w_idx = ((oc * ic_per_group + kc) * params.kernel_h + kh) * params.kernel_w + kw;
                    sum += input[inp_idx] * weight[w_idx];
                }
            }
        }
    }

    let has_bias = params.out_channels > 0u;
    if (has_bias) {
        sum += bias[oc];
    }
    output[idx] = sum;
}

@compute @workgroup_size(256)
fn conv1d(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.batch * params.out_channels * params.out_w;
    if (idx >= total) { return; }

    let ow = idx % params.out_w;
    let oc = (idx / params.out_w) % params.out_channels;
    let b = idx / (params.out_channels * params.out_w);

    let ic_per_group = params.in_channels / params.groups;
    let g = oc / (params.out_channels / params.groups);

    var sum = 0.0;
    for (var kc = 0u; kc < ic_per_group; kc++) {
        let ic = g * ic_per_group + kc;
        for (var kw = 0u; kw < params.kernel_w; kw++) {
            let iw = i32(ow * params.stride_w + kw) - i32(params.pad_w);
            if (iw >= 0 && i32(iw) < i32(params.in_w)) {
                let inp_idx = (b * params.in_channels + ic) * params.in_w + u32(iw);
                let w_idx = (oc * ic_per_group + kc) * params.kernel_w + kw;
                sum += input[inp_idx] * weight[w_idx];
            }
        }
    }

    let has_bias = params.out_channels > 0u;
    if (has_bias) {
        sum += bias[oc];
    }
    output[idx] = sum;
}
`;var jr=`struct Params {
    batch: u32,
    in_channels: u32,
    out_channels: u32,
    in_h: u32,
    in_w: u32,
    out_h: u32,
    out_w: u32,
    kernel_h: u32,
    kernel_w: u32,
    stride_h: u32,
    stride_w: u32,
    pad_h: u32,
    pad_w: u32,
    groups: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read> grad_output: array<f32>;
@group(0) @binding(1) var<storage, read> weight: array<f32>;
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;
@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(256)
fn conv2d_input_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.batch * params.in_channels * params.in_h * params.in_w;
    if (idx >= total) { return; }

    let iw = idx % params.in_w;
    let ih = (idx / params.in_w) % params.in_h;
    let ic = (idx / (params.in_w * params.in_h)) % params.in_channels;
    let b = idx / (params.in_channels * params.in_h * params.in_w);

    let ic_per_group = params.in_channels / params.groups;
    let g = ic / ic_per_group;

    var sum = 0.0;
    for (var kh = 0u; kh < params.kernel_h; kh++) {
        for (var kw = 0u; kw < params.kernel_w; kw++) {
            let oh_base = i32(ih) + i32(params.pad_h) - i32(kh);
            let ow_base = i32(iw) + i32(params.pad_w) - i32(kw);
            
            if (oh_base >= 0 && ow_base >= 0 && 
                oh_base % i32(params.stride_h) == 0 && ow_base % i32(params.stride_w) == 0) {
                
                let oh = u32(oh_base) / params.stride_h;
                let ow = u32(ow_base) / params.stride_w;
                
                if (oh < params.out_h && ow < params.out_w) {
                    for (var oc = g * (params.out_channels / params.groups); oc < (g + 1u) * (params.out_channels / params.groups); oc++) {
                        let grad_out_idx = ((b * params.out_channels + oc) * params.out_h + oh) * params.out_w + ow;
                        let w_idx = ((oc * ic_per_group + (ic % ic_per_group)) * params.kernel_h + kh) * params.kernel_w + kw;
                        sum += grad_output[grad_out_idx] * weight[w_idx];
                    }
                }
            }
        }
    }
    grad_input[idx] = sum;
}

@group(0) @binding(4) var<storage, read_write> grad_weight: array<f32>;
@group(0) @binding(5) var<storage, read> input: array<f32>;

@compute @workgroup_size(256)
fn conv2d_weight_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.out_channels * params.in_channels * params.kernel_h * params.kernel_w;
    if (idx >= total) { return; }

    let kw = idx % params.kernel_w;
    let kh = (idx / params.kernel_w) % params.kernel_h;
    let ic = (idx / (params.kernel_w * params.kernel_h)) % params.in_channels;
    let oc = idx / (params.kernel_w * params.kernel_h * params.in_channels);

    let ic_per_group = params.in_channels / params.groups;
    let g = oc / (params.out_channels / params.groups);
    
    if (ic < g * ic_per_group || ic >= (g + 1u) * ic_per_group) {
        grad_weight[idx] = 0.0;
        return;
    }

    var sum = 0.0;
    for (var b = 0u; b < params.batch; b++) {
        for (var oh = 0u; oh < params.out_h; oh++) {
            for (var ow = 0u; ow < params.out_w; ow++) {
                let ih = i32(oh * params.stride_h + kh) - i32(params.pad_h);
                let iw = i32(ow * params.stride_w + kw) - i32(params.pad_w);
                
                if (ih >= 0 && i32(ih) < i32(params.in_h) && iw >= 0 && i32(iw) < i32(params.in_w)) {
                    let inp_idx = ((b * params.in_channels + ic) * params.in_h + u32(ih)) * params.in_w + u32(iw);
                    let grad_out_idx = ((b * params.out_channels + oc) * params.out_h + oh) * params.out_w + ow;
                    sum += grad_output[grad_out_idx] * input[inp_idx];
                }
            }
        }
    }
    grad_weight[idx] = sum;
}

@compute @workgroup_size(256)
fn conv2d_bias_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.out_channels;
    if (idx >= total) { return; }

    var sum = 0.0;
    for (var b = 0u; b < params.batch; b++) {
        for (var oh = 0u; oh < params.out_h; oh++) {
            for (var ow = 0u; ow < params.out_w; ow++) {
                let grad_out_idx = ((b * params.out_channels + idx) * params.out_h + oh) * params.out_w + ow;
                sum += grad_output[grad_out_idx];
            }
        }
    }
    grad_weight[idx] = sum;
}
`;var ns=`struct Params {
    batch: u32,
    channels: u32,
    in_h: u32,
    in_w: u32,
    out_h: u32,
    out_w: u32,
    kernel_h: u32,
    kernel_w: u32,
    stride_h: u32,
    stride_w: u32,
    pad_h: u32,
    pad_w: u32,
    dilation_h: u32,
    dilation_w: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.batch * params.channels * params.out_h * params.out_w;
    if (idx >= total) { return; }

    let ow = idx % params.out_w;
    let oh = (idx / params.out_w) % params.out_h;
    let c = (idx / (params.out_w * params.out_h)) % params.channels;
    let b = idx / (params.channels * params.out_h * params.out_w);

    var max_val = -3.402823e+38;
    for (var kh = 0u; kh < params.kernel_h; kh++) {
        let ih = i32(oh * params.stride_h + kh * params.dilation_h) - i32(params.pad_h);
        for (var kw = 0u; kw < params.kernel_w; kw++) {
            let iw = i32(ow * params.stride_w + kw * params.dilation_w) - i32(params.pad_w);
            if (ih >= 0 && u32(ih) < params.in_h && iw >= 0 && u32(iw) < params.in_w) {
                let inp_idx = ((b * params.channels + c) * params.in_h + u32(ih)) * params.in_w + u32(iw);
                let val = input[inp_idx];
                if (val > max_val) {
                    max_val = val;
                }
            }
        }
    }

    output[idx] = max_val;
}
`;var is=`struct Params {
    batch: u32,
    channels: u32,
    in_h: u32,
    in_w: u32,
    out_h: u32,
    out_w: u32,
    kernel_h: u32,
    kernel_w: u32,
    stride_h: u32,
    stride_w: u32,
    pad_h: u32,
    pad_w: u32,
    count_include_pad: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    let total = params.batch * params.channels * params.out_h * params.out_w;
    if (idx >= total) { return; }

    let ow = idx % params.out_w;
    let oh = (idx / params.out_w) % params.out_h;
    let c = (idx / (params.out_w * params.out_h)) % params.channels;
    let b = idx / (params.channels * params.out_h * params.out_w);

    var sum = 0.0;
    var count = 0u;
    for (var kh = 0u; kh < params.kernel_h; kh++) {
        let ih = i32(oh * params.stride_h + kh) - i32(params.pad_h);
        for (var kw = 0u; kw < params.kernel_w; kw++) {
            let iw = i32(ow * params.stride_w + kw) - i32(params.pad_w);
            if (ih >= 0 && u32(ih) < params.in_h && iw >= 0 && u32(iw) < params.in_w) {
                let inp_idx = ((b * params.channels + c) * params.in_h + u32(ih)) * params.in_w + u32(iw);
                sum += input[inp_idx];
                count++;
            } else if (params.count_include_pad > 0u) {
                count++;
            }
        }
    }

    if (count > 0u) {
        output[idx] = sum / f32(count);
    } else {
        output[idx] = 0.0;
    }
}
`;var ss=`struct Params {
    batch: u32,
    channels: u32,
    spatial: u32,
    eps: f32,
    _pad0: u32,
    _pad1: u32,
    _pad2: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> weight: array<f32>;
@group(0) @binding(2) var<storage, read> bias: array<f32>;
@group(0) @binding(3) var<storage, read> mean: array<f32>;
@group(0) @binding(4) var<storage, read> inv_std: array<f32>;
@group(0) @binding(5) var<storage, read_write> output: array<f32>;
@group(0) @binding(6) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;
    // For (N, C, L) -> total = N * C * L
    // For (N, C, H, W) -> total = N * C * H * W
    let total = params.batch * params.channels * params.spatial;
    if (idx >= total) { return; }

    let spatial_idx = idx % params.spatial;
    let c = (idx / params.spatial) % params.channels;
    let b = idx / (params.channels * params.spatial);

    let inp_idx = ((b * params.channels + c) * params.spatial) + spatial_idx;
    let normalized = (input[inp_idx] - mean[c]) * inv_std[c];
    output[inp_idx] = weight[c] * normalized + bias[c];
}
`;var as=`struct CatParams {
  a_shape: vec4<u32>,
  b_shape: vec4<u32>,
  out_shape: vec4<u32>,
  dim: u32,
  ndim: u32,
  pad0: u32,
  pad1: u32,
}

@group(0) @binding(0) var<storage, read> input_a: array<f32>;
@group(0) @binding(1) var<storage, read> input_b: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;
@group(0) @binding(3) var<uniform> params: CatParams;

fn get_stride(shape: vec4<u32>, d: u32) -> u32 {
  var s = 1u;
  for (var i = 3u; i > d; i--) {
    s = s * shape[i];
  }
  return s;
}

fn flat_index(coords: vec4<u32>, shape: vec4<u32>) -> u32 {
  var idx = 0u;
  var stride = 1u;
  for (var i = 3u; ; i--) {
    idx = idx + coords[i] * stride;
    if (i == 0u) { break; }
    stride = stride * shape[i];
  }
  return idx;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= params.out_shape[0] * params.out_shape[1] * params.out_shape[2] * params.out_shape[3]) {
    return;
  }

  var remaining = idx;
  var coords: vec4<u32>;
  for (var i = 0u; i < 4u; i++) {
    let stride = get_stride(params.out_shape, i);
    coords[i] = remaining / stride;
    remaining = remaining % stride;
  }

  let dim_coord = coords[params.dim];
  let dim_size_a = params.a_shape[params.dim];

  if (dim_coord < dim_size_a) {
    let a_idx = flat_index(coords, params.a_shape);
    output[idx] = input_a[a_idx];
  } else {
    var b_coords = coords;
    b_coords[params.dim] = dim_coord - dim_size_a;
    let b_idx = flat_index(b_coords, params.b_shape);
    output[idx] = input_b[b_idx];
  }
}
`;var os=`struct StackParams {
  in_shape: vec4<u32>,
  out_shape: vec4<u32>,
  dim: u32,
  ndim: u32,
  pad0: u32,
  pad1: u32,
}

@group(0) @binding(0) var<storage, read> input_a: array<f32>;
@group(0) @binding(1) var<storage, read> input_b: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;
@group(0) @binding(3) var<uniform> params: StackParams;

fn flat_index(coords: ptr<function, array<u32, 5>>, shape: ptr<function, array<u32, 5>>, ndim: u32) -> u32 {
  var idx = 0u;
  var stride = 1u;
  var i = ndim;
  loop {
    if (i == 0u) { break; }
    i = i - 1u;
    idx = idx + (*coords)[i] * stride;
    stride = stride * (*shape)[i];
  }
  return idx;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let out_flat = gid.x;
  var out_shape: array<u32, 5>;
  out_shape[0] = params.out_shape[0];
  out_shape[1] = params.out_shape[1];
  out_shape[2] = params.out_shape[2];
  out_shape[3] = params.out_shape[3];
  out_shape[4] = 1u;

  var in_shape: array<u32, 5>;
  in_shape[0] = params.in_shape[0];
  in_shape[1] = params.in_shape[1];
  in_shape[2] = params.in_shape[2];
  in_shape[3] = params.in_shape[3];
  in_shape[4] = 1u;

  // Total output elements
  var total = 1u;
  for (var i = 0u; i < params.ndim + 1u; i++) {
    total = total * out_shape[i];
  }
  if (out_flat >= total) { return; }

  // Convert flat index to output coords
  var out_coords: array<u32, 5>;
  var rem = out_flat;
  var stride = total;
  for (var i = 0u; i < params.ndim + 1u; i++) {
    stride = stride / out_shape[i];
    out_coords[i] = rem / stride;
    rem = rem % stride;
  }

  // which input tensor?
  let which = out_coords[params.dim];

  // Build input coords by removing the stack dim
  var in_coords: array<u32, 5>;
  for (var d = 0u; d < params.dim; d++) {
    in_coords[d] = out_coords[d];
  }
  for (var d = params.dim; d < params.ndim; d++) {
    in_coords[d] = out_coords[d + 1];
  }
  in_coords[params.ndim] = 0u;

  let in_idx = flat_index(&in_coords, &in_shape, params.ndim);

  if (which == 0u) {
    output[out_flat] = input_a[in_idx];
  } else {
    output[out_flat] = input_b[in_idx];
  }
}
`;var us=`struct PermuteParams {
  out_shape: vec4<u32>,
  src_strides: vec4<u32>,
  out_strides: vec4<u32>,
  ndim: u32,
  total: u32,
  pad0: u32,
  pad1: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;
@group(0) @binding(3) var<uniform> params: PermuteParams;

// Permutation: dims[0..ndim-1] stored in a buffer
@group(0) @binding(1) var<storage, read> perm: array<u32>;

fn coord_to_flat(coords: array<u32, 4>, strides: array<u32, 4>) -> u32 {
  var idx = 0u;
  for (var d = 0u; d < 4u; d++) {
    idx = idx + coords[d] * strides[d];
  }
  return idx;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let dst_idx = gid.x;
  if (dst_idx >= params.total) { return; }
  let offset = 4u - params.ndim;

  // Convert dst_idx to output coordinates
  var out_strides_arr: array<u32, 4>;
  out_strides_arr[0] = params.out_strides[0];
  out_strides_arr[1] = params.out_strides[1];
  out_strides_arr[2] = params.out_strides[2];
  out_strides_arr[3] = params.out_strides[3];

  var out_shape_arr: array<u32, 4>;
  out_shape_arr[0] = params.out_shape[0];
  out_shape_arr[1] = params.out_shape[1];
  out_shape_arr[2] = params.out_shape[2];
  out_shape_arr[3] = params.out_shape[3];

  var src_strides_arr: array<u32, 4>;
  src_strides_arr[0] = params.src_strides[0];
  src_strides_arr[1] = params.src_strides[1];
  src_strides_arr[2] = params.src_strides[2];
  src_strides_arr[3] = params.src_strides[3];

  var out_coords: array<u32, 4>;
  var rem = dst_idx;
  for (var d = 0u; d < params.ndim; d++) {
    let dim_idx = offset + d;
    out_coords[dim_idx] = rem / out_strides_arr[dim_idx];
    rem = rem % out_strides_arr[dim_idx];
  }

  // Apply inverse permutation to get source coords
  // perm[i] tells which output dim maps to source dim i
  // So source coord[d] = output coords[inv_perm[d]]
  // We compute inv_perm: inv_perm[perm[i]] = i
  var inv_perm: array<u32, 4>;
  for (var d = 0u; d < params.ndim; d++) {
    let dim_idx = offset + d;
    inv_perm[perm[d]] = dim_idx;
  }

  var src_coords: array<u32, 4>;
  for (var d = 0u; d < params.ndim; d++) {
    let dim_idx = offset + d;
    src_coords[dim_idx] = out_coords[inv_perm[dim_idx]];
  }

  let src_idx = coord_to_flat(src_coords, src_strides_arr);
  output[dst_idx] = input[src_idx];
}
`;var ls=`struct SelectParams {
  in_shape: vec4<u32>,
  out_shape: vec4<u32>,
  dim: u32,
  index: u32,
  ndim: u32,
  total: u32,
  pad0: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: SelectParams;

fn flat_index(coords: ptr<function, array<u32, 4>>, shape: ptr<function, array<u32, 4>>, ndim: u32) -> u32 {
  var idx = 0u;
  var stride = 1u;
  var i = ndim;
  loop {
    if (i == 0u) { break; }
    i = i - 1u;
    idx = idx + (*coords)[i] * stride;
    stride = stride * (*shape)[i];
  }
  return idx;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let out_flat = gid.x;
  if (out_flat >= params.total) { return; }

  // Convert output flat index to output coordinates
  var out_shape_arr: array<u32, 4>;
  out_shape_arr[0] = params.out_shape[0];
  out_shape_arr[1] = params.out_shape[1];
  out_shape_arr[2] = params.out_shape[2];
  out_shape_arr[3] = params.out_shape[3];

  var in_shape_arr: array<u32, 4>;
  in_shape_arr[0] = params.in_shape[0];
  in_shape_arr[1] = params.in_shape[1];
  in_shape_arr[2] = params.in_shape[2];
  in_shape_arr[3] = params.in_shape[3];

  var out_coords: array<u32, 4>;
  var rem = out_flat;
  var stride = params.total;
  for (var d = 0u; d < params.ndim - 1u; d++) {
    stride = stride / out_shape_arr[d];
    out_coords[d] = rem / stride;
    rem = rem % stride;
  }

  // Build input coordinates by inserting the index at the select dim
  var in_coords: array<u32, 4>;
  for (var d = 0u; d < params.dim; d++) {
    in_coords[d] = out_coords[d];
  }
  in_coords[params.dim] = params.index;
  for (var d = params.dim; d < params.ndim - 1u; d++) {
    in_coords[d + 1] = out_coords[d];
  }

  let in_idx = flat_index(&in_coords, &in_shape_arr, params.ndim);
  output[out_flat] = input[in_idx];
}
`;var cs=`struct Params { alpha: f32 }
@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> result: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn leaky_relu(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= arrayLength(&result)) { return; }
    let x = input[idx];
    result[idx] = select(x, x * params.alpha, x < 0.0);
}
`;var Wr=`struct Params {
    output_shape: vec4<u32>,
    broadcastStrides: vec4<u32>,
    ndim: u32,
    total: u32,
    pad0: u32,
    pad1: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.x;
    if (idx >= params.total) { return; }
    var remaining = idx;
    var inIdx = 0u;
    let offset = 4u - params.ndim;

    var out_strides: array<u32, 4>;
    out_strides[3] = 1u;
    if (params.ndim > 1u) { out_strides[2] = params.output_shape[3]; }
    if (params.ndim > 2u) { out_strides[1] = params.output_shape[3] * params.output_shape[2]; }
    if (params.ndim > 3u) { out_strides[0] = params.output_shape[3] * params.output_shape[2] * params.output_shape[1]; }

    for (var d = 0u; d < params.ndim; d++) {
        let dim_idx = offset + d;
        let coord = remaining / out_strides[dim_idx];
        remaining = remaining % out_strides[dim_idx];
        inIdx += coord * params.broadcastStrides[dim_idx];
    }
    output[idx] = input[inIdx];
}
`;var ds=`struct RepeatParams {
  in_shape: vec4<u32>,
  out_shape: vec4<u32>,
  in_strides: vec4<u32>,
  out_strides: vec4<u32>,
  repeats: vec4<u32>,
  ndim: u32,
  total: u32,
  pad0: u32,
  pad1: u32,
}

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> params: RepeatParams;

fn coord_to_flat(coords: array<u32, 4>, strides: array<u32, 4>) -> u32 {
  var idx = 0u;
  for (var d = 0u; d < 4u; d++) {
    idx = idx + coords[d] * strides[d];
  }
  return idx;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let dst_idx = gid.x;
  if (dst_idx >= params.total) { return; }
  let offset = 4u - params.ndim;

  var out_strides_arr: array<u32, 4>;
  out_strides_arr[0] = params.out_strides[0];
  out_strides_arr[1] = params.out_strides[1];
  out_strides_arr[2] = params.out_strides[2];
  out_strides_arr[3] = params.out_strides[3];

  var out_shape_arr: array<u32, 4>;
  out_shape_arr[0] = params.out_shape[0];
  out_shape_arr[1] = params.out_shape[1];
  out_shape_arr[2] = params.out_shape[2];
  out_shape_arr[3] = params.out_shape[3];

  var in_strides_arr: array<u32, 4>;
  in_strides_arr[0] = params.in_strides[0];
  in_strides_arr[1] = params.in_strides[1];
  in_strides_arr[2] = params.in_strides[2];
  in_strides_arr[3] = params.in_strides[3];

  var in_shape_arr: array<u32, 4>;
  in_shape_arr[0] = params.in_shape[0];
  in_shape_arr[1] = params.in_shape[1];
  in_shape_arr[2] = params.in_shape[2];
  in_shape_arr[3] = params.in_shape[3];

  var repeats_arr: array<u32, 4>;
  repeats_arr[0] = params.repeats[0];
  repeats_arr[1] = params.repeats[1];
  repeats_arr[2] = params.repeats[2];
  repeats_arr[3] = params.repeats[3];

  // Convert dst_idx to output coordinates
  var out_coords: array<u32, 4>;
  var rem = dst_idx;
  for (var d = 0u; d < params.ndim; d++) {
    let dim_idx = offset + d;
    out_coords[dim_idx] = rem / out_strides_arr[dim_idx];
    rem = rem % out_strides_arr[dim_idx];
  }

  // Map output coords to input coords via modulo (repeat)
  var in_coords: array<u32, 4>;
  for (var d = 0u; d < params.ndim; d++) {
    let dim_idx = offset + d;
    in_coords[dim_idx] = out_coords[dim_idx] % in_shape_arr[dim_idx];
  }

  let src_idx = coord_to_flat(in_coords, in_strides_arr);
  output[dst_idx] = input[src_idx];
}
`;var ps=`@group(0) @binding(0) var<storage, read> input: array<f32>;\r
@group(0) @binding(1) var<storage, read> indices: array<f32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r
\r
// Input shapes/strides use left-padding (padShapeTo4Left): shape[3,2] -> [3,2,1,1]\r
// The shader iterates rows->cols->depth->..., so shape[0] is most significant dim.\r
// For indices/output shape, same left-padding convention.\r
\r
struct Params {\r
  dim: u32,\r
  rank: u32,\r
  output_len: u32,\r
  _pad: u32,\r
  in_shape0: u32,\r
  in_stride0: u32,\r
  in_shape1: u32,\r
  in_stride1: u32,\r
  in_shape2: u32,\r
  in_stride2: u32,\r
  in_shape3: u32,\r
  in_stride3: u32,\r
  out_shape0: u32,\r
  out_shape1: u32,\r
  out_shape2: u32,\r
  out_shape3: u32,\r
}\r
\r
@group(0) @binding(3) var<uniform> params: Params;\r
\r
fn inStride(i: u32) -> u32 {\r
  if (i == 0u) { return params.in_stride0; }\r
  if (i == 1u) { return params.in_stride1; }\r
  if (i == 2u) { return params.in_stride2; }\r
  return params.in_stride3;\r
}\r
\r
fn outShape(i: u32) -> u32 {\r
  if (i == 0u) { return params.out_shape0; }\r
  if (i == 1u) { return params.out_shape1; }\r
  if (i == 2u) { return params.out_shape2; }\r
  return params.out_shape3;\r
}\r
\r
fn inShape(i: u32) -> u32 {\r
  if (i == 0u) { return params.in_shape0; }\r
  if (i == 1u) { return params.in_shape1; }\r
  if (i == 2u) { return params.in_shape2; }\r
  return params.in_shape3;\r
}\r
\r
@compute @workgroup_size(256)\r
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {\r
  let idx = gid.x;\r
  if (idx >= params.output_len) { return; }\r
\r
  var remaining = idx;\r
  var src_linear: u32 = 0u;\r
\r
  // Iterate from last dim (innermost/col) to first dim (outermost/row)\r
  for (var d = 0u; d < params.rank; d += 1u) {\r
    let dim_idx = params.rank - 1u - d;\r
    let sz = outShape(dim_idx);\r
    let coord = remaining % sz;\r
    remaining = remaining / sz;\r
\r
    if (dim_idx == params.dim) {\r
      let gather_idx = u32(indices[idx]);\r
      src_linear = src_linear + gather_idx * inStride(dim_idx);\r
    } else {\r
      src_linear = src_linear + coord * inStride(dim_idx);\r
    }\r
  }\r
\r
  output[idx] = input[src_linear];\r
}\r
`;var hs=`// Bitonic sort along a specified dimension.\r
// Each workgroup sorts one "segment" (all elements along the given dim for a fixed position in other dims).\r
// Uses strides to access non-contiguous segments.\r
// Output: sorted values + original indices (as f32, cast to i64 on readback).\r
\r
@group(0) @binding(0) var<storage, read> input: array<f32>;\r
@group(0) @binding(1) var<storage, read_write> values: array<f32>;\r
@group(0) @binding(2) var<storage, read_write> indices: array<f32>;\r
\r
struct Params {\r
  seg_size: u32,\r
  num_segs: u32,\r
  seg_stride: u32,\r
  outer_stride: u32,\r
}\r
\r
@group(0) @binding(3) var<uniform> params: Params;\r
\r
var<workgroup> shared_vals: array<f32, 2048>;\r
var<workgroup> shared_idx: array<f32, 2048>;\r
\r
fn next_pow2(x: u32) -> u32 {\r
  var v = x - 1u;\r
  v = v | (v >> 1u);\r
  v = v | (v >> 2u);\r
  v = v | (v >> 4u);\r
  v = v | (v >> 8u);\r
  v = v | (v >> 16u);\r
  return v + 1u;\r
}\r
\r
@compute @workgroup_size(256)\r
fn main(@builtin(local_invocation_id) lid: vec3<u32>,\r
        @builtin(workgroup_id) wg_id: vec3<u32>) {\r
  let seg = wg_id.x;\r
  if (seg >= params.num_segs) { return; }\r
\r
  let seg_size = params.seg_size;\r
  let seg_stride = params.seg_stride;\r
  let outer_stride = params.outer_stride;\r
  let pad_size = max(2u, next_pow2(seg_size));\r
  let tid = lid.x;\r
  let total_threads = 256u;\r
  let work_per_thread = (pad_size + total_threads - 1u) / total_threads;\r
\r
  for (var i = 0u; i < work_per_thread; i += 1u) {\r
    let pos = tid * work_per_thread + i;\r
    if (pos < seg_size) {\r
      let linear_idx = seg * outer_stride + pos * seg_stride;\r
      shared_vals[pos] = input[linear_idx];\r
      shared_idx[pos] = f32(pos);\r
    } else if (pos < pad_size) {\r
      shared_vals[pos] = 3.402823466e+38;\r
      shared_idx[pos] = f32(pos);\r
    }\r
  }\r
  workgroupBarrier();\r
\r
  var k: u32 = 2u;\r
  while (k <= pad_size) {\r
    var j: u32 = k / 2u;\r
    while (j > 0u) {\r
      for (var i = 0u; i < work_per_thread; i += 1u) {\r
        let pos = tid * work_per_thread + i;\r
        if (pos < seg_size) {\r
          let ixj = pos ^ j;\r
          if (ixj > pos && ixj < pad_size) {\r
            let is_ascending = (pos & k) == 0u;\r
            if (is_ascending) {\r
              if (shared_vals[pos] > shared_vals[ixj]) {\r
                let tmp_v = shared_vals[pos];\r
                let tmp_i = shared_idx[pos];\r
                shared_vals[pos] = shared_vals[ixj];\r
                shared_idx[pos] = shared_idx[ixj];\r
                shared_vals[ixj] = tmp_v;\r
                shared_idx[ixj] = tmp_i;\r
              }\r
            } else {\r
              if (shared_vals[pos] < shared_vals[ixj]) {\r
                let tmp_v = shared_vals[pos];\r
                let tmp_i = shared_idx[pos];\r
                shared_vals[pos] = shared_vals[ixj];\r
                shared_idx[pos] = shared_idx[ixj];\r
                shared_vals[ixj] = tmp_v;\r
                shared_idx[ixj] = tmp_i;\r
              }\r
            }\r
          }\r
        }\r
      }\r
      workgroupBarrier();\r
      j = j / 2u;\r
    }\r
    k = k * 2u;\r
  }\r
\r
  for (var i = 0u; i < work_per_thread; i += 1u) {\r
    let pos = tid * work_per_thread + i;\r
    if (pos < seg_size) {\r
      let linear_idx = seg * outer_stride + pos * seg_stride;\r
      values[linear_idx] = shared_vals[pos];\r
      indices[linear_idx] = shared_idx[pos];\r
    }\r
  }\r
}`;var ms=`// Sort backward scatter.
// indices are per-segment positions produced by sort.wgsl.

@group(0) @binding(0) var<storage, read> grad_output: array<f32>;
@group(0) @binding(1) var<storage, read> indices: array<f32>;
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;

struct Params {
  seg_size: u32,
  num_segs: u32,
  seg_stride: u32,
  outer_stride: u32,
}

@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(256)
fn sort_backward(@builtin(local_invocation_id) lid: vec3<u32>,
                 @builtin(workgroup_id) wg_id: vec3<u32>) {
  let seg = wg_id.x;
  if (seg >= params.num_segs) { return; }

  let pos = lid.x;
  if (pos >= params.seg_size) { return; }

  let src = seg * params.outer_stride + pos * params.seg_stride;
  let dst_pos = u32(max(0.0, indices[src]));
  let dst = seg * params.outer_stride + dst_pos * params.seg_stride;
  grad_input[dst] = grad_output[src];
}

`;var fs=`// TopK backward scatter.
// indices are per-segment positions in the original input along dim.

@group(0) @binding(0) var<storage, read> grad_output: array<f32>;
@group(0) @binding(1) var<storage, read> indices: array<f32>;
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;

struct Params {
  k: u32,
  num_segs: u32,
  seg_stride: u32,
  outer_stride_in: u32,
  outer_stride_out: u32,
}

@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(256)
fn topk_backward(@builtin(local_invocation_id) lid: vec3<u32>,
                 @builtin(workgroup_id) wg_id: vec3<u32>) {
  let seg = wg_id.x;
  if (seg >= params.num_segs) { return; }

  let pos = lid.x;
  if (pos >= params.k) { return; }

  let src = seg * params.outer_stride_out + pos * params.seg_stride;
  let dst_pos = u32(max(0.0, indices[src]));
  let dst = seg * params.outer_stride_in + dst_pos * params.seg_stride;
  grad_input[dst] = grad_output[src];
}

`;var gs=`// Cross entropy forward over logits [batch, classes].
// Output is per-sample loss [batch]: logsumexp(logits[row]) - logits[row, target[row]]

@group(0) @binding(0) var<storage, read> logits: array<f32>;
@group(0) @binding(1) var<storage, read> targets: array<i32>;
@group(0) @binding(2) var<storage, read_write> out_loss: array<f32>;
@group(0) @binding(3) var<uniform> dims: vec4<u32>; // [batch, classes, _, _]

@compute @workgroup_size(256)
fn cross_entropy(@builtin(global_invocation_id) gid: vec3<u32>) {
  let row = gid.x;
  let batch = dims.x;
  let classes = dims.y;
  if (row >= batch) { return; }

  let base = row * classes;
  var maxv = logits[base];
  var c: u32 = 1u;
  loop {
    if (c >= classes) { break; }
    let v = logits[base + c];
    if (v > maxv) { maxv = v; }
    c = c + 1u;
  }

  var sum_exp = 0.0;
  c = 0u;
  loop {
    if (c >= classes) { break; }
    sum_exp = sum_exp + exp(logits[base + c] - maxv);
    c = c + 1u;
  }

  let t = u32(max(targets[row], 0));
  let target_idx = min(t, classes - 1u);
  let log_denom = maxv + log(sum_exp);
  out_loss[row] = log_denom - logits[base + target_idx];
}

`;var ys=`// Cross entropy backward over logits [batch, classes].
// grad_input[row, col] = (softmax(logits[row])[col] - one_hot(target[row], col)) * row_scale
// row_scale depends on reduction and grad_output.

@group(0) @binding(0) var<storage, read> grad_output: array<f32>; // scalar (len=1) or vector [batch]
@group(0) @binding(1) var<storage, read> logits: array<f32>;
@group(0) @binding(2) var<storage, read> targets: array<i32>;
@group(0) @binding(3) var<storage, read_write> grad_input: array<f32>;
@group(0) @binding(4) var<uniform> dims: vec4<u32>;   // [batch, classes, reduction_mode, grad_is_scalar]
@group(0) @binding(5) var<uniform> scales: vec4<f32>; // [norm_scale, _, _, _]

@compute @workgroup_size(256)
fn cross_entropy_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let batch = dims.x;
  let classes = dims.y;
  let total = batch * classes;
  if (idx >= total) { return; }

  let row = idx / classes;
  let col = idx % classes;
  let base = row * classes;

  var maxv = logits[base];
  var c: u32 = 1u;
  loop {
    if (c >= classes) { break; }
    let v = logits[base + c];
    if (v > maxv) { maxv = v; }
    c = c + 1u;
  }

  var sum_exp = 0.0;
  c = 0u;
  loop {
    if (c >= classes) { break; }
    sum_exp = sum_exp + exp(logits[base + c] - maxv);
    c = c + 1u;
  }

  let prob = exp(logits[idx] - maxv) / sum_exp;
  let t = u32(max(targets[row], 0));
  let target_idx = min(t, classes - 1u);
  let one_hot = select(0.0, 1.0, col == target_idx);

  var upstream = 0.0;
  if (dims.w == 1u) {
    upstream = grad_output[0];
  } else {
    upstream = grad_output[row];
  }

  let row_scale = upstream * scales.x;
  grad_input[idx] = (prob - one_hot) * row_scale;
}

`;var bs=`// Fused Adam step: updates parameter, exp_avg, exp_avg_sq in one pass.

@group(0) @binding(0) var<storage, read_write> param: array<f32>;
@group(0) @binding(1) var<storage, read> grad: array<f32>;
@group(0) @binding(2) var<storage, read_write> exp_avg: array<f32>;
@group(0) @binding(3) var<storage, read_write> exp_avg_sq: array<f32>;
@group(0) @binding(4) var<uniform> dims: vec4<u32>; // [length, _, _, _]
@group(0) @binding(5) var<uniform> hp: vec4<f32>;   // [lr, beta1, beta2, eps]
@group(0) @binding(6) var<uniform> extra: vec4<f32>; // [weight_decay, step_size, inv_sqrt_bc2, _]

@compute @workgroup_size(256)
fn adam_step(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let n = dims.x;
  if (i >= n) { return; }

  let beta1 = hp.y;
  let beta2 = hp.z;
  let eps = hp.w;
  let weight_decay = extra.x;
  let step_size = extra.y;
  let inv_sqrt_bc2 = extra.z;

  let p = param[i];
  var g = grad[i];
  if (weight_decay != 0.0) {
    g = g + weight_decay * p;
  }

  let m = exp_avg[i] * beta1 + (1.0 - beta1) * g;
  let v = exp_avg_sq[i] * beta2 + (1.0 - beta2) * g * g;

  exp_avg[i] = m;
  exp_avg_sq[i] = v;

  let denom = sqrt(v) * inv_sqrt_bc2 + eps;
  let update = (m / denom) * step_size;
  param[i] = p - update;
}
`;var vs=`// Softmax shader for contiguous tensors with arbitrary rank and reduction dim.
// Flattened mapping:
// input shape: [d0, d1, ..., d{r-1}], reduce along axis with:
// outer = prod(d0..d{axis-1}), axis_size = d{axis}, inner = prod(d{axis+1}..d{r-1})
// rows = outer * inner
// row -> (outer_idx = row / inner, inner_idx = row % inner)
// linear index for class k in this row: outer_idx * axis_size * inner + k * inner + inner_idx

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;
@group(0) @binding(2) var<uniform> dims: vec4<u32>; // [rows, axis_size, inner, _]

@compute @workgroup_size(256)
fn softmax(@builtin(global_invocation_id) gid: vec3<u32>) {
  let row = gid.x;
  let rows = dims.x;
  let axis_size = dims.y;
  let inner = dims.z;
  if (row >= rows) { return; }
  if (axis_size == 0u || inner == 0u) { return; }

  let outer_idx = row / inner;
  let inner_idx = row % inner;
  let base = outer_idx * axis_size * inner + inner_idx;

  // Find max for numerical stability
  var maxv = input[base];
  var c: u32 = 1u;
  loop {
    if (c >= axis_size) { break; }
    let v = input[base + c * inner];
    if (v > maxv) { maxv = v; }
    c = c + 1u;
  }

  // Sum exp
  var sum_exp = 0.0;
  c = 0u;
  loop {
    if (c >= axis_size) { break; }
    sum_exp = sum_exp + exp(input[base + c * inner] - maxv);
    c = c + 1u;
  }

  // Normalize
  c = 0u;
  loop {
    if (c >= axis_size) { break; }
    output[base + c * inner] = exp(input[base + c * inner] - maxv) / sum_exp;
    c = c + 1u;
  }
}
`;var _s=`// Fused AdamW step: decoupled weight decay + Adam update.

@group(0) @binding(0) var<storage, read_write> param: array<f32>;
@group(0) @binding(1) var<storage, read> grad: array<f32>;
@group(0) @binding(2) var<storage, read_write> exp_avg: array<f32>;
@group(0) @binding(3) var<storage, read_write> exp_avg_sq: array<f32>;
@group(0) @binding(4) var<uniform> dims: vec4<u32>; // [length, _, _, _]
@group(0) @binding(5) var<uniform> hp: vec4<f32>;   // [lr, beta1, beta2, eps]
@group(0) @binding(6) var<uniform> extra: vec4<f32>; // [weight_decay, step_size, inv_sqrt_bc2, _]

@compute @workgroup_size(256)
fn adamw_step(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let n = dims.x;
  if (i >= n) { return; }

  let lr = hp.x;
  let beta1 = hp.y;
  let beta2 = hp.z;
  let eps = hp.w;
  let weight_decay = extra.x;
  let step_size = extra.y;
  let inv_sqrt_bc2 = extra.z;

  var p = param[i];
  if (weight_decay != 0.0) {
    p = p - (lr * weight_decay) * p;
  }

  let g = grad[i];
  let m = exp_avg[i] * beta1 + (1.0 - beta1) * g;
  let v = exp_avg_sq[i] * beta2 + (1.0 - beta2) * g * g;

  exp_avg[i] = m;
  exp_avg_sq[i] = v;

  let denom = sqrt(v) * inv_sqrt_bc2 + eps;
  let update = (m / denom) * step_size;
  param[i] = p - update;
}

`;var ws=`// NLL Loss reduced shader for 2D logits [batch, classes].
// reduction_mode: 1=sum, 2=mean

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> targets: array<i32>;
@group(0) @binding(2) var<storage, read_write> out_scalar: array<f32>;
@group(0) @binding(3) var<uniform> params: vec4<u32>; // [batch, classes, reduction_mode, _]

@compute @workgroup_size(1)
fn nll_loss_reduced(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x != 0u) { return; }
  let batch = params.x;
  let classes = params.y;
  let reduction_mode = params.z;

  var acc = 0.0;
  var b: u32 = 0u;
  loop {
    if (b >= batch) { break; }
    let t = u32(max(targets[b], 0));
    let target_idx = min(t, classes - 1u);
    let offset = b * classes + target_idx;
    acc = acc - input[offset];
    b = b + 1u;
  }

  if (reduction_mode == 2u && batch > 0u) {
    out_scalar[0] = acc / f32(batch);
  } else {
    out_scalar[0] = acc;
  }
}

`;var xs=`// Fused SGD step with optional momentum and nesterov.

@group(0) @binding(0) var<storage, read_write> param: array<f32>;
@group(0) @binding(1) var<storage, read> grad: array<f32>;
@group(0) @binding(2) var<storage, read_write> momentum_buf: array<f32>;
@group(0) @binding(3) var<uniform> dims: vec4<u32>; // [length, has_momentum, nesterov, _]
@group(0) @binding(4) var<uniform> hp: vec4<f32>;   // [lr, momentum, weight_decay, dampening]

@compute @workgroup_size(256)
fn sgd_step(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let n = dims.x;
  if (i >= n) { return; }

  let has_momentum = dims.y == 1u;
  let nesterov = dims.z == 1u;

  let lr = hp.x;
  let momentum = hp.y;
  let weight_decay = hp.z;
  let dampening = hp.w;

  var g = grad[i];
  let p = param[i];
  if (weight_decay != 0.0) {
    g = g + weight_decay * p;
  }

  var update = g;
  if (has_momentum) {
    var buf = momentum_buf[i];
    buf = buf * momentum + g * (1.0 - dampening);
    momentum_buf[i] = buf;
    if (nesterov) {
      update = g + momentum * buf;
    } else {
      update = buf;
    }
  }

  param[i] = p - lr * update;
}

`;var Ts=`// Fused RMSprop step with optional momentum.

@group(0) @binding(0) var<storage, read_write> param: array<f32>;
@group(0) @binding(1) var<storage, read> grad: array<f32>;
@group(0) @binding(2) var<storage, read_write> square_avg: array<f32>;
@group(0) @binding(3) var<storage, read_write> momentum_buf: array<f32>;
@group(0) @binding(4) var<uniform> dims: vec4<u32>; // [length, use_momentum, _, _]
@group(0) @binding(5) var<uniform> hp: vec4<f32>;   // [lr, alpha, eps, weight_decay]
@group(0) @binding(6) var<uniform> extra: vec4<f32>; // [momentum, _, _, _]

@compute @workgroup_size(256)
fn rmsprop_step(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let n = dims.x;
  if (i >= n) { return; }

  let use_momentum = dims.y == 1u;
  let lr = hp.x;
  let alpha = hp.y;
  let eps = hp.z;
  let weight_decay = hp.w;
  let momentum = extra.x;

  let p = param[i];
  var g = grad[i];
  if (weight_decay != 0.0) {
    g = g + weight_decay * p;
  }

  let sq = square_avg[i] * alpha + (1.0 - alpha) * g * g;
  square_avg[i] = sq;
  let denom = sqrt(sq) + eps;

  var update = g / denom;
  if (use_momentum) {
    let buf = momentum_buf[i] * momentum + update;
    momentum_buf[i] = buf;
    update = buf;
  }

  param[i] = p - lr * update;
}

`;var Ms=`// Backward for global max/min reduction.
// mode: 0=max, 1=min

@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read> grad_output: array<f32>; // scalar
@group(0) @binding(2) var<storage, read_write> grad_input: array<f32>;
@group(0) @binding(3) var<uniform> params: vec4<u32>; // [length, mode, _, _]

@compute @workgroup_size(1)
fn maxmin_backward(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x != 0u) { return; }
  let n = params.x;
  let mode = params.y;
  if (n == 0u) { return; }

  var best_idx: u32 = 0u;
  var best_val: f32 = input[0];
  var i: u32 = 1u;
  loop {
    if (i >= n) { break; }
    let v = input[i];
    if ((mode == 0u && v > best_val) || (mode == 1u && v < best_val)) {
      best_val = v;
      best_idx = i;
    }
    i = i + 1u;
  }

  i = 0u;
  loop {
    if (i >= n) { break; }
    grad_input[i] = 0.0;
    i = i + 1u;
  }
  grad_input[best_idx] = grad_output[0];
}

`;function D(e){return e.reduce((t,r)=>t*r,1)}function Un(e){return{id:e.id,shape:[...e.shape],dtype:e.dtype}}var Ss=class{tensors=new Map;nextId=1;allocated=0;all(){return this.tensors}nextTensorId(){return this.nextId++}memoryAllocated(){return this.allocated}allocateBytes(t){this.allocated+=t}deallocateBytes(t){this.allocated=Math.max(0,this.allocated-t)}getTensorMeta(t){let r=this.tensors.get(t);if(!r)throw new Error(`Unknown tensor id: ${t}.`);return r}registerTensor(t,r,n,i){let s=this.nextTensorId(),a=t.size,o={id:s,buffer:t,shape:[...r],dtype:n,length:i,bytes:a};return this.tensors.set(s,o),this.allocated+=a,s}registerTensorAsHandle(t,r,n,i){let s=this.registerTensor(t,r,n,i);return Un(this.tensors.get(s))}deleteTensor(t){let r=this.tensors.get(t);return r?(this.tensors.delete(t),this.deallocateBytes(r.bytes),r):null}tensorHandle(t){return Un(t)}};var zs=class{pipelines=new Map;shaderModules=new Map;makePipelineKey(t,r){return`${r}::${t}`}clear(){this.pipelines.clear(),this.shaderModules.clear()}getOrCreate(t,r,n){let i=this.makePipelineKey(r,n),s=this.pipelines.get(i);if(s)return s;let a=this.shaderModules.get(r);a||(a=t.createShaderModule({code:r}),this.shaderModules.set(r,a));let o=t.createComputePipeline({layout:"auto",compute:{module:a,entryPoint:n}});return this.pipelines.set(i,o),o}};var sc=3,ac=200;async function fo(e){return new Promise(t=>setTimeout(t,e))}async function mo(e,t,r){for(let n=0;n<r;n++)try{return await t()}catch(i){if(n===r-1)throw i;let s=ac*Math.pow(2,n);console.warn(`[DeviceManager] ${e} attempt ${n+1}/${r} failed:`,i?.message,`retry in ${s}ms`),await fo(s)}throw new Error(`${e} \u2014 all ${r} attempts failed`)}function ho(e,t,r){let n=Array.from(e.slice(0,t));return r==="bool"?n.map(i=>i!==0?1:0):r==="int8"||r==="int16"||r==="int32"||r==="int64"||r==="uint8"||r==="uint16"||r==="uint32"||r==="uint64"?n.map(i=>Math.trunc(i)):n}var On=class{_device=null;_adapter=null;_initialized=!1;_initPromise=null;_initError=null;_lostHandler=null;_pipelineCache=new zs;_shadowBuffers=new Map;_nextShadowId=1;_pendingBuffers=[];_recoveryCallbacks=[];_frameEncoder=null;_frameDepth=0;_tensorRegistry=new Ss;_deviceGeneration=0;_bufferToShadow=new Map;_wrappedDestroy=new WeakSet;get device(){return this._device}get adapter(){return this._adapter}get initialized(){return this._initialized}get tensors(){return this._tensorRegistry.all()}isAvailable(){return!!globalThis.navigator?.gpu}deviceCount(){return this.isAvailable()?1:0}async currentDevice(){return await this.ensureReady(),0}async getDeviceName(t){return await this.ensureReady(),this.collectProperties().name}async getDeviceProperties(t){return await this.ensureReady(),this.collectProperties()}async memoryAllocated(){return await this.ensureReady(),this._tensorRegistry.memoryAllocated()}async memoryReserved(){return await this.ensureReady(),this._tensorRegistry.memoryAllocated()}async ensureReady(t){if(this._initialized&&this._device)return this._device;if(this._initPromise&&(await this._initPromise,this._device))return this._device;this._initPromise=this.initializeInternal(t);try{await this._initPromise}finally{this._initPromise=null}if(!this._device)throw new Error("DeviceManager: failed to initialize GPU device");return this._device}async initializeInternal(t){if(this._initError=null,t===null)throw this._initialized=!1,this._initError="WebGPU unavailable in this browser.",new Error(this._initError);if(await Vr(t??void 0),this._device=kt(),this._adapter=Xt(),this._initialized=Fr(),!this._device)throw new Error("WebGPU init returned null device");this._lostHandler=async r=>{console.warn("[DeviceManager] Device lost \u2014 recovering..."),this._deviceGeneration++,this._device=null,this._adapter=null,this._initialized=!1,this._initPromise=null,this._pipelineCache.clear(),await mo("device recovery",async()=>{if(await Vr(),this._device=kt(),this._adapter=Xt(),this._initialized=Fr(),!this._device)throw new Error("Recovery: failed to reinitialize WebGPU");this._device.lost&&this._device.lost.then(this._lostHandler);let n=this._pendingBuffers.length;if(n>0){console.warn(`[DeviceManager] Re-creating ${n} buffers from shadow...`);for(let i of this._pendingBuffers){let s=this._device.createBuffer({size:i.shadow.size,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});this._device.queue.writeBuffer(s,0,i.shadow.data)}}for(let i of this._recoveryCallbacks)await i();console.warn("[DeviceManager] Recovery complete")},sc)},this._device.lost&&this._device.lost.then(this._lostHandler)}getOrCreatePipeline(t,r){if(!this._device)throw new Error("Device not initialized");return this._pipelineCache.getOrCreate(this._device,t,r)}beginFrame(){if(this._frameDepth===0){if(!this._device)throw new Error("Device not initialized");this._frameEncoder=this._device.createCommandEncoder()}this._frameDepth++}async endFrame(){if(this._frameDepth===0)throw new Error("endFrame() without beginFrame()");if(this._frameDepth--,this._frameDepth>0)return;let t=this._frameEncoder;this._frameEncoder=null,this._device.queue.submit([t.finish()]),globalThis.__TORCH_PYODIDE_FRAME_SYNC_EAGER__&&await this._device.queue.onSubmittedWorkDone()}cancelFrame(){this._frameEncoder=null,this._frameDepth=0}dispatchCompute(t,r,n){if(!this._device)throw new Error("Device not initialized");let i=this._device.createBindGroup({layout:t.getBindGroupLayout(0),entries:r.map((o,u)=>({binding:u,resource:{buffer:o}}))}),s=this._frameEncoder??this._device.createCommandEncoder(),a=s.beginComputePass();a.setPipeline(t),a.setBindGroup(0,i),n.length===2?a.dispatchWorkgroups(n[0],n[1]):a.dispatchWorkgroups(n[0]),a.end(),this._frameEncoder||this._device.queue.submit([s.finish()])}calculateWorkgroups(t,r=256){let n=Math.ceil(t/r);if(n>65535){let i=Math.ceil(Math.sqrt(n)),s=Math.ceil(n/i);return[i,s]}return[n]}syncDevice(){return this._frameDepth>0?Promise.resolve():this._device.queue.onSubmittedWorkDone()}createStorageBuffer(t,r){if(!this._device)throw new Error("Device not initialized");let n=this._device.createBuffer({size:t,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),i={data:r?new Float32Array(r):new Float32Array(t/4),size:t},s=this._nextShadowId++;return this._shadowBuffers.set(s,i),this._pendingBuffers.push({id:s,shadow:i}),this._bufferToShadow.set(n,s),this.attachDestroyCleanup(n),n}attachDestroyCleanup(t){if(this._wrappedDestroy.has(t))return;this._wrappedDestroy.add(t);let r=t.destroy.bind(t),n=this;t.destroy=function(){let i=n._bufferToShadow.get(t);i!==void 0&&n.discardShadow(i),n.forgetBuffer(t);try{r()}catch{}}}writeBuffer(t,r,n){if(!this._device)throw new Error("Device not initialized");this._device.queue.writeBuffer(t,r,n);let i=this._bufferToShadow.get(t);if(i!==void 0){let s=this._shadowBuffers.get(i);s&&n instanceof Float32Array&&s.data.set(n,r/4)}}async readFromGPUBuffer(t,r,n=5){for(let i=0;i<n;i++)try{await this.ensureReady();let s=this._device,a=s.createBuffer({size:r,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=s.createCommandEncoder();o.copyBufferToBuffer(t,0,a,0,r),s.queue.submit([o.finish()]),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange().slice(0);return a.unmap(),a.destroy(),u}catch(s){if(i<n-1&&s instanceof Error){let a=s.message||"";if(a.includes("lost")||a.includes("Device")||a.includes("Invalid")||a.includes("destroyed")){console.warn(`[DeviceManager] readFromGPU attempt ${i+1}/${n}: ${a}`),this._initialized=!1,this._device=null,this._initPromise=null,this._pipelineCache.clear(),this._adapter&&(await Vr(),this._device=kt(),this._initialized=Fr(),this._device?.lost&&this._device.lost.then(this._lostHandler)),await fo(ac*Math.pow(2,i));continue}}throw s}throw new Error("readFromGPUBuffer: all attempts failed")}async readFromGPU(t,r,n){let i=r*Float32Array.BYTES_PER_ELEMENT,s=this._bufferToShadow.get(t),a=s!==void 0?this._shadowBuffers.get(s):void 0;if(a&&this._deviceGeneration>0)return console.warn("[DeviceManager] Using shadow copy (device recovered)"),ho(a.data,r,n);try{let o=await this.readFromGPUBuffer(t,i);return ho(new Float32Array(o),r,n)}catch(o){if(a)return console.warn("[DeviceManager] Falling back to shadow copy"),ho(a.data,r,n);throw o}}async readScalar(t){let r=await this.readFromGPUBuffer(t,4);return new Float32Array(r)[0]}recreateBuffer(t){if(!this._device)throw new Error("Device not initialized");let r=this._shadowBuffers.get(t);if(!r)throw new Error(`recreateBuffer: unknown shadowId ${t}`);let n=this._device.createBuffer({size:r.size,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return this._device.queue.writeBuffer(n,0,r.data),this._bufferToShadow.set(n,t),this.attachDestroyCleanup(n),n}async forceDeviceRecovery(){if(this._device)try{this._device.destroy()}catch{}this._deviceGeneration++,this._device=null,this._adapter=null,this._initialized=!1,this._initPromise=null,this._pipelineCache.clear(),await mo("forced recovery",async()=>{if(await Vr(),this._device=kt(),this._adapter=Xt(),this._initialized=Fr(),!this._device)throw new Error("Forced recovery: failed to reinitialize WebGPU");this._device.lost&&this._device.lost.then(this._lostHandler);for(let t of this._recoveryCallbacks)await t();console.warn("[DeviceManager] Forced recovery complete")},sc)}onRecovery(t){this._recoveryCallbacks.push(t)}discardShadow(t){this._shadowBuffers.delete(t),this._pendingBuffers=this._pendingBuffers.filter(r=>r.id!==t)}forgetBuffer(t){this._bufferToShadow.delete(t)}nextTensorId(){return this._tensorRegistry.nextTensorId()}allocateBytes(t){this._tensorRegistry.allocateBytes(t)}deallocateBytes(t){this._tensorRegistry.deallocateBytes(t)}getTensorMeta(t){return this._tensorRegistry.getTensorMeta(t)}registerTensor(t,r,n,i){return this._tensorRegistry.registerTensor(t,r,n,i)}registerTensorAsHandle(t,r,n,i){return this._tensorRegistry.registerTensorAsHandle(t,r,n,i)}destroyTensor(t){let r=this.tensors.get(t);if(!r)return;let n=this._bufferToShadow.get(r.buffer);n!==void 0&&this.discardShadow(n),this.forgetBuffer(r.buffer);try{r.buffer.destroy()}catch{}this._tensorRegistry.deleteTensor(t)}tensorHandle(t){return Un(t)}collectProperties(){let t=this._adapter,r=this._adapter.limits,n=t.info??{};return{name:n.description||n.device||n.architecture||n.vendor||"WebGPU Adapter",total_memory:0,major:0,minor:0,multi_processor_count:0,...n,limits:r}}};function cr(e){if(e!=="float32"&&e!=="float16"&&e!=="bfloat16"&&e!=="int8"&&e!=="int16"&&e!=="int32"&&e!=="int64"&&e!=="uint8"&&e!=="uint16"&&e!=="uint32"&&e!=="uint64"&&e!=="bool")throw new Error(`Unsupported dtype: ${e}. Supported dtypes: float32, float16, bfloat16, int8, int16, int32, int64, uint8, uint16, uint32, uint64, bool.`)}function Kt(e,t){return t==="bool"?e?1:0:t==="int8"||t==="int16"||t==="int32"||t==="int64"?Math.trunc(e):t==="uint8"||t==="uint16"||t==="uint32"||t==="uint64"?Math.max(0,Math.trunc(e)):e}function go(e,t){if(e!=="float32")throw new Error(`${t} currently supports only float32 tensors, received: ${e}.`)}function bt(e,t){if(t===0)throw new Error("operation requires at least 1 dimension.");let r=e<0?e+t:e;if(r<0||r>=t)throw new Error(`dim out of range for rank ${t}: ${e}.`);return r}function qe(e){if(e.length===0)return[];let t=new Array(e.length),r=1;for(let n=e.length-1;n>=0;n-=1)t[n]=r,r*=e[n];return t}function yo(e,t,r){if(e===void 0)return r>0?0:t-1;let n=e<0?e+t:e;return r>0?n=Math.max(0,Math.min(t,n)):n=Math.max(-1,Math.min(t-1,n)),n}function bo(e,t,r){if(e===void 0)return r>0?t:-1;let n=e<0?e+t:e;return r>0?n=Math.max(0,Math.min(t,n)):n=Math.max(-1,Math.min(t-1,n)),n}function at(e){return e.length===0?[1,1,1,1]:e.length===1?[1,1,1,e[0]]:e.length===2?[1,1,e[0],e[1]]:e.length===3?[1,e[0],e[1],e[2]]:e}var vo=null;function oc(e){vo=e}function z(e,t){if(!vo)throw new Error("DeviceManager not set");return vo.createStorageBuffer(t)}var As=class{constructor(t){this.deviceMgr=t}deviceMgr;randomSeed=42;async setSeed(t){this.randomSeed=t}async tensorFromData(t,r,n){await this.deviceMgr.ensureReady(),cr(n);let i=D(r);if(i!==t.length)throw new Error(`tensorFromData expected ${i} values, got ${t.length}.`);let s=t.map(u=>Kt(u,n)),a=new Float32Array(s),o=z(this.deviceMgr.device,a.byteLength);return this.deviceMgr.writeBuffer(o,0,a),this.deviceMgr.registerTensorAsHandle(o,r,n,i)}async zeros(t,r){return this.fill(t,r,0)}async ones(t,r){return this.fill(t,r,1)}async rand(t,r){await this.deviceMgr.ensureReady(),cr(r);let n=D(t),i=this.randomSeed++,s=z(this.deviceMgr.device,Math.max(4,n*4)),a=new Uint32Array([i>>>0,n,0,0]),o=this.deviceMgr.device.createBuffer({size:a.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(Bn,"rand");return P(u,[s,o],B(n)),await E(),o.destroy(),this.deviceMgr.registerTensorAsHandle(s,t,r,n)}async randn(t,r){await this.deviceMgr.ensureReady(),cr(r);let n=D(t),i=this.randomSeed++,s=z(this.deviceMgr.device,Math.max(4,n*4)),a=new Uint32Array([i>>>0,n,0,0]),o=this.deviceMgr.device.createBuffer({size:a.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(Bn,"randn");return P(u,[s,o],B(n)),await E(),o.destroy(),this.deviceMgr.registerTensorAsHandle(s,t,r,n)}async arange(t,r,n,i){if(cr(i),n===0)throw new Error("arange step must be non-zero.");let s=[];if(n>0)for(let a=t;a<r;a+=n)s.push(Kt(a,i));else for(let a=t;a>r;a+=n)s.push(Kt(a,i));return this.tensorFromData(s,[s.length],i)}async full(t,r,n){return this.fill(t,n,r)}async fullLike(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t);return this.fill(i.shape,n??i.dtype,r)}async zerosLike(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);return this.fill(n.shape,r??n.dtype,0)}async onesLike(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);return this.fill(n.shape,r??n.dtype,1)}async emptyLike(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);return this.fill(n.shape,r??n.dtype,0)}async empty(t,r){return this.fill(t,r,0)}async fill(t,r,n){await this.deviceMgr.ensureReady(),cr(r);let i=D(t),s=i*Float32Array.BYTES_PER_ELEMENT,a=z(this.deviceMgr.device,Math.max(4,s)),o=new ArrayBuffer(16),u=new DataView(o);u.setFloat32(0,Kt(n,r),!0),u.setUint32(4,i,!0),u.setUint32(8,0,!0),u.setUint32(12,0,!0);let l=this.deviceMgr.device.createBuffer({size:16,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,o);let c=S(Pi,"fill");return P(c,[a,l],B(i)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(a,t,r,i)}};var qr=class{constructor(t){this.deviceMgr=t}deviceMgr;async elementwiseWithBroadcast(t,r,n){await this.deviceMgr.ensureReady();let i=this.broadcastShapes(t.shape,r.shape),s=D(i),a=t.shape.join(",")!==i.join(",")?await this.broadcastTensor(t,i):t,o=r.shape.join(",")!==i.join(",")?await this.broadcastTensor(r,i):r,u=z(this.deviceMgr.device,Math.max(4,s*4)),l=S(Ft,n);return P(l,[a.buffer,o.buffer,u],B(s)),await E(),this.deviceMgr.registerTensorAsHandle(u,i,t.dtype,s)}async compareWithBroadcast(t,r,n){await this.deviceMgr.ensureReady();let i=this.broadcastShapes(t.shape,r.shape),s=D(i),a=t.shape.join(",")!==i.join(",")?await this.broadcastTensor(t,i):t,o=r.shape.join(",")!==i.join(",")?await this.broadcastTensor(r,i):r,u=z(this.deviceMgr.device,Math.max(4,s*4)),l=S(Nr,n);P(l,[a.buffer,o.buffer,u],B(s)),await E();let c=n==="maximum_op"||n==="minimum_op"?t.dtype:"bool";return this.deviceMgr.registerTensorAsHandle(u,i,c,s)}broadcastShapes(t,r){let n=Math.max(t.length,r.length),i=new Array(n);for(let s=0;s<n;s++){let a=t.length-n+s>=0?t[t.length-n+s]:1,o=r.length-n+s>=0?r[r.length-n+s]:1;if(a!==o&&a!==1&&o!==1)throw new Error(`Shapes [${t}] and [${r}] cannot be broadcast together.`);i[s]=Math.max(a,o)}return i}async broadcastTensor(t,r){let n=r.length-t.shape.length,i=[...new Array(n).fill(1),...t.shape],s=D(r),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=qe(i),u=i.map((f,v)=>f===1?0:o[v]),l=at(r),c=at(u),d=new Uint32Array([l[0],l[1],l[2],l[3],c[0],c[1],c[2],c[3],r.length,s,0,0]),h=this.deviceMgr.device.createBuffer({size:d.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(h,0,d);let m=S(Wr,"main");return P(m,[t.buffer,a,h],B(s)),await E(),h.destroy(),{...t,buffer:a,shape:r,length:s,bytes:a.size}}};var Ps=class{constructor(t){this.deviceMgr=t;this.broadcastOps=new qr(t)}deviceMgr;broadcastOps;async add(t,r){return this.elementwise(t,r,"add")}async mul(t,r){return this.elementwise(t,r,"mul")}async sub(t,r){return this.elementwise(t,r,"sub")}async div(t,r){return this.elementwise(t,r,"div_op")}async where(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r),a=this.deviceMgr.getTensorMeta(n);if(i.shape.join(",")!==s.shape.join(",")||i.shape.join(",")!==a.shape.join(","))throw new Error("where requires all tensors to have the same shape.");let o=D(i.shape),u=z(this.deviceMgr.device,Math.max(4,o*4)),l=S(Wi,"main");return P(l,[i.buffer,s.buffer,a.buffer,u],B(o)),await E(),this.deviceMgr.registerTensorAsHandle(u,s.shape,s.dtype,o)}async clamp(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=D(i.shape),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=new Float32Array([r,n,s,0]),u=this.deviceMgr.device.createBuffer({size:o.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(u,0,o);let l=S(Ji,"main");return P(l,[i.buffer,a,u],B(s)),await E(),u.destroy(),this.deviceMgr.registerTensorAsHandle(a,i.shape,i.dtype,s)}async pow(t,r){return t!==r?this.elementwise(t,r,"pow_op"):this.elementwise(t,r,"pow_op")}async heaviside(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.getTensorMeta(r);if(n.shape.join(",")!==i.shape.join(","))throw new Error("heaviside requires same shape for both inputs.");let s=D(n.shape),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=S(Ft,"heaviside");return P(o,[n.buffer,i.buffer,a],B(s)),await E(),this.deviceMgr.registerTensorAsHandle(a,n.shape,n.dtype,s)}async matmul(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.getTensorMeta(r);if(n.shape.length===2&&i.shape.length===1){let[s,a]=n.shape,[o]=i.shape;if(a!==o)throw new Error(`matmul dimension mismatch: [${s},${a}] x [${o}].`);return this._runMatmul2d(s,a,1,n.buffer,i.buffer,n.dtype)}if(n.shape.length===1&&i.shape.length===2){let[s]=n.shape,[a,o]=i.shape;if(s!==a)throw new Error(`matmul dimension mismatch: [${s}] x [${a},${o}].`);return this._runMatmul2d(1,s,o,n.buffer,i.buffer,i.dtype)}if(n.shape.length===3&&i.shape.length===3){let[s,a,o]=n.shape,[u,l,c]=i.shape;if(s!==u)throw new Error(`matmul batch dim mismatch: ${s} vs ${u}.`);if(o!==l)throw new Error(`matmul dimension mismatch: [${s},${a},${o}] x [${u},${l},${c}].`);return this._runMatmul3d(s,a,o,c,n.buffer,i.buffer,n.dtype)}if(n.shape.length===2&&i.shape.length===2){let[s,a]=n.shape,[o,u]=i.shape;if(a!==o)throw new Error(`matmul dimension mismatch: [${s},${a}] x [${o},${u}].`);return this._runMatmul2d(s,a,u,n.buffer,i.buffer,n.dtype)}if(n.shape.length>=3&&i.shape.length===2){let s=n.shape.slice(0,-2).reduce((c,d)=>c*d,1),[a,o]=n.shape.slice(-2),[u,l]=i.shape;if(o!==u)throw new Error(`matmul dimension mismatch: [...,${a},${o}] x [${u},${l}].`);return this._runMatmul3d(s,a,o,l,n.buffer,i.buffer,n.dtype)}throw new Error(`matmul unsupported shapes: [${n.shape}] and [${i.shape}].`)}async _runMatmul2d(t,r,n,i,s,a){let o=z(this.deviceMgr.device,t*n*4),u=new Uint32Array([t,r,n,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S($n,"matmul_2d");return P(c,[i,s,o,l],B(t*n)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,[t,n],a,t*n)}async _runMatmul3d(t,r,n,i,s,a,o){let u=z(this.deviceMgr.device,t*r*i*4),l=new Uint32Array([r,n,i,t]),c=this.deviceMgr.device.createBuffer({size:l.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(c,0,l);let d=S($n,"matmul_3d");return P(d,[s,a,u,c],B(t*r*i)),await E(),c.destroy(),this.deviceMgr.registerTensorAsHandle(u,[t,r,i],o,t*r*i)}async elementwise(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r);if(i.shape.join(",")!==s.shape.join(","))return this.broadcastOps.elementwiseWithBroadcast(i,s,n);let a=D(i.shape),o=z(this.deviceMgr.device,Math.max(4,a*4)),u=S(Ft,n);return P(u,[i.buffer,s.buffer,o],B(a)),await E(),this.deviceMgr.registerTensorAsHandle(o,i.shape,i.dtype,a)}};var Py=new Set(["relu","sqrt","exp","log","sigmoid","tanh","sin","cos","gelu","silu","sinh","cosh","tan","asin","acos","atan","asinh","acosh","atanh","exp2","log2","log10","log1p","expm1","softplus","mish","hardsigmoid","hardswish","softsign","tanhshrink","trunc","frac","rsqrt","erf","erfc","lgamma","digamma","i0","deg2rad","rad2deg"]),Ey={abs:"abs_op",sqrt:"sqrt_op",exp:"exp_op",log:"log_op",tanh:"tanh_op",sin:"sin_op",cos:"cos_op",silu:"silu_op",gelu:"gelu",neg:"neg",floor:"floor_op",ceil:"ceil_op",round:"round_op",reciprocal:"reciprocal_op",square:"square_op",tan:"tan_op",asin:"asin_op",acos:"acos_op",atan:"atan_op",sinh:"sinh_op",cosh:"cosh_op",asinh:"asinh_op",acosh:"acosh_op",atanh:"atanh_op",exp2:"exp2_op",log2:"log2_op",log10:"log10",log1p:"log1p",expm1:"expm1_op",trunc:"trunc_op",frac:"frac_op",softplus:"softplus_op",mish:"mish_op",hardsigmoid:"hardsigmoid_op",hardswish:"hardswish_op",softsign:"softsign_op",tanhshrink:"tanhshrink_op",rsqrt:"rsqrt_op",sign:"sign_op",sgn:"sgn_op",isnan:"isnan_op",isinf:"isinf_op",isfinite:"isfinite_op",isposinf:"isposinf_op",isneginf:"isneginf_op",logical_not:"logical_not_op",erf:"erf_op",erfc:"erfc_op",lgamma:"lgamma_op",digamma:"digamma_op",i0:"i0_op",deg2rad:"deg2rad_op",rad2deg:"rad2deg_op"},Es=class{constructor(t){this.deviceMgr=t}deviceMgr;async relu(t){return this.unary(t,"relu")}async abs(t){return this.unary(t,"abs")}async sqrt(t){return this.unary(t,"sqrt")}async exp(t){return this.unary(t,"exp")}async log(t){return this.unary(t,"log")}async neg(t){return this.unary(t,"neg")}async sigmoid(t){return this.unary(t,"sigmoid")}async tanh(t){return this.unary(t,"tanh")}async sin(t){return this.unary(t,"sin")}async cos(t){return this.unary(t,"cos")}async gelu(t){return this.unary(t,"gelu")}async silu(t){return this.unary(t,"silu")}async leakyRelu(t,r=.01){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=D(n.shape),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=new Float32Array([r,0,0,0]),o=this.deviceMgr.device.createBuffer({size:a.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(cs,"leaky_relu"),l=this.deviceMgr.device.createBindGroup({layout:u.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:n.buffer}},{binding:1,resource:{buffer:s}},{binding:2,resource:{buffer:o}}]}),c=this.deviceMgr.device.createCommandEncoder(),d=c.beginComputePass();return d.setPipeline(u),d.setBindGroup(0,l),d.dispatchWorkgroups(Math.ceil(i/256)),d.end(),this.deviceMgr.device.queue.submit([c.finish()]),await this.deviceMgr.syncDevice(),o.destroy(),this.deviceMgr.registerTensorAsHandle(s,n.shape,n.dtype,i)}async floor(t){return this.unary(t,"floor")}async ceil(t){return this.unary(t,"ceil")}async round(t){return this.unary(t,"round")}async reciprocal(t){return this.unary(t,"reciprocal")}async square(t){return this.unary(t,"square")}async tan(t){return this.unary(t,"tan")}async asin(t){return this.unary(t,"asin")}async acos(t){return this.unary(t,"acos")}async atan(t){return this.unary(t,"atan")}async sinh(t){return this.unary(t,"sinh")}async cosh(t){return this.unary(t,"cosh")}async asinh(t){return this.unary(t,"asinh")}async acosh(t){return this.unary(t,"acosh")}async atanh(t){return this.unary(t,"atanh")}async exp2(t){return this.unary(t,"exp2")}async log2(t){return this.unary(t,"log2")}async log10(t){return this.unary(t,"log10")}async log1p(t){return this.unary(t,"log1p")}async expm1(t){return this.unary(t,"expm1")}async trunc(t){return this.unary(t,"trunc")}async frac(t){return this.unary(t,"frac")}async softplus(t){return this.unary(t,"softplus")}async mish(t){return this.unary(t,"mish")}async hardsigmoid(t){return this.unary(t,"hardsigmoid")}async hardswish(t){return this.unary(t,"hardswish")}async softsign(t){return this.unary(t,"softsign")}async tanhshrink(t){return this.unary(t,"tanhshrink")}async rsqrt(t){return this.unary(t,"rsqrt")}async sign(t){return this.unary(t,"sign")}async sgn(t){return this.unary(t,"sgn")}async isnan(t){return this.unary(t,"isnan")}async isinf(t){return this.unary(t,"isinf")}async isfinite(t){return this.unary(t,"isfinite")}async isposinf(t){return this.unary(t,"isposinf")}async isneginf(t){return this.unary(t,"isneginf")}async logicalNot(t){return this.unary(t,"logical_not")}async erf(t){return this.unary(t,"erf")}async erfc(t){return this.unary(t,"erfc")}async lgamma(t){return this.unary(t,"lgamma")}async digamma(t){return this.unary(t,"digamma")}async i0(t){return this.unary(t,"i0")}async deg2rad(t){return this.unary(t,"deg2rad")}async rad2deg(t){return this.unary(t,"rad2deg")}BOOL_OPS=new Set(["isnan","isinf","isfinite","isposinf","isneginf","logical_not"]);async unary(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);Py.has(r)&&go(n.dtype,r);let i=D(n.shape),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=S(Gr,Ey[r]||r);P(a,[n.buffer,s],B(i)),await E();let o=this.BOOL_OPS.has(r)?"bool":n.dtype;return this.deviceMgr.registerTensorAsHandle(s,n.shape,o,i)}async fill(t,r){let n=this.deviceMgr.getTensorMeta(t),i=D(n.shape),s=n.dtype,a=new Float32Array(i).fill(r),o=z(this.deviceMgr.device,Math.max(4,i*4));return this.deviceMgr.device.queue.writeBuffer(o,0,a),this.deviceMgr.registerTensorAsHandle(o,n.shape,s,i)}};var Ry=256,Rs=class{constructor(t){this.deviceMgr=t}deviceMgr;async sum(t){return this.reduceAll(t,"sum")}async mean(t){return this.reduceAll(t,"mean")}async sumDim(t,r,n){return this.reduceDim(t,r,n,"sum")}async meanDim(t,r,n){return this.reduceDim(t,r,n,"mean")}async prod(t){return this.reduceAll(t,"prod")}async min(t){return this.reduceAll(t,"min")}async max(t){return this.reduceAll(t,"max")}async any(t){return await this.reduceAll(t,"sum")}async all(t){return await this.reduceAll(t,"sum")}async cumsum(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=D(r.shape),i=z(this.deviceMgr.device,Math.max(4,n*4)),s=new Uint32Array([n,0,0,0]),a=this.deviceMgr.device.createBuffer({size:s.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(a,0,s);let o=S(Qi,"main");return P(o,[r.buffer,i,a],B(n)),await E(),a.destroy(),this.deviceMgr.registerTensorAsHandle(i,r.shape,r.dtype,n)}async cumprod(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=D(r.shape),i=z(this.deviceMgr.device,Math.max(4,n*4)),s=new Uint32Array([n,0,0,0]),a=this.deviceMgr.device.createBuffer({size:s.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(a,0,s);let o=S(Zi,"main");return P(o,[r.buffer,i,a],B(n)),await E(),a.destroy(),this.deviceMgr.registerTensorAsHandle(i,r.shape,r.dtype,n)}async argmax(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=D(r.shape.slice(0,-1)),i=r.shape[r.shape.length-1],s=z(this.deviceMgr.device,Math.max(4,n*4)),a=new Uint32Array([i,n,0,0]),o=this.deviceMgr.device.createBuffer({size:a.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(Ii,"argmax");P(u,[r.buffer,s,o],B(n)),await E(),o.destroy();let l=r.shape.slice(0,-1).length>0?r.shape.slice(0,-1):[1];return this.deviceMgr.registerTensorAsHandle(s,l,"int32",n)}async argmin(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=D(r.shape.slice(0,-1)),i=r.shape[r.shape.length-1],s=z(this.deviceMgr.device,Math.max(4,n*4)),a=new Uint32Array([i,n,0,0]),o=this.deviceMgr.device.createBuffer({size:a.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(Hi,"argmin");P(u,[r.buffer,s,o],B(n)),await E(),o.destroy();let l=r.shape.slice(0,-1).length>0?r.shape.slice(0,-1):[1];return this.deviceMgr.registerTensorAsHandle(s,l,"int32",n)}async reduceAll(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.device,s=n.buffer,a=D(n.shape);for(;a>1;){let l=Math.ceil(a/Ry),c=Math.max(4,l*4),d=z(this.deviceMgr.device,c),h=new Uint32Array([a,0,0,0]),m=i.createBuffer({size:h.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(m,0,h);let f;switch(r){case"prod":f=S(Bi,"main");break;case"max":f=S(Ri,"main");break;case"min":f=S(ki,"main");break;default:f=S(Ei,"main");break}P(f,[s,d,m],B(l)),s=d,a=l,m.destroy()}await E();let o=await this.deviceMgr.readScalar(s);r==="mean"&&(o/=D(n.shape));let u=z(this.deviceMgr.device,4);return this.deviceMgr.writeBuffer(u,0,new Float32Array([o])),this.deviceMgr.registerTensorAsHandle(u,[],n.dtype,1)}async reduceDim(t,r,n,i){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=s.shape.length,o=r<0?r+a:r;if(o<0||o>=a)throw new Error(`dim ${r} out of range for rank ${a}`);let u=s.shape[o],l=s.shape.filter(($,I)=>I!==o),c=D(l),d=z(this.deviceMgr.device,Math.max(4,c*4)),h=D(s.shape.slice(0,o)),m=D(s.shape.slice(o+1)),f=i==="mean"?1:0,v=new Uint32Array([h,u,m,f]),x=this.deviceMgr.device.createBuffer({size:v.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(x,0,v);let M=S($i,"main");P(M,[s.buffer,d,x],B(c)),await E(),x.destroy();let U=n?s.shape.map(($,I)=>I===o?1:$):l;return this.deviceMgr.registerTensorAsHandle(d,U,s.dtype,c)}async nllLoss(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.getTensorMeta(r),s=i.length,a=n.shape[n.shape.length-1],o=z(this.deviceMgr.device,Math.max(4,s*4)),u=new Uint32Array([s,a,0,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Oi,"nll_loss");P(c,[n.buffer,i.buffer,o,l],B(s)),await E(),l.destroy();let d=[s];return this.deviceMgr.registerTensorAsHandle(o,d,n.dtype,s)}async nllLossReduced(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r),a=s.length,o=i.shape[i.shape.length-1];if(a*o!==i.length)throw new Error(`nllLossReduced expects input shape [..., C] and target shape [...]; got input length ${i.length}, target length ${a}, classes ${o}`);let u=z(this.deviceMgr.device,4),l=n==="sum"?1:2,c=new Uint32Array([a,o,l,0]),d=this.deviceMgr.device.createBuffer({size:c.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(d,0,c);let h=S(ws,"nll_loss_reduced");return P(h,[i.buffer,s.buffer,u,d],[1]),await E(),d.destroy(),this.deviceMgr.registerTensorAsHandle(u,[],i.dtype,1)}async softmax(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=r<0?r+n.shape.length:r;if(i<0||i>=n.shape.length)throw new Error(`dim ${r} out of range for rank ${n.shape.length}`);let s=1;for(let f=0;f<i;f++)s*=n.shape[f];let a=n.shape[i],o=1;for(let f=i+1;f<n.shape.length;f++)o*=n.shape[f];let u=s*o,l=D(n.shape),c=z(this.deviceMgr.device,Math.max(4,l*4)),d=new Uint32Array([u,a,o,0]),h=this.deviceMgr.device.createBuffer({size:d.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(h,0,d);let m=S(vs,"softmax");return P(m,[n.buffer,c,h],B(u)),await E(),h.destroy(),this.deviceMgr.registerTensorAsHandle(c,n.shape,n.dtype,l)}async logSoftmax(t,r){let n=this.deviceMgr.getTensorMeta(t),i=r<0?r+n.shape.length:r,s=D(n.shape),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=this.deviceMgr.device.createCommandEncoder();o.copyBufferToBuffer(n.buffer,0,a,0,n.bytes),this.deviceMgr.device.queue.submit([o.finish()]);let u=new Int32Array([i,n.shape.length,s,0,...n.shape.slice(0,4).map(d=>Math.max(1,d))]),l=this.deviceMgr.device.createBuffer({size:Math.max(16,Math.ceil(u.byteLength/16)*16),usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Ui,"log_softmax");return P(c,[n.buffer,a,l],B(s)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(a,n.shape,n.dtype,s)}async logSoftmaxBackward(t,r,n,i){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=n*i,o=z(this.deviceMgr.device,Math.max(4,a*4)),u=new Uint32Array([n,i,0,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Gi,"log_softmax_backward");return P(c,[s.buffer,this.deviceMgr.getTensorMeta(r).buffer,o,l],B(a)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,[n,i],s.dtype,a)}async softmaxBackward(t,r,n,i){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=n*i,o=z(this.deviceMgr.device,Math.max(4,a*4)),u=new Uint32Array([n,i,0,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Ni,"softmax_backward");return P(c,[s.buffer,this.deviceMgr.getTensorMeta(r).buffer,o,l],B(a)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,[n,i],s.dtype,a)}async nllLossBackward(t,r,n,i=1){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=r*n,o=z(this.deviceMgr.device,Math.max(4,a*4)),u=new Float32Array([r,n,i,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Fi,"nll_loss_backward");return P(c,[s.buffer,o,l],B(a)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,[r,n],"float32",a)}async crossEntropy(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.getTensorMeta(r),s=i.length,a=n.shape[n.shape.length-1],o=z(this.deviceMgr.device,Math.max(4,s*4)),u=new Uint32Array([s,a,0,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(gs,"cross_entropy");return P(c,[n.buffer,i.buffer,o,l],B(s)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,[s],n.dtype,s)}async crossEntropyBackward(t,r,n,i){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=this.deviceMgr.getTensorMeta(r),o=this.deviceMgr.getTensorMeta(n),u=o.length,l=a.shape[a.shape.length-1],c=u*l,d=i==="none"?0:i==="sum"?1:2,h=s.length===1?1:0,m=i==="mean"?1/Math.max(1,u):1,f=z(this.deviceMgr.device,Math.max(4,c*4)),v=new Uint32Array([u,l,d,h]),x=new Float32Array([m,0,0,0]),M=this.deviceMgr.device.createBuffer({size:v.byteLength,usage:b.UNIFORM|b.COPY_DST}),U=this.deviceMgr.device.createBuffer({size:x.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(M,0,v),this.deviceMgr.writeBuffer(U,0,x);let $=S(ys,"cross_entropy_backward");return P($,[s.buffer,a.buffer,o.buffer,f,M,U],B(c)),await E(),M.destroy(),U.destroy(),this.deviceMgr.registerTensorAsHandle(f,[u,l],a.dtype,c)}async adamStep(t,r,n,i,s,a,o,u,l,c,d){await this.deviceMgr.ensureReady();let h=this.deviceMgr.getTensorMeta(t),m=this.deviceMgr.getTensorMeta(r),f=this.deviceMgr.getTensorMeta(n),v=this.deviceMgr.getTensorMeta(i),x=h.length;if(m.length!==x||f.length!==x||v.length!==x)throw new Error("adamStep: tensor lengths must match");let M=new Uint32Array([x,0,0,0]),U=new Float32Array([s,a,o,u]),$=new Float32Array([l,c,d,0]),I=this.deviceMgr.device.createBuffer({size:M.byteLength,usage:b.UNIFORM|b.COPY_DST}),G=this.deviceMgr.device.createBuffer({size:U.byteLength,usage:b.UNIFORM|b.COPY_DST}),C=this.deviceMgr.device.createBuffer({size:$.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(I,0,M),this.deviceMgr.writeBuffer(G,0,U),this.deviceMgr.writeBuffer(C,0,$);let Y=S(bs,"adam_step");P(Y,[h.buffer,m.buffer,f.buffer,v.buffer,I,G,C],B(x)),await E(),I.destroy(),G.destroy(),C.destroy()}async adamWStep(t,r,n,i,s,a,o,u,l,c,d){await this.deviceMgr.ensureReady();let h=this.deviceMgr.getTensorMeta(t),m=this.deviceMgr.getTensorMeta(r),f=this.deviceMgr.getTensorMeta(n),v=this.deviceMgr.getTensorMeta(i),x=h.length;if(m.length!==x||f.length!==x||v.length!==x)throw new Error("adamWStep: tensor lengths must match");let M=new Uint32Array([x,0,0,0]),U=new Float32Array([s,a,o,u]),$=new Float32Array([l,c,d,0]),I=this.deviceMgr.device.createBuffer({size:M.byteLength,usage:b.UNIFORM|b.COPY_DST}),G=this.deviceMgr.device.createBuffer({size:U.byteLength,usage:b.UNIFORM|b.COPY_DST}),C=this.deviceMgr.device.createBuffer({size:$.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(I,0,M),this.deviceMgr.writeBuffer(G,0,U),this.deviceMgr.writeBuffer(C,0,$);let Y=S(_s,"adamw_step");P(Y,[h.buffer,m.buffer,f.buffer,v.buffer,I,G,C],B(x)),await E(),I.destroy(),G.destroy(),C.destroy()}async sgdStep(t,r,n,i,s,a,o,u){await this.deviceMgr.ensureReady();let l=this.deviceMgr.getTensorMeta(t),c=this.deviceMgr.getTensorMeta(r),d=this.deviceMgr.getTensorMeta(n),h=l.length;if(c.length!==h||d.length!==h)throw new Error("sgdStep: tensor lengths must match");let m=s!==0?1:0,f=new Uint32Array([h,m,u?1:0,0]),v=new Float32Array([i,s,a,o]),x=this.deviceMgr.device.createBuffer({size:f.byteLength,usage:b.UNIFORM|b.COPY_DST}),M=this.deviceMgr.device.createBuffer({size:v.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(x,0,f),this.deviceMgr.writeBuffer(M,0,v);let U=S(xs,"sgd_step");P(U,[l.buffer,c.buffer,d.buffer,x,M],B(h)),await E(),x.destroy(),M.destroy()}async rmspropStep(t,r,n,i,s,a,o,u,l){await this.deviceMgr.ensureReady();let c=this.deviceMgr.getTensorMeta(t),d=this.deviceMgr.getTensorMeta(r),h=this.deviceMgr.getTensorMeta(n),m=this.deviceMgr.getTensorMeta(i),f=c.length;if(d.length!==f||h.length!==f||m.length!==f)throw new Error("rmspropStep: tensor lengths must match");let v=new Uint32Array([f,l!==0?1:0,0,0]),x=new Float32Array([s,a,o,u]),M=new Float32Array([l,0,0,0]),U=this.deviceMgr.device.createBuffer({size:v.byteLength,usage:b.UNIFORM|b.COPY_DST}),$=this.deviceMgr.device.createBuffer({size:x.byteLength,usage:b.UNIFORM|b.COPY_DST}),I=this.deviceMgr.device.createBuffer({size:M.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(U,0,v),this.deviceMgr.writeBuffer($,0,x),this.deviceMgr.writeBuffer(I,0,M);let G=S(Ts,"rmsprop_step");P(G,[c.buffer,d.buffer,h.buffer,m.buffer,U,$,I],B(f)),await E(),U.destroy(),$.destroy(),I.destroy()}async maxMinBackward(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r),a=i.length,o=z(this.deviceMgr.device,Math.max(4,a*4)),u=new Uint32Array([a,n==="max"?0:1,0,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Ms,"maxmin_backward");return P(c,[i.buffer,s.buffer,o,l],[1]),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(o,i.shape,i.dtype,a)}async elementwiseOp(t,r,n){let i=this.deviceMgr.getTensorMeta(t),s=D(i.shape);if(r>=100){let o=this.deviceMgr.getTensorMeta(r),u=D(o.shape),l=Math.max(s,u),c=z(this.deviceMgr.device,Math.max(4,l*4)),d=S(Ft,n);return P(d,[i.buffer,o.buffer,c],B(l)),await E(),this.deviceMgr.registerTensorAsHandle(c,i.shape,i.dtype,l)}else{let o=r,u=z(this.deviceMgr.device,Math.max(4,s*4)),l=new Float32Array([o,s,0,0]),c=this.deviceMgr.device.createBuffer({size:16,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(c,0,l);let d=S(Gr,n);return P(d,[i.buffer,u],B(s)),await E(),c.destroy(),this.deviceMgr.registerTensorAsHandle(u,i.shape,i.dtype,s)}}};var uc=16;function De(e,t,r){let n=Math.max(r,Math.ceil(t.byteLength/uc)*uc),i=e.device.createBuffer({size:n,usage:b.UNIFORM|b.COPY_DST});return e.writeBuffer(i,0,t),i}function Le(e){return e.length===0?[1,1,1,1]:e.length===1?[e[0],1,1,1]:e.length===2?[e[0],e[1],1,1]:e.length===3?[e[0],e[1],e[2],1]:e}var ks=class{constructor(t){this.deviceMgr=t}deviceMgr;async reshape(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);if(D(r)!==n.length)throw new Error(`reshape: product ${r} != ${n.length}`);let i=z(this.deviceMgr.device,n.bytes),s=this.deviceMgr.device.createCommandEncoder();return s.copyBufferToBuffer(n.buffer,0,i,0,n.bytes),this.deviceMgr.device.queue.submit([s.finish()]),this.deviceMgr.registerTensorAsHandle(i,r,n.dtype,n.length)}async flatten(t,r=0,n=-1){let i=this.deviceMgr.getTensorMeta(t),s=i.shape.length,a=r<0?r+s:r,o=n<0?n+s:n,u=D(i.shape.slice(a,o+1)),l=[...i.shape.slice(0,a),u,...i.shape.slice(o+1)];return this.reshape(t,l)}async squeeze(t,r){let n=this.deviceMgr.getTensorMeta(t),i=r!==void 0?n.shape.filter((s,a)=>!(a===(r<0?r+n.shape.length:r)&&n.shape[a]===1)):n.shape.filter(s=>s!==1);return i.length===0?this.reshape(t,[1]):this.reshape(t,i)}async unsqueeze(t,r){let n=this.deviceMgr.getTensorMeta(t),i=n.shape.length,s=r<0?r+i+1:r,a=[...n.shape.slice(0,s),1,...n.shape.slice(s)];return this.reshape(t,a)}async transpose2d(t){return this.transpose(t,0,1)}async transpose(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t);if(i.shape.length===2)return this.transpose2dImpl(i);let s=i.shape.map((a,o)=>o);return[s[r],s[n]]=[s[n],s[r]],this.permute(t,s)}async permute(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t);if(n.shape.length!==r.length)throw new Error("permute: dims length mismatch");let i=r.map(v=>n.shape[v]),s=D(i),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=this.deviceMgr.device.createBuffer({size:r.length*4,usage:b.STORAGE|b.COPY_DST}),u=4-r.length;this.deviceMgr.writeBuffer(o,0,new Uint32Array(r.map(v=>v+u)));let l=at(i),c=qe(at(n.shape)),d=qe(at(i)),h=new Uint32Array([l[0],l[1],l[2],l[3],c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],r.length,s,0,0]),m=De(this.deviceMgr,h,64),f=S(us,"main");return P(f,[n.buffer,o,a,m],B(s)),await E(),o.destroy(),m.destroy(),this.deviceMgr.registerTensorAsHandle(a,i,n.dtype,s)}async select(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=i.shape.length,a=bt(r,s),o=i.shape.filter((v,x)=>x!==a),u=D(o),l=z(this.deviceMgr.device,Math.max(4,u*4)),c=Le(i.shape),d=Le(o),h=new Uint32Array([c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],a,n,s,u,0]),m=De(this.deviceMgr,h,64),f=S(ls,"main");return P(f,[i.buffer,l,m],B(u)),await E(),m.destroy(),this.deviceMgr.registerTensorAsHandle(l,o,i.dtype,u)}async slice(t,r,n,i,s=1){await this.deviceMgr.ensureReady();let a=this.deviceMgr.getTensorMeta(t),o=a.shape.length,u=bt(r,o),l=a.shape[u],c=yo(n,l,s),d=bo(i,l,s),h=Math.ceil(Math.abs(d-c)/Math.abs(s)),m=[...a.shape];m[u]=h;let f=D(m),v=z(this.deviceMgr.device,Math.max(4,f*4)),x=Le(a.shape),M=Le(m),U=[0,0,0,0],$=[1,1,1,1];U[u]=c,$[u]=s;let I=new Int32Array([x[0],x[1],x[2],x[3],M[0],M[1],M[2],M[3],U[0],U[1],U[2],U[3],$[0],$[1],$[2],$[3],o,f,0,0]),G=De(this.deviceMgr,I,80),C=S(Li,"slice");return P(C,[a.buffer,v,G],B(f)),await E(),G.destroy(),this.deviceMgr.registerTensorAsHandle(v,m,a.dtype,f)}async sliceBackward(t,r,n,i,s,a){await this.deviceMgr.ensureReady();let o=this.deviceMgr.getTensorMeta(t),u=D(r),l=z(this.deviceMgr.device,Math.max(4,u*4)),c=Le(n),d=Le(r),h=[0,0,0,0],m=[1,1,1,1],f=r.length,v=i<0?i+f:i;h[v]=s,m[v]=a;let x=new Int32Array([c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],h[0],h[1],h[2],h[3],m[0],m[1],m[2],m[3],f,D(n),0,0]),M=De(this.deviceMgr,x,80),U=S(Vi,"slice_backward");return P(U,[o.buffer,l,M],B(D(n))),await E(),M.destroy(),this.deviceMgr.registerTensorAsHandle(l,r,o.dtype,u)}async cat(t,r){if(await this.deviceMgr.ensureReady(),t.length!==2)throw new Error("cat currently supports exactly 2 tensors.");let n=this.deviceMgr.getTensorMeta(t[0]),i=this.deviceMgr.getTensorMeta(t[1]),s=n.shape.length,a=bt(r,s),o=[...n.shape];o[a]=n.shape[a]+i.shape[a];let u=D(o),l=z(this.deviceMgr.device,Math.max(4,u*4)),c=Le(n.shape),d=Le(i.shape),h=Le(o),m=new Uint32Array([c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],h[0],h[1],h[2],h[3],a,s,0,0]),f=De(this.deviceMgr,m,64),v=S(as,"main");return P(v,[n.buffer,i.buffer,l,f],B(u)),await E(),f.destroy(),this.deviceMgr.registerTensorAsHandle(l,o,n.dtype,u)}async stack(t,r){if(await this.deviceMgr.ensureReady(),t.length!==2)throw new Error("stack currently supports exactly 2 tensors.");let n=this.deviceMgr.getTensorMeta(t[0]),i=this.deviceMgr.getTensorMeta(t[1]),s=n.shape.length,a=bt(r,s+1),o=[...n.shape];o.splice(a,0,2);let u=D(o),l=z(this.deviceMgr.device,Math.max(4,u*4)),c=Le(n.shape),d=Le(o),h=new Uint32Array([c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],a,s,0,0]),m=De(this.deviceMgr,h,48),f=S(os,"main");return P(f,[n.buffer,i.buffer,l,m],B(u)),await E(),m.destroy(),this.deviceMgr.registerTensorAsHandle(l,o,n.dtype,u)}async expand(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=D(r),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=r.length-n.shape.length,o=[...new Array(a).fill(1),...n.shape],u=qe(o),l=o.map((v,x)=>v===1?0:u[x]),c=at(r),d=at(l),h=new Uint32Array([c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],r.length,i,0,0]),m=De(this.deviceMgr,h,48),f=S(Wr,"main");return P(f,[n.buffer,s,m],B(i)),await E(),m.destroy(),this.deviceMgr.registerTensorAsHandle(s,r,n.dtype,i)}async tril(t,r=0){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=D(n.shape),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=n.shape[n.shape.length-2]??1,o=n.shape[n.shape.length-1]??i,u=new Int32Array([a,o,r,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Yi,"main");return P(c,[n.buffer,s,l],B(i)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(s,n.shape,n.dtype,i)}async triu(t,r=0){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=D(n.shape),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=n.shape[n.shape.length-2]??1,o=n.shape[n.shape.length-1]??i,u=new Int32Array([a,o,r,0]),l=this.deviceMgr.device.createBuffer({size:u.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(l,0,u);let c=S(Ki,"main");return P(c,[n.buffer,s,l],B(i)),await E(),l.destroy(),this.deviceMgr.registerTensorAsHandle(s,n.shape,n.dtype,i)}async flip(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=D(n.shape),s=z(this.deviceMgr.device,Math.max(4,i*4)),a=new Int32Array([r.length,i,0,0,...r.slice(0,4).map(l=>l<0?l+n.shape.length:l)]),o=this.deviceMgr.device.createBuffer({size:Math.max(16,Math.ceil(a.byteLength/16)*16),usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(o,0,a);let u=S(Xi,"main");return P(u,[n.buffer,s,o],B(i)),await E(),o.destroy(),this.deviceMgr.registerTensorAsHandle(s,n.shape,n.dtype,i)}async repeat(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=n.shape.map((v,x)=>v*(r[x]??1)),s=D(i),a=z(this.deviceMgr.device,Math.max(4,s*4)),o=at(i),u=at(n.shape),l=qe(n.shape),c=qe(i),d=new Array(4).fill(1);for(let v=0;v<r.length;v++)d[v]=r[v]??1;let h=new Uint32Array([u[0],u[1],u[2],u[3],o[0],o[1],o[2],o[3],l[0],l[1],l[2],l[3],c[0],c[1],c[2],c[3],d[0],d[1],d[2],d[3],n.shape.length,s,0,0]),m=De(this.deviceMgr,h,96),f=S(ds,"main");return P(f,[n.buffer,a,m],B(s)),await E(),m.destroy(),this.deviceMgr.registerTensorAsHandle(a,i,n.dtype,s)}async indexSelect(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(n),a=i.shape.length;if(a>2)throw new Error("indexSelect currently supports only 1D and 2D tensors.");let o=bt(r,a),u=[...i.shape];u[o]=s.length;let l=D(u),c=z(this.deviceMgr.device,Math.max(4,l*4)),d=S(Ci,a===1?"index_select_1d":"index_select_2d");if(a===1){let h=new Uint32Array([0,0,0,s.length]),m=De(this.deviceMgr,h,16);P(d,[i.buffer,s.buffer,c,m],B(l)),await E(),m.destroy()}else{let h=new Uint32Array([o,i.shape[0]??1,i.shape[1]??1,s.length]),m=De(this.deviceMgr,h,16);P(d,[i.buffer,s.buffer,c,m],B(l)),await E(),m.destroy()}return this.deviceMgr.registerTensorAsHandle(c,u,i.dtype,l)}async gather(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(n),a=i.shape.length;if(a>4)throw new Error("gather supports only up to 4D tensors.");let o=bt(r,a),u=s.length,l=z(this.deviceMgr.device,Math.max(4,u*4)),c=qe(i.shape),d=Le(i.shape),h=Le(c),m=Le(s.shape),f=new Uint32Array([o,a,u,0,d[0],h[0],d[1],h[1],d[2],h[2],d[3],h[3],m[0],m[1],m[2],m[3]]),v=De(this.deviceMgr,f,64),x=S(ps,"main");return P(x,[i.buffer,s.buffer,l,v],B(u)),await E(),v.destroy(),this.deviceMgr.registerTensorAsHandle(l,[...s.shape],i.dtype,u)}async transpose2dImpl(t){let[r,n]=t.shape,i=z(this.deviceMgr.device,t.bytes),s=new Uint32Array([r,n,0,0]),a=De(this.deviceMgr,s,16),o=S(Di,"transpose_2d");return P(o,[t.buffer,i,a],B(r*n)),await E(),a.destroy(),this.deviceMgr.registerTensorAsHandle(i,[n,r],t.dtype,r*n)}async sort(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=n.shape.length,s=bt(r,i),a=n.shape[s],u=qe(n.shape)[s],l=u*a,c=n.length/a,d=z(this.deviceMgr.device,n.bytes),h=z(this.deviceMgr.device,n.bytes),m=new Uint32Array([a,c,u,l]),f=De(this.deviceMgr,m,16),v=S(hs,"main");return P(v,[n.buffer,d,h,f],[c,1,1]),await E(),f.destroy(),[this.deviceMgr.registerTensorAsHandle(d,[...n.shape],n.dtype,n.length),this.deviceMgr.registerTensorAsHandle(h,[...n.shape],"int64",n.length)]}async sortBackward(t,r,n,i){await this.deviceMgr.ensureReady();let s=this.deviceMgr.getTensorMeta(t),a=this.deviceMgr.getTensorMeta(r),o=n.length,u=bt(i,o),l=D(n),c=qe(n),d=n[u],h=c[u],m=h*d,f=l/d,v=z(this.deviceMgr.device,Math.max(4,l*4)),x=new Uint32Array([d,f,h,m]),M=De(this.deviceMgr,x,16),U=S(ms,"sort_backward");return P(U,[s.buffer,a.buffer,v,M],[f,1,1]),await E(),M.destroy(),this.deviceMgr.registerTensorAsHandle(v,[...n],s.dtype,l)}async topkBackward(t,r,n,i,s){await this.deviceMgr.ensureReady();let a=this.deviceMgr.getTensorMeta(t),o=this.deviceMgr.getTensorMeta(r),u=n.length,l=bt(i,u),c=D(n),h=qe(n)[l],m=n[l],f=h*m,v=h*s,x=c/m,M=z(this.deviceMgr.device,Math.max(4,c*4)),U=this.deviceMgr.device.createCommandEncoder();U.clearBuffer(M,0,Math.max(4,c*4)),this.deviceMgr.device.queue.submit([U.finish()]);let $=new Uint32Array([s,x,h,f,v]),I=De(this.deviceMgr,$,32),G=S(fs,"topk_backward");return P(G,[a.buffer,o.buffer,M,I],[x,1,1]),await E(),I.destroy(),this.deviceMgr.registerTensorAsHandle(M,[...n],a.dtype,c)}};var Bs=class{constructor(t){this.deviceMgr=t;this.broadcastOps=new qr(t)}deviceMgr;broadcastOps;async eq(t,r){return this.compare(t,r,"eq")}async ne(t,r){return this.compare(t,r,"ne")}async lt(t,r){return this.compare(t,r,"lt")}async le(t,r){return this.compare(t,r,"le")}async gt(t,r){return this.compare(t,r,"gt")}async ge(t,r){return this.compare(t,r,"ge")}async maximum(t,r){return this.compare(t,r,"maximum_op")}async minimum(t,r){return this.compare(t,r,"minimum_op")}async compare(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r);if(i.shape.join(",")!==s.shape.join(","))return this.broadcastOps.compareWithBroadcast(i,s,n);let a=D(i.shape),o=z(this.deviceMgr.device,Math.max(4,a*4)),u=S(Nr,n);P(u,[i.buffer,s.buffer,o],B(a)),await E();let l=n==="maximum_op"||n==="minimum_op"?i.dtype:"bool";return this.deviceMgr.registerTensorAsHandle(o,i.shape,l,a)}};var $s=class{constructor(t){this.deviceMgr=t}deviceMgr;async maskedSelect(t,r){await this.deviceMgr.ensureReady();let n=this.deviceMgr.getTensorMeta(t),i=this.deviceMgr.getTensorMeta(r),s=D(n.shape),a=await this.deviceMgr.readFromGPU(i.buffer,s,"bool"),o=await this.deviceMgr.readFromGPU(n.buffer,s,n.dtype),u=[];for(let d=0;d<s;d++)a[d]!==0&&u.push(o[d]);let l=u.length,c=z(this.deviceMgr.device,Math.max(4,l*4));return l>0&&this.deviceMgr.writeBuffer(c,0,new Float32Array(u)),this.deviceMgr.registerTensorAsHandle(c,[l],n.dtype,l)}async maskedFill(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r),a=D(i.shape),o=z(this.deviceMgr.device,i.bytes),u=this.deviceMgr.device.createCommandEncoder();u.copyBufferToBuffer(i.buffer,0,o,0,i.bytes),this.deviceMgr.device.queue.submit([u.finish()]);let l=Kt(n,i.dtype),c=new Float32Array([l,a,0,0]),d=this.deviceMgr.device.createBuffer({size:c.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(d,0,c);let h=S(ji,"main");return P(h,[i.buffer,s.buffer,o,d],B(a)),await E(),d.destroy(),this.deviceMgr.registerTensorAsHandle(o,i.shape,i.dtype,a)}};var Ds=class{constructor(t){this.deviceMgr=t}deviceMgr;async cholesky(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=r.shape,i=n.length===3?n[2]:n[1],s=n.length===3?n[0]:1,a=r.bytes,o=z(this.deviceMgr.device,a),u=this.deviceMgr.device.createCommandEncoder();u.copyBufferToBuffer(r.buffer,0,o,0,a),this.deviceMgr.device.queue.submit([u.finish()]);let l=S(es,"cholesky_small"),c=new Uint32Array([i,s,0]),d=this.deviceMgr.device.createBuffer({size:c.byteLength,usage:b.UNIFORM|b.COPY_DST});return this.deviceMgr.writeBuffer(d,0,c),P(l,[o,d],B(s)),await E(),d.destroy(),this.deviceMgr.registerTensorAsHandle(o,r.shape,r.dtype,D(r.shape))}async lu(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t),n=r.shape,i=n.length===3?n[2]:n[1],s=n.length===3?n[0]:1,a=r.bytes,o=z(this.deviceMgr.device,a),u=this.deviceMgr.device.createCommandEncoder();u.copyBufferToBuffer(r.buffer,0,o,0,a),this.deviceMgr.device.queue.submit([u.finish()]);let l=s*i*4,c=z(this.deviceMgr.device,l);{let v=new Uint32Array(s*i);for(let U=0;U<s;U++)for(let $=0;$<i;$++)v[U*i+$]=$;let x=this.deviceMgr.device.createBuffer({size:v.byteLength,usage:b.COPY_DST,mappedAtCreation:!0});new Uint32Array(x.getMappedRange()).set(v),x.unmap();let M=this.deviceMgr.device.createCommandEncoder();M.copyBufferToBuffer(x,0,c,0,v.byteLength),this.deviceMgr.device.queue.submit([M.finish()]),x.destroy()}let d=S(Dn,"lu_pivot"),h=S(Dn,"lu_update");for(let v=0;v<i-1;v++){let x=new Uint32Array([i,s,v]),M=this.deviceMgr.device.createBuffer({size:x.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(M,0,x),P(d,[o,c,M],B(s)),await E(),P(h,[o,c,M],B(s*i)),await E(),M.destroy()}let m=this.deviceMgr.registerTensorAsHandle(o,r.shape,r.dtype,D(r.shape)),f=this.deviceMgr.registerTensorAsHandle(c,[s,i],"int32",s*i);return[m,f]}async triangularSolve(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),s=this.deviceMgr.getTensorMeta(r),a=i.shape,o=a[a.length-1],u=a.length===3?a[0]:1,l=s.shape[s.shape.length-1],c=s.bytes,d=z(this.deviceMgr.device,c),h=this.deviceMgr.device.createCommandEncoder();h.copyBufferToBuffer(s.buffer,0,d,0,c),this.deviceMgr.device.queue.submit([h.finish()]);let f=S(ts,n?"backward_sub_step":"forward_sub_step");for(let v=0;v<o;v++){let x=new Uint32Array([o,l,u,v]),M=this.deviceMgr.device.createBuffer({size:x.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(M,0,x),P(f,[i.buffer,d,M],B(l*u)),await E(),M.destroy()}return this.deviceMgr.registerTensorAsHandle(d,s.shape,s.dtype,D(s.shape))}};var Us=class{constructor(t){this.deviceMgr=t}deviceMgr;async conv2d(t,r,n,i,s,a,o){await this.deviceMgr.ensureReady();let u=this.deviceMgr.getTensorMeta(t),l=this.deviceMgr.getTensorMeta(r),[c,d,h,m]=u.shape,[f,,v,x]=l.shape,M=s[0]??0,U=s[1]??s[0]??0,$=i[0]??1,I=i[1]??i[0]??1,G=Math.floor((h+2*M-v)/$+1),C=Math.floor((m+2*U-x)/I+1),Y=c*f*G*C,Me=z(this.deviceMgr.device,Math.max(4,Y*4)),ke=n??new Array(f).fill(0),Ye=z(this.deviceMgr.device,Math.max(4,f*4));this.deviceMgr.writeBuffer(Ye,0,new Float32Array(ke));let In=new Uint32Array([c,d,f,h,m,G,C,v,x,$,I,M,U,o,0]),Cs=this.deviceMgr.device.createBuffer({size:In.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(Cs,0,In);let lc=S(rs,"conv2d");return P(lc,[u.buffer,l.buffer,Ye,Me,Cs],B(Y)),await E(),Cs.destroy(),Ye.destroy(),this.deviceMgr.registerTensorAsHandle(Me,[c,f,G,C],u.dtype,Y)}async conv2dInputBackward(t,r,n,i,s,a){await this.deviceMgr.ensureReady();let o=this.deviceMgr.getTensorMeta(t),u=this.deviceMgr.getTensorMeta(r),[l,c,d,h]=n,[,m,f,v]=i,[,,x,M]=u.shape,U=s[0]??1,$=s[1]??s[0]??1,I=a[0]??0,G=a[1]??a[0]??0,C=1,Y=l*c*d*h,Me=z(this.deviceMgr.device,Math.max(4,Y*4)),ke=new Uint32Array([l,c,m,d,h,f,v,x,M,U,$,I,G,C,0]),Ye=this.deviceMgr.device.createBuffer({size:ke.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(Ye,0,ke);let In=S(jr,"conv2d_input_backward");return P(In,[{binding:0,resource:{buffer:o.buffer,offset:0,size:o.buffer.size}},{binding:1,resource:{buffer:u.buffer,offset:0,size:u.buffer.size}},{binding:2,resource:{buffer:Me,offset:0,size:Me.size}},{binding:3,resource:{buffer:Ye,offset:0,size:Ye.size}}],B(Y)),await E(),Ye.destroy(),this.deviceMgr.registerTensorAsHandle(Me,[l,c,d,h],o.dtype,Y)}async conv2dWeightBackward(t,r,n,i,s,a,o){await this.deviceMgr.ensureReady();let u=this.deviceMgr.getTensorMeta(t),l=this.deviceMgr.getTensorMeta(r),[c,d,h,m]=n,[f]=s,[,,v,x]=i,M=a[0]??1,U=a[1]??a[0]??1,$=o[0]??0,I=o[1]??o[0]??0,G=1,C=c*d*h*m,Y=z(this.deviceMgr.device,Math.max(4,C*4)),Me=new Uint32Array([s[0],s[1],c,s[2],s[3],v,x,h,m,M,U,$,I,G,0]),ke=this.deviceMgr.device.createBuffer({size:Me.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(ke,0,Me);let Ye=S(jr,"conv2d_weight_backward");return P(Ye,[{binding:0,resource:{buffer:u.buffer,offset:0,size:u.buffer.size}},{binding:3,resource:{buffer:ke,offset:0,size:ke.size}},{binding:4,resource:{buffer:Y,offset:0,size:Y.size}},{binding:5,resource:{buffer:l.buffer,offset:0,size:l.buffer.size}}],B(C)),await E(),ke.destroy(),this.deviceMgr.registerTensorAsHandle(Y,[c,d,h,m],u.dtype,C)}async conv2dBiasBackward(t,r,n){await this.deviceMgr.ensureReady();let i=this.deviceMgr.getTensorMeta(t),[s,,a,o]=n,u=1,l=1,c=0,d=0,h=1,m=1,f=a,v=o,x=r,M=z(this.deviceMgr.device,Math.max(4,x*4)),U=new Uint32Array([s,m,r,f,v,a,o,1,1,u,l,c,d,h,0]),$=this.deviceMgr.device.createBuffer({size:U.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer($,0,U);let I=S(jr,"conv2d_bias_backward");return P(I,[{binding:0,resource:{buffer:i.buffer,offset:0,size:i.buffer.size}},{binding:3,resource:{buffer:$,offset:0,size:$.size}},{binding:4,resource:{buffer:M,offset:0,size:M.size}}],B(x)),await E(),$.destroy(),this.deviceMgr.registerTensorAsHandle(M,[r],i.dtype,x)}};var Os=class{constructor(t){this.deviceMgr=t}deviceMgr;async maxPool2d(t,r,n,i,s){await this.deviceMgr.ensureReady();let a=this.deviceMgr.getTensorMeta(t),[o,u,l,c]=a.shape,d=r[0],h=r[1]??r[0],m=n[0]??d,f=n[1]??n[0]??h,v=i[0]??0,x=i[1]??i[0]??0,M=s[0]??1,U=s[1]??s[0]??1,$=Math.floor((l+2*v-(M*(d-1)+1))/m+1),I=Math.floor((c+2*x-(U*(h-1)+1))/f+1),G=o*u*$*I,C=z(this.deviceMgr.device,Math.max(4,G*4)),Y=new Uint32Array([o,u,l,c,$,I,d,h,m,f,v,x,M,U]),Me=this.deviceMgr.device.createBuffer({size:Y.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(Me,0,Y);let ke=S(ns,"main");return P(ke,[a.buffer,C,Me],B(G)),await E(),Me.destroy(),this.deviceMgr.registerTensorAsHandle(C,[o,u,$,I],a.dtype,G)}async avgPool2d(t,r,n,i,s){await this.deviceMgr.ensureReady();let a=this.deviceMgr.getTensorMeta(t),[o,u,l,c]=a.shape,d=r[0],h=r[1]??r[0],m=n[0]??d,f=n[1]??n[0]??h,v=i[0]??0,x=i[1]??i[0]??0,M=Math.floor((l+2*v-d)/m+1),U=Math.floor((c+2*x-h)/f+1),$=o*u*M*U,I=z(this.deviceMgr.device,Math.max(4,$*4)),G=new Uint32Array([o,u,l,c,M,U,d,h,m,f,v,x,s?1:0,0]),C=this.deviceMgr.device.createBuffer({size:G.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(C,0,G);let Y=S(is,"main");return P(Y,[a.buffer,I,C],B($)),await E(),C.destroy(),this.deviceMgr.registerTensorAsHandle(I,[o,u,M,U],a.dtype,$)}};var Is=class{constructor(t){this.deviceMgr=t}deviceMgr;async batchNorm(t,r,n,i,s,a){await this.deviceMgr.ensureReady();let o=this.deviceMgr.getTensorMeta(t),u=o.shape,l,c,d;if(u.length===2)l=u[0],c=u[1],d=1;else if(u.length>=3)l=u[0],c=u[1],d=D(u.slice(2));else throw new Error("batch_norm needs at least 2D input");let h=l*c*d,m=r!==null?this.deviceMgr.getTensorMeta(r).buffer:this._makeOnesBuf(c),f=n!==null?this.deviceMgr.getTensorMeta(n).buffer:this._makeZerosBuf(c),v=i!==null?this.deviceMgr.getTensorMeta(i).buffer:this._makeZerosBuf(c),x=s!==null?this.deviceMgr.getTensorMeta(s).buffer:this._makeOnesBuf(c),M=z(this.deviceMgr.device,Math.max(4,h*4)),U=new Float32Array([l,c,d,a,0,0,0]),$=this.deviceMgr.device.createBuffer({size:U.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer($,0,new Uint8Array(U.buffer));let I=S(ss,"main");return P(I,[o.buffer,m,f,v,x,M,$],B(h)),await E(),$.destroy(),r===null&&m.destroy(),n===null&&f.destroy(),i===null&&v.destroy(),s===null&&x.destroy(),this.deviceMgr.registerTensorAsHandle(M,u,o.dtype,h)}async layerNorm(t,r,n,i,s){await this.deviceMgr.ensureReady();let a=this.deviceMgr.getTensorMeta(t),o=a.shape,u=D(r),l=D(o.slice(0,o.length-r.length)),c=D(o),d=n!==null?this.deviceMgr.getTensorMeta(n).buffer:this._makeOnesBuf(u),h=i!==null?this.deviceMgr.getTensorMeta(i).buffer:this._makeZerosBuf(u),m=z(this.deviceMgr.device,Math.max(4,c*4)),f=new Uint32Array([l,u,0,0]),v=new Float32Array(f.buffer);v[2]=s;let x=this.deviceMgr.device.createBuffer({size:f.byteLength,usage:b.UNIFORM|b.COPY_DST});this.deviceMgr.writeBuffer(x,0,new Uint8Array(f.buffer));let M=S(qi,"main");return P(M,[a.buffer,d,h,m,x],B(l)),await E(),x.destroy(),n===null&&d.destroy(),i===null&&h.destroy(),this.deviceMgr.registerTensorAsHandle(m,o,a.dtype,c)}_makeOnesBuf(t){let r=z(this.deviceMgr.device,Math.max(4,t*4)),n=new Float32Array(t);for(let i=0;i<t;i++)n[i]=1;return this.deviceMgr.writeBuffer(r,0,n),r}_makeZerosBuf(t){let r=z(this.deviceMgr.device,Math.max(4,t*4));return this.deviceMgr.writeBuffer(r,0,new Float32Array(t)),r}};var Hs=class{deviceMgr=new On;creationOps;arithmeticOps;unaryOps;reductionOps;shapeOps;compareOps;maskingOps;linalgOps;convOps;poolingOps;normalizationOps;constructor(){oc(this.deviceMgr);let t=this.deviceMgr;this.creationOps=new As(t),this.arithmeticOps=new Ps(t),this.unaryOps=new Es(t),this.reductionOps=new Rs(t),this.shapeOps=new ks(t),this.compareOps=new Bs(t),this.maskingOps=new $s(t),this.linalgOps=new Ds(t),this.convOps=new Us(t),this.poolingOps=new Os(t),this.normalizationOps=new Is(t)}async init(t){await this.deviceMgr.ensureReady(t)}async tensorFromData(t,r,n){return this.creationOps.tensorFromData(t,r,n)}async zeros(t,r){return this.creationOps.zeros(t,r)}async ones(t,r){return this.creationOps.ones(t,r)}async setSeed(t){return this.creationOps.setSeed(t)}async rand(t,r){return this.creationOps.rand(t,r)}async randn(t,r){return this.creationOps.randn(t,r)}async arange(t,r,n,i){return this.creationOps.arange(t,r,n,i)}async full(t,r,n){return this.creationOps.full(t,r,n)}async fullLike(t,r,n){return this.creationOps.fullLike(t,r,n)}async zerosLike(t,r){return this.creationOps.zerosLike(t,r)}async onesLike(t,r){return this.creationOps.onesLike(t,r)}async emptyLike(t,r){return this.creationOps.emptyLike(t,r)}async empty(t,r){return this.creationOps.empty(t,r)}async add(t,r){return this.arithmeticOps.add(t,r)}async mul(t,r){return this.arithmeticOps.mul(t,r)}async sub(t,r){return this.arithmeticOps.sub(t,r)}async div(t,r){return this.arithmeticOps.div(t,r)}async where(t,r,n){return this.arithmeticOps.where(t,r,n)}async clamp(t,r,n){return this.arithmeticOps.clamp(t,r,n)}async matmul(t,r){return this.arithmeticOps.matmul(t,r)}async mm(t,r){return this.arithmeticOps.matmul(t,r)}async bmm(t,r){return this.arithmeticOps.matmul(t,r)}async mv(t,r){return this.arithmeticOps.matmul(t,r)}async pow(t,r){return this.arithmeticOps.pow(t,r)}async heaviside(t,r){return this.arithmeticOps.heaviside(t,r)}async relu(t){return this.unaryOps.relu(t)}async abs(t){return this.unaryOps.abs(t)}async sqrt(t){return this.unaryOps.sqrt(t)}async exp(t){return this.unaryOps.exp(t)}async log(t){return this.unaryOps.log(t)}async neg(t){return this.unaryOps.neg(t)}async sigmoid(t){return this.unaryOps.sigmoid(t)}async tanh(t){return this.unaryOps.tanh(t)}async sin(t){return this.unaryOps.sin(t)}async cos(t){return this.unaryOps.cos(t)}async gelu(t){return this.unaryOps.gelu(t)}async silu(t){return this.unaryOps.silu(t)}async leakyRelu(t,r=.01){return this.unaryOps.leakyRelu(t,r)}async floor(t){return this.unaryOps.floor(t)}async ceil(t){return this.unaryOps.ceil(t)}async round(t){return this.unaryOps.round(t)}async reciprocal(t){return this.unaryOps.reciprocal(t)}async square(t){return this.unaryOps.square(t)}async tan(t){return this.unaryOps.tan(t)}async asin(t){return this.unaryOps.asin(t)}async acos(t){return this.unaryOps.acos(t)}async atan(t){return this.unaryOps.atan(t)}async sinh(t){return this.unaryOps.sinh(t)}async cosh(t){return this.unaryOps.cosh(t)}async asinh(t){return this.unaryOps.asinh(t)}async acosh(t){return this.unaryOps.acosh(t)}async atanh(t){return this.unaryOps.atanh(t)}async exp2(t){return this.unaryOps.exp2(t)}async log2(t){return this.unaryOps.log2(t)}async log10(t){return this.unaryOps.log10(t)}async log1p(t){return this.unaryOps.log1p(t)}async expm1(t){return this.unaryOps.expm1(t)}async trunc(t){return this.unaryOps.trunc(t)}async frac(t){return this.unaryOps.frac(t)}async softplus(t){return this.unaryOps.softplus(t)}async mish(t){return this.unaryOps.mish(t)}async hardsigmoid(t){return this.unaryOps.hardsigmoid(t)}async hardswish(t){return this.unaryOps.hardswish(t)}async softsign(t){return this.unaryOps.softsign(t)}async tanhshrink(t){return this.unaryOps.tanhshrink(t)}async rsqrt(t){return this.unaryOps.rsqrt(t)}async sign(t){return this.unaryOps.sign(t)}async sgn(t){return this.unaryOps.sgn(t)}async isnan(t){return this.unaryOps.isnan(t)}async isinf(t){return this.unaryOps.isinf(t)}async isfinite(t){return this.unaryOps.isfinite(t)}async isposinf(t){return this.unaryOps.isposinf(t)}async isneginf(t){return this.unaryOps.isneginf(t)}async logicalNot(t){return this.unaryOps.logicalNot(t)}async erf(t){return this.unaryOps.erf(t)}async erfc(t){return this.unaryOps.erfc(t)}async lgamma(t){return this.unaryOps.lgamma(t)}async digamma(t){return this.unaryOps.digamma(t)}async i0(t){return this.unaryOps.i0(t)}async deg2rad(t){return this.unaryOps.deg2rad(t)}async rad2deg(t){return this.unaryOps.rad2deg(t)}async fill(t,r){return this.unaryOps.fill(t,r)}async sum(t){return this.reductionOps.sum(t)}async mean(t){return this.reductionOps.mean(t)}async sumDim(t,r,n){return this.reductionOps.sumDim(t,r,n)}async meanDim(t,r,n){return this.reductionOps.meanDim(t,r,n)}async prod(t){return this.reductionOps.prod(t)}async min(t){return this.reductionOps.min(t)}async max(t){return this.reductionOps.max(t)}async argmax(t){return this.reductionOps.argmax(t)}async argmin(t){return this.reductionOps.argmin(t)}async any(t){return this.reductionOps.any(t)}async all(t){return this.reductionOps.all(t)}async cumsum(t){return this.reductionOps.cumsum(t)}async cumprod(t){return this.reductionOps.cumprod(t)}async softmax(t,r){return this.reductionOps.softmax(t,r)}async logSoftmax(t,r){return this.reductionOps.logSoftmax(t,r)}async nllLoss(t,r){return this.reductionOps.nllLoss(t,r)}async nllLossReduced(t,r,n){return this.reductionOps.nllLossReduced(t,r,n)}async crossEntropy(t,r){return this.reductionOps.crossEntropy(t,r)}async logSoftmaxBackward(t,r,n,i){return this.reductionOps.logSoftmaxBackward(t,r,n,i)}async softmaxBackward(t,r,n,i){return this.reductionOps.softmaxBackward(t,r,n,i)}async nllLossBackward(t,r,n,i){return this.reductionOps.nllLossBackward(t,r,n,i)}async crossEntropyBackward(t,r,n,i){return this.reductionOps.crossEntropyBackward(t,r,n,i)}async adamStep(t,r,n,i,s,a,o,u,l,c,d){return this.reductionOps.adamStep(t,r,n,i,s,a,o,u,l,c,d)}async adamWStep(t,r,n,i,s,a,o,u,l,c,d){return this.reductionOps.adamWStep(t,r,n,i,s,a,o,u,l,c,d)}async sgdStep(t,r,n,i,s,a,o,u){return this.reductionOps.sgdStep(t,r,n,i,s,a,o,u)}async rmspropStep(t,r,n,i,s,a,o,u,l){return this.reductionOps.rmspropStep(t,r,n,i,s,a,o,u,l)}async maxMinBackward(t,r,n){return this.reductionOps.maxMinBackward(t,r,n)}async eq(t,r){return this.compareOps.eq(t,r)}async ne(t,r){return this.compareOps.ne(t,r)}async lt(t,r){return this.compareOps.lt(t,r)}async le(t,r){return this.compareOps.le(t,r)}async gt(t,r){return this.compareOps.gt(t,r)}async ge(t,r){return this.compareOps.ge(t,r)}async maximum(t,r){return this.compareOps.maximum(t,r)}async minimum(t,r){return this.compareOps.minimum(t,r)}async maskedSelect(t,r){return this.maskingOps.maskedSelect(t,r)}async maskedFill(t,r,n){return this.maskingOps.maskedFill(t,r,n)}async reshape(t,r){return this.shapeOps.reshape(t,r)}async flatten(t,r=0,n=-1){return this.shapeOps.flatten(t,r,n)}async squeeze(t,r){return this.shapeOps.squeeze(t,r)}async unsqueeze(t,r){return this.shapeOps.unsqueeze(t,r)}async transpose2d(t){return this.shapeOps.transpose2d(t)}async transpose(t,r,n){return this.shapeOps.transpose(t,r,n)}async permute(t,r){return this.shapeOps.permute(t,r)}async select(t,r,n){return this.shapeOps.select(t,r,n)}async slice(t,r,n,i,s=1){return this.shapeOps.slice(t,r,n,i,s)}async sliceBackward(t,r,n,i,s,a){return this.shapeOps.sliceBackward(t,r,n,i,s,a)}async cat(t,r){return this.shapeOps.cat(t,r)}async stack(t,r){return this.shapeOps.stack(t,r)}async expand(t,r){return this.shapeOps.expand(t,r)}async indexSelect(t,r,n){return this.shapeOps.indexSelect(t,r,n)}async gather(t,r,n){return this.shapeOps.gather(t,r,n)}async sort(t,r){return this.shapeOps.sort(t,r)}async sortBackward(t,r,n,i){return this.shapeOps.sortBackward(t,r,n,i)}async topkBackward(t,r,n,i,s){return this.shapeOps.topkBackward(t,r,n,i,s)}async tril(t,r=0){return this.shapeOps.tril(t,r)}async triu(t,r=0){return this.shapeOps.triu(t,r)}async flip(t,r){return this.shapeOps.flip(t,r)}async repeat(t,r){return this.shapeOps.repeat(t,r)}async runBatch(t){this.deviceMgr.beginFrame();try{let r=await t();return await this.deviceMgr.endFrame(),r}catch(r){throw this.deviceMgr.cancelFrame(),r}}beginFrame(){this.deviceMgr.beginFrame()}endFrame(){return this.deviceMgr.endFrame()}cancelFrame(){this.deviceMgr.cancelFrame()}async toList(t){await this.deviceMgr.ensureReady();let r=this.deviceMgr.getTensorMeta(t);return this.deviceMgr.readFromGPU(r.buffer,r.length,r.dtype)}async destroy(t){this.deviceMgr.destroyTensor(t)}isAvailable(){return this.deviceMgr.isAvailable()}isInitialized(){return this.deviceMgr.initialized}deviceCount(){return this.deviceMgr.deviceCount()}async currentDevice(){return this.deviceMgr.currentDevice()}async getDeviceName(t){return this.deviceMgr.getDeviceName(t)}async getDeviceProperties(t){return this.deviceMgr.getDeviceProperties(t)}async memoryAllocated(t){return this.deviceMgr.memoryAllocated()}async memoryReserved(t){return this.deviceMgr.memoryReserved()}async conv2d(t,r,n,i,s,a,o){return this.convOps.conv2d(t,r,n,i,s,a,o)}async conv2dInputBackward(t,r,n,i,s,a){return this.convOps.conv2dInputBackward(t,r,n,i,s,a)}async conv2dWeightBackward(t,r,n,i,s,a,o){return this.convOps.conv2dWeightBackward(t,r,n,i,s,a,o)}async conv2dBiasBackward(t,r,n){return this.convOps.conv2dBiasBackward(t,r,n)}async maxPool2d(t,r,n,i,s){return this.poolingOps.maxPool2d(t,r,n,i,s)}async avgPool2d(t,r,n,i,s){return this.poolingOps.avgPool2d(t,r,n,i,s)}async batchNorm(t,r,n,i,s,a){return this.normalizationOps.batchNorm(t,r,n,i,s,a)}async layerNorm(t,r,n,i,s){return this.normalizationOps.layerNorm(t,r,n,i,s)}async cholesky(t){return this.linalgOps.cholesky(t)}async lu(t){return this.linalgOps.lu(t)}async triangularSolve(t,r,n){return this.linalgOps.triangularSolve(t,r,n)}};function ky(e=globalThis){let t=new Hs;return e.__torch_pyodide_runtime__=t,t}export{Hs as TorchPyodideRuntime,ky as installTorchRuntime};
