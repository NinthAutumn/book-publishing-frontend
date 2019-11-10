<template>
  <div :class="`theme-${theme}`">
    <div class="chapter-page" :class="{'chapter-page--mobile':$device.isMobile}">
      <div v-if="auth">
        <component :is="verifyComponent" :user="user" />
      </div>
      <component :is="mobileHorizontalNav" />
      <component :is="rightVerticalComponent" />
      <div class="chapter" :class="{'move-left': modal}">
        <div
          class="chapter-wrapper"
          :class="{'flex-row':!$device.isMobile, 'flex-column':$device.isMobile}"
        >
          <component
            :icon="$device.isMobile?'angle-up':'angle-left'"
            theme="prev"
            :data="prev"
            :is="navComponent"
            v-if="prev"
          />
          <nuxt></nuxt>
          <component
            :icon="$device.isMobile?'angle-down':'angle-right'"
            theme="next"
            :data="next"
            :is="navComponent"
            v-if="next"
          />
        </div>
      </div>
      <transition name="grow-shrink">
        <component :is="settingForm" />
      </transition>
      <component :is="showImageModal" />
      <transition name="grow-shrink">
        <AuthModal v-if="loginState"></AuthModal>
      </transition>
    </div>
  </div>
</template>

<script>
import { hydrateWhenVisible } from "vue-lazy-hydration";
import { mapGetters } from "vuex";

export default {
  components: {
    NavComponent: () => import("@/components/Web/Layout/Nav/Navigation"),
    AuthModal: hydrateWhenVisible(() =>
      import("@/components/Navigation/Auth/AuthModal")
    )
  },
  computed: {
    ...mapGetters({
      next: "chapter/getNextChapter",
      prev: "chapter/getPrevChapter",
      dialog: "getSettingModal",
      theme: "user/getTheme",
      modal: "chapter/getModalState",
      imageModal: "getImageModalState",
      auth: "auth/isAuthenticated",
      user: "auth/getUser"
    }),
    loginState() {
      return this.$store.state.loginForm;
    },
    navComponent() {
      if (this.$device.isMobile)
        return () => import("@/components/Mobile/Layout/Nav/ChapterNav");
      return () => import("@/components/Web/Layout/Nav/Navigation");
    },
    mobileHorizontalNav() {
      const name = this.$device.isMobile ? "MobileHorizontal" : "Horizontal";
      return () => import(`./${name}`);
    },
    verifyComponent() {
      if (!this.user.verified)
        return () => import("@/components/Web/Modals/Auth/Verify");
      return;
    },
    showImageModal() {
      if (this.imageModal)
        return () => import("@/components/Web/Modals/Image/ShowImage");
      return;
    },
    settingForm() {
      if (this.dialog) return () => import("@/components/Navigation/Setting");
      return;
    },
    rightVerticalComponent() {
      if (this.$device.isMobile) return;
      return () => import("./Right-V");
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
  },
  async mounted() {
    if (this.auth) {
      await this.$store.dispatch("subscription/fetchSubscription");
    }
  }
};
</script>

<style lang="scss">
.move-left {
  transform: translateX(-210px);
  transition: 200ms;
}
@media screen and (max-width: 856px) {
  .next-chapter-title {
    display: none;
  }
  .prev-chapter-title {
    display: none;
  }
}

@media only screen and (max-width: 1304px) {
  .move-left {
    transform: translateX(0);
  }
  .chapters-modal {
    right: 50px;
  }
}
@keyframes moveMe {
  from {
    transform: translateY(-0.2rem);
  }
  to {
    transform: translateY(0.2rem);
  }
}
.chapter-page {
  // padding: 1rem 0rem;
  transition: 300ms;
  min-height: 100vh;
  @include themify($themes) {
    background: themed("backgroundColor");
  }
  // position: relative !important;
  margin-top: 50px;
  margin-right: 50px;
  position: relative;
  &--mobile {
    margin-top: 4rem;
    margin-right: 0;
  }
  .mobile-navigation--placeholder {
    width: 50%;
  }
  .mobile-navigation {
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding: 1.5rem 1.5rem;
    width: 50%;
    span {
      font-size: 1.5rem;
    }
    &__icon {
      font-size: 2rem !important;
    }
    &--next {
      justify-content: flex-end;
      span {
        margin-right: 1rem;
      }
    }
    &--prev {
      justify-content: flex-start;
      span {
        margin-left: 1rem;
      }
    }
  }
}
</style>
