import * as THREE from "three";
import { GetClosestBone } from "./task3Functions.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import {FBXLoader} from "./jsm/loaders/FBXLoader.js";

let container, camera, scene, renderer, firstObject, secondObject, closestBoneObj,
indexOBoneToTest = 3; //as an example we are checking bone with index 3 => right leg

setupScene();
setupRenderer();
await loadMeshes();
setupAnimationLoop();
activateCameraControls();
activateCharacterControls();
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
  firstObject = await loader.loadAsync('./assets/mod.fbx');
  firstObject.scale.set(0.02, 0.02, 0.02);
  firstObject.position.x = -2;
  firstObject.position.y = 0;
  firstObject.position.z = 0;
  scene.add(firstObject);

  secondObject = await loader.loadAsync('./assets/mod.fbx');
  secondObject.scale.set(0.02, 0.02, 0.02);
  secondObject.position.x = 2;
  secondObject.position.y = 0;
  secondObject.position.z = 0;
  scene.add(secondObject);

  closestBoneObj = GetClosestBone(secondObject, firstObject.children[2].children[indexOBoneToTest]);
  console.log('Mesh searched into-> ', secondObject);
  console.log('Bone to measure distance from', firstObject.children[2].children[indexOBoneToTest]);
  console.log('Initial closest bone ', closestBoneObj);
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

function activateCharacterControls(){
  
  window.addEventListener('keydown',(evt)=>{
    
    switch (evt.key) {
      case 'w': // move forward
      firstObject.position.z -= 0.05;
      break;
      case 'a': // move back
      firstObject.position.x -= 0.05;
      break;
      case 's': // move left
      firstObject.position.z += 0.05;
      break;
      case 'd': // move right
      firstObject.position.x += 0.05;
      break;
      case 'e': // rotate clockwise
      firstObject.rotation.y += 0.05;
      break;
      case 'q': // rotate counerclockwise
      firstObject.rotation.y -= 0.05;
      break;
      default:
      break;
    }

    closestBoneObj = GetClosestBone(secondObject, firstObject.children[2].children[indexOBoneToTest]);
    console.log('Closest bone stationary model to the ',firstObject.children[2].children[indexOBoneToTest].name, ' bone of moving model is ', closestBoneObj.name);
  });
}

function handleWindowResize(){

  window.addEventListener( 'resize', ()=>{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } );
}