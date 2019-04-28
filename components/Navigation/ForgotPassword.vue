<template>
  <div class="fg-modal">
    <div @click="signOff" class="flex-row go-back">
      <div class="divider">
        <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
      </div>
      <div class="divider">
        <p>戻る</p>
      </div>
    </div>
    <div class="fg-modal__title text--center text--large">パスワードを忘れた</div>
    <p class="fg-modal__desc">
      登録済みアカウントのメールアドレスを入力してください。
      パスワードを再設定する手順をお送りいたします。
    </p>
    <div class="fg-modal__email-form flex-column">
      <label for="email">メールアドレス*</label>
      <input
        name="email"
        v-validate="'email'"
        class="form-input form-input--primary--lighter"
        type="email"
        data-vv-as="記入されたメールアドレス"
        v-model="email"
        placeholder="メールアドレス"
      >
    </div>
    <div class="flex-divider flex-row flex--right">
      <v-btn color="#C1C9E4">再設定メールを送信</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    signOff() {
      this.$store.commit("SET_AUTH_PAGE", 0);
    }
  }
};
</script>

<style lang="scss">
.fg-modal {
  padding: 3rem;
  height: 600px;
  width: 440px;
  background-color: #fff;
  -webkit-box-shadow: 1px 1px 13px 0px #ababab;
  box-shadow: 1px 1px 13px 0px #ababab;
  box-sizing: border-box;
  .v-btn__content {
    color: white;
    font-size: 1.4rem;
  }
  &__title {
    // font-size: ;
    font-weight: bold;
  }
  &__desc {
    margin: 2rem 0;
    font-size: 1.4rem;
  }
  &__button {
    font-size: 1.4rem;
  }
  label {
    font-size: 13px;
    color: $primary-lighter;
  }
}
</style>
