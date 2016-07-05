# CamanJS LUT Plugin

This is a plugin for [CamanJS](http://camanjs.com) which is a JavaScript library for canvas/image manipulation.
The plugin gives CamanJS ability to apply a [LUT (Lookup Table)](http://www.premiumbeat.com/blog/understanding-luts-in-color-grading/) to a canvas image.

To apply a LUT on your canvas, you need its Base64 representation like you know it from the web:
`
data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAA...
`

# How to use

* Include `caman.lut.js` in your HTML after including CamanJS' latest bundle.
* Simply use the `lut(lutData)` function like any other CamanJS filter or plugin.

```javascript
var myLutData = 'data:image/jpeg;base64,/9j/4QAYRX...';

Caman('#lut-preview', function () {
    this.revert(true); // update the canvas' context
    this.lut(myLutData); // apply LUT
    this.render(); // render back to canvas with ID #lut-preview
});
```
