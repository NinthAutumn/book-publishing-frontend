<template>
  <div
    id="search "
    class="search-page"
    :class="{'search-page--mobile':$device.isMobile,'page-padding':!$device.isMobile}"
  >
    <div class="search-page__bar" v-if="$device.isMobile">
      <input ref="search" v-model="query" type="text" class="search-page__input" placeholder="検索" />
    </div>
    <div class="search-page__container" v-if="!$device.isMobile">
      <BookWeb :books="books"></BookWeb>
    </div>
    <div class="search-page__container" v-else>
      <nuxt-link
        :to="`/books/${book.id}`"
        class="search-page__list"
        v-for="book in books"
        :key="book.id"
      >
        <Books v-ripple :book="book"></Books>
      </nuxt-link>
    </div>

    <client-only>
      <infinite-loading :identifier="id" @infinite="infiniteHandler"></infinite-loading>
    </client-only>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "search",
  components: {
    Books: () => import("@/components/Mobile/Cards/Book/Detailed"),
    BookWeb: () => import("@/components/SearchPage/Books"),
    SearchBar: () => import("@/components/Navigation/SearchBar")
  },
  computed: {
    ...mapGetters({
      books: "search/getBookList"
    })
  },
  data() {
    return {
      page: 1,
      id: 0
    };
  },
  mounted() {
    if (this.$device.isMobile) {
      this.$refs.search.focus();
    }
  },
  asyncData({ route }) {
    return {
      query: route.query.query || ""
    };
  },
  watch: {
    async query(val) {
      this.id++;
      this.page = 1;
      this.$store.commit("search/RESET_BOOKS");
    }
  },
  methods: {
    async infiniteHandler($state) {
      const books = await this.$store.dispatch("search/searchBooks", {
        query: this.query,
        page: this.page++,
        limit: 10,
        infinite: true
      });
      if (books.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  created() {
    // if(this.$route.query.i)
  },
  auth: false
};
</script>
<style lang="scss">
#search {
  position: relative;
}
.search-page {
  &__bar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    $self: &;
    height: 5rem;
    input {
      background-color: #f4f6f8;
      height: 75%;
      border-radius: 10rem;
      font-size: 1.3rem;
      width: 90%;
      padding: 0rem 1.5rem;
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  &--mobile {
    width: 100%;
  }
}
.search-book-item {
  margin-bottom: 10px;
}
</style>
