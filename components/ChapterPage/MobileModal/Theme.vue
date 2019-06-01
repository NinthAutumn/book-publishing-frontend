<template>
  <div class="mobile-theme">
    <div class="mobile-theme__options">
      <div
        class="mobile-theme__option"
        :class="'mobile-theme__option--'+theme"
        v-for="theme in themes"
        :key="theme"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themes: ["black", "tan", "default", ""]
    };
  },
  methods: {
    async updateTheme(theme) {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$route.push("/auth/login");
      }
      const setting = {
        type: "chapterTheme",
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
  &__options {
    #{$self}__option {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      background-color: #fff;
      border: 1px solid #dae0e6 &--default {
        background: url("../../../assets/noise/noise-default-container.png");
        border-color: #dae0e6;
      }
      &--black {
        background-color: rgb(53, 53, 53);
        border-color: black;
      }
      &--tan {
        background: url("../../../assets/noise/noise-tan-container.png");
        border-color: #eed368;
      }
      &--ruby {
        background: url("../../../assets/noise/noise-ruby-container.png");
        border-color: red;
      }
      &--sapphire {
        background: url("../../../assets/noise/noise-sapphire-container.png");
        border-color: blue;
      }
    }
  }
}
</style>
