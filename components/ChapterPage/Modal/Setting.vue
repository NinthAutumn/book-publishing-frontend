<template>
  <div
    class="setting-modal"
    :class="{'setting-modal--black':theme === 'black','setting-modal--tan':theme === 'tan'}"
  >
    <header>設定</header>
    <div class="theme-main">
      <h4 v-text="'テーマ'"></h4>
      <div class="themes-list flex">
        <div class="theme__item" @click="updateTheme('')"></div>
        <div class="theme__item theme__item--black" @click="updateTheme('black')"></div>
        <div class="theme__item theme__item--white" @click="updateTheme('default')"></div>
        <div class="theme__item theme__item--tan" @click="updateTheme('tan')"></div>
        <div class="theme__item theme__item--ruby" @click="updateTheme('ruby')"></div>
        <div class="theme__item theme__item--sapphire" @click="updateTheme('sapphire')"></div>
        <!-- <div class="theme__item"></div> -->
      </div>
    </div>
    <div class="font-style">
      <h4>スタイル</h4>
      <div class="font-style__list flex flex--align flex--center">
        <div
          class="font-style__item font-style__item--san-serif"
          @click="updateFontFamily(false)"
          :class="{'active-font':fontFamily === defaultFont }"
        >ゴシック</div>
        <div
          @click="updateFontFamily(true)"
          class="font-style__item font-style__item--serif"
          :class="{'active-font':fontFamily !== defaultFont}"
        >明朝</div>
      </div>
    </div>
    <div class="font-size">
      <h4>サイズ</h4>
      <div class="font-size__select">
        <div
          @click="updateFontSize('decrease')"
          class="font-size__option font-size__option--decrease"
        >
          <fa icon="font"></fa>
          <p>-</p>
        </div>
        <div
          @click="updateFontSize('default')"
          class="font-size__option font-size__option--default"
        >
          <fa icon="font"></fa>
        </div>
        <div
          @click="updateFontSize('increase')"
          class="font-size__option font-size__option--increase"
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
  data() {
    return {
      blackTheme: this.$store.state.user.theme === "black",
      fontSize: this.$store.getters["user/getFontSize"],
      defaultFont:
        "'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif"
    };
  },
  computed: {
    theme() {
      return this.$store.state.user.theme;
    },
    fontFamily() {
      return this.$store.getters["user/getFontFamily"];
    }
  },
  methods: {
    async updateTheme(theme) {
      const setting = {
        theme: theme
      };
      await this.$store.dispatch("user/setSetting", setting);
    },
    async updateFontFamily(change) {
      if (change) {
        const setting = {
          font_family: "serif"
        };
        await this.$store.dispatch("user/setSetting", setting);
      } else {
        const setting = {
          font_family: this.defaultFont
        };
        this.fontFamily = this.defaultFont;
        await this.$store.dispatch("user/setSetting", setting);
      }
    },
    async updateFontSize(type) {
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
        font_size: this.fontSize
      };
      await this.$store.dispatch("user/setSetting", setting);
    }
  }
};
</script>

<style lang="scss">
.setting-modal {
  &--tan {
    .font-style {
      .active-font {
        border: 1px solid $secondary !important;
        color: $secondary;
      }
      &__list {
      }
      &__item {
        border: 1px solid #eae2b9;
        &:hover {
          border: 1px solid $secondary;
          color: $secondary;
          cursor: pointer;
        }
        background-color: #fff7cc;
      }
    }
  }
  &--black {
    // background-color: black;
    .font-style {
      .active-font {
        border: 1px solid $secondary !important;
        color: $secondary;
      }
      &__list {
      }
      &__item {
        border: 1px solid rgb(243, 243, 243);
        &:hover {
          border: 1px solid $secondary;
          color: $secondary;
          cursor: pointer;
        }
        background-color: #3d3d3d;
      }
    }
  }
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  /* height: 100vh; */
  header {
    font-size: 25px;
    text-align: center;
    // margin-top: 10px;
  }
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
}
.font-size {
  $self: &;
  margin-top: 10px;
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: center;

    #{$self}__option {
      display: flex;
      font-size: 16px;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      background-color: white;
      user-select: none;

      &:hover {
        cursor: pointer;
        color: white;
        background-color: $primary;
      }
      p {
        font-size: 20px;
      }
      color: grey;
      &--increase {
        color: black;
      }
      &--decrease {
        color: black;
      }
    }
  }
}

.font-style {
  margin-top: 10px;
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
  .active-font {
    border: 1px solid $secondary !important;
    color: $secondary;
  }
  &__list {
  }
  &__item {
    user-select: none;
    margin-right: 10px;
    border-radius: 3px;
    border: 1px solid rgb(243, 243, 243);
    &:hover {
      border: 1px solid $secondary;
      color: $secondary;
      cursor: pointer;
    }
    padding: 10px;
    background-color: #fff;
    font-size: 15px;
    &--san-serif {
      // border-top-left-radius: 10px;
      // border-bottom-left-radius: 10px;
    }
    &--serif {
      // border-top-right-radius: 10px;
      // border-bottom-right-radius: 10px;
    }
  }
}

.theme-main {
  .themes-list {
    .theme__item {
      &:hover {
        cursor: pointer;
      }
      width: 50px;
      height: 50px;
      border-radius: 100px;
      position: relative;
      margin-right: 10px;
      background-color: white;
      border: 1px solid #dae0e6;
      box-shadow: 1px 1px 5px 0 rgb(212, 212, 212);
      &--white {
        background: url("../../../assets/noise/noise-default-container.png");
        border: 1px solid #dae0e6;
      }
      &--black {
        background-color: rgb(53, 53, 53);
        border: 1px solid black;
      }
      &--tan {
        background: url("../../../assets/noise/noise-tan-container.png");
        border: 1px solid #eed368;
      }
      &--ruby {
        background: url("../../../assets/noise/noise-ruby-container.png");
        border: 1px solid red;
      }
      &--sapphire {
        background: url("../../../assets/noise/noise-sapphire-container.png");
        border: 1px solid blue;
      }
    }
  }
}
</style>
