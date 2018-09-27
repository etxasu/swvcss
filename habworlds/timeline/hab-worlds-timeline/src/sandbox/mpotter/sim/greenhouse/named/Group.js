tm.add ('sim.greenhouse.named.Group', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        d.id = config.id;
        d.title = config.title
        d.selector = config.selector;

        tm.html ('sim.greenhouse.named.Group', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                title: d.title
            }
        })

        d.dom = $ ('#' + d.id);
        d.contentDom = $ ('#' + d.id + ' > div.content');
    }

    o.addContent = function (content) {
        d.contentDom.append (content);
    }

    o.addContentList = function (list) {
        var item, key;

        for (key in list) {
            item = list [key];

            o.addContent (item);
        }
    }
})
