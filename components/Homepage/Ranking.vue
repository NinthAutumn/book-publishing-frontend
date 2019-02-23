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
        <div class="tab-ranking__main">
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
          <div
            class="tab-ranking__book"
            v-for="(book, index) in books"
            :key="index"
            :class="{'tab-ranking__book--second': index === 1,'tab-ranking__book--third':index===2}"
          >
            <div class="tab-ranking__item" v-if="index === 0"></div>
            <div class="tab-ranking__item" v-else>
              <div class="tab-ranking__cover"></div>
              <div class="tab-ranking__meta">
                <div class="tab-ranking__title"></div>
                <div class="tab-ranking__synopsis"></div>
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
    font-size: 18px;
    padding: 10px;
    background-color: rgb(240, 240, 240);
    // background-image: linear-gradient(130deg, #a1c4fd, #c2e9fb);
  }
  &__first {
    margin-top: 10px;
    position: relative;
    padding: 10px;

    &__index {
      position: absolute;
      height: 35px;
      width: 35px;
      background-color: $gold;
      top: -4px;
      left: -4px;
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
      font-size: 17px;
    }
    &__synopsis {
      font-size: 16px;
    }
  }
}
// .tab-ranking__
</style>
