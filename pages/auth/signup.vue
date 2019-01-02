<template>
  <div class="sign-up">
    <form @submit.prevent="signUp" class="signup-form">
      <p class="signup-title">Signup to Lyfr</p>

      <label for="username">Username</label>
      <input type="text" v-model="username" required>
      <label for="email">Email</label>
      <input type="email" v-model="email" required>
      <label for="password">Password</label>
      <input type="password" v-model="password" required>
      <label for="cPassword">Confirm Password</label>
      <input type="password" v-model="cPassword" required>
      <input type="submit">
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      cPassword: "",
      gender: "",
      last_name: "",
      first_name: ""
    };
  },
  auth: false,
  methods: {
    signUp: function() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store
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
  beforeCreate() {
    if (Cookies.get("token")) {
      this.$router.push("/");
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
