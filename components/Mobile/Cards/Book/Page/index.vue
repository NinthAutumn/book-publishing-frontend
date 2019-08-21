<template>
  <div class="pmobile-book">
    <header-card :book="book"></header-card>
    <summary-card :synopsis="book.synopsis"></summary-card>

    <review-list :book="book"></review-list>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  components: {
    HeaderCard: () => import("./Header"),
    SummaryCard: () => import("./Summary"),
    ReviewList: () => import("./ReviewPreview")
  }
};
</script>

<style lang="scss">
</style>
