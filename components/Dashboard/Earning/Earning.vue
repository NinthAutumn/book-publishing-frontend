<template>
  <div class="total-earning">
    <div class="total-earning__header">
      <div class="total-earning__title">総合収益</div>
      <div class="total-earning__content">¥{{(earning*2.254).toFixed(0)}}円</div>
    </div>

    <div class="total-earning__history">引き出し歴史</div>
    <div class="total-earning__list" v-if="payouts.length > 0">
      <div class="total-earning__item" v-for="(payout,index) in payouts" :key="index">{{payout}}</div>
    </div>
    <div class="total-earning__list" v-else>
      <div class="total-earning__item total-earning__item--none">まだ、引き出しはされていません</div>
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
  $self: &;
  padding: 1rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 2.3rem;
  }
  &__history {
    font-size: 1.6rem;
  }
  &__list {
    #{$self}__item {
      padding: 1rem;
      font-size: 1.4rem;
      &--none {
        text-align: center;
        color: rgb(73, 73, 73);
      }
    }
  }
  &__content {
    font-size: 2.3rem;
  }
  &__treasure {
    position: absolute;
    height: 100%;
    top: 5px;
    left: 5px;
  }
}
</style>
