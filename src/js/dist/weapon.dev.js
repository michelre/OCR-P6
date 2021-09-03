"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function Weapon(x, y, damages) {
  _classCallCheck(this, Weapon);

  this.x = x;
  this.y = y;
  this.damages = damages;
  this.name = "";
  this.img = "";
}; // console.log('weapons-hello');