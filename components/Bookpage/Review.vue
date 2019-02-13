<template>
  <div class="reviews">
    <div class="reviews-like">
      <ArrowUp class="reviews-like-up" :class="liked" @click="likedReview"></ArrowUp>
      <p>{{reviewLikes.like}}</p>
      <ArrowDown class="reviews-like-down" :class="disliked" @click="dislikedReview"></ArrowDown>
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

      <div class="reviews-content-text" :class="readMore">
        <div v-html="review.content"></div>
        <div v-if="this.review.content.length > 340" class="buts">
          <a
            @click="toggleCollapse"
            v-if="readMore  === 'collapsed'"
            class="reviews-content-text-more"
          >Read More</a>
          <a
            @click="toggleCollapse"
            v-if="readMore  === 'open'"
            class="reviews-content-text-more"
          >Read Less</a>
        </div>
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
      readMore: "collapsed",
      liked: "",
      disliked: ""
    };
  },
  components: {
    ArrowDown,
    ArrowUp
  },
  methods: {
    toggleCollapse() {
      if (this.readMore === "collapsed") {
        this.readMore = "open";
      } else {
        this.readMore = "collapsed";
      }
    },
    likedReview() {
      if (this.liked) {
        this.liked = "";
        this.$store.dispatch("review/unLikeReview", this.review._id);
      } else {
        this.liked = "liked";
        this.disliked = "";
        this.$store.dispatch("review/likeReview", this.review._id);
        // this.review.like++;
      }
    },
    dislikedReview() {
      if (this.disliked) {
        this.disliked = "";
      } else {
        this.liked = "";
        this.disliked = "disliked";
      }
    }
  },
  computed: {
    reviewLikes() {
      return this.review;
    }
  },
  created() {
    console.log(this.review.content.length);
    if (this.review.content.length > 340) {
      this.readMore = "collapsed";
    } else {
      this.readMore = "open";
    }
    if (this.$store.state.auth.loggedIn) {
      if (this.review.liked) {
        this.liked = "liked";
      }
    }
  }
};
</script>

<style  lang="scss" >
// @import "../../assets/css/main.scss";
.reviews {
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
  border: 2px solid #c1c9e4;
  // border-radius: 10px;
  -webkit-box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  -moz-box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  box-shadow: 0px 4px 4px rgba(139, 139, 139, 0.25);
  // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // justify-content: space-around;
  // height: 200px;
  margin-bottom: 10px;
  padding: 10px 5px;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    // height: 150px;
    color: #444444;
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
      color: #444444;
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
      color: #444444;
      // height: 150px;
      // padding: 10px;
      // margin-left: 10px;
      // height: 100%;
      p {
        white-space: pre-wrap;
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
        color: #2e2635;
        text-align: left;
        overflow: hidden;
        height: 132px;
        line-height: 28px;
        // font-weight: 300;
      }
    }
    .open {
      // margin-left: 10px;
      p {
        white-space: pre-wrap;
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
        color: #2e2635;
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
