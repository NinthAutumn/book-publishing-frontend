<template>
  <section class="divider" style="padding: 0 10px;">
    <div class="chapter-title">
      <header>{{$store.state.chapter.chapter.title}}</header>
    </div>
    <div
      class="chapter-announcement chapter-announcement--header"
      v-if="$store.state.chapter.chapter.extra.announcement"
    >
      <h4>
        <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・上書き
      </h4>
      <p v-text="$store.state.chapter.chapter.extra.announcement.header"></p>
      <fa class="announcement-pin" icon="quote-right"></fa>
    </div>
    <article
      class="chapter-content"
      v-html="$store.state.chapter.chapter.content"
      style="flex-direction:column;"
    ></article>
    <div
      class="chapter-payblock flex flex--align flex-column"
      v-if="!$store.state.chapter.chapter.content"
    >
      <div class="payblock-price">
        <Currency size="large" :amount="$store.state.chapter.chapter.price"></Currency>
      </div>
      <div class="payblock-buy button button--primary" @click="purchase">ロック解除</div>
    </div>

    <div
      class="chapter-announcement chapter-announcement--footer"
      v-if="$store.state.chapter.chapter.extra.announcement"
    >
      <h4>
        <fa style="margin-right:10px;" icon="envelope"></fa>告知・メッセージ・下書き
      </h4>
      <p v-text="$store.state.chapter.chapter.extra.announcement.footer"></p>
      <fa class="announcement-pin" icon="quote-right"></fa>
    </div>
  </section>
</template>

<script>
import Currency from "@/components/All/Currency";
export default {
  components: {
    Currency
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
        await this.$store.dispatch("chapter/nextChapter", {
          chapterId: this.$route.params.chaptersId,
          userId: this.$store.state.auth.user._id
        });
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style lang="scss">
.chapter-title {
  font-size: 1px;
  text-align: center;
}

.chapter-announcement {
  position: relative;
  // background-color: ;
  padding: 20px;
  padding-top: 10px;
  // padding-bottom: 20px;
  // border-radius: 5px;
  // color: rgb(0, 31, 78);
  // color: $primary-black;
  // color: $primary;
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

    // font-family: "Noto Serif Sans" !important;
    right: 5px;
    color: $primary-lighter;
    // transform: rotate(45deg);
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
  // padding: 10px;
  // width: 50vw;
  // width:
  // padding: 5px;
  // text-align: center;
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  // font-family: "Meiryo", "Lucida Grande", "sans-serif";

  p {
    user-select: none;
    // white-space: pre-wrap;
    font-size: 16px !important;
    // font-weight: 300;
    text-align: left;
    line-height: 30px !important;
    margin-bottom: 15px !important;
  }
}
</style>
