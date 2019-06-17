<template>
  <div class="mobile-setting" :class="`mobile-setting--${theme}`">
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
        <div class="mobile-setting__options">
          <div
            v-ripple
            @click.stop="updateFontSize('decrease')"
            class="mobile-setting__option mobile-setting__option--decrease"
          >
            <fa icon="minus"></fa>
          </div>
          <div
            v-ripple
            @click.stop="updateFontSize('default')"
            class="mobile-setting__option mobile-setting__option--default"
          >
            <fa icon="font"></fa>
          </div>
          <div
            v-ripple
            @click.stop="updateFontSize('increase')"
            class="mobile-setting__option mobile-setting__option--increase"
          >
            <fa icon="plus"></fa>
          </div>
        </div>
      </div>
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
      fontSize: this.$store.getters["user/getFontSize"],
      defaultFont:
        "'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif",
      fontFamily: ""
    };
  },
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
        this.fontFamily = "serif";
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
          if (this.fontSize > 27) {
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
          this.fontSize = 18;
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
  &--default {
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
  &__container {
    width: 100%;
    height: 100%;
    padding: 1rem;
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
      overflow: hidden;
      .active-font {
        border-radius: 0.5rem;
        background-color: #566cd6;
        color: white !important;
      }
      #{$self}__font-item {
        color: #566cd6;
        font-size: 1.8rem;
        width: 10rem;
        text-align: center;
        padding: 1rem;
      }
    }
    #{$self}__select {
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      #{$self}__options {
        border-radius: 1rem;
        width: 20rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: inherit;
        background-color: #e3e8ee;
        overflow: hidden;
      }
      #{$self}__option {
        text-align: center;
        width: 100%;
        font-size: inherit;
        padding: 1rem 1.5rem;
        color: #4c555a;
      }
    }
  }
}
</style>
