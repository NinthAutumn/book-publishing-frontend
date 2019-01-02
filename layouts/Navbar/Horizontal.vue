<template>
  <div class="h-nav">
    <nav>
      <div class="left-menu">
        <i class="el-icon-menu" :class="$store.state.menuState" @click="menuDrawer"></i>
      </div>
      <SearchBar class="searchbar"></SearchBar>
      <el-dropdown v-if="$store.state.auth.loggedIn">
        <span class="el-dropdown-link">
          <img class="profile-pic" src="http://placehold.jp/45x45.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="profile-info">
            <img class="dropdown-profile-pic" src="http://placehold.jp/45x45.png">
            <div class="profile-text">
              <span class="profile-name">NinthAutumn</span>
              <span class="profile-profession">Author</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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

  methods: {
    //menu
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },
    logOut() {
      this.$store.dispatch("logOut");
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

.h-nav {
  height: 50px;
  width: 100%;
  position: fixed;
  -webkit-box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
  -moz-box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
  box-shadow: 0px 2px 2px 0px rgba(217, 208, 219, 1);
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
  -webkit-box-shadow: 0px 0px 2px 0px rgb(102, 101, 101);
  -moz-box-shadow: 0px 0px 2px 0px rgb(109, 109, 109);
  box-shadow: 0px 0px 2px 0px rgb(114, 112, 112);
}
.el-dropdown-menu {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 0;
  background-color: black;
  color: white !important;
  border-radius: 10px;
  // padding: 0 10px;
}

.el-dropdown-menu__item:hover {
  color: black;
  background-color: white;
}

.el-dropdown-menu__item {
  width: 100%;
  padding: 0;
  text-align: center;
  color: white;
}
.profile-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 10px;
  // position: relative;
  height: 73px;
  border-top-left-radius: 9px;
  border-top-right-radius: 10px;

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
    margin-left: 10px;
    // position: absolute;
    // right: 10px;
    // top: 10px;
    border-radius: 100px;
  }
  .profile-text {
    // display: flex;
    // flex-direction: column;
    margin-right: 100px;
    height: 46px;
    position: relative;
    // justify-content: space-around;
    // align-items: center;
    .profile-name {
      font-size: 20px;
      // flex-grow: 1;
      // position: absolute;
      // left: 15px;
      // top: 10px;
      text-align: left;
      // color: white;
    }
    .profile-profession {
      font-size: 14px;
      position: absolute;
      font-weight: 300;
      text-align: left;
      bottom: -10px;
      left: 0;
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
