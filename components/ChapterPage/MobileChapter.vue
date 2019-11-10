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
    <transition :name="modalTransition">
      <component
        :is="componentInstance"
        @toggle="toggleModal"
        :theme="theme"
        :chapter="chapter"
        :drawings="chapter.drawings"
      />
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
    ReportModal: hydrateWhenVisible(() => import("./MobileUtility/Report")),
    FooterModal: hydrateWhenVisible(() => import("./MobileUtility/Footer")),
    HeaderModal: hydrateWhenVisible(() => import("./MobileUtility/Header"))
  },
  props: ["comment"],
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      theme: "user/getTheme",
      chapter: "chapter/getChapter",
      user: "auth/getUser",
      font: "user/getFontSize",
      next: "chapter/getNextChapter",
      prev: "chapter/getPrevChapter",
      auth: "auth/isAuthenticated"
    }),
    modalTransition() {
      const transition = {
        0: "",
        1: "slide-up",
        2: "slide-up",
        3: "slide-left",
        4: "slide-left",
        5: "slide-right"
      };
      return transition[this.modal];
    },
    componentInstance() {
      const instance = {
        0: "",
        1: () => import("./MobileModal/Theme"),
        2: () => import("./MobileModal/Font"),
        3: () => import("./MobileModal/Images"),
        4: () => import("./MobileModal/Comments"),
        5: () => import("./MobileModal/TOC")
      };
      return instance[this.modal];
    }
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
      modal: 0,
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
      this.modal = 0;
      this.navigation = !this.navigation;
    },
    closeNav: function() {
      this.navigation = false;
    },
    goBack: function() {
      this.$router.push(`/books/${this.$route.params.id}`);
    },

    openModal: function(type) {
      this.modal = type;
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
      this.modal = 0;
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
    user-select: none;
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
      text-align: center;
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
