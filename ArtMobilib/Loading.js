














// todo: any size/mode image learning
// todo: init 3D objects associated here
// todo: read 3D ad image from json


var templateX = 400, templateY = 600; // size of learn patterns (portrait mode currently)
var trained_8u;

// using <img>
var load_trained_patterns = function (name) {
    var img2 = document.getElementById(name);
    var contx = container.getContext('2d');
    contx.drawImage(img2, 0, 0, templateX, templateY);
    var imageData = contx.getImageData(0, 0, templateX, templateY);

    trained_8u = new jsfeat.matrix_t(templateX, templateY, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.grayscale(imageData.data, templateX, templateY, trained_8u);
    trainpattern(trained_8u); // le pattern doit etre plus grand que 512*512 dans au moins une dimension (sinon pas de rescale et rien ne se passe)
};

// using direct link
var load_trained_patterns2 = function (name) {
    img = new Image();
    img.onload = function () {
        var contx = container.getContext('2d');
        contx.drawImage(img, 0, 0, templateX, templateY);

        var imageData = contx.getImageData(0, 0, templateX, templateY);
        trained_8u = new jsfeat.matrix_t(templateX, templateY, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(imageData.data, templateX, templateY, trained_8u);
        trainpattern(trained_8u); // le pattern doit etre plus grand que 512*512 dans au moins une dimension (sinon pas de rescale et rien ne se passe)
    }
    img.src = name;
};


/////////////////////
// Threejs initialisation
/////////////////////

function createRenderers() {
    renderer3d = new THREE.WebGLRenderer({ canvas: canvas3D, alpha: true });
    renderer3d.setClearColor(0xffffff, 0);
    renderer3d.setSize(canvas2d.width, canvas2d.height);

    // to project direct texture
    scene1 = new THREE.Scene();
    camera1 = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
    scene1.add(camera1);

    // for 3d projection
    scene2 = new THREE.Scene();
    camera2 = new THREE.PerspectiveCamera(40, canvas2d.width / canvas2d.height, 1, 1000); // be carefull, projection only works if we keep width>heigth (landscape)
    scene2.add(camera2);
};

function render() {
    renderer3d.autoClear = false;
    renderer3d.clear();
    //renderer3d.render(scene1, camera1);
    renderer3d.render(scene2, camera2);
};

function createScenes() {
    plane = createPlane();
    scene2.add(plane);

    texture = createTexture();
    scene1.add(texture);

    model1 = createModel1();
    model2 = createModel2();
    model3 = createModel3();
    scene2.add(model1);
    scene2.add(model2);
    scene2.add(model3);
};

function createPlane() {
    var object = new THREE.Object3D(),
        geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
        material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 }),
        mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);

    return object;
};

function createTexture() {
    var texture = new THREE.Texture(video),
        object = new THREE.Object3D(),
        geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
        material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false, depthWrite: false }),
        mesh = new THREE.Mesh(geometry, material);

    object.position.z = -1;

    object.add(mesh);

    return object;
};

function createModel1() {
    var object = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(0.2, 15, 15, Math.PI);
    var texture = THREE.ImageUtils.loadTexture("data/casa.jpg");
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);

    return object;
};

function createModel2() {
    var object = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(0.2, 15, 15, Math.PI);
    var texture = THREE.ImageUtils.loadTexture("data/3DVTech.jpg");
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);

    return object;
};


function createModel3() {
    var object = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(0.2, 15, 15, Math.PI);
    var texture = THREE.ImageUtils.loadTexture("data/ARTmobilis.jpg");
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);

    return object;
};
