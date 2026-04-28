import{D as e,O as t,P as n,Q as r,U as i,c as a,et as o,nt as s,tt as c,v as l}from"./three.module-BD7U7dm4.js";var u=class u extends t{constructor(t,d={}){super(t),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let f=this,p=d.color===void 0?new a(8355711):new a(d.color),m=d.textureWidth||512,h=d.textureHeight||512,g=d.clipBias||0,_=d.shader||u.ReflectorShader,v=d.multisample===void 0?4:d.multisample,y=new n,b=new o,x=new o,S=new o,C=new e,w=new o(0,0,-1),T=new c,E=new o,D=new o,O=new c,k=new e,A=new s(m,h,{samples:v,type:l}),j=new i({name:_.name===void 0?`unspecified`:_.name,uniforms:r.clone(_.uniforms),fragmentShader:_.fragmentShader,vertexShader:_.vertexShader});j.uniforms.tDiffuse.value=A.texture,j.uniforms.color.value=p,j.uniforms.textureMatrix.value=k,this.material=j,this.onBeforeRender=function(e,t,n){let r=this._getReflectionCamera(n);if(x.setFromMatrixPosition(f.matrixWorld),S.setFromMatrixPosition(n.matrixWorld),C.extractRotation(f.matrixWorld),b.set(0,0,1),b.applyMatrix4(C),E.subVectors(x,S),E.dot(b)>0&&this.forceUpdate===!1)return;E.reflect(b).negate(),E.add(x),C.extractRotation(n.matrixWorld),w.set(0,0,-1),w.applyMatrix4(C),w.add(S),D.subVectors(x,w),D.reflect(b).negate(),D.add(x),r.position.copy(E),r.up.set(0,1,0),r.up.applyMatrix4(C),r.up.reflect(b),r.lookAt(D),r.far=n.far,r.updateMatrixWorld(),r.projectionMatrix.copy(n.projectionMatrix),k.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),k.multiply(r.projectionMatrix),k.multiply(r.matrixWorldInverse),k.multiply(f.matrixWorld),y.setFromNormalAndCoplanarPoint(b,x),y.applyMatrix4(r.matrixWorldInverse),T.set(y.normal.x,y.normal.y,y.normal.z,y.constant);let i=r.projectionMatrix;r.isOrthographicCamera?(O.x=(Math.sign(T.x)+i.elements[8])/i.elements[0],O.y=(Math.sign(T.y)+i.elements[9])/i.elements[5],O.z=-n.far,O.w=1):(O.x=(Math.sign(T.x)+i.elements[8])/i.elements[0],O.y=(Math.sign(T.y)+i.elements[9])/i.elements[5],O.z=-1,O.w=(1+i.elements[10])/i.elements[14]),T.multiplyScalar(2/T.dot(O)),i.elements[2]=T.x,i.elements[6]=T.y,r.isOrthographicCamera?(i.elements[10]=T.z-g,i.elements[14]=T.w-1):(i.elements[10]=T.z+1-g,i.elements[14]=T.w),f.visible=!1;let a=e.getRenderTarget(),o=e.xr.enabled,s=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(A),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,r),e.xr.enabled=o,e.shadowMap.autoUpdate=s,e.setRenderTarget(a);let c=n.viewport;c!==void 0&&e.state.viewport(c),f.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),f.material.dispose()},this._getReflectionCamera=function(e){let t=this._reflectionCameras.get(e);return t===void 0&&(t=e.clone(),this._reflectionCameras.set(e,t)),t}}};u.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};export{u as Reflector};