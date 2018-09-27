tm.add ('app.sim.atmos.quiz.GasData', function (o, p, d) {
    o.setup = function (config) {
        var data, item, key, list;

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
                molecule: 'N2',
                label: 'N<sub>2</sub>',
                color: 'red',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.N2').getGasData ()
            },
            {
                name: 'Nitrous Oxide',
                molecule: 'N2O',
                label: 'N<sub>₂</sub>O',
                color: 'gold',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.N2o').getGasData ()
            },
            {
                name: 'Nitric Oxide',
                molecule: 'NO',
                label: 'NO',
                color: 'cyan',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.No').getGasData ()
            },
            {
                name: 'Nitrogen Dioxide',
                molecule: 'NO2',
                label: 'NO<sub>2</sub>',
                color: 'green',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.No2').getGasData ()
            },
            {
                name: 'Ammonia',
                molecule: 'NH3',
                label: 'NH<sub>3</sub>',
                color: 'orange',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Nh3').getGasData ()
            },
            {
                name: 'Oxygen',
                molecule: 'O2',
                label: 'O<sub>2</sub>',
                color: 'purple',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.O2').getGasData ()
            },
            {
                name: 'Ozone',
                molecule: 'O3',
                label: 'O<sub>3</sub>',
                color: 'navy',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.O3').getGasData ()
            },
            {
                name: 'Carbon Monoxide',
                molecule: 'CO',
                label: 'CO',
                color: 'tan',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Co').getGasData ()
            },
            {
                name: 'Carbon Dioxide',
                molecule: 'CO2',
                label: 'CO<sub>2</sub>',
                color: 'crimson',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Co2').getGasData ()
            },
            {
                name: 'Methane',
                molecule: 'CH4',
                label: 'CH<sub>4</sub>',
                color: 'darkgreen',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.Ch4').getGasData ()
            },
            {
                name: 'Water',
                molecule: 'H2O',
                label: 'H<sub>4</sub>O',
                color: 'lightblue',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.H2o').getGasData ()
            },
            {
                name: 'Hydrogen Sulfide',
                molecule: 'H2S',
                label: 'H<sub>2</sub>S',
                color: 'brown',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.H2s').getGasData ()
            },
            {
                name: 'Sulfur Dioxide',
                molecule: 'SO2',
                label: 'SO<sub>2</sub>',
                color: 'pink',
                // wavelengthTransmission: tm.new ('app.sim.atmos.data.gas.So2').getGasData ()
            },
            {
                name: 'Helium',
                molecule: 'He',
                label: 'He',
                color: 'yellow',
                // wavelengthTransmission: createData ()
            },
            {
                name: 'Neon',
                molecule: 'Ne',
                label: 'Ne',
                color: 'hotpink',
                // wavelengthTransmission: createData ()
            },
            {
                name: 'Argon',
                molecule: 'Ar',
                label: 'Ar',
                color: 'darkblue',
                // wavelengthTransmission: createData ()
            },
            {
                name: 'Krypton',
                molecule: 'Kr',
                label: 'Kr',
                color: 'indigo',
                // wavelengthTransmission: createData ()
            },
            {
                name: 'Xenon',
                molecule: 'Xe',
                label: 'Xe',
                color: 'teal',
                // wavelengthTransmission: createData ()
            },
            {
                name: 'Hydrogen',
                molecule: 'H2',
                label: 'H<sub>2</sub>',
                color: 'olive',
                // wavelengthTransmission: createData ()
            },
        ]

        var counter, counterMax, currentButtonList

        currentButtonList = 1;
        counter = 0;
        counterMax = 7;

        d.gasConfigList = []

        list = data;
        for (key in list) {
            item = list [key];

            item.name = item.molecule

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

            d.gasConfigList.push (item)
        }
    }

    o.getGasConfigList = function () {
        return d.gasConfigList;
    }
})
