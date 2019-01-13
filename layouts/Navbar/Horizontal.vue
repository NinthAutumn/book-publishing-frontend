<template>
  <div class="h-nav">
    <nav>
      <div class="left-menu">
        <i class="el-icon-menu" :class="$store.state.menuState" @click="menuDrawer"></i>
      </div>
      <SearchBar class="searchbar"></SearchBar>
      <span v-click-outside="dropOff" v-if="loggedIn" style="z-index:3000;" id="prof">
        <img @click="stateDropChange" class="profile-pic" src="http://placehold.jp/45x45.png">
        <div :class="$store.state.dropdownState">
          <div class="dropdown-menu">
            <div class="profile-info" @click="userProfile">
              <img class="dropdown-profile-pic" src="http://placehold.jp/45x45.png">
              <div class="profile-text">
                <span class="profile-name">{{user.username}}</span>
                <span class="profile-profession">Author</span>
              </div>
            </div>
            <div class="dropdown-menu__item">
              <a @click="logOut">Logout</a>
            </div>
          </div>
        </div>
      </span>
      <div class="not-loggedin" v-else>
        <span class="signup">
          <nuxt-link to="/auth/signup">Sign up</nuxt-link>
        </span>
        <span>|</span>
        <span class="login">
          <nuxt-link to="/auth/login">Log in</nuxt-link>
        </span>
      </div>
    </nav>
  </div>
</template>
<script>
import SearchBar from "./../../components/SearchBar";

export default {
  name: "Horizontal",
  data() {
    return {
      menuStates: "menu-inactive"
    };
  },
  components: {
    SearchBar
  },
  computed: {
    user() {
      // console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    }
  },
  methods: {
    //menu
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },
    logOut() {
      this.$store.dispatch("auth/logOut");
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
      this.$router.push("/users/dashboard");
    }
  }
};
</script>
<style lang="scss" scoped>
.not-loggedin {
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
  // background-color: red;
  // z-index: -1;
  // width: 0;
  // background-image: url("http://placehold.jp/45x45.png");
}
.dropdown-active {
  position: fixed;
  width: 300px;
  height: 500px;
  background-color: #c8b0f5;
  right: 5px;
  z-index: 2200;
  // top: 55px;
  transition: 300ms;
  -webkit-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  box-shadow: 0px 2px 12px 3px rgba(191, 191, 191, 1);
  border-radius: 10px;
  background-image: none;
}

.h-nav {
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
  /* -webkit-animation: flip-diagonal-2-br 300ms
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: flip-diagonal-2-br 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)
    both; */
  /* animation: appearSlides 300ms; */
  /* animation-direction: forwards; */
}
.menu-inactive {
  -webkit-animation: flip-diagonal-2-br 300ms
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: flip-diagonal-2-br 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)
    both;
  /* animation: forwards; */
}
.left-menu {
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
.dropdown-menu {
  display: flex;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 300px;
  padding: 0;
  background-color: black;
  color: white !important;
  border-radius: 10px;
  // padding: 0 10px;
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
      // flex-grow: 1;
      // position: absolute;
      // left: 15px;
      // top: 10px;
      // text-align: left;
      // color: white;
    }
    .profile-profession {
      font-size: 14px;
      // position: absolute;
      font-weight: 300;
      // text-align: left;
      // bottom: -10px;
      // left: 0;
      // color: white;
      // right: 140px;
      // top: 30px;
      // left: 15px;
      // top: 10px;
    }
  }
}

.popper__arrow::after,
.el-popper {
  content: "arif";
  // border-bottom-color: black !important;
  background-color: black !important;
  color: black !important;
  // border-color: black !important;
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
