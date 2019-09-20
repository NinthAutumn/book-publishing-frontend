<template>
  <section class="divider chapter-section" style="padding: 0 10px;">
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
    <adsbygoogle v-if="!user.status||!user" :ad-layout="'in-article'" :ad-format="'fluid'" />
    <div
      data-step="1"
      :style="{'font-size':font + 'px', 'font-family':fontStyle}"
      class="chapter-content step1"
      ref="chapterContent"
      v-html="chapter.content"
    ></div>
    <adsbygoogle
      v-if="!user.status&&!chapter.locked"
      :ad-layout="'in-article'"
      :ad-format="'fluid'"
    />
    <div v-if="!chapter.locked" class="chapter-actions"></div>
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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Currency: () => import("@/components/All/Currency")
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
      fetchChapter: "chapter/FetchChapter"
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
.chapter-announcement {
  position: relative;
  padding: 20px;
  padding-top: 10px;
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
