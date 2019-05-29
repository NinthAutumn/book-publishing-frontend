<template>
  <div
    class="chapter-page"
    :class="{'chapter-page--black': theme === 'black','chapter-page--default': theme === 'default','chapter-page--ruby': theme === 'ruby','chapter-page--tan': theme === 'tan','chapter-page--sapphire': theme === 'sapphire'}"
  >
    <Horizontal></Horizontal>
    <LeftV></LeftV>
    <RightV></RightV>
    <div v-if="imageModal" class="images-modal__dialog flex flex--align flex--center">
      <div class="images-modal__dialog__container" v-click-outside="closeImageDialog">
        <div class="images-modal__dialog__close">
          <fa class="images-modal__dialog__close__icon" icon="times" @click="closeImageDialog"></fa>
        </div>
        <div class="images-modal__dialog__content flex flex--align flex--center">
          <img :src="$store.state.imageUrl" alt>
        </div>
      </div>
    </div>
    <div class="chapter" :class="{'move-left': modal}">
      <div
        class="chapter-wrapper"
        :class="{'flex-row':!$device.isMobile, 'flex-column':$device.isMobile}"
      >
        <div class="flex-divider flex-row flex--align flex--between" v-if="$device.isMobile">
          <nuxt-link
            class="mobile-navigation mobile-navigation--prev"
            v-if="prev"
            :to="{path: `${prev.id}`}"
          >
            <span class="mobile-navigation__icon">
              <fa icon="angle-left"></fa>
            </span>
            <span>前の話へ</span>
          </nuxt-link>
          <span class="mobile-navigation--placeholder" v-if="!prev"></span>
          <span class="mobile-navigation--placeholder" v-if="!next"></span>
          <nuxt-link
            class="mobile-navigation mobile-navigation--next"
            v-if="next"
            :to="{path: `${next.id}`}"
          >
            <span>次の話へ</span>
            <span class="mobile-navigation__icon">
              <fa icon="angle-right"></fa>
            </span>
          </nuxt-link>
        </div>
        <!-- <adsbygoogle v-if="!$device.isMobile"/> -->
        <div
          v-if="prev&&!$device.isMobile"
          class="next-chapter-title flex-column flex--center flex--align"
          v-text="prev.title"
        ></div>

        <nuxt-link
          class="navigation-prev flex-column flex--center flex--align"
          v-if="prev&&!$device.isMobile"
          :to="{path: `${prev.id}`}"
        >
          <fa icon="angle-left"></fa>
        </nuxt-link>
        <div class="navigation-prev-cont" v-if="!prev&&!$device.isMobile"></div>
        <nuxt class="yikes"></nuxt>
        <div class="navigation-prev-cont" v-if="!next&&!$device.isMobile"></div>
        <nuxt-link
          class="navigation-next flex-column flex--center flex--align"
          v-if="next&&!$device.isMobile"
          :to="{path: `${next.id}`}"
        >
          <fa icon="angle-right"></fa>
        </nuxt-link>
        <div
          v-if="next&&!$device.isMobile"
          class="next-chapter-title flex-column flex--center flex--align"
          v-text="next.title"
        ></div>
        <div class="flex-divider flex-row flex--align flex--between" v-if="$device.isMobile">
          <nuxt-link
            class="mobile-navigation mobile-navigation--prev"
            v-if="prev"
            :to="{path: `${prev.id}`}"
          >
            <span class="mobile-navigation__icon">
              <fa icon="angle-left"></fa>
            </span>
            <span>前の話へ</span>
          </nuxt-link>
          <span class="mobile-navigation--placeholder" v-if="!prev"></span>
          <span class="mobile-navigation--placeholder" v-if="!next"></span>
          <nuxt-link
            class="mobile-navigation mobile-navigation--next"
            v-if="next"
            :to="{path: `${next.id}`}"
          >
            <span>次の話へ</span>
            <span class="mobile-navigation__icon">
              <fa icon="angle-right"></fa>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- <div class="block-move" v-if="modal"></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      blackTheme: this.$store.state.user.theme === "black"
    };
  },
  components: {
    Horizontal: () => import("./Horizontal"),
    LeftV: () => import("./Left-V"),
    RightV: () => import("./Right-V")
  },
  computed: {
    ...mapGetters({
      next: "chapter/getNextChapter",
      prev: "chapter/getPrevChapter",
      theme: "user/getTheme",
      modal: "chapter/getModalState",
      imageModal: "getImageModalState"
    })
  },
  methods: {
    closeImageDialog() {
      this.$store.commit("TOGGLE_IMAGE");
    }
  },
  created() {}
};
</script>

