"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(x, y) {
  _classCallCheck(this, Player);

  this.x = x;
  this.y = y;
  this.life = 100;
  this.weapon = new Weapon(-1, -1, 0);
  this.weapon.name = "Espadon rouillée";
  this.weapon.img = "espadon_rouillee_ocrp6_jmg.png";
  this.name = "";
}; // console.log('players-hello');