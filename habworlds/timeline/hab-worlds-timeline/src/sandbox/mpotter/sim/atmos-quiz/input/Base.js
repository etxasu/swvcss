tm.add ('app.sim.atmos.quiz.input.Base', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function () {
        d.eventList = []
    }

    o.addEventListener = function (data) {
        d.eventList.push (data)
    }

    o.callEventListeners = function (data) {
        var info, item, list, key;

        info = data.data;

        list = d.eventList;
        for (key in list) {
            item = list [key];

            if (item.name === data.name && item.listener) {
                item.listener (info)
            }
        }
    }
})
