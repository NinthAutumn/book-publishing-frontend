<template>
  <div class="comment-list">
    <div class="divider flex chapter-hr">
      <fa class="chapter-end-hr" icon="book-open"></fa>
    </div>
    <div class="comment-list__item" style="padding: 0 10px;">
      <div class="divider flex flex--align">
        <fa icon="comments" class="comment-header-icon"></fa>
        <h3 class="comment-header" style>コメント欄</h3>
      </div>
      <div class="divider" v-if="$store.state.auth.loggedIn">
        <form @submit.prevent="addComment" class="flex flex-column">
          <textarea
            required
            v-model="newComment.content"
            class="form-input content-textarea"
            placeholder="コメントを書く"
          ></textarea>
          <div class="divider flex flex--right">
            <input
              type="submit"
              class="form-submit form-submit--secondary comment-form__submit flex flex--center"
              value="投稿"
            >
          </div>
        </form>
      </div>
      <div class="comment-not" v-else>
        <button>Sign in or Sign up!</button>
      </div>
      <div class="comment-unordered-list">
        <li v-for="(comment, index) in comments" :key="index">
          <Comment :comment="comment" :depth="0" :children="comment.children"></Comment>
        </li>
      </div>
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
  },

  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ],
      newComment: {
        content: ""
      }
    };
  },
  methods: {
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      const content = this.newComment.content;
      this.$store
        .dispatch("comment/addParentlessComment", {
          bookId,
          chapterId,
          content
        })
        .then(() => {
          this.$message({
            message: "コメントの投稿に成功！",
            type: "success"
          });
          this.newComment.content = "";
        })
        .catch(e => {
          this.$message({
            message: `${e}`,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.comment-list {
  .comment-form__submit {
    // align-items:lef/
    width: 100px;
    // text-align: center;
    height: 30px;
    box-sizing: border-box;
    font-size: 12px !important;
    margin-top: 0;
  }
  .comment-header-icon {
    font-size: 16px;
    color: $secondary;
  }
  .comment-header {
    color: $secondary;
  }
  .comment-submit {
    height: 35px !important;
    margin-bottom: 10px;
    // background-color: $secondary !important;
    // font
  }
  .content-textarea {
    resize: none;
    margin-bottom: 5px;
    font-size: 13px;
    height: 100px;
    padding: 5px;
    transition: 300ms;
    &:focus {
      outline: none;
      box-shadow: 1px 1px 5px 0px rgb(214, 214, 214);
    }
    border-radius: 5px;
    border: 2px solid #b4b7b9;
  }
  &__item {
    // padding-top: 10px;
  }
}
.chapter-hr {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    position: absolute;
    content: "";
    height: 2px;
    color: grey;
    width: 45%;
    background-color: #dae0e6;
    top: 50%;
    left: 10px;
  }
  &::before {
    position: absolute;
    content: "";
    height: 2px;
    color: grey;
    width: 45%;
    background-color: #dae0e6;
    top: 50%;
    right: 10px;
  }
  .chapter-end-hr {
    // text-align: center;
    font-size: 16px;
    color: #dae0e6;
    display: inline-block;
  }
}
</style>
