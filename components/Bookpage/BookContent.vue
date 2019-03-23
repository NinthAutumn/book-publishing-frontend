<template>
  <div class="book-content">
    <div class="book-content__left flex flex-column divider">
      <div class="book-content--text">
        <transition name="slide-fade" mode="out-in">
          <div v-show="bookSynopsis" class="book-content--text__summary">
            <!-- <h4>あらすじ</h4> -->
            <p class="book-content--text__summary--text">{{book.synopsis}}</p>
          </div>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <div v-show="!bookSynopsis" class="book-content--text__statistics">
            <span class="book-content--text__statistics--title">作品の統計</span>
            <Statics></Statics>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Statics from "./Statistics";
export default {
  components: {
    Statics
  },
  props: {
    // book: Object
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    bookSynopsis() {
      return this.$store.state.book.bookSynopsis;
    },
    book() {
      return this.$store.state.book.book;
    }
  },
  methods: {},
  created() {
    this.text = this.bookmarkedText;
  }
};
</script>

<style lang="scss">
.hidden {
  display: none;
}
.book-author {
  // position: absolute;
  border-radius: 100px;
  width: 100px;
  box-shadow: 1px 1px 5px 0 rgb(177, 177, 177);
}
.book-content {
  width: 100%;

  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  &__buttons {
    // position: absolute;
    display: flex;
    // justify-content: ;
    align-items: center;
    justify-content: flex-end;

    // float: left;
    // right: 20px;
    // bottom: -5px;
    // z-index: 2000;
    &__item {
      // height: 25px;
      width: 140px;
      margin-left: 10px;
      &__icon {
        margin-right: 5px;
      }
    }
  }
  &__left {
    justify-content: space-between;
  }

  &--text {
    // padding: 5px 10px;s
    // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // width: 802.812px;
    height: 240px;
    overflow: hidden;
    flex-grow: 1;
    line-height: 30px;

    // text-overflow: ellipsis;
    // position: relative;
    /* line-clamp: 2; */
    // white-space: nowrap;
    &__summary {
      h4 {
        margin: 0;
        font-size: 16px;
      }
      &--text {
        // display: none;
        font-size: 16px;
        line-height: 30px;
        font-weight: 300;
        text-align: left;
      }
    }
    &__statistics {
      // display: none;
      // height: 250px;

      p {
        text-align: left !important;
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
      }

      &--title {
        font-size: 18px;
      }
    }
  }
}
</style>
