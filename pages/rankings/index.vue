<template>
  <div class="ranking-main">
    <header class="ranking-header">
      <h3 class="ranking-header__text">
        <fa class="ranking-header__icon" icon="crown"></fa>ランキング
      </h3>
    </header>
    <ranking-list></ranking-list>
  </div>
</template>

<script>
import RankingList from "@/components/Ranking/RankingList";

export default {
  auth: false,
  async fetch({ store }) {},
  components: {
    RankingList
  }
};
</script>

<style lang="scss">
.ranking-header {
  &__icon {
    margin-right: 5px;
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
