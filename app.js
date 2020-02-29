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
      let max = 10;
      let min = 3;
      // player damaging monster
      let damage = Math.max(Math.floor(Math.random() * max) +1, min);
      this.monsterHealth -= damage;
      if(this.monsterHealth <= 0){//if we killed the monster...
        alert('You won!');
        this.gameIsRunning = false;
        return;//because we don't want the monster to damage us, since he is dead
      }

      //monster damaging player
      max = 12;
      min = 5;
      damage = Math.max(Math.floor(Math.random() * max) +1, min);
      this.playerHealth -= damage;
      if(this.playerHealth <= 0){//if we killed the monster...
        alert('The monster won!');
        this.gameIsRunning = false;
        return;
      }
    },

    specialAttack(){

    },

    heal(){

    },

    giveUp(){

    },


  },


});