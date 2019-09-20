<template>
  <div id="setting-page" class="setting-page page-padding">
    <div class="setting-page__container">
      <sticky-nav class="setting-page__nav" @select="selectNavHander" :list="nav"></sticky-nav>
      <div class="setting-page__header">
        <div class="setting-page__title">アカウント設定</div>
      </div>

      <div class="setting-page__content">
        <nuxt-child></nuxt-child>
      </div>
      <div class="setting-page__footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { value: "アカウント", key: "account", link: "/auth/user/setting" },
        {
          value: "有料会員",
          key: "subscription",
          link: "/auth/user/subscription"
        },
        {
          value: "購入歴史",
          key: "transaction",
          link: "/auth/user/transaction"
        },
        { value: "支払い方法", key: "payment", link: "/auth/user/payment" }
      ]
    };
  },
  components: {
    StickyNav: () => import("@/components/Web/Layout/Nav/StickyRight")
  },
  methods: {
    selectNavHander() {}
  },
  async fetch({ store }) {
    await store.dispatch("user/fetchUserProfile");
  }
};
</script>

<style lang="scss">
.setting-page {
  $self: &;
  // padding-right: 2rem;
  // padding-top: 1rem;

  &__container {
    display: grid;
    grid-template-areas:
      "header header nav" "content content content"
      "footer footer footer";
    width: 100%;
  }
  &__footer {
    grid-area: footer;
  }
  &__header {
    grid-area: header;
    #{$self}__title {
      font-size: 1.8rem;
    }
  }
  &__nav {
    justify-self: flex-end;
    grid-area: nav;
  }
  &__content {
    grid-area: content;
    &--account {
    }
    #{$self}__form {
      width: 30vw;
    }
  }
}
</style>
