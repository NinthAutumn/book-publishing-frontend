<template>
  <div class="reviews">
    <div class="reviews-author">
      <img class="reviews-author-cover" src="http://placehold.jp/100x100.png" alt>
      <span class="reviews-author-username">{{review.userId.username}}</span>
    </div>
    <div class="reviews-rating"></div>
    <div class="reviews-content">
      <div class="reviews-content-title">{{review.title}}</div>
      <div class="reviews-content-text" :class="readMore">
        <p>{{review.content}}</p>
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
    <div class="reviews-like">
      <ArrowUp class="reviews-like-up"></ArrowUp>
      <p>{{review.like}}</p>
      <ArrowDown class="reviews-like-down"></ArrowDown>
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
  data() {
    return {
      readMore: "collapsed"
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
    }
  },
  created() {
    // console.log(this.review.content.length);
    if (this.review.content.length > 340) {
      this.readMore = "collapsed";
    } else {
      this.readMore = "open";
    }
  }
};
</script>

<style scoped lang="scss" >
.reviews {
  width: 100%;
  display: flex;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    line-height: 28px;
    // height: 150px;
    color: #444444;
    // justify-content: space-between;
    &-title {
      margin-bottom: 5px;
      // padding: 10px;
      font-size: 18px;
      margin-left: 10px;
      // font-weight: 500;
      // line-height: 28.8px;
      color: #444444;
      font-family: "メイリオ", "Meiryo", "Lucida Grande", "sans-serif";
    }
    .buts {
      text-align: right;
    }
    a {
      &:hover {
        cursor: pointer;
      }
    }
    .collapsed {
      color: #444444;
      // height: 150px;
      // padding: 10px;
      margin-left: 10px;
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

        // font-weight: 300;
      }
    }
    .open {
      margin-left: 10px;
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
    justify-content: center;
    p {
      text-align: center;
    }
    &-up {
      // : 20px;
      height: 50px;
      width: 20px;
      // viewbox: 0, 0, 60, 55;
      // height: auto;
      fill: red;
    }
    &-down {
      height: 50px;
      width: 20px;
    }
  }
}
</style>
