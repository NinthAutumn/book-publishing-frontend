<template>
  <div>
    <div v-if="$nuxt.isOffline" class="offline-message">今オフラインです</div>
    <username-modal></username-modal>
    <reading-list-modal v-if="state"></reading-list-modal>
    <reading-modal v-if="readingModal"></reading-modal>
    <transition name="grow-shrink" class="loginform">
      <AuthModal v-if="loginState"></AuthModal>
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
    <component :is="navInstance" />
    <nuxt v-if="$device.isMobile" class="mobile-nuxt"></nuxt>

    <div class="nuxt-pages" v-else>
      <nuxt :class="$store.state.menuState" class="permanent"></nuxt>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";
export default {
  components: {
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
      if (!this.user.username) {
        this.$store.commit("auth/TOGGLE_USERNAME_MODAL");
      }
    }
  },
  data() {
    return {
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
    }),
    navInstance() {
      const name = this.$device.isMobile
        ? "mobile-nav/Bundled"
        : "main-nav/Bundled";
      return () => import(`./${name}`);
    }
  },
  methods: {
    async resendHandler() {
      try {
        await this.$store.dispatch("auth/resendEmail", {
          email: this.user.email
        });
        return this.$toast.success("Eメールがまた送られました");
      } catch (error) {
        return this.$toast.error(error);
      }
    }
  }
};
</script>


<style lang="scss">
.offline-left {
  position: fixed;
  top: 0rem;
  width: 100%;
  height: 2rem;
  background-color: grey;
  color: white;
  font-size: 1.8rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
}

.beta-pill {
  z-index: 100000;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: $secondary;
  color: white;
  border-radius: 10rem;
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
}
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
  margin-left:220px;
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

  .v-nav {
    /* display: none; */
    z-index: 10000 !important;

    box-shadow: 1px 1px 5px 0px rgb(235, 235, 235) !important;
  }
}
</style>
