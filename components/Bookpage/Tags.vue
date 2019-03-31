<template>
  <div class="book-tags">
    <p class="book-tags__title">作品のタグ</p>
    <ul class="book-tags__list flex-row">
      <li
        class="book-tags__item"
        v-for="(tag, index) in $store.state.book.book.tags"
        :key="index"
        v-ripple
      >{{tag}}</li>
    </ul>
  </div>
</template>

<script>
export default {};
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
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    background: white;
    border: 1px solid black;
    border-radius: 0.5rem;
    color: black;
    user-select: none;
    &:hover {
      cursor: pointer;
      color: $secondary;
      background-color: white;
      border: 1px solid $secondary;
    }
  }
}
</style>
