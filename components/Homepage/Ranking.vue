<template>
  <div class="tab-ranking">
    <div class="tab-ranking__wrapper">
      <div class="tab-ranking__container">
        <div class="tab-ranking__nav flex">
          <div class="tab-ranking__tab">今日</div>
          <div class="tab-ranking__tab">一週間</div>
          <div class="tab-ranking__tab">一ヶ月</div>
          <div class="tab-ranking__tab">一年</div>
        </div>
        <div class="tab-ranking__main flex">
          <div class="tab-ranking__first flex flex--align">
            <div class="tab-ranking__first__cover">
              <div class="tab-ranking__first__index flex flex--align flex--around">1</div>
              <img
                :src="`https://storage.googleapis.com/theta-images/${books[0]._id.book[0].cover}`"
                alt
              >
            </div>
            <div class="tab-ranking__first__info">
              <div class="tab-ranking__first__title" v-text="books[0]._id.book[0].title"></div>
              <div class="tab-ranking__first__synopsis" v-text="books[0]._id.book[0].synopsis"></div>
            </div>
          </div>
          <div class="flex-divider tab-ranking__divider">
            <div
              :class="{'tab-ranking__book--second': index === 1}"
              v-for="(book, index) in books"
              :key="index"
            >
              <div class="tab-ranking__item flex flex--align" v-if="index !== 0">
                <div
                  class="tab-ranking__index flex flex--align flex--around"
                  :class="{'tab-ranking__index--second': index === 1, 'tab-ranking__index--third': index === 2, 'tab-ranking__index--other':index >2}"
                  v-text="index + 1"
                ></div>
                <nuxt-link
                  class="tab-ranking__meta flex flex--align"
                  tag="div"
                  :to="`/books/${book._id.book[0]._id}`"
                >
                  <div class="tab-ranking__title flex flex--align" v-text="book._id.book[0].title"></div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-ranking__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    books() {
      return this.$store.state.ranking.home.total;
    }
  }
};
</script>

<style lang="scss">
.tab-ranking {
  margin-top: 10px;
  &__nav {
  }
  &__tab {
    font-size: 16px;
    padding: 10px;
    background-color: rgb(240, 240, 240);
    // background-image: linear-gradient(130deg, #a1c4fd, #c2e9fb);
  }

  &__cover {
    img {
      height: 118px;
      width: 80px;
    }
    // margin-top: 10px;
  }
  &__main {
    box-shadow: 1px 1px 5px 0px rgb(240, 240, 240);
  }
  &__item {
    box-shadow: 1px 1px 5px 0px rgb(238, 238, 238);
    // padding: 5px;
    height: 35px;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
  &__divider {
    padding: 10px;
    width: 100%;
  }
  &__meta {
    padding-left: 5px;
    // height: 118px;
    // overflow: hidden;
    background: linear-gradient(to right, rgb(248, 248, 248) 50%, white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 300ms ease;
    height: 100%;
    width: 100%;
    &:hover {
      cursor: pointer;
      // color: white;
      background-position: left bottom;
    }
    // margin-top: 10px;
  }
  &__index {
    width: 35px;
    height: 100%;
    font-size: 14px;
    font-weight: bold;
    // margin-right: 5px;
    &--second {
      background-color: $silver;
      opacity: 0.9;
    }
    &--third {
      background-color: $bronze;
      opacity: 0.9;
    }
    // background-color: black;
  }
  &__book {
    position: relative;
    // padding: 5px;
    // padding: 5px;

    // margin-bottom: 5px;
    // width: 100%;
    &--second {
      // margin-bottom: 5px;
    }
  }
  &__title {
    font-size: 14px;
  }
  &__synopsis {
    font-size: 12px;
  }
  &__first {
    width: 100%;
    // margin-top: 10px;
    position: relative;
    padding: 10px;
    // overflow: hidden;
    &__index {
      position: absolute;
      height: 32px;
      width: 32px;
      background-color: $gold;
      top: 15px;
      left: -5px;
      opacity: 0.9;
      font-size: 16px;
      font-weight: bold;
    }
    &__cover {
      margin-right: 10px;

      img {
        height: 243px;
        width: 165px;
        // border-radius: 10px;
        &:hover {
          // transform: rotateZ(10deg) rotateY(30deg);
          // transform: rotate3d(90deg, 0deg, 180deg);
        }
      }
    }
    &__info {
      // width: 300px;
      width: 100%;
      height: 243px;
      overflow: hidden;
    }
    &__title {
      font-size: 18px;
    }
    &__synopsis {
      font-size: 16px;
      overflow: hidden;
      height: 100%;
    }
  }
}
// .tab-ranking__
</style>
