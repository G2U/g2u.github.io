var camera,scene,renderer;
var controls;
var leaves = [];
var imgs = [];

init();
animate();
render();

function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 400;
/*
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
 */
    imgs = document.getElementsByName("leafimg"); 
    for(var i in imgs){
        if(i=="length")
            break;
        leaves.push(new THREE.CSS3DObject(imgs[i]));
    }

    for( var x in leaves )
    {
        setPosition(
        leaves[x],
        (Math.random()-0.5)*window.innerWidth,
        (Math.random()-0.5)*window.innerHeight,
        -(Math.random()-0.5)*2000-1500,
        (Math.random()-0.5)*100
        );
        scene.add(leaves[x]);
    }

    home = new THREE.CSS3DObject(document.getElementById("disp"));
    front = home;
    scene.add(home);

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth ,window.innerHeight);
    renderer.domElement.style.position = "absolute";
    document.getElementById("animation").appendChild(renderer.domElement);


    $("#disp").click(function (){
    });

    window.addEventListener("resize", onWindowResize, false);
    
    var plusspeed = 0;
    
    ( function renderLoop () {
    requestAnimationFrame( renderLoop );
    
    plusspeed++;

    moveRotation(home,0,.003,.003);

    for( var x in leaves )
    {

        if(leaves[x].position.z > 500){
            leaves[x].position.z=(Math.random()-0.5)*window.innerWidth;
            leaves[x].position.y=(Math.random()-0.5)*window.innerHeight;
            leaves[x].position.z=-(Math.random()-0.5)*2000-100;
        };

        movePosition(leaves[x],0,0,10+0.05*plusspeed);
        moveRotation(leaves[x],.02,.03,.0);
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

