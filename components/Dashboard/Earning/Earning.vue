<template>
  <div class="total-earning">
    <div class="total-earning__title">今まで稼いだクラウンコイン</div>
    <div class="total-earning__content">{{earning}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    earning() {
      return this.$store.getters["dashboard/getTotalEarning"];
    }
  },
  async mounted() {
    await this.$store.dispatch("dashboard/fetchTotalEarning");
  }
};
</script>

<style lang="scss">
</style>
