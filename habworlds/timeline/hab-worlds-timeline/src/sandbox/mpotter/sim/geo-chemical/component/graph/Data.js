'use strict'
// Responsible for plotting and managing data
tm.add ('component.graph.Data', ['component.graph.Base'], function (o, p, d) {
    o.getEndValue = function () { return d.lightEndValue; }
    o.getStartValue = function () { return d.lightStartValue; }

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
                // subList = item.circleList
                // for (subKey in subList) {
                //     subItem = subList [subKey]
                //
                //     subItem.getDom ().style.fill = 'transparent'
                //     subItem.getDom ().style.stroke = 'transparent'
                // }
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

                // subList = item.circleList
                // for (subKey in subList) {
                //     subItem = subList [subKey]
                //
                //     // Move data to front
                //     parent = subItem.getDom ().parentNode
                //     parent.removeChild (subItem.getDom ())
                //     parent.append (subItem.getDom ())
                // }
            }
        }
    }

    o.plotData = function (data) {
        var circle, end, item, key, list, nextItem, segment, start, width, yPos;

        if (!document.querySelector ( d.selector.container ).classList.contains ('hide')) {
            if (!data.name) { data.name = ' ' }

            if (d.dataLine [data.name] === undefined) {
                d.dataLine [data.name] = {
                    segmentList: [],
                    // circleList: [],
                    name: data.name,
                    owner: data.owner
                }
            }

            if (d.dataLine [data.name].segmentList.length) {
                // console.log (d.dataLine [data.name])
                o.removeData (data);
            }

            d.dataLine [data.name].active = true

            width = data.width;

            if (width === undefined) { width = 1 }

            list = data.dataPointList;

            // list = d.dataPointList
            for (key in list) {
                key = Number (key);
                item = list [key];
                nextItem = list [key + 1]

                if (!nextItem) { nextItem = item }

                // if ((item.y - d.graphArea.top) < 3) { yPos = 3 + d.graphArea.top }
                // else { yPos = item.y + d.graphArea.top }
                yPos = item.y + d.graphArea.top

                start = {
                    x: item.x + d.graphArea.left,
                    y: yPos
                }

                if (data.connectLines) {
                    end = {
                        x: nextItem.x + d.graphArea.left,
                        y: nextItem.y + d.graphArea.top
                    }
                }
                else {
                    end = {
                        x: item.x + d.graphArea.left,
                        y: item.base,
                    }
                }

                segment = tm.new ('tm.svg.Line', {
                    start: start,
                    end: end,
                    brush: {
                        color: data.color,
                        line: {
                            width: width,
                            color: data.color
                        }
                    }
                })

                // circle = tm.new ('tm.svg.Circle', {
                //     x: item.x + d.graphArea.left,
                //     y: end.y,
                //     radius: 6,
                //     brush: {
                //         color: 'transparent',
                //         line: {
                //             width: 2,
                //             color: 'transparent'
                //         }
                //     }
                // })

                // circle.getDom ().name = data.name;
                // circle.getDom () ['data-displayName'] = data.displayName;
                // circle.getDom () ['data-pos'] = item.y;
                // circle.getDom () ['wavelength'] = item.wavelength;
                //
                // segment.getDom ().name = data.name;
                // segment.getDom () ['data-displayName'] = data.displayName;
                // segment.getDom () ['data-pos'] = item.y;
                // segment.getDom () ['wavelength'] = item.wavelength;
                //
                // segment.getDom () ['data-circle'] = circle.getDom ();
                // circle.getDom () ['data-segment'] = segment.getDom ();
                //
                //
                // // Add a mouseover listener
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
                // d.dataLine [data.name].circleList.push (circle)

                // Add line to svg
                d.svg.add (segment)
                // d.svg.add (circle)
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

            // list = d.dataLine [data.name].circleList;
            // for (key in list) {
            //     item = list [key];
            //
            //     item.getDom ().parentNode.removeChild (item.getDom ())
            //
            //     for (subKey in item) {
            //         delete item [subKey]
            //     }
            //
            //     delete d.dataLine [data.name].circleList [key]
            // }

            d.dataLine [data.name] = {
                // circleList: [],
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

                // subList = item.circleList
                // for (subKey in subList) {
                //     subItem = subList [subKey]
                //
                //     subItem.getDom ().style.fill = 'transparent';
                //     subItem.getDom ().style.stroke = 'transparent';
                // }
            }
        }
    }

    o.hideData = function () {}

    o.showData = function () {}
})
