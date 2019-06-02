<template>
  <div class="update-page page-padding">
    <div class="update-page__title">
      <fa class="update-page__title--icon" icon="globe"></fa>更新された小説
    </div>
    <div class="update-page__nav">
      <fa
        @click.stop="updateView('grid')"
        :class="{'update-page__icon--selected':update_view === 'grid'}"
        class="update-page__icon update-page__icon--grid"
        icon="th"
      ></fa>
      <fa
        @click.stop="updateView('list')"
        :class="{'update-page__icon--selected':update_view === 'list'}"
        class="update-page__icon update-page__icon--list"
        icon="th-list"
      ></fa>
    </div>
    <BookList
      v-loading.fullscreen="loading"
      :latestBooks="latestBooks"
      v-if="update_view === 'grid'"
    ></BookList>
    <book-table :latestBooks="latestBooks" v-if="update_view === 'list'"></book-table>
    <no-ssr>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </no-ssr>
  </div>
</template>

<script>
export default {
  auth: false,
  components: {
    BookList: () => import("@/components/Update/BookList"),
    BookTable: () => import("@/components/Update/BookTable")
  },
  async fetch({ store }) {
    if (store.getters.isAuthenticated) {
      await store.dispatch("user/fetchUserSettings");
    }
  },
  async mounted() {
    await this.$store.dispatch("book/fetchLatestBooks", {
      page: 1,
      limit: 30
    });
    this.loading = false;
  },
  data() {
    return {
      page: 2,
      loading: true
    };
  },
  methods: {
    infiniteHandler: async function($state) {
      const array = await this.$store.dispatch("book/fetchLatestBooks", {
        page: this.page++,
        limit: 30,
        infinite: true
      });
      if (array.length < 1) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    updateView: async function(setting) {
      if (!this.loggedIn) {
        return this.$store.commit("LOGIN_STATE");
      }
      await this.$store.dispatch("user/setSetting", {
        type: "updateDisplay",
        change: setting
      });
    }
  },
  computed: {
    update_view() {
      if (this.$store.getters.isAuthenticated) {
        // console.log(this.$store.getters["user/getUpdateView"]);
        return this.$store.getters["user/getUpdateView"];
      } else {
        return "grid";
      }
    },
    latestBooks() {
      return this.$store.getters["book/getLatest"];
    },
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss">
.update-page {
  $self: &;
  &__nav {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    #{$self}__icon {
      margin-right: 1rem;
      transform: scale(1);
      color: grey;
      transition: transform 200ms;
      &:hover {
        cursor: pointer;
      }
      &:active {
        transform: scale(0.95);
        transition: transform 200ms;
      }
      &--selected {
        color: $primary;
      }
      &--grid {
      }
      &--list {
      }
    }
  }
  &__title {
    font-size: 2rem;
    display: flex;
    align-items: center;
    &--icon {
      margin-right: 5px;
    }
  }
}
</style>
