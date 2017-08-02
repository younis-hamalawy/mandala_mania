/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _draw_pad = __webpack_require__(1);

var _draw_pad2 = _interopRequireDefault(_draw_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');

  new _draw_pad2.default(canvas).init();
  var audio = document.getElementById('meditative-tune');
  // audio.play();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawPad = function () {
  function DrawPad(canvas) {
    _classCallCheck(this, DrawPad);

    this.canvas = canvas;
    // this.context = canvas.getContext('2d');
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;

    this.colors = ['#828b20', '#b0ac31', '#cbc53d', '#fad779', '#f9e4ad', '#faf2db', '#563512', '#9b4a0b', '#d36600', '#fe8a00', '#f9a71f'];
    this.MouseDown = this.MouseDown.bind(this);
    this.MouseUp = this.MouseUp.bind(this);
    this.MouseMove = this.MouseMove.bind(this);
  }

  _createClass(DrawPad, [{
    key: 'init',
    value: function init() {
      this.stage = new createjs.Stage('canvas');
      // Create a Shape DisplayObject.
      this.index = 0;
      this.axes = 6;
      createjs.Touch.enable(this.stage);
      // enable touch on Shape
      // this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
      this.stage.enableDOMEvents(true);
      // enable dom event handlers for the stage
      // this.stage.Ticker.setFPS(24);
      this.drawArea = new createjs.Shape();
      // this.circle.graphics.beginFill('black').drawCircle(255, 255, 255);
      // Set position of Shape instance.
      // this.circle.x = this.circle.y = 70;
      // Add Shape instance to stage display list.
      this.stage.addEventListener('stagemousedown', this.MouseDown);
      // Add event listener for the stage
      this.stage.addEventListener('stagemouseup', this.MouseUp);
      // Remove event listener for the stage
      this.title = new createjs.Text('Click and Drag to draw', '36px Arial', '#777777');
      this.title.x = 100;
      this.title.y = 200;
      this.stage.addChild(this.title);
      this.stage.addChild(this.drawArea);
      // Update stage will render next frame
      this.stage.update();
    }
  }, {
    key: 'getPos',
    value: function getPos(e) {
      var rectangle = this.canvas.getBoundingClientRect();
      return {
        x: this.stage.mouseX - this.canvas_width / 2,
        y: -this.stage.mouseY - 2 + this.canvas_height / 2
      };
    }
  }, {
    key: 'MouseDown',
    value: function MouseDown(event) {
      if (!event.primary) {
        return;
      }
      if (this.stage.contains(this.title)) {
        this.stage.clear();
        this.stage.removeChild(this.title);
      }
      this.color = this.colors[this.index++ % this.colors.length];
      this.stroke = 5;
      this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
      this.oldMidPt = this.oldPt.clone();

      this.stage.addEventListener('stagemousemove', this.MouseMove);
      this.stage.update();
    }
  }, {
    key: 'MouseMove',
    value: function MouseMove(event) {
      if (!event.primary) {
        return;
      }
      this.midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);

      this.drawArea.graphics
      // .clear()
      .setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(this.midPt.x, this.midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);

      this.oldPt.x = this.stage.mouseX;
      this.oldPt.y = this.stage.mouseY;

      this.oldMidPt.x = this.midPt.x;
      this.oldMidPt.y = this.midPt.y;

      this.stage.update();
    }
  }, {
    key: 'MouseUp',
    value: function MouseUp(event) {
      if (!event.primary) {
        return;
      }
      this.stage.removeEventListener('stagemousemove', this.MouseMove);
    }
  }]);

  return DrawPad;
}();

exports.default = DrawPad;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map