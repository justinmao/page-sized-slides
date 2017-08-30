/*
 * page-sized-slides 1.0.8
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
 * Original source code begins at line 30.
 */

 // DEPENDENCIES

 // lethargy @ https://github.com/d4nyll/lethargy

(function(){var t;t="undefined"!=typeof exports&&null!==exports?exports:this,t.Lethargy=function(){function t(t,s,i,l){this.stability=null!=t?Math.abs(t):8,this.sensitivity=null!=s?1+Math.abs(s):100,this.tolerance=null!=i?1+Math.abs(i):1.1,this.delay=null!=l?l:150,this.lastUpDeltas=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this),this.lastDownDeltas=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this),this.deltasTimestamp=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this)}return t.prototype.check=function(t){var s;return t=t.originalEvent||t,null!=t.wheelDelta?s=t.wheelDelta:null!=t.deltaY?s=-40*t.deltaY:(null!=t.detail||0===t.detail)&&(s=-40*t.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),s>0?(this.lastUpDeltas.push(s),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(s),this.lastDownDeltas.shift(),this.isInertia(-1))},t.prototype.isInertia=function(t){var s,i,l,a,e,n,h;return s=-1===t?this.lastDownDeltas:this.lastUpDeltas,null===s[0]?t:this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&s[0]===s[2*this.stability-1]?!1:(l=s.slice(0,this.stability),i=s.slice(this.stability,2*this.stability),h=l.reduce(function(t,s){return t+s}),e=i.reduce(function(t,s){return t+s}),n=h/l.length,a=e/i.length,Math.abs(n)<Math.abs(a*this.tolerance)&&this.sensitivity<Math.abs(a)?t:!1)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}).call(this);

 // smooth-scroll @ https://github.com/cferdinandi/smooth-scroll

!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t,n,o,r,a,i,c,l={},s="querySelector"in document&&"addEventListener"in e,u={selector:"[data-scroll]",ignore:"[data-scroll-ignore]",selectorHeader:null,speed:500,offset:0,easing:"easeInOutCubic",easingPatterns:{},before:function(){},after:function(){}},f=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=f(!0,e[o],n[o]):e[o]=n[o])};o>n;n++){var a=arguments[n];r(a)}return e},d=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},m=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,a="",i=n.charCodeAt(0);++r<o;){if(t=n.charCodeAt(r),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===r&&t>=48&&57>=t||1===r&&t>=48&&57>=t&&45===i?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(r):"\\"+n.charAt(r)}return"#"+a},g=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.easingPatterns[e.easing]&&(n=e.easingPatterns[e.easing](t)),n||t},p=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=Math.max(o-t-n,0),Math.min(o,v()-b())},b=function(){return Math.max(document.documentElement.clientHeight,e.innerHeight||0)},v=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},y=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},O=function(e){return e?d(e)+e.offsetTop:0},S=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))};l.animateScroll=function(n,o,i){var l=y(o?o.getAttribute("data-options"):null),s=f(t||u,i||{},l),d="[object Number]"===Object.prototype.toString.call(n)?!0:!1,h=d||!n.tagName?null:n;if(d||h){var m=e.pageYOffset;s.selectorHeader&&!r&&(r=document.querySelector(s.selectorHeader)),a||(a=O(r));var b,E,I=d?n:p(h,a,parseInt("function"==typeof s.offset?s.offset():s.offset,10)),H=I-m,A=v(),j=0,C=function(t,r,a){var i=e.pageYOffset;(t==r||i==r||e.innerHeight+i>=A)&&(clearInterval(a),S(n,r,d),s.after(n,o))},M=function(){j+=16,b=j/parseInt(s.speed,10),b=b>1?1:b,E=m+H*g(s,b),e.scrollTo(0,Math.floor(E)),C(E,I,c)},w=function(){clearInterval(c),c=setInterval(M,16)};0===e.pageYOffset&&e.scrollTo(0,0),s.before(n,o),w()}};var E=function(t){var r;try{r=m(decodeURIComponent(e.location.hash))}catch(a){r=m(e.location.hash)}n&&(n.id=n.getAttribute("data-scroll-id"),l.animateScroll(n,o),n=null,o=null)},I=function(r){if(0===r.button&&!r.metaKey&&!r.ctrlKey&&(o=h(r.target,t.selector),o&&"a"===o.tagName.toLowerCase()&&!h(r.target,t.ignore)&&o.hostname===e.location.hostname&&o.pathname===e.location.pathname&&/#/.test(o.href))){var a;try{a=m(decodeURIComponent(o.hash))}catch(i){a=m(o.hash)}if("#"===a){r.preventDefault(),n=document.body;var c=n.id?n.id:"smooth-scroll-top";return n.setAttribute("data-scroll-id",c),n.id="",void(e.location.hash.substring(1)===c?E():e.location.hash=c)}n=document.querySelector(a),n&&(n.setAttribute("data-scroll-id",n.id),n.id="",o.hash===e.location.hash&&(r.preventDefault(),E()))}},H=function(e){i||(i=setTimeout(function(){i=null,a=O(r)},66))};return l.destroy=function(){t&&(document.removeEventListener("click",I,!1),e.removeEventListener("resize",H,!1),t=null,n=null,o=null,r=null,a=null,i=null,c=null)},l.init=function(n){s&&(l.destroy(),t=f(u,n||{}),r=t.selectorHeader?document.querySelector(t.selectorHeader):null,a=O(r),document.addEventListener("click",I,!1),e.addEventListener("hashchange",E,!1),r&&e.addEventListener("resize",H,!1))},l});

// SOURCE

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

  // Mobile input listeners

  var y_0 = null;

  document.addEventListener('touchstart', function(event) {
    y_0 = event.touches[0].clientY;
  }, false);

  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    if (!y_0) return;
    var y = event.touches[0].clientY;
    var d_y = y_0 - y;
    if (d_y > 0) pss.scrollDown();
    else pss.scrollUp();
    y_0 = null;
  });

} else {

  // Desktop input listeners

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

}

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

// Load/unload handlers

window.addEventListener('load', function() {
  var elements = document.getElementsByClassName('slide');
  for (var i = 0; i < elements.length; ++i) {
    if (!elements[i].id) {
      pss.pages['_' + i] = { pageNumber: i };
    } else {
      pss.pages[elements[i].id] = { pageNumber: i };
    }
  }
}, false);

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
