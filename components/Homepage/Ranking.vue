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
          <div class="tab-ranking__first flex">
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
          <div class="flex-divider tab-ranking__divider flex flex-column flex--align flex--center">
            <div class="tab-ranking__book" v-for="(book, index) in books" :key="index">
              <div class="tab-ranking__item" v-if="index === 0"></div>
              <div class="tab-ranking__item flex flex--align" v-else>
                <div
                  class="tab-ranking__index flex flex--align flex--around"
                  :class="{'tab-ranking__index--second': index === 1,'tab-ranking__index--third':index===2}"
                  v-text="index + 1"
                ></div>
                <div class="tab-ranking__cover">
                  <img
                    :src="`https://storage.googleapis.com/theta-images/${book._id.book[0].cover}`"
                  >
                </div>
                <div class="tab-ranking__meta flex flex-column">
                  <div class="tab-ranking__title" v-text="book._id.book[0].title"></div>
                  <div class="tab-ranking__synopsis" v-text="book._id.book[0].synopsis"></div>
                </div>
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
    margin-top: 10px;
  }
  &__divider {
    padding: 10px;
  }
  &__meta {
    height: 118px;
    margin-top: 10px;
  }
  &__index {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 3px;
    left: -5px;
    font-size: 12px;
    opacity: 0.9;
    font-weight: bold;
    &--second {
      background-color: $silver;
    }
    &--third {
      background-color: $bronze;
    }
    // background-color: black;
  }
  &__book {
    position: relative;
  }
  &__first {
    margin-top: 10px;
    position: relative;
    padding: 10px;

    &__index {
      position: absolute;
      height: 32px;
      width: 32px;
      background-color: $gold;
      top: -2px;
      left: 0px;
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
      width: 300px;
    }
    &__title {
      font-size: 18px;
    }
    &__synopsis {
      font-size: 16px;
    }
  }
}
// .tab-ranking__
</style>
