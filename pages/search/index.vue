<template>
  <div id="search">{{$route.query.query}}</div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {};
  },
  methods: {},
  auth: false
};
</script>
<style>
#search {
  margin-left: 24rem;
  margin-top: 50rem;
  padding: 10rem;
}
</style>
