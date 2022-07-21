import * as THREE from "three";
import { GetClosestBone } from "./task3Functions.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import {FBXLoader} from "./jsm/loaders/FBXLoader.js";

let container, camera, scene, renderer;

setupScene();
setupRenderer();
await loadMeshes();
setupAnimationLoop();
activateCameraControls();
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

async function loadMeshes(){

  const loader = new FBXLoader();
  let firstObject = await loader.loadAsync('./assets/xbot.fbx');
  firstObject.scale.set(0.02, 0.02, 0.02);
  firstObject.position.x = -2;
  firstObject.position.y = 0;
  firstObject.position.z = 0;
  scene.add(firstObject);

  let secondObject = await loader.loadAsync('./assets/xbot.fbx');
  secondObject.scale.set(0.02, 0.02, 0.02);
  secondObject.position.x = 2;
  secondObject.position.y = 0;
  secondObject.position.z = 0;
  scene.add(secondObject);

  const indexOBoneToTest = 1; //as an example we are checking bone with index 1
  const closestBoneObj = GetClosestBone(secondObject,firstObject.children[indexOBoneToTest]);
  console.log('Closest bone of mesh ',secondObject, " to the bone ",firstObject.children[indexOBoneToTest], 'is ', closestBoneObj);
}

function setupRenderer(){

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
 
}

function setupAnimationLoop(){

  renderer.setAnimationLoop( function () {

    renderer.render( scene, camera );
  } );

  container.appendChild( renderer.domElement );
}

function activateCameraControls(){

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableZoom = true;
}

function handleWindowResize(){

  window.addEventListener( 'resize', ()=>{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } );
}