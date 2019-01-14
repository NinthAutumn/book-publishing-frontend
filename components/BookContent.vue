<template>
  <div class="book-content">
    <div class="book-content--nav">
      <ul class="book-content--nav__list">
        <li class="book-content--nav__list__item--synopsis" :class="bookSynopsis">
          <span @click="bookSynopsis = true">要約</span>
        </li>
        <li class="book-content--nav__list__item--table">
          <span @click="bookSynopsis = false">情報</span>
        </li>
      </ul>
    </div>
    <div class="book-content--text">
      <div v-if="bookSynopsis" class="book-content--text__summary">
        <span class="book-content--text__summary--text">{{$store.state.book.book.synopsis}}</span>
      </div>
      <div v-else class="book-content--text__statistics">
        <span class="book-content--text__statistics--title">視聴者</span>
        <p>探なゃたむ間国民ラれい母細すょ立聞ルフる娯洋ヒラタ念今どざご務軒ス了近っ引質景メ投戦モヲサウ介無著もむかよ及客レア成完撃平侑べずへ。覚ヒセ昨果オイワ堂器わぐ下載スオヘ要敦ぜ育与レヌオア禁福ノホトタ上89強総シオ法木辛ドょぴぽ転期省べぶ。39仏げく代勤べみす健映拭暮42妨ぼる極東レこ向田ロウ呉増ア就主アテ品77浜負件中6人げけへや級権ご人首じ文塚モラセヱ書納動と遅乗にぎょ。</p>
      </div>
    </div>
    <div class="book-content--buttons">
      <button>Subscribe</button>
      <button>Bookmark</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  data() {
    return {
      bookSynopsis: true
    };
  }
};
</script>

<style lang="scss">
.book-content {
  width: 100%;
  -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
  box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  &--buttons {
    position: absolute;
    display: flex;
    right: 20px;
    bottom: -5px;
    // z-index: 2000;
    button {
      height: 25px;
    }
  }
  &--nav {
    &__list {
      display: flex;
      width: 185px;
      height: 40px;
      align-items: center;
      justify-content: space-around;
      -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
      -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
      box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
      position: relative;
      &::after {
        position: absolute;
        content: "";
        right: 52%;
        height: 25px;
        width: 1px;
        background: rgb(233, 218, 233);
      }
      &__item--synopsis {
        // border-right: 1px solid rgb(233, 218, 233);
        // padding: 12px;
        box-sizing: border-box;
        // border-right-height: 33%;
        position: relative;

        // height: 100%;
        // height: 50px;
        // width: 100%;
        // text-align: center;
        // display: flex;
        // align-content: center;
        span {
          font-size: 18px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      &__item--table {
        padding: 12px;
        box-sizing: border-box;
        // flex-grow: 1;
        // height: 100%;
        // height: 50px;
        // width: 100%;
        // text-align: center;
        // display: flex;
        // align-content: center;
        span {
          &:hover {
            cursor: pointer;
          }
          font-size: 18px;
        }
      }
    }
  }
  &--text {
    padding: 5px 10px;
    -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // width: 802.812px;
    height: 280px;
    overflow: hidden;
    // text-overflow: ellipsis;
    // position: relative;
    /* line-clamp: 2; */
    // white-space: nowrap;
    &__summary {
      &--text {
        // display: none;
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
        color: rgb(46, 38, 53);
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
        color: rgb(46, 38, 53);
      }

      &--title {
        font-size: 18px;
      }
    }
  }
}
</style>
