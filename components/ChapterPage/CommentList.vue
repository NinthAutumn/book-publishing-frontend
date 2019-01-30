<template>
  <div class="comment-list">
    <h3 class="comment-header">コメント欄</h3>

    <div class="ul">
      <li v-for="(comment, index) in comments" :key="index">
        <Comment :comment="comment" :depth="0" :children="comment.children"></Comment>
      </li>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/ChapterPage/Comment";
export default {
  computed: {
    comments() {
      return this.$store.state.comment.comments;
    }
  },
  components: {
    Comment
  }
};
</script>

<style>
</style>
