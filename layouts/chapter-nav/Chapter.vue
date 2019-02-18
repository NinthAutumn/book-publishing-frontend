<template>
  <div class="chapter-page">
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
          <div class="chapters-modal" v-if="modal" :class="'chapter-modal--'+modal">
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
  &--image {
  }
  // right: 0;
  position: sticky;
  // left: 50%;
  top: 0;
  height: 100vh;
  width: 400px;
  background-color: white;
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
  background-color: #dae0e6;
}
</style>
