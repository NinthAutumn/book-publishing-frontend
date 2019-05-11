<template>
  <div class="login-form">
    <div class="login-form__item">
      <h3 class="login__header text--center text--large" style>ログインをする</h3>
      <form @submit.prevent="login" class="flex flex-column" style="padding-top:20px;">
        <label for="username">ユーザー名</label>
        <input
          class="form-input form-input--primary--lighter login__input"
          type="text"
          ref="username"
          name="username"
          v-model="form.username"
          autocomplete="username"
          style="margin-bottom:15px;"
        >
        <label for="password">パスワード</label>
        <input
          class="form-input form-input--primary--lighter login__input"
          type="password"
          name="password"
          autocomplete="current-password"
          v-model="form.password"
        >
        <div class="text--center" style="margin-top:1rem;">
          <p
            class="login-forgot__password text--primary text--link"
            @click="changePage(2)"
          >パスワードを忘れた?</p>
        </div>

        <div class="flex-divider flex-row flex--right">
          <v-btn color="#8860d0" type="submit">ログイン</v-btn>
        </div>

        <!-- <input class="form-submit login__submit form-submit--primary" value="ログイン"> -->
      </form>
      <div class="text--center">
        <!-- <a href>パスワード</a> -->
        <p class="text--primary text--link" @click="changePage(1)">アカウントを作る</p>
      </div>
    </div>
    <div class="social-auth" @click="social">ログイン</div>
    <!-- <transition name="side-fade">
      <SignUpFrom v-if="auth === 1"></SignUpFrom>
    </transition>-->
  </div>
</template>

<script>
import SignUpFrom from "./SignUpFrom";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  props: {},
  components: {
    SignUpFrom: () => import("./SignUpFrom")
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    // async stateOff() {
    //   await this.$store.commit("LOGIN_FALSE");
    // },
    changePage(page) {
      this.$store.commit("SET_AUTH_PAGE", page);
    },
    async social() {
      this.$auth.loginWith("google");
    },
    async login() {
      const user = {
        username: this.form.username,
        password: this.form.password
      };
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.form.username,
            password: this.form.password
          }
        });
        this.$store.commit("LOGIN_FALSE");
        this.$router.go(0);
      } catch (error) {
        this.$message({
          message: "パスワードまたはユーザ名が間違っています",
          type: "error"
        });
      }

      // await this.$store
      //   .dispatch("nauth/login", user)
      //   .then(() => {
      //     this.$store.commit("DROPDOWN_FALSE");
      //     // this.$router.go(-1);
      //     this.$store.commit("LOGIN_FALSE");
      //   })
      //   .catch(e => {
      //     this.$message({
      //       message: "パスワードまたはユーザ名が間違っています",
      //       type: "error"
      //     });
      //   });
      // await this.$auth
      //   .loginWith("local", {
      //     data: {
      //       username: this.username,
      //       password: this.password
      //     }
      //   })
      //   .catch(e => {});
    }
  }
};
</script>

<style lang="scss">
.login-form {
  position: absolute;
  .login__header {
  }
  .v-btn__content {
    color: white;
    font-size: 1.4rem;
  }
  // color: #8dadb7;
  height: 600px;
  // padding: 30px;

  // justify-content: space-around;
  -webkit-box-shadow: 1px 1px 13px 0px #ababab;
  box-shadow: 1px 1px 13px 0px #ababab;
  background-color: white;
  padding: 10px;
  width: 100%;
  width: 440px;
  padding: 30px;

  &__item {
    // border-radius: 10px;

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;

    // height: 100%;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  label {
    font-size: 13px;
    color: $primary-lighter;
  }
  .login__input {
    // border-color: #c8cecf;
    &:focus {
      border-color: $primary;
    }
  }
  .login__submit {
    // background-color: #;
    border-radius: 0;
    margin: 10px 0;
    transition: 300ms;
    &:hover {
      box-shadow: 1px 1px 5px grey;
      transition: 300ms;
    }
  }
}
</style>
