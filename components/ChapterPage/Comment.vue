<template>
  <div class="comment-modal">
    <h3 class="comment-header">コメント欄</h3>
    <div class="comment-modal__container">
      <div class="comment-modal__comment-list">
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="comment-modal__comment__comment-list__item"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: []
    };
  },
  computed: {
    comments() {
      return this.comment;
    }
  }
};
</script>

<style>
.comment-header {
  font-size: 20px;
}
</style>
