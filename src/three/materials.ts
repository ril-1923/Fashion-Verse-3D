import * as THREE from 'three';
import type { MaterialType, PatternType } from '@/types';

/**
 * Build a small canvas-based procedural texture for stripes / dots patterns.
 * Returns a THREE.CanvasTexture ready to apply, or null for solid.
 */
export function buildPatternTexture(
  pattern: PatternType,
  baseHex: string
): THREE.CanvasTexture | null {
  if (pattern === 'solid') return null;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, size, size);

  if (pattern === 'stripes') {
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    const stripeW = size / 8;
    for (let i = 0; i < 8; i += 2) {
      ctx.fillRect(i * stripeW, 0, stripeW, size);
    }
  } else if (pattern === 'dots') {
    ctx.fillStyle = 'rgba(255,255,255,0.30)';
    const step = size / 6;
    const r = step * 0.18;
    for (let x = step / 2; x < size; x += step) {
      for (let y = step / 2; y < size; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Returns material parameters tuned per material type. These are visual
 * simulations — cotton is matte, leather is glossy and dark, satin is shiny,
 * denim is rough with a subtle tint.
 */
export function materialParams(
  material: MaterialType,
  baseHex: string
): THREE.MeshStandardMaterialParameters {
  const color = new THREE.Color(baseHex);
  switch (material) {
    case 'cotton':
      return {
        color,
        roughness: 0.85,
        metalness: 0.0,
        flatShading: false,
      };
    case 'denim':
      return {
        color: color.clone().lerp(new THREE.Color('#3a4a6a'), 0.25),
        roughness: 0.95,
        metalness: 0.0,
      };
    case 'leather':
      return {
        color: color.clone().lerp(new THREE.Color('#000000'), 0.15),
        roughness: 0.35,
        metalness: 0.1,
      };
    case 'satin':
      return {
        color,
        roughness: 0.25,
        metalness: 0.15,
      };
    default:
      return { color, roughness: 0.8, metalness: 0 };
  }
}

export function createGarmentMaterial(
  material: MaterialType,
  pattern: PatternType,
  baseHex: string
): THREE.MeshStandardMaterial {
  const params = materialParams(material, baseHex);
  const tex = buildPatternTexture(pattern, baseHex);
  if (tex) params.map = tex;
  return new THREE.MeshStandardMaterial(params);
}

/**
 * Dispose a material and any attached texture.
 */
export function disposeMaterial(mat: THREE.Material | undefined) {
  if (!mat) return;
  const m = mat as THREE.MeshStandardMaterial;
  if (m.map) m.map.dispose();
  m.dispose();
}
