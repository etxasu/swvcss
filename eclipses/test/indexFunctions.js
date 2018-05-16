var pioneer = null;

var mainViewport = null;
var insetViewport = null;

var mainScene = null;
var scaledScene = null;

var mainCamera = null;
var povCamera = null;
var scaledCamera = null;

var sun = null;
var earth = null;
var moon = null;
var eclipticPlane = null;

var scaledSun = null;
var scaledEarth = null;
var scaledMoon = null;

var orbitLinesEnabled = true;
var eclipticPlaneEnabled = false;
var starFieldEnabled = true;
var shadowBandEnabled = true;
var insetViewEnabled = true;

var eclipses = [];

// For use with toLocaleDateString.
let dateFormat = {
	month: 'short',
	year: 'numeric',
	day: 'numeric'
};

let timeFormat = {
	month: 'short',
	year: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
};

let currentEclipseIndex = 0;
let currentView = 'none';
let currentLocation = new Pioneer.LatLonAlt(Pioneer.MathUtils.degToRad(33.418670), Pioneer.MathUtils.degToRad(-111.933711), 0);

function createMainScene() {
	mainScene = pioneer.addScene('main');
	mainScene.setAmbientLightColor(new Pioneer.Color(0.5, 0.5, 0.5));

	PioneerScripts.SolarSystem.createObservableUniverse(mainScene, true);
	PioneerScripts.SolarSystem.createMilkyWay(mainScene, true);
	PioneerScripts.SolarSystem.createSun(mainScene);
	PioneerScripts.SolarSystem.createEarth(mainScene, false);
	PioneerScripts.Moons.createMoon(mainScene);

	sun = mainScene.get('sun');
	earth = mainScene.get('earth');
	moon = mainScene.get('moon');

	sun.get('spheroid').setLODSizes([512]);
	earth.get('spheroid').setLODSizes([1024]);
	earth.get('spheroid').setFeature('decalMap', true);
	moon.get('spheroid').setLODSizes([512]);

	// Add a spot on Earth.
	let mark = PioneerScripts.Placemarks.addPlacemark(mainScene, 'View Location', earth, Pioneer.MathUtils.radToDeg(currentLocation.lat), Pioneer.MathUtils.radToDeg(currentLocation.lon), 0, true);

	// Add the ecliptic plane.
	eclipticPlane = mainScene.addEntity('eclipticPlane');
	eclipticPlane.setParent(earth);
	eclipticPlane.setPosition(Pioneer.Vector3.Zero);
	let sprite = eclipticPlane.addComponent('sprite');
	sprite.setTextureUrl('eclipticPlane.png');
	sprite.setColorMultiplier(new Pioneer.Color(0.0, 0.5, 1.0, 0.25));
	sprite.setSize(new Pioneer.Vector2(3.8e5 * 10.0, 3.8e5 * 10.0));
	sprite.setTransparent(true);
	sprite.setEnabled(false);

	let align = eclipticPlane.addController('align');
	align.setPrimaryAlignType('align');
	align.setPrimaryAxis(Pioneer.Vector3.ZAxis);
	align.setPrimaryTargetEntity(sun);
	align.setPrimaryTargetAxis(Pioneer.Vector3.ZAxis);

	return (mainScene && sun && earth && moon && mark && eclipticPlane && sprite && align) ? true : false;
}

