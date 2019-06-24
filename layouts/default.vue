<template>
  <div>
    <div v-if="$nuxt.isOffline">今オフラインです</div>
    <div class="not-mobile" v-if="!$device.isMobile">
      <Horizontal></Horizontal>
      <!-- <Vertical></Vertical> -->
      <NewVertical v-if="$store.state.menuState=== 'menu-active'"></NewVertical>
      <div class="nuxt-pages">
        <div class="dropdown"></div>
        <nuxt :class="$store.state.menuState" class="permanent"></nuxt>
      </div>
    </div>
    <div class="is-mobile" v-else>
      <mobile-horizontal @toggle="toggleMenu"></mobile-horizontal>
      <transition name="slide-left">
        <VerticalLeftMobile
          @stripe="stripeOpen"
          v-touch:swipe.right="swipeRight"
          v-if="mvRight"
          @toggle="toggleMenu"
        ></VerticalLeftMobile>
      </transition>
      <transition name="slide-right">
        <VerticalRightMobile
          :user="user"
          v-if="mvLeft"
          @toggle="toggleMenu"
          v-touch:swipe.left="swipeLeft"
        ></VerticalRightMobile>
      </transition>
      <transition name="slide-up">
        <stripe-modal @stripe="stripeOpen" v-if="stripe"></stripe-modal>
      </transition>
      <nuxt class="mobile-nuxt"></nuxt>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Horizontal: () => import("./main-nav/Horizontal"),
    Vertical: () => import("./main-nav/Vertical"),
    VerticalRightMobile: () => import("./mobile-nav/Vertical-right"),
    VerticalLeftMobile: () => import("./mobile-nav/VerticalLeft"),
    MobileHorizontal: () => import("./mobile-nav/Horizontal"),
    NewVertical: () => import("./main-nav/NewVertical"),
    StripeModal: () => import("@/components/Navigation/Stripe/ProductModal")
  },
  mounted() {
    if (this.$device.isMobile) {
      document.addEventListener("touchstart", { passive: true });
    }
    if (this.$route.query.token) {
      this.$axios
        .patch("/auth/verify", { token: this.$route.query.token })
        .then(async res => {
          if (res.data.found) {
            this.$storage.setUniversal("access_token", res.data.access_token);
            this.$storage.setUniversal("refresh_token", res.data.refresh_token);
            this.$storage.setUniversal("strategy", "local");
            this.$axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.access_token;
            this.$store.commit("auth/SET_AUTH", {
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
              strategy: "local"
            });

            this.$store.dispatch("user/fetchUser").then(val => {
              this.$toast.show(
                "アカウント確認に成功しました、サイトがリフレッシュされます",
                {
                  theme: "toasted-primary",
                  duration: 2000,
                  position: "top-right",
                  icon: "check_circle"
                }
              );
              this.$router.push({ path: "/", query: {} });
              // this.$router.go(0);
            });
          } else {
            this.$toast.show("アカウント確認に失敗しました", {
              theme: "toasted-primary",
              duration: 5000,
              position: "top-right",
              icon: "extension"
            });
          }
        });
    }
  },
  data() {
    return {
      mvLeft: false,
      mvRight: false,
      stripe: false,
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
    toggleMenu(val) {
      console.log(val);
      if (val) {
        this.mvRight = !this.mvRight;
        this.mvLeft = false;
      } else {
        this.mvLeft = !this.mvLeft;
        this.mvRight = false;
      }
    },
    stripeOpen() {
      this.stripe = !this.stripe;
      // if(stripe)
      this.mvRight = false;
      this.mvLeft = false;
    },
    swipeRight() {
      this.mvRight = false;
    },

    swipeLeft() {
      this.mvLeft = false;
    }
  },
  transition: {
    name: "slide-right",
    mode: "out-in"
  }
};
</script>


<style lang="scss">
.slide-left {
  @keyframes slide-down {
    from {
      transform: translateX(50%);
    }

    to {
      transform: translateX(0);
    }
  }

  &-enter {
    transform: translateX(50%);

    &-active {
      transition: 300ms;
    }
  }

  &-leave {
    // transform: translateX(50%);

    &-active {
      transition: 300ms;
    }

    &-to {
      transform: translateX(100%);
    }
  }
}
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
  padding-top: 5.5rem !important;
}
.permanent {
  min-height: 100vh;
}

.nuxt-pages .menu-active {
  margin-left: 22rem;
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
