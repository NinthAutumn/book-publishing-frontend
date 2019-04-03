<template>
  <div class="update-page">
    <div class="update-page__title">
      <fa class="update-page__title--icon" icon="globe"></fa>更新された小説
    </div>
    <BookList></BookList>
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
    }
  }
};
</script>

<style lang="scss">
.update-page {
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
