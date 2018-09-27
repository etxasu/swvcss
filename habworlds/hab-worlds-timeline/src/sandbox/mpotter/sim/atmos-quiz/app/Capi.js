// Ties elements created in base together through listeners
'use strict'
tm.add ('app.sim.atmos.quiz.app.Capi', ['app.sim.atmos.quiz.app.Quiz'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;

        // Create gas data
        d.teacherGasRepo = {
            'CH4': tm.new ('app.sim.atmos.data.gas.Ch4', { color: '#e6c35c', name: 'CH4' }),
            'CO': tm.new ('app.sim.atmos.data.gas.Co', { color: '#dba93a', name: 'CO' }),
            'CO2': tm.new ('app.sim.atmos.data.gas.Co2', { color: '#e09b49', name: 'CO2' }),
            'H2': tm.new ('app.sim.atmos.data.gas.H2', { color: '#61cff2', name: 'H2' }),
            'H2O': tm.new ('app.sim.atmos.data.gas.H2o', { color: '#61b1f2', name: 'H2O' }),
            'H2S': tm.new ('app.sim.atmos.data.gas.H2s', { color: '#6181f2', name: 'H2S' }),
            'N2': tm.new ('app.sim.atmos.data.gas.N2', { color: '#f2616e', name: 'N2' }),
            'N2O': tm.new ('app.sim.atmos.data.gas.N2o', { color: '#d94d88', name: 'N2O' }),
            'NH3': tm.new ('app.sim.atmos.data.gas.Nh3', { color: '#f261a7', name: 'NH3' }),
            'NO': tm.new ('app.sim.atmos.data.gas.No', { color: '#c13057', name: 'NO' }),
            'NO2': tm.new ('app.sim.atmos.data.gas.No2', { color: '#c72752', name: 'NO2' }),
            'O2': tm.new ('app.sim.atmos.data.gas.O2', { color: '#c2d3e0', name: 'O2' }),
            'O3': tm.new ('app.sim.atmos.data.gas.O3', { color: '#aab3b3', name: 'O3' }),
            'SO2': tm.new ('app.sim.atmos.data.gas.So2', { color: '#4bb05b', name: 'SO3' }),

            // Noble Gases
            'He': tm.new ('app.sim.atmos.data.Gas', { name: 'Helium', molecule: 'He' }),
            'Ne': tm.new ('app.sim.atmos.data.Gas', { name: 'Neon', molecule: 'Ne' }),
            'Ar': tm.new ('app.sim.atmos.data.Gas', { name: 'Argon', molecule: 'Ar' }),
            'Kr': tm.new ('app.sim.atmos.data.Gas', { name: 'Krypton', molecule: 'Kr' }),
            'Xe': tm.new ('app.sim.atmos.data.Gas', { name: 'Xenon', molecule: 'Xe' }),
        }

        d.teacherGasRepo ['He'].generateGasData ();
        d.teacherGasRepo ['Ne'].generateGasData ();
        d.teacherGasRepo ['Ar'].generateGasData ();
        d.teacherGasRepo ['Kr'].generateGasData ();
        d.teacherGasRepo ['Xe'].generateGasData ();

        list = d.teacherGasRepo
        for (key in list) {
            item = list [key]

            item.setCapiListener (o.onCapiChange)
            item.setPressure (0.01)
        }

    }

    o.onCapiChange = function (data) {
        var gas, info;

        gas = d.teacherGasRepo [data.name];
        info = data.info;

        switch (info.key) {
            case 'selected':
                var item, key, list;

                list = d.teacherGasRepo
                for (key in list) {
                    item = list [key];

                    item.setActive (false)
                }

                gas.setActive (info.value);
                break;
            case 'pressure':
                gas.setPressure (info.value)
                break;
        }

        o.plotTeacherData ();
    }

    o.plotTeacherData = function (data) {

        d.graph.plotData ({
            displayName: 'teacher graph',
            name: 'gas',
            color: 'rgba(255,255,255,1)',
            gasRepo: d.teacherGasRepo,
            connectLines: false,
            owner: o,
            base: d [d.mode + 'Base']
        })
    }
})
