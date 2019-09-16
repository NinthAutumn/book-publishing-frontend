<template>
  <div>
    <div v-if="$nuxt.isOffline">今オフラインです</div>
    <username-modal></username-modal>
    <reading-list-modal v-if="state"></reading-list-modal>
    <reading-modal v-if="readingModal"></reading-modal>
    <transition name="grow-shrink" class="loginform">
      <AuthModal v-if="loginState"></AuthModal>
    </transition>
    <transition name="grow-shrink" v-if="$device.isMobile">
      <notification-list
        @close="closeNotification"
        v-if="notification"
        v-click-outside="closeNotification"
      ></notification-list>
    </transition>
    <div class="user-status" v-if="auth">
      <div v-if="!user.verified">
        <transition>
          <div
            class="user-status__banner"
            :class="{'user-status__banner--mobile':$device.isMobile}"
          >
            <div class="user-status__text" v-text="`${user.email}　の　確認ができていません。`"></div>
            <div class="user-status__send" @click="resendHandler">確認メールを再送信する</div>
          </div>
        </transition>
      </div>
    </div>
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
      <client-only>
        <transition name="slide-left">
          <VerticalLeftMobile
            @stripe="stripeOpen"
            v-touch:swipe.right="swipeRight"
            v-if="mvRight&&auth"
            @toggle="toggleMenu"
            @notificationOpen="closeNotification"
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
      </client-only>
      <nuxt class="mobile-nuxt"></nuxt>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible, hydrateSsrOnly } from "vue-lazy-hydration";
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
    StripeModal: hydrateSsrOnly(() =>
      import("@/components/Navigation/Stripe/ProductModal")
    ),
    NotificationList: () => import("@/components/Navigation/Notification"),
    UsernameModal: () => import("@/components/Navigation/Username"),
    AuthModal: () => import("@/components/Navigation/Auth/AuthModal"),
    ReadingModal: () => import("@/components/Web/Modals/ReadingList/Create"),
    ReadingListModal: () => import("@/components/Web/Modals/ReadingList")
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
      notification: false,
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
    };
  },
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated",
      user: "auth/getUser",
      subscription: "subscription/getSubscription",
      loginState: "getLoginFormState",
      readingModal: "reading/getModalState",
      state: "reading/getListModalState"
    })
  },
  watch: {},
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    async resendHandler() {
      try {
        await this.$store.dispatch("auth/resendEmail", {
          email: this.user.email
        });
        return this.$toast.success("Eメールがまた送られました");
      } catch (error) {
        return this.$toast.error(error);
      }
    },
    toggleMenu(val) {
      if (val) {
        if (!this.auth) {
          return this.$store.commit("LOGIN_STATE");
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
      if (!this.stripe) return (this.mvRight = true);
      // if(stripe)
      this.mvRight = false;
      this.mvLeft = false;
    },
    swipeRight() {
      this.mvRight = false;
    },
    closeNotification() {
      this.notification = !this.notification;
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
.user-status {
  $self: &;
  &__banner {
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 3rem;
    position: fixed;
    background-color: rgb(255, 72, 72);
    z-index: 1000000;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    #{$self}__text {
      font-size: 1.4rem;
      color: white;
      margin-right: 1rem;
    }
    #{$self}__send {
      font-size: 1.3rem;
      color: white;
      background-color: $secondary;
      border-radius: 0.5rem;
      padding: 0.5rem 2rem;
      width: 20rem;
    }
    &--mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      #{$self}__text {
        margin: 0;
        font-size: 1rem;
      }
    }
  }
}
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
