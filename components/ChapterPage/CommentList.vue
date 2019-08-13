<template>
  <div class="comment-list" id="comments">
    <div class="divider flex-row chapter-hr">
      <fa class="chapter-end-hr" icon="book-open"></fa>
    </div>

    <div class="comment-list__item" style="padding: 0 10px;">
      <div class="divider flex-row flex--align">
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

        <div class="divider flex-row flex--right">
          <div @click="addComment" class="comment-form__submit flex-row flex--align flex--center">投稿</div>
        </div>
      </div>
      <div class="flex-row flex--right" v-else>
        <button class="comment-not" @click.stop="$store.commit('LOGIN_STATE')">ログインまたはアカウント作成</button>
      </div>
      <div class="comment-unordered-list" v-if="comments.length > 0">
        <div class="comment-list__select flex-row flex--align" v-if="comments.length > 0">
          <Select
            fontSize="14"
            width="100px"
            def="いいね数"
            transition="grow-shrink"
            name="並び替え"
            :object="sort_list"
            v-model="sort_by"
          ></Select>
        </div>
        <li v-for="(comment, index) in comments" :key="index">
          <Comment :comment="comment" :depth="0" :children="comment.children"></Comment>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      comments: "comment/getComments"
    })
  },
  components: {
    Comment: () => import("@/components/ChapterPage/Comment"),
    Select: () => import("@/components/All/Select")
  },

  data() {
    return {
      sort_list: [
        { key: "いいね数", value: 0 },
        { key: "最新順", value: 1 },
        { key: "問題的順", value: 2 }
      ],
      sort_by: 0,
      content: "",
      error: false,
      page: 2
    };
  },
  watch: {
    sort_by: async function(val) {
      await this.$store.dispatch("comment/fetchCommentList", {
        chapterId: this.$route.params.chaptersId,
        sortBy: this.sort_by,
        page: 1,
        limit: 10,
        direction: 0
      });
    }
  },
  async mounted() {
    await this.$store.dispatch("comment/fetchCommentList", {
      chapterId: this.$route.params.chaptersId,
      sortBy: this.sort_by,
      page: 1,
      limit: 10,
      direction: 0
    });
  },
  methods: {
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      if (!this.content) {
        return (this.error = true);
      }
      await this.$store.dispatch("comment/addComment", {
        bookId,
        chapterId,
        content: this.content
      });

      this.$toast.show("コメントの投稿に成功！", {
        theme: "toasted-primary",
        position: "top-right",
        duration: 1000
      });

      await this.$store.dispatch("comment/fetchCommentList", {
        chapterId: this.$route.params.chaptersId,
        userId: this.$store.getters["user/loggedInUser"].id
      });
      this.content = "";
    }
  }
};
</script>

<style lang="scss">
.comment-list {
  .select-component__name {
    color: black;
  }
  .comment-form__submit {
    // align-items:lef/
    width: 10rem;
    line-height: 0;
    // text-align: center;
    height: 3.5rem;
    border-radius: 0;
    box-sizing: border-box;
    font-size: 1.2rem !important;
    margin-top: 0;
    background-color: #32325d;
    color: white;
    transition: 300ms;
    border-radius: 0.4rem;
    // margin-top: 3rem;
    padding: 1rem;
    box-shadow: 0px 2px 3px 0px #f5e2f5;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    transition: 200ms;
    &--cancel {
      margin-right: 1rem;
      background-color: #fff;
      color: #32325d;
    }
    &:hover {
      color: #32325d;
      background-color: white;
      transition: 300ms;

      user-select: none;
      cursor: pointer;
    }
  }
  .comment-header-icon {
    font-size: 2rem;
    color: $secondary;
    margin-right: 0.5rem;
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
    font-size: 2rem;
  }
  .comment-submit {
    height: 3.5rem !important;
    margin-bottom: 1rem;
  }
  .content-textarea {
    margin-top: 0.5rem !important;
    resize: none;
    width: 100%;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    height: 10rem;
    padding: 1rem;
    transition: 100ms;
    border-radius: 0.4rem;
    border: 2px solid #b4b7b9;
    &:focus {
      outline: none;
    }
  }
  &__item {
    // padding-top: 10px;
  }
}
.comment-not {
  font-size: 1.4rem;
  padding: 1rem;
  background-color: #32315e;
  color: white;
  border-radius: 0.4rem;
  margin-bottom: 5px;
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
