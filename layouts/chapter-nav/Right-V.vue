<template>
  <nav class="right-vertical-nav">
    <transition name="chapter-modal">
      <div class="chapters-modal" v-if="modal">
        <component :is="modalComponent" :drawings="drawings" />
      </div>
    </transition>
    <div class="nav-container flex-column flex--align flex--center">
      <div class="nav-icons">
        <div class="nav-icon">
          <fa class="nav-icon__item nav-icon__item--author" icon="user-ninja"></fa>
        </div>
        <div class="nav-icon" @click="images">
          <fa class="nav-icon__item nav-icon__item--image" icon="image"></fa>
          <span class="image-count" v-if="drawings" v-text="drawings.length"></span>
        </div>
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
import { mapGetters } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  computed: {
    modal() {
      return this.$store.state.chapter.modal;
    },
    theme() {
      return this.$store.state.user.theme;
    },
    ...mapGetters({
      drawings: "drawing/getChapterDrawings"
    }),
    modalComponent() {
      if (!this.modal) return;
      const types = {
        profile: "Modal/Profile",
        setting: "Modal/Setting",
        table: "Modal/TOC",
        image: "Modal/Images"
      };
      return () => import(`@/components/ChapterPage/${types[this.modal]}`);
    }
  },
  methods: {
    async table() {
      if (this.modal === "table") {
        this.$store.commit("chapter/SET_MODAL", "");
      } else {
        await this.$store.dispatch("chapter/fetchChapterList", {
          bookId: this.$route.params.id,
          state: "published",
          structured: true
        });
        this.$store.commit("chapter/SET_MODAL", "table");
      }
    },
    async comments() {
      if (this.modal === "comment") {
        this.$store.commit("chapter/SET_MODAL", "");
      } else {
        this.$store.commit("chapter/SET_MODAL", "comment");
      }
    },
    async setting() {
      if (this.modal === "setting") {
        this.$store.commit("chapter/SET_MODAL", "");
      } else {
        this.$store.commit("chapter/SET_MODAL", "setting");
      }
    },
    async images() {
      if (this.modal === "image") {
        this.$store.commit("chapter/SET_MODAL", "");
      } else {
        this.$store.commit("chapter/SET_MODAL", "image");
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
  @include themify($themes) {
    background: themed("textBackgroundColor");
    color: themed("textColor");
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

  &__author-profile {
    height: 100%;
  }
  &__images {
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
    color: #d7dadc;
    background-color: #19191a;
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
      background-color: #8b8d96;
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
      font-size: 2rem;
    }
  }
}
</style>
