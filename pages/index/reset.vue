<template>
  <div class="reset-modal dialog dialog__container">
    <div class="dialog__content reset-modal__container">
      <div class="reset-modal__header flex-row flex--between flex--align">
        <header class="reset-modal__title">パスワードをリセットする</header>
        <fa class="reset-modal__icon" icon="times" @click="$router.push('/')"></fa>
      </div>
      <div class="reset-modal__form flex-column">
        <label for="password">新しいパスワード</label>
        <input
          v-model="password"
          type="password"
          v-validate="'required|min:6|'"
          data-vv-as="パスワード"
          name="password"
          class="reset-modal__input reset-modal__input--new elevation-1"
          :class="{'reset-modal__input--error':errors.has('password')}"
          ref="password"
        />
        <span
          v-show="errors.has('password')"
          class="reset-modal__error"
        >{{ errors.first('password') }}</span>
        <label for>パスワードの確認</label>
        <input
          v-model="cpassword"
          type="password"
          data-vv-as="パスワード確認"
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          class="reset-modal__input reset-modal__input--confirm elevation-1"
          :class="{'reset-modal__input--error':errors.has('password_confirmation')}"
        />
        <span
          v-show="errors.has('password_confirmation')"
          class="reset-modal__error"
        >{{ errors.first('password_confirmation') }}</span>
        <div class="flex-divider flex-row flex--right">
          <div class="reset-modal__submit" @click="resetPassword">パスワードを更新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    resetPassword: async function() {
      try {
        await this.$validator.validateAll();
        if (this.errors.any()) {
          return;
        }
        await this.$store.dispatch("auth/setPassword", {
          token: this.token,
          password: this.password
        });
        this.$toast.success("パスワードの変更に成功しました");
        this.$store.commit("LOGIN_STATE");

        this.$router.push("/");
      } catch (error) {
        return this.$toast.error(error);
      }
    }
  },
  mounted() {
    this.token = this.$route.query.token;
  }
};
</script>

<style lang="scss">
.reset-modal {
  $self: &;
  &__container {
    min-width: 33rem;
    // min-height: 33rem;

    #{$self}__header {
      font-size: 1.6rem;
      margin-bottom: 2rem;
      #{$self}__title {
        text-align: center;
        font-size: 1.6rem;
        // margin-bottom: 1rem;
      }
      #{$self}__icon {
        cursor: pointer;
      }
    }
    #{$self}__form {
      #{$self}__error {
        font-size: 1.4rem;
        color: orangered;
        margin-bottom: 1rem;
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
      #{$self}__submit {
        padding: 1rem 1.2rem;
        font-size: 1.4rem;
        background-color: $secondary;
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        &:hover {
          cursor: pointer;
        }
      }
      #{$self}__input {
        // height: 47px;
        padding: 1rem 1.2rem;
        color: #32325d;
        background-color: white;
        border: 1px solid transparent;
        width: 100%;
        border-radius: 4px;
        // box-shadow: 0 1px 3px 0 #d9d1dd;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
        font-size: 1.6rem;
        transition: 300ms;
        margin-bottom: 1rem;
        // margin-bottom: 2rem;
        border-left: 5px solid #f5f5f5;

        &--error {
          border-left: 5px solid #ff6160;
          &:focus {
            border-left: 5px solid #ff6160 !important;
          }
        }
        &:focus {
          border-left: 5px solid $secondary;
        }
        &:focus,
        &:hover {
          outline: none;

          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025) !important;
          transition-duration: 0.15s;
          transition: 300ms;
        }
      }
    }
  }
}
</style>
