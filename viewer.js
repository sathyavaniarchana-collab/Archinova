const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff,0x444444,2);
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(0,2,5);

const loader = new THREE.GLTFLoader();

const urlParams = new URLSearchParams(window.location.search);
const modelName = urlParams.get('model');

loader.load('models/' + modelName, function(gltf){

scene.add(gltf.scene);

});

function animate(){

requestAnimationFrame(animate);

controls.update();
renderer.render(scene,camera);

}

animate();