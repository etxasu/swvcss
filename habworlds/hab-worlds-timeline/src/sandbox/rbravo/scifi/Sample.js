// Messing around with Martian Ui.
// Reference the video: http://www.iamag.co/features/the-martian-ui-reel/
// time index: 00:20
tm.add ('app.scifi.Sample', function (o, p, d) {
    o.setup = function (config) {
        var dom, end, i, list, parent;
        console.log ('- Scifi Sample created.')

        list = [];
        end = 4;
        for (i = 0; i < end; i++) {
            list.push ({
                list: [
                    {label: 'SMA', value: '12345'},
                    {label: 'SMI', value: '12345'},
                    {label: 'PEA', value: '12345'},
                    {label: 'APA', value: '12345'},
                    {label: 'ALT', value: '12345'},
                    {label: 'ESC', value: '12345'},
                    {label: 'ISS', value: '12345'},
                    {label: 'APT', value: '12345'},
                    {label: 'VEL', value: '12345'},
                    {label: 'INC', value: '12345'},
                    {label: 'LAN', value: '12345'},
                    {label: 'LPE', value: '12345'},
                ]
            })
        }

        // Compile the template
        tm.html ('app.scifi.Sample', {
            selector: '#app',
            data: {
                city: 'Tempe',
                street: '600 West Grove Parkway',
                number: '2sdfasdfasfas',
                test: list
            }
        })

        // var template = Handlebars.compile (tm.getData ('/src/sandbox/rbravo/scifi/sample.hbs'));
        // var context = ;
        // // Pass our data to the template
        // var html = template (context);
        //
        // // Add the compiled html to the page
        // $('#app').html (html);

        o.enableUiActivity ();
    }

    o.enableUiActivity = function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        setInterval (function () {
            console.log ('*** HERE NOW:');
            $('.blue .win .bd table span.value').each (function (index, item) {
                // console.log ('value:', item)
                $(item).text (getRandomInt (0, 1293));
            })
        }, 1000);
    }
})


// <!--Data will be inserted in its according place, replacing the brackets.-->
// <script id="address-template" type="text/x-handlebars-template">
//   <p>You can find me in {{city}}. My address is {{number}} {{street}}.</p>
// </script>