function createScaledScene() {
	scaledScene = pioneer.addScene('scaled');

	// Sun
	scaledSun = scaledScene.addEntity('scaledSun');
	scaledSun.setRadius(2);

	let fixedController = scaledSun.addController('fixed');
	fixedController.setPosition(Pioneer.Vector3.Zero);
	fixedController.setOrientation(Pioneer.Quaternion.Identity);

	let labelComponent = scaledSun.addComponent('label');
	labelComponent.setText('Sun');
	labelComponent.setIgnoreDistance(true);

	let lightSourceComponent = scaledSun.addComponent('lightSource');
	lightSourceComponent.setAbsoluteMagnitude(4.83);

	let spheroidComponent = scaledSun.addComponent('spheroid');
	spheroidComponent.setRadii(2.0, 2.0);
	spheroidComponent.setFeature('colorMapEmmissive', true);
	spheroidComponent.setColorTextureUrl('$ASSETS_STATIC_URL/textures/sun_color_$SIZE.png'); // Cylindrical Orientation Unnecessary 1/22/2018
	spheroidComponent.setLODSizes([512]);

	// Earth
	scaledEarth = scaledScene.addEntity('scaledEarth');
	scaledEarth.setRadius(1);

	let animdataControllerPos = scaledEarth.addController('animdata');
	animdataControllerPos.setBaseUrlAndStateType('$ASSETS_DYNAMIC_URL/spice/earth', 'pos');
	animdataControllerPos.setParent(scaledSun);

	let scaleController = scaledEarth.addController('scale');
	scaleController.setScale(10.0 / 149000000.0);

	let animdataControllerOri = scaledEarth.addController('animdata');
	animdataControllerOri.setBaseUrlAndStateType('$ASSETS_DYNAMIC_URL/spice/earth', 'ori');

	labelComponent = scaledEarth.addComponent('label');
	labelComponent.setText('Earth');
	labelComponent.setIgnoreDistance(true);

	let trailComponent = scaledEarth.addComponent('trail');
	trailComponent.setColor(new Pioneer.Color(1.00, 1.00, 1.00, 1.00));
	trailComponent.setStartTime(31558149);
	trailComponent.setIgnoreDistance(true);

	spheroidComponent = scaledEarth.addComponent('spheroid');
	spheroidComponent.setRadii(1.0, 1.0);
	spheroidComponent.setLightSource(scaledSun.getName());
	spheroidComponent.setFeature('nightMap', true);
	spheroidComponent.setFeature('nightMapEmmissive', true);
	spheroidComponent.setFeature('decalMap', true);
	spheroidComponent.setColorTextureUrl('$ASSETS_STATIC_URL/textures/earth_color_$SIZE.png'); // Cylindrical Orientation OK 1/22/2018
	spheroidComponent.setNightTextureUrl('$ASSETS_STATIC_URL/textures/earth_night_$SIZE.png');
	spheroidComponent.setDecalTextureUrl('$ASSETS_STATIC_URL/textures/earth_cloud_$SIZE.png');

	// Moon
	scaledMoon = scaledScene.addEntity('scaledMoon');
	scaledMoon.setRadius(0.75); // rough average of eq and polar.

	animdataControllerPos = scaledMoon.addController('animdata');
	animdataControllerPos.setBaseUrlAndStateType('$ASSETS_DYNAMIC_URL/spice/moon', 'pos');
	animdataControllerPos.setParent(scaledEarth);

	scaleController = scaledMoon.addController('scale');
	scaleController.setScale(5.0 / 384400.0);

	animdataControllerOri = scaledMoon.addController('animdata');
	animdataControllerOri.setBaseUrlAndStateType('$ASSETS_DYNAMIC_URL/spice/moon', 'ori');

	labelComponent = scaledMoon.addComponent('label');
	labelComponent.setText('Moon');
	labelComponent.setIgnoreDistance(true);

	trailComponent = scaledMoon.addComponent('trail');
	trailComponent.setColor(new Pioneer.Color(1.00, 1.00, 1.00, 1.00));
	trailComponent.setStartTime(2360707); // number of seconds for an orbit of this object
	trailComponent.setIgnoreDistance(true);

	spheroidComponent = scaledMoon.addComponent('spheroid');
	spheroidComponent.setRadii(0.75, 0.75); // Eq,Polar
	spheroidComponent.setLightSource(scaledSun.getName());
	spheroidComponent.setColorTextureUrl('$ASSETS_STATIC_URL/textures/moon_color_$SIZE.png');

	return (scaledScene && scaledSun && fixedController && labelComponent && lightSourceComponent && spheroidComponent &&
			scaledEarth && animdataControllerPos && scaleController && animdataControllerOri && trailComponent && scaledMoon) ? true : false;
}

