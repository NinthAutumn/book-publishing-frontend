<template>
  <div class="login-page flex flex--center" :class="$store.state.menuState">
    <div class="log-form">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import LoginForm from "@/components/Navigation/LoginForm";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    LoginForm
  },
  // layout: "Horizontal",
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

<style scoped lang="scss">
.login-page {
  /* height: 500px; */
  // display: flex;
  // justify-content: center;
  .log-form {
    width: 40%;
  }
}
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
