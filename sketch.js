function setup() {
  
  canvas = createCanvas(0,0);
  background(0);
  
  var timeDescription = createDiv("<font color='white'>Orbit Speed Slow->Fast</font>");//description for slider
  timeDescription.position(window.innerWidth-100,30);
  var timeSlider = createSlider(1,100,1);//slider for changing animation speed
  timeSlider.position(window.innerWidth-100,70);
  timeSlider.size(90,10);
  move = false;// determines if animation is started or stopped
  var startButton = createButton("start");//start animation
  startButton.position(window.innerWidth-50,100);
  startButton.mousePressed(function() {
    move = true;
  });
  var stopButton = createButton("stop");//stop animation
  stopButton.position(window.innerWidth-50,120);
  stopButton.mousePressed(function() {
    move = false;
  });
  
  //Buttons for centering on objects
  var systemButton = createButton("Solar System");
  systemButton.position(window.innerWidth-85, 160);
  var mercuryButton = createButton("Mercury");
  mercuryButton.position(window.innerWidth-70,200);
  var venusButton = createButton("Venus");
  venusButton.position(window.innerWidth-70,220);
  var earthButton = createButton("Earth");
  earthButton.position(window.innerWidth-70,240);
  var marsButton = createButton("Mars");
  marsButton.position(window.innerWidth-70,260);
  var jupiterButton = createButton("Jupiter");
  jupiterButton.position(window.innerWidth-70,280);
  var saturnButton = createButton("Saturn");
  saturnButton.position(window.innerWidth-70,300);
  var uranusButton = createButton("Uranus");
  uranusButton.position(window.innerWidth-70,320);
  var neptuneButton = createButton("Neptune");
  neptuneButton.position(window.innerWidth-70,340);
  
  
  var orbits = createButton("Show Orbits");//Shows/hides orbits
  var orbitsShown = true;
  orbits.position(window.innerWidth-80,370);
  
  //Data for object text description
  var label = "Sun";
  var classification = "Star";
  var mass = "1.98*10^30 kg";
  var radius = "696,342 km";
  var smaxis = "NA";
  var ecc = "NA";
  var period = "NA";
  var day = "NA";
  var moon = "NA";
  
  var labelText = createDiv("<font color='white'>Name: "+label+"</font>");
  labelText.position(window.innerWidth-145,450);
  var classText = createDiv("<font color='white'>Class: "+classification+"</font>");
  classText.position(window.innerWidth-145,470);
  var massText = createDiv("<font color='white'>Mass: "+mass+"</font>");
  massText.position(window.innerWidth-145,490);
  var radiusText = createDiv("<font color='white'>Radius: "+radius+"</font>");
  radiusText.position(window.innerWidth-145,510);
  var smaxisText = createDiv("<font color='white'>S-maj Axis: "+smaxis+"</font>");
  smaxisText.position(window.innerWidth-145,530);
  var eccText = createDiv("<font color='white'>Eccentricity: "+ecc+"</font>");
  eccText.position(window.innerWidth-145,550);
  var periodText = createDiv("<font color='white'>Period: "+period+"</font>");
  periodText.position(window.innerWidth-145,570);
  var dayText = createDiv("<font color='white'>Day Length: "+day+"</font>");
  dayText.position(window.innerWidth-145,590);
  var moonText = createDiv("<font color='white'>Moon(s): "+moon+"</font>");
  moonText.position(window.innerWidth-145,610);
  
  function updateTexts() {//updates text with data from new object
  labelText.hide();
  classText.hide();
  massText.hide();
  radiusText.hide();
  smaxisText.hide();
  eccText.hide();
  periodText.hide();
  dayText.hide();
  moonText.hide();
  
  labelText = createDiv("<font color='white'>Name: "+label+"</font>");
  labelText.position(window.innerWidth-145,450);
  classText = createDiv("<font color='white'>Class: "+classification+"</font>");
  classText.position(window.innerWidth-145,470);
  massText = createDiv("<font color='white'>Mass: "+mass+"</font>");
  massText.position(window.innerWidth-145,490);
  radiusText = createDiv("<font color='white'>Radius: "+radius+"</font>");
  radiusText.position(window.innerWidth-145,510);
  smaxisText = createDiv("<font color='white'>S-maj Axis: "+smaxis+"</font>");
  smaxisText.position(window.innerWidth-145,530);
  eccText = createDiv("<font color='white'>Eccentricity: "+ecc+"</font>");
  eccText.position(window.innerWidth-145,550);
  periodText = createDiv("<font color='white'>Period: "+period+"</font>");
  periodText.position(window.innerWidth-145,570);
  dayText = createDiv("<font color='white'>Day Length: "+day+"</font>");
  dayText.position(window.innerWidth-145,590);
  moonText = createDiv("<font color='white'>Moon(s): "+moon+"</font>");
  moonText.position(window.innerWidth-145,610);
  
  labelText.show();
  classText.show();
  massText.show();
  radiusText.show();
  smaxisText.show();
  eccText.show();
  periodText.show();
  dayText.show();
  moonText.show();
  
  }
  
///////////////////////////////////////////
  
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 20000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(30);
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var sunLight = new THREE.PointLight( 0xffffff, 0.75 );//light centered on sun that illuminates planets and moons
  scene.add( sunLight );
  
  //planet class creates planet sphere and orbit and adds them to scene
  var planet = function(size,color,a,e,p,stheta) {//needs: size,color,a, eccentricity, period, startAngle
    
    size = size*4;//make sphere 4x bigger
    this.size = size;
    
    
    var pgeometry = new THREE.SphereGeometry(size,50,50);
    var pmaterial = new THREE.MeshPhongMaterial( {color : color} );
    var planetSphere = new THREE.Mesh(pgeometry, pmaterial);
    scene.add(planetSphere);//adds sphere to scene
    this.planetSphere = planetSphere;
    a = a*200;
    var c = a*e;
    var b = sqrt(a*a-c*c);
    
    
    
    this.a = a;
    this.b = b;
    this.c = c;
    var curve = new THREE.EllipseCurve(0-c,0,a,b,0,2*Math.PI,false);
    var path = new THREE.Path(curve.getPoints(10000));
    var ogeometry = path.createPointsGeometry( 10000 );
    var omaterial = new THREE.LineBasicMaterial( { color : 0xffffff } );
    
    var orbit = new THREE.Line( ogeometry, omaterial );
    scene.add(orbit);//adds orbital ellipse to scene
    this.orbit = orbit;
    
    var center = new THREE.Vector3(0-c,0,0);
    
    var planetA = new THREE.Vector3();
    var planetB = new THREE.Vector3();
    var planetLocation = new THREE.Vector3();
    var majAxis = new THREE.Vector3(1,0,0);
    var minAxis = new THREE.Vector3(0,1,0);
    
    var theta = stheta;
    this.theta = theta;
    this.p = p;
    //this.i = i;
    
    planetA.copy(majAxis.multiplyScalar(a*cos(theta)));
    planetB.copy(minAxis.multiplyScalar(b*sin(theta)));
    planetLocation.copy(center.add(planetA.add(planetB)));
    
    planetSphere.position.copy(planetLocation);//places planet on orbit
    this.planetSphere = planetSphere;
    
  }
  
  //moon class creates moon sphere and orbit centered on a planet and adds it to scene
  var moon = function(size,color,a,e,p,stheta,ctr) {//needs: size,color,a, eccentricity, period, startAngle, planet
    size = size*4;//make regular and 4x sphere
    this.size = size;
    
    var pgeometry = new THREE.SphereGeometry(size,50,50);
    var pmaterial = new THREE.MeshPhongMaterial( {color : color} );
    var moonSphere = new THREE.Mesh(pgeometry, pmaterial);
    scene.add(moonSphere);//adds sphere to scene
    this.moonSphere = moonSphere;
    a = a*3000;
    var c = a*e;
    var b = sqrt(a*a-c*c);
    
    this.a = a;
    this.b = b;
    this.c = c;
    var curve = new THREE.EllipseCurve(c,0,a,b,0,2*Math.PI,false);
    var path = new THREE.Path(curve.getPoints(10000));
    var ogeometry = path.createPointsGeometry( 10000 );
    var omaterial = new THREE.LineBasicMaterial( { color : 0xffffff } );
    
    var orbit = new THREE.Line( ogeometry, omaterial );
    scene.add(orbit);//adds orbit to scene
    this.orbit = orbit;
    
    ////
    var center = new THREE.Vector3();
    center.copy(ctr.planetSphere.position);
    this.center = center;
    this.ctr = ctr;
    
    this.orbit.position.copy(center);
    center.x = center.x +c;
    ////
    var planetA = new THREE.Vector3();
    var planetB = new THREE.Vector3();
    var moonLocation = new THREE.Vector3();
    var majAxis = new THREE.Vector3(1,0,0);
    var minAxis = new THREE.Vector3(0,1,0);
    
    var theta = stheta;
    this.theta = theta;
    this.p = p;
    //this.i = i;
    
    planetA.copy(majAxis.multiplyScalar(a*cos(theta)));
    planetB.copy(minAxis.multiplyScalar(b*sin(theta)));
    moonLocation.copy(center.add(planetA.add(planetB)));
    
    moonSphere.position.copy(moonLocation);//places moon on orbit
    this.moonSphere = moonSphere;
    
  }
  
  planet.prototype.move = function() {
   
    var center = new THREE.Vector3(0-this.c,0,0);
    
    var mAxis = new THREE.Vector3(1,0,0);
    var miAxis = new THREE.Vector3(0,1,0);
    
    var planetA = new THREE.Vector3();
    var planetB = new THREE.Vector3();
    var planetLocation = new THREE.Vector3();
    
    planetA.copy(mAxis.multiplyScalar(this.a*cos(this.theta)));
    planetB.copy(miAxis.multiplyScalar(this.b*sin(this.theta)));
    planetLocation.copy(center.add(planetA.add(planetB)));
    this.planetSphere.position.copy(planetLocation);
    
    var i = (timeSlider.value()/1000)/this.p;//angle added each time based on slider
    this.theta = this.theta + i;
    
  }
  moon.prototype.move = function() {
    this.center.copy(this.ctr.planetSphere.position);
    this.orbit.position.copy(this.center);
    this.center.x = this.center.x +this.c; 
    
    var mAxis = new THREE.Vector3(1,0,0);
    var miAxis = new THREE.Vector3(0,1,0);
    
    var planetA = new THREE.Vector3();
    var planetB = new THREE.Vector3();
    var planetLocation = new THREE.Vector3();
    
    planetA.copy(mAxis.multiplyScalar(this.a*cos(this.theta)));
    planetB.copy(miAxis.multiplyScalar(this.b*sin(this.theta)));
    planetLocation.copy(this.center.add(planetA.add(planetB)));
    this.moonSphere.position.copy(planetLocation);
    
    var i = (timeSlider.value()/1000)/this.p;//angle added each time based on slider
    this.theta = this.theta + i;
    
  }
  //Initiate planets and moons
  var Mercury = new planet(.323, 0x6d6d6d, .3871,.206,.241,0);
  var Venus = new planet(.95,0xffffb4,.723,.007,.615,1);
  var Earth = new planet(1,0x000ff, 1, .017, 1, 2);
  var Mars = new planet(.533, 0xcc2900, 1.524,.094, 1.882, 3);
  var Jupiter = new planet(10.9, 0xff7e5e, 5.204, .049, 11.862, 4);
  var Saturn = new planet(8.9, 0xd1a319, 9.582, .056, 29.457, 5);
  var Uranus = new planet(3.97,0x99ccff, 19.189, .047,84.01, 6);
  var Neptune = new planet(3.85, 0x3333cc, 30.07, .009, 164.8, 2);
  
  var Moon = new moon(.273,0x6d6d6d, .003,.055,.075,0,Earth);
  var Io = new moon(.286,0x996600,.003*6,.004,.005,1,Jupiter);
  var Europa = new moon(.245,0xccffff,.0045*6,.009,.01,2.1,Jupiter);
  var Ganymede = new moon(.413,0x767676,.007*6,.001,.02,3.5,Jupiter);
  var Callisto = new moon(.378,0x293333,.012*6,.007,.046,5.3,Jupiter);
  var Titan = new moon(.404,0xe6b85c,.008*6,.029,.044,6,Saturn);
  
  
  var sgeometry = new THREE.SphereGeometry( 25, 50, 50 );
  var smaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} );
  smaterial.emissive.setRGB(255,150,0);
  var sun = new THREE.Mesh( sgeometry, smaterial );
  scene.add(sun);//adds sun to scene
  
  
  
  //initial camera
  zoom = 300;
  camera.position.z = zoom; 
  
  //Camera Reset
  var axis = new THREE.Vector3(1,0,0);
  camera.position.applyAxisAngle(axis, Math.PI/2);
  var center = new THREE.Vector3(0,0,0);
  camera.rotation.x = Math.PI/2;//look(center, camera.position);
	
	
	
  //button behaviors
  var centerPlanetLocation = new THREE.Vector3();
	
  systemButton.mousePressed(function() {
    zoom = 300;
    centerPlanetLocation = new THREE.Vector3(0,0,0);
    label = "Sun";
    classification = "Star";
    mass = "1.98*10^30 kg";
    radius = "696,342 km";
    smaxis = "NA";
    ecc = "NA";
    period = "NA";
    day = "NA";
    moon = "NA";
    updateTexts();
	});
