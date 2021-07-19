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
      var playerName = "";
      var playerNameDisplay = document.getElementsByClassName('info-wrapper__title');

      for (var j = 0; j < this.players.length; j++) {
        var infoPlayerId = "<div id=\"playerNameId" + j + "\">" + this.players[j].name + "</div>";
        console.log("j =  " + j);
        console.log("this.players[j].name =  " + this.players[j].name);
        console.log("infoPlayerId " + infoPlayerId);
        infoPlayerId++;
      }

      playerNameDisplay.innerHTML = this.infoPlayerId;
      console.log("playerNameDisplay = " + playerNameDisplay); // for(let i = 0; i < this.players.length; i++) {
      //     let playerName = this.players[i].name;
      //     console.log("salut " + playerName);
      //     playerName ++;
      //     console.log("bonsoir " + this.players[i].name);
      //     }
      // const playerName1 = document.getElementById('playerName1');
      // playerName1.innerHTML =this.players[0].name;
      // const playerName2 = document.getElementById('playerName2');
      // playerName2.innerHTML =  this.players[1].name;
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(td) {
      console.log("movePlayer", td); //1. récupérer (x,y) de la case td

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
      }

      console.log(this.obstacles);
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

      this.weapons[0].name = 'Épée de légende';
      this.weapons[1].name = 'Lance de soldat';
      this.weapons[2].name = 'Hache de maître';
      this.weapons[3].name = 'Grand bommerang';
      this.weapons[4].name = 'Arc royal';
      console.log(this.weapons);
    }
  }, {
    key: "takeWeapon",
    value: function takeWeapon(x, y) {
      var w = this.players[this.activePlayerIndex].weapon;
      var wCell = this.isCellWeapon(x, y);

      if (wCell) {
        this.players[this.activePlayerIndex].weapon = wCell;
      }
    }
  }, {
    key: "drawWeapons",
    value: function drawWeapons() {
      for (var i = 0; i < this.weapons.length; i++) {
        var cell = document.querySelector('td[data-x="' + this.weapons[i].x + '"][data-y="' + this.weapons[i].y + '"]');
        cell.classList.add("weapon" + i);
        console.log(cell);
      }
    }
  }, {
    key: "displayWeaponsInfo",
    value: function displayWeaponsInfo() {
      var contentItemWeapons = document.getElementById('weapons');
      contentItemWeapons.innerHTML = "<aside class=\"info-wrapper\">\n            <div class=\"info-wrapper__title\">armes</div>\n            <div class=\"info-wrapper__item-description\">\n                <div class=\"info-wrapper__item-description__img\">   \n                    <img src=\"../img/epee-de-legende.png\">\n                </div>\n                <div class=\"info-wrapper__item-description__body\">\n                    <div id=\"weapon__name\">nom</div>\n                    <div id=\"weapon__damages\">d\xE9gats</div>\n                </div>\n        </aside>";
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

      this.players[0].name = 'player1';
      this.players[1].name = 'player2';
      console.log(this.players);
    } // displayPlayersInfo() {
    //     for(let i = 0; i < this.players.length; i++) {
    //         console.log(i);
    //         const contentItemPlayers = document.getElementById('player1');
    //         let playerName = "";
    //         contentItemPlayers.innerHTML = playerName;
    //     }
    // }

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
      }

      console.log(cells);
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