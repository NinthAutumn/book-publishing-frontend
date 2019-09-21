<template>
  <section class="mobile-chapter">
    <transition name="slide-down">
      <header-modal
        :theme="theme"
        @actionHandler="actionHandler"
        @goBack="goBack"
        v-if="navigation"
      ></header-modal>
    </transition>
    <transition name="slide-right">
      <TOC v-if="table" @toggle="toggleModal"></TOC>
    </transition>
    <transition name="slide-up">
      <Theme v-if="themeM" @toggle="toggleModal" :theme="theme"></Theme>
    </transition>
    <transition name="slide-up">
      <FontSetting v-if="settingM" :theme="theme" @toggle="toggleModal"></FontSetting>
    </transition>
    <transition name="slide-left">
      <ImageM v-if="imageM" :drawings="chapter.drawings" :theme="theme" @toggle="toggleModal"></ImageM>
    </transition>
    <transition name="slide-left">
      <Comments v-if="commentM" :chapter="chapter" :theme="theme" @toggle="toggleModal"></Comments>
    </transition>

    <div
      v-if="!chapter.locked"
      class="mobile-chapter__wrapper"
      ref="chapter"
      v-touch:tap="tapNav"
      v-touch:swipe.top="closeNav"
      v-touch:swipe.bottom="closeNav"
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
    >
      <div class="mobile-chapter__container">
        <div class="mobile-chapter__title">{{`第${chapter.index}話 ${chapter.title}`}}</div>
        <adsbygoogle
          v-if="!user.status&&chapter.content"
          :ad-layout="'in-article'"
          :ad-format="'fluid'"
        />
        <div
          class="mobile-chapter__ann"
          :style="{  fontSize: `${this.font}px`}"
          v-if="chapter.header"
        >{{chapter.header}}</div>
        <div
          class="mobile-chapter__content"
          :style="{  fontSize: `${font}px`, fontFamily: `${fontStyle}`}"
          v-html="chapter.content"
          v-if="!chapter.locked"
        ></div>
        <div
          class="mobile-chapter__ann"
          :style="{  fontSize: `${this.font}px`}"
          v-if="chapter.footer"
        >{{chapter.footer}}</div>
        <adsbygoogle
          v-if="!user.status&&chapter.content"
          :ad-layout="'in-article'"
          :ad-format="'fluid'"
        />
      </div>
    </div>
    <div class="mobile-chapter__locked-content" v-else>
      <div class="mobile-chapter__title">{{`第${chapter.index}話 ${chapter.title}`}}</div>
      <!-- .mobile-chapter__ -->
      <div class="mobile-chapter__locked flex-column flex--align flex--center">
        <!-- <div>-- ロック掛かっている話 --</div> -->
        <div class="mobile-chapter_price">
          <Currency size="large" :amount="chapter.price"></Currency>
          <div class="mobile-chapter__buy" @click="purchase" :class="{}">ロック解除</div>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <footer-modal
        @prev="swipeRight"
        @next="swipeLeft"
        :theme="theme"
        @modalChange="openModal"
        v-if="navigation"
      ></footer-modal>
    </transition>
    <div v-if="!chapter.locked" class="mobile-chapter__actions flex-row flex--align flex--center">
      <div
        class="mobile-chapter__action flex-column flex--align"
        v-for="(action,key) in actions"
        :key="key"
        v-ripple="{  }"
        @click.stop="actionHandler(action.type)"
      >
        <fa :icon="action.icon"></fa>
        <div class="mobile-chapter__message">{{action.message}}</div>
      </div>
      <report-modal v-if="problem" @close="actionHandler"></report-modal>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hydrateWhenVisible, hydrateSsrOnly } from "vue-lazy-hydration";

