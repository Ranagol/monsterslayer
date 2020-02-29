new Vue({
  el: '#app',

  data: {
    show: true,
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,//initially the game is not started, but when it is started, we will change this to true.

  },

  methods: {
    startGame(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },

    attack(){
      // player damaging monster
      this.monsterHealth -= this.calculateDamage(3,10);
      if (this.checkWin()) {//if this returns true
        return;// we have to stop executing this code, because somebody won, but if nobody won, then continue with the script... and to the monster part to
      }
      //monster damaging player
      this.monsterAttacks();
    },

    specialAttack(){
      this.monsterHealth -= this.calculateDamage(10,20);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    heal(){

    },

    giveUp(){

    },

    monsterAttacks(){
      this.playerHealth -= this.calculateDamage(5,12);
      this.checkWin();//here we don't have a return after the checkwind(), because here we end this function, no need for quitting with return
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