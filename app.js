// Methods that work outside vue but can be called in vue app
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 200,
      totalMonsterHealth: 200,
      specialCounter: 0,
      roundWinner: null,
      battleLog: [],
    };
  },
  methods: {
    playerAttack() {
      this.specialCounter++;
      const attackValue = randomNumber(5, 15);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackValue = randomNumber(10, 20);
      this.playerHealth -= attackValue;
      this.addLog("monster", "attack", attackValue);
    },
    playerSpecial() {
      this.specialCounter -= 4;
      const attackValue = randomNumber(15, 40);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.monsterAttack();
    },
    playerHeal() {
      this.specialCounter++;
      const healValue = randomNumber(10, 30);
      this.playerHealth += healValue;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.addLog("player", "heal", healValue);
      this.monsterAttack();
      this.addLog("monster", "attack", attackValue);
    },
    surrender() {
      this.roundWinner = "monster";
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = this.totalMonsterHealth;
      this.specialCounter = 0;
      this.roundWinner = null;
      this.battleLog = [];
    },
    addLog(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
      while(this.battleLog.length >= 10){
        this.battleLog.pop()
      }
    },
  },
  computed: {
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return {
          width: "0%",
        };
      }
      return {
        width: this.playerHealth + "%",
      };
    },
    monsterHealthBar() {
      let monsterHealthPercentage =
        (this.monsterHealth / this.totalMonsterHealth) * 100;
      if (this.monsterHealth < 0) {
        return {
          width: "0%",
        };
      }
      return {
        width: monsterHealthPercentage + "%",
      };
    },
    specialCheck() {
      return this.specialCounter < 4;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.roundWinner = "draw";
      } else if (value <= 0) {
        this.roundWinner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.roundWinner = "draw";
      } else if (value <= 0) {
        this.roundWinner = "player";
      }
    },
    roundWinner(value) {
      if (value !== null) {
        this.showControls = !this.showControls;
      }
    },
  },
});

app.mount("#game");
