<template>
  <section class="divider chapter-section" style="padding: 0 10px;">
    <div class="chapter-title" style="display:inline-block;">
      <header
        class="chapter-title__item"
        :style="{'font-family':fontStyle}"
        v-text="`${chapter.index? `第${chapter.index}話`:''} ${chapter.title}`"
      ></header>
    </div>
    <transition>
      <chapter-header
        position="header"
        v-if="chapter.header"
        title="告知・メッセージ・上書き"
        :content="chapter.footer"
      ></chapter-header>
    </transition>
    <adsbygoogle v-if="!user.status||!user" :ad-layout="'in-article'" :ad-format="'fluid'" />
    <chapter-content :content="chapter.content" :font="font" :fontStyle="fontStyle"></chapter-content>
    <adsbygoogle
      v-if="!user.status&&!chapter.locked"
      :ad-layout="'in-article'"
      :ad-format="'fluid'"
    />
    <div class="chapter-payblock" v-if="chapter.locked">
      <div class="payblock-price">
        <Currency size="large" :amount="chapter.price"></Currency>
      </div>
      <div class="payblock-buy button button--primary" @click.stop="purchase">ロック解除</div>
    </div>
    <transition>
      <chapter-header
        position="footer"
        v-if="chapter.footer"
        title="告知・メッセージ・下書き"
        :content="chapter.footer"
      ></chapter-header>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hydrateWhenVisible, hydrateSsrOnly } from "vue-lazy-hydration";

export default {
  components: {
    Currency: hydrateWhenVisible(() => import("@/components/All/Currency")),
    ChapterContent: hydrateSsrOnly(() => import("./WebUtility/ChapterContent")),
    ChapterHeader: hydrateSsrOnly(() => import("./WebUtility/ChapterHeader"))
  },
  computed: {
    ...mapGetters({
      fontStyle: "user/getFontFamily",
      modal: "chapter/getModalState",
      chapter: "chapter/getChapter",
      user: "auth/getUser",
      font: "user/getFontSize"
    })
  },
  methods: {
    ...mapActions({
      buyChapter: "wallet/buyChapter",
      fetchChapter: "chapter/fetchChapter"
    }),
    purchase: async function() {
      try {
        if (!this.$store.getters["auth/isAuthenticated"]) {
          return this.$store.commit("LOGIN_STATE");
        }
        await this.buyChapter({
          bookId: this.$route.params.id,
          chapterId: this.$route.params.chaptersId,
          amount: this.chapter.price
        });
        await this.fetchChapter({
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
.chapter-actions {
  $self: &;
  width: 100%;
  &__list {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    #{$self}__item {
      display: flex;
      // justify-content:cente
      align-items: center;
      flex-direction: column;
      font-size: 4rem;
      padding: 1rem;
      #{$self}__text {
        margin-top: 1rem;
        font-size: 1.4rem;
        text-align: center;
      }
      &--vote {
      }
      &--report {
      }
    }
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
  img {
    max-width: 90%;
    display: block;
    margin: 0 auto;
  }
  ruby {
    font-family: inherit;
    font-size: inherit;
  }
  rb {
    font-size: inherit;
    font-family: inherit;
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
