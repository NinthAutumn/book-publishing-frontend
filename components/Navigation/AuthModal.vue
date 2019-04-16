<template>
  <div class="auth-modal" v-click-outside="close">
    <transition name="slide-fade">
      <login-form v-if="$store.state.authed === 0"></login-form>
      <sign-up-from v-if="$store.state.authed === 1"></sign-up-from>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // auth: 0
    };
  },
  transition: "slide-fade",
  components: {
    LoginForm: () => import("./LoginForm"),
    SignUpFrom: () => import("./SignUpFrom")
  },
  methods: {
    close() {
      this.$store.commit("LOGIN_FALSE");
    }
  },
  computed: {}
};
</script>

<style>
.auth-modal {
  width: 100%;
  position: relative;
}
</style>
