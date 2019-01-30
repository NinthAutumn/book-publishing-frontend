<template>
  <div>
    <Horizontal></Horizontal>
    <Vertical></Vertical>
    <div class="nuxt-pages">
      <div class="dropdown"></div>
      <nuxt :class="$store.state.menuState" class="permanent"></nuxt>
    </div>
  </div>
</template>
<script>
import Horizontal from "./main-nav/Horizontal";
import Vertical from "./main-nav/Vertical";
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
  watch: {},
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    }
  }
};
</script>


<style lang="scss">
// body {
//   background-color: white;
// }

.permanent {
}

.nuxt-pages .menu-active {
  margin-left: 240px;
  margin-top: 6.6rem;
  padding: 1rem 5rem;
  transition: 300ms;
  position: relative !important;
}
.nuxt-pages .menu-inactive {
  padding: 1rem 7rem;
  transition: 300ms;
  position: relative !important;
  margin-top: 6.6rem;
}

/* body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;
} */
</style>
