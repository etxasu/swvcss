'use strict'
/*
    Creates 3D objects and adds them to a scene
*/
tm.add ('sim.geo.chemical.scene.Base', function (o, p, d) {
    o.setup = function (config) {

        d.selector = config.selector;
        d.height = config.height;
        d.width = config.width;

        /*
            Create 3D components
        */
        d.scene = new THREE.Scene();
		d.camera = new THREE.PerspectiveCamera( 75, d.width/d.height, 0.1, 2000 );

		d.renderer = new THREE.WebGLRenderer();
		d.renderer.setSize( d.width, d.height );

        // $ (d.selector.scene).append (d.renderer.domElement)

        d.animateEventList = [];
        d.sceneRepo = {};

        d.camera.position.z = 5;

        // d.test = o.makeShape ({
        //     geometry: 'BoxGeometry',
        //     material: 'MeshBasicMaterial',
        //     color: 0xab11ff,
        //     height: 1, width: 1, depth: 1,
        //     segment: { x: 1, y: 1 }
        // })
        //
        // o.addToScene ({
        //     name: 'test',
        //     item: d.test
        // })

        var loader = new THREE.OBJLoader ();

        loader.load (
            // Target file to load
            './temp/Terrain-temp.obj',
            // On Done
            function ( obj ) {
                d.terrain = obj;
                d.scene.add (obj);

                d.terrain.position.x = 0;
                d.terrain.position.y = 0;
                d.terrain.position.z = -5;

                d.terrain.scale.x = 3;
                d.terrain.scale.y = 3;
                d.terrain.scale.z = 3;
            },
            // On Progress
            function ( xhr ) {
                console.log (xhr.loaded / xhr.total * 100 + ' % Loaded')
            },
            // On Error
            function ( error ) {
                console.log ('OBJ Loader encountered an Issue:')
                console.log (error)
            }
        )
    }

    o.addToScene = function (data) {
        if ( data.name && data.item ) {
            d.sceneRepo [ data.name ] = data.item;
            d.scene.add ( data.item.getSceneData ().shape )
        }
        else { console.log ( 'Make sure your item has a name and a shape. Data:', data ) }
    }

    o.animateScene = function () {
        requestAnimationFrame (o.animateScene);

        if (d.test) {
            d.test.spin ({
                x: 0.01,
                z: 0.01
            })
        }

        d.renderer.render (d.scene, d.camera)

        var item, key, list;
        list = d.animateEventList
        for (key in list) {
            item = list [key];

            if (item) { item (); }
        }
    }

    o.getAnimateEventList = function () { return d.animateEventList }

    o.loadModel = function () {

    }

    o.makeShape = function (data) {
        return tm.new ('component.scene.Entity', data)
    }
})
