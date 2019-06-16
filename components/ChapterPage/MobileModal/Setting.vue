<template>
  <div class="mobile-setting">
    <div class="mobile-setting__container">
      <div class="mobile-setting__font">
        <div class="mobile-setting__font-list">
          <div
            class="mobile-setting__font-item mobile-setting__font-item--san-serif"
            @click.stop="updateFontFamily(false)"
            :class="{'active-font':fontFamily === defaultFont }"
          >ゴシック</div>
          <div
            @click.stop="updateFontFamily(true)"
            class="mobile-setting__font-item mobile-setting__font-item--serif"
            :class="{'active-font':fontFamily !== defaultFont}"
          >明朝</div>
        </div>
      </div>
      <div class="mobile-setting__select">
        <div
          @click.stop="updateFontSize('decrease')"
          class="mobile-setting__option mobile-setting__option--decrease"
        >
          <fa icon="font"></fa>
          <p>-</p>
        </div>
        <div
          @click.stop="updateFontSize('default')"
          class="mobile-setting__option mobile-setting__option--default"
        >
          <fa icon="font"></fa>
        </div>
        <div
          @click.stop="updateFontSize('increase')"
          class="mobile-setting__option mobile-setting__option--increase"
        >
          <fa icon="font"></fa>
          <p>+</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleModal() {
      this.$emit("toggle", 2);
    },
    async updateFontFamily(change) {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (change) {
        const setting = {
          type: "chapterFontFamily",
          change: "serif"
        };
        await this.$store.dispatch("user/setSetting", setting);
      } else {
        const setting = {
          type: "chapterFontFamily",
          change: this.defaultFont
        };
        this.fontFamily = this.defaultFont;
        await this.$store.dispatch("user/setSetting", setting);
      }
    },
    async updateFontSize(type) {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      switch (type) {
        case "increase":
          if (this.fontSize > 24) {
            break;
          }
          this.fontSize++;

          break;
        case "decrease":
          if (this.fontSize < 10) {
            break;
          }
          this.fontSize--;
          break;
        case "default":
          this.fontSize = 16;
          break;
      }
      const setting = {
        type: "chapterFontSize",
        change: this.fontSize
      };
      await this.$store.dispatch("user/setSetting", setting);
    }
  }
};
</script>

<style lang="scss">
.mobile-setting {
  $self: &;
  width: 100vw;
  height: 12rem;
  z-index: 900;
  position: fixed;
  // position
  bottom: 0;
  left: 0;
  background-color: #fff;

  &__container {
    width: 100%;
    height: 100%;
    #{$self}__font {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #{$self}__font-list {
      width: 20rem;
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #566cd6;
      border-radius: 1rem;
      #{$self}__font-item {
        font-size: 1.8rem;
        width: 10rem;
        text-align: center;
        padding: 1rem;
      }
    }
  }
}
</style>
