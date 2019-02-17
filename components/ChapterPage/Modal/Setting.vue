<template>
  <div class="setting-modal">
    <header>設定</header>
    <ul>
      <li>
        <h4 v-text="'テーマ'"></h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.setting-modal {
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
</style>
