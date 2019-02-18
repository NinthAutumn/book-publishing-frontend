<template>
  <div
    class="chapter-page"
    :class="{'chapter-page--black':theme === 'black','chapter-page--tan':theme === 'tan','chapter-page--ruby':theme === 'ruby', 'chapter-page--default':(theme === 'default')||!theme}"
  >
    <Horizontal></Horizontal>
    <LeftV></LeftV>
    <RightV></RightV>
    <div class="chapter">
      <div class="chapter-wrapper flex">
        <nuxt-link
          class="navigation-prev flex flex-column flex--center flex--align"
          v-if="$store.state.chapter.chapter.index !== 1"
          :to="{path: `${$store.state.chapter.chapter.index-1}`}"
        >
          <fa icon="angle-left"></fa>
        </nuxt-link>
        <div
          class="navigation-prev-cont flex flex-column flex--center flex--align"
          v-if="$store.state.chapter.chapter.index === 1"
        ></div>
        <nuxt class="yikes"></nuxt>
        <nuxt-link
          class="navigation-next flex flex-column flex--center flex--align"
          v-if="$store.state.chapter.chapter.next"
          :to="{path: `${$store.state.chapter.chapter.index+1}`}"
        >
          <fa icon="angle-right"></fa>
        </nuxt-link>
        <transition name="chapter-modal">
          <div
            class="chapters-modal"
            v-if="modal"
            :class="{'chapters-modal--black':theme === 'black','chapters-modal--tan':theme === 'tan','chapters-modal--ruby':theme === 'ruby','chapter-page--default':theme === 'default'}"
          >
            <div class="chapters-modal__author-profile" v-if="modal === 'profile'">
              <Profile></Profile>
            </div>
            <div class="chapters-modal__images" v-else-if="modal === 'image'">
              <Images></Images>
            </div>
            <div class="chapters-modal__table-of-content" v-else-if="modal === 'table'">
              <TOC></TOC>
            </div>
            <div class="chapters-modal__user-setting" v-else-if="modal === 'setting'">
              <Setting></Setting>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Horizontal from "./Horizontal";
import LeftV from "./Left-V";
import RightV from "./Right-V";
import TOC from "@/components/ChapterPage/Modal/TOC";
import Profile from "@/components/ChapterPage/Modal/Profile";
import Setting from "@/components/ChapterPage/Modal/Setting";
import Images from "@/components/ChapterPage/Modal/Images";

export default {
  data() {
    return {
      blackTheme: this.$store.state.user.settings.theme === "black"
    };
  },
  components: {
    Horizontal,
    LeftV,
    RightV,
    TOC,
    Profile,
    Setting,
    Images
  },
  computed: {
    modal() {
      return this.$store.state.chapter.modal;
    },
    theme() {
      return this.$store.state.user.theme;
    }
  }
};
</script>

<style lang="scss">
// .chapters-modal .image {
//   background-color: black !important;
// }
.chapter-modal--image {
  background-color: black !important;
}
.chapters-modal {
  &--default {
    background: url("../../assets/noise/noise-default-container.png");
  }
  &--black {
    background-color: rgb(63, 63, 63);
    background: none;
    // border-right: 1px solid rgb(63, 63, 63);
    color: rgb(215, 218, 220);
  }
  &--tan {
    background: url("../../assets/noise/noise-tan-container.png");
    color: #2b352f;
  }
  &--ruby {
    background: url("../../assets/noise/noise-ruby-container.png");
    color: #f7bfd4;
  }
  &--image {
  }
  // right: 0;
  position: sticky;
  // left: 50%;
  top: 0;
  height: 100vh;
  width: 400px;
  // background-color: white;
  // top: 50px;
  &__author-profile {
    height: 100%;
  }
  &__images {
    // background-color: black !important;
    height: 100%;
  }
  &__table-of-content {
    height: 100%;
  }
  &__user-setting {
    height: 100%;
  }
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
.chapter-page {
  // padding: 1rem 0rem;
  transition: 300ms;
  // position: relative !important;
  margin-top: 50px;
  margin-right: 50px;

  &--default {
    background: url("../../assets/noise/noise-default-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-default-container.png");
    }
  }
  &--black {
    background-color: #030303 !important;
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
      border: 1px solid red;
    }
  }
}
</style>
