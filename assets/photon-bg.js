```javascript
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.THREE) return;
    const mount = document.getElementById("photon-bg");
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 2000;
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const star = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00e8df, size: 2.5, transparent: true, opacity: 0.8 }));
    scene.add(star);

    function animate() {
      requestAnimationFrame(animate);
      star.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
})();

```