function createViewportsAndCameras() {
	mainViewport = pioneer.addViewport();

	insetViewport = pioneer.addViewport();
	let heightFraction = 0.25 * pioneer.getRenderSize().x / pioneer.getRenderSize().y;
	insetViewport.setBounds(new Pioneer.Rect(0.75, 1.0 - heightFraction, 0.25, heightFraction));

	mainCamera = mainScene.addEntity('mainCamera');
	mainCamera.addComponent('camera');
	mainCamera.setPosition(Pioneer.Vector3.YAxisNeg);
	mainCamera.setOrientation(Pioneer.Quaternion.Identity);

	mainCamera.setParent(earth);

	povCamera = mainScene.addEntity('povCamera');
	let povCameraComponent = povCamera.addComponent('camera');
	povCameraComponent.setFieldOfView(Pioneer.MathUtils.degToRad(2));
	povCameraComponent.setNearDistance(0.1);

	povCamera.setPosition(Pioneer.Vector3.YAxisNeg);
	povCamera.setOrientation(Pioneer.Quaternion.Identity);
	povCamera.setParent('mark');

	scaledCamera = scaledScene.addEntity('scaledCamera');
	scaledCamera.addComponent('camera');
	scaledCamera.setPosition(Pioneer.Vector3.YAxisNeg);
	scaledCamera.setOrientation(Pioneer.Quaternion.Identity);
	scaledCamera.setParent(sun);

	mainViewport.setCamera(mainCamera.get('camera'));
	insetViewport.setCamera(povCamera.get('camera'));

	return (mainViewport && insetViewport && mainCamera && povCamera && povCameraComponent && scaledCamera) ? true : false;
}

async function initialize() {
	pioneer = new Pioneer.Engine(document.getElementById('view'));
	pioneer.getDownloader().setReplacement('ASSETS_STATIC_URL', '../pioneer-assets');
	pioneer.getDownloader().setReplacement('ASSETS_DYNAMIC_URL', 'https://eyes.nasa.gov/server');

	// Start with the time set to now and at 1 second per second.
	pioneer.setTime(Pioneer.TimeUtils.now()); // Start at NOW
	pioneer.setTimeRate(1.0);

	// Create the scenes.
	if(!createMainScene()) return false;
	if(!createScaledScene()) return false;

	// Wait for the earth and earthScaled to load. TODO: Get better await function specifically for stars, earth position/rotation, and earth texture.
	await Promise.all([mainScene.getLoadedPromise(), scaledScene.getLoadedPromise()]);
	await pioneer.waitUntilNextFrame();

	if(!createViewportsAndCameras()) return false;

	// Setup preferences.
	if (!document.getElementById('toggleOrbitLines').checked) {
		toggleOrbitLines();
	}
	if (document.getElementById('toggleEclipticPlane').checked) {
		toggleEclipticPlane();
	}
	if (!document.getElementById('toggleStarField').checked) {
		toggleStarField();
	}
	if (!document.getElementById('toggleShadowBand').checked) {
		toggleShadowBand();
	}
	if (!document.getElementById('toggleInsetView').checked) {
		toggleInsetView();
	}

	// Add end of frame function.
	pioneer.addEndOfFrameCallback(() => {
		// Update the subtitle.
		let currentTime = new Date(Pioneer.TimeUtils.etToUnix(pioneer.getTime()) * 1000.0);
		document.getElementById('subtitle').innerHTML = currentTime.toLocaleDateString('en-us', timeFormat)

		// Update the inset caption.
		if (currentView === 'earth') {
			if (eclipses[currentEclipseIndex].type1 === 'Solar') {
				if (mainScene.get('mark').getPosition().dot(mainScene.get('earth').getPosition()) > 0) {
					document.getElementById('insetCaption').innerHTML = 'Eclipse not visible from this location.';
				}
				else {
					document.getElementById('insetCaption').innerHTML = '';
				}
			}
			else if (eclipses[currentEclipseIndex].type1 === 'Lunar') {
				if (mainScene.get('mark').getPosition().dot(mainScene.get('moon').getPosition()) < 0) {
					document.getElementById('insetCaption').innerHTML = 'Eclipse not visible from this location.';
				}
				else {
					document.getElementById('insetCaption').innerHTML = '';
				}
			}
		}
		else if (currentView === 'system') {
			document.getElementById('insetCaption').innerHTML = 'Scale model of the Solar System';
		}
		document.getElementById('insetCaption').style.display = insetViewEnabled ? 'block' : 'none';
	});

	return (pioneer) ? true : false;
}

async function loadEclipses() {
	eclipses = await fetch('eclipses.json').then(response => response.json());
	let eclipseChooserMenu = document.getElementById('eclipsesMenu');
	for (let i in eclipses) {
		eclipses[i].start = new Date(eclipses[i].start);
		eclipses[i].max = new Date(eclipses[i].max);
		eclipses[i].end = new Date(eclipses[i].end);
	}
	eclipseChooserMenu.innerHTML = '<h1>Eclipse List</h1>';

	var sunIcon = "<font color='#ffcc00'>☀</font>&nbsp;&nbsp;&nbsp;"; // test, check, convert to style?
	var moonIcon = "<font color='#818181'>☾</font>&nbsp;&nbsp;&nbsp;";

	for (let i in eclipses) {
		eclipseChooserMenu.innerHTML += '<button class="button" onclick="goToEclipse(' + i + ');">' + (eclipses[i].type1 == "Solar" ? sunIcon : moonIcon) + eclipses[i].max.toLocaleDateString('en-us', dateFormat) + '</button>';
	}

	return Object.keys(eclipses).length !== 0;
}

