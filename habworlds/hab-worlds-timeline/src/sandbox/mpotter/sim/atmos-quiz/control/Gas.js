tm.add ('app.sim.atmos.quiz.control.Gas', ['app.sim.atmos.quiz.control.Base'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;


        d.gasConfigList = tm.new ('app.sim.atmos.quiz.GasData').getGasConfigList ();
        d.selector = config.selector;
        d.gasRepo = {}

        // Create a button for every gas
        list = d.gasConfigList
        for (key in list) {
            item = list [key];

            item.selector = d.selector
            item.onClick = o.gasSelected

            d.gasRepo [item.name] = tm.new ('app.sim.atmos.quiz.input.Gas', item)
        }

        if (config.onChange) {
            d.onChange = config.onChange;
        }
    }

    o.gasSelected = function (data) {
        if (d.onChange) { d.onChange (data) }
    }
})
