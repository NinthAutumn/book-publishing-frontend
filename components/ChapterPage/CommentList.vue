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

      <div style="margin-bottom:5px;" class="divider" v-if="$store.state.auth.loggedIn">
        <div class="comment-list__error" v-if="error">
          <p>コメントは何か書かないと投稿できません！</p>
        </div>
        <textarea
          required
          v-model="content"
          class="form-input content-textarea"
          placeholder="コメントを書く"
        ></textarea>

        <div class="divider flex flex--right">
          <div @click="addComment" class="comment-form__submit flex flex--align flex--center">投稿</div>
        </div>
      </div>
      <div class="comment-not" v-else>
        <button>ログインまたはアカウント作成</button>
      </div>
      <div class="comment-list__loading" v-if="loading">ローディングー中</div>
      <div class="comment-unordered-list" v-if="comments.length > 0">
        <div class="comment-list__select flex flex--align" v-if="comments.length > 1">
          <Select def="いいね数" transition="grow-shrink" name="並び替え" :object="sort_list"></Select>
        </div>
        <li v-for="(comment, index) in comments" :key="index">
          <Comment :comment="comment" :depth="0" :children="comment.children"></Comment>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/ChapterPage/Comment";
import Select from "@/components/All/Select";
export default {
  computed: {
    comments() {
      return this.$store.state.comment.comments;
    }
  },
  components: {
    Comment,
    Select
  },

  data() {
    return {
      sort_list: [
        { key: "いいね数", value: "likes" },
        { key: "最新順", value: "latest" },
        { key: "古い順", value: "oldest" }
      ],
      content: "",
      error: false
    };
  },
  async created() {},
  async mounted() {
    await this.$store.dispatch("comment/getComments", {
      chapterId: this.$route.params.chaptersId
    });
  },
  methods: {
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      if (!this.content) {
        return (this.error = true);
      }
      this.$store
        .dispatch("comment/addParentlessComment", {
          bookId,
          chapterId,
          content: this.content
        })
        .then(async () => {
          this.$message({
            message: "コメントの投稿に成功！",
            type: "success"
          });
          await this.$store.dispatch("comment/getComments", {
            chapterId: this.$route.params.chaptersId
          });
          this.newComment.content = "";
        })
        .catch(e => {});
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
    height: 35px;
    border-radius: 0;

    box-sizing: border-box;
    font-size: 12px !important;
    margin-top: 0;
    color: white;
    background-color: $secondary-light;
    padding: 10px;
    transition: 200ms;
    &:hover {
      transition: 200ms;
      color: $secondary-light;
      background-color: #fff;
      border: 1px solid $secondary-light;
      user-select: none;
      cursor: pointer;
    }
  }
  .comment-header-icon {
    font-size: 16px;
    color: $secondary;
  }
  &__error {
    color: red;
    p {
      font-size: 16px;
      margin: 0 !important;
    }
  }
  .comment-header {
    color: $secondary;
  }
  .comment-submit {
    height: 35px !important;
    margin-bottom: 10px;
  }
  .content-textarea {
    resize: none;
    width: 100%;
    margin-bottom: 5px;
    font-size: 13px;
    height: 100px;
    padding: 10px;
    transition: 300ms;
    &:focus {
      outline: none;
      box-shadow: 1px 1px 5px 0px rgb(214, 214, 214);
    }
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
