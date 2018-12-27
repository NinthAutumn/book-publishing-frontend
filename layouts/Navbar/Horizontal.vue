<template>
  <div class="h-nav">
    <nav>
      <div class="left-menu">
        <i class="el-icon-menu" :class="$store.state.menuState" @click="menuDrawer"></i>
      </div>
      <SearchBar class="searchbar"></SearchBar>
      <img class="profile-pic" src="http://placehold.jp/45x45.png">
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
    }
  }
};
</script>
<style scoped>
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
