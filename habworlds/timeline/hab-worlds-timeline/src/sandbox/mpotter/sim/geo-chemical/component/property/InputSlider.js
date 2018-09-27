tm.add ('component.property.input.Slider', ['component.property.Unit'], function (o, p, d) {
    o.setup = function (config) {
        if (config.enabled === undefined) { config.enabled = true }

        // If no center value is defined, assume the middle.
        if (config.mid === undefined) { config.mid = (config.max - config.min) / 2 + (config.min / 2) }
        if (config.value === undefined) { config.value = config.min }

        d.id = config.id;
        d.selector = config.selector;
        d.max = config.max;
        d.min = config.min;
        d.mid = config.mid;
        d.title = config.title;
        d.step = config.step;
        d.decimals = config.decimals
        d.value = config.value
        d.name = config.name;

        d.inputId = d.id + '-input';
        d.sliderId = d.id + '-slider';

        tm.html ('component.property.input.Slider', {
            selector: d.selector,
            append: true,
            data: {
                title: d.title,
                id: d.id,
                inputId: d.inputId,
                sliderId: d.sliderId,
                max: d.max,
                min: d.min,
                step: d.step,
            }
        })

        d.dom = $ ('#' + d.id);
        d.inputDom = $ ('#' + d.inputId);
        d.sliderDom = $ ('#' + d.sliderId);

        d.inputDom.on ('input', function (event) { o.adjustSlider () })
        d.sliderDom.on ('input', function (event) { o.adjustInput () })

        d.inputDom.val (d.min);
        d.sliderDom.val (d.min);

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

            if (d.decimals !== undefined) {
                d.value = Number (d.value.toFixed (d.decimals))
            }

            // console.log ('%', percent.toFixed (3), ' = ', d.value)
            d.inputDom.val (d.value);
        }
        else {
            // d.sliderDom.val (d.value);
        }

        data = {
            name: d.name,
            value: d.value,
            coreValue: d.value / d.exchangeTable [d.activeUnit],
            percent: (d.value - d.min) / (d.max - d.min)
        }

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
        }
        else {
            d.dom.addClass ('disabled')
        }

        d.enabled = enabled;
    }

    o.setVisible = function (visible) {
        if (visible) {
            d.dom.removeClass ('hide')
        }
        else {
            d.dom.addClass ('hide')
        }

        d.visible = visible;
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
