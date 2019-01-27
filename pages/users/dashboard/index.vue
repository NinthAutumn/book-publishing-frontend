<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
      <div class="write-book button--shadow button button--primary--open">本を書く</div>
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
      <div class="create-books">
        <book-form></book-form>
      </div>
    </div>
  </div>
</template>

<script>
import BookForm from "@/components/Dashboard/CreateBook";

export default {
  layout: "user-nav/User",
  components: {
    BookForm
  }
};
</script>

<style lang="scss">
.create-books {
  // position: fixed;
  // top: 0;
  margin: auto;
  width: 30%;
  // top: 0;
  // right: 500px;
  z-index: 4000;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
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
