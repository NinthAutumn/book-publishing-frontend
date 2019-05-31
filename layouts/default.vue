<template>
  <div>
    <div v-if="$nuxt.isOffline">今オフラインです</div>
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
        <VerticalRightMobile :user="user" v-touch:swipe.left="swipeLeft" v-if="mvLeft"></VerticalRightMobile>
      </transition>
      <nuxt class="mobile-nuxt" v-touch:swipe.right="swipeRight"></nuxt>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Horizontal: () => import("./main-nav/Horizontal"),
    Vertical: () => import("./main-nav/Vertical"),
    VerticalRightMobile: () => import("./mobile-nav/Vertical-right")
  },
  mounted() {
    document.addEventListener("touchstart", { passive: true });
  },
  data() {
    return {
      mvLeft: false,
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/loggedInUser"];
    }
  },
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
  // padding: 10px;
}

.nuxt-pages .menu-active {
  margin-left: 240px;
  margin-top: 50px;
  // padding: 10px 50px;
  position: relative;
}
.nuxt-pages .menu-inactive {
  // padding: 10px 60px;
  position: relative;
  margin-top: 50px;
}
@media screen and (max-width: 1136px) {
  .nuxt-pages .menu-active {
    /* transition: 300ms !important; */
    /* position: relative !important; */
    margin-left: 0;
    margin-top: 5rem;
    transition: 300ms;
    position: relative !important;
  }
  .nuxt-pages .menu-inactive {
    // margin: 10px 50px !important;
  }
  .v-nav {
    /* display: none; */
    z-index: 10000 !important;

    box-shadow: 1px 1px 5px 0px rgb(235, 235, 235) !important;
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
