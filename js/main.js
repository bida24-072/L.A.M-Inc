// 1. Custom Cursor Highlight
const cursor = document.createElement('div');
cursor.className = 'cursor-highlight';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Three.js 3D Scene (Tallium Inspiration)
const canvasContainer = document.getElementById('canvas-container');

if (canvasContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // Create a cool floating, distorted shape
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x0055FF,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1.0
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        mesh.rotation.x = elapsedTime * 0.2;
        mesh.rotation.y = elapsedTime * 0.3;

        // Smooth mouse follow
        mesh.position.x += (mouseX * 2 - mesh.position.x) * 0.05;
        mesh.position.y += (mouseY * 2 - mesh.position.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
}
