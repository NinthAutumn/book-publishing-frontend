<template>
  <div class="reviews">
    <div class="reviews__avatar">
      <!-- <v-img :src="review.avatar"></v-img> -->
      <!-- {{review}} -->
    </div>
    <div class="reviews-like">
      <v-avatar :size="size">
        <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar"></v-img>
      </v-avatar>

      <p
        v-text="book.user_id === review.user_id? book.pen_name : review.username"
        class="reviews-content-username"
      ></p>
      <!-- <p v-else class="reviews-content-username">{{review.username}}</p> -->
      <div
        class="reviews__user-info"
        style="text-align:center;font-size:1.2rem;color:#566CD6;"
        v-if="book.user_id === review.user_id"
      >作者</div>
    </div>

    <div class="reviews-content">
      <div class="reviews-content-title">{{review.title}}</div>
      <div class="flex-row flex--between">
        <div class="reviews-total-rating">
          <v-rating color="#FF6452" readonly size="20" half-increments :value="+review.rating"></v-rating>
        </div>
        <div class="reviews-author"></div>
      </div>
      <div ref="review" class="reviews-content-text flex flex-column flex--between">
        <div v-if="!readMore" v-html="truncate(review.content, limit-1)"></div>
        <div v-if="readMore" v-html="review.content"></div>
        <!-- <div
          class="reviews-content-text--html"
          v-html="review.content"
          :class="{readmore: readMore}"
        ></div>-->
        <div v-if="review.content.length > limit" class="buts">
          <a @click="toggleCollapse" v-if="!readMore" class="reviews-content-text-more">詳細 ></a>
          <a @click="toggleCollapse" v-else class="reviews-content-text-more" v-text="'< 一部を表示'"></a>
        </div>
      </div>
      <div class="flex-divider flex-row">
        <div class="reviews__rate">
          <div class="reviews__rate__up" @click="likedReview">
            <fa icon="thumbs-up" class :class="{liked: liked}"></fa>
          </div>
          <p v-text="likeNumber" :class="{disliked: likeNumber <0}"></p>
          <div class="reviews__rate__down" @click="dislikedReview">
            <fa icon="thumbs-up" :class="{disliked: disliked}"></fa>
          </div>
        </div>
        <div
          class="flex-row flex--right reviews__edit"
          style="width:100%;"
          v-if="$store.getters.isAuthenticated"
        >
          <div v-if="$store.getters['auth/getUser'].id === review.user_id">
            <span @click.stop="$emit('editReview')">編集</span>|
            <span @click="toggleWarning">削除</span>
            <v-dialog v-model="deleteModal" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">本当に削除しますか?</v-card-title>
                <v-card-text>削除したらもうこのレビューは取り戻しできなくなります。</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" flat @click="toggleWarning">いいえ</v-btn>
                  <v-btn :loading="loading" color="blue darken-1" flat @click="deleteReview">はい</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div v-else>
            <span @click.stop="toggleReport">報告</span>
            <transition name="grow-shrink">
              <div class="report-review dialog dialog__container" v-if="problem">
                <div class="report-review__container dialog__content">
                  <form @submit.prevent class="report-review__form flex-column">
                    <label class="flex-row flex--between flex--align">
                      報告の理由
                      <span>
                        <fa @click="toggleReport" class="report-review__close" icon="times"></fa>
                      </span>
                    </label>
                    <v-radio-group v-model="report.problem">
                      <v-radio v-for="n in problems" :key="n" :label="n" :value="n"></v-radio>
                    </v-radio-group>
                    <textarea
                      placeholder="詳しく報告の理由"
                      v-if="report.problem === 'その他'"
                      v-model="report.moreInfo"
                      name="problem"
                      id
                    ></textarea>
                    <div class="flex-divider flex-row report-review__button">
                      <button
                        class="report-review__submit report-review__submit--close"
                        @click="toggleReport"
                      >キャンセル</button>
                      <button
                        class="report-review__submit"
                        v-loading="loading"
                        @click="reportReview"
                      >報告</button>
                    </div>
                  </form>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ArrowDown from "~/assets/svg/arrow-down.svg";
