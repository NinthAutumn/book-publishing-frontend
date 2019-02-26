<template>
  <div class="reviews">
    <div class="reviews-like">
      <ArrowUp class="reviews-like-up" :class="{liked: liked}" @click="likedReview"></ArrowUp>
      <p v-text="likeNumber"></p>
      <ArrowDown class="reviews-like-down" :class="{disliked: disliked}" @click="dislikedReview"></ArrowDown>
    </div>

    <div class="reviews-rating"></div>
    <div class="reviews-content">
      <div class="reviews-content-title">{{reviewLikes.title}}</div>
      <div class="flex-row flex--between">
        <div class="reviews-total-rating">
          <span class="reviews-rating-total">総計:</span>
          <no-ssr>
            <star-rating
              name="rating"
              v-model="reviewLikes.rating.total"
              :star-size="20"
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
          <p class="reviews-content-username">投稿者：{{reviewLikes.author}}</p>
        </div>
      </div>

      <div class="reviews-content-text flex flex-column flex--between">
        <no-ssr>
          <truncate
            action-class="customClass"
            clamp="Show more"
            :length="90"
            less="Show Less"
            type="html"
            :text="review.content"
          ></truncate>
        </no-ssr>
        <!-- <div
          class="reviews-content-text--html"
          v-html="review.content"
          :class="{readmore: readMore}"
        ></div>-->
        <!-- <div v-if="this.review.content.length > 85" class="buts">
          <a @click="toggleCollapse" v-if="!readMore" class="reviews-content-text-more">Read More</a>
          <a @click="toggleCollapse" v-else class="reviews-content-text-more">Read Less</a>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDown from "@/assets/svg/arrow-down.svg";
import ArrowUp from "@/assets/svg/arrow-up.svg";
export default {
  props: {
    review: Object
  },
  watch: {
    // likedWatch() {
    //   if (this.liked) {
    //     this.$store.commit("review/LIKED_REVIEW", this.review._id);
    //   }
    // }
  },
  data() {
    return {
      readMore: false,
      liked: this.review.liked,
      disliked: this.review.disliked,
      likeNumber: this.review.like
    };
  },
  components: {
    ArrowDown,
    ArrowUp
  },
  methods: {
    toggleCollapse() {
      this.readMore = !this.readMore;
    },
    async likedReview() {
      if (this.liked) {
        this.liked = false;
        this.$store.dispatch("review/unLikeReview", {
          reviewId: this.review._id,
          type: "like"
        });
        this.likeNumber = this.likeNumber - 1;
      } else {
        this.liked = true;
        if (this.disliked) {
          this.disliked = false;

          await this.$store.dispatch("review/unLikeReview", {
            reviewId: this.review._id,
            type: "dislike"
          });
          this.likeNumber++;
        }
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review._id,
          type: "like"
        });
        this.likeNumber++;
        // this.review.like++;
      }
    },
    async dislikedReview() {
      if (this.disliked) {
        this.disliked = false;

        await this.$store.dispatch("review/unLikeReview", {
          reviewId: this.review._id,
          type: "dislike"
        });
        this.likeNumber++;
      } else {
        this.disliked = true;

        if (this.liked) {
          this.liked = false;
          await this.$store.dispatch("review/unLikeReview", {
            reviewId: this.review._id,
            type: "like"
          });
          this.likeNumber--;
        }
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review._id,
          type: "dislike"
        });
        this.likeNumber--;
      }
    }
  },
  computed: {
    reviewLikes() {
      return this.review;
    }
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 300) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  },
  created() {
    // console.log(this.review.content.length);
  }
};
</script>

<style  lang="scss" >
// @import "../../assets/css/main.scss";
.reviews-content-text {
  .customClass {
    display: flex;
    justify-content: center;
  }
  &--html {
    height: 140px;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    line-height: 28px;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    line-height: 28px;
    // font-weight: 300;
  }
  .readmore {
    height: 100% !important;
  }
  .buts {
    width: 100%;
    height: 20px;
    background-color: white;
  }
  .reviews-content-text-more {
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
    .reviews-rating-total {
      font-size: 16px;
      color: rgb(150, 123, 167);
    }
  }

  width: 100%;
  display: flex;
  // border: 2px solid #c1c9e4;
  // border-radius: 10px;
  // -webkit-box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  // -moz-box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  // box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // justify-content: space-around;
  // height: 200px;
  margin-bottom: 10px;
  padding: 10px 5px;
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
      font-family: "メイリオ", "Meiryo", "Lucida Grande", "sans-serif";
      font-size: 16px;
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
        font-size: 16px;
      }
    }
    &-username {
    }
    &-title {
      margin-bottom: 5px;
      // padding: 10px;
      font-size: 18px;
      // margin-left: 10px;
      // font-weight: 500;
      // line-height: 28.8px;
      font-family: "メイリオ", "Meiryo", "Lucida Grande", "sans-serif";
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
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
        text-align: left;
        overflow: hidden;
        height: 100% !important;

        // font-weight: 300;
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
        font-size: 16px;
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
