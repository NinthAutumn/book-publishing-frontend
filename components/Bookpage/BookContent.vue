<template>
  <div class="book-content">
    <div class="book-content__left flex flex-column divider">
      <div class="book-content--text">
        <transition name="fade">
          <div v-show="bookSynopsis" class="book-content--text__summary">
            <p class="book-content--text__summary--text">{{book.synopsis}}</p>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-show="!bookSynopsis" class="book-content--text__statistics">
            <span class="book-content--text__statistics--title">視聴者</span>
            <p>探なゃたむ間国民ラれい母細すょ立聞ルフる娯洋ヒラタ念今どざご務軒ス了近っ引質景メ投戦モヲサウ介無著もむかよ及客レア成完撃平侑べずへ。覚ヒセ昨果オイワ堂器わぐ下載スオヘ要敦ぜ育与レヌオア禁福ノホトタ上89強総シオ法木辛ドょぴぽ転期省べぶ。39仏げく代勤べみす健映拭暮42妨ぼる極東レこ向田ロウ呉増ア就主アテ品77浜負件中6人げけへや級権ご人首じ文塚モラセヱ書納動と遅乗にぎょ。</p>
          </div>
        </transition>
      </div>
      <div class="book-content__buttons">
        <span
          class="book-content__buttons__item button button--primary--open button--shadow button--big"
        >登録</span>
        <span
          @click="bookmarkBook"
          class="book-content__buttons__item button button--shadow button--big"
          :class="{'button--secondary': bookmarked, 'button--secondary--open': !bookmarked}"
        >
          <fa class style="font-size:15px;" icon="bookmark"></fa>
          <span style="font-size:13px;" v-if="!bookmarked">ブックマーク</span>
          <span style="font-size:13px;" v-else>ブックマーク済み</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // book: Object
  },
  data() {
    return {
      bookmarked: this.$store.state.book.book.bookmarked
    };
  },
  computed: {
    bookSynopsis() {
      return this.$store.state.book.bookSynopsis;
    },
    book() {
      return this.$store.state.book.book;
    }
  },
  methods: {
    async bookmarkBook() {
      const store = {
        storeType: "bookmark",
        bookId: this.$store.state.book.book._id
      };
      if (this.$store.state.loggedIn === false) {
        this.$message({
          message: `ブックマークをするにはログインかアカウント作成が必要です`,
          type: "error"
        });
        return this.$store.commit("LOGIN_STATE");
      } else {
        if (this.bookmarked) {
          const remove = await this.$store.dispatch(
            "library/removeStore",
            store
          );
          this.bookmarked = false;
        } else {
          this.bookmarked = true;
          await this.$store
            .dispatch("library/addStore", store)
            .then(async () => {
              this.$store.commit("book/BOOKMARK");
              this.$message({
                message: "ブックマークに入りました！",
                type: "success"
              });
            })
            .catch(e => {
              this.$message({
                message: `ブックマークを失敗しました`,
                type: "error"
              });
            });
        }
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
.hidden {
  display: none;
}
.book-author {
  // position: absolute;
  border-radius: 100px;
  width: 100px;
  box-shadow: 1px 1px 5px 0 rgb(177, 177, 177);
}
.book-content {
  width: 100%;

  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  &__buttons {
    // position: absolute;
    display: flex;
    // justify-content: ;
    align-items: center;
    justify-content: flex-end;

    // float: left;
    // right: 20px;
    // bottom: -5px;
    // z-index: 2000;
    &__item {
      // height: 25px;
      width: 140px;
      margin-left: 10px;
    }
  }
  &__left {
    justify-content: space-between;
  }

  &--text {
    // padding: 5px 10px;s
    // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // -moz-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
    // width: 802.812px;
    height: 240px;
    overflow: hidden;
    flex-grow: 1;
    line-height: 30px;

    // text-overflow: ellipsis;
    // position: relative;
    /* line-clamp: 2; */
    // white-space: nowrap;
    &__summary {
      &--text {
        // display: none;
        font-size: 16px;
        line-height: 30px;
        font-weight: 300;
        text-align: left;
      }
    }
    &__statistics {
      // display: none;
      // height: 250px;

      p {
        text-align: left !important;
        font-size: 16px;
        line-height: 28px;
        font-weight: 300;
      }

      &--title {
        font-size: 18px;
      }
    }
  }
}
</style>
