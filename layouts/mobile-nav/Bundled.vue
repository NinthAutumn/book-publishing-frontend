<template>
  <div class="bundled-mobile">
    <mobile-horizontal @toggle="toggleMenu"></mobile-horizontal>
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
    <transition name="grow-shrink">
      <notification-list
        @close="closeNotification"
        v-if="notification"
        v-click-outside="closeNotification"
      ></notification-list>
    </transition>
  </div>
</template>

<script>
import { hydrateWhenVisible } from "vue-lazy-hydration";
import { mapGetters } from "vuex";
export default {
  components: {
    VerticalRightMobile: () => import("./Vertical-right"),
    VerticalLeftMobile: () => import("./VerticalLeft"),
    StripeModal: hydrateWhenVisible(() =>
      import("@/components/Navigation/Stripe/ProductModal")
    ),
    MobileHorizontal: hydrateWhenVisible(() => import("./Horizontal")),
    NotificationList: hydrateWhenVisible(() =>
      import("@/components/Navigation/Notification")
    )
  },
  data() {
    return {
      notification: false,
      mvLeft: false,
      mvRight: false,
      stripe: false,
      notification: false
    };
  },
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
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
    swipeLeft() {
      this.mvLeft = false;
    },
    closeNotification() {
      this.notification = !this.notification;
    }
  }
};
</script>

<style lang="scss">
</style>
