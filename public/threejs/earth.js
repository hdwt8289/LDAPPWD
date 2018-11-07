function makeMyEarth() {
    var container, earth;
    var camera, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var earthRotate = true;
    var ifStop = false;

    init();
    animate();


    function init() {
        container = document.getElementById('container');

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.x = 300;
        camera.position.y = 700;
        camera.position.z = 5000;

        scene = new THREE.Scene();

        //生成地球

        //var loader = new THREE.TextureLoader();
        //loader.load( 'images/earth0.jpg', function ( texture ) {
        //    var geometry = new THREE.SphereGeometry(300, 35, 35);
        //    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        //    earth = new THREE.Mesh(geometry, material);
        //    scene.add(earth);
        //} );
        var texture = THREE.ImageUtils.loadTexture('../images/earth0.jpg');
        var geometry = new THREE.SphereGeometry(300, 35, 35);
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        //生成大量星星
        var material = new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(generateSprite()),
            blending: THREE.AdditiveBlending
        });
        for (var i = 0; i < 1500; i++) {
            var particle = new THREE.Sprite(material);
            var num = (Math.random() - 0.5) * 9000;
            var num1 = (Math.random() - 0.5) * 9000;
            var num2 = (Math.random() - 0.5) * 9000;
            particle.position.set(num, num1, num2);
            particle.scale.x = particle.scale.y = Math.random() * 25 + 16;
            scene.add(particle);
        }

        //生成太阳
        var sun = new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(generateSun()),
            blending: THREE.AdditiveBlending
        });
        var particleSun = new THREE.Sprite(sun);
        particleSun.position.set(-7500, -900, -1000);
        particleSun.scale.x = particleSun.scale.y = 700;
        scene.add(particleSun);


        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    //窗口变化
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //鼠标事件
    function onDocumentMouseMove(event) {
        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );
    }

    //动画
    function animate() {
        if(ifStop){
            return;
        }
        requestAnimationFrame(animate);
        render();
    }

    //渲染画面
    function render() {
        //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        //camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt(scene.position);
        if (earth && earthRotate) {
            earth.rotation.y += 0.002;
        }
        renderer.render(scene, camera);
    }

    //制造星星
    function generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    //制造太阳
    function generateSun() {
        var canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(221,221,221,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,2,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    return {
        earthObj: earth,
        cameraObj: camera,
        controlRotate: function (data) {
            earthRotate = data;
        },
        stopIt: function () {
            ifStop = true;
        }
    };

}





















