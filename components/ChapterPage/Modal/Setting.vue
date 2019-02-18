<template>
  <div id="setting-modal">
    <header>設定</header>
    <div class="theme-main">
      <h4 v-text="'テーマ'"></h4>
      <div class="themes-list flex">
        <div class="theme__item theme__item--white"></div>
        <div class="theme__item theme__item--black"></div>
        <!-- <div class="theme__item"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#setting-modal {
  top: 50px;
  position: sticky;
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  /* height: 100vh; */
  header {
    font-size: 25px;
    text-align: center;
    // margin-top: 10px;
  }
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
}

.theme-main {
  .themes-list {
    .theme__item {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      position: relative;
      margin-right: 10px;
      box-shadow: 1px 1px 5px 0 rgb(212, 212, 212);
      &--white {
        background-color: #fff;
        border: 1px solid #dae0e6;
      }
      &--black {
        background-color: rgb(53, 53, 53);
        border: 1px solid black;
      }
    }
  }
}
</style>
