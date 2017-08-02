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
    this.stroke = 3;
    this.colors = ['#ff3311', '#69d025', '#ccbb33', '#ff4422', '#12bdb9', '#ff6644', '#442299', '#ff9933', '#feae2d', '#d0c310', '#aacc22', '#22ccaa', '#11aabb', '#4444dd', '#3311bb'];
    this.MouseDown = this.MouseDown.bind(this);
    this.MouseUp = this.MouseUp.bind(this);
    this.MouseMove = this.MouseMove.bind(this);
    this.init = this.init.bind(this);
    this.getPos = this.getPos.bind(this);
    this.reset = this.reset.bind(this);
    this.change = this.change.bind(this);
    document.getElementById('reset').onclick = this.reset;
    document.getElementById('pointer-size').oninput = this.change('stroke');
    document.getElementById('axes').oninput = this.change('axes');
  }

  _createClass(DrawPad, [{
    key: 'init',
    value: function init() {
      this.stage = new createjs.Stage('canvas');
      // Create a Shape DisplayObject.
      this.index = 0;
      this.axes = 12;
      createjs.Touch.enable(this.stage);
      // enable touch on Shape
      this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
      this.stage.scaleY = -1;
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
      // this.title = new createjs.Text('Click and Drag to draw', '36px Arial', '#777777');
      // this.title.x = -180;
      // this.title.y = 0;
      // this.stage.addChild(this.title);
      this.stage.addChild(this.drawArea);
      // Update stage will render next frame
      this.stage.update();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.stage.clear();
      this.stage.removeChildAt(this.stage.children.length - 1);
      this.drawArea = new createjs.Shape();
      this.stage.addChild(this.drawArea);
      this.stage.update();
    }
  }, {
    key: 'change',
    value: function change(value) {
      var _this = this;

      return function (event) {
        _this[value] = event.currentTarget.value;
        if (value === 'stroke') {
          document.getElementById('pointer-size').innerHTML = _this.stroke;
        } else if (value === 'axes') {
          document.getElementById('axes').value = _this.axes;
        }
      };
    }
  }, {
    key: 'getPos',
    value: function getPos(e) {
      var rectangle = this.canvas.getBoundingClientRect();
      return {
        x: this.stage.mouseX - this.canvas_width / 2,
        y: -this.stage.mouseY + this.canvas_height / 2
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

      var _getPos = this.getPos(event),
          mouseX = _getPos.x,
          mouseY = _getPos.y;

      this.color = this.colors[this.index++ % this.colors.length];

      this.oldPt = new createjs.Point(mouseX, mouseY);
      this.oldMidPt = this.oldPt.clone();

      for (var i = 1; i < this.axes + 1; i++) {
        var _rotate = this.rotate(mouseX, mouseY, i, this.axes),
            x1 = _rotate.x,
            y1 = _rotate.y;

        this.drawArea.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).beginFill(this.color).drawCircle(x1, y1, this.stroke >> 1);
      }

      this.stage.addEventListener('stagemousemove', this.MouseMove);
      this.stage.update();
    }
  }, {
    key: 'MouseMove',
    value: function MouseMove(event) {
      if (!event.primary) {
        return;
      }
      var createjs = window.createjs;

      var _getPos2 = this.getPos(event),
          mouseX = _getPos2.x,
          mouseY = _getPos2.y;

      this.midPt = new createjs.Point(this.oldPt.x + mouseX >> 1, this.oldPt.y + mouseY >> 1);

      this.drawArea.graphics;
      // .clear();
      for (var i = 1; i < this.axes + 1; i++) {
        var _rotate2 = this.rotate(this.midPt.x, this.midPt.y, i, this.axes),
            x1 = _rotate2.x,
            y1 = _rotate2.y;

        var _rotate3 = this.rotate(this.oldPt.x, this.oldPt.y, i, this.axes),
            x2 = _rotate3.x,
            y2 = _rotate3.y;

        var _rotate4 = this.rotate(this.oldMidPt.x, this.oldMidPt.y, i, this.axes),
            x3 = _rotate4.x,
            y3 = _rotate4.y;

        this.drawArea.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(x1, y1).curveTo(x2, y2, x3, y3);
      }

      this.oldPt.x = mouseX;
      this.oldPt.y = mouseY;

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
  }, {
    key: 'rotate',
    value: function rotate(x, y, i, axes) {
      return {
        x: x * Math.cos(2 * i * Math.PI / axes) - y * Math.sin(2 * i * Math.PI / axes),
        y: x * Math.sin(2 * i * Math.PI / axes) + y * Math.cos(2 * i * Math.PI / axes)
      };
    }
  }]);

  return DrawPad;
}();

exports.default = DrawPad;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map