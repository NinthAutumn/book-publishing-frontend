<template>
  <div class="book-tags">
    <p class="text--medium text--center">作品のタグ</p>
    <ul class="flex flex--center">
      <li
        class="pill pill-secondary-open pill-round"
        v-for="(tag, index) in $store.state.book.book.tags"
        :key="index"
      >
        <div class="pill-text">
          <p>{{tag}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
