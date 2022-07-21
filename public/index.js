import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { createGeometry, getPositionOfVertex } from './task1Functions.js';

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

    const geometry = createGeometry();

    const material = new THREE.MeshPhongMaterial( {
      color: 0xff0011,
      flatShading: true
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    let inputIndex = document.getElementById('index');
    let indexOfVertex = 0;

    document.getElementById("btn").addEventListener("click", ()=>{ 
      
      if(inputIndex.value !== ''){
        indexOfVertex = inputIndex.value;
      }

      getPositionOfVertex(mesh, indexOfVertex)
    });

    let value = 0.0;
    let reverse  = false;
    renderer.setAnimationLoop( function () {
      
      if(reverse){
        value -= 0.001;
      }
      else{
        value += 0.001;
      }

      renderer.render( scene, camera );
      mesh.morphTargetInfluences[ 0 ] = value;
      
      if(value > 2.0){
        reverse = true
      }
      else if(value < 0.0){
        reverse = false
      }
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

