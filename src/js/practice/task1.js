import * as THREE from "three";
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const cubeLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader();


export const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement)
camera.position.set(0,2,5)

orbit.update()
const boxGeometry = new THREE.BoxGeometry();
const boxMesh  = new THREE.MeshBasicMaterial({color:0x00FF00})
const box = new THREE.Mesh(boxGeometry,boxMesh)
scene.add(box)

function animate(time) {

    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate)