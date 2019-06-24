<template>
  <div class="ranking-main page-padding">
    <header class="ranking-header">
      <h3 class="ranking-header__text">
        <fa class="ranking-header__icon" icon="crown"></fa>ランキング
      </h3>
      <svg-icon v-if="!$device.isMobile" class="ranking-header__winner" name="winner"/>
    </header>
    <ranking-list></ranking-list>
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch({ store }) {},
  components: {
    RankingList: () => import("@/components/Ranking/RankingList")
  }
};
</script>

<style lang="scss">
.ranking-header {
  user-select: none;
  position: relative;
  &__icon {
    margin-right: 5px;
  }
  &__winner {
    position: absolute;
    right: 0;
    top: -10px;
    width: 15rem;
    z-index: -1;
  }

  &__text {
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
}

.sub-header {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>
