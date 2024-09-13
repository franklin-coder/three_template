import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshNormalMaterial({ color: 0xff6347 });
//const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
//const material = new THREE.MeshStandarMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

const directionalLight = new THREE.DirectionalLight( 0x000000);
directionalLight.position.set(8, 8, 8);

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

scene.add(pointLight, ambientLight, directionalLight, light);
//scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  //const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
 // const material = new THREE.MeshNormalMaterial({ color: 0xffffff });
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const frankTexture = new THREE.TextureLoader().load('FOTO_PERFIL_FRANK_NBG3.png');

const frank = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: frankTexture }));

scene.add(frank);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon2Texture = new THREE.TextureLoader().load('moon2.png');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);


const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 26, 26),
  new THREE.MeshNormalMaterial({
    map: moon2Texture,
    normalMap: normalTexture,
  })
);

scene.add(moon, moon2);

moon.position.z = 30;
moon.position.setX(-10);

moon2.position.z = 68;
moon2.position.setX(-10);

frank.position.z = -5;
frank.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  moon2.rotation.x += 0.05;
  moon2.rotation.y += 0.075;
  moon2.rotation.z += 0.05;


  frank.rotation.y += 0.01;
  frank.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;


}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
 frank.rotation.y += 0.0005;

 frank.rotation.x += 0.0007;
 


  moon.rotation.x += 0.005;
  moon2.rotation.x += 0.005;


  // controls.update();

  renderer.render(scene, camera);
}

animate();


///add for fugaz starts
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');

  const startX = -40; // Inicia desde fuera de la izquierda de la pantalla
  const startY = window.innerHeight; // Posición Y en la parte inferior

  const endX = window.innerWidth - startX; // Termina en la esquina superior derecha
  const endY = -window.innerHeight; // Termina fuera de la parte superior

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  star.style.setProperty('--endX', `${endX}px`);
  star.style.setProperty('--endY', `${endY}px`);
  
  const duration = 10; // Duración de la animación en segundos
  star.style.animationDuration = `${duration}s`;

  document.getElementById('stars-container').appendChild(star);

  setTimeout(() => {
    star.remove();
  }, duration * 30000); // Remove star after animation duration
}
createShootingStar();
// function generateStars() {
//   setInterval(createShootingStar, 20000); // Create a star every second
// }

document.addEventListener('DOMContentLoaded', generateStars);
