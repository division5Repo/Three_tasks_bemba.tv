import * as THREE from 'three'

export function checkFacing(firstObject, secondObject, firstForward, secondForward, range = 0) {

  // getting Forward Directions 
  firstObject.getWorldDirection(firstForward);
  secondObject.getWorldDirection(secondForward);

  // getting Direction between each other
  const firstFaceDirection = new THREE.Vector3(secondObject.position.x - firstObject.position.x, secondObject.position.y - firstObject.position.y, secondObject.position.z - firstObject.position.z);
  const secondFaceDirection = new THREE.Vector3(firstObject.position.x - secondObject.position.x, firstObject.position.y - secondObject.position.y, firstObject.position.z - secondObject.position.z);

  // getting Degrees Of Forward Direction and the other Object
  let firstDegree = THREE.MathUtils.radToDeg(firstForward.angleTo(firstFaceDirection));
  let secondDegree = THREE.MathUtils.radToDeg(secondForward.angleTo(secondFaceDirection));

  // checking if they are both facing each other
  if (firstDegree < 0 + range && secondDegree < 0 + range) {
    
    return true;
  } else {
    
    return false;
  }
}