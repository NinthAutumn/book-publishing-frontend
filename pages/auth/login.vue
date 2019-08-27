<template>
  <div class="login-page flex-column flex--center flex--align" :class="$store.state.menuState">
    <transition name="slide-fade">
      <social-auth @loginAction="login" v-if="step === 0"></social-auth>
      <login-form @loginAction="login" v-if="step === 1"></login-form>
      <sign-up-from @loginAction="login" v-if="step === 2"></sign-up-from>
      <forgot-password v-if="step === 3"></forgot-password>
    </transition>
    <div class="auth-modal__footer">
      <ul class="auth-modal__footer__list flex-row flex--align flex--center">
        <li
          class="auth-modal__footer__item"
          v-for="(footer,index) in footerList"
          :key="footer.value"
        >
          <span>{{footer.key}}</span>
          <i v-if="index !== 2">|</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      footerList: [
        { key: "© nobles 2019", value: "copyright" },
        { key: "利用規約", value: "toc" },
        { key: "プライバシーポリシー", value: "privacy policy" }
      ]
      // step:0
    };
  },
  auth: false,
  components: {
    LoginForm: () => import("@/components/Navigation/Auth/LoginForm"),
    SignUpFrom: () => import("@/components/Navigation/Auth/SignUpFrom"),
    ForgotPassword: () => import("@/components/Navigation/Auth/ForgotPassword"),
    SocialAuth: () => import("@/components/Navigation/Auth/SocialAuth")
  },
  computed: {
    ...mapGetters({
      step: "getAuthStep"
    })
  },
  methods: {
    login() {
      this.$router.go(-1);
    }
  },
  beforeCreate() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$router.go(-1);
    }
  },
  async mounted() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.login-page {
  // max-width: 50%;
}
// .menu-active {
//   margin-left: 24rem;
//   margin-top: 5rem;
//   padding: 1rem 5rem;
//   transition: 300ms;
// }
// .menu-inactive {
//   padding: 6rem 3rem;
//   transition: 300ms;
// }
</style>
