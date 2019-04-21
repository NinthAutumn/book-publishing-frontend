<template>
  <section class="divider" style="padding: 0 10px;">
    <v-progress-linear
      style="position:fixed; top:40px;left:0;"
      color="purple"
      height="5"
      :value="Math.round(currStepProgress * 100)"
    ></v-progress-linear>
    <div class="chapter-title" style="display:inline-block;">
      <header
        class="chapter-title__item"
        :style="{'font-family':fontStyle}"
      >{{`第${$store.state.chapter.chapter.index}話: ${$store.state.chapter.chapter.title}`}}</header>
    </div>
    <div
      class="chapter-announcement chapter-announcement--header"
      v-if="$store.state.chapter.chapter.header"
    >
      <h4>
        <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・上書き
      </h4>
      <p v-text="$store.state.chapter.chapter.header"></p>
      <fa class="announcement-pin" icon="quote-right"></fa>
    </div>
    <scrollama @step-enter="stepEnterHandler" :progress="true" @step-progress="progressHandler">
      <div
        data-step="1"
        :style="{'font-size':fontSize, 'font-family':fontStyle}"
        class="chapter-content step1"
        v-html="$store.state.chapter.chapter.content"
      ></div>
    </scrollama>
    <div
      class="chapter-payblock flex flex--align flex-column"
      v-if="!$store.state.chapter.chapter.content"
    >
      <div class="payblock-price">
        <Currency size="large" :amount="$store.state.chapter.chapter.price"></Currency>
      </div>
      <div class="payblock-buy button button--primary" @click="purchase">ロック解除</div>
    </div>
    <div class="divider" v-if="$store.state.chapter.chapter.extra">
      <div
        class="chapter-announcement chapter-announcement--footer"
        v-if="$store.state.chapter.chapter.footer"
      >
        <h4>
          <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・下書き
        </h4>
        <p v-text="$store.state.chapter.chapter.footer"></p>
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
          price: this.$store.state.chapter.chapter.price
        });
        await this.$store.dispatch("chapter/fetchChapter", {
          chapterId: this.$route.params.chaptersId,
          userId: this.$store.state.auth.user._id,
          bookId: params.id
        });
      } catch (error) {
        alert(error);
      }
    },
    stepEnterHandler: async function({ element, index, direction }) {
      console.log(element, index, direction);
    },
    progressHandler: async function({ progress }) {
      this.currStepProgress = progress;
      console.log(Math.round(this.currStepProgress * 100));
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
  .payblock-price {
    margin-top: 120px;
    margin-bottom: 10px;
    // margin-bottom: 0 !important;
    font-size: 20px;
  }
  .payblock-buy {
    // height: 50px;
    width: 130px;
    font-size: 20px;
    // margin-bottom: 20px;
  }
  // margin-bottom: 50px;
  box-sizing: border-box;
  height: 400px;
  width: 100%;
}

.chapter-content {
  line-height: 30px;
  display: inline-block;
  width: 100%;
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
