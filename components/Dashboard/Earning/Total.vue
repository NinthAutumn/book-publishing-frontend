<template>
  <div class="earned-coins">
    <div class="earned-coins__header flex-row flex--between flex--align">
      <div>清算されてないクラウン</div>
      <v-switch v-model="realMoney" label="¥"></v-switch>
    </div>
    <div class="earned-coins__main" v-if="EarnedTotal < 1000">
      <p class="earned-coins__message">今月の引き出しのゴールにまだ達成していません、そのためまだコイン相当の金額は銀行へと振り込めません</p>
      <v-progress-circular
        :rotate="360"
        :size="200"
        :width="25"
        :value="(EarnedTotal/1000)*100"
        color="#C4B4E4"
        v-if="!realMoney"
      >{{ EarnedTotal }}</v-progress-circular>
      <v-progress-circular
        v-else
        :rotate="360"
        :size="200"
        :width="25"
        :value="(EarnedTotal/1000)*100"
        color="#C4B4E4"
      >¥{{(EarnedTotal*2.254).toFixed(0)}}円</v-progress-circular>
    </div>
    <div class="earned-coins__main" v-else>
      <p class="earned-coins__message">今月の引き出しのゴールに達成しています、そのため今月の終わりにコイン相当の金額が登録された銀行に振り込まれます</p>
      <v-progress-circular
        v-if="!realMoney"
        :rotate="360"
        :size="200"
        :width="25"
        :value="100"
        color="#C4B4E4"
      >{{EarnedTotal}}</v-progress-circular>
      <v-progress-circular
        v-else
        :rotate="360"
        :size="200"
        :width="25"
        :value="100"
        color="#C4B4E4"
      >¥{{(EarnedTotal*2.254).toFixed(0)}}円</v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      realMoney: false,
      chartSetting: {
        nullAddZero: true,
        offsetY: 250
        // dataType: "percent"
        // radius: 90
        // scale: [true, true]
      },
      chartData: {
        columns: ["name", "sum"],
        rows: [{ name: "ゴール", sum: 1 }]
      }
    };
  },
  computed: {
    EarnedTotal() {
      return this.$store.getters["dashboard/getTotalCoins"];
    }
  },
  async mounted() {
    this.$store
      .dispatch("dashboard/fetchTotalCoins", { days: 0 })
      .then(() => {});
  }
};
</script>

<style lang="scss">
.earned-coins {
  $self: &;
  max-width: 50rem;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.4rem;
  .v-progress-circular__info {
    font-size: 2rem;
    font-weight: bold;
  }
  &__header {
    font-size: 2.3rem;
    padding: 1rem;
    width: 100%;
    .v-input {
      margin-top: 0;
      flex: 0;
    }
    .v-input__slot {
      margin-bottom: 0 !important;
    }
    div {
      font-size: inherit;
    }
  }
  &__main {
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    // justify-content: center;
    #{$self}__message {
      margin-bottom: 2rem;
      text-align: center;
    }
  }
}
</style>
