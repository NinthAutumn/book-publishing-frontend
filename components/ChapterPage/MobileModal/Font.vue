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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      fontFamily: "user/getFontFamily",
      auth: "auth/isAuthenticated"
    })
  },
  data() {
    return {
      defaultFont: `'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif`,
      fontSize: this.$store.getters["user/getFontSize"]
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggle", 2);
    },
    async updateFontFamily(change) {
      if (!this.auth) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (change) {
        const setting = {
          type: "chapter_font_family",
          change: "serif"
        };
        await this.$store.dispatch("user/setSetting", setting);
      } else {
        const setting = {
          type: "chapter_font_family",
          change: this.defaultFont
        };
        await this.$store.dispatch("user/setSetting", setting);
      }
      await this.$store.dispatch("user/fetchUserSettings");
    },
    async updateFontSize(type) {
      if (!this.auth) {
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
        type: "chapter_font_size",
        change: this.fontSize
      };
      await this.$store.dispatch("user/setSetting", setting);
      await this.$store.dispatch("user/fetchUserSettings");
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
  @include themify($themes) {
    background: themed("textBackgroundColor");
    color: themed("textColor");
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
