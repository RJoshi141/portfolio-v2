/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from '../assets/card.glb';

import * as THREE from 'three';
import '../styles/Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// fake blur for the clear badge's shadows: many faint copies spread out around the shadow's spot
// strap: [lineWidth, opacity] from a tight core out to a wide, barely-there halo
const STRAP_BLUR = [[1.2, 0.03], [1.7, 0.025], [2.3, 0.02], [3.0, 0.014], [3.8, 0.009]];
// clip: a dim center plus two rings of copies around it, [dx, dy, opacity]
const CLIP_BLUR = [[0, 0, 0.03],
  ...Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return [Math.cos(a) * 0.008, Math.sin(a) * 0.008, 0.016]; }),
  ...Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + 0.3; return [Math.cos(a) * 0.017, Math.sin(a) * 0.017, 0.008]; })];

// Site colors
const RED = '#f87171';

export default function Lanyard({ 
  position = [0, 0, 30], 
  gravity = [0, -40, 0], 
  fov = 20, 
  transparent = true,
  cardImage = null,
  theme = 'dark',  // 'light' or 'dark'
  bandColor = RED,  // strap color (revamp passes a dark grey)
  name = "Ritika Joshi",  // badge text; pass "" to leave the name off
  role = "Founding Engineer @ Joydrop",
  // "clear": a see-through vinyl badge holder with a printed paper insert (photo, "Currently",
  // "Previously" pills), after samfcheng.com. The default is the original solid black card.
  variant = "solid",
  currently = "",
  previously = [], // [{ label, bg, fg }]
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  // WebGL can be missing (no GPU / acceleration off) or the context can get dropped by Chrome
  // (too many canvases after hot reloads). Remount on loss a couple of times, then give up quietly
  // instead of leaving a white box with a sad face.
  const [glOk] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { return false; }
  });
  const [canvasKey, setCanvasKey] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      {glOk && !failed && <Canvas
        key={canvasKey}
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            if (canvasKey >= 2) setFailed(true);
            else setTimeout(() => setCanvasKey((k) => k + 1), 300);
          }, { once: true });
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} cardImage={cardImage} theme={theme} bandColor={bandColor} name={name} role={role} variant={variant} currently={currently} previously={previously} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>}
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, cardImage = null, theme = 'dark', bandColor = RED, name, role, variant = 'solid', currently = '', previously = [] }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef(),
    shadows = useRef([]),
    shadowRoot = useRef();
  const qq = new THREE.Quaternion(), eul = new THREE.Euler();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  
  // Load custom card image for front side
  const backTexture = useTexture(cardImage || '/portfolio-v2/assets/comic-self.png');
  
  // Load logo textures for back side
  const logoWhiteTexture = useTexture('/portfolio-v2/logo-white.png');
  const logoBlackTexture = useTexture('/portfolio-v2/logo-black.png');
  
  // Configure texture for clear, vibrant image display
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.minFilter = THREE.LinearFilter;
  backTexture.magFilter = THREE.LinearFilter;
  backTexture.generateMipmaps = false;
  backTexture.needsUpdate = true;
  
  // ---- clear badge: the paper insert and the vinyl sleeve's printed details, drawn on canvases
  const clear = variant === 'clear';
  const paper = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 1350; c.height = 1755; // 1.5x the 900x1170 layout below
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return { c, t };
  }, []);
  // woven strap: darker toward the edges so it reads round, stitched hems, a fine weave
  const strap = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const base = new THREE.Color(bandColor);
    const shade = (k) => '#' + base.clone().multiplyScalar(k).getHexString();
    const grd = g.createLinearGradient(0, 0, 0, 64);
    grd.addColorStop(0, shade(0.5)); grd.addColorStop(0.2, shade(1.1)); grd.addColorStop(0.5, shade(1.9));
    grd.addColorStop(0.8, shade(1.1)); grd.addColorStop(1, shade(0.5));
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    // weave: thin alternating ribs along the length
    for (let y = 0; y < 64; y += 3) { g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, y, 64, 1); }
    // hem stitches near both edges
    g.fillStyle = 'rgba(255,255,255,0.18)';
    for (let x = 0; x < 64; x += 8) { g.fillRect(x, 8, 5, 1.5); g.fillRect(x, 54.5, 5, 1.5); }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, [bandColor]);

  // a blurred rounded rectangle, used as the badge's drop shadow
  const shade = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 340;
    const g = c.getContext('2d');
    g.filter = 'blur(18px)'; g.fillStyle = 'rgba(0,0,0,1)';
    rr(g, 40, 40, 176, 260, 18); g.fill();
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const sleeve = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 716; c.height = 1000;
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return { c, t };
  }, []);
  useEffect(() => {
    if (!clear) return;
    let dead = false;
    (async () => {
      try {
        await Promise.all([
          document.fonts.load('italic 54px "Instrument Serif"'),
          document.fonts.load('500 40px Inter'),
          document.fonts.load('600 30px Inter'),
        ]);
      } catch { /* fall back to whatever is loaded */ }
      const img = new Image();
      img.src = cardImage || '/portfolio-v2/assets/comic-self.png';
      try { await img.decode(); } catch { /* draw without the photo */ }
      if (dead) return;
      drawPaper(paper.c, img, currently, previously, theme === 'dark');
      paper.t.needsUpdate = true;
      drawSleeve(sleeve.c);
      sleeve.t.needsUpdate = true;
    })();
    return () => { dead = true; };
  }, [clear, cardImage, currently, previously, paper, sleeve, theme]);


  [logoWhiteTexture, logoBlackTexture].forEach(tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
  });
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  // Original joint settings from React Bits
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      const pts = curve.getPoints(isMobile ? 16 : 32);
      band.current.geometry.setPoints(pts);
      shadows.current.forEach((m) => m?.geometry.setPoints(pts));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      // the badge's shadow follows the card's position and in-plane tilt but never its turn, so it
      // stays on the wall behind; turning the card just narrows it
      if (shadowRoot.current) {
        const t = card.current.translation(), q = card.current.rotation();
        eul.setFromQuaternion(qq.set(q.x, q.y, q.z, q.w), 'YXZ');
        shadowRoot.current.position.set(t.x + 0.31, t.y - 0.22, t.z - 0.78);
        shadowRoot.current.rotation.set(0, 0, eul.z);
        shadowRoot.current.scale.x = Math.max(0.12, Math.abs(Math.cos(eul.y)));
      }
    }
  });

  curve.curveType = 'chordal';

  // Card is always black with white text
  const cardColor = '#000000';
  const textColor = '#ffffff';
  const subtitleColor = '#ffffff';

  return (
    <>
      {/* Anchor point - positioned near header */}
      <group position={[0, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          {/* the clear badge is drawn ~13% bigger; its hook point stays where the strap meets it */}
          <CuboidCollider args={clear ? [0.9, 1.27, 0.01] : [0.8, 1.125, 0.01]} />
          <group
            scale={clear ? 3.1 : 2.75}
            position={[0, clear ? -2.28 : -1.85, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* Use original card geometry from GLB for proper alignment */}
            {clear ? (
              <>
                {/* the vinyl sleeve: a faint glossy shell with its punched holes and seam printed on */}
                <mesh geometry={nodes.card.geometry} renderOrder={1}>
                  <meshPhysicalMaterial color="#ffffff" transparent opacity={0.05} roughness={0.06} clearcoat={1} clearcoatRoughness={0.04} metalness={0} depthWrite={false} />
                </mesh>
                <mesh position={[0, 0.523, 0.0062]} renderOrder={2}>
                  <planeGeometry args={[0.716, 1.0]} />
                  <meshBasicMaterial map={sleeve.t} transparent depthWrite={false} toneMapped={false} />
                </mesh>
                {/* the paper insert, drawn last and in front so the photo and text stay crisp */}
                <mesh position={[0, 0.47, 0.0068]} renderOrder={3}>
                  <planeGeometry args={[0.6, 0.78]} />
                  <meshBasicMaterial map={paper.t} toneMapped={false} side={THREE.DoubleSide} />
                </mesh>
              </>
            ) : (
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color={cardColor}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            )}
            
            {/* Content overlay on front of card */}
            {!clear && <group position={[0, 0, 0.015]}>
              {/* Profile image */}
              <mesh position={[0, 0.63, 0.001]}>
                <planeGeometry args={[0.42, 0.42]} />
                <meshBasicMaterial 
                  map={backTexture} 
                  toneMapped={false}
                />
              </mesh>
              
              {/* Name text */}
              {name && (
                <Text
                  position={[0, 0.3, 0]}
                  fontSize={0.06}
                  color={textColor}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={0.55}
                >
                  {name}
                </Text>
              )}
              {/* Role text */}
              {/* with no name, the role line moves up into the name's spot and gets a little bigger */}
              <Text
                position={[0, name ? 0.21 : 0.26, 0]}
                fontSize={name ? 0.039 : 0.05}
                color={name ? subtitleColor : textColor}
                anchorX="center"
                anchorY="middle"
                maxWidth={0.55}
              >
                {role}
              </Text>
            </group>}
            
            {/* Back side content - logo */}
            {!clear && <group position={[0, 0, -0.015]} rotation={[0, Math.PI, 0]}>
              <mesh position={[0, 0.5, 0]}>
                <planeGeometry args={[0.25, 0.25]} />
                <meshBasicMaterial 
                  map={logoWhiteTexture} 
                  toneMapped={false}
                  transparent={true}
                />
              </mesh>
            </group>}
            
            {/* Metal clip - silver/grey color */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3}>
              <meshStandardMaterial color="#a0a0a0" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Metal clamp - silver/grey color */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal}>
              <meshStandardMaterial color="#a0a0a0" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      {/* Lanyard band with red color (site accent) */}
      {/* clear badge: the sleeve's and clip's shadow, kept flat against the wall (see useFrame) */}
      {clear && (
        <group ref={shadowRoot}>
          <group scale={3.1} position={[0, -2.28, 0]}>
            <mesh position={[0, 0.47, 0]}>
              <planeGeometry args={[0.95, 1.26]} />
              <meshBasicMaterial map={shade} transparent opacity={0.16} depthWrite={false} toneMapped={false} />
            </mesh>
            {CLIP_BLUR.map(([dx, dy, o], i) => (
              <group key={i} position={[dx, dy, 0]}>
                <mesh geometry={nodes.clip.geometry}><meshBasicMaterial color="#000000" transparent opacity={o} depthWrite={false} /></mesh>
                <mesh geometry={nodes.clamp.geometry}><meshBasicMaterial color="#000000" transparent opacity={o} depthWrite={false} /></mesh>
              </group>
            ))}
          </group>
        </group>
      )}
      {/* clear badge: the strap's shadow, stacked widening, fading copies so its edges blur out. Its offset
          matches the badge shadow's (0.1, -0.07, -0.25 in the card's space x 3.1 scale) so the two join up */}
      {clear && STRAP_BLUR.map(([w, o], i) => (
        <mesh key={i} ref={(m) => (shadows.current[i] = m)} position={[0.31, -0.22, -0.78]}>
          <meshLineGeometry />
          <meshLineMaterial color="#000000" transparent opacity={o} depthWrite={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} lineWidth={w} />
        </mesh>
      ))}
      <mesh ref={band}>
        <meshLineGeometry />
        {clear ? (
          <meshLineMaterial
            color="#ffffff"
            depthTest={false}
            useMap={1}
            map={strap}
            repeat={[-6, 1]}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            lineWidth={1.3}
          />
        ) : (
          <meshLineMaterial
            color={bandColor}
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            lineWidth={1.5}
          />
        )}
      </mesh>
    </>
  );
}


// ---- clear badge drawing --------------------------------------------------------------------
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };

