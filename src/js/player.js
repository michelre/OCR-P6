class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 100;
        this.weapon = new Weapon(-1, -1, 0);
        this.weapon.name = "Espadon rouillée";
        this.weapon.img = "espadon_rouillee_ocrp6_jmg.png";
        this.name = "";
    }    
}

// console.log('players-hello');