<template>
  <div>
    <Horizontal></Horizontal>
    <Vertical></Vertical>
    <nuxt></nuxt>
  </div>
</template>
<script>
import Horizontal from "./Navbar/Horizontal";
import Vertical from "./Navbar/Vertical";

export default {
  components: {
    Horizontal,
    Vertical
  }
};
</script>

<style>
body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
}
</style>