mercuryButton.mousePressed(function() {
    zoom = 10;
    centerPlanetLocation =Mercury.planetSphere.position;
    label = "Mercury";
    classification = "Planet";
    mass = "3.3*10^23 kg";
    radius = "2440 km";
    smaxis = ".387 AU";
    ecc = ".206";
    period = ".241 yr";
    day = "1408 d";
    moon = "NA";
    updateTexts();
  
	});
venusButton.mousePressed(function() {
    zoom = 20;
    centerPlanetLocation = Venus.planetSphere.position;
    label = "Venus";
    classification = "Planet";
    mass = "4.9*10^24 kg";
    radius = "6052 km";
    smaxis = ".723 AU";
    ecc = ".007";
    period = ".615 yr";
    day = "243 d";
    moon = "NA";
    updateTexts();
	});
earthButton.mousePressed(function() {
    zoom = 20;
    centerPlanetLocation = Earth.planetSphere.position;
    label = "Earth";
    classification = "Planet";
    mass = "6.0*10^24 kg";
    radius = "6371 km";
    smaxis = "1 AU";
    ecc = ".017";
    period = "1 yr";
    day = "1 d";
    moon = "The Moon";
    updateTexts();
	});
marsButton.mousePressed(function() {
    zoom = 10;
    centerPlanetLocation = Mars.planetSphere.position;
    label = "Mars";
    classification = "Planet";
    mass = "6.4*10^23 kg";
    radius = "3390 km";
    smaxis = "1.52 AU";
    ecc = ".094";
    period = "1.88 yr";
    day = "1.03 d";
    moon = "NA";
    updateTexts();
	});
