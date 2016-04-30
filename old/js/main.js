var camera,scene,renderer;
var controls;
var pages = [];
var targA,targB,targC,targD;
var front;
init();
animate();
render();

function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 400;

    pages[0] = new THREE.CSS3DObject(document.getElementById("disp"));
    front = pages[0];
    pages[1] = new THREE.CSS3DObject(document.getElementById("about"));
    setPosition(
        pages[1],
        Math.random()*300+300,
        (Math.random()-0.5)*600,
        -(Math.random())*400-100,
        (Math.random()-0.5)*100
        );
    pages[2] = new THREE.CSS3DObject(document.getElementById("works"));
    setPosition(
        pages[2],
        (Math.random()-1)*300-300,
        (Math.random()-0.5)*600,
        -(Math.random())*400-100,
        (Math.random()-0.5)*100
        );
    pages[3] = new THREE.CSS3DObject(document.getElementById("blog"));
    setPosition(
        pages[3],
        (Math.random()-0.5)*250,
        (Math.random()-0.5)*600,
        -(Math.random())*500-500,
        (Math.random()-0.5)*100
        );
    
    for(var x in pages){
        scene.add(pages[x]);
    }
    
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth ,window.innerHeight);
    renderer.domElement.style.position = "absolute";
    document.getElementById("animation").appendChild(renderer.domElement);

    targA = new THREE.Object3D();
    
    targB = new THREE.Object3D();
    targB.position.x = -1600;
    targB.position.y = -800;
    targB.position.z = -1000;
    targB.rotation.y = -(Math.PI*5-0.2);

    targC = new THREE.Object3D();
    targC.position.x = 900;
    targC.position.y = 500;
    targC.position.z = -700;
    targC.rotation.y = (Math.PI*(2/3)+Math.PI*2);

    targD = new THREE.Object3D();
    targD.position.x = -900;
    targD.position.y = 900;
    targD.position.z = -1200;
    targD.rotation.y = -(Math.PI*(2/3)+Math.PI*2);


    var count = flag = 0;

    $("#buttonA").click(function (){
        count = flag = 0;
        transA();
    });
    $("#buttonB").click(function (){
        count = flag = 0;
        transB();
    });
    $("#buttonC").click(function (){
        count = flag = 0;
        transC();
    });
    $("#buttonD").click(function (){
        count = flag = 0;
        transD();
    });

    $("#disp").click(function (){
        count = flag = 0;
        transA();
    });
    $("#about").click(function (){
        count = flag = 0;
        transB();
    });
    $("#works").click(function (){
        count = flag = 0;
        transC();
    });
    $("#blog").click(function (){
        count = flag = 0;
        transD();
    });

    window.addEventListener("resize", onWindowResize, false);

    ( function renderLoop () {
    requestAnimationFrame( renderLoop );
    flag++;
    for( var x in pages )
    {
        if(front == pages[x]){
            if(flag>200)
            pages[x].position.y = Math.sin(count += 0.01)*10;
            continue;
        }

        if(pages[x].position.x > window.innerWidth*2.3){
            pages[x].position.x=-(Math.random())*1000-window.innerWidth*2.1;
        };
        movePosition(pages[x],5,0,0);
        moveRotation(pages[x],0,.002,.003);
    }

    renderer.render( scene, camera );
  } )();
}

function movePosition(page,px,py,pz){
    page.position.set(
      page.position.x + px,
      page.position.y + py,
      page.position.z + pz
    );
}

function moveRotation(page,rx,ry,rz){
    page.rotation.set(
      page.rotation.x + rx,
      page.rotation.y + ry,
      page.rotation.z + rz
    );
}

function setPosition(page,px,py,pz,ry){
    page.position.x = px;
    page.position.y = py;
    page.position.z = pz;
    page.rotation.y = ry;
}

function transA(){
    front = pages[0];
    transform3d(pages[0],targA,2000);
    transform3d(pages[3],targB,2000);
    transform3d(pages[2],targC,2000);
    transform3d(pages[1],targD,2000);
}

function transB(){
    front = pages[1];
    transform3d(pages[0],targB,2000);
    transform3d(pages[3],targC,2000);
    transform3d(pages[2],targD,2000);
    transform3d(pages[1],targA,2000);
}

function transC(){
    front = pages[2];
    transform3d(pages[0],targC,2000);
    transform3d(pages[3],targD,2000);
    transform3d(pages[2],targA,2000);
    transform3d(pages[1],targB,2000);
}

function transD(){
    front = pages[3];
    transform3d(pages[0],targD,2000);
    transform3d(pages[3],targA,2000);
    transform3d(pages[2],targB,2000);
    transform3d(pages[1],targC,2000);
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene,camera);
}

function transRotation(){
        new TWEEN.Tween(object.rotation) 
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, duration) // x,y,z回転と所要時間
        .easing(TWEEN.Easing.Exponential.InOut) 
        .start();

    new TWEEN.Tween(this)
        .to({}, duration)
        .onUpdate(render)
        .start();
}

function transform3d(object,target,duration){
    new TWEEN.Tween(object.position)
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration) // x,y,z移動先と所要時間
        .easing(TWEEN.Easing.Exponential.InOut)
        .start(); 

    new TWEEN.Tween(object.rotation) 
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, duration) // x,y,z回転と所要時間
        .easing(TWEEN.Easing.Exponential.InOut) 
        .start();

    new TWEEN.Tween(this)
        .to({}, duration)
        .onUpdate(render)
        .start();
}

function animate(){
    requestAnimationFrame(animate);
    TWEEN.update();
}

function render(){
    renderer.render(scene,camera);
}

