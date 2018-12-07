<template>
  <div class="horizontal">
    <nav>
      <div class="left-menu">
        <i class="el-icon-menu"></i>
      </div>
      <SearchBar class="searchbar"></SearchBar>
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
</style>
