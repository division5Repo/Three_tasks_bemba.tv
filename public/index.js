import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { checkFacing } from './task2Functions.js';

  let container, camera, scene, renderer, mesh;

  init();

  function init() {

    container = document.getElementById( 'container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 20 );
    camera.position.z = 10;

    scene.add( camera );
    scene.add( new THREE.AmbientLight( 0x8FBCD2, 0.35 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    camera.add( pointLight );

    let axesHelper = new THREE.AxesHelper(2);

    const firstCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true, opacity: 1 }));
    firstCube.add(axesHelper);
    firstCube.position.set(-3, 0, 0);
    scene.add(firstCube);
    
    const secondCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true, opacity: 1 }));
    axesHelper = new THREE.AxesHelper(2);
    secondCube.add(axesHelper);
    secondCube.position.set(3, 0, 0);
    scene.add(secondCube);

    let isFacing = false;
    let degreeRange = 5;

    let firstForward = new THREE.Vector3();
    let secondForward = new THREE.Vector3();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.setAnimationLoop( function () {
      
      renderer.render( scene, camera );
      firstCube.rotateY(-0.02);
      secondCube.rotateY(0.02);

      isFacing = checkFacing(firstCube, secondCube, firstForward, secondForward, degreeRange);

      if (isFacing) console.log(isFacing);
    } );

    container.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;

    window.addEventListener( 'resize', ()=>{
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    } );

  }

