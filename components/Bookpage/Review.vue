<template>
  <div class="reviews">
    <div class="reviews__avatar">
      <!-- <v-img :src="review.avatar"></v-img> -->
      <!-- {{review}} -->
    </div>
    <div class="reviews-like">
      <svg-icon
        name="arrow-up"
        class="reviews-like-up"
        :class="{liked: liked}"
        @click="likedReview"
      ></svg-icon>
      <p v-text="likeNumber"></p>
      <svg-icon
        name="arrow-down"
        class="reviews-like-down"
        :class="{disliked: disliked}"
        @click="dislikedReview"
      ></svg-icon>
    </div>

    <div class="reviews-content">
      <div class="reviews-content-title">{{review.title}}</div>
      <div class="flex-row flex--between">
        <div class="reviews-total-rating">
          <no-ssr>
            <star-rating
              name="rating"
              v-model="review.rating"
              :star-size="18"
              :show-rating="false"
              :read-only="true"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
              :glow="1"
            ></star-rating>
          </no-ssr>
        </div>
        <div class="reviews-author">
          <p class="reviews-content-username">投稿者：{{review.username}}</p>
        </div>
      </div>
      <div ref="review" class="reviews-content-text flex flex-column flex--between">
        <div v-if="!readMore" v-html="truncate(review.content, 372)"></div>
        <div v-if="readMore" v-html="review.content"></div>
        <div
          class="reviews-content-text--html"
          v-html="review.content"
          :class="{readmore: readMore}"
        ></div>
        <div v-if="review.content.length > 372" class="buts">
          <a @click="toggleCollapse" v-if="!readMore" class="reviews-content-text-more">>>詳細</a>
          <a @click="toggleCollapse" v-else class="reviews-content-text-more">{{'<<'}}一部を表示</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ArrowDown from "@/assets/svg/arrow-down.svg";
// import ArrowUp from "@/assets/svg/arrow-up.svg";
export default {
  props: {
    review: Object
  },
  watch: {},

  data() {
    return {
      readMore: false,
      liked: this.review.voted > 0,
      disliked: this.review.voted < 0,
      likeNumber: this.review.likes
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
          this.likeNumber = this.likeNumber + 2;
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
          this.likeNumber = this.likeNumber - 2;
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
  mounted: function() {}
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