// import ArrowUp from "~/assets/svg/arrow-up.svg";
import { toNumber } from "lodash";
import { mapGetters } from "vuex";
export default {
  props: {
    review: Object
  },
  watch: {
    review: function(val) {
      this.liked = this.review.voted > 0;
      this.disliked = this.review.voted < 0;
      this.likeNumber = this.review.likes;
    }
  },
  data() {
    return {
      readMore: false,
      liked: false,
      disliked: false,
      likeNumber: 0,
      deleteModal: false,
      loading: false,
      limit: 370,
      size: 80,
      loading: false,
      problems: [
        "差別的または攻撃的な内容",
        "テロリズムの助長",
        "スパムや誤解を招く話",
        "児童虐待",
        "その他"
      ],
      problem: false,
      report: {
        problem: "",
        moreInfo: ""
      }
    };
  },
  components: {},
  methods: {
    toggleCollapse() {
      this.readMore = !this.readMore;
    },
    toggleReport: function() {
      this.problem = !this.problem;
    },
    reportReview: async function() {
      const report = {
        type: "review",
        type_id: this.review.id,
        problem: this.report.problem,
        more_info: this.report.moreInfo
      };
      try {
        this.loading = true;
        await this.$store.dispatch("report/postReport", { report });
        this.loading = false;
        this.problem = !this.problem;
        return this.$toast.show("報告に成功しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "check_circle"
        });
      } catch (error) {}
    },
    async likedReview() {
      if (this.liked) {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 0
        });
        this.likeNumber--;
        this.liked = false;
      } else {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 1
        });
        this.liked = true;
        if (this.disliked) {
          this.likeNumber = toNumber(this.likeNumber) + 2;
          this.disliked = false;
        } else {
          this.likeNumber++;
        }
      }
    },
    async dislikedReview() {
      if (this.disliked) {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 0
        });
        this.likeNumber++;
        this.disliked = false;
      } else {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: -1
        });
        this.disliked = true;
        if (this.liked) {
          this.likeNumber = toNumber(this.likeNumber) - 2;
          this.liked = false;
        } else {
          this.likeNumber--;
        }
      }
    },
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    },
    toggleWarning: function(state) {
      this.deleteModal = !this.deleteModal;
    },
    deleteReview: async function() {
      this.loading = true;
      try {
        await this.$axios.delete(`/v2/review/${this.review.id}`);
        await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          page: 1,
          limit: 10,
          direction: "desc",
          type: 0
        });
        await this.$store.dispatch("review/fetchIsReviewed", {
          bookId: this.$route.params.id
        });
        this.deleteModal = !this.deleteModal;
        this.loading = false;
      } catch (error) {
        this.$toast.show("レビューの削除に失敗しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      book: "book/getBook"
    })
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "<";
      } else {
        return string;
      }
    }
  },
  mounted: function() {
    this.liked = this.review.voted > 0;
    this.disliked = this.review.voted < 0;
    this.likeNumber = this.review.likes;

    if (this.$device.isMobile) {
      this.limit = 50;
      this.size = 40;
    }
  }
};
</script>

<style  lang="scss" >
.reviews-content-text {
  .buts {
    text-align: right !important;
  }

  .reviews-content-text-more {
    font-size: 1.4rem;
  }
}

