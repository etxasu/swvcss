tm.start (function () {
    // Load the game.
    tm.load ({
        // NOTE: Loading order does not matter.
        list: [
            // '/src/sandbox/rbravo/BouncingBall.js',
            '/src/sandbox/cpotter/scifi/Sample.js',
        ],
        done: function () {
            // Load the handlebars templates.
            load ({
                list: [
                    '/src/sandbox/cpotter/scifi/sample.hbs',
                    '/src/sandbox/cpotter/scifi/table.hbs'
                ],
                done: function () {
                    console.log ('cool')
                    // Create some of the sample objects.
                    // tm.new ('app.BouncingBall', {});
                    tm.new ('app.scifi.Sample', {});
                },
            })
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
