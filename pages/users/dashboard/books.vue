<template>
  <div class="user-books">
    <div class="user-books__header flex flex--align flex--between">
      <header>本棚</header>
      <div class="write-book button--shadow button button--primary--open">本を書く</div>
    </div>

    <table class="user-books__books-list">
      <thead>
        <tr>
          <th>本</th>
          <th>最新の話</th>
          <th>状態</th>
          <th>視聴回数</th>
          <th>ブックマーク数</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>
            <img class="user-books__cover" :src="book.cover" alt>
          </td>
          <td></td>
          <td>連載中</td>
          <td>{{book.views}}</td>
          <td>15</td>
          <td>
            <div class="button button--primary book-list-button">投稿</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store }) {
    await store.dispatch("user/getBooks");
  },
  computed: {
    books() {
      return this.$store.state.user.books;
    }
  }
};
</script>

<style lang="scss">
.user-books {
  padding: 5px;
  &__header {
    header {
      font-size: 30px;
    }
    .write-book {
      height: 45px;
      width: 150px;
      font-size: 16px;
    }
    // margin-top: 10px;
  }
  &__cover {
    height: 11.9rem;
    width: 8.1rem;
    border-radius: 10px;
  }

  &__books-list {
    width: 100%;
    margin-top: 20px;
    // border-radi
    background-color: white;
    padding: 10px;
    th,
    td {
      padding-left: 10px;
      text-align: left;
      font-size: 16px;
      .book-list-button {
        height: 40px;
        font-size: 14px;
      }
    }
  }
}
</style>
