tm.start (function () {
    var basePath;

    // basePath = '/src/sandbox/mpotter/sim/timeline';
    basePath = '/src/sandbox/rbravo/mpotter/sim/timeline';

    tm.load ({
        list: [
            basePath + '/Timeline.js',
            basePath + '/Pin.js',
            basePath + '/Detail.hbs',
            basePath + '/Item.hbs',
            basePath + '/Item.js',
        ],
        done: function () {
            var cardList;

            tm.new ('app.sim.timeline.Item', {
                id: 'card1',
                name: 'The start of everything',
                description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                content: [
                    '    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,tempor sit amet, ante.',
                    ' Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus'
                ].join (''),
                selector: {
                    timeline: '#visualization',
                    event: '#card-list',
                    detail: '#card-detail',
                },
                image: {
                    full: 'https://thumb7.shutterstock.com/mosaic_250/689443/261764171/stock-photo-galaxy-stars-abstract-space-background-elements-of-this-image-furnished-by-nasa-261764171.jpg',
                    pin: 'https://thumb7.shutterstock.com/mosaic_250/689443/261764171/stock-photo-galaxy-stars-abstract-space-background-elements-of-this-image-furnished-by-nasa-261764171.jpg',
                    thumbnail: 'https://thumb7.shutterstock.com/mosaic_250/689443/261764171/stock-photo-galaxy-stars-abstract-space-background-elements-of-this-image-furnished-by-nasa-261764171.jpg',
                },
            })

            tm.new ('app.sim.timeline.Item', {
                id: 'card2',
                name: 'The middle of everything',
                description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                content: [
                    '    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,tempor sit amet, ante.',
                    ' Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus'
                ].join (''),
                selector: {
                    timeline: '#visualization',
                    event: '#card-list',
                    detail: '#card-detail',
                },
                image: {
                    full: 'https://thumbnailer.mixcloud.com/unsafe/250x250/extaudio/7/c/3/7/eca0-56fb-44d1-af7e-253be281e8ef',
                    pin: 'https://thumbnailer.mixcloud.com/unsafe/250x250/extaudio/7/c/3/7/eca0-56fb-44d1-af7e-253be281e8ef',
                    thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/250x250/extaudio/7/c/3/7/eca0-56fb-44d1-af7e-253be281e8ef',
                },
            })

            tm.new ('app.sim.timeline.Item', {
                id: 'card3',
                name: 'The end of everything',
                description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                content: [
                    '    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,tempor sit amet, ante.',
                    ' Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus'
                ].join (''),
                selector: {
                    timeline: '#visualization',
                    event: '#card-list',
                    detail: '#card-detail',
                },
                image: {
                    full: 'https://thumb1.shutterstock.com/mosaic_250/4301743/651424810/stock-photo-the-north-america-nebula-is-an-emission-nebula-in-the-constellation-cygnus-close-to-deneb-651424810.jpg',
                    pin: 'https://thumb1.shutterstock.com/mosaic_250/4301743/651424810/stock-photo-the-north-america-nebula-is-an-emission-nebula-in-the-constellation-cygnus-close-to-deneb-651424810.jpg',
                    thumbnail: 'https://thumb1.shutterstock.com/mosaic_250/4301743/651424810/stock-photo-the-north-america-nebula-is-an-emission-nebula-in-the-constellation-cygnus-close-to-deneb-651424810.jpg',
                },
            })


            tm.new ('app.sim.Timeline', {
                container: '#visualization',
                // zoomTracker: '#zoom-tracker',
                currentZoom: '#current-zoom'
            })

            $ ('#reset-event').click (function () {
                window.timelineApp.clearTimeline ();
            })

            $ ('#reset-view').click (function () {
                console.log ('Still implementing...')
            })
        }
    })
})
