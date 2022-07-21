import * as THREE from 'three'

  export function createGeometry() {

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
    return geometry;
  }

  export function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  export function getPositionOfVertex(object, index) {

    const positionAttribute = object.geometry.getAttribute('position');

    const vertex = new THREE.Vector3();
    vertex.fromBufferAttribute( positionAttribute, index );
    console.log('global position of vertex at index: ', index, 'is ', object.localToWorld( vertex ));
    // return object.localToWorld( vertex );
  }