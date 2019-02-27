<template>
  <div class="book-show-dashboard">
    <div class="book-show flex flex--align flex--between">
      <p class="book-show__title">{{$store.state.book.book.title}}</p>
    </div>
    <div class="book-tab flex">
      <div class="book-tab__item">
        <nuxt-link
          class="book-tab__item__text text--black"
          to="draft"
        >下書き({{$store.getters['chapter/draft'].length}})</nuxt-link>
      </div>
      <div class="book-tab__item">
        <nuxt-link class="book-tab__item__text" to="published">公開済</nuxt-link>
      </div>
      <div class="book-tab__item">
        <nuxt-link
          class="book-tab__item__text"
          to="deleted"
        >削除済({{$store.getters['chapter/deleted'].length}})</nuxt-link>
      </div>
    </div>
    <nuxt-child></nuxt-child>

    <div class="create-book flex flex--right">
      <div class="button button--secondary">話を書く</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  components: {},
  async fetch({ store, params }) {
    await store.dispatch("chapter/dashboardTOC", params.id);
    await store.dispatch("chapter/publishedTOC", params.id);
    await store.dispatch("book/getBook", params.id);
  },
  created() {},
  computed: {
    toc() {
      return this.$store.state.chapter.dToc;
    }
  },
  methods: {
    handleClick() {}
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.book-show-dashboard {
  height: 100vh;
  .book-show {
    padding: 5px 0;
    &__cover {
      height: 103px;
      width: 70px;
      border-radius: 10px;
      box-shadow: 1px 1px 5px 0px rgb(189, 189, 189);
    }

    &__title {
      font-size: 25px;
    }
  }
  .book-tab {
    &__item {
      margin-right: 10px;
      font-size: 14px;
      margin-bottom: 10px;
      &__text {
        color: black;
        font-size: 20px;
        &:visited {
          color: black;
        }
        &:hover {
          border-bottom: 2px solid rgb(230, 230, 230);
        }
        padding-bottom: 4px;
      }
      .nuxt-link-exact-active {
        border-bottom: 2px solid $secondary;
      }
    }
  }
}
</style>
