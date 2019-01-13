<template>
  <div class="login-page" :class="$store.state.menuState">
    <form class="login-form" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy">
      <label>Password</label>
      <input required minlength="6" v-model="password" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      // console.log("dog");

      const user = {
        username: this.username,
        password: this.password
      };
      console.log(user);
      await this.$store
        .dispatch("auth/login", user)
        .then(() => {
          this.$store.commit("DROPDOWN_FALSE");
          this.$router.go(-1);
        })
        .catch(e => {
          console.log(e.response);
        });
      // await this.$auth
      //   .loginWith("local", {
      //     data: {
      //       username: this.username,
      //       password: this.password
      //     }
      //   })
      //   .catch(e => {});
    }
  },
  auth: false,
  beforeCreate() {
    if (Cookies.get("token")) {
      this.$router.go(-1);
    }
  }
  // middleware: "auth"
};
</script>

<style scoped>
.menu-active {
  margin-left: 24rem;
  margin-top: 5rem;
  padding: 1rem 5rem;
  transition: 300ms;
}
.menu-inactive {
  padding: 6rem 3rem;
  transition: 300ms;
}
</style>