jupiterButton.mousePressed(function() {
    zoom = 120;
    centerPlanetLocation = Jupiter.planetSphere.position;
    label = "Jupiter";
    classification = "Planet";
    mass = "1.9*10^27 kg";
    radius = "69911 km";
    smaxis = "5.2 AU";
    ecc = ".049";
    period = "11.9 yr";
    day = "9.925 hr";
    moon = "Io, Europa, Ganymede, Callisto";
    updateTexts();
	});
saturnButton.mousePressed(function() {
    zoom = 120;
    centerPlanetLocation =Saturn.planetSphere.position;
    label = "Saturn";
    classification = "Planet";
    mass = "5.7*10^26 kg";
    radius = "58232 km";
    smaxis = "9.6 AU";
    ecc = ".056";
    period = "29.5 yr";
    day = "10.6 hr";
    moon = "Titan";
    updateTexts();
	});
uranusButton.mousePressed(function() {
    zoom = 50;
    centerPlanetLocation = Uranus.planetSphere.position;
    label = "Uranus";
    classification = "Planet";
    mass = "8.6*10^25 kg";
    radius = "25362 km";
    smaxis = "19 AU";
    ecc = ".047";
    period = "84 yr";
    day = "17.2 hr";
    moon = "NA";
    updateTexts();
	});