.reviews {
  hr {
    color: black;
    background-color: black;
  }
  a {
    color: $primary;
    font-weight: bold;
  }
  .reviews-total-rating {
    display: flex;
    align-items: center;
  }
  .v-avatar {
    box-shadow: 1px 1px 5px rgb(219, 219, 219);
  }
  &__edit {
    div {
      font-size: 1.4rem;
      span {
        font-size: inherit;
      }
    }
    &:hover {
      cursor: pointer;
    }
    color: grey;
  }
  &__rate {
    display: flex;
    color: grey;
    align-items: center;
    .liked {
      color: orangered;
    }
    .disliked {
      color: #7193ff;
    }

    &__up {
      font-size: 1.6rem;
      margin-right: 0.7rem;
      &:hover {
        cursor: pointer;
        color: orangered;
      }
      &:active {
        transform: scale(1.2);
        transition: transform 300ms;
      }
      &:focus {
        transform: scale(0.9);
        transition: transform 300ms;
      }
      transition: transform 300ms;
    }
    &__down {
      // transform: ;
      &:hover {
        color: #7193ff;
        cursor: pointer;
      }
      &:active {
        transform: scale(1.2) rotate(180deg);
        transition: transform 300ms;
      }
      &:focus {
        transform: scale(0.9) rotate(180deg);
        transition: transform 300ms;
      }
      transition: transform 300ms;
      margin-left: 0.7rem;
      font-size: 1.6rem;
      transform: rotate(180deg);
    }
  }
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 10px 10px;
  padding-bottom: 0 !important;
  // border-bottom: 1px solid $review-color;
  box-sizing: border-box;
  // height: 183px;
  overflow: hidden;
  // padding: 5px;
  &-author {
    // margin-left: 20px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    &-cover {
      border-radius: 100px;
    }
    &-username {
      font-size: 1.4rem;
    }
  }
  &-rating {
  }
  &-content {
    padding: 5px 10px;
    padding-bottom: 0px !important;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    width: 100%;
    box-sizing: border-box;
    // height: 150px;
    // justify-content: space-between;

    .flex-row {
      font-size: 16px;
      line-height: none;
      margin-bottom: 5px;
      .vue-star-rating-rating-text {
        font-size: 16px;
        margin: 0;
      }
      p {
        font-size: 1.4rem;
      }
    }
    &-username {
      margin-top: 0.5rem;
    }
    &-title {
      margin-bottom: 5px;
      // padding: 10px;
      font-size: 1.6rem;
    }
    .buts {
      text-align: center;
      a {
        &:hover {
          cursor: pointer;
        }
      }
    }

    .collapsed {
      // height: 150px;
      // padding: 10px;
      // margin-left: 10px;
      // height: 100%;
    }
    .open {
      // margin-left: 10px;
      p {
        white-space: pre-wrap;
        font-size: 1.4rem;
        line-height: 28px;
        font-weight: 300;
        text-align: left;
        overflow: hidden;
        height: 100% !important;
      }
    }
    &-text-bigger {
      // height: 150px;
      // padding: 10px;
      margin-left: 10px;
      // height: 100%;
      p {
        overflow: hidden;
        // height: 132px;
        text-align: left;
        font-size: 1.4rem;
        font-weight: 300;
      }
    }
  }
  &-like {
    display: flex;
    flex-direction: column;
    justify-content: left;
    p {
      text-align: center;
    }
    &-up {
      // : 20px;
      height: 50px;
      width: 20px;
      // viewbox: 0, 0, 60, 55;
      // height: auto;
      cursor: pointer;
      &:hover {
        fill: red;
      }
    }
    &-down {
      height: 50px;
      width: 20px;
      cursor: pointer;
      &:hover {
        fill: blue;
      }
    }
    .liked {
      fill: red;
    }
    .disliked {
      fill: blue;
    }
  }
  transition: 300ms;
}
.report-review {
  $self: &;

  #{$self}__container {
    border-radius: 2rem;
    // bottom: ;
    #{$self}__form {
      font-size: 1.8rem;
      span {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10rem;
        background-color: #e3e8ee;
      }
      #{$self}__close {
        font-size: 1.6rem;
        color: #4f566b;
      }
      label {
        font-size: 1.8rem;
      }
      textarea {
        font-size: 1.6rem;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
      #{$self}__button {
        width: 100%;
        height: 3.5rem;
        border-radius: 1rem;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      #{$self}__submit {
        font-size: 1.6rem;
        // align-self: flex-end;
        // padding: 0 2rem;
        width: 50%;
        background-color: #566cd6;
        color: white;

        &--close {
          background-color: white;
          color: #566cd6;
          // align-self: flex-start;
        }
      }
    }

    // background-color:;
  }
}
</style>
