<template>
  <section class="divider" style="padding: 0 10px;">
    <v-progress-linear
      style="position:fixed!important; top:40px!important;left:0!important;"
      color="purple"
      height="5"
      :value="currStepProgress * 100"
      v-if="!modal&&!chapter.locked"
    ></v-progress-linear>

    <div class="chapter-title" style="display:inline-block;">
      <header
        class="chapter-title__item"
        :style="{'font-family':fontStyle}"
      >{{`第${chapter.index}話: ${chapter.title}`}}</header>
    </div>
    <div class="chapter-announcement chapter-announcement--header" v-if="chapter.header">
      <h4>
        <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・上書き
      </h4>
      <p v-text="chapter.header"></p>
      <fa class="announcement-pin" icon="quote-right"></fa>
    </div>
    <scrollama @step-enter="stepEnterHandler" :progress="true" @step-progress="progressHandler">
      <div
        data-step="1"
        :style="{'font-size':fontSize, 'font-family':fontStyle}"
        class="chapter-content step1"
        v-html="chapter.content"
      ></div>
    </scrollama>
    <div class="chapter-payblock" v-if="chapter.locked">
      <div class="payblock-price">
        <Currency size="large" :amount="chapter.price"></Currency>
      </div>
      <div class="payblock-buy button button--primary" @click="purchase" :class="{}">ロック解除</div>
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
export default {
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  created() {},
  computed: {
    fontSize() {
      return this.$store.getters["user/getFontSize"] + "px";
    },
    fontStyle() {
      return this.$store.getters["user/getFontFamily"];
    },
    modal() {
      return this.$store.getters["chapter/getModalState"];
    },
    chapter() {
      return this.$store.getters["chapter/getChapter"];
    }
  },
  watch: {},
  data() {
    return {
      currStepProgress: null
    };
  },
  created() {},
  methods: {
    purchase: async function() {
      try {
        await this.$store.dispatch("wallet/buyChapter", {
          bookId: this.$route.params.id,
          chapterId: this.$route.params.chaptersId,
          amount: this.$store.state.chapter.chapter.price
        });
        await this.$store.dispatch("chapter/fetchChapter", {
          chapterId: this.$route.params.chaptersId,
          userId: this.$store.state.auth.user.id,
          bookId: this.$route.params.id
        });
      } catch (error) {
        this.$message({
          message: error,
          type: "error"
        });
      }
    },
    stepEnterHandler: async function({ element, index, direction }) {
      // console.log(element, index, direction);
    },
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

.chapter-announcement {
  position: relative;
  padding: 20px;
  padding-top: 10px;
  box-shadow: 1px 1px 10px 0px rgb(207, 207, 207);
  font-family: "Noto Sans JP" !important;
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
  margin-bottom: 350px;
  user-select: none;
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
  display: inline-block;
  // ::after {
  //   content: "";
  //   position: relative;
  //   width: 100vw;
  // }
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
    margin-bottom: 15px;
  }
}
</style>
