import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import floorVertxerShader from './shaders/floor/vertex.glsl'
import floorFragmentShader from './shaders/floor/fragment.glsl'

/*
 * Scene setup 
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene();
/*
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 8;
camera.rotation.x = -Math.PI / 4;

/* 
 * Where the magic shall happen
 * TODO: pass to THREE.fiber before it gets huge
 */

/*
 * Floor 
 */
const floorGeometry = new THREE.PlaneGeometry(14, 14,  10, 10);

const floorMaterial = new THREE.ShaderMaterial({
    vertexShader: floorVertxerShader,
    fragmentShader: floorFragmentShader,
    uniforms: {
        uTime: {value: 0}
    }
})


const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/*
 * Sward components
 */
const swardHandleGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
const swardHandleMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('brown') });
const swardHandle = new THREE.Mesh(swardHandleGeometry, swardHandleMaterial);
swardHandle.position.y = 2;

const hiltGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.2);
const hiltMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('brown') });
const hilt = new THREE.Mesh(hiltGeometry, hiltMaterial);
hilt.position.y = 1.7;
hilt.rotation.x = -Math.PI / 2;

const bladeGeometry = new THREE.BoxGeometry(0.4, 4, 0.2);
const bladeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('yellow') });
const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
blade.position.y -= 0.3;

const sward = new THREE.Group();
sward.add(swardHandle, hilt, blade);
sward.position.y += 4;
scene.add(sward);

/*
 * Renderer - setup
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock();

/*
 * Animate 
 */
function animate() {

    // Time
    const elapsedTime = clock.getElapsedTime()

    // Do this on very frame
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    floorMaterial.uniforms.uTime.value = elapsedTime;

    // TODO: add physics for a better fall
    if (sward.position.y > -2.6) {
        sward.position.y -= 0.01 * elapsedTime;
    }
}

animate();

/*
 * Window resize
 */
function onWindowResize() {
    // Adjust camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Resize renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);