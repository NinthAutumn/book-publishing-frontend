<template>
  <div class="login-form" :class="{'login-form--mobile':$device.isMobile}">
    <div class="login-form__item" v-loading="loading">
      <div @click="changePage(0)" class="flex-row go-back">
        <div class="divider flex-row flex--align">
          <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
        </div>
        <div class="divider">
          <p>戻る</p>
        </div>
      </div>
      <h3 class="login__header text--center text--large">ノーブル</h3>

      <form @submit.prevent="login" class="flex flex-column" style="padding-top:20px;">
        <div
          class="login-form__error"
          style="text-align:center;font-size:1.4rem;padding:1rem;border-radiu:1rem;background-color:#F6F9FC;"
          v-if="bigError"
          v-text="bigError"
        ></div>
        <label for="username">ユーザー名・Eメール</label>
        <input
          class="login-form__input elevation-1"
          type="text"
          ref="username"
          name="username"
          v-model="form.username"
          autocomplete="username"
          placeholder="ユーザー名・Eメール"
        />

        <label for="password">パスワード</label>
        <input
          class="login-form__input elevation-1"
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="パスワード"
          v-model="form.password"
        />
        <div class="text--center" style="margin-top:1rem;">
          <p
            class="login-forgot__password text--primary text--link"
            @click="changePage(3)"
          >パスワードを忘れた?</p>
        </div>
        <div class="flex-divider flex-row flex--align flex--center" v-if="failed > 5">
          <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
        </div>
        <div class="flex-divider flex-row flex--right">
          <v-btn color="#8860d0" type="submit">ログイン</v-btn>
        </div>
        <!-- <input class="form-submit login__submit form-submit--primary" value="ログイン"> -->
      </form>
      <div class="text--center">
        <!-- <a href>パスワード</a> -->
        <p class="text--primary text--link" @click="changePage(2)">アカウントを作る</p>
      </div>
    </div>

    <!-- <transition name="side-fade">
      <SignUpFrom v-if="auth === 1"></SignUpFrom>
    </transition>-->
  </div>
</template>

<script>
import SignUpFrom from "./SignUpFrom";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      bigError: false,
      form: {
        username: "",
        password: ""
      },
      failed: ""
    };
  },
  props: {},
  computed: {
    // failed() {
    //   return ;
    // }
  },
  components: {
    SignUpFrom: () => import("./SignUpFrom")
  },
  async mounted() {
    this.$refs.username.focus();
    // await this.$recaptcha.
    this.failed = this.$storage.getUniversal("FAILED_LOGIN_COUNT");
  },
  methods: {
    onError(error) {
      // alert(error);
    },
    onSuccess(token) {
      // alert(token);
    },
    onExpired() {},
    changePage(page) {
      this.$store.commit("SET_AUTH_PAGE", page);
    },
    ...mapActions({
      postLogin: "auth/login",
      fetchComments: "comment/fetchCommentList",
      fetchReviews: "review/showAll",
      checkIsReviewed: "review/fetchIsReviewed"
    }),
    errorCount() {
      if (!this.failed) {
        this.$storage.setUniversal("FAILED_LOGIN_COUNT", 1);
        this.failed = 1;
      } else {
        this.failed++;
        this.$storage.setUniversal(
          "FAILED_LOGIN_COUNT",
          this.$storage.getUniversal("FAILED_LOGIN_COUNT") + 1
        );
      }
    },
    async checkRoute() {
      if (this.$route.name === "books-id-chaptersId") {
        await this.fetchComments({
          chapterId: this.$route.params.chaptersId,
          sortBy: 0,
          page: 1,
          limit: 10,
          direction: 0
        });
      }
      if (this.$route.name === "books-id") {
        await this.fetchReviews({
          bookId: this.$route.params.id,
          page: 1,
          limit: 10,
          type: 0
        });
        await this.checkIsReviewed({ bookId: this.$route.params.id });
      }
    },
    errorHandler(error) {
      this.errorCount();

      this.loading = false;
      this.bigError = error;
      return this.$toast.error(error, {
        duration: 2000,
        icon: "extension"
      });
    },
    async login() {
      this.bigError = false;
      this.loading = true;

      const user = {
        username: this.form.username,
        password: this.form.password
      };
      try {
        if (this.failed > 5) {
          const token = await this.$recaptcha.getResponse();
        }
        const { error } = await this.postLogin({
          user: this.form,
          strategy: "local"
        });

        if (error) {
          return this.errorHandler(error);
        }
        this.loading = false;
        // w;
        this.$store.commit("LOGIN_FALSE");
        this.$storage.setUniversal("FAILED_LOGIN_COUNT", 0);
        this.$nuxt.refresh();
        this.checkRoute();
        this.$emit("loginAction");
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.errorCount();
        if (error === "Failed to execute") {
          this.bigError = "ロボット認証に失敗しました";
          return this.$toast.error(this.bigError, {
            duration: 2000,
            icon: "extension"
          });
        }
        this.bigError = error;
        this.$toast.error(this.bigError, {
          duration: 2000,
          icon: "extension"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login-form {
  .login__header {
  }
  .v-btn__content {
    color: white;
    font-size: 1.4rem;
  }
  max-width: 44rem;
  max-height: 60rem;
  // color: #8dadb7;
  height: 90%;
  // padding: 30px;
  padding: 3rem;
  &--mobile {
    padding: 1.5rem;
  }
  width: 100%;
  // padding: 30px;
  $self: &;
  &__item {
    #{$self}__input {
      height: 47px;
      padding: 12px 14px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: 1.6rem;
      transition: 300ms;
      margin-bottom: 2rem;
      border-left: 5px solid #f5f5f5;
      &--error {
        border-left: 5px solid #ff6160;
      }
      &:focus {
        border-left: 5px solid $secondary;
      }
      &:focus,
      &:hover {
        outline: none;
        box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
          0 8px 16px -8px rgba(0, 0, 0, 0.3),
          0 -6px 16px -6px rgba(0, 0, 0, 0.025) !important;
      }
    }

    display: flex;

    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    color: #6b7c93;
  }
  .login__input {
    &:focus {
      border-color: $primary;
    }
  }
  .login__submit {
    border-radius: 0;
    margin: 10px 0;
    transition: 300ms;
    &:hover {
      box-shadow: 1px 1px 5px grey;
      transition: 300ms;
    }
  }
}
</style>
