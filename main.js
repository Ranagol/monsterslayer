new Vue({
el: '#app',
data: {
  playerHealth: 100,
  monsterHealth: 100,
  gameIsOn: false,
  turns: [],
  playerMaxDamage: 10,
  monsterMaxDamage: 15,
},

methods: {
  startGame(){
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.gameIsOn = true;
    this.turns = [];
    isPlayer = false
  },

  attacks(ponder){
    this.playerIsattacking(ponder);
    this.monsterIsAttacking();
  },

  logCreator(attacker, behaviour, damageAmount){
    this.turns.unshift({
      attacker: attacker,
      text: attacker +' ' + behaviour + ' ' + damageAmount,
    })
  },

  playerIsattacking(ponder){
    playerAttack = this.createDamage(this.playerMaxDamage * ponder);
    this.monsterHealth -= playerAttack;
    this.logCreator('player','attacked', playerAttack);
    this.isDead(this.monsterHealth, 'Player');
  },

  monsterIsAttacking(){
    monsterAttack = this.createDamage(this.monsterMaxDamage);
    this.playerHealth -= monsterAttack;
    this.logCreator('monster', 'attacked', monsterAttack);
    this.isDead(this.playerHealth, 'Monster');
  },

  createDamage(maxDamage){
    return Math.floor(Math.random() * maxDamage +1);
  },

  isDead(health, fighter){
    if (health < 0) {
      //alert(fighter + ' won.');
      gameIsOn = false;
      this.wannaPlayAgain(fighter);
    }
  },

  wannaPlayAgain(fighter){
    let answer = confirm(fighter + ' won! Want to play again');
    if (answer == true) {
      this.startGame();
    }
  },

  heal(){
    this.playerHealth += 10;
    this.logCreator('player', 'healed', 10);
    this.monsterIsAttacking();
    if (this.playerHealth >= 100) {
      this.playerHealth = 100;
    }
  },

  giveUp(){
    let answer = confirm('Are you sure you want to give up?');
    if (answer == true) {
      this.startGame();
    }
  },

  


  
}
});

