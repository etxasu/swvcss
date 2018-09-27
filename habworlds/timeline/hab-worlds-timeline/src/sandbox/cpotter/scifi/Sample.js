// Messing around with Martian Ui.
// Reference the video: http://www.iamag.co/features/the-martian-ui-reel/
// time index: 00:20
tm.add ('app.scifi.Sample', function (o, p, d) {
    o.setup = function (config) {
        var dom, end, i, list, parent;
        console.log ('- Scifi Sample created.')

        list = [];
        end = 1;

        for (i = 0; i < end; i++) {
            list.push ({
                list2: [
                    {number: '1', unit: 'PSI', sector: "CABIN"},
                    {number: '2', unit: 'PSY', sector: "WHAT"},
                    {number: '3', unit: 'SYE', sector: "AYE"},
                    {number: '4', unit: 'RYE', sector: "PEW"}
                ]
            })
        }

        // Compile the template
        var template = Handlebars.compile (tm.getData ('/src/sandbox/cpotter/scifi/sample.hbs'));

        var context = {
            // city: 'Tempe',
            // street: '600 West Grove Parkway',
            // number: '2sdfasdfasfas',
            // test: list,
            test2: list
        };

        // Pass our data to the template
        var html = template (context);

        // Add the compiled html to the page
        // $('#app').html (html);

        var tableData = [
                            {
                                title: 'ELEVATIONS',
                                tableRow: [
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+53'},
                                            {colspan: 1,  data: '+45'},
                                            {colspan: 1,  data: 'Elev OB'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+54'},
                                            {colspan: 1,  data: '+53'},
                                            {colspan: 1,  data: 'Elev OB'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+72'},
                                            {colspan: 1,  data: '+65'},
                                            {colspan: 1,  data: ' LIB'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+59'},
                                            {colspan: 1,  data: '+64'},
                                            {colspan: 1,  data: 'RIB'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+42'},
                                            {colspan: 1,  data: '+56'},
                                            {colspan: 1,  data: 'POU'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 1,  data: '+34'},
                                            {colspan: 1,  data: '+82'},
                                            {colspan: 1,  data: 'POU'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: ''},
                                            {colspan: 1,  data: 'MFUS 1'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: ''},
                                            {colspan: 1,  data: 'MFUS 2'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: '+40'},
                                            {colspan: 1,  data: 'UPLK'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: '+40'},
                                            {colspan: 1,  data: 'UPLK'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: '+60'},
                                            {colspan: 1,  data: 'FUS'}
                                        ]
                                    },
                                    {
                                        tableCell: [
                                            {colspan: 2,  data: ''},
                                            {colspan: 1,  data: ' ----'}
                                        ]
                                    }
                                ]
                            }
                        ];
        var template2 = Handlebars.compile (tm.getData ('/src/sandbox/cpotter/scifi/table.hbs'));
        var context2 = {
            table: tableData
        };

        // Pass our data to the template
        var html2 = template2 (context2);

        // console.log ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGH');
        // console.log (html);
        // console.log (template2);
        // console.log (html2);

        //inject markup into page
        $('#sector1').html (html);
        $('#sector2').html (html2);

        o.enableUiActivity ();
    }

    o.enableUiActivity = function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        setInterval (function () {
            // console.log ('*** CARL TEST');
            $('.hbw .win .body .text .font').each (function (index, item) {
                // console.log ('value:', item)
                $(item).text (getRandomInt (0, 30));
            })
        }, 1000);
    }
})


// <!--Data will be inserted in its according place, replacing the brackets.-->
// <script id="address-template" type="text/x-handlebars-template">
//   <p>You can find me in {{city}}. My address is {{number}} {{street}}.</p>
// </script>
