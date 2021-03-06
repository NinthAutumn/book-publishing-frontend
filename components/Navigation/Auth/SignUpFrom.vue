<template>
  <div class="sign-up" :class="{'sign-up--mobile':$device.isMobile}">
    <form @submit.prevent="signUp" class="signup-form" v-loading="loading">
      <div @click="signOff" class="flex-row go-back">
        <div class="divider flex-row flex--align">
          <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
        </div>
        <div class="divider">
          <p>戻る</p>
        </div>
      </div>

      <p class="signup-title text--center text--large">アカウントを作る</p>
      <div
        class="sign-up__create-error"
        style="text-align:center;font-size:14px;padding:1rem;background-color:#F6F9FC;border-radius:1rem;"
        v-if="createError"
      >{{createError}}</div>
      <div class="flex-divider signup-form__control">
        <label for="username">ユーザー名</label>
        <input
          ref="username"
          name="username"
          v-validate="'required|min:3|alpha_dash'"
          placeholder="ユーザー名"
          data-vv-as="ユーザー名"
          class="signup-form__input signup-form__input--username elevation-1"
          :class="{'signup-form__input--error': errors.has('username')||usernameAvailable}"
          type="text"
          v-model="username"
        />
        <span v-if="errors.first('username')" class="help is-danger">{{ errors.first('username') }}</span>
        <span v-else-if="usernameAvailable" class="help is-danger">このユーザー名はもう使われています</span>
      </div>
      <div class="flex-divider signup-form__control">
        <label for="email">メールアドレス</label>
        <input
          name="email"
          v-validate="'required|email'"
          class="signup-form__input elevation-1"
          type="email"
          placeholder="メールアドレス"
          data-vv-as="記入されたメールアドレス"
          :class="{'signup-form__input--error': errors.has('email')}"
          v-model="email"
        />
        <span class="help is-danger">{{ errors.first('email') }}</span>
      </div>
      <div class="flex-divider signup-form__control">
        <label for="password">パスワード</label>
        <input
          class="signup-form__input elevation-1"
          name="password"
          v-validate="'required||min:6'"
          type="password"
          :class="{'signup-form__input--error': errors.has('password')}"
          v-model="password"
          placeholder="パスワード"
          data-vv-as="パスワード"
          ref="password"
        />
        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </div>

      <div class="flex-divider flex-row flex--right">
        <v-btn
          type="submit"
          color="#8860d0"
          class
          :class="{active: errors.any()||!username||!email||!password}"
        >サインアップ</v-btn>
      </div>
    </form>
    <!-- <button @click="google">グーグろでサインイン</button> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      validated: false,
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
      last_name: "",
      first_name: "",
      loading: false,
      createError: ""
    };
  },
  watch: {
    username: async function(username) {
      if (username.length > 2) {
        await this.$store.dispatch("user/checkUsername", { username });
      }
    }
  },
  loading: false,
  computed: {
    isFormInValid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    ...mapGetters({
      usernameAvailable: "user/userNameExists"
    })
  },
  methods: {
    async google() {
      // this.$auth.loginWith("google");
    },
    ...mapActions({
      create: "auth/signup",
      user: "auth/fetchUser"
    }),
    async signUp() {
      await this.$validator.validateAll();
      if (!this.errors.any()) {
        this.createError = "";
        try {
          this.loading = true;
          let user = {
            username: this.username,
            email: this.email,
            password: this.password
          };
          const { error } = await this.$store.dispatch("auth/signup", { user });
          if (error) {
            this.loading = false;
            this.createError = error;
            return this.$toast.show(error, {
              duration: 3000,
              theme: "toasted-primary",
              icon: "extension",
              position: "top-right"
            });
          }
          this.loading = false;
          this.$emit("setEmail", { email: this.email });
          this.$store.commit("SET_AUTH_PAGE", 4);
          return this.$toast.show(
            "Eメール確認が必要なので登録されたメールアドレスに確認メールが送られました",
            {
              duration: 4000,
              theme: "toasted-primary",
              icon: "check_circle",
              position: "top-right"
            }
          );

          // this.$router.go(0);
        } catch (error) {
          this.$toast.show("アカウント作成に失敗", {
            duration: 1000,
            theme: "toasted-primary",
            icon: "extension",
            position: "top-right"
          });
        }
      }
    },
    signOff() {
      this.$store.commit("SET_AUTH_PAGE", 0);
    }
  },
  mounted() {
    this.$refs.username.focus();
  }
};
</script>

<style lang="scss">
@keyframes goback {
  to {
    transform: translateX(-2px);
  }
  from {
    transform: translateX(2px);
  }
}
.go-back {
  color: $primary-lighter;
  fill: $primary-lighter;
  transition: 100ms;
  &:hover {
    cursor: pointer;
    animation: goback 500ms ease-in;
    // animation-iteration-count: infinite;
    color: $primary;
    fill: $primary;
    transition: 100ms;
  }
}
.zond-back {
  height: 20px;
}
.sign-up {
  $self: &;
  max-width: 44rem;
  max-height: 60rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
  padding: 3rem;

  &--mobile {
    padding: 1.5rem !important;
  }
  .signup-form__input {
    height: 47px;
    padding: 12px 14px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    width: 100%;
    border-radius: 4px;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;
    transition: 300ms;
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
    }
  }
  .signup-form__control {
    margin-bottom: 2rem;
    width: 100%;
  }
  .v-btn__content {
    color: white;
    font-size: 1.4rem;
  }
  .active {
    background-color: #fff;
    color: black;
  }

  .help {
    color: red;
    font-size: 16px;
    margin-top: 5px;
  }
  .signup-title {
    font-weight: bold;
  }
  .signup-form {
    display: flex;
    flex-direction: column;
    // grid-area: main;

    height: 100%;
    // padding: 30px;
    width: 100%;
    box-sizing: border-box;

    input {
      padding-left: 5px;
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
    .signup-button {
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
