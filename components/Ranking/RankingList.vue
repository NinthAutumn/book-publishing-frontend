<template>
  <div id="ranking-list">
    <ul class="book-list">
      <Select name="時間" def="日間" :object="sort_type" :mheight="125" transition="grow-shrink"></Select>
      <ranking-item
        :index="index"
        :score="book.sum"
        :book="book.book[0]"
        v-for="(book, index) in list"
        :key="index"
      ></ranking-item>
    </ul>
  </div>
</template>

<script>
import RankingItem from "./RankingItem";
import Select from "@/components/All/Select";

export default {
  components: { RankingItem, Select },
  data() {
    return {
      sort_type: [
        { key: "日間", value: 0 },
        { key: "週間", value: 1 },
        { key: "月間", value: 2 },
        { key: "年間", value: 3 },
        { key: "総合", value: 4 }
      ]
    };
  },
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
