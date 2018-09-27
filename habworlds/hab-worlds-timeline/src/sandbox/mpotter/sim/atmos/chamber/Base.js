// Chamber base is only responsible for creating the visual components
tm.add ('app.sim.atmos.chamber.Base', function (o, p, d) {
    o.setup = function (config) {
        d.width = $ (config.selector.container + ' > svg').width ();
        d.height = $ (config.selector.container + ' > svg').height ();
        d.selector = config.selector;
        d.particleList = [];
        d.photonList = [];
        d.wavelength = 0.1;

        d.dimension = {
            particleView: {
                width: 951,
                height: 601
            },
            innerChamber: {
                x: 230,
                y: 200,
                width: 450,
                height: 300
            }
        }

        o.drawStage ();

        window.chamber = o;
    }

    o.drawStage = function () {
        var box, clip, defs, dom, height, namespace, shape, width;

        width = 200;
        height = 100;

        d.chamberBackView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        d.chamberBackView.getDom ().classList.add ('chamber-svg');
        $ (d.chamberBackView.getDom ()).attr ('name', 'Background')

        d.particleView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        dom = d.particleView.getDom ()
        dom.classList.add ('chamber-svg');
        namespace = "http://www.w3.org/2000/svg";
        // defs = document.createElementNS (namespace, 'defs');
        clip = document.createElementNS (namespace, 'clipPath');
        clip.setAttributeNS (null, 'id', 'chamber-clip');

        // defs.appendChild (clip);
        // dom.appendChild (defs);
        dom.appendChild (clip);

        shape = document.createElementNS (namespace, 'rect');
        shape.setAttributeNS (null, 'x', 255);
        shape.setAttributeNS (null, 'y', 115);
        shape.setAttributeNS (null, 'height', 335);
        shape.setAttributeNS (null, 'width', 505);

        clip.appendChild (shape);

        $(d.particleView.getDom ()).attr ('name', 'Photon Area')

        d.chamberFrontView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        d.chamberFrontView.getDom ().classList.add ('chamber-svg');
        $ (d.chamberFrontView.getDom ()).attr ('name', 'Foreground')

        // d.particleSpace = tm.new ('tm.svg.Box', {
        //     width: d.dimension.particleView.width,
        //     height: d.dimension.particleView.height,
        //     brush: {
        //         color: 'black'
        //     }
        // })

        d.chamberBack = tm.new ('tm.svg.Image', {
            href: '/src/sandbox/mpotter/sim/atmos/image/chamber-back.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberBack.getDom ().ondragstart = function () {return false};

        d.chamberLight = tm.new ('tm.svg.Image', {
            // Grey version
            href: '/src/sandbox/mpotter/sim/atmos/image/chamber-mid.png',
            // Yellow version
            // href: 'https://i.imgur.com/la8AT29.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberLight.getDom ().ondragstart = function () {return false};

        // d.sun

        d.chamberCover = tm.new ('tm.svg.Image', {
            href: '/src/sandbox/mpotter/sim/atmos/image/chamber-front.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberCover.getDom ().ondragstart = function () {return false};

        d.photonGroup = tm.new ('tm.svg.Group')
        d.photonGroup.getDom ().setAttributeNS (null, 'clip-path', 'url(#chamber-clip)')
        $ (d.photonGroup.getDom ()).width (800)

        box = tm.new ('tm.svg.Box', {
            x: 0,
            y: 0,
            height: 1000,
            width: 1000,
            brush: {
                color: 'transparent',
                line: {
                    width: 0,
                    color: 'transparent'
                }
            }
        })

        // Make sure the clip-area is as big as it is set to be
        d.photonGroup.getDom ().appendChild (box.getDom ())

        d.chamberBackView.add (d.chamberBack);
        d.chamberBackView.add (d.chamberLight);
        d.particleView.add (d.photonGroup)
        d.chamberFrontView.add (d.chamberCover);
        // d.particleView.add (d.particleSpace);
        // d.particleView.getDom ().classList.add ('hide');

        // d.svg.add (d.sun)
        // d.svg.add (d.lightChamber)

        d.canSeeParticleView = true
        o.showParticleView ();
    }

    o.getDimension = function () {
        return d.dimension
    }

    o.showParticleView = function () {
        d.particleView.getDom ().classList.remove ('hide');
        o.startParticles ();
    }

    o.hideParticleView = function () {
        d.particleView.getDom ().classList.add ('hide');
        o.stopParticles ();
    }
})
