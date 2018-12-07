<template>
  <div class="horizontal">
    <nav>
      <div class="left-menu"></div>
      <SearchBar></SearchBar>
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
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
