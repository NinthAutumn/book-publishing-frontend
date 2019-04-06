<template>
  <div class="update-page page-padding">
    <div class="update-page__title">
      <fa class="update-page__title--icon" icon="globe"></fa>更新された小説
    </div>
    <div class="update-page__nav">
      <fa
        @click="updateView('grid')"
        :class="{'update-page__icon--selected':update_view === 'grid'}"
        class="update-page__icon update-page__icon--grid"
        icon="th"
      ></fa>
      <fa
        @click="updateView('list')"
        :class="{'update-page__icon--selected':update_view === 'list'}"
        class="update-page__icon update-page__icon--list"
        icon="th-list"
      ></fa>
    </div>
    <BookList v-if="update_view === 'grid'"></BookList>
    <no-ssr>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </no-ssr>
  </div>
</template>

<script>
import BookList from "@/components/Update/BookList";
export default {
  components: {
    BookList
  },
  async fetch({ store }) {
    await store.dispatch("chapter/fetchLatestBooks", {
      page: 1,
      limit: 3
    });
    await store.dispatch("user/fetchUserSettings");
  },
  data() {
    return {
      page: 2
    };
  },
  methods: {
    infiniteHandler: async function($state) {
      await this.$store
        .dispatch("chapter/fetchMoreLatestBooks", {
          page: this.page++,
          limit: 3
        })
        .then(array => {
          if (array.length < 1) {
            $state.complete();
          } else {
            $state.loaded();
          }
        });
    },
    updateView: async function(setting) {
      setting = {
        update_view: setting
      };
      await this.$store.dispatch("user/setSetting", setting);
    }
  },
  computed: {
    update_view() {
      return this.$store.getters["user/getUpdateView"];
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
