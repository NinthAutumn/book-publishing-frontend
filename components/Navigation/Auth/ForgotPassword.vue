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
    <div v-show="errors.has('email')" class="fg-modal__error is-danger">{{ errors.first('email') }}</div>
    <div class="fg-modal__email-form flex-column">
      <label for="email">メールアドレス*</label>
      <input
        name="email"
        :class="{'fg-modal__input--error':errors.any()}"
        v-validate="'email|required'"
        class="fg-modal__input elevation-1"
        type="email"
        data-vv-as="記入されたメールアドレス"
        v-model="email"
        placeholder="メールアドレス"
        ref="email"
      />
    </div>

    <div class="flex-divider flex-row flex--right">
      <v-btn @click="getToken" color="#C1C9E4">再設定メールを送信</v-btn>
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
      this.$store.commit("SET_AUTH_PAGE", 1);
    },
    async getToken() {
      try {
        await this.$validator.validateAll();
        if (this.errors.any()) {
          return;
        }
        await this.$store.dispatch("auth/setPasswordToken", {
          email: this.email
        });
      } catch (error) {
        return this.$toast.error(error, { icon: "extension" });
      }
    }
  },
  mounted() {
    this.$refs.email.focus();
  }
};
</script>

<style lang="scss">
.fg-modal {
  padding: 3rem;
  height: 90%;
  width: 100%;
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
  &__error {
    text-align: center;
    font-size: 14px;
    line-height: 2rem;
    padding: 1rem;
    background-color: #f6f9fc;
    border-radius: 1rem;
  }
  &__input {
    height: 47px;
    padding: 12px 14px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
    // box-shadow: 0 1px 3px 0 #d9d1dd;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;
    transition: 300ms;
    margin-bottom: 2rem;
    border-left: 5px solid #f5f5f5;
    &--error {
      border-left: 5px solid orangered;
      &:focus {
        border-left: 5px solid orangered !important;
      }
    }
    &:focus,
    &:hover {
      border-left: 5px solid #5580e9;
      outline: none;
      -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025) !important;
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025) !important;
      -webkit-transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, box-shadow, transform;
      transition-property: color, background-color, box-shadow, transform,
        -webkit-box-shadow, -webkit-transform;
      -webkit-transition-duration: 0.15s;
      transition-duration: 0.15s;
      transition: 300ms;
    }
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
}
</style>