neptuneButton.mousePressed(function() {
    zoom = 50;
    centerPlanetLocation = Neptune.planetSphere.position;
    label = "Neptune";
    classification = "Planet";
    mass = "1*10^26 kg";
    radius = "24622 km";
    smaxis = "30 AU";
    ecc = ".009";
    period = "165 yr";
    day = "16.1 hr";
    moon = "NA";
    updateTexts();
	});
	
	/////////////////////////////
  orbits.mousePressed(function() {
    if(orbitsShown === true) {
      scene.remove(Mercury.orbit);
      scene.remove(Venus.orbit);
      scene.remove(Earth.orbit);
      scene.remove(Mars.orbit);
      scene.remove(Jupiter.orbit);
      scene.remove(Saturn.orbit);
      scene.remove(Uranus.orbit);
      scene.remove(Neptune.orbit);
      scene.remove(Moon.orbit);
      scene.remove(Io.orbit);
      scene.remove(Europa.orbit);
      scene.remove(Ganymede.orbit);
      scene.remove(Callisto.orbit);
      scene.remove(Titan.orbit);
      orbitsShown = false;
    }
    else {
      scene.add(Mercury.orbit);
      scene.add(Venus.orbit);
      scene.add(Earth.orbit);
      scene.add(Mars.orbit);
      scene.add(Jupiter.orbit);
      scene.add(Saturn.orbit);
      scene.add(Uranus.orbit);
      scene.add(Neptune.orbit);
      scene.add(Moon.orbit);
      scene.add(Io.orbit);
      scene.add(Europa.orbit);
      scene.add(Ganymede.orbit);
      scene.add(Callisto.orbit);
      scene.add(Titan.orbit);
      orbitsShown = true;
    }
    
  });

  //theta = 0;
  
  
  verticalRotation = 0;
  horrizontalRotation = 0;
  
  //camera
  ctheta = 0;
  vtheta = .1;
  
  
