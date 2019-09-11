<template>
  <div class="login-page flex-column flex--center flex--align" :class="$store.state.menuState">
    <transition name="slide-fade">
      <social-auth @loginAction="login" v-if="step === 0"></social-auth>
      <login-form @loginAction="login" v-if="step === 1"></login-form>
      <sign-up-from @setEmail="setEmail" @loginAction="login" v-if="step === 2"></sign-up-from>
      <forgot-password v-if="step === 3"></forgot-password>
      <sent-email :email="email" v-if="step === 4"></sent-email>
    </transition>
    <div class="login-page__footer">
      <ul class="login-page__footer__list flex-row flex--align flex--center">
        <li
          class="login-page__footer__item"
          v-for="(footer,index) in footerList"
          :key="footer.value"
        >
          <span v-if="!footer.link">{{footer.key}}</span>
          <nuxt-link
            tag="span"
            class="login-page__footer__link"
            v-else
            :to="footer.link"
          >{{footer.key}}</nuxt-link>
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
        { key: "利用規約", value: "toc", link: "/about/tos" },
        {
          key: "プライバシーポリシー",
          value: "privacy policy",
          link: "/about/pp"
        }
      ],
      email: ""
      // step:0
    };
  },
  auth: false,
  components: {
    LoginForm: () => import("@/components/Navigation/Auth/LoginForm"),
    SignUpFrom: () => import("@/components/Navigation/Auth/SignUpFrom"),
    ForgotPassword: () => import("@/components/Navigation/Auth/ForgotPassword"),
    SocialAuth: () => import("@/components/Navigation/Auth/SocialAuth"),
    SentEmail: () => import("@/components/Navigation/Auth/SentEmail")
  },
  computed: {
    ...mapGetters({
      step: "getAuthStep"
    })
  },
  methods: {
    login() {
      this.$router.go(-1);
    },
    setEmail(val) {
      this.email = val.email;
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
  &__footer {
    $self: &;
    &__list {
      i {
        display: inline-block;
        width: 0;
        overflow: hidden;
        text-indent: 9999px;
        height: 1rem;
        margin: 0 0.3em;
        vertical-align: middle;
        border-left: 1px solid;
      }
      #{$self}__item {
        #{$self}__link {
          cursor: pointer;
          color: #556cd6;
        }
        font-size: 1.3rem;
        span {
          font-size: 1.3rem;
        }
        i {
          font-size: 1.3rem;
        }
        // margin-right: 2rem;
        // border-right: 1px solid grey;
      }
    }
  }
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
