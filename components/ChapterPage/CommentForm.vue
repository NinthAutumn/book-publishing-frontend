<template>
  <div class="comment-form">
    <div style="margin-bottom:5px;" class="divider" v-if="auth">
      <div class="comment-list__error" v-if="error">
        <p>コメントは何か書かないと投稿できません！</p>
      </div>
      <textarea
        required
        v-model="content"
        class="form-input content-textarea"
        placeholder="コメントを書く"
      ></textarea>

      <div class="divider flex-row flex--right">
        <div @click="addComment" class="comment-form__submit flex-row flex--align flex--center">投稿</div>
      </div>
    </div>
    <div class="flex-row flex--right" v-else>
      <button class="comment-not" @click.stop="$store.commit('LOGIN_STATE')">ログインまたはアカウント作成</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      content: "",
      error: false
    };
  },
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
    ...mapActions({
      setComment: "comment/addComment",
      fetchComments: "comment/fetchCommentList"
    }),
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      if (!this.content) return (this.error = true);
      const { error, code } = await this.setComment({
        bookId,
        chapterId,
        content: this.content
      });
      if (error) return this.$toast.error(error);
      this.$toast.success("コメントの投稿に成功！");
      await this.fetchComments({
        chapterId,
        userId: this.$store.getters["auth/getUser"].id
      });

      this.content = "";
    }
  }
};
</script>

<style lang="scss">
</style>
