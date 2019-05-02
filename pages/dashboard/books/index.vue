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
  &__books-list {
    width: 100%;
    height: 100%;

    #{$self}__book {
      height: 199px;
      width: 100%;
      box-shadow: 1px 1px 5px rgb(243, 243, 243);
      #{$self}__content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas:
          "chapter chapter chapter chapter"
          "state bookmark view review"
          "none announcement toc create";
        grid-gap: 5px;
        grid-row-gap: 20px;
        #{$self}__latest-chapter {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          width: 100%;
          grid-area: chapter;
          // height: 30px;
          // height: 35px;
          padding: 10px;
          color: grey;
          font-size: 13px;
        }
        #{$self}__state {
          grid-area: state;
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          color: #888582;
          background-color: #f5f6f5;
          &__title {
            font-size: 11px;
            font-weight: bold;

            max-width: 100%;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__bookmark {
          height: 50px;
          grid-area: bookmark;
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__view {
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: view;
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__review {
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: review;
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__announcement {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: announcement;
          color: white;
          font-size: 12px;
          background-color: #bca0ff;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #bca0ff;
            color: #bca0ff;
          }
        }
        #{$self}__create {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: create;
          color: white;
          font-size: 12px;
          background-color: $primary;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid $primary;
            color: $primary;
          }
        }
        #{$self}__toc {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: toc;
          color: white;
          font-size: 12px;
          background-color: $secondary;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid $secondary;
            color: $secondary;
          }
        }
      }
      #{$self}__title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &__icon {
          font-size: 18px;
          color: $secondary;
          transition: 200ms;
          &:hover {
            cursor: pointer;
            transform: rotate(360deg);
            transition: 200ms;
          }
        }
        p {
          font-size: 16px;
          width: 100%;
          height: 24px;
          &:hover {
            cursor: pointer;
            color: grey;
          }
        }
        overflow: hidden;
        width: 350px;
      }
      #{$self}__meta-info {
        padding: 10px;
        background-color: #fff;
        font-size: 16px;
        width: 100%;
      }
    }

    margin-top: 20px;
    // background-color: white;
    img {
      height: 199px;
      width: 135px;
    }
  }
  &__header {
    header {
      font-size: 20px;
    }
  }
}
</style>
