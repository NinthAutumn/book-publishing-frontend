<template>
  <div>
    <Horizontal></Horizontal>
    <Vertical :menus="$store.state.auth.menus"></Vertical>
    <div class="nuxt-pages">
      <nuxt :class="$store.state.menuState"></nuxt>
    </div>
  </div>
</template>
<script>
import Horizontal from "./Navbar/Horizontal";
import Vertical from "./Navbar/Vertical";
// import "~/assets/css/typography.css";

export default {
  components: {
    Horizontal,
    Vertical
  },
  data() {
    return {};
  },
  computed: {},
  watch: {}
};
</script>


<style scoped>
.nuxt-pages .menu-active {
  margin-left: 24rem;
  margin-top: 5rem;
  padding: 1rem 5rem;
  transition: 300ms;
}
.nuxt-pages .menu-inactive {
  padding: 6rem 3rem;
  transition: 300ms;
}

/* body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;
} */
</style>
