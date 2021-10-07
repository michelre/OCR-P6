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
        const gameGrid = document.querySelector('.game-grid');
        // console.log("game-grid" + gameGrid);
        for (let i = 0; i < this.nbLines; i++) {
            let line = "<tr>";
            for (let j = 0; j < this.nbColumns; j++) {
                let column = "<td data-x=" + j + " data-y=" + i + "></td>";
                line += column;
            }
            line += "</tr>";
            table += line;
        }
        table += "</table>";
        gameGrid.innerHTML = table;
        document.querySelectorAll("td, .weapon-img").forEach((td) => { // function(td)
            td.addEventListener('click', (e) => {
                console.log(e.target.parentNode);// function (e)
                if (e.target.classList.contains("movable")) {
                    this.movePlayer(e.target); // pour récupérer les nouvellles coordonnées du player
                }
                if (e.target.parentNode.classList.contains("movable")) {
                    this.movePlayer(e.target.parentNode); // pour récupérer les nouvellles coordonnées du player
                }
            });
        });
    }


    displayPlayersInfo() {
        let c = document.querySelector('.content__item-players');
        c.innerHTML = "";

        for (let j = 0; j < this.players.length; j++) {
            const imagePlayer = (j == 0) ? "link.png" : "Ganondorf.png";
            const aside = document.createElement('aside');
            aside.innerHTML = `<div class="info-wrapper">
                <div class="info-wrapper__content-left">
                    <div class="info-wrapper__item-description__img">
                        <img src="/src/img/${imagePlayer}">
                    </div>
                </div>
                <div class="info-wrapper__content-right">
                    <div class="info-wrapper__header">${this.players[j].name}</div>
                    <div class="info-wrapper__body">
                        <div id="player__weapon">
                            Arme : ${this.players[j].weapon.name}
                        </div>
                        <div id="player__life" class="player__life">
                            Vie : ${this.players[j].life}
                        </div>
                    </div>
                </div>
                <div class="player-buttons">
                    <button class="attack">Attaquer</button>
                    <button class="defend">Défendre</button>
                </div>
            </div>`;
            c.appendChild(aside);
            const attackBtns = aside.querySelectorAll('.attack')
            const defendBtns = aside.querySelectorAll('.defend')
            attackBtns.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    this.playerAttack()
                })
            })
            defendBtns.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    this.playerDefend()
                })
            })
        }
    }


    movePlayer(td) {
        //console.log("movePlayer", td);
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
        if (this.isPlayerCollapsed(x, y)) {
            this.startFight()
            return;
        }
        this.changeActivePlayerIndex();
        const cells = this.getMovableCells();
        this.drawMovableCells(cells);
    }

    startFight() {
        const fightLayer = document.createElement('div')
        fightLayer.classList.add('fight-layer')
        const gameGrid = document.querySelector('.game-grid')
        gameGrid.appendChild(fightLayer)
        this.activePlayerButtonAction()

    }

    playerAttack(){
        const activePlayer = this.players[this.activePlayerIndex]
        const otherPlayer = this.players[this.activePlayerIndex === 0 ? 1 : 0];
        activePlayer.defend = false;

        if(otherPlayer.defend){
            otherPlayer.life -= activePlayer.weapon.damages / 2;
        } else {
            otherPlayer.life -= activePlayer.weapon.damages
        }
        this.refreshPlayerLife()
        if(otherPlayer.life <= 0){
            setTimeout(() => {
                alert('Fin de partie')
                window.location.reload()
            }, 100)
        }
        this.changeActivePlayerIndex()
        this.activePlayerButtonAction()
    }

    playerDefend(){
        const activePlayer = this.players[this.activePlayerIndex]
        activePlayer.defend = true
        this.refreshPlayerLife()
        this.changeActivePlayerIndex()
        this.activePlayerButtonAction()
    }

    refreshPlayerLife(){
        const otherPlayerIndex = this.activePlayerIndex === 0 ? 1 : 0
        const otherPlayer = this.players[otherPlayerIndex];
        const playerAside = document.querySelectorAll('.content__item-players aside')[otherPlayerIndex]
        const life = otherPlayer.life < 0 ? 0 : otherPlayer.life
        playerAside.querySelector('.player__life').textContent = 'Vie : ' + life
    }

    activePlayerButtonAction(){
        const otherPlayerIndex = this.activePlayerIndex === 0 ? 1 : 0
        const otherPlayerAside = document.querySelectorAll('.content__item-players aside')[otherPlayerIndex]
        otherPlayerAside.querySelector('.player-buttons').style.display = 'none'

        const playerAside = document.querySelectorAll('.content__item-players aside')[this.activePlayerIndex]
        playerAside.querySelector('.player-buttons').style.display = 'block'
    }

    renderGrid() {
        this.createGrid();
        this.drawObstacles();
        this.drawPlayers();
        this.drawWeapons();
        this.displayPlayersInfo();
        this.displayWeaponsInfo();
        //this.createFightBtn();
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
            if (this.players[i].x == (x + 1) && this.players[i].y == y) {
                return true
            }
            if (this.players[i].x == (x - 1) && this.players[i].y == y) {
                return true
            }
            if (this.players[i].y == (y + 1) && this.players[i].x == x) {
                return true
            }
            if (this.players[i].y == (y - 1) && this.players[i].x == x) {
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
        for (let i = 0; i < this.obstacles.length; i++) {
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
        this.weapons[4].damages = 50;

        //console.log(this.weapons);
    }

    drawWeapons() {
        let b = document.querySelector('.weapon');

        for (let i = 0; i < this.weapons.length; i++) {

            const cell = document.querySelector('td[data-x="' + this.weapons[i].x + '"][data-y="' + this.weapons[i].y + '"]');
            cell.innerHTML = `<img class="weapon-img" src="img/${this.weapons[i].img}">`;
            // console.log(cell);
            // cell.classList.add("weapon" + i);
        }
    }

    displayWeaponsInfo() {
        let c = document.querySelector('.content__item-weapons');
        c.innerHTML = "";

        for (let j = 0; j < this.weapons.length; j++) {
            const aside = document.createElement('aside');
            aside.innerHTML =
                `<div class="info-wrapper">
            <div class="info-wrapper__content-left">
            <div class="info-wrapper__item-description__img">
            <img src="img/${this.weapons[j].img}">
            </div>
            </div>
            <div class="info-wrapper__content-right">
            <div class="info-wrapper__header">${this.weapons[j].name}</div>
            <div class="info-wrapper__body">
            <div id="weapon__dammages">
            Dommages : ${this.weapons[j].damages}
            </div>
            </div>
            </div>
            </div>`;
            c.appendChild(aside);
        }
        ;
    }

    takeWeapon(x, y) {
        let wCell = this.isCellWeapon(x, y);
        let wPlayer = this.players[this.activePlayerIndex].weapon;

        if (wCell) {
            let newWeapons = this.weapons.filter((weapon) => {
                return weapon.name != wCell.name;
            });
            wPlayer.x = x;
            wPlayer.y = y;
            newWeapons.push(wPlayer);
            this.players[this.activePlayerIndex].weapon = wCell;
            // console.log(newWeapons, this.weapons);
            this.weapons = newWeapons;
        }
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
                this.players.push(new Player(x, y));
                m++;
            }
        }
        this.players[0].name = 'Link';
        this.players[1].name = 'Ganondorf';
        // console.log(this.players);
    }

    drawPlayers() {
        for (let i = 0; i < this.players.length; i++) {
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
     * Fight
     *************************/
    createFightBtn() {
        for (let i = 0; i < this.players.length; i++) {
            if ((this.players[i].x === this.isPlayerCollapsed.x) || (this.players[i].y === this.isPlayerCollapsed.y)) {
                return document.getElementsByClassName("content").innerHTML = `<div class="warBtn">coucou</div>`;
            }
        }
    }

    /*************************
     * Cells
     *************************/
    getMovableCells() {
        const x = parseInt(this.players[this.activePlayerIndex].x);
        const y = parseInt(this.players[this.activePlayerIndex].y);
        const cells = [];
        // déplacement à droite
        for (let i = x + 1; i < x + 4; i++) {
            if (this.isEmptyCellObstacle(i, y) && this.isEmptyCellPlayer(i, y) && i >= 0 && i < this.nbLines)
                cells.push({x: i, y});
            else
                break;
        }
        // déplacement à gauche
        for (let i = x - 1; i > x - 4; i--) {
            if (this.isEmptyCellObstacle(i, y) && this.isEmptyCellPlayer(i, y) && i >= 0 && i < this.nbLines)
                cells.push({x: i, y});
            else
                break;
        }
        // déplacement à bas
        for (let i = y + 1; i < y + 4; i++) {
            if (this.isEmptyCellObstacle(x, i) && this.isEmptyCellPlayer(x, i) && i >= 0 && i < this.nbColumns)
                cells.push({x, y: i});
            else
                break;
        }
        // déplacement à haut
        for (let i = y - 1; i > y - 4; i--) {
            if (this.isEmptyCellObstacle(x, i) && this.isEmptyCellPlayer(x, i) && i >= 0 && i < this.nbColumns)
                cells.push({x, y: i});
            else
                break;
        }
        // console.log(cells);
        return cells;

    }

    drawMovableCells(cells) {
        for (let i = 0; i < cells.length; i++) {
            const cell = document.querySelector('td[data-x="' + cells[i].x + '"][data-y="' + cells[i].y + '"]');
            cell.classList.add("movable");
        }

    }

}
