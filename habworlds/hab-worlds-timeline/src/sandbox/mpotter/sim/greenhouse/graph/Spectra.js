
// XXX
/*
    For reasons unknown, extending the wavelength
    graph causes problems
*/
// XXX

// 'use strict'
// /*
//     Creates boxes for:
//         Ultraviolet
//         Violet
//         Blue
//         Green
//         Yellow
//         Orange
//         Red
//         Infrared
// */
// tm.add ('sim.greenhouse.graph.Spectra', ['sim.greenhouse.graph.Wavelength'], function (o, p, d) {
//     o.setup = function (config) {
//         d.wavelengthRepo = {
//             'uv': {
//                 start: 0,
//                 end: 0.405555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(145, 0, 113, 0.3)',
//                         line: {
//                             color: 'rgba(238, 88, 207, 0.4)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'violet': {
//                 start: 0.405555555555555555555,
//                 end: 0.45,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(90, 0, 145, 0.5)',
//                         line: {
//                             color: 'rgba(157, 60, 217, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'blue': {
//                 start: 0.455555555555555555555,
//                 end: 0.505555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(0, 97, 145, 0.5)',
//                         line: {
//                             color: 'rgba(79, 176, 223, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'green': {
//                 start: 0.505555555555555555555,
//                 end: 0.555555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(0, 145, 1, 0.5)',
//                         line: {
//                             color: 'rgba(91, 233, 92, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'yellow': {
//                 start: 0.555555555555555555555,
//                 end: 0.605555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(145, 131, 0, 0.5)',
//                         line: {
//                             color: 'rgba(250, 235, 95, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'orange': {
//                 start: 0.605555555555555555555,
//                 end: 0.655555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(145, 57, 0, 0.5)',
//                         line: {
//                             color: 'rgba(252, 161, 101, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'red': {
//                 start: 0.655555555555555555555,
//                 end: 0.705555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(145, 0, 0, 0.5)',
//                         line: {
//                             color: 'rgba(245, 109, 109, 0.6)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//             'infrared': {
//                 start: 0.705555555555555555555,
//                 end: 1.505555555555555555555,
//                 box: tm.new ('tm.svg.Box', {
//                     x: 10, y: d.graphArea.top,
//                     width: 10, height: 200,
//                     brush: {
//                         color: 'rgba(145, 0, 35, 0.3)',
//                         line: {
//                             color: 'rgba(246, 90, 128, 0.4)',
//                             width: 1
//                         }
//                     }
//                 })
//             },
//         }
//
//         var item, key, list;
//         list = d.wavelengthRepo
//         for (key in list) {
//             item = list [key];
//
//             d.svg.add (item.box)
//         }
//
//         o.plotSpectra ();
//         o.resetZoom ();
//     }
//
//     o.plotSpectra = function () {
//         var end, endX, item, key, list, start, startX;
//
//         startX = Math.round ( o.findXOfValue (d.lightStartValue) );
//         endX = Math.round ( o.findXOfValue (d.lightEndValue) );
//
//         list = d.wavelengthRepo;
//         for (key in list) {
//             item = list [key];
//
//             start = o.findXOfValue (item.start)
//             end = o.findXOfValue (item.end)
//
//             // console.log (key, start, end)
//
//             // Check to see if the box is visible
//             // but falls out of bounds
//             if (
//                 (start < 0 && end < 0) ||
//                 (start == false && end == false)
//             ) {
//                 item.box.getDom ().classList.add ('hide')
//             }
//             else {
//                 item.box.getDom ().classList.remove ('hide')
//
//                 if (start < 0) { start = 0 }
//                 if (end === false) { end = endX }
//
//                 item.box.update ({
//                     x: Math.round ( start + d.graphArea.left ),
//                     width: Math.round ( end - start)
//                 })
//             }
//
//         }
//     }
//
//     // override zoom functionality so the boxes keep their shape
//     o.override ({
//         updateLabelList: function (original, startValue, endValue) {
//             var newStart, newEnd;
//
//             newStart = startValue;
//             newEnd = endValue;
//
//             if (startValue > endValue) {
//                 newEnd = startValue;
//                 newStart = endValue;
//             }
//
//             original (newStart, newEnd);
//
//             o.plotSpectra ();
//         }
//     })
// })
