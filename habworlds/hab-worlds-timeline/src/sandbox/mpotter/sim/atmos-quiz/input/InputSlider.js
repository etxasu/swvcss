tm.add ('sim.greenhouse.property.input.Slider', ['sim.greenhouse.property.Unit'], function (o, p, d) {
    o.setup = function (config) {
        if (config.enabled === undefined) { config.enabled = true }
        if (config.mid === undefined) { config.mid = (config.max - config.min) / 2 + (config.min / 2) }

        d.id = config.id;
        d.selector = config.selector;
        d.max = config.max;
        d.min = config.min;
        d.mid = config.mid;
        d.title = config.title;
        d.step = config.step;
        d.maxValue = config.max;
        d.minValue = config.min;

        d.inputId = d.id + '-input';
        d.sliderId = d.id + '-slider';

        tm.html ('sim.greenhouse.property.input.Slider', {
            selector: d.selector,
            append: true,
            data: {
                title: d.title,
                id: d.id,
                inputId: d.inputId,
                sliderId: d.sliderId,
                max: d.max,
                min: d.min,
                step: d.step
            }
        })

        d.dom = $ ('#' + d.id);
        d.inputDom = $ ('#' + d.inputId);
        d.sliderDom = $ ('#' + d.sliderId);

        d.inputDom.on ('input', function (event) {
            var value;

            value = Number (d.inputDom.val ())

            o.validState (true)

            if (o.checkValidValue (value)) {
                o.adjustSlider ()
            } else { o.validState (false) }
        })
        d.sliderDom.on ('input', function (event) {
            var value;

            value = Number (d.inputDom.val ())

            o.validState (true)

            if (o.checkValidValue (value)) {
                o.adjustInput ()
            } else { o.validState (false) }
        })

        d.inputDom.val (d.value);
        d.sliderDom.val (d.value);

        $ (d.selector).append (d.dom);

        d.eventList = [];

        d.enabled = config.enabled;

        if (config.onChange) {
            d.eventList.push (config.onChange);
        }
    }

    o.adjustInput = function () {
        if (d.enabled) {
            d.value = Number (d.sliderDom.val ());
            o.onChange ({slider: true});
        }
    }

    o.adjustSlider = function () {
        if (d.enabled) {
            d.value = Number (d.inputDom.val ());
            o.onChange ();
        }
    }

    o.checkValidValue = function (value) {
        var valid;

        if (d.minValue !== undefined && d.maxValue !== undefined) {
            if (value >= d.minValue && value <= d.maxValue) { valid = true }
        } else { valid = true }

        if (valid) { return true }
        return false
    }

    o.getValueData = function () {
        return {
            value: d.value,
            coreValue: d.value / d.exchangeTable [d.activeUnit],
            percent: (d.value - d.min) / (d.max - d.min)
        }
    }

    o.onChange = function (data) {
        var data, item, key, list, max, min, percent;

        if (data && data.slider) {
            percent = (d.value - d.min) / (d.max - d.min)

            // Allows for more precision on sliders with large values.
            if (percent <= 0.5) {
                percent *= 2;
                min = d.min;
                max = d.mid;
            }
            else {
                percent -= 0.5;
                percent *= 2;
                min = d.mid;
                max = d.max;
            }

            d.value = (max - min) * percent + min;
            d.value = Number (d.value.toFixed (3))

            // console.log ('%', percent.toFixed (3), ' = ', d.value)
            d.inputDom.val (d.value);
        }
        else {
            // d.sliderDom.val (d.value);
        }

        data = o.getValueData ();

        if (d.enabled) {
            list = d.eventList;
            for (key in list) {
                item = list [key];

                if (item) {
                    item (data)
                }
            }
        }
    }

    o.setEnabled = function (enabled) {
        if (enabled) {
            d.dom.removeClass ('disabled')
            d.sliderDom [0].disabled = false;
        }
        else {
            d.dom.addClass ('disabled')
            d.sliderDom [0].disabled = true;
        }

        d.enabled = enabled;
    }

    o.validState = function (state) {
        if (state) { d.inputDom.removeClass ('invalid') }
        else { d.inputDom.addClass ('invalid') }
    }

    o.override ({
        setValue: function (original, value) {
            if (d.enabled) {
                original (value);

                d.inputDom.val (value)
                d.sliderDom.val (value)

                o.onChange ();
            }
        }
    })
})
