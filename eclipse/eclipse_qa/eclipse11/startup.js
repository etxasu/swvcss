/**
 * Generate Elements and Initializing __ranger.
 *
 * @copyright Copyright 2009-2016, by the California Institute of Technology. ALL RIGHTS RESERVED.
 * United States Government Sponsorship acknowledged. Any commercial use must be
 * negotiated with the Office of Technology Transfer at the California Institute of Technology.
 */
 (function () {

 /**
  * Add a new CSS Rule to a style sheet
  *
  * @param   {object}   sheet     - sheet to add the css rule
  * @param   {string}   selector  - the selector the rule will apply to
  * @param   {object}   ruleList  - list of css rules
  * @param   {integer}  index     - ordering of the rules
  */
function addCSSRule(sheet, selector, ruleList, index) {
    var rules = ruleList.join('; '); 

    if ('insertRule' in sheet) {
        sheet.insertRule(selector + '{' + rules + '}', index);
    }
    else if('addRule' in sheet) {
        sheet.addRule(selector, rules, index);
    }
}

/**
 * Append a set of CSS rules to a Style Tag
 *
 * @param   {object}   styleContainer - style html element tag to append set of CSS rules
 * @param   {object}   cssRules - an object of the the form {selector : [ruleList]}
 */
function addInlineCSS(styleContainer, cssRules) {
    for (var selector in cssRules) {
        var ruleList = cssRules[selector];
        styleContainer.innerHTML = styleContainer.innerHTML + '\n' + selector + ' {\n\t';
        styleContainer.innerHTML = styleContainer.innerHTML + ruleList.join(';\n\t');
        styleContainer.innerHTML = styleContainer.innerHTML + ';\n}';
    }
}

/**
 * Create a new element that is appended to another element
 * @param   {string}   elementName   - html element name of new element
 * @param   {object}   parentElement - html element to append new element
 */
function createNewElement(elementName, parentElement) {

    // Create a new element 
    var element = document.createElement(elementName);

    // Webkit hack
    element.appendChild(document.createTextNode(""));

    // Add the element to the page
    parentElement.appendChild(element);

    return element;
}

/**
 * Add event listeners to an element for scroll events.
 * These scroll events are passed to the canvas and are
 * not acted upon by the element
 * @param   {object}   element   - html element to add event listeners
 * @param   {boolean}  usingIE   - true if using Internet Explorer
 */
function addScrollEventListeners(element, usingIE) {

    element.addEventListener('wheel', function(event) {
        event.preventDefault();
        var canvas = document.getElementById('canvas');
        var scrollEvent;
        if (usingIE) {
            scrollEvent = document.createEvent('Event');
            scrollEvent.initEvent('wheel', true, true);
        } else {
            scrollEvent = new Event('wheel');
        }

        scrollEvent.deltaX = event.deltaX;
        scrollEvent.deltaY = event.deltaY;
        scrollEvent.deltaZ = event.deltaZ;
        canvas.dispatchEvent(scrollEvent);
    });

    element.addEventListener('DOMMouseScroll', function(event) {
        event.preventDefault();
        var canvas = document.getElementById('canvas');
        var scrollEvent;
        if (usingIE) {
            scrollEvent = document.createEvent('Event');
            scrollEvent.initEvent('DOMMouseScroll', true, true);
        } else {
            scrollEvent = new Event('DOMMouseScroll');
        }
        scrollEvent.deltaX = event.deltaX;
        scrollEvent.deltaY = event.deltaY;
        scrollEvent.deltaZ = event.deltaZ;
        canvas.dispatchEvent(scrollEvent);
    });

    element.addEventListener('mousewheel', function(event) {
        event.preventDefault();
        var canvas = document.getElementById('canvas');
        var scrollEvent;
        if (usingIE) {
            scrollEvent = document.createEvent('Event');
            scrollEvent.initEvent('mousewheel', true, true);
        } else {
            scrollEvent = new Event('mousewheel');
        }
        scrollEvent.deltaX = event.deltaX;
        scrollEvent.deltaY = event.deltaY;
        scrollEvent.deltaZ = event.deltaZ;
        canvas.dispatchEvent(scrollEvent);
    });
}

/**
 * Add event listerners to element for gesture events.
 * The default behavior of these events are prevented,
 * and a scroll event is dispatched to canvas.
 * @param   {object}   element   - html element to add event listeners
 */
function preventGestureEvents(element) {

    // Override Safari Gesture Events
    element.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    }, false);

    // Dispatch a Wheel Event
    element.addEventListener('gesturechange', function(event) {
        event.preventDefault();

        var canvas = document.getElementById('canvas');

        // Supported by Safari with gesture events
        var scrollEvent = new Event('wheel');
        var changeInY = 0;

        // converter for when scale is between 0...1
        var scaleConverterFactor = 6;

        // to increase scroll amount by 50%
        var scaleFactor = 1.5;

        if (event.scale > 1) {
            changeInY = -event.scale;
        } else {
            changeInY = scaleConverterFactor - (scaleConverterFactor * event.scale);
        }
        scrollEvent.deltaX = 0;
        scrollEvent.deltaY = changeInY * scaleFactor;
        scrollEvent.deltaZ = 0;
        canvas.dispatchEvent(scrollEvent);
    }, false);

    element.addEventListener('gestureend', function(event) {
        event.preventDefault();
    }, false);
}

