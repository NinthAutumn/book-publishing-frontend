<template>
  <div id="ranking-list">
    <ul class="book-list">
      <ranking-item
        :class="{'top-ranked':index <= 2, 'first': index === 0, 'second': index ===1, 'third': index === 2, 'others':index > 2}"
        :index="index"
        :book="book.book[0]"
        v-for="(book, index) in list"
        :key="index"
      ></ranking-item>
    </ul>
  </div>
</template>

<script>
import RankingItem from "./RankingItem";
export default {
  components: { RankingItem },
  computed: {
    list() {
      return this.$store.getters["ranking/getRankingList"];
    }
  }
};
</script>

<style lang="scss">
#ranking-list {
  display: flex;
  justify-content: center;
  .book-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    // width: 1010px;
  }
  .first {
    // grid-area: first;
  }
  .second {
    // grid-area: second;
  }
  .third {
    // grid-area: third;
  }
  .others {
  }
}
</style>