// Instrument Serif only comes in one weight, so headings are thickened with a matching stroke
const heading = (g, text, x, y) => { g.lineWidth = 2.2; g.strokeStyle = g.fillStyle; g.lineJoin = 'round'; g.strokeText(text, x, y); g.fillText(text, x, y); };

// the printed insert: photo up top, then "Currently" and "Previously" in the italic serif with
// the details under each, the past companies as little colored pills
function drawPaper(c, img, currently, previously, dark = false) {
  // dark theme: black card, white type
  const g = c.getContext('2d');
  g.setTransform(c.width / 900, 0, 0, c.width / 900, 0, 0); // lay out at 900 wide, draw at full res
  const W = 900, H = 1170, P = 64;
  const ink = dark ? '#f5f4f0' : '#141413';
  g.fillStyle = dark ? '#0c0c0b' : '#fbfbf8'; g.fillRect(0, 0, W, H);
  if (img.naturalWidth) {
    const s = 470, x = (W - s) / 2, y = P + 30; // centered
    g.save(); rr(g, x, y, s, s, 14); g.clip();
    const k = Math.max(s / img.naturalWidth, s / img.naturalHeight);
    g.drawImage(img, x + (s - img.naturalWidth * k) / 2, y + (s - img.naturalHeight * k) / 2, img.naturalWidth * k, img.naturalHeight * k);
    g.restore();
  }
  let y = H - 310;
  g.fillStyle = ink;
  g.font = 'italic 54px "Instrument Serif", Georgia, serif'; heading(g, 'Currently', P, y);
  g.font = '500 44px Inter, system-ui, sans-serif'; g.fillText(currently, P, y + 54);
  if (previously.length) {
    y += 165; // breathing room between the two blocks
    g.font = 'italic 54px "Instrument Serif", Georgia, serif'; heading(g, 'Previously', P, y);
    let x = P; y += 22;
    g.font = '600 34px Inter, system-ui, sans-serif';
    previously.forEach(({ label, bg = '#141413', fg = '#ffffff' }) => {
      // a black pill would vanish on the black card, so it flips to white
      if (dark && bg.toLowerCase() === '#141413') { bg = '#f5f4f0'; fg = '#141413'; }
      const w = g.measureText(label).width + 44;
      if (x + w > W - P) { x = P; y += 64; }
      g.fillStyle = bg; rr(g, x, y, w, 58, 29); g.fill();
      g.fillStyle = fg; g.fillText(label, x + 22, y + 41);
      x += w + 14;
    });
  }
}

// the sleeve's own details: two punched holes and a slot at the top, a seam line, a soft rim
function drawSleeve(c) {
  const g = c.getContext('2d');
  const W = c.width, H = c.height;
  g.clearRect(0, 0, W, H);
  g.strokeStyle = 'rgba(120,120,120,0.55)'; g.lineWidth = 3;
  rr(g, 6, 6, W - 12, H - 12, 34); g.stroke();
  g.strokeStyle = 'rgba(140,140,140,0.45)'; g.lineWidth = 2.5;
  [[92, 70], [W - 92, 70]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.stroke(); });
  rr(g, W / 2 - 85, 56, 170, 30, 15); g.stroke();
  g.beginPath(); g.moveTo(30, 128); g.lineTo(W - 30, 128); g.stroke();
  g.beginPath(); g.moveTo(30, 136); g.lineTo(W - 30, 136); g.stroke();
}