//rendering scene
function render() {
	requestAnimationFrame( render );
	if(move === true) {
	  Mercury.move();
	  Venus.move();
	  Earth.move();
	  Mars.move();
	  Jupiter.move();
	  Saturn.move();
	  Uranus.move();
	  Neptune.move();
	  Moon.move();
	  Io.move();
	  Europa.move();
	  Ganymede.move();
	  Callisto.move();
	  Titan.move();
	}
	
  center.copy(centerPlanetLocation);//updates center
  var cc = new THREE.Vector3(0,0,0);
  cc.copy(center);
  //horrizontal camera movement
  var cameraRadius = sqrt(sq(camera.position.x-cc.x)+sq(camera.position.y-cc.y));//change
  
  ctheta = ctheta + horrizontalRotation;
  cameraX = cc.x + cameraRadius*sin(ctheta);
  cameraY = cc.y + -1*cameraRadius*cos(ctheta);
  
  camera.position.setX(cameraX);
  camera.position.setY(cameraY);
  
  camera.rotation.order = 'ZXY';
  camera.rotation.z+= horrizontalRotation;
  
  
  
  cc.copy(center);
  //vertical camera movement
  vtheta = vtheta+verticalRotation;
  var xyVector = new THREE.Vector2(cameraX-cc.x,cameraY-cc.y);
  xyVector.setLength(zoom*cos(vtheta));
  
  camera.position.setX(cc.x+xyVector.x);
  camera.position.setY(cc.y+xyVector.y);
  
  camera.position.setZ(zoom*sin(vtheta));
  camera.rotation.x -= verticalRotation;
  
	
  renderer.render( scene, camera );
  
     
  }//render loop
  
  render();
  
}//setup





function mouseDragged() {
  if(mouseY > pmouseY) {
    verticalRotation = .01;
  }
  else if(mouseY<pmouseY) {
    verticalRotation = -.01;
  }
  else {
    verticalRotation = 0;
  }
    
  if(mouseX > pmouseX) {
    horrizontalRotation = -.01;
  }
  else if(mouseX < pmouseX) {
    horrizontalRotation = .01;
  }
  
  
}
function mouseReleased() {
  verticalRotation = 0;
  horrizontalRotation = 0;
}

function mouseWheel() {
  zoom = zoom-event.wheelDelta/10;
  
}

function draw() {}