/**
 * Generate a new Style Sheet which is considered the default
 * for this application
 * @param   {object}   parentElement   - html element to append style sheet
 */
function createDefaultStyleSheet(parentElement) {
    var style = createNewElement('style', parentElement);
    style.id = 'ranger-default-style';
    style.setAttribute("data-noprefix", "");
    var cssRules = {};

    // Create css rule mapping
    cssRules['#canvas'] = ['position: absolute', 'overflow: hidden', 
                    'top: 0', 'left: 0', 'width: 100%', 'height: 100%', 
                    'background: rgba(255, 255, 255, 0)', 'z-index: 0', 
                    'pointer-events: all'];

    cssRules['.pip'] = ['position: relative', 'z-index: 2001',
        'width: 100%', 'height: 100%', 'left: auto', 'top: auto'];

    cssRules['#labels'] = ['position: absolute', 'overflow: hidden',
                'top: 0', 'left: 0', 'width: 100%', 'height: 100%', 
                'background: rgba(255, 255, 255, 0)', 'z-index: 1',
                'pointer-events: none', 'user-select: none', 'white-space: nowrap'];

    cssRules['#mono'] = ['width: 100%'];
    cssRules['#stereo'] = ['width: 50%'];

    cssRules['.nodeLabel'] = ['position: absolute', 'transform: translate(-50%, -50%)',
                'color: rgb(255,255,255)', 'opacity: 0.7', 'text-align: center',
                'font-family: "Lato", sans-serif', 'font-weight: normal',
                'letter-spacing: 0.03em', 'font-size: 14px', 'pointer-events: auto',
                'cursor: pointer', '-webkit-user-select: none', '-moz-user-select: none', 
                '-ms-user-select: none', 'text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                '-webkit-text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                '-moz-text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'];

    cssRules['.surfaceLabel'] = ['color: rgb(255,255,255)', 'position: absolute', 'top: 0', 'left: 0',
                'transform: translate(10px, 0)', 'text-shadow: none', '-webkit-text-shadow: none',
                'text-align: center', 'font-family: "Lato", sans-serif', 'font-weight: normal',
                'letter-spacing: 0.03em', 'font-size: 14px', 'pointer-events: auto',
                'cursor: pointer', '-webkit-user-select: none', '-moz-user-select: none',
                '-ms-user-select: none', '-moz-text-shadow: none'];

    cssRules['.surfaceDot'] = ['pointer-events: none', 'position: absolute', 'transform: translate(-50%, -50%)',
                'color: rgb(255,255,255)', 'opacity: 1.0', 'text-align: center',
                'font-family: "Lato", sans-serif', 'font-weight: normal',
                'letter-spacing: 0.03em', 'font-size: 14px'];

    cssRules['.markerLabel'] = ['position: absolute', 'transform: translate(-50%, -50%)',
                'color: rgb(255,255,255)', 'opacity: 1.0', 'pointer-events: none', 'text-align: center',
                '-webkit-user-select: none', '-moz-user-select: none', 'width: 15px',
                'height: 27px', '-ms-user-select: none', 'display: block'];

    cssRules['.marker'] = ['position: absolute', 'width: 15px', 'height: 27px', 'transform: translate(0%, -50%)',
                'text-align: center', 'font-family: "Lato", sans-serif', 'font-weight: normal',
                'letter-spacing: 0.03em', 'font-size: 14px', 'pointer-events: auto',
                'cursor: pointer', '-webkit-user-select: none', '-moz-user-select: none',
                '-ms-user-select: none'];

    cssRules['.markerSVG'] = ['position: absolute', 'pointer-events: none', 'top: 0', 'left: 0',
                'width: 15px', 'height: 27px', '-webkit-user-select: none', '-moz-user-select: none',
                '-ms-user-select: none', 'z-index: -1'];

    cssRules['.rangerLabels'] = [];

    cssRules['.left-eye'] = ['top: 0%', 'left: 0%'];
    cssRules['.right-eye'] = ['top: 0%', 'left: 50%'];
    cssRules['.labelWall'] = ['position: absolute', 'overflow: hidden', 'height: 100%'];

    cssRules['.nodeLabel.non-interactable'] = ['opacity: 0.3', 'cursor: default'];

    cssRules['.nodeLabel:not(.non-interactable):hover'] = ['opacity: 1 !important'];

    cssRules['#downloads'] = ['list-style-type: none', 'margin: 0', 
                'padding: 0', 'width: 100%'];

    cssRules['a.ranger-svg'] = ['position: relative', 'display: inline-block'];
    cssRules['a.ranger-svg:after'] = ['position: absolute', 'content: ""', 'top: 0', 'left: 0', 'bottom: 0', 'right: 0'];

    // Add default CSS Rules to the Style Element Created.
    addInlineCSS(style, cssRules);
}

