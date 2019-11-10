<template>
  <div class="mobile-theme" :class="`mobile-theme--${theme}`" v-click-outside="toggleModal">
    <div class="mobile-theme__options">
      <div
        class="mobile-theme__option"
        :class="'mobile-theme__option--'+theme"
        v-for="theme in themes"
        :key="theme"
        @click="updateTheme(theme)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: String
  },
  data() {
    return {
      themes: ["black", "tan", "default"]
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggle", 1);
    },
    async updateTheme(theme) {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      const setting = {
        type: "chapter_theme",
        change: theme
      };
      await this.$store.dispatch("user/setSetting", setting);
    }
  }
};
</script>

<style lang="scss">
.mobile-theme {
  $self: &;
  $self: &;
  width: 100vw;
  height: 12rem;
  z-index: 900;
  position: fixed;
  // position
  bottom: 0;
  left: 0;
  @include themify($themes) {
    background: themed("modalBackgroundColor");
    color: themed("textColor");
  }

  &__options {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: 100%;

    #{$self}__option {
      width: 6rem;
      height: 6rem;
      border-radius: 100px;
      margin-right: 1rem;
      background-color: #fff;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      border: 1px solid #dae0e6;
      &--default {
        background-color: #fff;
        border: 1px solid #dae0e6;
      }
      &--black {
        background-color: rgb(53, 53, 53);
        border-color: black;
      }
      &--tan {
        background: url("~assets/img/tanContainer.png");
        border-color: #eed368;
      }
      &--ruby {
        background: url("~assets/img/rubyContainer.png");
        border-color: red;
      }
      &--sapphire {
        background: url("~assets/img/sapphireContainer.png");
        border-color: blue;
      }
    }
  }
}
</style>
