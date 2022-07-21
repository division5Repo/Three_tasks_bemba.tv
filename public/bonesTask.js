function GetClosestBone(skinnedMesh, bone) {
    const bonePosition = bone.position;
    const bones = skinnedMesh.skeleton.bones;
    let minDistance = Number.MAX_VALUE;
  
    let closestBone;
    let distance;
    for (let i = 0; i < bones.length; i++) {
      distance = bonePosition.distanceTo(bones[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestBone = bones[i];
      }
    }
  
    return closestBone;
  }

  