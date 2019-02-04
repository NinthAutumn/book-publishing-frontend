<template>
  <div class="login-form">
    <form @submit.prevent="login" class="flex flex-column">
      <label for="username">ユーザー名</label>
      <input
        class="form-input form-input--secondary"
        type="text"
        name="username"
        id
        v-model="form.username"
      >
      <label for="password">パスワード</label>
      <input
        class="form-input form-input--secondary"
        type="password"
        name="password"
        id
        v-model="form.password"
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      // console.log("dog");

      const user = {
        username: this.form.username,
        password: this.form.password
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
  }
};
</script>

<style lang="scss">
.login-form {
  background-color: #fff;
  height: 500px;
  padding: 10px;
  border-radius: 10px;
  label {
    font-size: 16px;
  }
}
</style>
