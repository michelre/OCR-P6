class Grid {
    
    constructor(nbLines, nbColumns, nbObstacles, nbWeapons, nbPlayers) {
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
    
    createGrid() {
        let table = "<table>";
        const gameGrid =  document.querySelector('.game-grid');
        // console.log("game-grid" + gameGrid);
        for (let i = 0; i < this.nbLines; i++) {
            let line = "<tr>";
            for (let j =0; j < this.nbColumns; j++) {
                let column = "<td data-x=" + j + " data-y=" + i +"></td>";
                line += column;
            }
            line += "</tr>";
            table += line;
        }
        table += "</table>";
        gameGrid.innerHTML = table;
        document.querySelectorAll("td").forEach((td) => { // function(td)
            td.addEventListener('click', (e) => { // function (e)
                if (e.target.classList.contains("movable")) {
                    this.movePlayer(e.target); // pour récupérer les nouvellles coordonnées du player
                }
            });
        });
    }
    
    
    displayPlayersInfo() {
        let c = document.querySelector('.content__item-players');       
        
        for (let j = 0; j < this.players.length; j++) {
            const imagePlayer = (j == 0) ? "link.png" : "Ganondorf.png";
            const aside = document.createElement('aside');
            aside.innerHTML = `<div class="info-wrapper">
            <div class="info-wrapper__title">${this.players[j].name}</div>
            <div class="info-wrapper__item-description">
            <div class="info-wrapper__item-description__img">
            <img src="/src/img/${imagePlayer}">
            </div>
            <div class="info-wrapper__item-description__body">
            <div id="player__weapon">
            Arme : ${this.players[j].weapon.name}
            </div>
            <div id="player__life">
            Vie : ${this.players[j].life}
            </div>
            </div>
            </div>
            </div>`;
            c.appendChild(aside);
        };
    }
    
    
    movePlayer(td) {
        console.log("movePlayer", td);
        //1. récupérer (x,y) de la case td
        const x = parseInt(td.dataset.x);
        const y = parseInt(td.dataset.y);
        this.takeWeapon(x, y);
        //2. attribuer les nouvelles coordonnées au player actif
        this.players[this.activePlayerIndex].x = x;
        this.players[this.activePlayerIndex].y = y;
        //3. déplacer (changer) l'image de place => attribuer à l'image les nouvelles coordonnées
        //4. changer "activePlayer" => getMovableCells & drawMovableCells
        this.renderGrid();
        this.changeActivePlayerIndex();
        const cells = this.getMovableCells();
        this.drawMovableCells(cells);
        
    }
    
    renderGrid() {
        this.createGrid();
        this.drawObstacles();
        this.drawPlayers();
        this.drawWeapons();
    }
    
    // isEmptyCell(x, y) {
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
    
    isEmptyCellObstacle(x, y) {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x == x && this.obstacles[i].y == y) {
                return false;
            }
        }
        return true
    }
    isEmptyCellPlayer(x, y) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].x == x && this.players[i].y == y) {
                return false;
            }
        }
        return true
    }
    isEmptyCellWeapon(x, y) {
        for (let i = 0; i < this.weapons.length; i++) {
            if (this.weapons[i].x == x && this.weapons[i].y == y) {
                return false;
            }
        }
        return true
    }
    
    isCellWeapon(x, y) {
        for (let i = 0; i < this.weapons.length; i++) {
            if (this.weapons[i].x == x && this.weapons[i].y == y) {
                return this.weapons[i];
            }
        }
        return null
    }
    
    
    isPlayerCollapsed(x, y) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].x == (x+1) && this.players[i].y == y) {
                return true
            }
            if (this.players[i].x == (x-1) && this.players[i].y == y) {
                return true
            }
            if (this.players[i].y == (y+1) && this.players[i].x == x) {
                return true
            }
            if (this.players[i].y == (y-1) && this.players[i].x == x) {
                return true
            }
        }
        return false;
    }
    
    /*************************
    * Obstacles
    *************************/
    createObstacles() {
        let k = 0;
        
        while (k < this.nbObstacles) {
            let x = Math.floor(Math.random() * this.nbLines);
            let y = Math.floor(Math.random() * this.nbColumns);
            
            if (this.isEmptyCellObstacle(x, y)) {
                this.obstacles.push({x, y});
                k++;
            }
        }
        //console.log(this.obstacles);
    }
    
    drawObstacles() {
        for(let i =0; i<this.obstacles.length; i++) {
            const cell = document.querySelector('td[data-x="' + this.obstacles[i].x + '"][data-y="' + this.obstacles[i].y + '"]');
            cell.classList.add("obstacle");
        }
    }
    
    /*************************
    * Weapons
    *************************/
    createWeapons() {
        let l = 0;
        
        while (l < this.nbWeapons) {
            let x = Math.floor(Math.random() * this.nbLines);
            let y = Math.floor(Math.random() * this.nbColumns);
            
            if (this.isEmptyCellWeapon(x, y)) {
                this.weapons.push(new Weapon (x, y, 0));
                l++;
            }
        }
        
        this.weapons[0].name = 'Épée de légende';
        this.weapons[1].name = 'Lance de soldat';
        this.weapons[2].name = 'Hache de maître';
        this.weapons[3].name = 'Grand bommerang';
        this.weapons[4].name = 'Arc royal';
        
        //console.log(this.weapons);
    }
    
    takeWeapon(x, y) {
        let wCell = this.isCellWeapon(x,y);
        let wPlayer = this.players[this.activePlayerIndex].weapon;
        
        if (wCell) {
            let newWeapons = this.weapons.filter((weapon) => {
                return weapon.name != wCell.name;
            });            
            newWeapons.push(wPlayer);
            this.players[this.activePlayerIndex].weapon = wCell;
        }
    }
    
    drawWeapons() {
        for(let i = 0; i < this.weapons.length; i++) {
            const cell = document.querySelector('td[data-x="' + this.weapons[i].x + '"][data-y="' + this.weapons[i].y + '"]');
            cell.classList.add("weapon" + i);
            console.log(cell);
        }
    }
    
    displayWeaponsInfo() {
        let c = document.querySelector('.content__item-weapons');
        
        
        for (let j = 0; j < this.weapons.length; j++) {
            let imageWeapons = {
                0: 'longue-epee-electrique.png',
                1: 'hache-de-maitre.png',
                2: 'epee-des-flammes.png',
                3: 'epee-de-legende.png',
                4: 'arc-royal.png'
            };
            
            /*if (j == 0) {
                imageWeapons = "longue-epee-electrique.png";
              } else if (j == 1) {
                imageWeapons = "hache-de-maitre.png";
              } else if (j == 2) {
                imageWeapons = "epee-des-flammes.png";
              } else if (j == 3) {
                imageWeapons = "epee-de-legende.png";
              } else {
                imageWeapons = "arc-royal.png";
              }*/
            console.log(imageWeapons);


            const aside = document.createElement('aside');
            aside.innerHTML = `<div class="info-wrapper">
            <div class="info-wrapper__title">${this.weapons[j].name}</div>
            <div class="info-wrapper__item-description">
            <div class="info-wrapper__item-description__img">
            <img src="/src/img/${imageWeapons[j]}">
            </div>
            <div class="info-wrapper__item-description__body">
            <div id="player__life">
            Dommages : ${this.weapons[j].damages}
            </div>
            </div>
            </div>
            </div>`;
            c.appendChild(aside);
        };
    }
    
    /*************************
    * Players
    *************************/
    createPlayers() {
        let m = 0;
        
        while (m < this.nbPlayers) {
            let x = Math.floor(Math.random() * this.nbLines);
            let y = Math.floor(Math.random() * this.nbColumns);
            
            if (this.isEmptyCellPlayer(x, y) && !this.isPlayerCollapsed(x, y)) {
                this.players.push(new Player (x, y));
                m++;
            }
        }
        this.players[0].name = 'Link';
        this.players[1].name = 'Ganondorf';
        console.log(this.players);
    }
    
    drawPlayers() {
        for(let i =0; i<this.players.length; i++) {
            const cell = document.querySelector('td[data-x="' + this.players[i].x + '"][data-y="' + this.players[i].y + '"]');
            cell.classList.add("players");
            cell.classList.add(this.players[i].name);
            
        }
    }
    
    changeActivePlayerIndex() {
        // if (this.activePlayerIndex == 0)
        //     this.activePlayerIndex = 1
        // else
        // this.activePlayerIndex = 0;
        this.activePlayerIndex = (this.activePlayerIndex == 0) ? 1 : 0;
    }
    
    isActivePlayer() {
        if (this.activePlayerIndex == 0)
        this.players = 'player1';
        else
        this.players = 'player2';
    }
    
    
    /*************************
    * Cells
    *************************/
    getMovableCells() {
        const x = parseInt(this.players[this.activePlayerIndex].x);
        const y = parseInt(this.players[this.activePlayerIndex].y);
        const cells = [];
        // déplacement à droite
        for (let i = x+1; i < x+4; i++) {
            if (this.isEmptyCellObstacle(i, y) && this.isEmptyCellPlayer(i, y) && i >= 0 && i < this.nbLines)
            cells.push({x:i, y});
            else
            break;
        }
        // déplacement à gauche
        for (let i = x-1; i > x-4; i--) {
            if (this.isEmptyCellObstacle(i, y) && this.isEmptyCellPlayer(i, y) && i >= 0 && i < this.nbLines)
            cells.push({x:i, y});
            else
            break;
        }
        // déplacement à bas
        for (let i = y+1; i < y+4; i++) {
            if (this.isEmptyCellObstacle(x, i) && this.isEmptyCellPlayer(x, i) && i >= 0 && i < this.nbColumns)
            cells.push({x, y:i});
            else
            break;
        }
        // déplacement à haut
        for (let i = y-1; i > y-4; i--) {
            if (this.isEmptyCellObstacle(x, i) && this.isEmptyCellPlayer(x, i) && i >= 0 && i < this.nbColumns)
            cells.push({x, y:i});
            else
            break;
        }
        console.log(cells);
        return cells;
        
    }
    
    drawMovableCells(cells) {
        for(let i = 0; i<cells.length; i++) {
            const cell = document.querySelector('td[data-x="' + cells[i].x + '"][data-y="' + cells[i].y + '"]');
            cell.classList.add("movable");
        }
        
    }
    
}
