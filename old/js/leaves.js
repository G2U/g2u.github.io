var camera,scene,renderer;
var controls;
var home,page1,page2,page3;
var leaves = [];
var targA,targB,targC,targD;
var front;

init();
animate();
render();

function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 400;

    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf1")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf2")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf3")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf4")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf5")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf6")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf7")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf8")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf9")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf10")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf11")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf12")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf13")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf14")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf15")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf16")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf17")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf18")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf19")));
    leaves.push(new THREE.CSS3DObject(document.getElementById("leaf20")));
 
    for( var x in leaves )
    {

        setPosition(
        leaves[x],
        (Math.random()-0.5)*window.innerWidth,
        (Math.random()-0.5)*window.innerHeight,
        -(Math.random()-0.5)*2000-1000,
        (Math.random()-0.5)*100
        );
        scene.add(leaves[x]);

/*   left to right 
        setPosition(
        leaves[x],
        -(Math.random())*3000-window.innerWidth,
        (Math.random()-0.5)*window.innerHeight,
        -(Math.random()-0.5)*800,
        (Math.random()-0.5)*100
        );
        scene.add(leaves[x]);*/
    }

    home = new THREE.CSS3DObject(document.getElementById("disp"));
    front = home;
    scene.add(home);

    page1 = new THREE.CSS3DObject(document.getElementById("about"));
    setPosition(
        page1,
        (Math.random())*300+300,
        (Math.random()-0.5)*600,
        -(Math.random())*400-100,
        (Math.random()-0.5)*100
        );
    scene.add(page1);

    page2 = new THREE.CSS3DObject(document.getElementById("works"));
    setPosition(
        page2,
        (Math.random()-1)*300-300,
        (Math.random()-0.5)*600,
        -(Math.random())*400-100,
        (Math.random()-0.5)*100
        );
    scene.add(page2);

    page3 = new THREE.CSS3DObject(document.getElementById("blog"));
    setPosition(
        page3,
        (Math.random()-0.5)*250,
        (Math.random()-0.5)*600,
        -(Math.random())*500-500,
        (Math.random()-0.5)*100
        );
    scene.add(page3);

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth ,window.innerHeight);
    renderer.domElement.style.position = "absolute";
    document.getElementById("animation").appendChild(renderer.domElement);

    targA = new THREE.Object3D();
    
    targB = new THREE.Object3D();
    targB.position.x = -900;
    targB.position.y = -500;
    targB.position.z = -1300;
    targB.rotation.y = -(Math.PI*5-0.2);

    targC = new THREE.Object3D();
    targC.position.x = 700;
    targC.position.y = 400;
    targC.position.z = -1000;
    targC.rotation.y = (Math.PI*(2/3)+Math.PI*2);

    targD = new THREE.Object3D();
    targD.position.x = -900;
    targD.position.y = 500;
    targD.position.z = -1500;
    targD.rotation.y = -(Math.PI*(2/3)+Math.PI*2);

    $("#buttonA").click(function (){
        transA();
    });
    $("#buttonB").click(function (){
        transB();
    });
    $("#buttonC").click(function (){
        transC();
    });
    $("#buttonD").click(function (){
        transD();
    });

    $("#disp").click(function (){
        transA();
    });
    $("#about").click(function (){
        transB();
    });
    $("#works").click(function (){
        transC();
    });
    $("#blog").click(function (){
        transD();
    });

    window.addEventListener("resize", onWindowResize, false);
    
    var plusspeed = 0;
    
    ( function renderLoop () {
    requestAnimationFrame( renderLoop );
    
    plusspeed++;

    if(front!=home)moveRotation(home,0,.003,.003);
    if(front!=page1)moveRotation(page1,0,.004,-.002);
    if(front!=page2)moveRotation(page2,0,-.003,.002);
    if(front!=page3)moveRotation(page3,0,-.003,-.003);

    //  moveRotation(camera,0,.01,0);
    /*
    if(front==home)moveRotation(home,1,.3,3);
    if(front==page1)moveRotation(page1,1,.4,2);
    if(front==page2)moveRotation(page2,1,-.3,2);
    if(front==page3)moveRotation(page3,1,-.3,3);
  */
  //  movePosition(home,10,.3,0);

//    movePosition(leaf1,10,.3,0);
//    moveRotation(leaf1,.02,.03,.03);

    for( var x in leaves )
    {

/*   left to right
        if(leaves[x].position.x > window.innerWidth){
            leaves[x].position.x=-(Math.random())*3000-window.innerWidth;
            leaves[x].position.y=(Math.random()-0.5)*window.innerHeight;
        };

        */
//        movePosition(leaves[x],10+0.05*plusspeed,0,0);
        
        if(leaves[x].position.z > 500){
            leaves[x].position.z=(Math.random()-0.5)*window.innerWidth;
            leaves[x].position.y=(Math.random()-0.5)*window.innerHeight;
            leaves[x].position.z=-(Math.random()-0.5)*2000-100;
        };

        movePosition(leaves[x],0,0,10+0.05*plusspeed);
        moveRotation(leaves[x],.02,.03,.0);
    }

/*    movePosition(page1,10,.4,0);
    movePosition(page2,10,-.3,0);
    movePosition(page3,10,-.3,0);*/

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
    front = home;
    transform3d(home,targA,2000);
    transform3d(page3,targB,2000);
    transform3d(page2,targC,2000);
    transform3d(page1,targD,2000);
}

function transB(){
    front = page1;
    transform3d(home,targB,2000);
    transform3d(page3,targC,2000);
    transform3d(page2,targD,2000);
    transform3d(page1,targA,2000);
}

function transC(){
    front = page2;
    transform3d(home,targC,2000);
    transform3d(page3,targD,2000);
    transform3d(page2,targA,2000);
    transform3d(page1,targB,2000);
}

function transD(){
    front = page3;
    transform3d(home,targD,2000);
    transform3d(page3,targA,2000);
    transform3d(page2,targB,2000);
    transform3d(page1,targC,2000);
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

