export const heatFieldVert = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const heatFieldFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_intensity;
uniform float u_octaves;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<5;i++){
    if(float(i)>=u_octaves) break;
    v += a*noise(p); p = p*2.02 + vec2(17.3,9.2); a *= .5;
  }
  return v;
}

void main(){
  vec2 uv = vUv;
  vec2 asp = vec2(u_resolution.x/u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * asp;
  float t = u_time * 0.18;
  float calm = mix(1.0, 0.35, clamp(u_scroll,0.,1.));
  // mouse influence
  vec2 m = (u_mouse - 0.5) * asp;
  float md = length(p - m);
  vec2 bend = normalize(p - m + 0.001) * exp(-md*3.0) * 0.06;
  p += bend;
  // domain warp (heat haze / flame plumes)
  float rise = max(0., 0.55 - uv.y) * 2.2;
  vec2 q = vec2(fbm(p*1.4 + vec2(0., -t*0.9)), fbm(p*1.4 + vec2(5.2, -t*0.7)));
  vec2 r = vec2(fbm(p*2.2 + 3.5*q + vec2(1.7, -t*1.3)), fbm(p*2.2 + 3.5*q + vec2(8.3, -t*1.1)));
  float f = fbm(p*2.6 + 3.0*r + vec2(0., -t*1.6*calm));
  float plume = smoothstep(0.15, 0.95, f + rise*0.55*calm) * smoothstep(0.0, 0.45, uv.y);

  vec3 navy = vec3(0.043,0.122,0.267);    // #0868D8
  vec3 blueD = vec3(0.051,0.278,0.631);   // #014EB6
  vec3 blue = vec3(0.082,0.396,0.753);    // #2B7FE6
  vec3 red = vec3(0.898,0.224,0.208);     // #E53935
  vec3 orange = vec3(1.0,0.239,0.0);      // #FF3D00
  vec3 ember = vec3(1.0,0.702,0.0);       // #FFB300

  // blue haze base (~75%)
  float haze = fbm(p*1.1 + q*0.8 + vec2(t*0.15, -t*0.2));
  vec3 col = mix(navy, blueD, smoothstep(0.2,0.8,haze)*0.55);
  col = mix(col, blue, smoothstep(0.45,0.9,haze)*0.22*calm);
  // flame tongues (~25%), strongest near bottom
  float flameMask = plume * smoothstep(0.25,0.85, f+r.x*0.5) * rise * u_intensity * calm;
  vec3 flame = mix(red, orange, smoothstep(0.0,0.7,flameMask));
  flame = mix(flame, ember, smoothstep(0.72,1.0,flameMask) * smoothstep(0.0,0.35,uv.y));
  col = mix(col, flame, clamp(flameMask*0.75, 0.0, 0.55));
  // heat distortion glow near mouse
  col += vec3(0.08,0.22,0.45) * exp(-md*6.0) * 0.08;
  // vignette
  float vig = smoothstep(1.15, 0.25, length((uv-0.5)*vec2(1.25,1.0)));
  col *= mix(0.72, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;
