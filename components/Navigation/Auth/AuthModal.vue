<template>
  <div class="dialog dialog__container">
    <div class="auth-modal dialog__content" v-click-outside="close">
      <transition name="slide-fade">
        <social-auth v-if="step === 0"></social-auth>
        <login-form v-if="step === 1"></login-form>
        <sign-up-from @setEmail="setEmail" v-if="step === 2"></sign-up-from>
        <forgot-password v-if="step === 3"></forgot-password>
        <sent-email :email="email" v-if="step === 4"></sent-email>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      footerList: [
        { key: "© nobles 2019", value: "copyright" },
        { key: "利用規約", value: "toc" },
        { key: "プライバシーポリシー", value: "privacy policy" }
      ],
      email: ""
    };
  },
  transition: "slide-fade",
  components: {
    LoginForm: () => import("./LoginForm"),
    SignUpFrom: () => import("./SignUpFrom"),
    ForgotPassword: () => import("./ForgotPassword"),
    SocialAuth: () => import("@/components/Navigation/Auth/SocialAuth"),
    SentEmail: () => import("@/components/Navigation/Auth/SentEmail")
  },
  methods: {
    close() {
      this.$store.commit("LOGIN_FALSE");
    },
    setEmail(val) {
      this.email = val.email;
    }
  },
  computed: {
    ...mapGetters({
      step: "getAuthStep"
    })
  }
};
</script>

<style lang="scss">
.auth-modal {
  // width: 100%;
  width: 44rem;
  min-height: 60rem;
  /* padding: 3rem; */
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  $self: &;
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
        font-size: 1.4rem;
        span {
          font-size: 1.4rem;
        }
        i {
          font-size: 1.4rem;
        }
        // margin-right: 2rem;
        // border-right: 1px solid grey;
      }
    }
  }
}
</style>
