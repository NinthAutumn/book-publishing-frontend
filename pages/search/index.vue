<template>
  <div id="search">{{$route.query.query}}</div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
#search {
  margin-left: 240px;
  margin-top: 50px;
  padding: 10px;
}
</style>
