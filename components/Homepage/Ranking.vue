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
        <div class="tab-ranking__main" v-for="(book, index) in books" :key="index">
          <div
            class="tab-ranking__book"
            :class="{'tab-ranking__book--first': index === 0,'tab-ranking__book--second': index === 1,'tab-ranking__book--third':index===2}"
          >
            <div class="tab-ranking__item" v-if="index === 0">
              <div class="tab-ranking__item__cover"></div>
              <div class="tab-ranking__item__info">
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

  &__tab {
    font-size: 18px;
    padding: 10px;
    background-color: rgb(240, 240, 240);
  }
}
// .tab-ranking__
</style>
