<template>
  <section class="mobile-chapter">
    <transition name="slide-down">
      <div class="mobile-chapter__top" :class="'mobile-chapter__top--'+ theme" v-if="navigation">
        <div class="mobile-chapter__navigation" @click="goBack">
          <fa icon="arrow-left"></fa>
        </div>
        <div class="mobile-chapter__meta">
          <div class="mobile-chapter__select" v-ripple>
            <fa icon="bolt"></fa>
          </div>
          <div class="mobile-chapter__select" v-ripple>
            <fa icon="bookmark"></fa>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="mobile-chapter__wrapper"
      v-touch:tap="tapNav"
      v-touch:swipe.top="closeNav"
      v-touch:swipe.bottom="closeNav"
    >
      <div class="mobile-chapter__container">
        <div class="mobile-chapter__title">{{`第${chapter.index}話 ${chapter.title}`}}</div>
        <adsbygoogle v-if="!user.status" :ad-layout="'in-article'" :ad-format="'fluid'"/>
        <div
          class="mobile-chapter__ann"
          :style="{  fontSize: `${this.font}px`}"
          v-if="chapter.header"
        >{{chapter.header}}</div>
        <div
          class="mobile-chapter__content"
          :style="{  fontSize: `${this.font}px`}"
          v-html="chapter.content"
          v-if="!chapter.locked"
        ></div>
        <div class="mobile-chapter__locked flex-column flex--align flex--center" v-else>
          <div class="mobile-chapter_price">
            <Currency size="large" :amount="chapter.price"></Currency>
            <div class="mobile-chapter__buy" @click="purchase" :class="{}">ロック解除</div>
          </div>
        </div>
        <div
          class="mobile-chapter__ann"
          :style="{  fontSize: `${this.font}px`}"
          v-if="chapter.footer"
        >{{chapter.footer}}</div>
      </div>
    </div>
    <transition name="slide-up">
      <div
        class="mobile-chapter__bottom"
        :class="'mobile-chapter__bottom--'+ theme"
        v-if="navigation"
      >
        <div class="mobile-chapter__navigation flex-row flex--align">
          <div class="mobile-chapter__nav">
            <fa icon="chevron-left"></fa>
          </div>
          <el-slider v-model="selected" :format-tooltip="formatTooltip" :max="max" @change="change"></el-slider>
          <div class="mobile-chapter__nav">
            <fa icon="chevron-right"></fa>
          </div>
        </div>
        <!-- <v-slider :value="selected" :min="min" :max="max"></v-slider> -->
        <div class="mobile-chapter__options">
          <div class="mobile-chapter__option" v-ripple>
            <fa icon="list"></fa>
          </div>
          <div class="mobile-chapter__option" v-ripple>
            <fa icon="tint"></fa>
          </div>
          <div class="mobile-chapter__option" v-ripple>
            <fa icon="font"></fa>
          </div>
          <div class="mobile-chapter__option" v-ripple>
            <fa icon="comment"></fa>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      theme: "user/getTheme",
      modal: "chapter/getModalState",
      chapter: "chapter/getChapter",
      user: "user/loggedInUser",
      font: "user/getFontSize",
      simpleList: "chapter/getSimpleList"
    })
  },
  data() {
    return {
      content: {},
      navigation: false,
      list: [],
      min: 0,
      max: 0,
      selected: 0
    };
  },
  watch: {
    selected: function(val) {}
  },
  mounted: async function() {
    await this.$store.dispatch("chapter/fetchUnstructuredList", {
      bookId: this.$route.params.id
    });
    this.simpleList.forEach(val => {
      this.list.push(val.index);
    });
    this.min = this.simpleList[0];
    this.max = this.list[this.list.length - 1];
    this.selected = this.chapter.index;
  },
  methods: {
    change: function() {
      this.simpleList.forEach(chap => {
        if (chap.index === this.selected) {
          this.$router.push(`/books/${this.$route.params.id}/${chap.id}`);
        }
      });
    },
    tapNav: function() {
      this.navigation = !this.navigation;
    },
    formatTooltip(val) {
      return `${((val / this.max) * 100).toFixed(0)}%`;
    },
    closeNav: function() {
      this.navigation = false;
    },
    goBack: function() {
      this.$router.go(-1);
    },
    purchase: async function() {
      try {
        if (!this.$store.getters["auth/isAuthenticated"]) {
          return this.$router.push("/auth/login");
        }
        await this.$store.dispatch("wallet/buyChapter", {
          bookId: this.$route.params.id,
          chapterId: this.$route.params.chaptersId,
          amount: this.$store.state.chapter.chapter.price
        });
        await this.$store.dispatch("chapter/fetchChapter", {
          chapterId: this.$route.params.chaptersId,
          bookId: this.$route.params.id
        });
      } catch (error) {
        return this.$toast.show(error, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.mobile-chapter {
  $self: &;
  &__wrapper {
    #{$self}__container {
      display: inline-block;
      max-width: 750px;
      min-height: 100vh;
      &::after {
        content: "";
        display: inline-block;
        width: 94vw;
      }
    }
    #{$self}__locked {
      min-height: 70vh;
      #{$self}__buy {
        font-size: 1.6rem;
        padding: 1rem 2rem;
        border-radius: 0.4rem;
        background-color: #6772e5;
        color: white;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        transition: 200ms;
        &:active {
          background-color: #fff;
          color: #6772e5;
          transition: 200ms;
        }
      }
    }
    #{$self}__title {
      font-size: 2.4rem;
      margin: 1rem 0;
    }
    #{$self}__ann {
      border-radius: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid;
    }
    #{$self}__content {
      word-break: break-all;
      p {
        font-size: inherit;
      }
      ruby {
        font-size: inherit;
      }
    }
    #{$self}__footer {
    }
  }
  &__top {
    position: fixed;
    top: 0;
    left: 0;
    height: 5rem;
    background-color: #fff;
    z-index: 10000;
    width: 100vw;
    &--black {
      background-color: #19191a;
      color: #949698;
    }
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #{$self}__navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      height: 4rem;
      width: 4rem;
    }
    #{$self}__meta {
      display: flex;
      align-items: center;
      font-size: 2rem;
      #{$self}__select {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        height: 4rem;
        width: 4rem;
      }
    }
  }
  &__bottom {
    position: fixed;
    bottom: 0;
    height: 12rem;
    left: 0;
    width: 100vw;
    &--black {
      background-color: #19191a;
      color: #949698;
    }
    background-color: white;
    // padding: 2rem;
    padding: 1rem;
    box-sizing: border-box;

    #{$self}__options {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      #{$self}__option {
        width: 5rem;
        height: 5rem;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    #{$self}__nav {
      font-size: 2.5rem;
      padding: 1rem 1.5rem;
    }
    .el-slider__bar {
      background-color: #3b66f5;
    }
    .el-tooltip {
      background-color: #3b66f5;
      border: 0;
    }
    .el-slider {
      flex-grow: 1;
    }
  }
}
</style>