<style lang="scss">
.chapter-modal--image {
  background-color: black !important;
}
.navigation-next {
  position: sticky !important;
  height: 100vh;
  width: 50px;
  font-size: 30px;
  top: 0;

  &:hover {
    background-color: $secondary;
    cursor: pointer;
    color: white;
    transition: 300ms;
  }
}

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

.navigation-prev {
  position: sticky !important;
  height: 100vh;
  width: 50px;
  font-size: 30px;
  top: 0;
  &:hover {
    background-color: $primary;
    cursor: pointer;
    color: white;
    transition: 300ms;
  }
}
.navigation-prev-cont {
  position: sticky !important;
  height: 100vh;
  width: 74px;
  font-size: 30px;
  top: 0;
  // &:hover {
  //   background-color: $primary;
  //   cursor: pointer;
  //   color: white;
  //   transition: 300ms;
  // }
}

.left-vertical-nav {
  position: fixed;
  // top: 60px;
  // left: 12rem;
  left: 14.4rem;
  // left: 0;
  .book-cover {
    height: 16.8rem;
    width: 11rem;
    border-radius: 10px;
  }
}
.next-chapter-title {
  position: sticky !important;
  height: 100vh;
  // width: 50px;
  -webkit-text-orientation: upright;
  text-orientation: upright;
  font-size: 16px;
  top: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  // text-combine-upright: all;
  // -webkit-text-combine: horizontal;
  // -ms-text-combine-horizontal: all;
}

.yikes {
  // transition: 200ms;
}
/* .chapter-page .menu-active {
  margin-left: 240px;
  margin-top: 6.6rem;
  padding: 1rem 5rem;
  transition: 300ms;
  position: relative !important;
} */
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
  // position: relative !important;
  margin-top: 50px;
  margin-right: 50px;
  background-color: #dae0e6;
  position: relative;
  // .chapter-container
  .mobile-navigation--placeholder {
    width: 50%;
  }
  .mobile-navigation {
    display: flex;
    align-items: center;

    // flex-direction: column;
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
    // background-color: #fff;
  }
  &--default {
    background: url("../../assets/noise/noise-default-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-default-container.png");
    }
  }
  &--black {
    background-color: #030303 !important;
    .mobile-navigation {
      color: rgb(215, 218, 220);
    }
    .next-chapter-title {
      color: rgb(215, 218, 220) !important;
    }
    .navigation-prev {
      color: rgb(215, 218, 220) !important;
    }
    .navigation-next {
      color: rgb(215, 218, 220) !important;
    }
    .chapter-container {
      background-color: rgb(26, 26, 27) !important;
      color: rgb(215, 218, 220);
      border: 1px solid rgb(71, 71, 71) !important;
    }
  }
  &--tan {
    // background-color: #e7dfbd;
    background: url("../../assets/noise/noise-tan-all.png");
    .chapter-container {
      color: #2b352f !important;
      // background-color: #eed368 !important;
      background: url("../../assets/noise/noise-tan-container.png");
      border: 1px solid #e7dfbd !important;
    }
  }
  &--ruby {
    background: url("../../assets/noise/noise-ruby-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-ruby-container.png");
      color: #fdd4e4;
      border: 1px solid red !important;
    }
    .mobile-navigation {
      color: #fdd4e4;
    }
  }
  &--sapphire {
    background: url("../../assets/noise/noise-sapphire-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-sapphire-container.png");
      color: #d4e6fd;
      border: 1px solid blue !important;
    }
    .mobile-navigation {
      color: #d4e6fd;
    }
  }
}
</style>
