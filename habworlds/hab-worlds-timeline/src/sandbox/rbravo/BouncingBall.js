tm.add ('app.BouncingBall', function (o, p, d) {
    o.setup = function (config) {
        var dom, parent;
        console.log ('- Bouncing Ball created.')

        // Attach the ball (div) to the page.
        var dom = document.createElement ('div');
        dom.classList.add ('ball');

        parent = document.querySelector ('#app');
        parent.appendChild (dom);

        // Simple ball animation with animjs.
        var bouncingBall = anime({
            targets: '.ball',
            translateY: '400px',
            duration: 300,
            loop: true,
            direction: 'alternate',
            easing: 'easeInCubic',
            scaleX: {
                value: 1.05,
                duration: 150,
                delay: 268
            }
        });
    }
})
