'use strict'
// Responsible for plotting and managing data
tm.add ('app.sim.atmos.graph.Data', ['app.sim.atmos.graph.Base'], function (o, p, d) {
    o.setup = function () {
        d.mouseGuide = tm.new ('tm.svg.Box', {
            width: 3,
            height: d.graphArea.distance.topToBottom,
            brush: {
                color: 'white',
                line: {
                    color: 'transparent',
                    width: 0
                }
            }
        })

        o.hideWavelengthGuide ();

        $ (d.mouseGuide.getDom ()).css ({ 'pointer-events': 'none' })

        d.svg.add (d.mouseGuide)
    }

    o.highlightData = function (name) {
        var item, key, list, parent;

        list = d.dataLine
        for (key in list) {
            item = list [key]

            if (key != name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = 'grey'
                    subItem.getDom ().style.stroke = 'grey'
                }
                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = 'transparent'
                    subItem.getDom ().style.stroke = 'transparent'
                }
            }
            else if (key == name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    // Move data to front
                    parent = subItem.getDom ().parentNode
                    parent.removeChild (subItem.getDom ())
                    parent.append (subItem.getDom ())
                }

                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    // Move data to front
                    parent = subItem.getDom ().parentNode
                    parent.removeChild (subItem.getDom ())
                    parent.append (subItem.getDom ())
                }
            }
        }
    }

    o.hideWavelengthGuide = function () { d.mouseGuide.getDom ().classList.add ('hide') }
    o.showWavelengthGuide = function () { d.mouseGuide.getDom ().classList.remove ('hide') }

    o.updateWavelengthGuide = function () {
        var x;

        if (!d.container.hasClass ('hide')) {
            x = o.findXOfValue (window.chamber.getWavelength ())

            if (x === false) { x = d.width }
            else if (x < 0) { x = 0 }

            d.mouseGuide.moveTo (x + d.graphArea.left, d.graphArea.top, 0, true)

            d.svg.getDom ().removeChild (d.mouseGuide.getDom ())
            d.svg.getDom ().appendChild (d.mouseGuide.getDom ())
        }
    }

    o.plotData = function (data) {
        var circle, item, key, list, nextItem, segment, yPos;

        if (!document.querySelector ( d.selector.container ).classList.contains ('hide')) {
            if (!data.name) { data.name = ' ' }
            if (!data.color) { data.color = 'lightblue' }
            if (!data.owner) { data.owner = window.gasRepo [data.name] }
            if (!d.dataLine [data.name]) {
                d.dataLine [data.name] = {
                    segmentList: [],
                    circleList: [],
                    owner: data.owner,
                    name: data.name,
                    displayName: data.displayName,
                    color: data.color,
                }
            }

            if (d.dataLine [data.name].segmentList.length) {
                // console.log (d.dataLine [data.name])
                o.removeData (data);
            }

            d.dataLine [data.name].active = true

            // console.log ('Plotting:', data)

            list = data.dataPointList;
            // list = d.dataPointList
            for (key in list) {
                key = Number (key);
                item = list [key];
                nextItem = list [key + 1]

                if (!nextItem) { nextItem = item}

                // console.log ('plotting', item)
                if (item.base == d.graphArea.top) {
                    if ((item.y - d.graphArea.top) < 3) { yPos = 3 + d.graphArea.top }
                    else { yPos = item.y + d.graphArea.top }
                }
                else {
                    yPos = item.base - item.y
                    if (yPos >= d.graphArea.bottom) { yPos = d.graphArea.bottom - 3 }
                }

                // Use current corrdinate and next coordiante to draw a line
                segment = tm.new ('tm.svg.Line', {
                    start: {
                        x: item.x + d.graphArea.left,
                        y: yPos,
                    },
                    end: {
                        // Connects dots to each other
                        // x: nextItem.x + d.graphArea.left,
                        // y: nextItem.y + d.graphArea.top,

                        // Connects dots to top of graph
                        x: item.x + d.graphArea.left,
                        y: item.base,
                    },
                    brush: {
                        color: data.color,
                        line: {
                            width: 2,
                            color: data.color
                        }
                    }
                })

                circle = tm.new ('tm.svg.Circle', {
                    x: item.x + d.graphArea.left,
                    y: item.base,
                    radius: 6,
                    brush: {
                        color: 'transparent',
                        line: {
                            width: 2,
                            color: 'transparent'
                        }
                    }
                })

                circle.getDom ().name = data.name;
                circle.getDom () ['data-displayName'] = data.displayName;
                circle.getDom () ['data-pos'] = item.y;
                circle.getDom () ['wavelength'] = item.wavelength;

                segment.getDom ().name = data.name;
                segment.getDom () ['data-displayName'] = data.displayName;
                segment.getDom () ['data-pos'] = item.y;
                segment.getDom () ['wavelength'] = item.wavelength;

                segment.getDom () ['data-circle'] = circle.getDom ();
                circle.getDom () ['data-segment'] = segment.getDom ();


                // Add a mouseover listener
                // segment.getDom ().onmouseover = function (event) {
                //     o.handleMouseOver (event, this, this ['data-circle'])
                // }
                // segment.getDom ().onmouseleave = function (event) {
                //     o.unhighlightData (this.name);
                // }
                //
                // // Add a mouseover listener
                // circle.getDom ().onmouseover = function (event) {
                //     o.handleMouseOver (event, this, this ['data-segment'])
                // }
                // circle.getDom ().onmouseleave = function (event) {
                //     o.unhighlightData (this.name);
                // }

                // Add it to the dataLine list
                d.dataLine [data.name].segmentList.push (segment)
                d.dataLine [data.name].circleList.push (circle)

                // Add line to svg
                d.svg.add (segment)
                d.svg.add (circle)
            }
        }
    }

    o.handleMouseOver = function (event, dom, otherDom) {
        var name, percent, target;

        target = d.svg.getDom ().getBoundingClientRect ();
        name = dom ['data-displayName'];

        // percent = (target.top - event.clientY) + (d.graphArea.1distance.topToBottom + d.padding.top);
        percent = d.graphArea.distance.topToBottom - dom ['data-pos'];
        percent = Math.round (percent * 1000);
        percent /= 1000;
        percent = percent / d.graphArea.distance.topToBottom;
        percent *= 10000
        percent = Math.round (percent) / 100;

        window.selectedData = {
            name: name,
            wavelength: dom ['wavelength'],
            transmission: percent
        }

        dom.style.stroke = 'white'
        otherDom.style.stroke = 'white'

        o.highlightData (dom.name);
    }

    o.removeData = function (data) {
        var item, key, list, subKey;

        // console.log (data);
        // console.log (d.dataLine);
        // console.log (d.dataLine [data.name]);

        // Making sure this graph has even gotten this data in the first place
        if (d.dataLine && d.dataLine [data.name]) {
            d.dataLine [data.name].active = false

            list = d.dataLine [data.name].segmentList;
            for (key in list) {
                item = list [key];

                item.getDom ().parentNode.removeChild (item.getDom ())

                for (subKey in item) {
                    delete item [subKey]
                }

                delete d.dataLine [data.name].segmentList [key]
            }

            list = d.dataLine [data.name].circleList;
            for (key in list) {
                item = list [key];

                item.getDom ().parentNode.removeChild (item.getDom ())

                for (subKey in item) {
                    delete item [subKey]
                }

                delete d.dataLine [data.name].circleList [key]
            }

            d.dataLine [data.name] = {
                circleList: [],
                segmentList: [],
                owner: d.dataLine [data.name].owner,
                color: d.dataLine [data.name].color,
                name: d.dataLine [data.name].name,
                displayName: d.dataLine [data.name].displayName,
            }
        }
    }

    o.unhighlightData = function () {
        var item, key, list;

        list = d.dataLine
        for (key in list) {
            item = list [key]

            if (key != name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = item.color;
                    subItem.getDom ().style.stroke = item.color;
                }

                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = 'transparent';
                    subItem.getDom ().style.stroke = 'transparent';
                }
            }
        }
    }

    o.update = function () {
        var item, key, list;

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (item && item.getActive () === true) {
                item.showData ();
            }
        }
    }

    o.hideData = function () {
        var item, key, list;

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (item && item.getActive () === true) {
                if (d.dataLine [key] && d.dataLine [key].segmentList.length) {
                    o.removeData ({name: key});
                    d.dataLine [key].active = true
                }
                 // item.showData ();
            }
        }
    }

    o.showData = function () {
        var item, key, list;

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (d.dataLine [key] && d.dataLine [key].active) {
                item.showData ();
            }
        }
    }

    o.override ({
        resizeGraph: function (original) {
            original ();
        }
    })
})
