<template>
  <div>
    <div class="not-mobile" v-if="!$device.isMobile">
      <Horizontal></Horizontal>
      <Vertical></Vertical>
      <div class="nuxt-pages">
        <div class="dropdown"></div>
        <nuxt :class="$store.state.menuState" class="permanent"></nuxt>
      </div>
    </div>
    <div class="is-mobile" v-else>
      <transition name="slide-right">
        <VerticalRightMobile v-touch:swipe.left="swipeLeft" v-if="mvLeft"></VerticalRightMobile>
      </transition>
      <nuxt class="mobile-nuxt" v-touch:swipe.right="swipeRight"></nuxt>
    </div>
  </div>
</template>
<script>
import Horizontal from "./main-nav/Horizontal";
import Vertical from "./main-nav/Vertical";
import VerticalRightMobile from "./mobile-nav/Vertical-right";
// import "~/assets/css/typography.css";

export default {
  components: {
    Horizontal,
    Vertical,
    VerticalRightMobile
  },
  mounted() {
    document.addEventListener("touchstart", { passive: true });
  },
  data() {
    return {
      mvLeft: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    swipeRight() {
      this.mvLeft = true;
    },
    swipeLeft() {
      this.mvLeft = false;
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
.mobile-nuxt {
  padding: 10px;
}

.nuxt-pages .menu-active {
  margin-left: 240px;
  margin-top: 50px;
  padding: 10px 50px;
  position: relative;
}
.nuxt-pages .menu-inactive {
  padding: 10px 60px;
  position: relative;
  margin-top: 50px;
}
@media screen and (max-width: 1136px) {
  .nuxt-pages .menu-active {
    padding: 10px 50px !important;
    /* transition: 300ms !important; */
    /* position: relative !important; */
    margin: 10px 50px !important;
    transition: 300ms;
    position: relative !important;
  }
  .nuxt-pages .menu-inactive {
    margin: 10px 50px !important;
    padding: 10px 50px !important;
  }
  .v-nav {
    position: absolute !important;
    /* display: none; */
    z-index: 10000 !important;
    -webkit-box-shadow: inset 0px 0px 0px 0px rgba(122, 122, 122, 1) !important;
    -moz-box-shadow: inset 0px 0px 0px 0px rgba(122, 122, 122, 1) !important;
    box-shadow: inset 0px 0px 0px 0px rgba(122, 122, 122, 1) !important;
    -webkit-box-shadow: 1px 1px 13px 0px rgba(145, 145, 145, 1) !important;
    -moz-box-shadow: 1px 1px 13px 0px rgba(145, 145, 145, 1) !important;
    box-shadow: 1px 1px 13px 0px rgba(145, 145, 145, 1) !important;
  }
}
/* body {
  margin: 0;
}
* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;
} */
</style>
