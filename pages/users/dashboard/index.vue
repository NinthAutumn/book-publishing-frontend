<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <div class="user-analytics">
      <table class="analytics-overview">
        <tr>
          <th>現在の視聴回数</th>
          <th>現在のブックマーク数</th>
          <th>現在のコメント数</th>
        </tr>
        <tr>
          <td>99</td>
          <td>10</td>
          <td>232</td>
        </tr>
      </table>
      <div class="card"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  components: {}
};
</script>

<style lang="scss">
.user-dashboard {
  position: relative;
  /* background-color: grey; */
  &__header {
    header {
      font-size: 30px;
    }
    .write-book {
      height: 45px;
      width: 150px;
      font-size: 16px;
    }
  }
  .analytics-overview {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    th {
      font-size: 20px;
    }
    td {
      // display: flex;
      // justify-content: center;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
