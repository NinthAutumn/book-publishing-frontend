<template>
  <div class="comment-list" id="comments">
    <div class="divider flex-row chapter-hr">
      <fa class="chapter-end-hr" icon="book-open"></fa>
    </div>

    <div class="comment-list__item">
      <div class="divider flex-row flex--align">
        <fa icon="comments" class="comment-header-icon"></fa>
        <h3 class="comment-header" style>コメント欄</h3>
      </div>
      <comment-form :theme="theme"></comment-form>
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
        <li v-for="(comment) in comments" :key="comment.id">
          <Comment
            @toggleReport="toggleReportModal"
            :comment="comment"
            :theme="theme"
            :auth="auth"
            :author_id="chapter.author_id"
            :depth="0"
            :children="comment.children"
          ></Comment>
        </li>
      </div>
      <report-form
        @toggleDialog="toggleReportModal"
        :type_id="reportedCommentId"
        :problems="problems"
        type="comment"
        v-if="report"
      ></report-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hydrateOnInteraction } from "vue-lazy-hydration";

export default {
  computed: {
    ...mapGetters({
      comments: "comment/getComments",
      auth: "auth/isAuthenticated",
      chapter: "chapter/getChapter",
      theme: "user/getTheme"
    })
  },
  components: {
    Comment: () => import("@/components/Web/Cards/Comment"),
    Select: hydrateOnInteraction(() => import("@/components/All/Select")),
    CommentForm: hydrateOnInteraction(() =>
      import("@/components/Web/Forms/Comment")
    ),
    ReportForm: () => import("@/components/Web/Modals/Report")
  },

  data() {
    return {
      sort_list: [
        { key: "いいね数", value: 0 },
        { key: "最新順", value: 1 },
        { key: "問題的順", value: 2 }
      ],
      problems: [
        "差別的または攻撃的な内容",
        "テロリズムの助長",
        "スパムや誤解を招く話",
        "児童虐待",
        "広告",
        "その他"
      ],
      sort_by: 0,
      report: false,
      page: 2,
      reportedCommentId: ""
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
    await this.fetchComments({
      chapterId: this.$route.params.chaptersId,
      sortBy: this.sort_by,
      page: 1,
      limit: 10,
      direction: 0
    });
    if (this.$route.query.comment) {
      let comment = document.getElementById(`${this.$route.query.comment}`);
      console.log(comment);
      const scroll = setTimeout(() => {
        if (comment) {
          comment.scrollIntoView();
          clearInterval(scroll);
        }
        comment = document.getElementById(`${this.$route.query.comment}`);
      }, 100);
    }
  },
  methods: {
    ...mapActions({
      fetchComments: "comment/fetchCommentList"
    }),
    toggleReportModal(id) {
      this.reportedCommentId = id;
      this.report = !this.report;
    }
  }
};
</script>

<style lang="scss">
.comment-list {
  .select-component__name {
    color: black;
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
    padding: 1rem;
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
