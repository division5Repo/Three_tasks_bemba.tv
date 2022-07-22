import { Vector3 } from "three";

export function GetClosestBone(mesh, bone) {
  
  const bonePosition = new Vector3();
  bone.getWorldPosition(bonePosition);
  const bones = mesh.children[2].children;
  let minDistance = Number.MAX_VALUE;
  let closestBone;
  let distance;

  for (let i = 0; i < bones.length; i++) {

    const positionOfBoneToCheck = new Vector3();
    bones[i].getWorldPosition(positionOfBoneToCheck);
    distance = bonePosition.distanceTo(positionOfBoneToCheck);
    if (distance < minDistance) {
      minDistance = distance;
      closestBone = bones[i];
    }
  }

  return closestBone;
}

  