// Sets up certain elements in 3d
'use strict'
tm.add ('sim.greenhouse.molecule.view.Scene', ['sim.greenhouse.molecule.view.Photon'], function (o, p, d) {
    o.setup = function (config) {
        var geometry, material, shape, texture, x, y;
        // Store reference to scene
        d.scene = config.scene;
        d.opacity = {
            circle: 0.3,
            trapezoid: 0.7
        }

        // Set up highlighting circle
        geometry = new THREE.CircleGeometry ( 0.11, 8 );
        material = new THREE.MeshBasicMaterial ( { color: 0xcccccc } )
        shape = new THREE.Mesh (geometry, material);

        material.transparent = true;
        material.opacity = d.opacity.circle;

        shape.position.z = 2;

        d.scene.add ( shape );

        d.circle = {
            material: material,
            geometry: geometry,
            shape: shape
        }

        // Set up the trapezoid that connects the molecule view to the circle
        geometry = new THREE.PlaneGeometry ( 0.35, 4, 1, 1 );
        material = new THREE.MeshBasicMaterial ( { color: 0xcccccc, side: THREE.DoubleSide } );
        shape = new THREE.Mesh ( geometry, material );

        material.transparent = true;
        material.opacity = d.opacity.trapezoid;

        shape.position.z = 2;
        shape.position.y = -0.1;

        shape.rotateX(-1.55)

        d.scene.add ( shape )

        d.trapezoid = {
            material: material,
            geometry: geometry,
            shape: shape
        }
    }

    o.override ({
        hide: function (original) {
            original ();

            d.circle.material.opacity = 0;
            d.trapezoid.material.opacity = 0;
        },

        show: function (original) {
            original ();

            d.circle.material.opacity = d.opacity.circle;
            d.trapezoid.material.opacity = d.opacity.trapezoid;
        },
    })
})
