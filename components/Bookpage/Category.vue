<template>
  <div class="book-tags">
    <p class="book-tags__title">ジャンル</p>
    <ul class="book-tags__list flex-row">
      <nuxt-link
        :to="`/browse?genre=${genre}`"
        tag="li"
        class="book-tags__item book-tags__item--genre"
        v-for="(genre, index) in genres"
        :key="index"
        v-ripple
      >{{genre}}</nuxt-link>
    </ul>
    <p class="book-tags__title">タグ</p>
    <ul class="book-tags__list flex-row">
      <nuxt-link
        :to="`/browse?tag=${tag}`"
        tag="li"
        class="book-tags__item"
        v-for="(tag, index) in tags"
        :key="index"
        v-ripple
      >{{tag}}</nuxt-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async mounted() {
    await this.$store.dispatch(
      "book/fetchBookGenreAndTags",
      this.$route.params.id
    );
  },
  computed: {
    ...mapGetters({
      genres: "book/getBookGenres",
      tags: "book/getBookTags"
    })
  }
};
</script>

<style lang="scss">
.book-tags {
  &__title {
    font-size: 2rem;
    margin-bottom: 5px;
  }
  &__list {
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  &__item {
    margin-right: 5px;
    height: 2.5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    border: 1px solid $secondary;
    border-radius: 0.5rem;
    color: $secondary;
    user-select: none;
    &--genre {
      border: 1px solid $primary;
      color: $primary;
      &:hover {
        background-color: #ebdbff98 !important;
      }
    }
    &:hover {
      cursor: pointer;
      background-color: #dbe5ff98;
    }
  }
}
</style>
