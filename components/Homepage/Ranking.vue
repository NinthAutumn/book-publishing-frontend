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
          <div class="tab-ranking__book tab-ranking__book--first"></div>
          <div class="tab-ranking__book tab-ranking__book--second"></div>
          <div class="tab-ranking__book tab-ranking__book--third"></div>
        </div>
        <div class="tab-ranking__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
