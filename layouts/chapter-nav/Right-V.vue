<template>
  <nav class="right-vertical-nav">
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
            v-if="$store.state.chapter.chapter.extra.drawings.length"
            v-text="$store.state.chapter.chapter.extra.drawings.length"
          ></span>
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
export default {
  methods: {
    async table() {
      await this.$store.dispatch(
        "chapter/tableOfContent",
        this.$route.params.id
      );
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
.right-vertical-nav {
  // box-shadow: 1px 1px 5px 0 grey;
  // position: relative;
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