function goToEarthView() {
	// Set the viewport to the camera.
	let cameraComponent = mainCamera.get('camera');
	mainViewport.setCamera(cameraComponent);

	// Get the camera on the sunny side of the earth.
	let duration = (currentView !== 'system') ? 0 : 1;
	if (eclipses[currentEclipseIndex].type1 === 'Solar') {
		PioneerScripts.Cameras.goToEntitySunnySide(mainCamera, earth, sun, earth.getRadius() * 5.0, true, true, duration);
	}
	else if (eclipses[currentEclipseIndex].type1 === 'Lunar'){
		PioneerScripts.Cameras.goToEntitySunnySide(mainCamera, earth, moon, earth.getRadius() * 5.0, true, true, duration);
	}
	mainCamera.get('zoom').setDistanceClamp(new Pioneer.Interval(7658, 760676723));

	let pick = mainCamera.addController('pick');
	pick.setPickedEntity(earth);
	pick.setCallback(position => {
		position.rotateInverse(earth.getOrientation(), position);
		position.mult(position, (position.magnitude() + 1.0) / position.magnitude());
		mainScene.get('mark', 'fixed').setPosition(position);
	});

	if(!goToInsetEarthView()) return false;

	currentView = 'earth';
	document.getElementById("earthView").className = "button activebutton";
	document.getElementById("systemView").className = "button";

	return (cameraComponent && pick) ? true : false;
}

function goToInsetEarthView() {
	// Set the viewport to the camera.
	let cameraComponent = povCamera.get('camera');
	insetViewport.setCamera(cameraComponent);

	// Setup the controllers.
	povCamera.clearControllers();

	let fixed = povCamera.addController('fixed');
	fixed.setPosition(new Pioneer.Vector3(0, 0, 10));
	fixed.setParent('mark');

	povCamera.clearControllers();
	povCamera.setPosition(new Pioneer.Vector3(0, 0, 10));
	povCamera.setParent('mark');

	let align = povCamera.addController('align');
	align.setPrimaryAlignType('point');
	align.setPrimaryAxis(Pioneer.Vector3.YAxis);
	if (eclipses[currentEclipseIndex].type1 === 'Solar') {
		align.setPrimaryTargetEntity(sun);
	}
	else if (eclipses[currentEclipseIndex].type1 === 'Lunar') {
		align.setPrimaryTargetEntity(moon);
	}
	align.setSecondaryAlignType('align');
	align.setSecondaryAxis(Pioneer.Vector3.ZAxis);
	align.setSecondaryTargetEntity(earth);
	align.setSecondaryTargetAxis(Pioneer.Vector3.ZAxis);

	return (cameraComponent && fixed && align) ? true : false;
}

async function goToSystemView() {
	if (currentView === 'system') {
		return true;
	}

	// Set the viewport to the camera.
	let cameraComponent = mainCamera.get('camera');
	mainViewport.setCamera(cameraComponent);

	// Set position and orientation so that that moon orbit is visible.
	let position = new Pioneer.Vector3(0, 0, 1.2 * 405400.0 / Math.tan(Math.min(cameraComponent.getVerticalFieldOfView(), cameraComponent.getHorizontalFieldOfView()) / 2.0));
	mainCamera.setParent(earth);
	mainCamera.setOrientation(new Pioneer.Quaternion(-Math.sqrt(0.5), Math.sqrt(0.5), 0, 0));
	mainCamera.setPosition(position);

	// Setup the controllers.
	mainCamera.clearControllers();
	let orbitController = mainCamera.addController('orientedOrbit');
	let zoomController = mainCamera.addController('zoom');
	zoomController.setDistanceClamp(new Pioneer.Interval(7658, 760676723));

	if(!goToInsetSystemView()) return false;

	currentView = 'system';
	document.getElementById("earthView").className = "button";
	document.getElementById("systemView").className = "button activebutton";

	return (cameraComponent && position && orbitController && zoomController) ? true : false;
}

