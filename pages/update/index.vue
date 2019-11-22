<template>
  <div class="update-page page-padding">
    <div class="update-page__title">
      <fa class="update-page__title--icon" icon="globe"></fa>更新された小説
    </div>
    <div class="update-page__nav" v-if="!$device.isMobile">
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
      v-loading="loading"
      :latestBooks="latestBooks"
      v-if="!$device.isMobile?update_view === 'grid':true"
    ></BookList>
    <book-table :latestBooks="latestBooks" v-if="!$device.isMobile?update_view === 'list':false"></book-table>
    <client-only>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  auth: false,
  components: {
    BookList: hydrateWhenVisible(() => import("@/components/Update/BookList")),
    BookTable: hydrateWhenVisible(() => import("@/components/Update/BookTable"))
  },
  async fetch({ store }) {
    if (store.getters["auth/isAuthenticated"]) {
      await store.dispatch("user/fetchUserSettings");
    }
    await store.dispatch("book/fetchLatestBooks", {
      page: 1,
      limit: 30,
      structured: true
    });
  },
  async mounted() {},
  data() {
    return {
      page: 2,
      loading: false
    };
  },
  methods: {
    ...mapActions({
      fetchLatest: "book/fetchLatestBooks",
      setSetting: "user/setSetting"
    }),
    ...mapMutations({
      openLogin: "LOGIN_STATE"
    }),
    infiniteHandler: async function($state) {
      const array = await this.fetchLatest({
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
      if (!this.loggedIn) return this.openLogin();
      await this.setSetting({
        type: "update_display",
        change: setting
      });
    }
  },
  computed: {
    ...mapGetters({
      latestBooks: "book/getLatest",
      loggedIn: "auth/isAuthenticated"
    }),
    update_view() {
      if (this.loggedIn) {
        return this.$store.getters["user/getUpdateView"];
      } else {
        return "grid";
      }
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