/**
 * Generate a new Canvas element
 * @param   {object}   parentElement   - html element to append canvas
 */
function createCanvas(parentElement) {
    var canvas = createNewElement('canvas', parentElement);
    canvas.className = 'topleft';
    canvas.id='canvas';

    // Add relevant event listeners
    canvas.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    }, false);
    var preventScroll = false;
    canvas.addEventListener('touchstart', function(/*event*/) {
        preventScroll = true;
    }, false);
    canvas.addEventListener('touchend', function(/*event*/) {
        preventScroll = false;
    }, false);
    canvas.addEventListener('touchmove', function(event) {
        if(preventScroll)
            event.preventDefault();
    }, false);

    preventGestureEvents(canvas);
}

/**
 * Generates a DIV that is a container for labels.
 * @param   {object}   parentElement   - html element to append label container 
 */
function createLabelContainer(parentElement) {
    var labelContainer = createNewElement('div', parentElement);
    labelContainer.id = 'labels';
    labelContainer.className = 'topleft labels';
    labelContainer.setAttribute('unselectable', 'on');
    labelContainer.setAttribute('onselectstart', 'return false;');
}

/**
 * Generate a new buffer with a calculated size
 * @param   {object}   settings   - settings for ranger setup 
 */
function getBuffer(settings) {
    var size = 1 << 29;

    if(settings.mobile)
        size /= 2;

    try {
        var buffer = new ArrayBuffer(size);
        var testArray = new Int8Array(buffer);
        if(!testArray) {
            console.error("Failed to allocate buffer of size", size);
            throw new Error('Failed to allocate array buffer');
        }

        return buffer;
    } catch(error) {
        console.error("Failed to allocate buffer of size", size);
        throw(error);
    }
}

var session = {};
var query = window.location.search.substring(1);
var match, re = /([^&=]+)=?([^&]*)/g;
while((match = re.exec(query)))
    session[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);

var settings = {};

// Determine if page is being loaded on mobile device
if(navigator && (
        /iP(ad|hone|od)/.test(navigator.userAgent)
        || /Android/i.test(navigator.userAgent)
        || /CrOS/.test(navigator.userAgent)
    )
) {
    settings['mobile'] = session['mobile'] || true;
    settings['canvasDivisor'] = settings['canvasDivisor'] || 2;

    if(/iP(ad|hone|od)/.test(navigator.userAgent))
        settings['ios'] = session['ios'] || true;
}

// Determine if page is being loaded on Internet Explorer
if(navigator && (/MSIE/.test(navigator.userAgent) 
    || /Trident/.test(navigator.userAgent))) {
    settings['IE'] = session['IE'] || true;
}

for(var item in session) {
    var current = settings, remaining = item;

    while((match = /([^.]+)\.(.*)/.exec(remaining))) {
        remaining = match[2];
        if(!(match[1] in current))
            current[match[1]] = {};

        current = current[match[1]];
    }

    current[remaining] = session[item];
}

// Grab the parent div that will contain ranger
var parentElement = document.getElementById('ranger-container');

// Create Elements
createDefaultStyleSheet(parentElement);
createCanvas(parentElement);
createLabelContainer(parentElement);

// Adding event handlers for when ranger changes to/from full screen
// Various event listeners used for cross-browser support
// A time delay ensures that the screen has finished any attr changes
// for the elements on the screen.
document.addEventListener("fullscreenchange", function(/*event*/) {
    window.setTimeout(function() {

        if (settings['IE']) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        } else {
            window.dispatchEvent(new Event('resize'));
        }
    }, 1);
}, false);

document.addEventListener("webkitfullscreenchange", function(/*event*/) {
    window.setTimeout(function() {

        if (settings['IE']) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        } else {
            window.dispatchEvent(new Event('resize'));
        }
    }, 1);
}, false);

document.addEventListener("mozfullscreenchange", function(/*event*/) {
    window.setTimeout(function() {

        if (settings['IE']) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        } else {
            window.dispatchEvent(new Event('resize'));
        }
    }, 1);
}, false);

document.addEventListener("msfullscreenchange", function(/*event*/) {
    window.setTimeout(function() {

        if (settings['IE']) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        } else {
            window.dispatchEvent(new Event('resize'));
        }
    }, 1);
}, false);


window['__ranger'] = {
            'memoryInitializerPrefixURL': '../../../',
            'buffer': getBuffer(settings),
            'settings': settings,
            'freePreloadedMediaOnUse': true,
            'canvasDivisor': settings.canvasDivisor,
            'addScrollEventListeners': addScrollEventListeners,
            'preventGestureEvents': preventGestureEvents
        };

})();