<template>
  <div class="comment-list">
    <div class="ul">
      <li v-for="(comment, index) in comments" :key="index">
        <!-- <Comment :comment="comment"></Comment> -->
      </li>
    </div>
  </div>
</template>

<script>
// import Comment from "@/components/ChapterPage/Comment";
export default {
  async asyncData({ store, params }) {
    await store.dispatch("comment/getComments", store.state.chapter._id);
  },
  computed: {
    comments() {
      // return this.$state.store.comment.comments;
    }
  },
  components: {}
};
</script>

<style>
</style>
