import * as THREE from "three";
import { Loader } from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import {FBXLoader} from "./jsm/loaders/FBXLoader.js"

let container, camera, scene, renderer, mesh;

init();

function init() {
  container = document.getElementById("container");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0x8fbcd2, 0.35));
  const pointLight = new THREE.PointLight(0xffffff, 1);
  camera.add(pointLight);


  const loader = new FBXLoader()
  loader.load('./xbot.fbx', function (firstObject) {
    firstObject.position.x = -200
    firstObject.position.y = 0
    firstObject.position.z = 0
  scene.add(firstObject);
});

let secondMesh ;

 loader.load('./xbot.fbx', function (secondObject) {
  secondObject.position.x = 200
  secondObject.position.y = 0
  secondObject.position.z = 0
  secondMesh == secondObject
scene.add(secondObject);
});

// GetClosestBone(firstObject.children[1]){

// }

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

