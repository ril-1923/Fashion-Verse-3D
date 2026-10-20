import * as THREE from 'three';
import type { GarmentType } from '@/types';

/**
 * Procedural garment geometry builders. Each returns a THREE.Group positioned
 * so the garment sits on a mannequin whose torso center is near origin.
 *
 * The mannequin is a simplified low-poly human: head sphere, neck cylinder,
 * torso box, two arm capsules, two leg capsules. Garments are built from
 * simple primitives (boxes, cylinders, lathe shapes) — no external models.
 */

function capsuleGeometry(radius: number, length: number): THREE.CapsuleGeometry {
  return new THREE.CapsuleGeometry(radius, length, 6, 12);
}

export interface GarmentParts {
  group: THREE.Group;
  meshes: THREE.Mesh[];
}

function makeMesh(geo: THREE.BufferGeometry): THREE.Mesh {
  const mesh = new THREE.Mesh(geo);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** T-shirt: torso + short sleeves. */
function buildTShirt(): GarmentParts {
  const group = new THREE.Group();
  const torso = makeMesh(new THREE.BoxGeometry(1.5, 1.5, 0.62, 2, 2, 1));
  // round the torso a touch by scaling top narrower
  const pos = torso.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0.5) pos.setX(i, pos.getX(i) * 0.86);
  }
  pos.needsUpdate = true;
  torso.geometry.computeVertexNormals();
  group.add(torso);

  const sleeveL = makeMesh(capsuleGeometry(0.22, 0.42));
  sleeveL.rotation.z = Math.PI / 2.3;
  sleeveL.position.set(-0.95, 0.55, 0);
  group.add(sleeveL);

  const sleeveR = makeMesh(capsuleGeometry(0.22, 0.42));
  sleeveR.rotation.z = -Math.PI / 2.3;
  sleeveR.position.set(0.95, 0.55, 0);
  group.add(sleeveR);

  return { group, meshes: [torso, sleeveL, sleeveR] };
}

/** Hoodie: longer torso, long sleeves, a hood (sphere half). */
function buildHoodie(): GarmentParts {
  const group = new THREE.Group();
  const torso = makeMesh(new THREE.BoxGeometry(1.58, 1.7, 0.66, 2, 2, 1));
  const pos = torso.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0.55) pos.setX(i, pos.getX(i) * 0.88);
  }
  pos.needsUpdate = true;
  torso.geometry.computeVertexNormals();
  group.add(torso);

  const sleeveL = makeMesh(capsuleGeometry(0.24, 1.0));
  sleeveL.rotation.z = Math.PI / 2.4;
  sleeveL.position.set(-1.0, 0.2, 0);
  group.add(sleeveL);

  const sleeveR = makeMesh(capsuleGeometry(0.24, 1.0));
  sleeveR.rotation.z = -Math.PI / 2.4;
  sleeveR.position.set(1.0, 0.2, 0);
  group.add(sleeveR);

  // hood: a slightly squished sphere behind/above the neck
  const hood = makeMesh(new THREE.SphereGeometry(0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.7));
  hood.position.set(0, 1.05, -0.12);
  hood.scale.set(1, 1.1, 1.15);
  group.add(hood);

  // pocket
  const pocket = makeMesh(new THREE.BoxGeometry(0.9, 0.32, 0.08));
  pocket.position.set(0, -0.4, 0.34);
  group.add(pocket);

  return { group, meshes: [torso, sleeveL, sleeveR, hood, pocket] };
}

/** Jacket: torso + long sleeves + lapel collar. */
function buildJacket(): GarmentParts {
  const group = new THREE.Group();
  const torso = makeMesh(new THREE.BoxGeometry(1.62, 1.7, 0.68, 2, 2, 1));
  const pos = torso.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0.6) pos.setX(i, pos.getX(i) * 0.9);
  }
  pos.needsUpdate = true;
  torso.geometry.computeVertexNormals();
  group.add(torso);

  const sleeveL = makeMesh(capsuleGeometry(0.25, 1.05));
  sleeveL.rotation.z = Math.PI / 2.4;
  sleeveL.position.set(-1.04, 0.2, 0);
  group.add(sleeveL);

  const sleeveR = makeMesh(capsuleGeometry(0.25, 1.05));
  sleeveR.rotation.z = -Math.PI / 2.4;
  sleeveR.position.set(1.04, 0.2, 0);
  group.add(sleeveR);

  // lapels — two thin angled boxes
  const lapelGeo = new THREE.BoxGeometry(0.28, 0.7, 0.08);
  const lapelL = makeMesh(lapelGeo);
  lapelL.position.set(-0.42, 0.62, 0.34);
  lapelL.rotation.z = 0.32;
  group.add(lapelL);
  const lapelR = makeMesh(lapelGeo);
  lapelR.position.set(0.42, 0.62, 0.34);
  lapelR.rotation.z = -0.32;
  group.add(lapelR);

  return { group, meshes: [torso, sleeveL, sleeveR, lapelL, lapelR] };
}

/** Dress: flared body using a lathe geometry, thin straps. */
function buildDress(): GarmentParts {
  const group = new THREE.Group();

  // Lathe profile from waist down to hem, flaring outward.
  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0.62, 0.7)); // top (chest)
  points.push(new THREE.Vector2(0.6, 0.4));
  points.push(new THREE.Vector2(0.66, 0.0)); // waist
  points.push(new THREE.Vector2(0.78, -0.4));
  points.push(new THREE.Vector2(0.95, -0.85)); // hem flare
  points.push(new THREE.Vector2(0.98, -0.9));
  const bodyGeo = new THREE.LatheGeometry(points, 24);
  const body = makeMesh(bodyGeo);
  group.add(body);

  // shoulder straps
  const strapGeo = capsuleGeometry(0.06, 0.5);
  const strapL = makeMesh(strapGeo);
  strapL.position.set(-0.42, 0.95, 0);
  strapL.rotation.z = 0.18;
  group.add(strapL);
  const strapR = makeMesh(strapGeo);
  strapR.position.set(0.42, 0.95, 0);
  strapR.rotation.z = -0.18;
  group.add(strapR);

  return { group, meshes: [body, strapL, strapR] };
}

export function buildGarment(garment: GarmentType): GarmentParts {
  switch (garment) {
    case 'tshirt':
      return buildTShirt();
    case 'hoodie':
      return buildHoodie();
    case 'jacket':
      return buildJacket();
    case 'dress':
      return buildDress();
    default:
      return buildTShirt();
  }
}
