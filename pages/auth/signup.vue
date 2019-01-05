<template>
  <div class="sign-up">
    <form @submit.prevent="signUp" class="signup-form">
      <p class="signup-title">Signup to Lyfr</p>

      <label for="username">Username</label>
      <input type="text" v-model="formUsername">
      <label for="email">Email</label>
      <input type="email" v-model="formEmail">
      <label for="password">Password</label>
      <input
        name="password"
        v-validate="'required'"
        type="password"
        :class="{'is-danger': errors.has('password')}"
        v-model="formPassword"
        ref="password"
      >
      <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      
      <label for="cPassword">Confirm Password</label>
      <input
        name="confirm_password"
        v-validate="'confirmed:password'"
        type="password"
        data-vv-as="password"
        v-model="formCPassword"
      >
      <span
        v-show="errors.has('confirm_password')"
        class="help is-danger"
      >{{ errors.first('confirm_password') }}</span>
      
      <input type="submit">
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";

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
  auth: false,
  methods: {
    async signUp() {
      // const isValid = await this.$refs.observer.validate();
      await this.$validator.validateAll();
      console.log("test");
      if (!this.errors.any()) {
        alert("woo no errors");
        const user = {
          username: this.formUsername,
          email: this.formEmail,
          password: this.formPassword
        };
        await this.$store
          .dispatch("auth/signUp", user)
          .then(() => {
            this.$router.push("/");
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
    async submit() {
      // 🐿 ship it
    }
  },
  beforeCreate() {
    if (Cookies.get("token")) {
      this.$router.go(-1);
    }
  },
  computed: {
    isFormInValid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  }
};
</script>

<style lang="scss">
.sign-up {
  display: grid;
  grid-template-columns: 3;
  grid-template-rows: 3;

  .signup-title {
    grid-area: header;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }
  .signup-form {
    display: flex;
    flex-direction: column;
    // grid-area: main;
    grid-row-start: 2;
    grid-column-start: 2;
    -webkit-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    -moz-box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    box-shadow: 1px 1px 13px 0px rgba(171, 171, 171, 1);
    height: 40vh;
    padding: 10px;
    width: 33vw;
    // grid-column-start: 2;
    // grid-row-start: 2;
    input {
      padding-left: 5px;
      font-size: 16px;
      height: 30px;
      border: 1px solid grey;
      margin-bottom: 10px;

      // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
    }
    label {
      font-size: 2rem;
    }
  }
}
</style>
