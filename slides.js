// Imports

// var smoothScroll = document.createElement('script');
// smoothScroll.src = 'slides-imports/smooth-scroll.js';
// document.head.appendChild(smoothScroll);
//
// var lethargy = document.createElement('script');
// lethargy.src = 'slides-imports/lethargy.js';
// document.head.appendChild(lethargy);

// Object initialization

var slides = {};
slides.pages = {};
slides.currentPageNumber = 0;

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
      slides.scrollDown();
    } else if (delta > 0) {
      slides.scrollUp();
    }
    didScroll = true;
    setTimeout(function() {
      didScroll = false;
    }, 300);
  }
});

document.onkeydown = function(event) {
  if (event.keyCode == '38') {
    slides.scrollUp();
  } else if (event.keyCode == '40') {
    slides.scrollDown();
  }
};

// Load/unload handlers

window.onload = function() {
  var elements = document.getElementsByClassName('slide');
  for (var i = 0; i < elements.length; ++i) {
    slides.pages[elements[i].id] = {
      pageNumber: i
    };
  }
}

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}

// Scroll event handlers

slides.scrollToPage = function(pageName) {
  scrollToPageNumber(this.pages[pageName].pageNumber);
}

slides.scrollToPageNumber = function(pageNumber) {
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

slides.scrollUp = function() {
  this.scrollToPageNumber(this.currentPageNumber - 1);
}

slides.scrollDown = function() {
  this.scrollToPageNumber(this.currentPageNumber + 1);
}

// Property setting functions

slides.setOnScroll = function(func) {
  this.onScroll = func;
}

slides.setPageInit = function(pageName, func) {
  this.pages[pageName].init = func;
}

slides.setPageDeinit = function(pageName, func) {
  this.pages[pageName].deinit = func;
}
