<template>
  <div
    class="chapter-page"
    :class="{'chapter-page--black': theme === 'black','chapter-page--default': theme === 'default','chapter-page--ruby': theme === 'ruby','chapter-page--tan': theme === 'tan','chapter-page--sapphire': theme === 'sapphire'}"
  >
    <Horizontal></Horizontal>
    <LeftV></LeftV>
    <RightV></RightV>
    <div
      v-if="$store.state.neutral.openImage"
      class="images-modal__dialog flex flex--align flex--center"
    >
      <div class="images-modal__dialog__container" v-click-outside="closeImageDialog">
        <div class="images-modal__dialog__close">
          <fa class="images-modal__dialog__close__icon" icon="times" @click="closeImageDialog"></fa>
        </div>
        <div class="images-modal__dialog__content flex flex--align flex--center">
          <img :src="$store.state.neutral.imageUrl" alt>
        </div>
      </div>
    </div>
    <div class="chapter" :class="{'move-left': modal}">
      <div class="chapter-wrapper flex">
        <div
          v-if="prev"
          class="next-chapter-title flex flex-column flex--center flex--align"
          v-text="prev.title"
        ></div>
        <nuxt-link
          class="navigation-prev flex flex-column flex--center flex--align"
          v-if="prev"
          :to="{path: `${prev._id}`}"
        >
          <fa icon="angle-left"></fa>
        </nuxt-link>
        <div class="navigation-prev-cont" v-if="!prev"></div>
        <nuxt class="yikes"></nuxt>
        <div class="navigation-prev-cont" v-if="!next"></div>
        <nuxt-link
          class="navigation-next flex flex-column flex--center flex--align"
          v-if="next"
          :to="{path: `${next._id}`}"
        >
          <fa icon="angle-right"></fa>
        </nuxt-link>
        <div
          v-if="next"
          class="next-chapter-title flex flex-column flex--center flex--align"
          v-text="next.title"
        ></div>
      </div>
    </div>
    <!-- <div class="block-move" v-if="modal"></div> -->
  </div>
</template>

<script>
import Horizontal from "./Horizontal";
import LeftV from "./Left-V";
import RightV from "./Right-V";

export default {
  data() {
    return {
      blackTheme: this.$store.state.user.settings.theme === "black"
    };
  },
  components: {
    Horizontal,
    LeftV,
    RightV
  },
  computed: {
    modal() {
      return this.$store.state.chapter.modal;
    },
    theme() {
      return this.$store.state.user.theme;
    },
    next() {
      return this.$store.getters["chapter/getNextChapter"];
    },
    prev() {
      return this.$store.getters["chapter/getPrevChapter"];
    }
  },
  methods: {
    closeImageDialog() {
      this.$store.commit("neutral/IMAGE_CLOSE");
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
.chapter-page {
  // padding: 1rem 0rem;
  transition: 300ms;
  // position: relative !important;
  margin-top: 50px;
  margin-right: 50px;
  background-color: #dae0e6;
  position: relative;
  // .chapter-container
  &--default {
    background: url("../../assets/noise/noise-default-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-default-container.png");
    }
  }
  &--black {
    background-color: #030303 !important;
    .next-chapter-title {
      color: white !important;
    }
    .navigation-prev {
      color: white !important;
    }
    .navigation-next {
      color: white !important;
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
  }
  &--sapphire {
    background: url("../../assets/noise/noise-sapphire-all.png");
    .chapter-container {
      background: url("../../assets/noise/noise-sapphire-container.png");
      color: #d4e6fd;
      border: 1px solid blue !important;
    }
  }
}
</style>
