// Manages the God rays around the sun
'use strict'
tm.add ('sim.greenhouse.control.Rays', ['sim.greenhouse.control.Base'], function (o, p, d) {
    o.setup = function (config) {
        if (config.scene) {
            var item, key, list, loader, rayData;

            d.rayList = [];
            d.scene = config.scene;
            d.rayTexture = new THREE.TextureLoader ().load ('/src/sandbox/mpotter/sim/greenhouse/image/ray.png')
            d.opacity = {
                min: 0.08,
                max: 0.4
            }

            rayData = {
                width: 6,
                height: 1000,
                list: [
                    // N
                    {
                        x: 0, y: 60, z: -100,
                        rotate: { x: 5.2, y: 0, z: 0 }
                    },
                    // NE
                    {
                        x: 5, y: 52, z: -100,
                        rotate: { x: 0, y: -1.55, z: -2 }
                    },
                    // E
                    {
                        x: 45, y: 59, z: -120,
                        rotate: { x: 0, y: -1.4, z: -2.03 }
                    },
                    // SE
                    {
                        x: 30, y: 40, z: -100,
                        rotate: { x: 0.07, y: -1.5, z: -1.98 }
                    },
                    // SES
                    {
                        x: 7, y: 45, z: -100,
                        rotate: { x: 2.02, y: 0, z: 0 }
                    },
                    // S
                    {
                        x: 0, y: 45, z: -100,
                        rotate: { x: 2.01, y: 0, z: 0 }
                    },
                    //SWS
                    {
                        x: -7, y: 45, z: -100,
                        rotate: { x: 2.02, y: 0, z: 0 }
                    },
                    // SW
                    {
                        x: -30, y: 40, z: -100,
                        rotate: { x: 0.07, y: 1.5, z: 1.98 }
                    },
                    // W
                    {
                        x: -45, y: 59, z: -120,
                        rotate: { x: 0, y: 1.4, z: 2.03 }
                    },
                    // NW
                    {
                        x: -5, y: 52, z: -100,
                        rotate: { x: 0, y: 1.55, z: 2 }
                    }
                ]
            }

            list = rayData.list;
            for (key in list) {
                item = list [key];

                item.width = rayData.width;
                item.height = rayData.height;
                o.setupRay (item);
            }
        }
        else { console.log ('Cannot set up God rays without initial scene reference') }
    }

    o.setupRay = function (data) {
        var geometry, material, ray;

        geometry = new THREE.PlaneGeometry (data.width, data.height, 1, 1);
        material = new THREE.MeshBasicMaterial ( {
            color: 0xffbb88,
            map: d.rayTexture,
            side: THREE.DoubleSide,
        } )
        ray = new THREE.Mesh ( geometry, material );

        material.transparent = true;
        material.opacity = Math.random () * (d.opacity.max - d.opacity.min) + d.opacity.min;

        ray.position.x = data.x;
        ray.position.y = data.y;
        ray.position.z = data.z;

        ray.rotateX (data.rotate.x)
        ray.rotateY (data.rotate.y)
        ray.rotateZ (data.rotate.z)

        d.scene.add (ray);

        d.rayList.push ({
            ray: ray,
            animating: false,
            mode: 'fadeOut',
            material: material
        })
    }

    o.animateRays = function () {
        var item, key, list;

        list = d.rayList;
        for (key in list) {
            item = list [key];

            if (!item.animating) {
                item.animating = true;

                o [item.mode] (item);

                if (item.mode == 'fadeOut') { item.mode = 'fadeIn' }
                else { item.mode = 'fadeOut' }
            }
        }
    }

    o.fade = function (data) {
        var duration, myData, opacity;

        duration = Math.random () * 3000 + 3000
        myData = data;
        opacity = data.opacity;

        anime ({
            targets: data.material,
            easing: 'linear',
            duration: duration,
            opacity: opacity,
            complete: function () { myData.animating = false }
        })
    }

    o.fadeOut = function (data) {
        data.opacity = d.opacity.min;
        o.fade (data)
    }

    o.fadeIn = function (data) {
        data.opacity = d.opacity.max;
        o.fade (data)
    }

    o.setColor = function (color) {
        var item, key, list;

        list = d.rayList;
        for (key in list) {
            item = list [key]

            item.material.setValues ({
                color: color
            })
        }
    }
})
