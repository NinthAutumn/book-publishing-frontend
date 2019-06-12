<template>
  <section class="mobile-chapter" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
    <transition name="slide-down">
      <div class="mobile-chapter__top" :class="'mobile-chapter__top--'+ theme" v-if="navigation">
        <div class="mobile-chapter__navigation" @click="goBack">
          <fa icon="arrow-left"></fa>
        </div>
        <div class="mobile-chapter__meta">
          <!-- <div class="mobile-chapter__select" v-ripple >
            <fa icon="bookmark"></fa>
          </div>-->
          <div class="mobile-chapter__select" v-ripple @click="actionHandler">
            <fa icon="flag"></fa>
          </div>
          <div class="mobile-chapter__select" v-ripple @click="actionHandler('vote')">
            <fa icon="bolt"></fa>
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <TOC v-if="table" v-model="table"></TOC>
    </transition>

    <div
      class="mobile-chapter__wrapper"
      ref="chapter"
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
          <div class="mobile-chapter__option" v-ripple @click="openModal">
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
    <div class="mobile-chapter__actions flex-row flex--align flex--center">
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
      <transition name="grow-shrink">
        <div v-if="problem" class="report-dialog dialog dialog__container">
          <div v-click-outside="actionHandler" class="report-dialog__container dialog__content">
            <div v-loading="loading" @submit.prevent class="report-dialog__form flex-column">
              <label class="flex-row flex--between flex--align">
                報告の理由
                <span>
                  <fa @click="actionHandler" class="report-dialog__close" icon="times"></fa>
                </span>
              </label>
              <v-radio-group v-model="report.problem">
                <v-radio v-for="n in problems" :key="n" :label="n" :value="n"></v-radio>
              </v-radio-group>
              <textarea
                v-model="report.moreInfo"
                placeholder="詳しく報告の理由"
                v-if="report.problem === 'その他'"
                name="problem"
                id
              ></textarea>
              <div class="flex-divider flex-row report-dialog__button">
                <button
                  class="report-dialog__submit report-dialog__submit--close"
                  @click="actionHandler"
                >キャンセル</button>
                <button class="report-dialog__submit" @click="reportHandler">報告</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Currency: () => import("@/components/All/Currency"),
    TOC: () => import("@/components/ChapterPage/MobileModal/TOC")
  },
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      theme: "user/getTheme",
      modal: "chapter/getModalState",
      chapter: "chapter/getChapter",
      user: "user/loggedInUser",
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
      problems: [
        "差別的または攻撃的な内容",
        "テロリズムの助長",
        "スパムや誤解を招く話",
        "児童虐待",
        "その他"
      ],
      loading: false,
      selected: 0,
      height: "100%",
      problem: false,
      report: {
        problem: "",
        moreInfo: ""
      },
      actions: {
        リポート: {
          icon: "flag",
          message: "この話を報告",
          type: "report"
        },
        投票: {
          icon: "bolt",
          message: "この作品に投票を掛ける",
          type: "vote"
        }
      }
    };
  },
  watch: {
    // table: function(val) {
    //   if (val) {
    //     this.navigation = false;
    //   }
    // }
  },
  mounted: async function() {
    // this.height = this.$refs.chapter.clientHeight + "px";
    await this.$store.dispatch("chapter/fetchUnstructuredList", {
      bookId: this.$route.params.id
    });
    this.simpleList.forEach(val => {
      this.list.push(val.index);
    });
    this.min = this.simpleList[0];
    this.max = this.list[this.list.length - 1];
    this.selected = this.chapter.index;
    this.chapter.content.split("<p></p>");
  },
  methods: {
    change: function() {
      this.simpleList.forEach(chap => {
        if (chap.index === this.selected) {
          this.$router.push(`/books/${this.$route.params.id}/${chap.id}`);
        }
      });
    },
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
    openModal: function(type) {
      switch (type) {
        default:
          this.table = !this.table;
          this.navigation = !this.navigation;
          break;
      }
    },
    actionHandler: async function(type) {
      if (!this.auth) {
        return this.$router.push("/auth/login");
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
    reportHandler: async function() {
      try {
        const report = {
          type: "chapter",
          reportId: this.chapter.id,
          problem: this.report.problem,
          moreInfo: this.report.moreInfo
        };
        try {
          this.loading = true;
          await this.$store.dispatch("report/postReport", { report });
          this.loading = false;
          this.problem = !this.problem;
          return this.$toast.show("報告に成功しました", {
            theme: "toasted-primary",
            position: "bottom-center",
            duration: 1000,
            icon: "check_circle"
          });
        } catch (error) {}
      } catch (error) {}
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
      line-height: 2.5rem;
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
  &__bottom {
    position: fixed;
    bottom: 0;
    height: 12rem;
    left: 0;
    width: 100vw;
    z-index: 100;
    &--black {
      background-color: #19191a;
      color: #949698;
    }
    &--tan {
      background-color: #e9e1b8;
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
.report-dialog {
  $self: &;
  .v-label {
    line-height: 25px;
  }
  #{$self}__container {
    border-radius: 2rem;
    max-width: 95%;
    // bottom: ;
    #{$self}__form {
      font-size: 3vh;

      span {
        padding: 0.5rem 0.75rem;
        border-radius: 10rem;
        background-color: #e3e8ee;
      }
      #{$self}__close {
        font-size: 2vh;
        color: #4f566b;
      }
      label {
        font-size: 3vh;
      }
      textarea {
        font-size: 3vh;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
      #{$self}__button {
        width: 100%;
        height: 7vh;
        border-radius: 1rem;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      #{$self}__submit {
        font-size: 3vh;
        // align-self: flex-end;
        // padding: 0 2rem;
        width: 50%;
        background-color: #566cd6;
        color: white;
        &--close {
          background-color: white;
          color: #566cd6;
          // align-self: flex-start;
        }
      }
    }

    // background-color:;
  }
}
.mobile-chapter__toasted {
  height: 8vh !important;
  width: 96% !important;
  border-radius: 1rem !important;
  margin: 0 auto;
}
</style>
