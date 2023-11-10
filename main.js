import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(25, 10, 25); // Initial position of the camera
const target = new THREE.Vector3(250, 100, 250); // The point the camera will look at

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the character model
const loader = new GLTFLoader();
let character;
loader.load('./sources/varian/scene.gltf', (gltf) => {
  character = gltf.scene;

  // Adjust the scale and position of the character model
  character.scale.set(0.1, 0.1, 0.1);
  character.position.set(0, 1, 0);

  scene.add(character);
});

// Load the pet model and animations
let pet;
loader.load('path/to/pet.fbx', (model) => {
  pet = model;
  scene.add(pet);
});

// ...

// Your animation and game logic go here

// Start the animation loop
const animate = function () {
    requestAnimationFrame(animate);
  
    // Update animations or game logic here
  
    // Update camera position to follow the character
    if (character) {
      const offset = new THREE.Vector3(0, 2, -5); // Adjust this offset based on your preference
      const rotatedOffset = offset.applyMatrix4(character.matrixWorld);
      camera.position.lerp(rotatedOffset, 0.1); // Smoothly interpolate to the new position
      camera.lookAt(target);
    }
  
    // Render the scene
    renderer.render(scene, camera);
  };

// Handle window resize
window.addEventListener('resize', function () {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Start the animation loop
animate();
