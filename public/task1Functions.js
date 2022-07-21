import * as THREE from 'three'
import { Vector3 } from 'three';

export function createCubeGeometry() {

  const geometry = new THREE.BoxGeometry( 2, 2, 2, 4, 4, 4 );
  geometry.morphAttributes.position = [];
  const positionAttribute = geometry.attributes.position;
  const spherePositions = [];

  for ( let i = 0; i < positionAttribute.count; i ++ ) {

    const x = positionAttribute.getX( i );
    const y = positionAttribute.getY( i );
    const z = positionAttribute.getZ( i );

    spherePositions.push(

      x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
      y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
      z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
    );
  }

  geometry.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( spherePositions, 3 );
  return [geometry, spherePositions];
}

export function getPositionOfVertex(object, index, spherePositions, lerpValue) {
  
  const positionAttribute = object.geometry.getAttribute('position');
  positionAttribute.applyMatrix4( object.matrixWorld );
  const i = index*3;

  const cubePositionOfVertex = new Vector3(positionAttribute[i], positionAttribute[i+1], positionAttribute[i+2]);
  cubePositionOfVertex.applyMatrix4( object.matrixWorld ); //global pos of vertex before any animation
  const spherePositionOfVertex = new Vector3(spherePositions[i], spherePositions[i+1], spherePositions[i+2]);
  spherePositionOfVertex.applyMatrix4( object.matrixWorld ); //global pos of vertex after animation complete

  let newPosition = new Vector3();
  newPosition.lerpVectors ( cubePositionOfVertex, spherePositionOfVertex, lerpValue ); //new pos based on lerpValue and 2 positions above
  
  console.log('Position of vertex at index: ', index, 'is ', newPosition);
}