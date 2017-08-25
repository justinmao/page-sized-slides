/*
 * page-sized-slides 1.0.2
 * Copyright (c) 2017 Justin Mao
 *
 * This project is licensed under the MIT License - please see
 * the LICENSE file for details.
 *
 * http://github.com/justinmao/page-sized-slides
 *
 * This project is dependent on the following libraries:
 * lethargy @ https://github.com/d4nyll/lethargy
 * smooth-scroll @ https://github.com/cferdinandi/smooth-scroll
 *
 * The source codes of these libraries have been concatenated to
 * this file for ease of use.
 *
 * Original source code begins at line 719.
 */

 // DEPENDENCIES

 // lethargy @ https://github.com/d4nyll/lethargy
 (function() {
   var root;

   root = typeof exports !== "undefined" && exports !== null ? exports : this;

   root.Lethargy = (function() {
     function Lethargy(stability, sensitivity, tolerance, delay) {
       this.stability = stability != null ? Math.abs(stability) : 8;
       this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
       this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
       this.delay = delay != null ? delay : 150;
       this.lastUpDeltas = (function() {
         var i, ref, results;
         results = [];
         for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
           results.push(null);
         }
         return results;
       }).call(this);
       this.lastDownDeltas = (function() {
         var i, ref, results;
         results = [];
         for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
           results.push(null);
         }
         return results;
       }).call(this);
       this.deltasTimestamp = (function() {
         var i, ref, results;
         results = [];
         for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
           results.push(null);
         }
         return results;
       }).call(this);
     }

     Lethargy.prototype.check = function(e) {
       var lastDelta;
       e = e.originalEvent || e;
       if (e.wheelDelta != null) {
         lastDelta = e.wheelDelta;
       } else if (e.deltaY != null) {
         lastDelta = e.deltaY * -40;
       } else if ((e.detail != null) || e.detail === 0) {
         lastDelta = e.detail * -40;
       }
       this.deltasTimestamp.push(Date.now());
       this.deltasTimestamp.shift();
       if (lastDelta > 0) {
         this.lastUpDeltas.push(lastDelta);
         this.lastUpDeltas.shift();
         return this.isInertia(1);
       } else {
         this.lastDownDeltas.push(lastDelta);
         this.lastDownDeltas.shift();
         return this.isInertia(-1);
       }
       return false;
     };

     Lethargy.prototype.isInertia = function(direction) {
       var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
       lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
       if (lastDeltas[0] === null) {
         return direction;
       }
       if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
         return false;
       }
       lastDeltasOld = lastDeltas.slice(0, this.stability);
       lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
       oldSum = lastDeltasOld.reduce(function(t, s) {
         return t + s;
       });
       newSum = lastDeltasNew.reduce(function(t, s) {
         return t + s;
       });
       oldAverage = oldSum / lastDeltasOld.length;
       newAverage = newSum / lastDeltasNew.length;
       if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
         return direction;
       } else {
         return false;
       }
     };

     Lethargy.prototype.showLastUpDeltas = function() {
       return this.lastUpDeltas;
     };

     Lethargy.prototype.showLastDownDeltas = function() {
       return this.lastDownDeltas;
     };

     return Lethargy;

   })();

 }).call(this);

 // smooth-scroll @ https://github.com/cferdinandi/smooth-scroll

 (function (root, factory) {
 	if ( typeof define === 'function' && define.amd ) {
 		define([], factory(root));
 	} else if ( typeof exports === 'object' ) {
 		module.exports = factory(root);
 	} else {
 		root.smoothScroll = factory(root);
 	}
 })(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

 	'use strict';

 	//
 	// Variables
 	//

 	var smoothScroll = {}; // Object for public APIs
 	var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test
 	var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval;

 	// Default settings
 	var defaults = {
 		// Selectors
 		selector: '[data-scroll]',
 		ignore: '[data-scroll-ignore]',
 		selectorHeader: null,

 		// Speed & Easing
 		speed: 500,
 		offset: 0,
 		easing: 'easeInOutCubic',
 		easingPatterns: {},

 		// Callback API
 		before: function () {},
 		after: function () {}
 	};


 	//
 	// Methods
 	//

 	/**
 	 * Merge two or more objects. Returns a new object.
 	 * @private
 	 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 	 * @param {Object}   objects  The objects to merge together
 	 * @returns {Object}          Merged values of defaults and options
 	 */
 	var extend = function () {

 		// Variables
 		var extended = {};
 		var deep = false;
 		var i = 0;
 		var length = arguments.length;

 		// Check if a deep merge
 		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
 			deep = arguments[0];
 			i++;
 		}

 		// Merge the object into the extended object
 		var merge = function (obj) {
 			for ( var prop in obj ) {
 				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
 					// If deep merge and property is an object, merge properties
 					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
 						extended[prop] = extend( true, extended[prop], obj[prop] );
 					} else {
 						extended[prop] = obj[prop];
 					}
 				}
 			}
 		};

 		// Loop through each object and conduct a merge
 		for ( ; i < length; i++ ) {
 			var obj = arguments[i];
 			merge(obj);
 		}

 		return extended;

 	};

 	/**
 	 * Get the height of an element.
 	 * @private
 	 * @param  {Node} elem The element to get the height of
 	 * @return {Number}    The element's height in pixels
 	 */
 	var getHeight = function ( elem ) {
 		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
 	};

 	/**
 	 * Get the closest matching element up the DOM tree.
 	 * @private
 	 * @param  {Element} elem     Starting element
 	 * @param  {String}  selector Selector to match against
 	 * @return {Boolean|Element}  Returns null if not match found
 	 */
 	var getClosest = function ( elem, selector ) {

 		// Element.matches() polyfill
 		if (!Element.prototype.matches) {
 			Element.prototype.matches =
 				Element.prototype.matchesSelector ||
 				Element.prototype.mozMatchesSelector ||
 				Element.prototype.msMatchesSelector ||
 				Element.prototype.oMatchesSelector ||
 				Element.prototype.webkitMatchesSelector ||
 				function(s) {
 					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
 						i = matches.length;
 					while (--i >= 0 && matches.item(i) !== this) {}
 					return i > -1;
 				};
 		}

 		// Get closest match
 		for ( ; elem && elem !== document; elem = elem.parentNode ) {
 			if ( elem.matches( selector ) ) return elem;
 		}

 		return null;

 	};

 	/**
 	 * Escape special characters for use with querySelector
 	 * @private
 	 * @param {String} id The anchor ID to escape
 	 * @author Mathias Bynens
 	 * @link https://github.com/mathiasbynens/CSS.escape
 	 */
 	var escapeCharacters = function ( id ) {

 		// Remove leading hash
 		if ( id.charAt(0) === '#' ) {
 			id = id.substr(1);
 		}

 		var string = String(id);
 		var length = string.length;
 		var index = -1;
 		var codeUnit;
 		var result = '';
 		var firstCodeUnit = string.charCodeAt(0);
 		while (++index < length) {
 			codeUnit = string.charCodeAt(index);
 			// Note: there’s no need to special-case astral symbols, surrogate
 			// pairs, or lone surrogates.

 			// If the character is NULL (U+0000), then throw an
 			// `InvalidCharacterError` exception and terminate these steps.
 			if (codeUnit === 0x0000) {
 				throw new InvalidCharacterError(
 					'Invalid character: the input contains U+0000.'
 				);
 			}

 			if (
 				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
 				// U+007F, […]
 				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
 				// If the character is the first character and is in the range [0-9]
 				// (U+0030 to U+0039), […]
 				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
 				// If the character is the second character and is in the range [0-9]
 				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
 				(
 					index === 1 &&
 					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
 					firstCodeUnit === 0x002D
 				)
 			) {
 				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
 				result += '\\' + codeUnit.toString(16) + ' ';
 				continue;
 			}

 			// If the character is not handled by one of the above rules and is
 			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
 			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
 			// U+005A), or [a-z] (U+0061 to U+007A), […]
 			if (
 				codeUnit >= 0x0080 ||
 				codeUnit === 0x002D ||
 				codeUnit === 0x005F ||
 				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
 				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
 				codeUnit >= 0x0061 && codeUnit <= 0x007A
 			) {
 				// the character itself
 				result += string.charAt(index);
 				continue;
 			}

 			// Otherwise, the escaped character.
 			// http://dev.w3.org/csswg/cssom/#escape-a-character
 			result += '\\' + string.charAt(index);

 		}

 		return '#' + result;

 	};

 	/**
 	 * Calculate the easing pattern
 	 * @private
 	 * @link https://gist.github.com/gre/1650294
 	 * @param {String} type Easing pattern
 	 * @param {Number} time Time animation should take to complete
 	 * @returns {Number}
 	 */
 	var easingPattern = function ( settings, time ) {
 		var pattern;

 		// Default Easing Patterns
 		if ( settings.easing === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
 		if ( settings.easing === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
 		if ( settings.easing === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
 		if ( settings.easing === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
 		if ( settings.easing === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
 		if ( settings.easing === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
 		if ( settings.easing === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
 		if ( settings.easing === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
 		if ( settings.easing === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
 		if ( settings.easing === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
 		if ( settings.easing === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
 		if ( settings.easing === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

 		// Custom Easing Patterns
 		if ( settings.easingPatterns[settings.easing] ) {
 			pattern = settings.easingPatterns[settings.easing]( time );
 		}

 		return pattern || time; // no easing, no acceleration
 	};

 	/**
 	 * Calculate how far to scroll
 	 * @private
 	 * @param {Element} anchor The anchor element to scroll to
 	 * @param {Number} headerHeight Height of a fixed header, if any
 	 * @param {Number} offset Number of pixels by which to offset scroll
 	 * @returns {Number}
 	 */
 	var getEndLocation = function ( anchor, headerHeight, offset ) {
 		var location = 0;
 		if (anchor.offsetParent) {
 			do {
 				location += anchor.offsetTop;
 				anchor = anchor.offsetParent;
 			} while (anchor);
 		}
 		location = Math.max(location - headerHeight - offset, 0);
 		return Math.min(location, getDocumentHeight() - getViewportHeight());
 	};

 	/**
 	 * Determine the viewport's height
 	 * @private
 	 * @returns {Number}
 	 */
 	var getViewportHeight = function() {
 		return Math.max( document.documentElement.clientHeight, root.innerHeight || 0 );
 	};

 	/**
 	 * Determine the document's height
 	 * @private
 	 * @returns {Number}
 	 */
 	var getDocumentHeight = function () {
 		return Math.max(
 			document.body.scrollHeight, document.documentElement.scrollHeight,
 			document.body.offsetHeight, document.documentElement.offsetHeight,
 			document.body.clientHeight, document.documentElement.clientHeight
 		);
 	};

 	/**
 	 * Convert data-options attribute into an object of key/value pairs
 	 * @private
 	 * @param {String} options Link-specific options as a data attribute string
 	 * @returns {Object}
 	 */
 	var getDataOptions = function ( options ) {
 		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
 	};

 	/**
 	 * Get the height of the fixed header
 	 * @private
 	 * @param  {Node}   header The header
 	 * @return {Number}        The height of the header
 	 */
 	var getHeaderHeight = function ( header ) {
 		return !header ? 0 : ( getHeight( header ) + header.offsetTop );
 	};

 	/**
 	 * Bring the anchored element into focus
 	 * @private
 	 */
 	var adjustFocus = function ( anchor, endLocation, isNum ) {

 		// Don't run if scrolling to a number on the page
 		if ( isNum ) return;

 		// Otherwise, bring anchor element into focus
 		anchor.focus();
 		if ( document.activeElement.id !== anchor.id ) {
 			anchor.setAttribute( 'tabindex', '-1' );
 			anchor.focus();
 			anchor.style.outline = 'none';
 		}
 		root.scrollTo( 0 , endLocation );

 	};

 	/**
 	 * Start/stop the scrolling animation
 	 * @public
 	 * @param {Node|Number} anchor  The element or position to scroll to
 	 * @param {Element}     toggle  The element that toggled the scroll event
 	 * @param {Object}      options
 	 */
 	smoothScroll.animateScroll = function ( anchor, toggle, options ) {

 		// Options and overrides
 		var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
 		var animateSettings = extend( settings || defaults, options || {}, overrides ); // Merge user options with defaults

 		// Selectors and variables
 		var isNum = Object.prototype.toString.call( anchor ) === '[object Number]' ? true : false;
 		var anchorElem = isNum || !anchor.tagName ? null : anchor;
 		if ( !isNum && !anchorElem ) return;
 		var startLocation = root.pageYOffset; // Current location on the page
 		if ( animateSettings.selectorHeader && !fixedHeader ) {
 			// Get the fixed header if not already set
 			fixedHeader = document.querySelector( animateSettings.selectorHeader );
 		}
 		if ( !headerHeight ) {
 			// Get the height of a fixed header if one exists and not already set
 			headerHeight = getHeaderHeight( fixedHeader );
 		}
 		var endLocation = isNum ? anchor : getEndLocation( anchorElem, headerHeight, parseInt((typeof animateSettings.offset === 'function' ? animateSettings.offset() : animateSettings.offset), 10) ); // Location to scroll to
 		var distance = endLocation - startLocation; // distance to travel
 		var documentHeight = getDocumentHeight();
 		var timeLapsed = 0;
 		var percentage, position;

 		/**
 		 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
 		 * @private
 		 * @param {Number} position Current position on the page
 		 * @param {Number} endLocation Scroll to location
 		 * @param {Number} animationInterval How much to scroll on this loop
 		 */
 		var stopAnimateScroll = function ( position, endLocation, animationInterval ) {
 			var currentLocation = root.pageYOffset;
 			if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {

 				// Clear the animation timer
 				clearInterval(animationInterval);

 				// Bring the anchored element into focus
 				adjustFocus( anchor, endLocation, isNum );

 				// Run callback after animation complete
 				animateSettings.after( anchor, toggle );

 			}
 		};

 		/**
 		 * Loop scrolling animation
 		 * @private
 		 */
 		var loopAnimateScroll = function () {
 			timeLapsed += 16;
 			percentage = ( timeLapsed / parseInt(animateSettings.speed, 10) );
 			percentage = ( percentage > 1 ) ? 1 : percentage;
 			position = startLocation + ( distance * easingPattern(animateSettings, percentage) );
 			root.scrollTo( 0, Math.floor(position) );
 			stopAnimateScroll(position, endLocation, animationInterval);
 		};

 		/**
 		 * Set interval timer
 		 * @private
 		 */
 		var startAnimateScroll = function () {
 			clearInterval(animationInterval);
 			animationInterval = setInterval(loopAnimateScroll, 16);
 		};

 		/**
 		 * Reset position to fix weird iOS bug
 		 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
 		 */
 		if ( root.pageYOffset === 0 ) {
 			root.scrollTo( 0, 0 );
 		}

 		// Run callback before animation starts
 		animateSettings.before( anchor, toggle );

 		// Start scrolling animation
 		startAnimateScroll();

 	};

 	/**
 	 * Handle has change event
 	 * @private
 	 */
 	var hashChangeHandler = function (event) {

 		// Get hash from URL
 		var hash;
 		try {
 			hash = escapeCharacters( decodeURIComponent( root.location.hash ) );
 		} catch(e) {
 			hash = escapeCharacters( root.location.hash );
 		}

 		// Only run if there's an anchor element to scroll to
 		if ( !anchor ) return;

 		// Reset the anchor element's ID
 		anchor.id = anchor.getAttribute( 'data-scroll-id' );

 		// Scroll to the anchored content
 		smoothScroll.animateScroll( anchor, toggle );

 		// Reset anchor and toggle
 		anchor = null;
 		toggle = null;

 	};

 	/**
 	 * If smooth scroll element clicked, animate scroll
 	 * @private
 	 */
 	var clickHandler = function (event) {

 		// Don't run if right-click or command/control + click
 		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

 		// Check if a smooth scroll link was clicked
 		toggle = getClosest( event.target, settings.selector );
 		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' || getClosest( event.target, settings.ignore ) ) return;

 		// Only run if link is an anchor and points to the current page
 		if ( toggle.hostname !== root.location.hostname || toggle.pathname !== root.location.pathname || !/#/.test(toggle.href) ) return;

 		// Get the sanitized hash
 		var hash;
 		try {
 			hash = escapeCharacters( decodeURIComponent( toggle.hash ) );
 		} catch(e) {
 			hash = escapeCharacters( toggle.hash );
 		}

 		// If the hash is empty, scroll to the top of the page
 		if ( hash === '#' ) {

 			// Prevent default link behavior
 			event.preventDefault();

 			// Set the anchored element
 			anchor = document.body;

 			// Save or create the ID as a data attribute and remove it (prevents scroll jump)
 			var id = anchor.id ? anchor.id : 'smooth-scroll-top';
 			anchor.setAttribute( 'data-scroll-id', id );
 			anchor.id = '';

 			// If no hash change event will happen, fire manually
 			// Otherwise, update the hash
 			if ( root.location.hash.substring(1) === id ) {
 				hashChangeHandler();
 			} else {
 				root.location.hash = id;
 			}

 			return;

 		}

 		// Get the anchored element
 		anchor = document.querySelector( hash );

 		// If anchored element exists, save the ID as a data attribute and remove it (prevents scroll jump)
 		if ( !anchor ) return;
 		anchor.setAttribute( 'data-scroll-id', anchor.id );
 		anchor.id = '';

 		// If no hash change event will happen, fire manually
 		if ( toggle.hash === root.location.hash ) {
 			event.preventDefault();
 			hashChangeHandler();
 		}

 	};

 	/**
 	 * On window scroll and resize, only run events at a rate of 15fps for better performance
 	 * @private
 	 * @param  {Function} eventTimeout Timeout function
 	 * @param  {Object} settings
 	 */
 	var resizeThrottler = function (event) {
 		if ( !eventTimeout ) {
 			eventTimeout = setTimeout(function() {
 				eventTimeout = null; // Reset timeout
 				headerHeight = getHeaderHeight( fixedHeader ); // Get the height of a fixed header if one exists
 			}, 66);
 		}
 	};

 	/**
 	 * Destroy the current initialization.
 	 * @public
 	 */
 	smoothScroll.destroy = function () {

 		// If plugin isn't already initialized, stop
 		if ( !settings ) return;

 		// Remove event listeners
 		document.removeEventListener( 'click', clickHandler, false );
 		root.removeEventListener( 'resize', resizeThrottler, false );

 		// Reset varaibles
 		settings = null;
 		anchor = null;
 		toggle = null;
 		fixedHeader = null;
 		headerHeight = null;
 		eventTimeout = null;
 		animationInterval = null;
 	};

 	/**
 	 * Initialize Smooth Scroll
 	 * @public
 	 * @param {Object} options User settings
 	 */
 	smoothScroll.init = function ( options ) {

 		// feature test
 		if ( !supports ) return;

 		// Destroy any existing initializations
 		smoothScroll.destroy();

 		// Selectors and variables
 		settings = extend( defaults, options || {} ); // Merge user options with defaults
 		fixedHeader = settings.selectorHeader ? document.querySelector( settings.selectorHeader ) : null; // Get the fixed header
 		headerHeight = getHeaderHeight( fixedHeader );

 		// When a toggle is clicked, run the click handler
 		document.addEventListener( 'click', clickHandler, false );

 		// Listen for hash changes
 		root.addEventListener('hashchange', hashChangeHandler, false);

 		// If window is resized and there's a fixed header, recalculate its size
 		if ( fixedHeader ) {
 			root.addEventListener( 'resize', resizeThrottler, false );
 		}

 	};


 	//
 	// Public APIs
 	//

 	return smoothScroll;

 });

// SOURCE

// Style definition
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'html {height: 100%; width: 100%; margin: 0;}'
  + 'body {height: 100%; width: 100%; margin: 0; overflow: hidden;}'
  + '.slide {height: 100%; width: 100%; display: flex;}';
document.getElementsByTagName('head')[0].appendChild(style);

// Object initialization

var pss = {};
pss.pages = {};
pss.currentPageNumber = 0;

// Input listeners

var didScroll = false;
var lethargy = new Lethargy(7, 10, 0.1);
window.addEventListener('wheel', function() {
  if (lethargy.check(event) != false && !didScroll) {
    var delta;
    if (event.wheelDelta){
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }
    if (delta < 0) {
      pss.scrollDown();
    } else if (delta > 0) {
      pss.scrollUp();
    }
    didScroll = true;
    setTimeout(function() {
      didScroll = false;
    }, 300);
  }
});

document.onkeydown = function(event) {
  if (event.keyCode == '38') {
    pss.scrollUp();
  } else if (event.keyCode == '40') {
    pss.scrollDown();
  }
};

// Load/unload handlers

window.onload = function() {
  var elements = document.getElementsByClassName('slide');
  for (var i = 0; i < elements.length; ++i) {
    pss.pages[elements[i].id] = {
      pageNumber: i
    };
  }
}

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}

// Scroll event handlers

pss.scrollToPage = function(pageName) {
  scrollToPageNumber(this.pages[pageName].pageNumber);
}

pss.scrollToPageNumber = function(pageNumber) {
  if (pageNumber >= 0 && pageNumber < Object.keys(this.pages).length) {
    // Call current page deinitiation handler
    const currentPage = this.pages[Object.keys(this.pages)[pageNumber]];
    if (currentPage.deinit) currentPage.deinit();
    // Scroll to new page
    smoothScroll.animateScroll(window.innerHeight * pageNumber);
    this.currentPageNumber = pageNumber;
    // Call new page initiation handler
    const newPage = this.pages[Object.keys(this.pages)[pageNumber]];
    if (newPage.init) newPage.init();
    // Call universal scroll handler
    if (this.onScroll) {
      this.onScroll();
    }
  }
}

pss.scrollUp = function() {
  this.scrollToPageNumber(this.currentPageNumber - 1);
}

pss.scrollDown = function() {
  this.scrollToPageNumber(this.currentPageNumber + 1);
}

// Property setting functions

pss.setOnScroll = function(func) {
  this.onScroll = func;
}

pss.setPageInit = function(pageName, func) {
  this.pages[pageName].init = func;
}

pss.setPageDeinit = function(pageName, func) {
  this.pages[pageName].deinit = func;
}

pss.getCurrentPageNumber = function() {
  return this.currentPageNumber;
}
