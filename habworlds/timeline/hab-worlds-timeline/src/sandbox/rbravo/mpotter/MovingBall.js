tm.add ('app.MovingBall', function (o, p, d) {
    o.setup = function (config) {
        var dom, listener, parent;
        console.log ('- Moving Ball created.')

        // Attach the ball (div) to the page.
        var dom = document.createElement ('div');
        dom.classList.add ('ball');

        parent = document.querySelector ('#app');
        parent.appendChild (dom);

        // Simple ball animation with animjs.
        d.ball = anime({
            targets: '.ball',
            easing: 'linear',
            update: o.update,
            loop: true
        });

        d.moving = {
            up: false,
            down: false,
            left: false,
            right: false,
        }

        d.position = {
            x: 100,
            y: 100
        }

        d.speed = 15;

        listener = new window.keypress.Listener();
        listener.register_combo ({
            'keys': 'a',
            'on_keydown': function () { d.moving.left = true; },
            'on_keyup': function () { d.moving.left = false; },
        })

        listener.register_combo ({
            'keys': 'd',
            'on_keydown': function () { d.moving.right = true; },
            'on_keyup': function () { d.moving.right = false; },
        })

        listener.register_combo ({
            'keys': 'w',
            'on_keydown': function () { d.moving.up = true; },
            'on_keyup': function () { d.moving.up = false; },
        })

        listener.register_combo ({
            'keys': 's',
            'on_keydown': function () { d.moving.down = true; },
            'on_keyup': function () { d.moving.down = false; },
        })

        listener.register_combo ({
            'keys': 'space',
            'on_keydown': o.dropChild
        })
    }

    o.update = function () {
        var moving, position;

        moving = d.moving
        position = d.position

        if (moving.up) { position.y -= d.speed }
        if (moving.down) { position.y += d.speed }
        if (moving.left) { position.x -= d.speed }
        if (moving.right) { position.x += d.speed }

        d.ball = anime ({
            targets: '.ball',
            translateX: position.x,
            translateY: position.y,
        })
    }
})
