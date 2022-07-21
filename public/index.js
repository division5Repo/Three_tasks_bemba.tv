import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { createCubeGeometry, getPositionOfVertex } from './task1Functions.js';

let container, camera, scene, renderer, mesh, geometry, spherePositions, lerpValue, indexOfVertex = 0;

setupScene();
loadMeshes();
setupRenderer();
setupMeshAnimation();
activateCameraControls();
handleClickOnHtmlELements();
handleWindowResize();

function setupScene(){
  
  container = document.getElementById( 'container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 20 );
  camera.position.z = 10;

  scene.add( camera );
  scene.add( new THREE.AmbientLight( 0x8FBCD2, 0.35 ) );

  const pointLight = new THREE.PointLight( 0xffffff, 1 );
  camera.add( pointLight );
}

function loadMeshes(){

  const CubeGeometry = createCubeGeometry();
  geometry = CubeGeometry[0];
  spherePositions = CubeGeometry[1];

  const material = new THREE.MeshPhongMaterial( {
    color: 0xff0011,
    flatShading: true
  } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}

function setupRenderer(){

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function setupMeshAnimation(){

  lerpValue = 0.0; 
  let reverse  = false;

  renderer.setAnimationLoop( function () {
    
    if(reverse){
      lerpValue -= 0.01;
    }
    else{
      lerpValue += 0.01;
    }

    mesh.morphTargetInfluences[0] = lerpValue;
    mesh.updateMatrixWorld();
    
    renderer.render( scene, camera );
    
    if(lerpValue > 1.0){
      reverse = true
    }
    else if(lerpValue < 0.0){
      reverse = false
    }
  } );

  container.appendChild( renderer.domElement );
}

function handleClickOnHtmlELements(){
  
  let inputIndex = document.getElementById('index');
  document.getElementById("btn").addEventListener("click", ()=>{ 

    if(inputIndex.value !== ''){
      indexOfVertex = inputIndex.value;
    }
    getPositionOfVertex(mesh, indexOfVertex, spherePositions, lerpValue)
  });
}

function activateCameraControls(){

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
}

function handleWindowResize(){

  window.addEventListener( 'resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } );
}