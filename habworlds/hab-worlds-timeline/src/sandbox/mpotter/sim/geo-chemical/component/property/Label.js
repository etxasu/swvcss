tm.add ('component.property.Label', ['component.property.Unit'], function (o, p, d) {
    o.setup = function (config) {
        d.id = config.id;
        d.selector = config.selector;
        d.title = config.title;

        d.titleId = d.id + '-title'
        d.valueId = d.id + '-value'

        tm.html ('component.property.Label', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                titleId: d.titleId,
                valueId: d.valueId,
                title: d.title,
                value: d.value
            }
        })

        d.dom = $ ('#' + d.id);
        d.valueDom = $ ('#' + d.valueId)
    }

    o.override ({
        setValue: function (original, value) {
            original (value);
            d.valueDom.html (value)
        }
    })
})
