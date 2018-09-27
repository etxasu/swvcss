tm.start (function () {

    var prefix = '/hab-worlds-timeline'

    path = {
        sim: prefix + '/src/sandbox/mpotter/sim/timeline'
    }

    tm.load ({
        list: [
            path.sim + '/remake/Timeline.js',
            path.sim + '/remake/EventTimeline.js',
            path.sim + '/remake/MinorTickTimeline.js',
            path.sim + '/remake/Minimap.js',
            path.sim + '/remake/PinnedMinimap.js',
            path.sim + '/remake/Tooltip.js',
            path.sim + '/remake/Tooltip.hbs',
            path.sim + '/Pin.js',
            path.sim + '/CorrectionPin.js',
            path.sim + '/RangedPin.js',
            path.sim + '/Detail.hbs',
            path.sim + '/Item.hbs',
            path.sim + '/Item.js',
            path.sim + '/RawEventDataNoCategories.js',
        ],
        done: function () {
            var cardList, simModel, tooltip;

            tooltip = tm.new ('app.sim.timeline.Tooltip', {
                height: 115,
                width: 270
            })

            tooltip.hide ();

            // Setup the timeline
            // tm.new ('app.sim.Timeline', {
            // tm.new ('app.sim.timeline.Event', {
            tm.new ('app.sim.timeline.minor.Tick', {
                selector: {
                    container: '#visualization',
                    eventCounter: '#event-label',
                    cardList: '#card-list',
                    eventPlacedLabel: '#event-label'
                }
            })

            // Setup the minimap
            tm.new ('app.sim.timeline.minimap.Pinned', {
                selector: {
                    timeline: '#visualization',
                    container: '#minimap'
                }
            })

            // Clear timeline events
            $ ('#reset-event').click (function () {
                window.timelineApp.clearTimeline ();
                window.minimap.clearMinimap ();
            })

            $ ('#reset-zoom').click (function () {
                window.timelineApp.zoom (0);
            })

            if (window.simcapi) {
                // Create sim model for control global aspects of the app
                simModel = new simcapi.CapiAdapter.CapiModel({
                    // showControlPanel: true,
                    // showZoomControls: true,
                    // zoomLevel: 1,
                    showResetEventsButton: true,
                    showResetZoomButton: true,
                });

                // Expose variables as controls in the CAPI inspector
                simcapi.CapiAdapter.expose('showResetEventsButton', simModel, {
                    alias: 'Timeline.Controls.ShowResetEventsButton'
                });

                simcapi.CapiAdapter.expose('showResetZoomButton', simModel, {
                    alias: 'Timeline.Controls.ShowResetZoomButton'
                });

                simModel.on ('change:showResetEventsButton', function(model, show){
                    if (show) {
                        $ ('#reset-event').removeClass ('hide')
                    }
                    else {
                        $ ('#reset-event').addClass ('hide')
                    }
                });

                simModel.on ('change:showResetZoomButton', function(model, show){
                    if (show) {
                        $ ('#reset-zoom').removeClass ('hide')
                    }
                    else {
                        $ ('#reset-zoom').addClass ('hide')
                    }
                });
            }

            $ ('#check-answer').click (function () {
                window.timelineApp.checkCorrectAnswer ();
            })

            // Add the data
            tm.new ('app.sim.timeline.Data', {
                color: {
                    cosmic: '#FFFFFF',
                    geological: '#56B4E9',
                    biological: '#009E73',
                    anthropologic: '#CC79A7',
                    special: ''
                }
            })

            if (window.simcapi) {
                // App is setup
                simcapi.Transporter.addCheckCompleteListener(function () {
                    var item, key, list;

                    list = window.timelineApp.getEventList ();
                    for (key in list) {
                        item = list [key];

                        if (item && item.enforceCapi) { item.enforceCapi (); }
                    }
                });
                simcapi.Transporter.notifyOnReady ();
            }
        }
    })
})
