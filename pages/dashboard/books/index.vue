<template>
  <div class="user-books">
    <div class="user-books__header flex flex--align flex--between">
      <header>本棚</header>
    </div>
    <div class="user-books__books-list">
      <book-list :books="books"></book-list>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store }) {
    await store.dispatch("analytic/fetchUserBooks");
  },
  mounted() {
    if (this.books.length < 1) {
      this.$router.push("/dashboard/books/new");
    }
  },
  data() {
    return {
      dialog: false,
      bookId: 0,
      announcement: {
        title: "",
        content: ""
      }
    };
  },
  components: {
    BookList: () => import("@/components/Dashboard/BookList")
  },
  watch: {
    "announcement.title": val => {
      if (val.length > 100) {
        // return alert("over");
      }
    }
  },
  computed: {
    books() {
      return this.$store.getters["analytic/getBookList"];
    }
  },
  methods: {},
  filters: {
    truncate: (string, number) => {
      if (string.length > 16) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.user-books {
  min-height: 100vh;
  $self: &;

  .v-text-field__slot {
    font-size: 1.6rem;
  }
  .v-btn__content {
    font-size: 1.4rem;
  }
  .v-dialog {
    &::after {
      content: "";
      height: 100vh;
      width: 100vw;
      background-color: rgba(248, 248, 248, 0.493);
      z-index: -1;
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  &__header {
    header {
      font-size: 3rem;
    }
  }
}
</style>
