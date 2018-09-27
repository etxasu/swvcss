tm.add ('app.sim.atmos.GasData', function (o, p, d) {
    o.setup = function (config) {
        var color, data, image, item, key, list, path;

        path = '/src/sandbox/mpotter/sim/atmos/image'
        image = {
            carbon: path + '/carbon.png',
            nitrogen: path + '/nitrogen.png',
            hydrogen: path + '/hydrogen.png',
            oxygen: path + '/oxygen.png',
            sulfur: path + '/sulfur.png',
            argon: path + '/argon.png',
            helium: path + '/helium.png',
            krypton: path + '/krypton.png',
            xenon: path + '/xenon.png',
            neon: path + '/neon.png'
        }

        var commonRadius

        commonRadius = 25;
        nobleRadius = 35;

        radius = {
            carbon: commonRadius,
            nitrogen: commonRadius,
            hydrogen: 15,
            oxygen: commonRadius,
            sulfur: commonRadius,
            argon: nobleRadius,
            helium: nobleRadius,
            krypton: nobleRadius,
            xenon: nobleRadius,
            neon: nobleRadius
        }

        color = {
            carbon: '#494949',
            nitrogen: '#2B307C',
            oxygen: '#8C2E2E',
            sulfur: '#FAE100',
            noble: '#71CDDC'
        }

        function createData () {
            var data, end, int;

            data = {}
            end = 50;
            for (int = 0; int <= end; int++) {
                data [int.toString ()] = {
                    transmission: 100
                }
            }

            return data
        }

        data = [
            {
                name: 'Nitrogen',
                molecule: 'N₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                // This is Ultraviolet.
                //  Assuming that this is the longer-end of wavelength that causes nitrogren to enter photolysis
                //  So I now know that 0.12699 == 445 nm (nanometer)
                photolysisWavelength: 0.12699,
                mysteryPressure: 0,
                selected: true,
                color: color.nitrogen,
                primaryParticle: {
                    color: 'red',
                    label: 'N',
                    radius: radius.nitrogen,
                    image: image.nitrogen
                },
                subParticleList: [
                    {
                        color: 'red',
                        x: radius.nitrogen,
                        y: 0,
                        label: 'N',
                        radius: radius.nitrogen,
                        image: image.nitrogen
                    }
                ],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Nitrous Oxide',
                molecule: 'N₂O',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                // This translates to 872 == infrared?
                // Maybe, my method of translating these decimals may be off...
                // It'll have to do for now, just need to figure out the viewable color spectrum
                // and where it falls between 0.127 and 0.248
                // since 455 to 780 nm is the visible spectrum
                photolysisWavelength: 0.24885,
                mysteryPressure: 0,
                selected: true,
                color: color.nitrogen,
                primaryParticle: {
                    color: 'gold',
                    label: 'O',
                    radius: radius.oxygen,
                    image: image.oxygen
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'N',
                        radius: radius.nitrogen / 1.4,
                        x: radius.oxygen / 1.3,
                        y: 12,
                        image: image.nitrogen
                    },
                    {
                        color: 'white',
                        label: 'N',
                        radius: radius.nitrogen / 1.4,
                        x: -radius.oxygen / 1.3,
                        y: 12,
                        image: image.nitrogen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.N2o').getGasData ()
            },
            {
                name: 'Nitric Oxide',
                molecule: 'NO',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.19707,
                mysteryPressure: 0,
                selected: true,
                color: color.nitrogen,
                primaryParticle: {
                    color: 'cyan',
                    label: 'N',
                    radius: radius.nitrogen,
                    image: image.nitrogen
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen,
                        x: radius.nitrogen,
                        y: 0,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.No').getGasData ()
            },
            {
                name: 'Nitrogen Dioxide',
                molecule: 'NO₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.39221,
                mysteryPressure: 0,
                selected: true,
                color: color.nitrogen,
                primaryParticle: {
                    color: 'green',
                    label: 'N',
                    radius: radius.nitrogen,
                    image: image.nitrogen
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen,
                        x: radius.nitrogen,
                        y: radius.nitrogen,
                        image: image.oxygen
                    },
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen,
                        x: -radius.nitrogen,
                        y: 0,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.No2').getGasData ()
            },
            {
                name: 'Ammonia',
                molecule: 'NH₃',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.275,
                mysteryPressure: 0,
                selected: true,
                color: color.nitrogen,
                primaryParticle: {
                    color: 'orange',
                    label: 'N',
                    radius: radius.nitrogen,
                    image: image.nitrogen
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: 0,
                        y: radius.nitrogen,
                        image: image.hydrogen
                    },
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: radius.nitrogen,
                        y: 0,
                        image: image.hydrogen
                    },
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: -radius.nitrogen,
                        y: 0,
                        image: image.hydrogen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Nh3').getGasData ()
            },
            {
                name: 'Oxygen',
                molecule: 'O₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.24215,
                mysteryPressure: 0,
                selected: true,
                color: color.oxygen,
                primaryParticle: {
                    color: 'purple',
                    label: 'O',
                    radius: radius.oxygen,
                    image: image.oxygen
                },
                subParticleList: [
                    {
                        color: 'purple',
                        label: 'O',
                        radius: radius.oxygen,
                        x: radius.oxygen / 2,
                        y: radius.oxygen / 2,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.O2').getGasData ()
            },
            {
                name: 'Ozone',
                molecule: 'O₃',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.32864,
                mysteryPressure: 0,
                selected: true,
                color: color.oxygen,
                primaryParticle: {
                    color: 'navy',
                    label: 'O',
                    radius: radius.oxygen,
                    image: image.oxygen
                },
                subParticleList: [
                    {
                        color: 'navy',
                        label: 'O',
                        radius: radius.oxygen,
                        x: -radius.oxygen / 1.7,
                        y: radius.oxygen / 1.3,
                        image: image.oxygen
                    },
                    {
                        color: 'navy',
                        label: 'O',
                        radius: radius.oxygen,
                        x: radius.oxygen / 1.7,
                        y: radius.oxygen / 1.3,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.O3').getGasData ()
            },
            {
                name: 'Water',
                molecule: 'H₂O',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.23987,
                mysteryPressure: 0,
                selected: true,
                color: color.oxygen,
                primaryParticle: {
                    color: 'white',
                    label: 'O',
                    radius: radius.oxygen,
                    image: image.oxygen
                },
                subParticleList: [
                    {
                        color: 'lightblue',
                        label: 'H',
                        radius: radius.hydrogen /1.5,
                        x: radius.oxygen / 1.5,
                        y: radius.oxygen / 2,
                        image: image.hydrogen
                    },
                    {
                        color: 'lightblue',
                        label: 'H',
                        radius: radius.hydrogen / 1.5,
                        x: -radius.oxygen / 1.5,
                        y: radius.oxygen / 2,
                        image: image.hydrogen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.H2o').getGasData ()
            },
            {
                name: 'Carbon Monoxide',
                molecule: 'CO',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.11159000000000001,
                mysteryPressure: 0,
                selected: true,
                color: color.carbon,
                primaryParticle: {
                    color: 'tan',
                    label: 'C',
                    radius: radius.carbon,
                    image: image.carbon
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen,
                        x: radius.carbon,
                        y: 0,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Co').getGasData ()
            },
            {
                name: 'Carbon Dioxide',
                molecule: 'CO₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.22477,
                mysteryPressure: 0,
                selected: true,
                color: color.carbon,
                primaryParticle: {
                    color: 'crimson',
                    label: 'C',
                    radius: radius.carbon,
                    image: image.carbon
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen/1.5,
                        x: radius.carbon/1.1,
                        y: 0,
                        image: image.oxygen
                    },
                    {
                        color: 'white',
                        label: 'O',
                        radius: radius.oxygen/1.5,
                        x: -radius.carbon/1.1,
                        y: 0,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Co2').getGasData ()
            },
            {
                name: 'Methane',
                molecule: 'CH₄',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.27755,
                mysteryPressure: 0,
                selected: true,
                color: color.carbon,
                primaryParticle: {
                    color: 'darkgreen',
                    label: 'C',
                    radius: radius.carbon,
                    image: image.carbon
                },
                subParticleList: [
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: radius.carbon,
                        y: radius.carbon/3,
                        image: image.hydrogen
                    },
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: -radius.carbon,
                        y: radius.carbon/3,
                        image: image.hydrogen
                    },
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: 0,
                        y: -radius.carbon,
                        image: image.hydrogen
                    },
                    {
                        color: 'white',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: 0,
                        y: radius.carbon,
                        image: image.hydrogen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Ch4').getGasData ()
            },
            {
                name: 'Hydrogen Sulfide',
                molecule: 'H₂S',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.31397,
                mysteryPressure: 0,
                selected: true,
                color: color.sulfur,
                primaryParticle: {
                    color: 'white',
                    label: 'S',
                    radius: radius.sulfur,
                    image: image.sulfur
                },
                subParticleList: [
                    {
                        color: 'brown',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: radius.sulfur / 1.5,
                        y: -radius.sulfur / 1.5,
                        image: image.hydrogen
                    },
                    {
                        color: 'brown',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: -radius.sulfur / 1.5,
                        y: -radius.sulfur / 1.5,
                        image: image.hydrogen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.H2s').getGasData ()
            },
            {
                name: 'Sulfur Dioxide',
                molecule: 'SO₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.2171,
                mysteryPressure: 0,
                selected: true,
                color: color.sulfur,
                primaryParticle: {
                    color: 'white',
                    label: 'S',
                    radius: radius.sulfur,
                    image: image.sulfur
                },
                subParticleList: [
                    {
                        color: 'pink',
                        label: 'O',
                        radius: radius.oxygen /1.5,
                        x: radius.sulfur / 1.5,
                        y: -radius.sulfur / 1.5,
                        image: image.oxygen
                    },
                    {
                        color: 'pink',
                        label: 'O',
                        radius: radius.oxygen /1.5,
                        x: -radius.sulfur / 1.5,
                        y: -radius.sulfur / 1.5,
                        image: image.oxygen
                    },
                ],
                wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.So2').getGasData ()
            },
            {
                name: 'Helium',
                molecule: 'He',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: -0.001,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'yellow',
                    label: 'He',
                    radius: radius.helium,
                    image: image.helium
                },
                subParticleList: [],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Neon',
                molecule: 'Ne',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: -0.001,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'hotpink',
                    label: 'Ne',
                    radius: radius.neon,
                    image: image.neon
                },
                subParticleList: [],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Argon',
                molecule: 'Ar',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: -0.001,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'darkblue',
                    label: 'Ar',
                    radius: radius.argon,
                    image: image.argon
                },
                subParticleList: [],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Krypton',
                molecule: 'Kr',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: -0.001,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'indigo',
                    label: 'Kr',
                    radius: radius.krypton,
                    image: image.krypton
                },
                subParticleList: [],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Xenon',
                molecule: 'Xe',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: -0.001,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'teal',
                    label: 'Xe',
                    radius: radius.xenon,
                    image: image.xenon
                },
                subParticleList: [],
                wavelengthTransmission: createData ()
            },
            {
                name: 'Hydrogen',
                molecule: 'H₂',
                // Number of Particles
                numParticles: 10000000000000,
                // Partial Pressure
                partPressure: 3.721142306301964e-7,
                photolysisWavelength: 0.27437,
                mysteryPressure: 0,
                selected: true,
                color: color.noble,
                primaryParticle: {
                    color: 'olive',
                    label: 'H',
                    radius: radius.hydrogen,
                    image: image.hydrogen
                },
                subParticleList: [
                    {
                        color: 'olive',
                        label: 'H',
                        radius: radius.hydrogen,
                        x: radius.hydrogen,
                        y: 0,
                        image: image.hydrogen
                    },
                ],
                wavelengthTransmission: createData ()
            },
        ]

        var counter, counterMax, currentButtonList

        currentButtonList = 1;
        counter = 0;
        counterMax = 7;

        list = data;
        for (key in list) {
            item = list [key];

            counter++
            if (counter >= counterMax) { currentButtonList++; counter = 0 }

            item.selector = {
                container: '#gas-button-list-' + currentButtonList,
                select: '#gas-select',
                objectSetting: {
                    totalPressure: '#total-pressure',
                    partPressure: '#partial-pressure-value',
                    numParticle: '#num-particles'
                }
            }

            item.metaSimModel = config.metaSimModel;
            item.uid = Number (key);

            tm.new ('app.sim.atmos.Gas', item)
        }
    }
})
