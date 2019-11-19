<template>
  <div class="browse-page">
    <div class="browse-page__container">
      <browse-header
        @selected="selectedHandler"
        @refresh="refreshHandler"
        @moveDown="moveDownHandler"
      ></browse-header>
      <book-list
        class="browse-page__books"
        :class="{'browse-page__books--modal':modal}"
        :type="type"
        @setPage="setPage"
        :category="category"
        :direction="direction"
        :books="books"
        :infiniteId="infiniteId"
        :page="page"
        :query="query"
      ></book-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      direction: 0,
      query: "",
      type: 5,
      category: [],
      infiniteId: Math.floor(Math.random() * (20000 - 1)) + 1,
      page: 2,
      modal: false
    };
  },
  computed: {
    ...mapGetters({
      books: "book/getBrowseBooks"
    })
  },
  components: {
    BrowseHeader: () => import("./BrowseHeader"),
    BookList: () => import("@/components/Browse/BookList")
  },
  async fetch({ store, route }) {
    await store.dispatch("book/browseBooks", {
      type: 5,
      direction: 0,
      query: "",
      genres: [],
      tags: [],
      page: 1,
      limit: 20
    });
  },
  beforeMount() {
    if (this.$route.query.genre && this.$route.query.genre !== "undefined") {
      this.genres = [
        {
          name: this.$route.query.genre,
          id: this.$route.query.genre,
          type: "genre"
        }
      ];
    }
    if (this.$route.query.tag && this.$route.query.tag !== "undefined") {
      this.tags = [
        {
          name: this.$route.query.tag,
          id: this.$route.query.tag,
          type: "tag"
        }
      ];
    }
  },
  methods: {
    moveDownHandler(value) {
      this.modal = value;
    },
    setPage(index) {
      this.page = index;
    },
    incrementInfiniteId() {
      return (this.infiniteId += 1);
    },

    async refreshHandler(value) {
      const genres = this.category
        .filter(val => val.type === "genre")
        .map(val => val.id);
      const tags = this.category
        .filter(val => val.type === "tag")
        .map(val => val.id);
      await this.$store.dispatch("book/browseBooks", {
        type: this.type,
        direction: this.direction,
        query: this.query,
        genres,
        tags,
        page: 1,
        limit: 20
      });
      this.setPage(2);
      this.incrementInfiniteId();
    },
    async selectedHandler({ type, value }) {
      const type_options = {
        direction: val => {
          this.direction = val;
        },
        query: val => {
          this.query = val;
        },
        type: val => {
          this.type = val;
        },
        category: val => {
          this.category = val;
        }
      };
      type_options[type](value);
      this.refreshHandler();
    }
  }
};
</script>

<style lang="scss">
.browse-page {
  $self: &;
  &__container {
    #{$self}__books {
      transform: translateY(0);
      transition: transform 300ms;
      &--modal {
        transform: translateY(22rem) !important;
        transition: transform 300ms;
      }
    }
  }
}
</style>
