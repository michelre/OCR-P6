class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 100;
        this.weapon = new Weapon(-1, -1, 10);
        this.weapon.name = "Espadon rouillée";
        this.weapon.img = "espadon_rouillee_ocrp6_jmg.png";
        this.name = "";
        this.defend = false;
    }
}

// console.log('players-hello');
