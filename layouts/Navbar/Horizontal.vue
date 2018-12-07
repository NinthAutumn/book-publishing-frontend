<template>
  <div class="horizontal">
    <nav>
      <div class="left-menu">
        <i class="el-icon-menu"></i>
      </div>
      <SearchBar class="searchbar"></SearchBar>
      <img src="http://placehold.jp/40x40.png" style="border-radius:100px;  margin-right: 10px;">
    </nav>
  </div>
</template>
<script>
import SearchBar from "./../../components/SearchBar";
export default {
  name: "Horizontal",
  components: {
    SearchBar
  }
};
</script>
<style scoped>
nav {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
  -moz-box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
  box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-icon-menu {
  font-size: 32px;
  color: #c9b1f5;
}
.searchbar {
}

.left-menu {
  margin-left: 10px;
}
</style>
