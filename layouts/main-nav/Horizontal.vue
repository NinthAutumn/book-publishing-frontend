<template>
  <div class="h-nav" :class="'h-nav--'">
    <nav>
      <div class="left-menu flex flex--align">
        <i class="el-icon-menu" :class="$store.state.menuState" @click="menuDrawer"></i>
        <nuxt-link v-if="$device.isDesktop||$device.isTablet" tag="div" to="/" class="site-logo">
          <fa icon="pen"></fa>ノーブル
        </nuxt-link>
      </div>
      <SearchBar class="searchbar"></SearchBar>
      <div class="user-nav flex flex--align">
        <div class="inbox-icon flex flex--align flex--center">
          <fa icon="bell"></fa>
        </div>
        <div v-if="loggedIn" style="z-index:3000;" id="prof">
          <img @click="stateDropChange" class="profile-pic" style="width: 40px;" :src="user.avatar">
          <div class>
            <transition name="grow-shrink">
              <Dropdown v-click-outside="dropOff" v-if="$store.state.dropdownState"></Dropdown>
            </transition>
          </div>
        </div>
        <div class="not-loggedin" v-else>
          <img
            class="not-loggedin__img text--link"
            src="~/assets/profile.png"
            @click="loginInState"
          >
        </div>
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
import SearchBar from "@/components/Navigation/SearchBar";
import SignUpForm from "@/components/Navigation/SignUpFrom";
import LoginForm from "@/components/Navigation/LoginForm";
import Dropdown from "@/components/Navigation/Dropdown";

import AuthModal from "@/components/Navigation/AuthModal";

export default {
  name: "Horizontal",
  data() {
    return {
      menuStates: "menu-inactive"
      // signUpForm: ""
    };
  },
  components: {
    SearchBar,
    AuthModal,
    Dropdown
  },
  computed: {
    user() {
      // console.log(this.$store.state.auth.user);
      return this.$store.getters.loggedInUser;
    },
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    loginState() {
      return this.$store.state.loginForm;
    }
  },
  methods: {
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },

    stateDropChange() {
      this.$store.commit("DROPDOWN_STATE");
      // console.log("yes");
      // console.log(e.target);
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
.inbox-icon {
  font-size: 20px;
  margin-right: 20px;
  color: rgb(85, 85, 85);
  width: 30px;
  border-radius: 100px;
  height: 30px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: rgb(214, 214, 214);
    transition: 200ms;
  }
}
.loginform {
  width: 440px;
  margin: auto;
}
.signupform {
  width: 440px;
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
  // display: none;
  position: fixed;
  // right: 0;
  top: -1111px;
  height: 0;
  // width: 45px;
  border-radius: 100px;
}

.h-nav {
  &--black {
    background-color: #1a1a1b;
    -webkit-box-shadow: 0px 2px 3px 0px #464646;
    -moz-box-shadow: 0px 2px 3px 0px #464646;
    box-shadow: 0px 2px 3px 0px #464646;
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
// ul {
//   list-style: none;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
.el-icon-menu {
  font-size: 32px;
  color: $primary;
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
  /* animation: forwards; */
}
.left-menu {
  // height: 100%;
  margin-left: 10px;
}
.profile-pic {
  border-radius: 100px;
  margin-right: 10px;
  width: 45px;

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

.dropdown-menu__item:hover {
  color: black;
  background-color: white;
}

.dropdown-menu__item {
  width: 100%;
  padding: 0;
  text-align: center;
  color: white;
}
.profile-info {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // padding: 10px;
  flex-direction: row;
  // position: relative;
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
    // position: absolute;
    // right: 10px;
    // top: 10px;
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
      // position: absolute;
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
