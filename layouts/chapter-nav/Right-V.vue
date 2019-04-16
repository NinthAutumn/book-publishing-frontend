<template>
  <nav class="right-vertical-nav">
    <transition name="chapter-modal">
      <div
        class="chapters-modal"
        v-if="modal"
        :class="{'chapters-modal--black':theme === 'black','chapters-modal--tan':theme === 'tan','chapters-modal--ruby':theme === 'ruby','chapters-modal--default':theme === 'default','chapters-modal--sapphire':theme === 'sapphire'}"
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
    <div class="comments-modal"></div>
    <div class="nav-container flex flex-column flex--align flex--center">
      <div class="nav-icons">
        <div class="nav-icon">
          <fa class="nav-icon__item nav-icon__item--author" icon="user-ninja"></fa>
        </div>
        <div class="nav-icon" @click="images">
          <fa class="nav-icon__item nav-icon__item--image" icon="image"></fa>
          <span
            class="image-count"
            v-if="$store.state.chapter.chapter.drawings"
            v-text="$store.state.chapter.chapter.drawings.length"
          ></span>
        </div>
        <!-- ユーザーの意見を聞いて　アップデートする -->
        <!-- <div class="nav-icon" @click="comments">
          <fa class="nav-icon__item nav-icon__item--comment" icon="comment"></fa>
        </div>-->
        <div class="nav-icon" @click="table">
          <fa class="nav-icon__item" icon="list-ul"></fa>
        </div>

        <div class="nav-icon" @click="setting">
          <fa class="nav-icon__item nav-icon__item--cog" icon="cog"></fa>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    modal() {
      return this.$store.state.chapter.modal;
    },
    theme() {
      return this.$store.state.user.theme;
    }
  },
  components: {
    TOC: () => import("@/components/ChapterPage/Modal/TOC"),
    Profile: () => import("@/components/ChapterPage/Modal/Profile"),
    Setting: () => import("@/components/ChapterPage/Modal/Setting"),
    Images: () => import("@/components/ChapterPage/Modal/Images")
  },
  methods: {
    async table() {
      await this.$store.dispatch(
        "chapter/tableOfContent",
        this.$route.params.id
      );
    },
    async comments() {
      if (this.$store.state.chapter.modal === "comment") {
        await this.$store.commit("chapter/MODAL_CLOSE");
      } else {
        await this.$store.commit("chapter/COMMENT");
      }
    },
    async setting() {
      if (this.$store.state.chapter.modal === "setting") {
        await this.$store.commit("chapter/MODAL_CLOSE");
      } else {
        await this.$store.commit("chapter/SETTING");
      }
    },
    async images() {
      if (this.$store.state.chapter.modal === "image") {
        await this.$store.commit("chapter/MODAL_CLOSE");
      } else {
        await this.$store.commit("chapter/IMAGE");
      }
    }
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 461px) {
  .right-vertical-nav {
    display: none;
  }
  .chapter-page {
    margin-right: 0 !important;
  }
}
.chapters-modal {
  background-color: white;
  &--default {
    background: url("../../assets/noise/noise-default-container.png");
    color: black;
  }
  &--black {
    background-color: #1a1a1b;
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
  &--sapphire {
    background: url("../../assets/noise/noise-sapphire-container.png");
    color: #d4e6fd;
  }
  &--image {
  }
  // right: 0;
  position: fixed;
  // left: 50%;
  top: 0;
  padding-top: 50px;
  box-sizing: border-box;
  right: 65px;
  height: 100vh;
  width: 400px;
  z-index: 2;
  // box-shadow: 1px 1px

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
.right-vertical-nav {
  .nav-container {
    // height: 100vh;
    position: fixed;
    right: 0;
    width: 50px;
    height: 100%;
    top: 0;
    color: $primary;
    background-color: rgb(241, 226, 248);
  }
  .nav-icons {
    width: 100%;
  }
  .nav-icon {
    // margin-bottom: 20px;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 5px;
    .image-count {
      position: absolute;
      font-size: 10px;
      color: white;
      font-weight: bold;
      // padding: 10px;
      border-radius: 10px;
      height: 15px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: rgb(255, 0, 0);
      top: 0px;
      right: 2px;
    }
    &:hover {
      background-color: $primary;
      color: white;
      cursor: pointer;
    }
    &__item {
      // transform: rotateY(180deg);
      &--author {
        transform: scale(1);
        transition: 300ms;
        &:hover {
          transform: scale(1.1);
          transition: 300ms;
        }
      }
      &--cog {
        transform: rotate(0deg);
        transition: 300ms;
        &:hover {
          transform: rotate(180deg);
          transition: 300ms;
        }
      }
      font-size: 30px;
    }
  }
}
</style>
