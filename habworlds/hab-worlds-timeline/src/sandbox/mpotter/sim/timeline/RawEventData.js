// Card template
/*
tm.new ('app.sim.timeline.Item', {
    id: 'card',
    uid: 0,
    simModel: simModel,
    name: 'Lorem',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    content: '    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    selector: {
        timeline: '#visualization',
        event: '#cosmo-card-list',
        detail: '#card-detail',
    },
    image: {
        full: 'https://picsum.photos/300/300/?random',
        pin: 'https://picsum.photos/300/300/?random',
        thumbnail: 'https://picsum.photos/300/300/?random',
    },
})
*/

tm.add ('app.sim.timeline.Data', function (o, p, d) {

    o.setup = function (config) {
        /*
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        COSMOLOGICAL EVENTS
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        */
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmoA1',
            uid: 1,
            name: 'Big Bang',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Solar System formed when a giant molecular cloud collapsed in on itself. Most of the collapsiing mass collected in the centre, forming hte Sun, while the rest flattened into a protoplanetary disk out of which the planets, moons, asteroids, and other small Solar System bodies formed...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/400/400/?random',
                pin: 'https://picsum.photos/400/400/?random',
                thumbnail: 'https://picsum.photos/400/400/?random',
            },
            year: -13800000000,
            readableYear: '-13,800,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmoA2',
            uid: 2,
            name: 'Cosmic Microwave Background Forms',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Solar System formed when a giant molecular cloud collapsed in on itself. Most of the collapsiing mass collected in the centre, forming hte Sun, while the rest flattened into a protoplanetary disk out of which the planets, moons, asteroids, and other small Solar System bodies formed...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/401/400/?random',
                pin: 'https://picsum.photos/401/400/?random',
                thumbnail: 'https://picsum.photos/401/400/?random',
            },
            year: -13799620000,
            readableYear: '-13,799,620,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo1',
            uid: 3,
            name: 'Formation of the Earth/Solar System',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Solar System formed when a giant molecular cloud collapsed in on itself. Most of the collapsiing mass collected in the centre, forming hte Sun, while the rest flattened into a protoplanetary disk out of which the planets, moons, asteroids, and other small Solar System bodies formed...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/300/?random',
                pin: 'https://picsum.photos/300/300/?random',
                thumbnail: 'https://picsum.photos/300/300/?random',
            },
            year: -4550000000,
            readableYear: '-4,550,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo2',
            uid: 4,
            name: 'Moon Forming Impact',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Moon was probably formed when the young Earth collided with a Marse-sized body in hte early days of the Solar System. This "Giant Impact Hypothesis" explains many features on the Moon...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/300/?random',
                pin: 'https://picsum.photos/301/300/?random',
                thumbnail: 'https://picsum.photos/301/300/?random',
            },
            year: -4470000000,
            readableYear: '-4,470,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo3',
            uid: 5,
            name: 'Late Heavy Bombardment',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Late Heavy Bombardment was a discrete period of time during which the largest impact craters on hte Moon were formed. It is though that Earth, Mercury, Venus, and Mars were all bombarded at the same time...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/300/?random',
                pin: 'https://picsum.photos/302/300/?random',
                thumbnail: 'https://picsum.photos/302/300/?random',
            },
            year: {
                earliest: -4000000000,
                latest: -3800000000,
            },
            readableYear: {
                earliest: '-4,000,000,000',
                latest: '-3,800,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo4',
            uid: 6,
            name: 'Snowball Earth',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The "Snoball Earth" hypothesis holds that around the time of the rise of animals the Earth was frozen over entirely, or nearly so, at least once and possible several times. The cause is debated, as are the consequences for the evolution of life...',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/303/300/?random',
                pin: 'https://picsum.photos/303/300/?random',
                thumbnail: 'https://picsum.photos/303/300/?random',
            },
            year: {
                earliest: -715000000,
                latest: -680000000,
            },
            readableYear: {
                earliest: '-715,000,000',
                latest: '-680,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo5',
            uid: 7,
            name: 'Evaporation of the Oceans',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Eventuall, the Earth will be warm enough that large amounts of water evaporate and rise to the Earth\'s upper atmosphere. There, the H2O molecules are broken by ultraviolet light and the H atoms escape to space. The Earth will then become a water-free planet, much like modern-dat Venus.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/304/300/?random',
                pin: 'https://picsum.photos/304/300/?random',
                thumbnail: 'https://picsum.photos/304/300/?random',
            },
            year: {
                earliest: 1500000000,
                latest: 2000000000
            },
            readableYear: {
                earliest: '1,500,000,000',
                latest: '2,000,000,000'
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo6',
            uid: 8,
            name: 'Death of the Earth',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Sun\'s energy comes from the conversion of hydrogren to helium by nuclear fusion. In the distant future, the hydrogen will all be gone. At that point, the Sun will swell into a red giant, expanding to engulf the Earth\'s orbit. That will be a very bad day for anyhting still living on the planet.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: 5450000000,
            readableYear: '5,450,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo7',
            uid: 9,
            name: 'First Stars Form',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -13700000000,
            readableYear: '-13,700,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo8',
            uid: 10,
            name: 'Milky Way Galaxy Forms',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -13000000000,
            readableYear: '-13,000,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo9',
            uid: 11,
            name: 'Peak Star Formation',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -10300000000,
            readableYear: '-10,300,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo10',
            uid: 12,
            name: 'Andromeda Galaxy Forms',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -10000000000,
            readableYear: '-10,000,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo11',
            uid: 13,
            name: 'Spiral Arms Form in Milky Way',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -8750000000,
            readableYear: '-8,750,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo12',
            uid: 14,
            name: 'Alpha Centauri Binary Star System Forms',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -6000000000,
            readableYear: '-6,000,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo13',
            uid: 15,
            name: 'Solar Nebula Begins to Form',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -4600000000,
            readableYear: '-4,600,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo14',
            uid: 16,
            name: 'First Solid Material Forms in Solar System',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -4569700000,
            readableYear: '-4,568,700,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo15',
            uid: 17,
            name: 'Formation of Earth',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -4550000000,
            readableYear: '-4,550,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo16',
            uid: 18,
            name: 'Betelguese Becomes a Main Sequence Star',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -16500000,
            readableYear: '-16,500,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo17',
            uid: 19,
            name: 'Betelguese Becomes a Red Giant',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -2000000,
            readableYear: '-2,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo18',
            uid: 20,
            name: 'Crab Nebula Forms',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -1054,
            readableYear: '1054 CE',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo19',
            uid: 21,
            name: 'Supernova in Large Magellanic Cloud',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -1987,
            readableYear: '1987 CE',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo20',
            uid: 22,
            name: 'Discovery of First Exoplanet Around Sun-like Star',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: -1995,
            readableYear: '1995 CE',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo21',
            uid: 23,
            name: 'Betelgeuse Goes Supernova',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: 100000,
            readableYear: '100,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo22',
            uid: 24,
            name: 'Milky Way and Andromeda Galaxies Collide',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: 3000000000,
            readableYear: '3,000,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo23',
            uid: 25,
            name: 'Sun Becomes a Red Giant (Death of the Earth)',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: 5450000000,
            readableYear: '5,450,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardCosmo24',
            uid: 26,
            name: 'Sun Becomes a White Dwarf',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#cosmo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/305/300/?random',
                pin: 'https://picsum.photos/305/300/?random',
                thumbnail: 'https://picsum.photos/305/300/?random',
            },
            year: 5520000000,
            readableYear: '5,520,000,000',
        })
        /*
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        GEOLOGICAL EVENTS
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        */
        tm.new ('app.sim.timeline.Item', {
            id: 'cardGeo0',
            uid: 27,
            name: 'Oldest Evidence for Oceans and Continents',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            selector: {
                timeline: '#visualization',
                event: '#geo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/306/300/?random',
                pin: 'https://picsum.photos/306/300/?random',
                thumbnail: 'https://picsum.photos/306/300/?random',
            },
            year: {
                earliest: -4300000000,
                latest: -4400000000,
            },
            readableYear: {
                earliest: '-4,300,000,000',
                latest: '-4,400,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardGeo1',
            uid: 28,
            name: 'Rise of Oxygen',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'About halfway through Earth history, the amount O2 in Earth\'s atmosphere increased significantly. Before this time, O2 was a trace gas, like methane today. After this time, the atmosphere began its inexorable transformation into the breathable composition that we know today...',
            selector: {
                timeline: '#visualization',
                event: '#geo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/306/300/?random',
                pin: 'https://picsum.photos/306/300/?random',
                thumbnail: 'https://picsum.photos/306/300/?random',
            },
            year: {
                earliest: -2500000000,
                latest: -2450000000,
            },
            readableYear: {
                earliest: '-2,500,000,000',
                latest: '-2,450,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardGeo2',
            uid: 29,
            name: 'Ice Age Begins',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'There have been several eras of extensive glaciation in Earth\'s history. We are living in hte most recent such era which geologists call the "Quaternary Period". During this era, permanent ice sheets developed in Antartica and possibly Greenland. These ice sheets expanded and contracted in dramatic cycles - "ice ages" - roughly every 100,000 years...',
            selector: {
                timeline: '#visualization',
                event: '#geo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/307/300/?random',
                pin: 'https://picsum.photos/307/300/?random',
                thumbnail: 'https://picsum.photos/307/300/?random',
            },
            year: -2588000,
            readableYear: '-2,588,000'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardGeo3',
            uid: 30,
            name: 'Last Glacial Maximum',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'When the last major ice age reached its peak, a sheet of ice about 2 miles thick covered much of North America. Geologists and climate scientists call that time the "Last Glacial Maximum". modern human civilization arose after that ice sheet retreated.',
            selector: {
                timeline: '#visualization',
                event: '#geo-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/308/300/?random',
                pin: 'https://picsum.photos/308/300/?random',
                thumbnail: 'https://picsum.photos/308/300/?random',
            },
            year: {
                earliest: -20000,
                latest: -26500
            },
            readableYear: {
                earliest: '-26,500',
                latest: '-20,000',
            },
        })


        /*
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        BIOLOGICAL EVENTS
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        */
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio1',
            uid: 31,
            name: 'Oldest Evidence for Life',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The earliest evidence of life consists of microscopic pieces of graphite that are enriched in the isotope carbon-13 and embedded in the earliest sedimentary rocks. This enrichment is typucal of carbon compounds produced by photosynthesis. This evidence is not convincing to everyone...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/301/?random',
                pin: 'https://picsum.photos/300/301/?random',
                thumbnail: 'https://picsum.photos/300/301/?random',
            },
            year: {
                earliest: -4280000000,
                latest: -3700000000
            },
            readableYear: {
                earliest: '-4,280,000,000',
                latest: '3,700,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio2',
            uid: 32,
            name: 'Oldest Bacterial Fossils',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Fossil bacteria are hard to find! When it comes to the oldest of them, it\'s hard to be sure these microscopic shapes in the ancienct rocks are trule the remains of living creatures rather than funny mineral forms. The most recent discovery seems pretty convincing, though...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/302/?random',
                pin: 'https://picsum.photos/300/302/?random',
                thumbnail: 'https://picsum.photos/300/302/?random',
            },
            year: {
                earliest: -3500000000,
                latest: -3300000000
            },
            readableYear: {
                earliest: '-3,500,000,000',
                latest: '-3,300,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio3',
            uid: 33,
            name: 'Oldest Stromatolites',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Stromatolites are layered structures formed in shallow water by the trapping of dirt by microbes, especially cyanobateria, living in films or \'mats\'. Stromatolites are rare today but were common in hte past. Fossil stromatolites provide some of the ost ancient records of life on Earth...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/303/?random',
                pin: 'https://picsum.photos/300/303/?random',
                thumbnail: 'https://picsum.photos/300/303/?random',
            },
            year: {
                earliest: -3700000000,
                latest: -3500000000
            },
            readableYear: {
                earliest: '-3,700,000,000',
                latest: '-3,500,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio4',
            uid: 34,
            name: 'Oldest Eukaryote Biosignature',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Eukaryotes are organisms that have nuclei and other organelles in their cells. Although some are single-celled, they can also form multil-cellurlar complex organisms, such as plants and animals. The oldest eveidence are not proper fossils but instead organic molecules in ancient rocks that are the remains of molecules probably produced by ancient eukaryotes...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/304/?random',
                pin: 'https://picsum.photos/300/304/?random',
                thumbnail: 'https://picsum.photos/300/304/?random',
            },
            year: {
                earliest: -1780000000,
                latest: -1300000000
            },
            readableYear: {
                earliest: '-1,780,000,000',
                latest: '-1,300,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio5',
            uid: 35,
            name: 'Oldest Eukaryote Fossil',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The oldest eukaryote fossils are the remains of tube-shaped organisms thought to be ancient versions of the alga Grypania...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/305/?random',
                pin: 'https://picsum.photos/300/305/?random',
                thumbnail: 'https://picsum.photos/300/305/?random',
            },
            year: {
                earliest: -1780000000,
                latest: -1300000000
            },
            readableYear: {
                earliest: '-1,780,000,000',
                latest: '-1,300,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio6',
            uid: 36,
            name: 'Oldest Animal Fossils (Ediacara)',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The oldest animal fossils are enigmatic shapes preserved in sedimentary rocks found from the same period on multiple continents. The shapes do not correspond to any organism known today. Most paleontologists think these fossils are the traces of ancient animals...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/306/?random',
                pin: 'https://picsum.photos/300/306/?random',
                thumbnail: 'https://picsum.photos/300/306/?random',
            },
            year: {
                earliest: -595000000,
                latest: -575000000
            },
            readableYear: {
                earliest: '-595,000,000',
                latest: '-575,000,000',
            },
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio7',
            uid: 37,
            name: 'Cambrian Explosion',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The "Cambrian explosion" describes the relatively rapid appearance in the fossil record, over a few million years, of most of the major forms of animals and plants that we know today. The cause of this landmark event in the history of life is still debated...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/307/?random',
                pin: 'https://picsum.photos/300/307/?random',
                thumbnail: 'https://picsum.photos/300/307/?random',
            },
            year: -542000000,
            readableYear: '-542,000,000',
        })

        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio8',
            uid: 38,
            name: 'Oldest Land Plant Fossils',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Adjusting from life in the water to life on land is no easy task. Ultraviolet radiation, desiccation, and nutirent acquistion are just some of the hurdles early land plants needed to overcome. The first evidence for liverworts, a simple kind of plant, appeared in the form of spores.',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/308/?random',
                pin: 'https://picsum.photos/300/308/?random',
                thumbnail: 'https://picsum.photos/300/308/?random',
            },
            year: -472000000,
            readableYear: '-472,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio8b',
            uid: 39,
            name: 'Oldest Land Animal Fossils',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'After plants conquered the land, animals were not far behind. Millipedes, centipedes, and scorpions belonging to the phylum "Arthropod" were the first to colonize the land, feasting on spores, early land plants, and each other.',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/300/309/?random',
                pin: 'https://picsum.photos/300/309/?random',
                thumbnail: 'https://picsum.photos/300/309/?random',
            },
            year: -428000000,
            readableYear: '-428,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio9',
            uid: 40,
            name: 'Permian-Triassic Extinction',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The greatest mass extinction in Earth history saw the end of up to 96% of all species living in the oceans, and 70% of vertebrates on land. The cause of this catastrophe is hotly debated, but it paved the way for the rise of the dinosaurs...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/301/?random',
                pin: 'https://picsum.photos/301/301/?random',
                thumbnail: 'https://picsum.photos/301/301/?random',
            },
            year: -250000000,
            readableYear: '-250,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio10',
            uid: 41,
            name: 'Oldest Dinsosaur Fossil',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Dinosaurs stepped onto the scene with the evolution of Eoraptor, an archosaur whose distinguishing characteristics was a unique hip structure that differed from precursor reptiles by brining the legs under the body, allowing dinosaurs to expand into many new niches.',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/302/?random',
                pin: 'https://picsum.photos/301/302/?random',
                thumbnail: 'https://picsum.photos/301/302/?random',
            },
            year: -243000000,
            readableYear: '-243,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio11',
            uid: 42,
            name: 'Dinsosaur Extinction',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The extinction of the dinosaurs was a rapid event, geologically speaking. Today, it is widely accepted that collisions of the Earth with a 10km asteroid comet probably caused this extinction, although many argue that the Earth\'s environment was already stressed bu other factors...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/303/?random',
                pin: 'https://picsum.photos/301/303/?random',
                thumbnail: 'https://picsum.photos/301/303/?random',
            },
            year: -65000000,
            readableYear: '-65,000,000',
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardBio12',
            uid: 43,
            name: 'Biosphere Collapses',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'As the Sun ages, it grows brighter. As it grows brighter, the Earth grows warmer, which increases the rate at which the weathering of rocks consimes CO2 in the atmosphere. This very slow process, happening over hundreds of millions of years, will eventually reduce CO2 in the atmosphere to levels below that needed to sustain photosynthesis. At that point, the biosphere as we know it will collapse...',
            selector: {
                timeline: '#visualization',
                event: '#bio-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/309/300/?random',
                pin: 'https://picsum.photos/309/300/?random',
                thumbnail: 'https://picsum.photos/309/300/?random',
            },
            year: {
                earliest: 900000000,
                latest: 1500000000
            },
            readableYear: {
                earliest: '900,000,000',
                latest: '1,500,000,000',
            },
        })
        /*
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        Anthropogenic EVENTS
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        */
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro1',
            uid: 44,
            name: 'Earliest Use of Stone Tools by Human Ancestors',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The first evidence of stone tool use was discovered only recently. Scraping marks on animal bone fragments found in Ethiopia were probably made by Australopithecus afarensis...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/304/?random',
                pin: 'https://picsum.photos/301/304/?random',
                thumbnail: 'https://picsum.photos/301/304/?random',
            },
            year: -3390000,
            readableYear: '-3,390,000'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro2',
            uid: 45,
            name: 'Agriculture Invented',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Advancing glaciers ground bedrock to fine powder. When they retreated, they left behind rich soil and networks of rivers and lakes. Some scholars suspect that agriculture was invented as a consequence, leading eventually to the rise of cities and technology. You may be reading this because of ancient climate change!',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/305/?random',
                pin: 'https://picsum.photos/301/305/?random',
                thumbnail: 'https://picsum.photos/301/305/?random',
            },
            year: -11000,
            readableYear: '-11,000'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro3',
            uid: 46,
            name: 'Rome Founded',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Roman Empire was the dominant European power of its time. Its legacy endures in the languages of political systems that shape the world to this day. The origins of this empire are shrouded in myth and legend...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/306/?random',
                pin: 'https://picsum.photos/301/306/?random',
                thumbnail: 'https://picsum.photos/301/306/?random',
            },
            year: -753,
            readableYear: '753 BCE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro4',
            uid: 47,
            name: 'Roman Empire Collapsed',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The decline of the Roman empire was gradual, but is commonly assigned to the date when the last Emperor of the Western Roman Empire was deposed by Germanic conquerors. Regardless, the ebbing of this Empire led to a period of political instability and technological decline in Europe...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/307/?random',
                pin: 'https://picsum.photos/301/307/?random',
                thumbnail: 'https://picsum.photos/301/307/?random',
            },
            year: -476,
            readableYear: '476 BCE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro5',
            uid: 48,
            name: 'Renaissance',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The Renaissance was a cultural movement in Europe that saw an eruption of ferment and creativity in literature, art, religion, politics, and of special interest to us, in astronomy and other branches of science...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/308/?random',
                pin: 'https://picsum.photos/301/308/?random',
                thumbnail: 'https://picsum.photos/301/308/?random',
            },
            year: 1400,
            readableYear: '1400 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro6',
            uid: 49,
            name: 'Industrial Revolution',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'During the Industrial Revolution, technology was harnessed in ways that transformed daily life around the globe. Average income and human population soared as never before...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/301/309/?random',
                pin: 'https://picsum.photos/301/309/?random',
                thumbnail: 'https://picsum.photos/301/309/?random',
            },
            year: 1780,
            readableYear: '1780 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro7',
            uid: 50,
            name: 'First Radio Broadcast',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'The first radio broadcast of voice and music probably occurred in Massachusetts, when Reginal Fessenden\'s transmissions of classical music and a passage from the Bibble was heard several hundred miles away.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/301/?random',
                pin: 'https://picsum.photos/302/301/?random',
                thumbnail: 'https://picsum.photos/302/301/?random',
            },
            year: 1906,
            readableYear: '1906 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro8',
            uid: 51,
            name: 'First Human Steps on Extraterrestrial Body',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Neil Armstring famously took "one small step for man, one giant leap for mankind" when he stepped from the Apollo 11 lunar lander and placed his foot upon the Moon...',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1969,
            readableYear: '1969 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro9',
            uid: 52,
            name: 'First Satellite',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1957,
            readableYear: '1957 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro10',
            uid: 53,
            name: 'First Human in Space',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1957,
            readableYear: '1957 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro11',
            uid: 54,
            name: 'Arecibo Message Broadcast',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1974,
            readableYear: '1974 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro12',
            uid: 55,
            name: 'Voyager 1 Launched',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1977,
            readableYear: '1977 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro13',
            uid: 56,
            name: 'Hubble Space Telescope Launched',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 1990,
            readableYear: '1990 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro14',
            uid: 57,
            name: 'Voyager 1 Left Solar System',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 2012,
            readableYear: '2012 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro15',
            uid: 58,
            name: 'First Reused Rocket Launched',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 2017,
            readableYear: '2017 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro16',
            uid: 59,
            name: 'Arecibo Message Reaches M13',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 25000,
            readableYear: '25,000 CE'
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardAnthro17',
            uid: 60,
            name: 'Voyager 1 Reaches AC + 79 888',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            selector: {
                timeline: '#visualization',
                event: '#anthro-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/302/?random',
                pin: 'https://picsum.photos/302/302/?random',
                thumbnail: 'https://picsum.photos/302/302/?random',
            },
            year: 40000,
            readableYear: '40,000 CE'
        })

        /*
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        SPECIAL EVENTS
        IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        */
        tm.new ('app.sim.timeline.Item', {
            id: 'cardSpecial1',
            uid: 61,
            name: 'Your Birth',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'On this happy day, you arrived as a conscious being on planet Earth. We hope your stay has been pleasant so far, and that you will enjoy many more decades of inhabiting this pale blue dot.',
            selector: {
                timeline: '#visualization',
                event: '#special-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/303/?random',
                pin: 'https://picsum.photos/302/303/?random',
                thumbnail: 'https://picsum.photos/302/303/?random',
            },
            year: 'special',
            readableYear: ''
        })
        tm.new ('app.sim.timeline.Item', {
            id: 'cardSpecial2',
            uid: 62,
            name: 'Today',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            content: 'On this day, we hope you learned many things about the history of the Earth',
            selector: {
                timeline: '#visualization',
                event: '#special-card-list',
                detail: '#card-detail',
            },
            image: {
                full: 'https://picsum.photos/302/304/?random',
                pin: 'https://picsum.photos/302/304/?random',
                thumbnail: 'https://picsum.photos/302/304/?random',
            },
            year: new Date (),
            readableYear: '' + new Date ()
        })

        $ ('.ui.accordion').accordion ('refresh')
    }

})
window.loadData
