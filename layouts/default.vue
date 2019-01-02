<template>
  <div>
    <Horizontal></Horizontal>
    <Vertical :menus="$store.state.auth.menus"></Vertical>
    <div class="nuxt-pages">
      <div class="dropdown" :class="$store.state.dropdownState"></div>
      <nuxt :class="$store.state.menuState" class="permanent"></nuxt>
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


<style lang="scss" scoped>
.permanent {
}

.nuxt-pages .menu-active {
  margin-left: 24rem;
  margin-top: 5rem;
  padding: 1rem 5rem;
  transition: 300ms;
  position: relative !important;
}
.nuxt-pages .menu-inactive {
  padding: 1rem 5rem;
  transition: 300ms;
  position: relative !important;
  margin-top: 5rem;
}
.dropdown-inactive {
  // display: none;
  height: 0;
  // width: 0;
}
.dropdown-active {
  position: absolute;
  width: 300px;
  height: 500px;
  background-color: #c8b0f5;
  right: 5px;
  z-index: 2200;
  // top: 55px;
  transition: 300ms;
  -webkit-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  border-radius: 10px;
}

/* body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;
} */
</style>
