<template>
  <div class="book-stats">
    <div class="book-stats__list">
      <li class="book-stats____item flex" v-for="(stat, index) in stats" :key="index">
        <div class="book-stats__title">{{stat.title}}</div>
        <div class="book-stats__content">{{stat.content}}</div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        {
          title: "視聴回数",
          content: this.$store.state.book.book.views + "回"
        },
        { title: "平均視聴回数", content: "20回/1話" },
        {
          title: "ブックマーク",
          content: this.$store.state.book.book.bookmarkCount + "件"
        },
        { title: "字数", content: "3452文字" },
        {
          title: "レビュー数",
          content: this.$store.state.book.book.reviewsCount + "個"
        },
        { title: "状況", content: "連載中" },
        { title: "話数", content: "全12部分" }
      ]
    };
  }
};
</script>

<style lang="scss">
.book-stats {
  &__title {
    font-size: 16px;
    width: 120px;
  }
  &__content {
    font-size: 16px;
  }
}
</style>
