'use strict'
tm.add ('sim.greenhouse.app.Scene', ['sim.greenhouse.app.Base'], function (o, p, d) {
    o.setup = function (config) {
        var geometry, height, helper, light, material, shape, sunColor, texture, width;

        height = $ (d.selector.scene).height ();
        width = $ (d.selector.scene).width ();

        d.scene = new THREE.Scene();
		d.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 2000 );

		d.renderer = new THREE.WebGLRenderer();
		d.renderer.setSize( width, height );

        $ (d.selector.scene).append (d.renderer.domElement)

        // Setup exttra data
        d.colorRange = {
            red: {
                hex: '#FB402B',
                value: { start: 3000, end: 3999 },
                hue: { start: 0, end: 6 },
                sat: { start: 96, end: 96 },
                lum: { start: 58, end: 58 },
                scale: { start: 0.4, end: 1 },
            },
            orange: {
                hex: '#FFBE68',
                value: { start: 4000, end: 5999 },
                hue: { start: 6, end: 34 },
                sat: { start: 96, end: 100 },
                lum: { start: 58, end: 70 },
                scale: { start: 1, end: 1.3 },
            },
            yellow: {
                hex: '#FFDEB1',
                value: { start: 6000, end: 9999 },
                hue: { start: 34, end: 35 },
                sat: { start: 100, end: 100 },
                lum: { start: 70, end: 85 },
                scale: { start: 1.3, end: 1.4 },
            },
            white:  {
                hex: '#FBF8FF',
                value: { start: 10000, end: 19999 },
                hue: { start: 35, end: 266 },
                sat: { start: 100, end: 100 },
                lum: { start: 85, end: 99 },
                scale: { start: 1.4, end: 1.6 },
            },
            blue: {
                hex: '#9CB2FF',
                value: { start: 20000, end: 25000 },
                hue: { start: 266, end: 227 },
                sat: { start: 100, end: 100 },
                lum: { start: 99, end: 81 },
                scale: { start: 1.6, end: 2 },
            }
        }

        // ----- SCENE SETUP

        // Create Space
        var space = {
            height: 2500, width: 2500,
            x: 1250, z: -1000,
            opacity: 1
        }
        d.space = {
            closest: {
                z: space.z,
                y: 1
            }
        };
        // left side of space
        texture = new THREE.TextureLoader ().load ('/src/sandbox/mpotter/sim/greenhouse/image/space-left.png')
        geometry = new THREE.PlaneGeometry (space.width, space.height, 1, 1);
        material = new THREE.MeshBasicMaterial ( {
            map: texture,
            side: THREE.DoubleSide,
        } )
        material.transparent = true
        material.opacity = space.opacity
        shape = new THREE.Mesh ( geometry, material );
        shape.position.z = space.z;
        shape.position.x = -space.x;
        d.scene.add( shape );
        d.space.left = { position: shape.position }
        // right side of space
        texture = new THREE.TextureLoader ().load ('/src/sandbox/mpotter/sim/greenhouse/image/space-right.png')
        geometry = new THREE.PlaneGeometry (space.width, space.height, 1, 1);
        material = new THREE.MeshBasicMaterial ( {
            map: texture,
            side: THREE.DoubleSide,
        } )
        material.transparent = true
        material.opacity = space.opacity
        shape = new THREE.Mesh ( geometry, material );
        shape.position.z = space.z;
        shape.position.x = space.x;
        d.scene.add( shape );
        d.space.right = { position: shape.position }

        // Create the sun
        texture = new THREE.TextureLoader ().load ('/src/sandbox/mpotter/sim/greenhouse/image/sun.png')
        sunColor = 0xffe973;
        geometry = new THREE.PlaneGeometry (5, 5, 1, 1);
        material = new THREE.MeshBasicMaterial ( {
            color: 0xffbb88,
            map: texture,
            side: THREE.DoubleSide,
        } )
        material.transparent = true
        shape = new THREE.Mesh ( geometry, material );
		d.scene.add( shape );

        // Move the sun into place
        shape.position.z = -1;
        shape.position.y = 2.8;

        d.closestPos = {
            z: shape.position.z,
            y: shape.position.y
        }
        d.sun = {
            mesh: shape,
            material: material
        };

        // Create the earth
        texture = new THREE.TextureLoader ().load ('/src/sandbox/mpotter/sim/greenhouse/image/earth.jpeg')
		geometry = new THREE.SphereGeometry( 3, 32, 32 );
		material = new THREE.MeshLambertMaterial( {
            // color: 0x1164a8,
            // reflectivity: 1,
            map: texture,
        } );
		shape = new THREE.Mesh( geometry, material );
		d.scene.add( shape );

        // Move the earth into place
        shape.position.y = -3;

        // Store the earth as our primary shape
        d.planet = shape;

        // ---- LIGHTING
        d.light = {}

        // Create an ambient light in the scene
        light = new THREE.AmbientLight ( 0x404040, 1 )
        d.scene.add ( light )
        d.light.ambient = light;

        // Create a light for the sun
        light = new THREE.SpotLight ( sunColor, 10 )
        d.scene.add ( light )
        d.scene.add ( light.target )

        light.position.z = -5000
        light.position.y = 5500

        d.light.spot = light;

        d.light.closestPos = {
            z: light.position.z,
            y: light.position.y
        }

        // ---- SCENE COMPOSITION
        d.camera.position.z = 5;

        // ---- RENDER CYCLE
		o.animateScene ();

        d.animateList = [];

        d.animateShapes = o.addToAnimateList ({
            method: o.animateShapes,
            data: {}
        })
    }

    o.addToAnimateList = function (data) {
        var index;

        d.animateList.push (data);

        index = d.animateList.length - 1

        return {
            index: index,
            remove: function () { o.removeFromAnimateList (index) }
        }
    }

    o.removeFromAnimateList = function (index) {
        d.animateList [index] = null
    }

    o.animateScene = function () {
        var item, key, list;

        requestAnimationFrame (o.animateScene);

        list = d.animateList;
        for (key in list) {
            item = list [key];

            if (item && item.method) {
                item.method (item.data)
            }
        }

        d.renderer.render (d.scene, d.camera)
    }

    o.animateShapes = function () {
        // d.shape.rotation.x += 0.01;
        d.planet.rotation.y += 0.0015;
    }

    o.override ({
        planetChange: function (original, data) {
            var maxIntensity;
            original (data);

            maxIntensity = 0.5

            switch (data.type) {
                case 'distance':
                    var closestDistance, distance, max, movementIntensity, min;

                    min = d.planetControl.getDistanceMinMax ().min;
                    max = d.planetControl.getDistanceMinMax ().max;

                    // Determines how big each step is for moving objects
                    movementIntensity = 30;
                    // Determines the closest the sun and space can be
                    closestDistance = 10;

                    distance = movementIntensity * ( (data.value - min) / (max - min) ) + closestDistance;

                    d.sun.mesh.position.z = d.closestPos.z - distance / 4;
                    d.sun.mesh.position.y = d.closestPos.y + distance / 8;
                    d.light.spot.position.z = d.light.closestPos.z - distance * 500;
                    d.light.spot.position.y = d.light.closestPos.y + distance * 200;
                    d.space.left.position.z = d.space.closest.z - distance * 2;
                    d.space.right.position.z = d.space.closest.z - distance * 2;
                    break;
                case 'albedo':
                    var power;

                    power = 100 * data.value

                    d.light.spot.power = power / 3
                    d.light.spot.intensity = power / 3
                    d.light.ambient.intensity = power / 10

                    if (d.light.ambient.intensity > maxIntensity) {
                        d.light.ambient.intensity = maxIntensity
                    }
            }
        },

        starChange: function (original, data) {
            // console.log ('Scene app starChange');

            original (data);
            o.changeStarColor (data);
        }
    })

    o.changeStarColor = function (data) {
        var color, colorRange, hsl, item, key, list, percent, scale, value;

        // console.log ('App scene on star change event...');

        colorRange = d.colorRange;

        // Convert percentage received into temperature
        value = d.starControl.getEffectiveTemperature ();

        if (value < colorRange.red.value.start) { value = colorRange.red.value.start }
        else if (value > colorRange.blue.value.end) { value = colorRange.blue.value.end }

        list = colorRange;
        for (key in list) {
            item = list [key];

            if (value >= item.value.start && value <= item.value.end) {
                // Cacluclate the percent that the current value
                // falls within the current color

                percent = (value - item.value.start) / (item.value.end - item.value.start)
                // console.log (percent, '% value:', value, '. end:', item.value.end)

                hsl = [];
                hsl.push ( ((item.hue.end - item.hue.start) * percent + item.hue.start).toFixed (2) )
                hsl.push ( ((item.sat.end - item.sat.start) * percent + item.sat.start).toFixed (2) )
                hsl.push ( ((item.lum.end - item.lum.start) * percent + item.lum.start).toFixed (2) )

                scale = (item.scale.end - item.scale.start) * percent + item.scale.start;
                break;
            }
        }

        // The user manual input an invalid value
        if (!hsl) { return }

        color = o.hslToHex (hsl [0], hsl [1], hsl [2])

        // console.log (color)

        d.sun.color = color;
        d.sun.material.setValues ({
            color: color
        })

        d.sun.mesh.scale.set (scale, scale, scale)

        d.light.spot.color = new THREE.Color (color)
    }

    // Borrowed code from stack overflow.
    o.hslToHex = function (h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
})
