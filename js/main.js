// Main JavaScript for the 3D Space Portfolio

// Global variables
let scene, camera, renderer, controls;
let planets = {};
let raycaster, mouse;
let selectedPlanet = null;
let animating = false;

// Planet configuration
const planetConfig = {
    web: {
        color: 0x8a2be2,
        position: { x: -8, y: 2, z: -3 },
        size: 1.5,
        orbitRadius: 10,
        orbitSpeed: 0.0005,
        rotationSpeed: 0.005,
        description: "Explore my web development projects including responsive websites, progressive web apps, and interactive UI/UX designs."
    },
    ai: {
        color: 0x00bfff,
        position: { x: 5, y: -1, z: 7 },
        size: 1.2,
        orbitRadius: 12,
        orbitSpeed: 0.0007,
        rotationSpeed: 0.006,
        description: "Discover my artificial intelligence and machine learning projects, from neural networks to computer vision applications."
    },
    software: {
        color: 0xff4500,
        position: { x: 12, y: 3, z: -5 },
        size: 1.8,
        orbitRadius: 15,
        orbitSpeed: 0.0003,
        rotationSpeed: 0.004,
        description: "Check out my software engineering projects, including desktop applications, mobile apps, and backend systems."
    },
    games: {
        color: 0x32cd32,
        position: { x: -6, y: -2, z: 10 },
        size: 1.3,
        orbitRadius: 14,
        orbitSpeed: 0.0004,
        rotationSpeed: 0.007,
        description: "Play and explore my game development projects, from mobile games to immersive 3D experiences."
    }
};

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the 3D scene
    init();
    
    // Show loading screen for minimum 2 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Setup event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    
    document.getElementById('explore-btn').addEventListener('click', () => {
        if (selectedPlanet) {
            // Ensure correct relative path
            window.location.href = `./pages/${selectedPlanet}.html`;
        }
    });
});

// Initialize the 3D scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // Setup renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('space-scene'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Create starfield background
    createStars();
    
    // Create the sun
    createSun();
    
    // Create planets
    createPlanets();
    
    // Create planet labels
    updatePlanetLabels();
    
    // Enable clicking on labels to select and navigate
    document.querySelectorAll('.planet-label').forEach(label => {
        label.style.pointerEvents = 'auto';
        label.style.cursor = 'pointer';
        label.addEventListener('click', () => {
            const planetName = label.getAttribute('data-planet');
            selectPlanet(planetName);
            // Navigate directly when label clicked
            window.location.href = `./pages/${planetName}.html`;
        });
    });
    
    // Start animation loop
    animate();
}

// Create stars as background
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// Create the sun
function createSun() {
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Create sun glow
    const sunGlow = new THREE.PointLight(0xffff00, 1.5, 50);
    sun.add(sunGlow);
}

// Create all planets
function createPlanets() {
    Object.keys(planetConfig).forEach(planetName => {
        createPlanet(planetName);
        createOrbit(planetConfig[planetName].orbitRadius);
    });
}

// Create a single planet
function createPlanet(name) {
    const config = planetConfig[name];
    
    // Create planet geometry with higher detail
    const planetGeometry = new THREE.SphereGeometry(config.size, 64, 64);
    
    // Create planet material
    const planetMaterial = new THREE.MeshStandardMaterial({
        color: config.color,
        roughness: 0.7,
        metalness: 0.3
    });
    
    // Create the planet mesh
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Set initial position
    planet.position.set(config.position.x, config.position.y, config.position.z);
    
    // Add planet to scene
    scene.add(planet);
    
    // Add subtle atmosphere glow
    const atmosphereGeom = new THREE.SphereGeometry(config.size * 1.1, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    planet.add(atmosphere);
    
    // Store planet reference
    planets[name] = {
        mesh: planet,
        orbitAngle: Math.random() * Math.PI * 2,
        config: config
    };
}

// Create orbit ring for visual effect
function createOrbit(radius) {
    const orbitGeometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.1,
        transparent: true,
        side: THREE.DoubleSide
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate and orbit planets
    Object.keys(planets).forEach(planetName => {
        const planet = planets[planetName];
        const config = planet.config;
        
        // Skip animation if we're currently animating for selection
        if (animating && planetName === selectedPlanet) {
            return;
        }
        
        // Update orbit angle
        planet.orbitAngle += config.orbitSpeed;
        
        // Calculate new position
        const x = Math.cos(planet.orbitAngle) * config.orbitRadius;
        const z = Math.sin(planet.orbitAngle) * config.orbitRadius;
        
        // Update position
        planet.mesh.position.x = x;
        planet.mesh.position.z = z;
        
        // Rotate planet
        planet.mesh.rotation.y += config.rotationSpeed;
    });
    
    // Update planet labels
    updatePlanetLabels();
    
    // Render the scene
    renderer.render(scene, camera);
}

// Update planet label positions to match planet positions in 3D space
function updatePlanetLabels() {
    const planetLabels = document.querySelectorAll('.planet-label');
    
    planetLabels.forEach(label => {
        const planetName = label.getAttribute('data-planet');
        const planet = planets[planetName];
        
        if (planet) {
            // Convert 3D position to screen coordinates
            const position = new THREE.Vector3();
            planet.mesh.getWorldPosition(position);
            position.project(camera);
            
            // Convert to pixel coordinates
            const x = (position.x * 0.5 + 0.5) * window.innerWidth;
            const y = -(position.y * 0.5 - 0.5) * window.innerHeight;
            
            // Set label position
            label.style.left = `${x}px`;
            label.style.top = `${y - 30}px`;
            
            // Show label if planet is in front of camera
            if (position.z < 1) {
                label.style.opacity = 1;
            } else {
                label.style.opacity = 0;
            }
        }
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse movement
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Check for intersections
    checkPlanetIntersection();
}

// Handle mouse click
function onMouseClick() {
    if (selectedPlanet) {
        return;
    }
    
    // Check for intersections
    checkPlanetIntersection(true);
}

// Check if mouse intersects with any planet
function checkPlanetIntersection(isClick = false) {
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const planetMeshes = Object.keys(planets).map(name => planets[name].mesh);
    const intersects = raycaster.intersectObjects(planetMeshes);
    
    if (intersects.length > 0) {
        // Found intersection
        const intersectedPlanet = intersects[0].object;
        
        // Get the planet name
        const planetName = Object.keys(planets).find(name => planets[name].mesh === intersectedPlanet);
        
        // Set cursor style
        document.body.style.cursor = 'pointer';
        
        if (isClick && planetName) {
            selectPlanet(planetName);
        }
    } else {
        // No intersection
        document.body.style.cursor = 'default';
    }
}

// Handle planet selection
function selectPlanet(planetName) {
    if (animating) return;
    
    selectedPlanet = planetName;
    animating = true;
    
    // Update UI
    document.getElementById('planet-name').textContent = planetName.charAt(0).toUpperCase() + planetName.slice(1);
    document.getElementById('planet-name').className = `${planetName}-color`;
    document.getElementById('planet-description').textContent = planetConfig[planetName].description;
    document.getElementById('explore-btn').classList.remove('hidden');
    
    // Animate camera to focus on the selected planet
    const planet = planets[planetName];
    const targetPosition = new THREE.Vector3().copy(planet.mesh.position);
    targetPosition.multiplyScalar(0.8);
    
    // Create animation
    const startPosition = camera.position.clone();
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease function
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedProgress = ease(progress);
        
        // Interpolate camera position
        camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            animating = false;
        }
    }
    
    // Start camera animation
    animateCamera();
}
