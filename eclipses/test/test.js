const expect = chai.expect;
const TIMEOUT = 5000;


/**
 * Make a promise to wait for a function to execute,
 * resolve if returns true, reject if timeout is reached.
 * @instance
 * @param {function} testFunc  - function to execute, return true or false
 * @param {number}   timeout   - timeout to reject
 * @return {Promise} Promise for the function and timeout
 */
let makePromise = (testFunc, timeout) => {
    var promise = new Promise((resolve, reject) => {
        var myInterval = window.setInterval(() => {
            if(testFunc()) {
                clearInterval(myInterval);
                resolve();
            }
        }, 100);
        window.setTimeout(() => {
            clearInterval(myInterval);
            reject();
        }, timeout);
    });
    return promise;
};


describe('Index functions', function() {
    this.timeout(TIMEOUT);

    it('Page document is loaded.', () => {
        let promise = makePromise(() => document.readyState === 'complete' || document.readyState === 'interactive', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Initialize view', async function() {
        let result = await initialize();
        let promise = makePromise(() => result, TIMEOUT);
        return promise.should.be.fulfilled();
	});

	it('Load eclipses', async function() {
        let result = await loadEclipses();
        let promise = makePromise(() => result, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Viewing eclipses top to bottom of list', async function() {
        let eclipses = await Array.from(document.getElementById('eclipsesMenu').getElementsByClassName('button'));
        return Promise.all(eclipses.map(async (btn, index) => {
            let result = await goToEclipse(index);
            let promise = makePromise(() => result, TIMEOUT);
            return promise.should.be.fulfilled();
        }));
    });

    it('Toggle Orbit Lines off', async function() {
        let result = await toggleOrbitLines();
        expect(result).to.be.false;
    });

    it('Toggle Orbit Lines on', async function() {
        let result = await toggleOrbitLines();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Ecliptic Plane on', async function() {
        let result = await toggleEclipticPlane();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Ecliptic Plane off', async function() {
        let result = await toggleEclipticPlane();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Star Field off', async function() {
        let result = await toggleStarField();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Star Field on', async function() {
        let result = await toggleStarField();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Shadow Band off', async function() {
        let result = await toggleShadowBand();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Shadow Band on', async function() {
        let result = await toggleShadowBand();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Inset View off', async function() {
        let result = await toggleInsetView();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Inset View on', async function() {
        let result = await toggleInsetView();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Pause time', async function() {
        let result = await toggleTimeRate();
        let promise = makePromise(() => result === 'Paused', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Unpause time', async function() {
        let result = await toggleTimeRate();
        let promise = makePromise(() => result === '1 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 2 sec/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '2 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 4 sec/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '4 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 8 sec/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '8 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 15 sec/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '15 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 30 sec/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '30 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 1 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '1 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 2 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '2 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 4 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '4 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 8 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '8 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 15 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '15 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 30 min/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '30 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Increase time to 1 hr/sec', async function() {
        let result = await increaseTimeRate();
        let promise = makePromise(() => result === '1 hr/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Pause time', async function() {
        let result = await toggleTimeRate();
        let promise = makePromise(() => result === 'Paused', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -1 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-1 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -2 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-2 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -4 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-4 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -8 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-8 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -15 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-15 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -30 sec/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-30 sec/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -1 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-1 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -2 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-2 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -4 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-4 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -8 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-8 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -15 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-15 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -30 min/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-30 min/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Decrease time to -1 hr/sec', async function() {
        let result = await decreaseTimeRate();
        let promise = makePromise(() => result === '-1 hr/sec', TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Go to System view', async function() {
        let result = await goToSystemView();
        let promise = makePromise(() => result, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Orbit Lines off', async function() {
        let result = await toggleOrbitLines();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Orbit Lines on', async function() {
        let result = await toggleOrbitLines();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Ecliptic Plane on', async function() {
        let result = await toggleEclipticPlane();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Ecliptic Plane off', async function() {
        let result = await toggleEclipticPlane();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Star Field off', async function() {
        let result = await toggleStarField();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Star Field on', async function() {
        let result = await toggleStarField();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Shadow Band off', async function() {
        let result = await toggleShadowBand();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Shadow Band on', async function() {
        let result = await toggleShadowBand();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Inset View off', async function() {
        let result = await toggleInsetView();
        let promise = makePromise(() => result === false, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Toggle Inset View on', async function() {
        let result = await toggleInsetView();
        let promise = makePromise(() => result === true, TIMEOUT);
        return promise.should.be.fulfilled();
    });

    it('Go to Earth view', async function() {
        let result = await goToEarthView();
        let promise = makePromise(() => result, TIMEOUT);
        return promise.should.be.fulfilled();
    });
});
