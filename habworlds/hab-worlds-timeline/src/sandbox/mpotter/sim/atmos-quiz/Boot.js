tm.start (function () {
    var path

    path = {
        base: '/src/tm',
        svg: '/src/tm/svg',
        atmos: '/src/sandbox/mpotter/sim/atmos-quiz',
        graph: '/src/sandbox/mpotter/sim/atmos-quiz/graph',
        data: '/src/sandbox/mpotter/sim/atmos-quiz/data',
        app: '/src/sandbox/mpotter/sim/atmos-quiz/app',
        control: '/src/sandbox/mpotter/sim/atmos-quiz/control',
        input: '/src/sandbox/mpotter/sim/atmos-quiz/input',
    }

    tm.load ({
        list: [
            // Bring in tm base
            path.base + '/Base.js',

            // Bring in the Tamed SVG.
            path.svg + '/dom/Attr.js',
            path.svg + '/Box.js',
            path.svg + '/Brush.js',
            path.svg + '/Circle.js',
            path.svg + '/Dom.js',
            path.svg + '/Group.js',
            path.svg + '/Line.js',
            path.svg + '/Svg.js',
            path.svg + '/Text.js',
            path.svg + '/Image.js',

            // Bring in atmospheric sim files
            path.atmos + '/GasData.js',
            path.atmos + '/GasButton.hbs',
            path.atmos + '/Tooltip.js',
            path.atmos + '/Tooltip.hbs',

            // Bring in updated graph files
            path.graph + '/Base.js',
            path.graph + '/Data.js',
            path.graph + '/Zoom.js',
            path.graph + '/Wavelength.js',
            path.graph + '/Autoscaler.js',
            path.graph + '/Transmission.js',
            path.graph + '/Absorption.js',

            // Load in gas data files
            path.data + '/Gas.js',
            path.data + '/Ch4.js',
            path.data + '/Co.js',
            path.data + '/Co2.js',
            path.data + '/H2o.js',
            path.data + '/H2s.js',
            path.data + '/H2.js',
            path.data + '/N2o.js',
            path.data + '/Nh3.js',
            path.data + '/No.js',
            path.data + '/N2.js',
            path.data + '/No2.js',
            path.data + '/O2.js',
            path.data + '/O3.js',
            path.data + '/So2.js',

            // Bring in the app
            path.app + '/Base.js',
            path.app + '/Quiz.js',
            path.app + '/Capi.js',

            // Bring in the controls
            path.control + '/Base.js',
            path.control + '/Gas.js',

            // Bring in inputs
            path.input + '/Base.js',
            path.input + '/Gas.js',
            path.input + '/Switch.js',
            path.input + '/Switch.hbs',
            path.input + '/Slider.hbs',
            path.input + '/Slider.js',
            path.input + '/Button.hbs',
            path.input + '/Button.js',
            path.input + '/Unit.js',
            path.input + '/InputSlider.js',
            path.input + '/InputSlider.hbs',
        ],
        done: function () {
            var config

            config = {
                selector: {
                    control: {
                        gas: '#gas-buttons',
                        graphType: '#graph-type',
                        teacherGraph: '#teacher-graph',
                        studentGraph: '#student-graph',
                        zoom: '#zoom-controls',
                    }
                }
            }

            tm.new ('app.sim.atmos.quiz.app.Capi', config)
        }
    })
})