export default {
  components: {
    Currency: () => import("@/components/All/Currency"),
    Theme: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileModal/Theme")
    ),
    TOC: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileModal/TOC")
    ),
    FontSetting: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileModal/Font")
    ),
    ImageM: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileModal/Images")
    ),
    Comments: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileModal/Comments")
    ),
    ReportModal: hydrateWhenVisible(() => import("./MobileUtility/Report")),
    FooterModal: hydrateWhenVisible(() => import("./MobileUtility/Footer")),
    HeaderModal: hydrateWhenVisible(() => import("./MobileUtility/Header"))
  },
  props: ["comment"],
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      theme: "user/getTheme",
      modal: "chapter/getModalState",
      chapter: "chapter/getChapter",
      user: "auth/getUser",
      font: "user/getFontSize",
      next: "chapter/getNextChapter",
      prev: "chapter/getPrevChapter",
      simpleList: "chapter/getSimpleList",
      auth: "auth/isAuthenticated"
    })
  },
  data() {
    return {
      content: {},
      navigation: false,
      list: [],
      min: 0,
      max: 0,
      table: false,
      themeM: false,
      settingM: false,
      imageM: false,
      commentM: false,
      loading: false,
      problem: false,
      height: "100%",
      actions: {
        リポート: {
          icon: "flag",
          message: "この話を報告",
          type: "report"
        },
        投票: {
          icon: "bolt",
          message: "投票を掛ける",
          type: "vote"
        }
      }
    };
  },
  watch: {
    table: function(val) {
      if (!val) {
        this.navigation = true;
      }
    }
  },
  mounted: async function() {
    if (this.comment) {
      this.navigation = !this.navigation;
      this.openModal(4);
    }
    await this.fetchList({
      structured: false,
      bookId: this.$route.params.id,
      state: "published"
    });
  },
  methods: {
    ...mapActions({
      fetchList: "chapter/fetchChapterList"
    }),
    swipeLeft: function() {
      if (!this.next) {
        return this.$toast.show("これが最後の話です", {
          position: "top-center",
          duration: 2000,
          icon: "extension"
        });
      }
      this.$router.push({ path: `${this.next.id}` });
    },
    swipeRight: function() {
      if (!this.prev) {
        return this.$toast.show("これが最初の話です", {
          position: "top-center",
          duration: 2000,
          icon: "extension"
        });
      }
      this.$router.push({ path: `${this.prev.id}` });
    },
    refresh: function() {
      this.$router.push({ path: `${this.prev.id}` });
    },
    tapNav: function(type) {
      this.themeM = false;

      this.commentM = false;
      this.settingM = false;

      this.imageM = false;
      this.table = false;

      this.navigation = !this.navigation;
    },
    closeNav: function() {
      this.navigation = false;
    },
    goBack: function() {
      this.$router.push(`/books/${this.$route.params.id}`);
    },
    openModal: function(type) {
      switch (type) {
        case 1:
          this.themeM = !this.themeM;
          break;
        case 2:
          this.settingM = !this.settingM;
          break;
        case 3:
          this.imageM = !this.imageM;
          break;
        case 4:
          this.commentM = !this.commentM;
          break;
        default:
          this.table = !this.table;
          break;
      }
      this.navigation = !this.navigation;
    },
    actionHandler: async function(type) {
      if (!this.auth) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (type === "vote") {
        try {
          const { error } = await this.$store.dispatch("book/postVote", {
            bookId: this.$route.params.id
          });

          if (error) {
            this.$toast.error(`${error}`, {
              // theme: "toasted-primary",
              position: "bottom-center",
              duration: 2000,
              icon: "extension"
            });
          }
        } catch (error) {
          console.log(error.message);
        }
        await this.$store.dispatch("wallet/wealth");
      } else {
        this.problem = !this.problem;
      }
    },
    toggleModal(type) {
      switch (type) {
        case 1:
          this.themeM = false;
          break;
        case 2:
          this.settingM = false;
          break;
        case 3:
          this.imageM = false;
          break;
        case 4:
          this.commentM = false;
          break;
        default:
          this.table = false;
          break;
      }
      this.navigation = true;
    },
    purchase: async function() {
      try {
        if (!this.$store.getters["auth/isAuthenticated"]) {
          return this.$store.commit("LOGIN_STATE");
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
  &__locked-content {
    &::after {
      content: "";
      display: inline-block;
      width: 94vw;
    }
    #{$self}__title {
      font-size: 2.4rem;
    }
    #{$self}__locked {
      min-height: 80vh;

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
  }
  &__wrapper {
    height: 100%;

    #{$self}__container {
      display: inline-block;
      max-width: 100%;
      min-height: 100vh;

      &::after {
        content: "";
        display: inline-block;
        width: 94vw;
      }
    }

    #{$self}__title {
      font-size: 2.4rem;
      line-height: 2.5rem;
      margin: 1rem 0;
      max-width: 100%;
      word-break: break-all;
    }
    #{$self}__ann {
      border-radius: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid;
    }
    #{$self}__content {
      word-break: break-all;
      line-height: 2.7rem;

      p {
        font-size: inherit;
        font-family: inherit;
      }
      ruby {
        font-size: inherit;
        font-family: inherit;
      }
      rb {
        font-size: inherit;
        font-family: inherit;
      }
      img {
        max-width: 90%;
        display: block;
        margin: 0 auto;
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
    &--tan {
      background-color: #e9e1b8;
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

  &__actions {
    #{$self}__action {
      font-size: 2.5rem;
      border-radius: 1rem;
      padding: 1rem 0;
      margin-bottom: 1rem;
      width: 50%;
      #{$self}__icon {
      }
      #{$self}__message {
        margin-top: 1rem;
        text-align: center;
        font-size: 1.4rem;
        opacity: 0.8;
      }
    }
  }
}

.mobile-chapter__toasted {
  height: 8vh !important;
  width: 96% !important;
  border-radius: 1rem !important;
  margin: 0 auto;
}
</style>
