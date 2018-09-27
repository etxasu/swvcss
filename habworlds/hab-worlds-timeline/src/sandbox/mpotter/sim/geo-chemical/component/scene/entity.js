'use strict';
tm.add ('component.scene.Entity', ['tm.Base'], function (o, p, d) {
    o.setup = function (config) {
        var geometry, geometryType, material, materialType, shape, side, texture;

        // // If no color is given, default to white
        // if (config.color === undefined) { config.color = 0xffffff }
        //
        // if (config.texture) {
        //     texture = new THREE.TextureLoader ().load (data.texture)
        // }
        //
        // d.depth = config.depth;
        // d.width = config.width;
        // d.height = config.height;
        // d.color = config.color;
        //
        // geometryType = config.geometry
        // materialType = config.material
        //
        // if (geometryType == 'PlaneGeometry') { side = THREE.DoubleSide }
        //
        // geometry = o.makeGeometry (config)
        // material = new THREE.MeshBasicMaterial ( {
        //     color: d.color,
        //     // map: texture,
        //     // side: side,
        // } )
        //
        // // material.transparent = config.transparent;
        // // material.opacity = config.opacity;
        //
        // shape = new THREE.Mesh ( geometry, material );

        geometry = new THREE [ config.geometry ] ( 1, 1, 1 );
        material = new THREE [ config.material ] ( { color: 0x7064ff } );
        shape = new THREE.Mesh ( geometry, material );

        d.shape = shape;
        d.material = material;
        d.texture = texture;
        d.geometry = geometry;
        d.position = shape.position;
        d.rotation = shape.rotation;
    }

    o.getSceneData = function () {
        return {
            shape: d.shape,
            material: d.material,
            texture: d.texture,
            geometry: d.geometry,
            position: d.position,
            rotation: d.rotation
        }
    }

    o.makeGeometry = function (data) {
        var geometry, segment, type;

        segment = data.segment;
        type = data.geometry;

        switch (type) {
            case 'PlaneGeometry':
                geometry = new THREE [type] (d.width, d.height, segment.x, segment.y);
                break;
            case 'SphereGeometry':
                geometry = new THREE [type] (d.width, segment.x, segment.y);
                break;
            case 'BoxGeometry':
                geometry = new THREE.BoxGeometry (d.width, d.height, d.depth);
                break;
            default:
                console.log ('Unable to make proper geometry. Data', data)
                geometry = new THREE.PlaneGeometry (3, 3, 1, 1);
                break;
        }

        return geometry
    }

    o.move = function (data) {
        if (data.x === undefined) { data.x = 0 }
        if (data.y === undefined) { data.y = 0 }
        if (data.z === undefined) { data.z = 0 }

        d.position.x += data.x
        d.position.y += data.y
        d.position.z += data.z
    }

    o.spin = function (data) {
        if (data.x === undefined) { data.x = 0 }
        if (data.y === undefined) { data.y = 0 }
        if (data.z === undefined) { data.z = 0 }

        d.rotation.x += data.x
        d.rotation.y += data.y
        d.rotation.z += data.z
    }
})
