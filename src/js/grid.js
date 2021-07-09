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
            })
        })
    }

    movePlayer(td) {
        console.log("movePlayer", td);
        //1. récupérer (x,y) de la case td
        const x = parseInt(td.dataset.x);
        const y = parseInt(td.dataset.y);
        console.log(x,y);
        //2. attribuer les nouvelles coordonnées au player actif
        this.players[this.activePlayerIndex].x = x;
        this.players[this.activePlayerIndex].y = y;
        //3. déplacer (changer) l'image de place => attribuer à l'image les nouvelles coordonnées
        this.renderGrid();
        this.changeActivePlayerIndex();
        const cells = this.getMovableCells();
        this.drawMovableCells(cells);
        //4. changer "activePlayer" => getMovableCells & drawMovableCells

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
        console.log(this.obstacles);
    }

    drawObstacles() {
        for(let i =0; i<this.obstacles.length; i++) {
            const cell = document.querySelector('td[data-x="' + this.obstacles[i].x + '"][data-y="' + this.obstacles[i].y + '"]');
            cell.classList.add("obstacle");
        }
    }

    createWeapons() {
        let l = 0;

        while (l < this.nbWeapons) {
            let x = Math.floor(Math.random() * this.nbLines);
            let y = Math.floor(Math.random() * this.nbColumns);

            if (this.isEmptyCellWeapon(x, y)) {
                this.weapons.push({x, y});
                l++;
            }
        }

        this.weapons[0]['name'] = 'Épée de légende';
        this.weapons[1]['name'] = 'Lance de soldat';
        this.weapons[2]['name'] = 'Hache de maître';
        this.weapons[3]['name'] = 'Grand bommerang';
        this.weapons[4]['name'] = 'Arc royal';

        console.log(this.weapons);
    }

    drawWeapons() {
        for(let i = 0; i < this.weapons.length; i++) {
            const cell = document.querySelector('td[data-x="' + this.weapons[i].x + '"][data-y="' + this.weapons[i].y + '"]');
            cell.classList.add("weapon" + i);
            console.log(cell);
        }
    }

    createPlayers() {
        let m = 0;

        while (m < this.nbPlayers) {
            let x = Math.floor(Math.random() * this.nbLines);
            let y = Math.floor(Math.random() * this.nbColumns);

            if (this.isEmptyCellPlayer(x, y) && !this.isPlayerCollapsed(x, y)) {
                this.players.push({x, y});
                m++;
            }
        }
        this.players[0]['name'] = 'player1';
        this.players[1]['name'] = 'player2';
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

        console.log(this.players);
    }

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
