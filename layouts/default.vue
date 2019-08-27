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
          v-if="mvRight&&auth"
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
import { mapGetters } from "vuex";
import {
  hydrateWhenVisible,
  hydrateWhenIdle,
  hydrateOnInteraction
} from "vue-lazy-hydration";
export default {
  components: {
    Horizontal: hydrateWhenVisible(() => import("./main-nav/Horizontal")),
    VerticalRightMobile: hydrateWhenVisible(() =>
      import("./mobile-nav/Vertical-right")
    ),
    VerticalLeftMobile: hydrateWhenVisible(() =>
      import("./mobile-nav/VerticalLeft")
    ),
    MobileHorizontal: hydrateWhenVisible(() =>
      import("./mobile-nav/Horizontal")
    ),
    NewVertical: hydrateWhenVisible(() => import("./main-nav/NewVertical")),
    StripeModal: hydrateWhenVisible(() =>
      import("@/components/Navigation/Stripe/ProductModal")
    )
  },
  async mounted() {
    if (this.auth) {
      await this.$store.dispatch("subscription/fetchSubscription");
      if (this.subscription.payment_due) {
        alert("payment is due but it failed ");
      }
    }

    if (this.$device.isMobile) {
      document.addEventListener("touchstart", { passive: true });
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
      return this.$store.getters["auth/getUser"];
    },
    ...mapGetters({
      auth: "auth/isAuthenticated",
      subscription: "subscription/getSubscription"
    })
  },
  watch: {},
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    toggleMenu(val) {
      if (val) {
        if (!this.auth) {
          return this.$router.push("/auth/login");
        }
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
  padding-top: 5.2rem !important;
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
