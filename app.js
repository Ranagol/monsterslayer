new Vue({
  el: '#app',

  data: {
    show: true,
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,//initially the game is not started, but when it is started, we will change this to true.
    turns: [],

  },

  methods: {
    startGame(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack(){
      // player damaging monster
      let damage = this.calculateDamage(3,10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,//this will be needed for CSS formatting
        text: 'Player hits monster with ' + damage,
      });
      if (this.checkWin()) {//if this returns true
        return;// we have to stop executing this code, because somebody won, but if nobody won, then continue with the script... and to the monster part to
      }
      //monster damaging player
      this.monsterAttacks();
    },

    specialAttack(){
      damage = this.calculateDamage(10,20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,//this will be needed for CSS formatting
        text: 'Player hits monster with special attack ' + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    heal(){
      this.playerHealth += 10;
      if (this.playerHealth >= 100) {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals 10.',
      });
      this.monsterAttacks();
    },

    giveUp(){
      this.gameIsRunning = false;
    },

    monsterAttacks(){
      let damage = this.calculateDamage(5,12);
      this.playerHealth -= damage;
      this.checkWin();//here we don't have a return after the checkwind(), because here we end this function, no need for quitting with return
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player with ' + damage,
      });
    },

    calculateDamage(min, max){
      return Math.max(Math.floor(Math.random() * max) +1, min);
    },

    checkWin(){
      if(this.monsterHealth <= 0){//if we killed the monster..
        if(confirm('You won! New game?')){//ask for new game..
          this.startGame();//if yes, start new game
        } else {
          this.gameIsRunning = false;//if no, stop the game
        }
        return true;//either case: return true
      } else if (this.playerHealth <= 0) {//if player died
        if(confirm('You lost! New game?')){//ask for new game.
          this.startGame();//if yes, start new game
        } else {
          this.gameIsRunning = false;//if no, stop the game
        }
        return true;//either case: return true
      }
      return false;//we want this checkWin() to return true if somebody won or lost. True means that the game is over, somebody won, and we don't want to continue our code execution. False will mean, that the script should continue to execute.
    }
  },
});