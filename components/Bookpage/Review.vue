<template>
  <div class="reviews">
    <div class="reviews__avatar">
      <!-- <v-img :src="review.avatar"></v-img> -->
      <!-- {{review}} -->
    </div>
    <div class="reviews-like">
      <v-avatar :size="size">
        <v-img :src="review.avatar"></v-img>
      </v-avatar>
      <p class="reviews-content-username">{{review.username}}</p>
    </div>

    <div class="reviews-content">
      <div class="reviews-content-title">{{review.title}}</div>
      <div class="flex-row flex--between">
        <div class="reviews-total-rating">
          <v-rating color="#FF8D29" readonly size="20" half-increments :value="+review.rating"></v-rating>
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
          <a @click="toggleCollapse" v-if="!readMore" class="reviews-content-text-more">>>詳細</a>
          <a @click="toggleCollapse" v-else class="reviews-content-text-more">{{'<<'}}一部を表示</a>
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
          <div v-if="$store.getters['user/loggedInUser'].id === review.user_id">
            <span>編集</span>|
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
          <div v-else>レポート</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ArrowDown from "@/assets/svg/arrow-down.svg";
// import ArrowUp from "@/assets/svg/arrow-up.svg";
import _ from "lodash";
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
      size: 80
    };
  },
  components: {},
  methods: {
    toggleCollapse() {
      this.readMore = !this.readMore;
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
          this.likeNumber = _.toNumber(this.likeNumber) + 2;
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
          this.likeNumber = _.toNumber(this.likeNumber) - 2;
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
        await this.$axios.delete(
          `/review?reviewId=${this.review.id}&rating=${
            this.review.rating
          }&bookId=${this.review.book_id}`
        );
        await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          page: 1,
          limit: 10,
          direction: "desc",
          type: "likes"
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
  computed: {},
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
</style>
