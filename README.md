# page-sized-slides.js

A simple, lightweight, & customizable library for creating slideshow-esque single-page websites. See the demo [here](http://jmao.co/page-sized-slides/).

This project is licensed under the MIT License. See details [here](https://github.com/justinmao/page-sized-slides/blob/master/LICENSE).

## Installation/Usage

Download the [`.js`](https://github.com/justinmao/page-sized-slides/blob/master/dist/page-sized-slides.js) or [`.min.js`](https://github.com/justinmao/page-sized-slides/blob/master/dist/page-sized-slides.min.js).

Include a link to the `.js` file (e.g. `<script src="dist/page-sized-slides.js"></script>`) in your document header.

Page elements should have the `class="slide"` attribute. *Please note each page element must also have an `id` attribute so navigation may work properly.*

See the [notes section](#notes) for more information.

## Built-in Functions

Including `page-sized-slides.js` gives you your very own `pss` object that manages your pages for you. The following functions belong to your `pss` object (e.g. `pss.getCurrentPageNumber()`).

| Function                         | Arguments                                | Usage |
| -------------------------------- | ---------------------------------------- | --- |
| `scrollToPage(pageName)`         | `pageName`: string                       | Scroll to `pageName` (html `id` attribute). |
| `scrollToPageNumber(pageNumber)` | `pageNumber`: number                     | Scroll to `pageNumber` (in order of appearance, starting at 0). |
| `scrollUp()`                     |                                          | Scroll up by one page.
| `scrollDown()`                   |                                          | Scroll down by one page.
| `setOnScroll(func)`              | `func`: function                         | Set `func` to fire every time a scroll event triggers. |
| `setPageInit(pageName, func)`    | `pageName`: string <br> `func`: function | Set `func` to fire when scrolling to `pageName`. |
| `setPageDeinit(pageName, funct)` | `pageName`: string <br> `func`: function | Set `func` to fire when scrolling away from `pageName`. |
| `getCurrentPageNumber()`         |                                          | Returns the current page number. |

## Notes

* The following css attributes are included and set automatically:
```css
html {
  height: 100%;
  width: 100%;
  margin: 0;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.slide {
  height: 100%;
  width: 100%;
  display: flex;
}
```

* Suggestion: Add `overflow: hidden` or `overflow: scroll` to `.slide` to prevent elements from spilling into other pages.

* page-sized-slides.js makes use of `window.onbeforeload`, and `document.onkeydown` properties. *Overwriting these methods may (probably will) cause issues.*
