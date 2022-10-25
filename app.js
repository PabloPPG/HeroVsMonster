// Methods that work outside vue but can be called in vue app
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialCounter: 0,
    };
  },
  methods: {
    playerAttack() {
      this.specialCounter++;
      this.monsterHealth -= randomNumber(5, 15);
      this.monsterAttack();
    },
    monsterAttack() {
      this.playerHealth -= randomNumber(8, 20);
    },
    playerSpecial() {
      this.specialCounter -= 4;
      this.monsterHealth -= randomNumber(15, 40);
      this.monsterAttack();
    },
    playerHeal() {
      this.specialCounter++;
      this.playerHealth += randomNumber(10, 30);
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.monsterAttack();
    },
  },
  computed: {
    playerHealthBar() {
      return {
        width: this.playerHealth + "%",
      };
    },
    monsterHealthBar() {
      return {
        width: this.monsterHealth + "%",
      };
    },
    specialCheck() {
      return this.specialCounter < 4;
    },
  },
  watch: {},
});

app.mount("#game");
