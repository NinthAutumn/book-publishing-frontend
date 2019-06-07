<template>
  <div class="total-earning">
    <div class="total-earning__title">今まで稼いだクラウンコイン</div>
    <div class="total-earning__content">{{earning}}</div>
    <div class="total-earning__history">引き出し歴史</div>
    <div class="total-earning__list">
      <div class="total-earning__item" v-for="(payout,index) in payouts" :key="index">{{payout}}</div>
    </div>
    <!-- <svg-icon class="total-earning__treasure" name="treasure"></svg-icon> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      earning: "dashboard/getTotalEarning",
      payouts: "wallet/getPayoutList"
    })
  },
  async created() {
    await this.$store.dispatch("wallet/fetchPayoutList");
    await this.$store.dispatch("dashboard/fetchTotalEarning");
  }
};
</script>

<style lang="scss">
.total-earning {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.4rem;
  position: relative;
  padding: 1rem;
  &__title {
  }
  &__content {
    font-size: 1.6rem;
  }
  &__treasure {
    position: absolute;
    height: 100%;
    top: 5px;
    left: 5px;
  }
}
</style>
