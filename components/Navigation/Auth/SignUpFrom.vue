<template>
  <div class="sign-up">
    <form @submit.prevent="signUp" class="signup-form">
      <div @click="signOff" class="flex-row go-back">
        <div class="divider">
          <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
        </div>
        <div class="divider">
          <p>戻る</p>
        </div>
      </div>

      <p class="signup-title text--center text--large">アカウントを作る</p>
      <div class="flex-divider signup-form__control">
        <label for="username">ユーザー名</label>
        <input
          ref="username"
          name="username"
          v-validate="'required|min:3'"
          placeholder="ユーザー名"
          data-vv-as="ユーザー名"
          class="signup-form__input signup-form__input--username elevation-1"
          :class="{'signup-form__input--error': errors.has('username')}"
          type="text"
          v-model="username"
        >
        <span v-if="errors.first('username')" class="help is-danger">{{ errors.first('username') }}</span>
        <span
          v-else-if="!usernameAvailable&&username.length>3"
          class="help is-danger"
        >このユーザー名はもう使われています</span>
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
        >
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
        >
        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </div>

      <div class="flex-divider flex-row flex--right">
        <v-btn
          type="submit"
          color="#8860d0"
          class
          :class="{active: errors.any()||!username||!email||!password}"
        >サインイン</v-btn>
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
      first_name: ""
    };
  },
  watch: {
    username: async function(username) {
      this.$store.dispatch("user/checkUsername", { username });
    }
  },
  computed: {
    isFormInValid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    ...mapGetters({
      usernameAvailable: "user/isUsernameAvailable"
    })
  },
  methods: {
    async google() {
      // this.$auth.loginWith("google");
    },
    ...mapActions({
      create: "auth/signup",
      user: "user/fetchUser"
    }),
    async signUp() {
      // const isValid = await this.$refs.observer.validate();
      await this.$validator.validateAll();
      if (!this.errors.any()) {
        try {
          let user = {
            username: this.username,
            email: this.email,
            password: this.password
          };
          const postUser = await this.$store.dispatch("auth/signup", { user });

          // this.$router.go(0);
        } catch (error) {
          this.$message({
            message: "アカウント作成に失敗",
            type: "error"
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
  .signup-form__input {
    height: 47px;
    padding: 12px 14px;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
  padding: 3rem;

  .help {
    color: red;
    font-size: 16px;
    margin-top: 5px;
  }
  // transition: 300ms;
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
    // grid-column-start: 2;
    // grid-row-start: 2;
    input {
      padding-left: 5px;
      // font-size: 16px;
      // height: 30px;
      // border: 1px solid grey;
      // margin-bottom: 10px;

      // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      // border-radius: 10px;
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
