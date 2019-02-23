<template>
  <div class="ranking-main">
    <header class="ranking-header">
      <h3 class="ranking-header__text">ランキングリスト</h3>
    </header>
    <section>
      <div class="flex-divider flex flex--between">
        <div class="sub-header">ベストセラー</div>
        <div class="select-time"></div>
      </div>
      <!-- <BooksList :books="$store.state.book.books.highestrated"></BooksList> -->
    </section>
    <section>
      <div class="flex-divider flex flex--between">
        <div class="sub-header">視聴回数</div>
        <div class="select-time"></div>
      </div>
      <BooksList :weirdBook="true" :books="$store.state.ranking.views.total"></BooksList>
    </section>
    <section>
      <div class="flex-divider flex flex--between">
        <div class="sub-header">高評価</div>
        <div class="select-time"></div>
      </div>
      <BooksList :weirdBook="true" :books="$store.state.ranking.ratings.total"></BooksList>
    </section>
    <section>
      <div class="flex-divider flex flex--between">
        <div class="sub-header">ブックマーク数</div>
        <div class="select-time"></div>
      </div>
      <BooksList :weirdBook="true" :books="$store.state.ranking.bookmark.total"></BooksList>
    </section>
  </div>
</template>

<script>
import BooksList from "@/components/Ranking/BooksList";
import HBooksList from "@/components/Homepage/BooksList";

export default {
  auth: false,
  async fetch({ store }) {
    await store.dispatch("ranking/genreRanking");
    await store.dispatch("ranking/viewRanking");
    await store.dispatch("ranking/bookAnalysisRanking", {
      storeType: "ranking"
    });
    await store.dispatch("ranking/bookAnalysisRanking", {
      storeType: "bookmark"
    });
  },
  components: {
    BooksList,
    HBooksList
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
