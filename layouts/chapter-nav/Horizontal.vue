<template>
  <div
    class="h-nav"
    :class="{'h-nav--tan':theme === 'tan', 'h-nav--black':theme==='black','h-nav--ruby':theme==='ruby'}"
  >
    <nav>
      <div class="left-menu flex flex--align">
        <nuxt-link tag="div" to="/" class="site-logo">ノーブル</nuxt-link>
        <div class="nav-title flex flex--align">
          <nuxt-link
            class="nav-title__book"
            v-text="`${$store.getters['chapter/getChapterBookTitle']}/`"
            :to="`/books/${$store.state.chapter.chapter.bookId}`"
          ></nuxt-link>
          <span
            class="nav-title__chapter-index"
            v-text="`第${$store.state.chapter.chapter.index}話:`"
          ></span>
          <div class="nav-title__chapter">
            <h4 v-text="$store.state.chapter.chapter.title"></h4>
          </div>
          <div class="nav-title__progress" v-text="`${progress.toFixed(2)}%`"></div>
        </div>
      </div>
      <span v-if="loggedIn" style="z-index:3000;" id="prof" v-click-outside="dropOff">
        <img
          @click.stop="stateDropChange"
          class="profile-pic"
          style="width: 40px;"
          :src="user.avatar"
        >
        <div :class="$store.state.dropdownState">
          <div>
            <transition name="grow-shrink">
              <Dropdown v-if="$store.state.dropdownState"></Dropdown>
            </transition>
          </div>
        </div>
      </span>
      <div class="not-loggedin" v-else>
        <img
          class="not-loggedin__img text--link"
          src="~/assets/profile.png"
          @click.stop="loginInState"
        >
      </div>
    </nav>
    <transition name="grow-shrink">
      <div class="loginform" v-if="loginState">
        <AuthModal></AuthModal>
      </div>
    </transition>
  </div>
</template>
<script>
import SignUpForm from "@/components/Navigation/SignUpFrom";
import LoginForm from "@/components/Navigation/LoginForm";
import AuthModal from "@/components/Navigation/AuthModal";
import Dropdown from "@/components/Navigation/Dropdown";
export default {
  name: "Horizontal",
  data() {
    return {
      menuStates: "menu-inactive"
      // signUpForm: ""
    };
  },
  components: {
    AuthModal,
    Dropdown
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    loginState() {
      return this.$store.state.loginForm;
    },
    theme() {
      return this.$store.state.user.theme;
    },
    progress() {
      return (
        (this.$store.state.chapter.chapter.index /
          this.$store.getters["book/getBookChapterCount"]) *
        100
      );
    }
  },
  methods: {
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },
    logOut() {
      this.$store.dispatch("auth/logOut");
    },
    stateDropChange() {
      this.$store.commit("DROPDOWN_STATE");
    },
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    userProfile() {
      this.$router.push("/dashboard");
    },
    loginInState() {
      this.$store.commit("LOGIN_STATE");
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 856px) {
  .site-logo {
    display: none !important;
  }
  .nav-title__book {
    margin-left: 0 !important;
  }
}
.loginform {
  width: 30%;
  margin: auto;
}
.signupform {
  width: 30%;
  margin: auto;
}
.not-loggedin {
  &__img {
    width: 40px;
    border-radius: 100px;
    box-shadow: 1px 1px 5px 0px rgb(201, 200, 200);
    transition: 300ms;
    margin-right: 5px;
    &:hover {
      transform: scale(1.1);
      box-shadow: 3px 3px 5px 0px rgb(184, 182, 182);
      transition: 300ms;
    }
    &:active {
      box-shadow: 1px 1px 5px 0px rgb(201, 200, 200);
      transition: 300ms;
    }
  }
  margin-right: 10px;
  // font-size: 16px;
  span {
    font-size: 16px;
  }
  .signup {
  }
  .login {
    &:hover {
      // cursor: pointer;
    }
  }
}
.dropdown-inactive {
  position: fixed;
  top: -1111px;
  height: 0;
  border-radius: 100px;
}
.dropdown-active {
  position: fixed;
  width: 300px;
  height: 500px;
  background-color: #c8b0f5;
  right: 5px;
  z-index: 2200;
  transition: 300ms;
  -webkit-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  border-radius: 10px;
  background-image: none;
}

.h-nav {
  .nav-title {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &__book {
      margin-left: 10px;
      font-size: 1.6rem;
      max-width: 20em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
    &__chapter-index {
      font-size: 1.6rem;
      margin-right: 5px;
    }
    &__progress {
      font-size: 1.6rem;
      border-left: 1px solid grey;
      padding: 0 10px;
      margin-left: 10px;
    }
    &__chapter {
      // max-width: 30em;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      h4 {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
  }
  &--tan {
    background: url("../../assets/noise/noise-tan-container.png");
    box-shadow: none;
    border-bottom: 1px solid #d8ceb3;
  }
  &--black {
    background-color: #1a1a1b;
    box-shadow: none;
    border-bottom: 1px solid black;
    .nav-title {
      color: rgb(215, 218, 220);
    }
  }
  &--ruby {
    background: url("../../assets/noise/noise-ruby-container.png");
    box-shadow: none;
    border-bottom: 1px solid #e0115f;
  }

  height: 50px;
  width: 100%;
  position: fixed;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  -moz-box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1000;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-icon-menu {
  font-size: 32px;
  color: #c9b1f5;
}
.el-icon-menu:hover {
  cursor: pointer;
}
.menu-active {
  background-color: #eaecf5;
}
.menu-inactive {
  -webkit-animation: flip-diagonal-2-br 300ms
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: flip-diagonal-2-br 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)
    both;
}
.left-menu {
  margin-left: 10px;
  max-width: 100%;
}
.profile-pic {
  border-radius: 100px;
  margin-right: 10px;
  max-width: 45px;

  position: relative;
  border: 1px solid #ffd700;
  &:hover {
    -webkit-box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 1);
    -moz-box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 1);
    box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 1);
  }
  &:focus {
    -webkit-box-shadow: 0px 0px 4px 0px rgba(217, 217, 217, 1);
    -moz-box-shadow: 0px 0px 4px 0px rgba(217, 217, 217, 1);
    box-shadow: 0px 0px 4px 0px rgba(217, 217, 217, 1);
  }
}

.profile-info {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 73px;
  border-top-left-radius: 9px;
  border-top-right-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .dropdown-profile-pic {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    border-radius: 100px;
    border: 2px solid #ffd700;
  }
  .profile-text {
    display: flex;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    .profile-name {
      font-size: 20px;
    }
    .profile-profession {
      font-size: 14px;
      font-weight: 300;
    }
  }
}

.popper__arrow::after,
.el-popper {
  content: "arif";
  background-color: black !important;
  color: black !important;
}

@-webkit-keyframes flip-diagonal-2-br {
  0% {
    -webkit-transform: rotate3d(-1, 1, 0, 0deg);
    transform: rotate3d(-1, 1, 0, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(-1, 1, 0, 180deg);
    transform: rotate3d(-1, 1, 0, 180deg);
  }
}
@keyframes flip-diagonal-2-br {
  0% {
    -webkit-transform: rotate3d(-1, 1, 0, 0deg);
    transform: rotate3d(-1, 1, 0, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(-1, 1, 0, 180deg);
    transform: rotate3d(-1, 1, 0, 180deg);
  }
}
</style>
