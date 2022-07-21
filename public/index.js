import * as THREE from "three";
import { GetClosestBone } from "./bonesTask.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import {FBXLoader} from "./jsm/loaders/FBXLoader.js"

let container, camera, scene, renderer, mesh;

await init();

async function init() {
  container = document.getElementById("container");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0x8fbcd2, 0.35));
  const pointLight = new THREE.PointLight(0xffffff, 1);
  camera.add(pointLight);
  let firstmesh = null;

  const loader = new FBXLoader()
  let firstObject = await loader.loadAsync('./xbot.fbx');
  firstObject.position.x = -200
  firstObject.position.y = 0
  firstObject.position.z = 0
  scene.add(firstObject);

  let secondObject = await loader.loadAsync('./xbot.fbx');
  secondObject.position.x = 200
  secondObject.position.y = 0
  secondObject.position.z = 0
  scene.add(secondObject);

  console.log('Closest bone of mesh ',secondObject, " to the bone ",firstObject.children[0], 'is ', GetClosestBone(secondObject,firstObject.children[0]))

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
  });

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}


