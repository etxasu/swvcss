// Card template
/*
tm.new ('app.sim.timeline.Item', {
    id: 'card',
    uid: 0,
    simModel: simModel,
    name: 'Lorem',
    description: '',
    content: '    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    image: {
        full: 'https://picsum.photos/300/300/?random',
        pin: 'https://picsum.photos/300/300/?random',
        thumbnail: 'https://picsum.photos/300/300/?random',
    },
})


*/

tm.add ('app.sim.timeline.Data', function (o, p, d) {

    o.setup = function (config) {
        var item, key, list;
        list = [
              {
                "preventRegister": true,
                "id": "null",
                "uid": 0,
                "name": "...",
                "description": "...",
                "content": "...",
                "selector": {
                  "timeline": "#visualization",
                  "event": "#card-list",
                  "detail": "#card-detail"
                },
                "image": {
                  "full": "",
                  "pin": "",
                  "thumbnail": ""
                },
                "year": -99999999999999,
                "readableYear": "0",
                "color": "gold"
              },
              {
                "type": "cosmic",
                "id": "cardCosmoA1",
                "index": 1,
                "name": "Big Bang",
                "description": "",
                "content": "The most widely accepted theory for the origin of the universe, the Big Bang Theory, proposes that the universe started as a single point, known as a singularity, which then rapidly expanded, creating space and time. The early universe was too hot and dense for even subatomic particles to exist. As the universe cooled, particles were able to form eventually leading to properties of the universe we now observe, including the background radiation, the relative abundance of small atoms on the periodic table, the large-scale distribution of galaxies, and the receding motion of galaxies beyond the Milky Way.",
                "image": {
                  "full": "https://i.imgur.com/f0N7mFh.jpg",
                  "pin": "https://i.imgur.com/PJaAW2r.png",
                  "thumbnail": "https://i.imgur.com/PJaAW2r.png"
                },
                "year": -13800000000,
                "readableYear": "-13,800,000,000",
                "color": "#FFFFFF",
                "uid": 1
              },
              {
                "type": "cosmic",
                "id": "cardCosmoA2",
                "uid": 2,
                "index": 2,
                "name": "Cosmic Microwave Background Forms",
                "description": "",
                "content": "Considered to be a remnant of the Big Bang, the cosmic microwave background fills the universe and is detected in every direction. At less than 3 Kelvin, the low frequencies of microwave radiation cannot be detected by the human eye, but sensitive spacecraft have mapped tiny temperature fluctuations, which show an uneven density distribution in the early universe that eventually led to the large-scale distribution of matter we see today.",
                "image": {
                  "full": "https://i.imgur.com/rKImRJi.jpg",
                  "pin": "https://i.imgur.com/VwYm1qh.png",
                  "thumbnail": "https://i.imgur.com/VwYm1qh.png"
                },
                "year": -13799620000,
                "readableYear": "-13,799,620,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo7",
                "uid": 3,
                "index": 3,
                "name": "First Stars Form",
                "description": "",
                "content": "Born out of dense pockets of hydrogen and helium gas that slowly collapsed due to gravity over tens of millions of years, the first stars were probably hundreds of times more massive than our Sun and extremely luminous. Though they may have only lived for a very short 1-100 million years, they drastically changed the universe by heating and ionizing the surrounding gas and creating new elements which they dispersed into the universe, seeding future generations of stars and galaxies.",
                "image": {
                  "full": "https://i.imgur.com/ClkwjPJ.jpg",
                  "pin": "https://i.imgur.com/1FTRCAn.png",
                  "thumbnail": "https://i.imgur.com/1FTRCAn.png"
                },
                "year": -13700000000,
                "readableYear": "-13,700,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo8",
                "uid": 4,
                "index": 4,
                "name": "Milky Way Galaxy Forms",
                "description": "",
                "content": "Evidence suggests that the Milky Way formed when a massive, slowly spinning, spherical cloud of gas and dust began to collapse. As the cloud collapsed, dense regions within the cloud formed stars, and the rotation of the cloud caused it to flatten out into the disk shape we see today.",
                "image": {
                  "full": "https://i.imgur.com/GgZ7Cc2.jpg",
                  "pin": "https://i.imgur.com/iSTXzw0.png",
                  "thumbnail": "https://i.imgur.com/iSTXzw0.png"
                },
                "year": -13000000000,
                "readableYear": "-13,000,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo9",
                "uid": 5,
                "index": 5,
                "name": "Peak Star Formation",
                "description": "",
                "content": "Galaxies grew over billions of years due to mergers and the gravitational collection of primordial gas. Their growth triggered a period of peak star formation when stars formed at a rate about 30 times greater than they form today.",
                "image": {
                  "full": "https://i.imgur.com/dovGQJJ.jpg",
                  "pin": "https://i.imgur.com/4XvV6M6.png",
                  "thumbnail": "https://i.imgur.com/4XvV6M6.png"
                },
                "year": -10300000000,
                "readableYear": "-10,300,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo2",
                "uid": 6,
                "index": 12,
                "name": "Moon Forming Impact",
                "description": "",
                "content": "The moon was probably formed when the young Earth collided with a Mars-sized body (nicknamed Theia) in the early days of the Solar System. This “Giant Impact” hypothesis explains many features of the Moon, such as its size and chemistry.",
                "color": "#FFFFFF",
                "image": {
                  "full": "https://i.imgur.com/YKVCP8l.jpg",
                  "pin": "https://i.imgur.com/vzkmF44.png",
                  "thumbnail": "https://i.imgur.com/vzkmF44.png"
                },
                "year": -4470000000,
                "readableYear": "-4,470,000,000"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo3",
                "uid": 7,
                "index": 13,
                "name": "Late Heavy Bombardment",
                "description": "",
                "content": "The Late Heavy Bombardment was a discrete period of time during which the largest impact craters on the Moon were formed. It is thought that Earth, Mercury, Venus, and Mars were all bombarded at the same time when the giant planets migrated and disrupted the Asteroid Belt.",
                "color": "#FFFFFF",
                "image": {
                  "full": "https://i.imgur.com/H7smXPf.jpg",
                  "pin": "https://i.imgur.com/2fLl2Hc.png",
                  "thumbnail": "https://i.imgur.com/2fLl2Hc.png"
                },
                "year": {
                  "earliest": -4000002018,
                  "latest": -3800002018,
                  "canon": -3800002018
                },
                "readableYear": {
                  "earliest": "-4,000,000,000",
                  "latest": "-3,800,000,000"
                }
              },
              {
                "type": "cosmic",
                "id": "cardCosmo10",
                "uid": 8,
                "index": 6,
                "name": "Andromeda Galaxy Forms",
                "description": "",
                "content": "At a distance of 2.5 million light years, the Andromeda Galaxy is our nearest neighboring galaxy. Both the Milky Way and Andromeda are part a group of galaxies orbiting around each other known as the Local Group. While most galaxies in the universe are moving away from the us, the Andromeda Galaxy is one of the only ones moving toward us. The vast gap in ages between different stars within this spiral galaxy suggest that it probably formed when two smaller galaxies collided. ",
                "image": {
                  "full": "https://i.imgur.com/KT1e3cP.jpg",
                  "pin": "https://i.imgur.com/9w4G6Io.png",
                  "thumbnail": "https://i.imgur.com/9w4G6Io.png"
                },
                "year": -10000000000,
                "readableYear": "-10,000,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo11",
                "uid": 9,
                "index": 7,
                "name": "Spiral Arms Form in Milky Way",
                "description": "",
                "content": "Astronomers believe spiral arms are caused by density waves that form as stars and gas slowly orbit in a galaxy, sort of like a traffic jam with stars and gas instead of cars.  As gas moves into a dense part of a wave, the gas is compressed, triggering the formation of new stars. Short-lived, bright, blue stars created in this process lead to the distinctive blue spiral arms of many galaxies.  ",
                "image": {
                  "full": "https://i.imgur.com/ZmnjYur.jpg",
                  "pin": "https://i.imgur.com/gEVkoy8.png",
                  "thumbnail": "https://i.imgur.com/gEVkoy8.png"
                },
                "year": -8750000000,
                "readableYear": "-8,750,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo12",
                "uid": 10,
                "index": 8,
                "name": "Alpha Centauri Binary Star System Forms",
                "description": "",
                "content": "At a distance of 4.3 light years, Alpha Centauri A (left) and Alpha Centauri B (right) are members of the closest star system to Earth. Alpha Centauri A is slightly bigger than the Sun, while Alpha Centauri B is slightly smaller, making them prime targets in the hunt for habitable exoplanets. They have an 80 year orbit around a common center of gravity. ",
                "image": {
                  "full": "https://i.imgur.com/wS4MOAS.jpg",
                  "pin": "https://i.imgur.com/P6dpQuV.png",
                  "thumbnail": "https://i.imgur.com/P6dpQuV.png"
                },
                "year": -6000000000,
                "readableYear": "-6,000,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo13",
                "uid": 11,
                "index": 9,
                "name": "Solar Nebula Begins to Form",
                "description": "",
                "content": "The raw materials for the Sun and planets once made up a cloud of gas and dust that extended several light years in diameter. As the cloud contracted under its own gravity, most of the material accumulated in the center, becoming hot and dense enough to give birth to our Sun. The rest of the material flattened into a swirling disk surrounding the Sun and eventually formed the planets and other small bodies in the solar system.",
                "image": {
                  "full": "https://i.imgur.com/1h377q2.jpg",
                  "pin": "https://i.imgur.com/mnyanGZ.png",
                  "thumbnail": "https://i.imgur.com/mnyanGZ.png"
                },
                "year": -4600000000,
                "readableYear": "-4,600,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo14",
                "uid": 12,
                "index": 10,
                "name": "First Solid Material Forms in Solar System",
                "description": "",
                "content": "A crucial first step to the formation of planets was the creation of the first solid clumps of material in the solar nebula. Microscopic dust particles near the new Sun melted, collided with other dust particles, and stuck together forming the first building blocks for larger solid particles. This early material is often preserved in special meteorites called chondrites.",
                "image": {
                  "full": "https://i.imgur.com/2vsYSRl.jpg",
                  "pin": "https://i.imgur.com/7rCZune.png",
                  "thumbnail": "https://i.imgur.com/7rCZune.png"
                },
                "year": -4569700000,
                "readableYear": "-4,568,700,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo15",
                "uid": 13,
                "index": 11,
                "name": "Formation of Earth",
                "description": "",
                "content": "Small pieces of solid material in the solar nebula began to collide, eventually creating planetesimals with a large enough gravitational field to affect the motion of nearby planetesimals. The largest planetesimals continued to attract smaller ones, eventually accreting enough material to form Earth and the other terrestrial planets of the inner solar system.",
                "image": {
                  "full": "https://i.imgur.com/XwiaTct.jpg",
                  "pin": "https://i.imgur.com/E94oTwl.png",
                  "thumbnail": "https://i.imgur.com/E94oTwl.png"
                },
                "year": -4550000000,
                "readableYear": "-4,550,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "geological",
                "id": "cardCosmo4",
                "uid": 14,
                "index": 3,
                "name": "Snowball Earth",
                "description": "",
                "content": "The “Snowball Earth” hypothesis posits that around the time of the rise of animals the Earth was frozen over entirely, or nearly so, at least once and possibly several times. The cause is debated, as are the consequences for the evolution of life.",
                "color": "#56B4E9",
                "image": {
                  "full": "https://i.imgur.com/U4sP53k.jpg",
                  "pin": "https://i.imgur.com/pYnpR9W.png",
                  "thumbnail": "https://i.imgur.com/pYnpR9W.png"
                },
                "year": {
                  "earliest": -715002018,
                  "latest": -680002018,
                  "canon": -680002018
                },
                "readableYear": {
                  "earliest": "-715,000,000",
                  "latest": "-680,000,000"
                }
              },
              {
                "type": "cosmic",
                "id": "cardCosmo16",
                "uid": 15,
                "index": 14,
                "name": "Betelgeuse Becomes a Main Sequence Star",
                "description": "",
                "content": "Though it is now a red supergiant, Betelgeuse originally emerged from its surrounding cloud of gas and dust as it started to fuse hydrogen into helium to begin its journey as a main sequence star. With an original mass of about 20 solar masses, Betelgeuse is one of the largest known stars and is on a stellar evolutionary track very different from the Sun’s… a track that will eventually lead to its death as a spectacular supernova.",
                "image": {
                  "full": "https://i.imgur.com/tk8wT1Z.jpg",
                  "pin": "https://i.imgur.com/V2BUV5I.png",
                  "thumbnail": "https://i.imgur.com/V2BUV5I.png"
                },
                "year": {
                  "earliest": -11002018,
                  "latest": -22002018,
                  "canon": -16502018
                },
                "readableYear": "-16,500,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo17",
                "uid": 16,
                "index": 15,
                "name": "Betelgeuse Becomes a Red Supergiant",
                "description": "",
                "content": "When Betelgeuse fused all of its hydrogen into helium, it marked the beginning of the end for the star as it entered into the red supergiant phase. Strong stellar winds have blown much of Betelgeuse’s atmosphere away so the star is now only about half the mass it was as a main sequence star. If it were placed in the Sun’s location, Betelgeuse would extend to about Jupiter’s orbit. It’s large size, combined with the fact that its total luminosity is more than 100,000 times that of the Sun, makes Betelgeuse one of the brightest stars in the night sky even though it is about 720 light years away (many of the brightest stars are less than 100 light years away.)",
                "image": {
                  "full": "https://i.imgur.com/KF2fUni.jpg",
                  "pin": "https://i.imgur.com/ctXKrxA.png",
                  "thumbnail": "https://i.imgur.com/ctXKrxA.png"
                },
                "year": {
                  "earliest": -1502018,
                  "latest": -2502018,
                  "canon": -2002018
                },
                "readableYear": "-2,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo18",
                "uid": 17,
                "index": 16,
                "name": "Crab Nebula Forms",
                "description": "",
                "content": "The Crab Nebula is the remnant of the first supernova ever documented in historical records by the Chinese and in pictographs by Native American tribes in North America. The ancient Chinese noted that the supernova was visible during the day for three weeks and remained visible to the naked eye at night for nearly two years.",
                "image": {
                  "full": "https://i.imgur.com/F6vhleM.jpg",
                  "pin": "https://i.imgur.com/u9Yww8V.png",
                  "thumbnail": "https://i.imgur.com/u9Yww8V.png"
                },
                "year": -1054,
                "readableYear": "1054 BCE",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo19",
                "uid": 18,
                "index": 17,
                "name": "Supernova in Large Magellanic Cloud",
                "description": "",
                "content": "Occurring in the Large Magellanic Cloud, one of the Milky Way’s satellite galaxies visible from the Southern Hemisphere, Supernova SN 1987A is one of the brightest stellar explosions since the invention of the telescope. The dying star, still visible in the center, is surrounded by two glowing rings of stellar material that were blown off during the supernova.",
                "image": {
                  "full": "https://i.imgur.com/32uUhJq.jpg",
                  "pin": "https://i.imgur.com/ybZVrLV.png",
                  "thumbnail": "https://i.imgur.com/ybZVrLV.png"
                },
                "year": -1987,
                "readableYear": "1987 CE",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo20",
                "uid": 19,
                "index": 18,
                "name": "Discovery of First Exoplanet around Sun-like Star",
                "description": "",
                "content": "Though 51 Pegasi b came several years after the discovery of the first exoplanet, it was the first planet discovered orbiting a star similar to our own Sun. At the time of its discovery, 51 Peg b was considered unusual for being about twice the size of Jupiter yet orbiting its host star in only four days. Thousands of exoplanet discoveries later, this type of planet appears to be the rule more than the exception.",
                "image": {
                  "full": "https://i.imgur.com/DJkbFuM.jpg",
                  "pin": "https://i.imgur.com/mZ0frTz.png",
                  "thumbnail": "https://i.imgur.com/mZ0frTz.png"
                },
                "year": -1995,
                "readableYear": "1995 BCE",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo21",
                "uid": 20,
                "index": 19,
                "name": "Betelgeuse Goes Supernova",
                "description": "",
                "content": "Due to its large mass, Betelgeuse will die in a supernova explosion at a relatively young age. This artist’s concept depicts the very beginning stages of a supernova, when the shockwave first penetrates the surface of the star. When the supernova occurs, it could be as spectacular as the one that created the Crab Nebula, becoming as bright as the moon and may even be visible during the day. This will forever alter the appearance of the constellation Orion.",
                "image": {
                  "full": "https://i.imgur.com/Il3XHRO.jpg",
                  "pin": "https://i.imgur.com/2XF6LVh.png",
                  "thumbnail": "https://i.imgur.com/2XF6LVh.png"
                },
                "year": {
                  "earliest": -2018,
                  "latest": 197982,
                  "canon": 97982
                },
                "readableYear": "100,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo22",
                "uid": 21,
                "index": 20,
                "name": "Milky Way and Andromeda Galaxies Collide",
                "description": "",
                "content": "Our home galaxy, the Milky Way, and the nearby Andromeda galaxy are on a collision course. When they collide, gravitational forces will stretch and warp the galaxies. The stars inside each galaxy, however, are so far apart that they will not collide with other stars as the galaxies merge. Stars will merely be flung into different orbits around a new galactic center.",
                "image": {
                  "full": "https://i.imgur.com/ap2XBzQ.jpg",
                  "pin": "https://i.imgur.com/QIVFJRJ.png",
                  "thumbnail": "https://i.imgur.com/QIVFJRJ.png"
                },
                "year": 3000000000,
                "readableYear": "3,000,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo24",
                "uid": 22,
                "index": 22,
                "name": "Sun Becomes a White Dwarf",
                "description": "",
                "content": "When the Sun fuses all of its hydrogen into helium, it will expand and cool into a red giant. As it nears the end of the red giant stage, the Sun will begin to shed its outer layers of gas, eventually leaving behind a dense hot core of carbon and oxygen known as a white dwarf. ",
                "image": {
                  "full": "https://i.imgur.com/hREFyKK.jpg",
                  "pin": "https://i.imgur.com/WvW6XRr.png",
                  "thumbnail": "https://i.imgur.com/WvW6XRr.png"
                },
                "year": 5520000000,
                "readableYear": "5,520,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "geological",
                "id": "cardGeo0",
                "uid": 23,
                "index": 1,
                "name": "Oldest Evidence for Oceans and Continents",
                "description": "",
                "content": "The earliest continents and oceans are long gone, but their remnants are preserved in extremely durable crystals known as zircons. Zircon evidence indicates the presence of liquid water on Earth’s surface and continental crust when Earth was a fairly young planet.",
                "color": "#56B4E9",
                "image": {
                  "full": "https://i.imgur.com/pECL0Fu.jpg",
                  "pin": "https://i.imgur.com/lGp8K0k.png",
                  "thumbnail": "https://i.imgur.com/lGp8K0k.png"
                },
                "year": {
                  "earliest": -4300002018,
                  "latest": -4400002018,
                  "canon": -4300002018
                },
                "readableYear": {
                  "earliest": "-4,300,000,000",
                  "latest": "-4,400,000,000"
                }
              },
              {
                "type": "geological",
                "id": "cardGeo1",
                "uid": 24,
                "index": 2,
                "name": "Rise of Oxygen",
                "description": "",
                "content": "About halfway through Earth history, the amount of O₂ in Earth’s atmosphere increased significantly. Before this time, O₂ was a trace gas, like methane today. After this time, the atmosphere began changing into the breathable mixture that we know today.",
                "image": {
                  "full": "https://i.imgur.com/xx4zLyT.jpg",
                  "pin": "https://i.imgur.com/DFugWyu.png",
                  "thumbnail": "https://i.imgur.com/DFugWyu.png"
                },
                "year": {
                  "earliest": -2500002018,
                  "latest": -2450002018,
                  "canon": -2450002018
                },
                "readableYear": {
                  "earliest": "-2,500,000,000",
                  "latest": "-2,450,000,000"
                },
                "color": "#56B4E9"
              },
              {
                "type": "biological",
                "id": "cardBio1",
                "uid": 25,
                "index": 1,
                "name": "Oldest Evidence for Life",
                "description": "",
                "content": "The earliest evidence of life consists of microscopic pieces of graphite that are embedded in the earliest sedimentary rocks. These pieces of graphite are enriched in the isotope carbon-13. This isotope is typical of carbon compounds produced by photosynthesis. This evidence is not convincing to everyone, however.",
                "image": {
                  "full": "https://i.imgur.com/0jSuHMN.jpg",
                  "pin": "https://i.imgur.com/i5uKJm2.png",
                  "thumbnail": "https://i.imgur.com/i5uKJm2.png"
                },
                "year": {
                  "earliest": -4280002018,
                  "latest": -3700002018,
                  "canon": -3850002018
                },
                "readableYear": {
                  "earliest": "-4,280,000,000",
                  "latest": "3,700,000,000"
                },
                "color": "#009E73"
              },
              {
                "type": "biological",
                "id": "cardBio3",
                "uid": 26,
                "index": 2,
                "name": "Oldest Stromatolites",
                "description": "",
                "content": "Stromatolites are layered structures formed in shallow water by the trapping of dirt by microbes, especially cyanobacteria, living in films or “mats”. Stromatolites are rare today but were common in the past. Fossil stromatolites provide some of the most ancient records of life on Earth.",
                "color": "#009E73",
                "image": {
                  "full": "https://i.imgur.com/rvstZtm.jpg",
                  "pin": "https://i.imgur.com/Tpq3cBD.png",
                  "thumbnail": "https://i.imgur.com/Tpq3cBD.png"
                },
                "year": {
                  "earliest": -3700002018,
                  "latest": -3500002018,
                  "canon": -3700002018
                },
                "readableYear": {
                  "earliest": "-3,700,000,000",
                  "latest": "-3,500,000,000"
                }
              },
              {
                "type": "biological",
                "id": "cardBio2",
                "uid": 27,
                "index": 3,
                "name": "Oldest Bacteria Fossils",
                "description": "",
                "content": "Fossil bacteria are hard to find! When it comes to the oldest of them, it’s hard to be sure these microscopic shapes in ancient rocks are truly the remains of living creatures rather than funny mineral forms.  Although discovered several decades ago, these fossils are still subject to vigorous debate.",
                "color": "#009E73",
                "image": {
                  "full": "https://i.imgur.com/A8VGz7p.jpg",
                  "pin": "https://i.imgur.com/URrAwMb.png",
                  "thumbnail": "https://i.imgur.com/URrAwMb.png"
                },
                "year": {
                  "earliest": -3500002018,
                  "latest": -3300002018,
                  "canon": -3500002018
                },
                "readableYear": {
                  "earliest": "-3,500,000,000",
                  "latest": "-3,300,000,000"
                }
              },
              {
                "type": "biological",
                "id": "cardBio5",
                "uid": 28,
                "index": 4,
                "name": "Oldest Eukaryote Fossils",
                "description": "",
                "content": "The oldest eukaryote fossils, which are cells that are much more complex than bacterial cells and compose all of the cells in your body, are the remains of tube-shaped organisms thought to be ancient versions of the alga Grypania.",
                "image": {
                  "full": "https://i.imgur.com/n2r3LW5.jpg",
                  "pin": "https://i.imgur.com/awwq6bg.png",
                  "thumbnail": "https://i.imgur.com/awwq6bg.png"
                },
                "year": {
                  "earliest": -1780002018,
                  "latest": -1300002018,
                  "canon": -1780002018
                },
                "readableYear": {
                  "earliest": "-1,780,000,000",
                  "latest": "-1,300,000,000"
                },
                "color": "#009E73"
              },
              {
                "type": "biological",
                "id": "cardBio6",
                "uid": 29,
                "index": 5,
                "name": "Oldest Animal Fossils",
                "description": "",
                "content": "The oldest animal fossils are mysterious shapes preserved in sedimentary rocks found from the same period on multiple continents. The shapes do not correspond to any organisms known today. Most paleontologists think these fossils are the traces of ancient animals.",
                "image": {
                  "full": "https://i.imgur.com/4QcdOgG.jpg",
                  "pin": "https://i.imgur.com/Inf5rK1.png",
                  "thumbnail": "https://i.imgur.com/Inf5rK1.png"
                },
                "year": {
                  "earliest": -595002018,
                  "latest": -575002018,
                  "canon": -575002018
                },
                "readableYear": {
                  "earliest": "-595,000,000",
                  "latest": "-575,000,000"
                },
                "color": "#009E73"
              },
              {
                "type": "biological",
                "id": "cardBio7",
                "uid": 30,
                "index": 6,
                "name": "Cambrian Explosion",
                "description": "",
                "content": "The “Cambrian explosion” describes the relatively rapid appearance in the fossil record, over a few million years, of most of the major forms of animals and plants that we know today. The cause of this landmark event in the history of life is still debated, but may be related to changes in tectonics, climate, or nutrient levels.",
                "color": "#009E73",
                "image": {
                  "full": "https://i.imgur.com/UcZfrU6.jpg",
                  "pin": "https://i.imgur.com/DGNquVu.png",
                  "thumbnail": "https://i.imgur.com/DGNquVu.png"
                },
                "year": -542000000,
                "readableYear": "-542,000,000"
              },
              {
                "type": "biological",
                "id": "cardBio8",
                "uid": 31,
                "index": 7,
                "name": "Oldest Land Plant Fossils",
                "description": "",
                "content": "Adjusting from life in the water to life on land is no easy task. Ultraviolet radiation, desiccation, and nutrient acquisition are just some of the hurdles early land plants needed to overcome. The first evidence for liverworts, a simple kind of plant, appeared in the form of spores.",
                "color": "#009E73",
                "image": {
                  "full": "https://i.imgur.com/6mnWBSw.jpg",
                  "pin": "https://i.imgur.com/JUms6SN.png",
                  "thumbnail": "https://i.imgur.com/JUms6SN.png"
                },
                "year": -472000000,
                "readableYear": "-472,000,000"
              },
              {
                "type": "biological",
                "id": "cardBio8b",
                "uid": 32,
                'index': 8,
                "name": "Oldest Land Animal Fossils",
                "description": "",
                "content": "After plants conquered the land, animals were not far behind. Millipedes, centipedes, and scorpions belonging to the phylum “Arthropod” were the first to colonize the land, feasting on spores, early land plants, and each other.",
                "color": "#009E73",
                "image": {
                  "full": "https://i.imgur.com/6dRsYnx.jpg",
                  "pin": "https://i.imgur.com/qW3RAyc.png",
                  "thumbnail": "https://i.imgur.com/qW3RAyc.png"
                },
                "year": -428000000,
                "readableYear": "-428,000,000"
              },
              {
                "type": "biological",
                "id": "cardBio9",
                "uid": 33,
                "index": 9,
                "name": "Permian-Triassic Extinction",
                "description": "",
                "content": "The greatest mass extinction in Earth history saw the extinction of up to 96% of all species living in the oceans, and 70% of vertebrates on land. The cause of this catastrophe is hotly debated, but it paved the way for the rise of the dinosaurs.",
                "image": {
                  "full": "https://i.imgur.com/sbgMOeL.jpg",
                  "pin": "https://i.imgur.com/HWTy9wy.png",
                  "thumbnail": "https://i.imgur.com/HWTy9wy.png"
                },
                "year": -250000000,
                "readableYear": "-250,000,000",
                "color": "#009E73"
              },
              {
                "type": "biological",
                "id": "cardBio10",
                "uid": 34,
                "index": 10,
                "name": "Oldest Dinosaur Fossil",
                "description": "",
                "content": "Dinosaurs stepped onto the scene with the evolution of Eoraptor, an archosaur whose distinguishing characteristic was a unique hip structure that differed from precursor reptiles by bringing the legs under the body, allowing dinosaurs to expand into many new niches.",
                "image": {
                  "full": "https://i.imgur.com/RBkTQVh.jpg",
                  "pin": "https://i.imgur.com/AxUnpjk.png",
                  "thumbnail": "https://i.imgur.com/AxUnpjk.png"
                },
                "year": -243000000,
                "readableYear": "-243,000,000",
                "color": "#009E73"
              },
              {
                "type": "biological",
                "id": "cardBio11",
                "uid": 35,
                "index": 11,
                "name": "Dinosaur Extinction",
                "description": "",
                "content": "The extinction of the dinosaurs was a rapid event, geologically speaking. Today, it is widely accepted that the collision of Earth with a 10 km asteroid probably caused this event.  The extinction also affected other marine and terrestrial species, but it paved the way for the rise of mammals.",
                "image": {
                  "full": "https://i.imgur.com/QIjlPfa.jpg",
                  "pin": "https://i.imgur.com/UPLw8aV.png",
                  "thumbnail": "https://i.imgur.com/UPLw8aV.png"
                },
                "year": -65000000,
                "readableYear": "-65,000,000",
                "color": "#009E73"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro1",
                "uid": 36,
                "index": 1,
                "name": "Earliest Use of Stone Tools by Human Ancestors",
                "description": "",
                "content": "The first evidence of stone tool use was discovered only recently. Scraping marks on animal bone fragments found in Ethiopia were probably made by Australopithecus afarensis.",
                "image": {
                  "full": "https://i.imgur.com/OQhRZiJ.jpg",
                  "pin": "https://i.imgur.com/lnjtQJD.png",
                  "thumbnail": "https://i.imgur.com/lnjtQJD.png"
                },
                "year": -3390000,
                "readableYear": "-3,390,000",
                "color": "#CC79A7"
              },
              {
                "type": "geological",
                "id": "cardGeo2",
                "uid": 37,
                "index": 4,
                "name": "Ice Age Begins",
                "description": "",
                "content": "There have been several eras of extensive glaciation in Earth’s history. We are currently living in the most recent of these, which geologists call the “Quaternary Period”. During this time period, permanent ice sheets developed in Antarctica and possibly Greenland. These ice sheets expand and contract in dramatic cycles (“ice ages”) roughly every 100,000 years.",
                "image": {
                  "full": "https://i.imgur.com/vMyIPHW.jpg",
                  "pin": "https://i.imgur.com/dA9gfOu.png",
                  "thumbnail": "https://i.imgur.com/dA9gfOu.png"
                },
                "year": -2588000,
                "readableYear": "-2,588,000",
                "color": "#56B4E9"
              },
              {
                "type": "geological",
                "id": "cardGeo3",
                "uid": 38,
                "index": 5,
                "name": "Last Glacial Maximum",
                "description": "",
                "content": "When the last major ice age reached its peak, a sheet of ice about 2 miles thick covered much of North America. Geologists and climate scientists call that time the “last glacial maximum”. Modern human civilization arose after that ice sheet retreated, during an “interglacial period”.",
                "image": {
                  "full": "https://i.imgur.com/Lobwck7.jpg",
                  "pin": "https://i.imgur.com/T0zcPn4.png",
                  "thumbnail": "https://i.imgur.com/T0zcPn4.png"
                },
                "year": {
                  "earliest": -22018,
                  "latest": -28518,
                  "canon": -22018
                },
                "readableYear": {
                  "earliest": "-26,500",
                  "latest": "-20,000"
                },
                "color": "#56B4E9"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro2",
                "uid": 39,
                "index": 2,
                "name": "Agriculture Invented",
                "description": "",
                "content": "Advancing glaciers ground bedrock to fine powder. When they retreated, they left behind rich soil and networks of rivers and lakes. Some scholars suspect that agriculture was invented as a consequence, leading eventually to the rise of cities and technology. You may be reading this because of ancient climate change!",
                "image": {
                  "full": "https://i.imgur.com/DRFFYyU.jpg",
                  "pin": "https://i.imgur.com/mgSQBvI.png",
                  "thumbnail": "https://i.imgur.com/mgSQBvI.png"
                },
                "year": -11000,
                "readableYear": "-11,000",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro3",
                "uid": 40,
                "index": 3,
                "name": "Rome Founded",
                "description": "",
                "content": "The Roman Empire was the dominant European power of its time. Its legacy endures in the languages and political systems that shape the world to this day. The origins of this empire are shrouded in myth and legend.",
                "image": {
                  "full": "https://i.imgur.com/pY9x5Je.jpg",
                  "pin": "https://i.imgur.com/0reUjIt.png",
                  "thumbnail": "https://i.imgur.com/0reUjIt.png"
                },
                "year": -753,
                "readableYear": "753 BCE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro4",
                "uid": 41,
                "index": 4,
                "name": "Rome Collapses",
                "description": "",
                "content": "The decline of the Roman Empire was gradual, but is commonly assigned to the date when the last Emperor of the Western Roman Empire was overthrown by Germanic conquerors. Regardless, the ebbing of this Empire led to a period of political instability and technological decline in Europe.",
                "image": {
                  "full": "https://i.imgur.com/tyC58xF.jpg",
                  "pin": "https://i.imgur.com/G0yjsQH.png",
                  "thumbnail": "https://i.imgur.com/G0yjsQH.png"
                },
                "year": -476,
                "readableYear": "476 BCE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro5",
                "uid": 42,
                "index": 5,
                "name": "Renaissance",
                "description": "",
                "content": "The Renaissance was a cultural movement in Europe that saw an eruption of creativity in literature, art, religion, politics, and of special interest to us, in astronomy and other branches of science.",
                "image": {
                  "full": "https://i.imgur.com/rfkfiyS.jpg",
                  "pin": "https://i.imgur.com/0OwkMjO.png",
                  "thumbnail": "https://i.imgur.com/0OwkMjO.png"
                },
                "year": 1400,
                "readableYear": "1400 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro6",
                "uid": 43,
                "index": 6,
                "name": "Industrial Revolution",
                "description": "",
                "content": "During the Industrial Revolution, technology was harnessed in ways that transformed daily life around the globe. Average income and human population soared as never before as our energy usage increased.",
                "image": {
                  "full": "https://i.imgur.com/CI1YuLi.jpg",
                  "pin": "https://i.imgur.com/3m9UZBG.png",
                  "thumbnail": "https://i.imgur.com/3m9UZBG.png"
                },
                "year": 1780,
                "readableYear": "1780 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro7",
                "uid": 44,
                "index": 7,
                "name": "First Radio Broadcast",
                "description": "",
                "content": "The first radio broadcast of voice and music probably occurred in Massachusetts, when Reginald Fessenden’s transmission of classical music and a passage from the Bible was heard several hundred miles away.",
                "image": {
                  "full": "https://i.imgur.com/5aZFvM2.jpg",
                  "pin": "https://i.imgur.com/TWTypZI.png",
                  "thumbnail": "https://i.imgur.com/TWTypZI.png"
                },
                "year": 1906,
                "readableYear": "1906 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro9",
                "uid": 45,
                "index": 8,
                "name": "First Satellite",
                "description": "",
                "content": "Launched by the Russians, 𝘚𝘱𝘶𝘵𝘯𝘪𝘬 1 was the first human-made satellite successfully placed in orbit around Earth. It began the Space Race that eventually ended in the first human footsteps on the moon.",
                "image": {
                  "full": "https://i.imgur.com/9GGUbud.png",
                  "pin": "https://i.imgur.com/CwKYuFb.png",
                  "thumbnail": "https://i.imgur.com/CwKYuFb.png"
                },
                "year": 1957,
                "readableYear": "1957 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro10",
                "uid": 46,
                "index": 9,
                "name": "First Human in Space",
                "description": "",
                "content": "Russian cosmonaut Yuri Alekseyevich Gagarin made history as both the first human in space and the first human to orbit Earth. Gagarin completed his first orbit of Earth in 108 minutes aboard the 𝘝𝘰𝘴𝘵𝘰𝘬 1 spacecraft.",
                "image": {
                  "full": "https://i.imgur.com/OLfLlqk.jpg",
                  "pin": "https://i.imgur.com/V7SfLKt.png",
                  "thumbnail": "https://i.imgur.com/V7SfLKt.png"
                },
                "year": 1961,
                "readableYear": "1961 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro8",
                "uid": 47,
                "index": 10,
                "name": "First Human Steps on Extraterrestrial Body",
                "description": "",
                "content": "Neil Armstrong famously took “one small step for man, one giant leap for mankind” when he stepped from the 𝘈𝘱𝘰𝘭𝘭𝘰 11 lunar lander and placed his foot upon the Moon. It was the first footstep of a human being on a celestial body other than Earth.",
                "image": {
                  "full": "https://i.imgur.com/CLKy4it.jpg",
                  "pin": "https://i.imgur.com/g5ISeFy.png",
                  "thumbnail": "https://i.imgur.com/g5ISeFy.png"
                },
                "year": 1969,
                "readableYear": "1969 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro11",
                "uid": 48,
                "index": 11,
                "name": "Arecibo Message Broadcast",
                "description": "",
                "content": "The most powerful broadcast deliberately sent into space was transmitted by the Arecibo radio telescope in Puerto Rico. Sent in the hopes that extraterrestrial intelligence would one day receive and decipher the message, it contained graphic representations of the Arecibo telescope, Earth’s location in the solar system, DNA, a human stick figure, and some biochemicals of Earth’s life forms.",
                "image": {
                  "full": "https://i.imgur.com/zCGbWao.jpg",
                  "pin": "https://i.imgur.com/4dAfNNX.png",
                  "thumbnail": "https://i.imgur.com/4dAfNNX.png"
                },
                "year": 1974,
                "readableYear": "1974 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro12",
                "uid": 49,
                "index": 12,
                "name": "𝘝𝘰𝘺𝘢𝘨𝘦𝘳𝘴 1 and 2 Launched",
                "description": "",
                "content": "𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 and its twin, 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 2, were launched to take advantage of a rare planetary alignment to tour the outer solar system. Though Voyager 1 was launched about two weeks after its twin, it reached Jupiter first. 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 and 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 2 were the first spacecraft to explore the four giant outer planets of our solar system along with 48 of their moons.",
                "image": {
                  "full": "https://i.imgur.com/VFwm5wS.jpg",
                  "pin": "https://i.imgur.com/838h52w.png",
                  "thumbnail": "https://i.imgur.com/838h52w.png"
                },
                "year": 1977,
                "readableYear": "1977 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro13",
                "uid": 50,
                "index": 13,
                "name": "𝘏𝘶𝘣𝘣𝘭𝘦 𝘚𝘱𝘢𝘤𝘦 𝘛𝘦𝘭𝘦𝘴𝘤𝘰𝘱𝘦 Launched",
                "description": "",
                "content": "The 𝘏𝘶𝘣𝘣𝘭𝘦 𝘚𝘱𝘢𝘤𝘦 𝘛𝘦𝘭𝘦𝘴𝘤𝘰𝘱𝘦 was the first major optical telescope placed in space, above the clouds and light pollution that limit the capabilities of Earth-based telescopes. 𝘏𝘶𝘣𝘣𝘭𝘦 has taken breathtaking images of the most distant stars and galaxies and provided data for more than 15,000 scientific papers, greatly advancing our understanding of the universe.",
                "image": {
                  "full": "https://i.imgur.com/NVyhPlC.jpg",
                  "pin": "https://i.imgur.com/ufta0W6.png",
                  "thumbnail": "https://i.imgur.com/ufta0W6.png"
                },
                "year": 1990,
                "readableYear": "1990 CE",
                "color": "#CC79A7"
              },
              {
                "type": "special",
                "id": "cardSpecial1",
                "uid": 51,
                "index": 1,
                "name": "Today",
                "description": "",
                "content": "On this day, we hope you learned many things about the history and future of Earth!",
                "image": {
                  "full": "https://i.imgur.com/4oFKzyl.jpg",
                  "pin": "https://i.imgur.com/oMr0sF3.png",
                  "thumbnail": "https://i.imgur.com/oMr0sF3.png"
                },
                "year": 2018,
                "readableYear": "2018",
                "color": "gold"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro14",
                "uid": 52,
                "index": 14,
                "name": "𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 Left Solar System",
                "description": "",
                "content": "After 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 flew past Saturn’s moon Titan, it headed northward out of the ecliptic plane of the solar system on a path that eventually took it beyond the influence of the solar wind and into the interstellar medium. That milestone occurred when the spacecraft was more than 11 billion miles from Earth. 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 is now the most distant human-made object in the universe and, at a speed of over 38,000 mph, it continues to cover about 330 million miles every year.",
                "image": {
                  "full": "https://i.imgur.com/ryHYIJJ.jpg",
                  "pin": "https://i.imgur.com/uJnls7A.png",
                  "thumbnail": "https://i.imgur.com/uJnls7A.png"
                },
                "year": 2012,
                "readableYear": "2012 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro16",
                "uid": 53,
                "index": 16,
                "name": "Arecibo Message Reaches M13",
                "description": "",
                "content": "The Arecibo message was directed at the M13 star cluster, which resides on the edge of the Milky Way about 25,000 light years from Earth. M13 is a globular cluster containing several hundred thousand stars.",
                "image": {
                  "full": "https://i.imgur.com/JEJbqMw.jpg",
                  "pin": "https://i.imgur.com/uCzNcN4.png",
                  "thumbnail": "https://i.imgur.com/uCzNcN4.png"
                },
                "year": 25000,
                "readableYear": "25,000 CE",
                "color": "#CC79A7"
              },
              {
                "type": "anthropologic",
                "id": "cardAnthro17",
                "uid": 54,
                'index': 17,
                "name": "𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 Reaches Gliese 455",
                "description": "",
                "content": "𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1 will continue its trek through the emptiness of interstellar space until it passes within 1.7 light years of the star Gliese 455, in the constellation of Camelopardis. Because Gliese 455 is also moving toward 𝘝𝘰𝘺𝘢𝘨𝘦𝘳 1, the spacecraft will be just under four light years from Earth when it makes its closest approach to the star.",
                "image": {
                  "full": "https://i.imgur.com/snwHa71.jpg",
                  "pin": "https://i.imgur.com/1HMIyY1.png",
                  "thumbnail": "https://i.imgur.com/1HMIyY1.png"
                },
                "year": 40000,
                "readableYear": "40,000 CE",
                "color": "#CC79A7"
              },
              {
                "type": "biological",
                "id": "cardBio12",
                "uid": 55,
                "index": 12,
                "name": "Biosphere Collapses",
                "description": "",
                "content": "As the Sun ages, it grows brighter. As it grows brighter, Earth grows warmer, which increases the rate at which the weathering of rocks consumes CO₂ in the atmosphere. This very slow process, happening over hundreds of millions of years, will eventually reduce CO₂ in the atmosphere to levels below that needed to sustain photosynthesis. At that point, the biosphere as we know it will collapse.",
                "image": {
                  "full": "https://i.imgur.com/tsG3qHj.jpg",
                  "pin": "https://i.imgur.com/s7vOKE1.png",
                  "thumbnail": "https://i.imgur.com/s7vOKE1.png"
                },
                "year": {
                  "earliest": 899997982,
                  "latest": 1499997982,
                  "canon": 899997982
                },
                "readableYear": {
                  "earliest": "900,000,000",
                  "latest": "1,500,000,000"
                },
                "color": "#009E73"
              },
              {
                "type": "geological",
                "id": "cardCosmo5",
                "uid": 56,
                "index": 6,
                "name": "Evaporation of the Oceans",
                "description": "",
                "content": "Eventually, Earth will be warm enough that large amounts of water will evaporate and rise to the upper atmosphere. There, the H₂O molecules will be broken down by ultraviolet light and the hydrogen atoms will escape to space. Earth will then become a water-free planet, much like modern-day Venus.",
                "image": {
                  "full": "https://i.imgur.com/p4JQJxx.jpg",
                  "pin": "https://i.imgur.com/ZH593b4.png",
                  "thumbnail": "https://i.imgur.com/ZH593b4.png"
                },
                "year": {
                  "earliest": 1499997982,
                  "latest": 1999997982,
                  "canon": 1499997982
                },
                "readableYear": {
                  "earliest": "1,500,000,000",
                  "latest": "2,000,000,000"
                },
                "color": "#56B4E9"
              },
              {
                "type": "cosmic",
                "id": "cardCosmo6",
                "uid": 57,
                "index": 21,
                "name": "Death of the Earth",
                "description": "",
                "content": "The Sun’s energy comes from the conversion of hydrogen to helium by nuclear fusion. In the distant future, the hydrogen will all be gone. At that point, the Sun will swell into a red giant, expanding to engulf Earth’s orbit. That will be a very bad day for anything still living on the planet.",
                "selector": {
                  "timeline": "#visualization",
                  "event": "#card-list",
                  "detail": "#card-detail"
                },
                "image": {
                  "full": "https://i.imgur.com/GHpKZxw.jpg",
                  "pin": "https://i.imgur.com/fgNKcj9.png",
                  "thumbnail": "https://i.imgur.com/fgNKcj9.png"
                },
                "year": 5450000000,
                "readableYear": "5,450,000,000",
                "color": "#FFFFFF"
              },
              {
                "type": "special",
                "id": "cardSpecial2",
                "uid": 58,
                "index": 2,
                "name": "Your Birth",
                "description": "",
                "content": "On this happy day, you arrived as a conscious being on planet Earth. We hope your stay has been pleasant so far, and that you will enjoy many more decades inhabiting this pale blue dot.",
                "image": {
                  "full": "https://i.imgur.com/96ksaff.jpg",
                  "pin": "https://i.imgur.com/9VO61iX.png",
                  "thumbnail": "https://i.imgur.com/9VO61iX.png"
                },
                "year": "special",
                "readableYear": "",
                "color": "gold"
              }
        ]

        for (key in list) {
            item = list [key];

            item.color = config.color [item.type];
            item.uid = Number (key);
            item.selector = {
              timeline: '#visualization',
              event: '#card-list',
              detail: '#card-detail'
            }

            tm.new ('app.sim.timeline.Item', item);
        }

        $ ('.ui.accordion').accordion ('refresh')
    }

})
window.loadData
