"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Grid =
/*#__PURE__*/
function () {
  function Grid(nbLines, nbColumns, nbObstacles, nbWeapons, nbPlayers) {
    _classCallCheck(this, Grid);

    this.nbLines = nbLines;
    this.nbColumns = nbColumns;
    this.nbObstacles = nbObstacles;
    this.nbWeapons = nbWeapons;
    this.nbPlayers = nbPlayers;
    this.players = [];
    this.weapons = [];
    this.obstacles = [];
    this.activePlayerIndex = 0;
  }

  _createClass(Grid, [{
    key: "createGrid",
    value: function createGrid() {
      var _this = this;

      var table = "<table>";
      var gameGrid = document.querySelector('.game-grid'); // console.log("game-grid" + gameGrid);

      for (var i = 0; i < this.nbLines; i++) {
        var line = "<tr>";

        for (var j = 0; j < this.nbColumns; j++) {
          var column = "<td data-x=" + j + " data-y=" + i + "></td>";
          line += column;
        }

        line += "</tr>";
        table += line;
      }

      table += "</table>";
      gameGrid.innerHTML = table;
      document.querySelectorAll("td").forEach(function (td) {
        // function(td)
        td.addEventListener('click', function (e) {
          // function (e)
          if (e.target.classList.contains("movable")) {
            _this.movePlayer(e.target); // pour récupérer les nouvellles coordonnées du player

          }
        });
      });
    }
  }, {
    key: "displayPlayersInfo",
    value: function displayPlayersInfo() {
      var c = document.querySelector('.content__item-players');
      c.innerHTML = "";

      for (var j = 0; j < this.players.length; j++) {
        var imagePlayer = j == 0 ? "link.png" : "Ganondorf.png";
        var aside = document.createElement('aside');
        aside.innerHTML = "<div class=\"info-wrapper\">\n            <div class=\"info-wrapper__content-left\">\n            <div class=\"info-wrapper__item-description__img\">\n            <img src=\"/src/img/".concat(imagePlayer, "\">\n            </div>\n            </div>\n            <div class=\"info-wrapper__content-right\">\n            <div class=\"info-wrapper__header\">").concat(this.players[j].name, "</div>\n            <div class=\"info-wrapper__body\">\n            <div id=\"player__weapon\">\n            Arme : ").concat(this.players[j].weapon.name, "\n            </div>\n            <div id=\"player__life\">\n            Vie : ").concat(this.players[j].life, "\n            </div>\n            </div>\n            </div>\n            </div>");
        c.appendChild(aside);
      }
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(td) {
      //console.log("movePlayer", td);
      //1. récupérer (x,y) de la case td
      var x = parseInt(td.dataset.x);
      var y = parseInt(td.dataset.y);
      this.takeWeapon(x, y); //2. attribuer les nouvelles coordonnées au player actif

      this.players[this.activePlayerIndex].x = x;
      this.players[this.activePlayerIndex].y = y; //3. déplacer (changer) l'image de place => attribuer à l'image les nouvelles coordonnées
      //4. changer "activePlayer" => getMovableCells & drawMovableCells

      this.renderGrid();
      this.changeActivePlayerIndex();
      var cells = this.getMovableCells();
      this.drawMovableCells(cells);
    }
  }, {
    key: "renderGrid",
    value: function renderGrid() {
      this.createGrid();
      this.drawObstacles();
      this.drawPlayers();
      this.drawWeapons();
      this.displayPlayersInfo();
      this.displayWeaponsInfo();
    } // isEmptyCell(x, y) {
    //     for (let i = 0; i < this.obstacles.length; i++) {
    //         if (this.obstacles[i].x == x && this.obstacles[i].y == y) {
    //             return false;
    //         }
    //     }
    //     // for (let i = 0; i < this.players.length; i++) {
    //     //     if (this.players[i].x == x && this.players[i].y == y) {
    //     //         return false;
    //     //     }
    //     // }
    //     for (let i = 0; i < this.weapons.length; i++) {
    //         if (this.weapons[i].x == (x + 1) && this.weapons[i].y == (y + 1)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

  }, {
    key: "isEmptyCellObstacle",
    value: function isEmptyCellObstacle(x, y) {
      for (var i = 0; i < this.obstacles.length; i++) {
        if (this.obstacles[i].x == x && this.obstacles[i].y == y) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isEmptyCellPlayer",
    value: function isEmptyCellPlayer(x, y) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].x == x && this.players[i].y == y) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isEmptyCellWeapon",
    value: function isEmptyCellWeapon(x, y) {
      for (var i = 0; i < this.weapons.length; i++) {
        if (this.weapons[i].x == x && this.weapons[i].y == y) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isCellWeapon",
    value: function isCellWeapon(x, y) {
      for (var i = 0; i < this.weapons.length; i++) {
        if (this.weapons[i].x == x && this.weapons[i].y == y) {
          return this.weapons[i];
        }
      }

      return null;
    }
  }, {
    key: "isPlayerCollapsed",
    value: function isPlayerCollapsed(x, y) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].x == x + 1 && this.players[i].y == y) {
          return true;
        }

        if (this.players[i].x == x - 1 && this.players[i].y == y) {
          return true;
        }

        if (this.players[i].y == y + 1 && this.players[i].x == x) {
          return true;
        }

        if (this.players[i].y == y - 1 && this.players[i].x == x) {
          return true;
        }
      }

      return false;
    }
    /*************************
    * Obstacles
    *************************/

  }, {
    key: "createObstacles",
    value: function createObstacles() {
      var k = 0;

      while (k < this.nbObstacles) {
        var x = Math.floor(Math.random() * this.nbLines);
        var y = Math.floor(Math.random() * this.nbColumns);

        if (this.isEmptyCellObstacle(x, y)) {
          this.obstacles.push({
            x: x,
            y: y
          });
          k++;
        }
      } //console.log(this.obstacles);

    }
  }, {
    key: "drawObstacles",
    value: function drawObstacles() {
      for (var i = 0; i < this.obstacles.length; i++) {
        var cell = document.querySelector('td[data-x="' + this.obstacles[i].x + '"][data-y="' + this.obstacles[i].y + '"]');
        cell.classList.add("obstacle");
      }
    }
    /*************************
    * Weapons
    *************************/

  }, {
    key: "createWeapons",
    value: function createWeapons() {
      var l = 0;

      while (l < this.nbWeapons) {
        var x = Math.floor(Math.random() * this.nbLines);
        var y = Math.floor(Math.random() * this.nbColumns);

        if (this.isEmptyCellWeapon(x, y)) {
          this.weapons.push(new Weapon(x, y, 0));
          l++;
        }
      }

      this.weapons[0].name = 'Hache de maître';
      this.weapons[0].img = 'Hache_du_Maitre_ocrp6_jmg.png';
      this.weapons[0].damages = 10;
      this.weapons[1].name = 'Epée Royale';
      this.weapons[1].img = 'epee_royal_ocrp6_jmg.png';
      this.weapons[1].damages = 20;
      this.weapons[2].name = 'Epée des Flammes';
      this.weapons[2].img = 'epee_des_flammes_ocrp6_jmg.png';
      this.weapons[2].damages = 30;
      this.weapons[3].name = 'Hallebarde de Garde Royal';
      this.weapons[3].img = 'Hallebarde_de_Garde_Royal_ocrp6_jmg.png';
      this.weapons[3].damages = 40;
      this.weapons[4].name = 'Epée de Légende';
      this.weapons[4].img = 'epee_de_legende_ocrp6_jmg.png';
      this.weapons[4].damages = 50; //console.log(this.weapons);
    }
  }, {
    key: "drawWeapons",
    value: function drawWeapons() {
      var b = document.querySelector('.weapon');

      for (var i = 0; i < this.weapons.length; i++) {
        var cell = document.querySelector('td[data-x="' + this.weapons[i].x + '"][data-y="' + this.weapons[i].y + '"]');
        cell.innerHTML = "<img class=\"weapon-img\" src=\"/src/img/".concat(this.weapons[i].img, "\">"); // console.log(cell);
        // cell.classList.add("weapon" + i);
      }
    }
  }, {
    key: "displayWeaponsInfo",
    value: function displayWeaponsInfo() {
      var c = document.querySelector('.content__item-weapons');
      c.innerHTML = "";

      for (var j = 0; j < this.weapons.length; j++) {
        var aside = document.createElement('aside');
        aside.innerHTML = "<div class=\"info-wrapper\">\n            <div class=\"info-wrapper__content-left\">\n            <div class=\"info-wrapper__item-description__img\">\n            <img src=\"/src/img/".concat(this.weapons[j].img, "\">\n            </div>\n            </div>\n            <div class=\"info-wrapper__content-right\">\n            <div class=\"info-wrapper__header\">").concat(this.weapons[j].name, "</div>\n            <div class=\"info-wrapper__body\">\n            <div id=\"weapon__dammages\">\n            Dommages : ").concat(this.weapons[j].damages, "\n            </div>\n            </div>\n            </div>\n            </div>");
        c.appendChild(aside);
      }

      ;
    }
  }, {
    key: "takeWeapon",
    value: function takeWeapon(x, y) {
      var wCell = this.isCellWeapon(x, y);
      var wPlayer = this.players[this.activePlayerIndex].weapon;

      if (wCell) {
        var newWeapons = this.weapons.filter(function (weapon) {
          return weapon.name != wCell.name;
        });
        wPlayer.x = x;
        wPlayer.y = y;
        newWeapons.push(wPlayer);
        this.players[this.activePlayerIndex].weapon = wCell;
        console.log(newWeapons, this.weapons);
        this.weapons = newWeapons;
      }
    }
    /*************************
    * Players
    *************************/

  }, {
    key: "createPlayers",
    value: function createPlayers() {
      var m = 0;

      while (m < this.nbPlayers) {
        var x = Math.floor(Math.random() * this.nbLines);
        var y = Math.floor(Math.random() * this.nbColumns);

        if (this.isEmptyCellPlayer(x, y) && !this.isPlayerCollapsed(x, y)) {
          this.players.push(new Player(x, y));
          m++;
        }
      }

      this.players[0].name = 'Link';
      this.players[1].name = 'Ganondorf'; // console.log(this.players);
    }
  }, {
    key: "drawPlayers",
    value: function drawPlayers() {
      for (var i = 0; i < this.players.length; i++) {
        var cell = document.querySelector('td[data-x="' + this.players[i].x + '"][data-y="' + this.players[i].y + '"]');
        cell.classList.add("players");
        cell.classList.add(this.players[i].name);
      }
    }
  }, {
    key: "changeActivePlayerIndex",
    value: function changeActivePlayerIndex() {
      // if (this.activePlayerIndex == 0)
      //     this.activePlayerIndex = 1
      // else
      // this.activePlayerIndex = 0;
      this.activePlayerIndex = this.activePlayerIndex == 0 ? 1 : 0;
    }
  }, {
    key: "isActivePlayer",
    value: function isActivePlayer() {
      if (this.activePlayerIndex == 0) this.players = 'player1';else this.players = 'player2';
    }
    /*************************
    * Cells
    *************************/

  }, {
    key: "getMovableCells",
    value: function getMovableCells() {
      var x = parseInt(this.players[this.activePlayerIndex].x);
      var y = parseInt(this.players[this.activePlayerIndex].y);
      var cells = []; // déplacement à droite

      for (var i = x + 1; i < x + 4; i++) {
        if (this.isEmptyCellObstacle(i, y) && this.isEmptyCellPlayer(i, y) && i >= 0 && i < this.nbLines) cells.push({
          x: i,
          y: y
        });else break;
      } // déplacement à gauche


      for (var _i = x - 1; _i > x - 4; _i--) {
        if (this.isEmptyCellObstacle(_i, y) && this.isEmptyCellPlayer(_i, y) && _i >= 0 && _i < this.nbLines) cells.push({
          x: _i,
          y: y
        });else break;
      } // déplacement à bas


      for (var _i2 = y + 1; _i2 < y + 4; _i2++) {
        if (this.isEmptyCellObstacle(x, _i2) && this.isEmptyCellPlayer(x, _i2) && _i2 >= 0 && _i2 < this.nbColumns) cells.push({
          x: x,
          y: _i2
        });else break;
      } // déplacement à haut


      for (var _i3 = y - 1; _i3 > y - 4; _i3--) {
        if (this.isEmptyCellObstacle(x, _i3) && this.isEmptyCellPlayer(x, _i3) && _i3 >= 0 && _i3 < this.nbColumns) cells.push({
          x: x,
          y: _i3
        });else break;
      } // console.log(cells);


      return cells;
    }
  }, {
    key: "drawMovableCells",
    value: function drawMovableCells(cells) {
      for (var i = 0; i < cells.length; i++) {
        var cell = document.querySelector('td[data-x="' + cells[i].x + '"][data-y="' + cells[i].y + '"]');
        cell.classList.add("movable");
      }
    }
  }]);

  return Grid;
}();