async function goToInsetSystemView() {
	// Set the viewport to the camera.
	let cameraComponent = scaledCamera.get('camera');
	insetViewport.setCamera(cameraComponent);

	// Set position and orientation so that that orbits are visible.
	let position = new Pioneer.Vector3(0, 0, 1.2 * 15.0 / Math.tan(Math.min(cameraComponent.getVerticalFieldOfView(), cameraComponent.getHorizontalFieldOfView()) / 2.0));
	scaledCamera.setParent(scaledSun);
	scaledCamera.setPosition(position);
	scaledCamera.setOrientation(new Pioneer.Quaternion(-Math.sqrt(0.5), Math.sqrt(0.5), 0, 0));

	// Setup the controllers.
	scaledCamera.clearControllers();
	let zoomController = scaledCamera.addController('zoom');
	zoomController.setDistanceClamp(new Pioneer.Interval(12, 100));

	return (cameraComponent && position && zoomController) ? true : false;
}

async function goToEclipse(i) {
	currentEclipseIndex = i;
	let eclipse = eclipses[i];

	// Change to the eclipse date and go to the earth view.
	pioneer.setTime(Pioneer.TimeUtils.unixToEt(eclipse.max.getTime() / 1000.0));
	pioneer.setTimeRate(1.0);
	if(!updateTimeRateDisplay()) return false;
	await Promise.all([mainScene.getLoadedPromise(), scaledScene.getLoadedPromise()]);
	await pioneer.waitUntilNextFrame();

	// Always go to the earth view.
	if(!goToEarthView()) return false;

	if(!shadowBandEnabled) {
		document.getElementById('toggleShadowBand').click();
	}

	// Add the eclipse texture.
	let eclipseTextureUrl = 'shadowmaps/' + eclipse.max.getUTCFullYear().toString().padLeft(4, '0') + '_' + (eclipse.max.getUTCMonth() + 1).toString().padLeft(2, '0') + '_' + eclipse.max.getUTCDate().toString().padLeft(2, '0') + '_4k_x_2k.png';
	earth.get('spheroid').setDecalTextureUrl(eclipseTextureUrl);

	// Set the title using the known information about selected eclipse
	document.getElementById("title").innerHTML = eclipse.type2 + " " + eclipse.type1 + " Eclipse";

	// Update all buttons in the eclipseMenu, highlighting the selected item.
	var btns = document.getElementById('eclipsesMenu').getElementsByClassName("button");
	for (var b = 0; b < btns.length; b++) {

		if ( b == i ) // If the selected eclipse index 'i' is the same index 'b' within the menu list.
			btns[b].className = "button activebutton";
		else
			btns[b].className = "button";
	}

	return (eclipse && eclipseTextureUrl && btns.length === Object.keys(eclipses).length) ? true : false;
}

// Options
function toggleOrbitLines() {
	orbitLinesEnabled = !orbitLinesEnabled;
	earth.get('trail').setEnabled(orbitLinesEnabled);
	moon.get('trail').setEnabled(orbitLinesEnabled);
	scaledEarth.get('trail').setEnabled(orbitLinesEnabled);
	scaledMoon.get('trail').setEnabled(orbitLinesEnabled);
	return orbitLinesEnabled;
}

function toggleEclipticPlane() {
	eclipticPlaneEnabled = !eclipticPlaneEnabled;
	eclipticPlane.get('sprite').setEnabled(eclipticPlaneEnabled);
	return eclipticPlaneEnabled;
}

function toggleStarField() {
	starFieldEnabled = !starFieldEnabled;
	mainScene.get('observable_universe', 'skybox').setEnabled(starFieldEnabled);
	return starFieldEnabled;
}

function toggleShadowBand() {
	shadowBandEnabled = !shadowBandEnabled;
	earth.get('spheroid').setFeature('decalMap', shadowBandEnabled);
	return shadowBandEnabled;
}

function toggleInsetView() {
	insetViewEnabled = !insetViewEnabled;
	insetViewport.setEnabled(insetViewEnabled);
	document.getElementById('insetCaption').style.display = insetViewEnabled ? 'block' : 'none';
	return insetViewEnabled;
}

// Time Controls
function toggleTimeRate() {
	pioneer.setTimeRate(pioneer.getTimeRate() === 0.0 ? 1.0 : 0.0);
	return updateTimeRateDisplay();
}

