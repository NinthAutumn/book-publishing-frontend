<template>
  <div class="sign-up">
    <form @submit.prevent="signUp" class="signup-form">
      <div @click="signOff" class="flex go-back">
        <div class="divider">
          <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
        </div>
        <div class="divider">
          <p>戻る</p>
        </div>
      </div>

      <p class="signup-title">Signup to Lyfr</p>

      <label for="username">ユーザー名</label>
      <input
        ref="username"
        name="username"
        v-validate="'required'"
        data-vv-as="ユーザー名"
        class="form-input form-input--primary--lighter"
        type="text"
        v-model="username"
      >
      <span class="help is-danger">{{ errors.first('username') }}</span>
      <label for="email">メールアドレス</label>
      <input
        name="email"
        v-validate="'email'"
        class="form-input form-input--primary--lighter"
        type="email"
        data-vv-as="記入されたメールアドレス"
        v-model="email"
      >
      <span class="help is-danger">{{ errors.first('email') }}</span>
      <label for="password">パスワード</label>
      <input
        class="form-input form-input--primary--lighter"
        name="password"
        v-validate="'required||min:6'"
        type="password"
        :class="{'is-danger': errors.has('password')}"
        v-model="password"
        data-vv-as="パスワード"
        ref="password"
      >
      <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      <input
        type="submit"
        value="サインイン"
        class="signup-button form-submit form-submit--primary"
        :class="{active: errors.any()||!username||!email||!password}"
      >
    </form>
    <!-- <button @click="google">グーグろでサインイン</button> -->
  </div>
</template>

<script>
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
  computed: {
    isFormInValid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  },
  methods: {
    async google() {
      // this.$auth.loginWith("google");
    },
    async signUp() {
      // const isValid = await this.$refs.observer.validate();
      await this.$validator.validateAll();
      if (!this.errors.any()) {
        await this.$axios
          .post("/auth/signup", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(async () => {
            await this.$auth
              .loginWith("local", {
                data: {
                  username: this.username,
                  password: this.password
                }
              })
              .then(() => {
                window.location.reload(true);
              });
          });
      }
    },
    signOff() {
      this.$store.commit("START");
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
  position: absolute;
  .active {
    background-color: #fff;
    color: black;
  }
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 440px;
  height: 600px;
  .help {
    color: red;
    font-size: 16px;
    margin-top: 5px;
  }
  // transition: 300ms;
  .signup-title {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }
  .signup-form {
    background-color: white;
    display: flex;
    flex-direction: column;
    // grid-area: main;
    -webkit-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    -moz-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    height: 100%;
    padding: 30px;
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
      margin-top: 10px;
      font-size: 13px;
      color: $review-color;
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
