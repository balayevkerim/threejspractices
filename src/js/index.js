import * as THREE from "three";
import earth from "../img/earth.jpg";
import jupiter from "../img/jupiter.jpg";
import mars from "../img/mars.jpg";
import mercury from "../img/mercury.jpg";
import neptune from "../img/neptune.jpg";
import pluto from "../img/pluto.jpg";
import saturnring from "../img/saturnring.png";
import saturn from "../img/saturn.jpg";
import stars from "../img/stars.jpg";
import sun from "../img/sun.jpg";
import uranus from "../img/uranus.jpg";
import uranusring from "../img/uranusring.png";
import venus from "../img/venus.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const cubeLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
scene.background = cubeLoader.load([stars, stars, stars, stars, stars, stars]);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);

orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);

scene.add(ambientLight);

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sun),
});
const sunObj = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(sunObj);

function createPlanet(size, planetImg, position, ring) {
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(planetImg),
  });
  const planetMesh = new THREE.Mesh(planetGeo, planetMaterial);
  planetMesh.position.x = position;
  const planetObj = new THREE.Object3D();
  planetObj.add(planetMesh);
  scene.add(planetObj);
  if (ring) {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
    const RingMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.image),
      side: THREE.DoubleSide,
    });
    const RingMesh = new THREE.Mesh(RingGeo, RingMaterial);
    RingMesh.position.x = position;
    planetObj.add(RingMesh);
    RingMesh.rotation.x = -0.5 * Math.PI;
  }
  return { mesh: planetMesh, obj: planetObj };
}

const mercuryObj = createPlanet(3.2, mercury, 28);
const saturnObj = createPlanet(10, saturn, 128,{
    innerRadius:10,
    outerRadius:20,
    image:saturnring
});
const earthObj = createPlanet(6, earth, 62);
const marsObj = createPlanet(4, mars, 78);
const jupiterObj = createPlanet(12, jupiter, 100);
const uranusObj = createPlanet(7, uranus, 176, {
    innerRadius: 7,
    outerRadius: 12,
    image: uranusring
});
const neptuneObj = createPlanet(7, neptune, 200);
const venusObj = createPlanet(7, venus, 200);

const plutoObj = createPlanet(2.8, pluto, 216);


const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function animate() {
  sunObj.rotateY(0.01);
  // mercuryMesh.rotateY(0.004)
  mercuryObj.obj.rotateY(0.02);
  mercuryObj.mesh.rotateY(0.05);
  saturnObj.obj.rotateY(0.001);
  saturnObj.mesh.rotateY(0.01);
  earthObj.obj.rotateY(0.008)
  marsObj.obj.rotateY(0.008)
  jupiterObj.obj.rotateY(0.008)
  uranusObj.obj.rotateY(0.005)
  earthObj.obj.rotateY(0.0018)
  neptuneObj.obj.rotateY(0.0038)
  plutoObj.obj.rotateY(0.003)
  venusObj.obj.rotateY(0.003)


  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
