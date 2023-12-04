import * as THREE from "three";
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpeg'
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// renderer.setClearColor(0x523525)
document.body.appendChild(renderer.domElement);
const cubeLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader();


const gui = new dat.GUI();
const scene = new THREE.Scene();
scene.background = cubeLoader.load([
    nebula,
    nebula,
    stars,stars,stars,stars
])
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(0,2,5)



orbit.update()
const boxGeometry = new THREE.BoxGeometry();
const boxMesh  = new THREE.MeshBasicMaterial({color:0x00FF00})
const box = new THREE.Mesh(boxGeometry,boxMesh)
scene.add(box)

const box2Geometry = new THREE.BoxGeometry(4,4,4);
const box2Mesh  = new THREE.MeshBasicMaterial({map:textureLoader.load(nebula)})
const box2 = new THREE.Mesh(box2Geometry,box2Mesh)
scene.add(box2)
box2.position.set(5,5,10)
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMesh  = new THREE.MeshStandardMaterial({color:0xFFFFFF,side:THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry,planeMesh )
plane.receiveShadow = true;
scene.add(plane)
const sphereGeo = new THREE.SphereGeometry(4,50,10);
const sphereMesh  = new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false})
const sphere = new THREE.Mesh(sphereGeo,sphereMesh )
sphere.castShadow = true
const options = {
    sphereColor:0x0000FF,
    wireframe:false,
    speed:0.01
}
 /* const ambientLight = new THREE.AmbientLight(0x333333);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8)
directionalLight.shadow.camera.bottom = -12
const dLightShadovHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(dLightShadovHelper)
directionalLight.position.set(-30,50,0)
scene.add(directionalLight)
directionalLight.castShadow = true
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper)
scene.add(ambientLight)  */


const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);
gui.addColor(options,'sphereColor').onChange(e=>{
    sphere.material.color.set(e)
})
gui.add(options,'wireframe').onChange(e=>{
    sphere.material.wireframe =e
})

gui.add(options,'speed',0,0.1)


sphere.position.x =-10
sphere.position.y =10 
scene.add(sphere)

plane.rotation.x= -0.5 * Math.PI
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)
let step  = 0 ;
function animate(time) {
    box.rotation.x=time/1000
    box.rotation.y=time/1000
    
    box.rotation.z=time/1000;
    step+=options.speed 
    sphere.position.y = 10* Math.abs(Math.sin(step))
    
    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate)