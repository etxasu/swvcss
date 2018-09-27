tm.start (function () {
    // Load the game.
    tm.load ({
        // NOTE: Loading order does not matter.
        list: [
            '/src/sandbox/rbravo/BouncingBall.js',
            '/src/sandbox/rbravo/scifi/sample.hbs',
            '/src/sandbox/rbravo/scifi/Sample.js',
        ],
        done: function () {
            setTimeout (function () {
                console.log ('cool')
                // Create some of the sample objects.
                // tm.new ('app.BouncingBall', {});
                tm.new ('app.scifi.Sample', {});
            }, 1000)

            // // Load the handlebars templates.
            // load ({
            //     list: [
            //         '/src/sandbox/rbravo/scifi/sample.hbs',
            //     ],
            //     done: function () {
            //         console.log ('cool')
            //         // Create some of the sample objects.
            //         // tm.new ('app.BouncingBall', {});
            //         tm.new ('app.scifi.Sample', {});
            //     },
            // })
        }
    });

    function load (data) {
        var end, i, item, loaded, list;

        function loadItem (name) {
            $.get (name)
            .done (function (content) {
                tm.setData (name, content)
                loaded++;

                if (loaded >= end && data.done) {
                    data.done.apply (this, []);
                }
            })
        }

        loaded = 0;
        list = data.list;
        end = list.length;
        for (i = 0; i < end; i++) {
            loadItem (list [i]);
        }
    }
})