function increaseTimeRate() {
	var currentTimeRate = pioneer.getTimeRate();
	if (currentTimeRate < -1.0)
		currentTimeRate /= 2.0;
	else if (currentTimeRate < 0.0)
		currentTimeRate = 0.0;
	else if (currentTimeRate == 0.0)
		currentTimeRate = 1.0;
	else
		currentTimeRate *= 2.0;

	if (currentTimeRate == -7.5)
		currentTimeRate = -8.0;
	else if (currentTimeRate == -16.0)
		currentTimeRate = -15.0;
	else if (currentTimeRate == -7.5 * 60.0)
		currentTimeRate = -8.0 * 60.0;
	else if (currentTimeRate == -16.0 * 60.0)
		currentTimeRate = -15.0 * 60.0;
	else if (currentTimeRate == 7.5)
		currentTimeRate = 8.0;
	else if (currentTimeRate == 16.0)
		currentTimeRate = 15.0;
	else if (currentTimeRate == 7.5 * 60.0)
		currentTimeRate = 8.0 * 60.0;
	else if (currentTimeRate == 16.0 * 60.0)
		currentTimeRate = 15.0 * 60.0;

	currentTimeRate = Math.round(currentTimeRate);
	if (currentTimeRate > 60 * 60) // Max Speed 1 Hour/Sec
		currentTimeRate = 60 * 60;
	pioneer.setTimeRate(currentTimeRate);
	return updateTimeRateDisplay();
}

function decreaseTimeRate() {
	var currentTimeRate = pioneer.getTimeRate();
	if (currentTimeRate > 1.0)
		currentTimeRate /= 2.0;
	else if (currentTimeRate > 0.0)
		currentTimeRate = 0.0;
	else if (currentTimeRate == 0.0)
		currentTimeRate = -1.0;
	else
		currentTimeRate *= 2.0;

	if (currentTimeRate == -7.5)
		currentTimeRate = -8.0;
	else if (currentTimeRate == -16.0)
		currentTimeRate = -15.0;
	else if (currentTimeRate == -7.5 * 60.0)
		currentTimeRate = -8.0 * 60.0;
	else if (currentTimeRate == -16.0 * 60.0)
		currentTimeRate = -15.0 * 60.0;
	else if (currentTimeRate == 7.5)
		currentTimeRate = 8.0;
	else if (currentTimeRate == 16.0)
		currentTimeRate = 15.0;
	else if (currentTimeRate == 7.5 * 60.0)
		currentTimeRate = 8.0 * 60.0;
	else if (currentTimeRate == 16.0 * 60.0)
		currentTimeRate = 15.0 * 60.0;

	currentTimeRate = Math.round(currentTimeRate);
	if (currentTimeRate < -60 * 60) // Min Speed -1 Hour/Sec
		currentTimeRate = -60 * 60;
	pioneer.setTimeRate(currentTimeRate);
	return updateTimeRateDisplay();
}

function updateTimeRateDisplay() {
	var currentTimeRate = pioneer.getTimeRate();
	if (currentTimeRate == 0.0) {
		document.getElementById("timeRateDisplay").innerHTML = "Paused";
		document.getElementById("playPause").innerHTML = "►";
		return 'Paused';
	} else {
		var timeRateStr = "";
		if (-60 < currentTimeRate && currentTimeRate < 60)
			timeRateStr = currentTimeRate + " sec/sec";
		else if (-60 * 60 < currentTimeRate && currentTimeRate < 60 * 60)
			timeRateStr = Math.round(currentTimeRate / 60.0) + " min/sec";
		else //if (-60 * 60 * 24 < currentTimeRate && currentTimeRate < 60 * 60 * 24)
			timeRateStr = Math.round(currentTimeRate / 60.0 / 60.0) + " hr/sec";
		//else if (-60 * 60 * 24 * 7 < currentTimeRate && currentTimeRate < 60 * 60 * 24 * 7)
		//	timeRateStr = Math.round(currentTimeRate / 60.0 / 60.0 / 24.0) + " day/sec";
		//else // if ( -60*60 < currentTimeRate && currentTimeRate < 60*60 )
		//	timeRateStr = Math.round(currentTimeRate / 60.0 / 60.0 / 24.0 / 7.0) + " week/sec";

		document.getElementById("timeRateDisplay").innerHTML = timeRateStr;
		document.getElementById("playPause").innerHTML = "| |";
		return timeRateStr;
	}
}
