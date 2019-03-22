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
  mounted() {
    document.addEventListener("touchstart", { passive: true });
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

// .permanent {
//   background-color: black;
//   color: rgb(215, 218, 220);
//   .review-card {
//     background-color: #1a1a1b;
//   }
// }

.nuxt-pages .menu-active {
  margin-left: 240px;
  margin-top: 50px;
  padding: 10px 50px;
  position: relative !important;
}
.nuxt-pages .menu-inactive {
  padding: 10px 60px;
  position: relative !important;
  margin-top: 50px;
}

/* body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;
} */
</style>
