<template>
  <section class="divider chapter-section" style="padding: 0 10px;">
    <v-progress-linear
      style="position:fixed!important; top:40px!important;left:0!important;"
      color="grey"
      height="5"
      :value="currStepProgress * 100"
      v-if="!modal&&!chapter.locked"
    ></v-progress-linear>

    <div class="chapter-title" style="display:inline-block;">
      <header
        class="chapter-title__item"
        :style="{'font-family':fontStyle}"
        v-if="chapter.index"
      >{{`第${chapter.index}話: ${chapter.title}`}}</header>
      <header v-else class :style="{'font-family':fontStyle}">{{chapter.title}}</header>
    </div>
    <div class="chapter-announcement chapter-announcement--header" v-if="chapter.header">
      <h4>
        <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・上書き
      </h4>
      <p v-text="chapter.header"></p>
      <fa class="announcement-pin" icon="quote-right"></fa>
    </div>
    <scrollama
      @step-enter="stepEnterHandler"
      @step-leave="stepLeaveHandler"
      :progress="true"
      v-if="!chapter.locked"
      @step-progress="progressHandler"
    >
      <adsbygoogle v-if="!user.status" :ad-layout="'in-article'" :ad-format="'fluid'"/>
      <div
        data-step="1"
        :style="{'font-size':font + 'px', 'font-family':fontStyle}"
        class="chapter-content step1"
        ref="chapterContent"
        v-html="chapter.content"
      ></div>
      <!-- <partial name="chapter"></partial> -->

      <adsbygoogle v-if="!user.status" :ad-layout="'in-article'" :ad-format="'fluid'"/>
    </scrollama>
    <div class="chapter-payblock" v-if="chapter.locked">
      <div class="payblock-price">
        <Currency size="large" :amount="chapter.price"></Currency>
      </div>
      <div class="payblock-buy button button--primary" @click.stop="purchase" :class="{}">ロック解除</div>
    </div>
    <div class="divider" v-if="chapter.extra">
      <div class="chapter-announcement chapter-announcement--footer" v-if="chapter.footer">
        <h4>
          <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・下書き
        </h4>
        <p v-text="chapter.footer"></p>
        <fa class="announcement-pin" icon="quote-right"></fa>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
// import Vue from 'vue'
//
// import Vue from "vue";
export default {
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      modal: "chapter/getModalState",
      chapter: "chapter/getChapter",
      user: "user/loggedInUser",
      font: "user/getFontSize"
    })
  },

  watch: {},
  data() {
    return {
      currStepProgress: null
    };
  },
  async mounted() {
    // let pCount = this.$refs.chapterContent.childElementCount;
    // let child = this.$refs.chapterContent.children;
    // let count = 0;
    // for (let i = 0; i < pCount; i++) {
    //   if (i === Math.ceil(pCount / 2)) {
    //     let node = child[i];
    //     node.insertAdjacentHTML("beforebegin", `<div id="mount" ></div>`);
    //   }
    // }
    // const google = Vue.extend(adsbygoogle);
    // const instance = new google({});
    // instance.$mount("#mount");
    // const val = document.querySelector();
    // val.appendChild(instance.$el);
  },
  methods: {
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
    },
    stepEnterHandler: async function({ element, index, direction }) {
      // console.log(element, index, direction);
    },
    stepLeaveHandler: async function({}) {},
    progressHandler: async function({ progress }) {
      this.currStepProgress = progress;
    }
  }
};
</script>

<style lang="scss">
.chapter-title {
  width: 100%;
  text-align: center;
  &__item {
    font-size: 22px !important;
    text-align: center;
  }
}
.chapter-wrapper {
}

// .chapter-s
.chapter-announcement {
  position: relative;
  padding: 20px;
  padding-top: 10px;
  -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.08);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);

  font-family: "Noto Sans JP" !important;
  border-radius: 1rem;
  &--header {
    margin-bottom: 10px;
  }
  &--footer {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .announcement-pin {
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
    color: $primary-lighter;
  }

  h4 {
    font-family: "Noto Sans JP", "sans-serif" !important;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  p {
    font-family: "Noto Sans JP", "sans-serif" !important;
    font-size: 16px;
    margin: 0 !important;
  }
}

.chapter-payblock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  // margin-bottom: 350px;
  min-height: 70vh;
  user-select: none;
  &:after {
    width: 80vw;
    content: "";
  }
  .payblock-price {
    font-size: 20px;
  }
  .payblock-buy {
    width: 130px;
    font-size: 20px;
  }
  // margin-bottom: 50px;
}

.chapter-content {
  line-height: 30px;
  // display: inline-block;
  // ::after {
  //   content: "";
  //   position: relative;
  //   width: 100vw;
  // }
  //

  word-break: break-all;
  box-sizing: border-box;
  ruby {
    font-family: inherit;
    font-size: inherit;
  }
  p {
    font-family: inherit;
    font-size: inherit;
    user-select: none;
    display: block;
    line-height: 30px;
    max-width: 100%;
    margin-bottom: 15px;
  }
}
</style>
