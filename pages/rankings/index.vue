<template>
  <div class="ranking-main">
    <header class="ranking-header">
      <h3 class="ranking-header__text">ランキングリスト</h3>
    </header>
    <ranking-list></ranking-list>
  </div>
</template>

<script>
import RankingList from "@/components/Ranking/RankingList";

export default {
  auth: false,
  async fetch({ store }) {
    await store.dispatch("ranking/fetchRanking");
  },
  components: {
    RankingList
  }
};
</script>

<style lang="scss">
.ranking-header {
  &__text {
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }
}

.sub-header {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>
