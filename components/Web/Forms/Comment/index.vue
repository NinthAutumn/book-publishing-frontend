<template>
  <div class="comment-form" :class="{'comment-form--black':theme==='black'}">
    <div class="comment-form__container">
      <label for="comment" class="comment-form__label"></label>
      <span class="comment-form__error" v-if="commentError">{{commentError}}</span>

      <textarea v-model="content" name="comment" id="comment" placeholder="コメントを書く"></textarea>
      <div class="flex-divider flex-row flex--align flex--right">
        <button
          class="comment-form__submit"
          @click="postComment"
          v-text="parentId? '返信する':'コメントする'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    parentId: [String, Number],
    theme: String
  },
  data() {
    return {
      content: "",
      commentError: ""
    };
  },
  methods: {
    ...mapActions({
      setComment: "comment/addComment"
    }),
    async postComment() {
      if (!this.content)
        return (this.commentError = "コメントは何か書かないと投稿できません！");
      const comment = {
        bookId: this.$route.params.id,
        chapterId: this.$route.params.chaptersId,
        content: this.content,
        parentId: this.parentId ? this.parentId : null
      };

      try {
        const { error, code } = await this.setComment(comment);
        if (error) return this.$toast.error(error);
        this.$toast.success("返信の投稿に成功しました");
        this.$emit("toggleForm");
        this.content = "";
      } catch (error) {
        this.$toast.error("返信の投稿に失敗しました");
      }
    }
  }
};
</script>

<style lang="scss">
.comment-form {
  $self: &;
  &--black {
    textarea {
      background-color: #030303;
    }
  }
  &__container {
    margin-top: 1rem;
    #{$self}__label {
    }
    #{$self}__error {
      font-size: 1.4rem;
      color: orangered;
      margin: 1rem 0;
    }
    textarea {
      margin-bottom: 1rem;
      height: 10rem;
      width: 100%;
      // background-color: rgb(240, 240, 240);
      border-radius: 0.5rem;
      font-size: 1.5rem;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      padding: 1rem;
      &:active,
      &:focus {
        outline: none;
      }
    }
    #{$self}__submit {
      background-color: #32325d;
      color: rgb(235, 235, 235);
      border-radius: 0.5rem;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      padding: 1rem 2rem;
      font-size: 1.3rem;
    }
  }
}
</style>
