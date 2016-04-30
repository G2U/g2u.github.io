var camera,scene,renderer;
var controls;
var planets = [];
var imgs = [];

init();
animate();
render();

function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 400;
    imgs = document.getElementsByName("planets"); 
    for(var i in imgs){
        if(i=="length")
            break;
        planets.push(new THREE.CSS3DObject(imgs[i]));
    }

    var plus = 0;
    for( var x in planets )
    {
        setPosition(
        planets[x],
        (Math.random()-0.5)*window.innerWidth*2,
        (Math.random()-0.5)*window.innerHeight*2,
        -(Math.random()-0.5)*3000-10000-plus,
//        (Math.random()-0.5)*100
       0
        );
        scene.add(planets[x]);

        plus += 10000;
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

    for( var x in planets )
    {

        if(planets[x].position.z > 500){
            planets[x].position.x=(Math.random()-0.5)*window.innerWidth*2;
            planets[x].position.y=(Math.random()-0.5)*window.innerHeight*2;
            planets[x].position.z=-(Math.random()-0.5)*1000-100000;
        };

        movePosition(planets[x],0,0,10+0.05*plusspeed);
//        moveRotation(planets[x],.02,.03,.0);
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

