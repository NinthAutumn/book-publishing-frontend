<template>
  <div class="sign-up" v-click-outside="signOff">
    <form @submit.prevent="signUp" class="signup-form">
      <p class="signup-title">Signup to Lyfr</p>
      <label for="username">ユーザー名</label>
      <input class="form-input form-input--primary--lighter" type="text" v-model="formUsername">
      <label for="email">メールアドレス</label>
      <input
        name="email"
        v-validate="'email'"
        class="form-input form-input--primary--lighter"
        type="email"
        data-vv-as="記入されたメールアドレス"
        v-model="formEmail"
      >
      <span class="help is-danger">{{ errors.first('email') }}</span>
      <label for="password">パスワード</label>
      <input
        class="form-input form-input--primary--lighter"
        name="password"
        v-validate="'required||min:6'"
        type="password"
        :class="{'is-danger': errors.has('password')}"
        v-model="formPassword"
        data-vv-as="パスワード"
        ref="password"
      >
      <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      <input
        type="submit"
        class="signup-button form-submit"
        :class="{active: errors.any()||!formUsername||!formEmail||!formPassword}"
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validated: false,
      formUsername: "",
      formEmail: "",
      formPassword: "",
      formCPassword: "",
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
    async signUp() {
      // const isValid = await this.$refs.observer.validate();
      await this.$validator.validateAll();
      if (!this.errors.any()) {
        const user = {
          username: this.formUsername,
          email: this.formEmail,
          password: this.formPassword
        };
        await this.$store
          .dispatch("auth/signUp", user)
          .then(() => {
            this.$store.commit("SIGNUP_FALSE");
          })
          .catch(e => {
            if (e.response.data.errors.username) {
              alert(e.response.data.errors.username.message);
            }
            if (e.response.data.errors.email) {
              alert(e.response.data.errors.email.message);
            }
          });
      }
    },
    signOff() {
      this.$store.commit("SIGNUP_FALSE");
    }
  }
};
</script>

<style lang="scss">
.sign-up {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
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
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    // grid-area: main;
    -webkit-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    -moz-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    height: 100%;
    padding: 10px;
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
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
