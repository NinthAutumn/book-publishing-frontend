<template>
  <div class="d-nav-all">
    <div class="d-nav-h">
      <div class="dashboard-h-menu">
        <div class="dashboard-icon">
          <i class="el-icon-menu" @click="menuDrawer"></i>
        </div>
        <div class="dashboard-logo">
          <img class="dashboard-logo-img" src="http://placehold.jp/80x32.png">
        </div>
      </div>
    </div>
    <nav class="d-nav-v" :class="$store.state.dashboardMenuState">
      <ul>
        <li>
          <div
            v-if="$store.state.dashboardMenuState === 'dashboard-active'"
            class="dashboard-profile"
          >
            <img class="dashboard-profile-pic" src="http://placehold.jp/100x100.png">
          </div>
          <div v-else></div>
        </li>
        <li v-for="menu in menus" :key="menu.title">
          <nuxt-link :to="menu.link">
            <div class="d-nav-v-list">
              <fa :icon="menu.icon" class="d-nav-v-icons"></fa>
              <p v-if="$store.state.dashboardMenuState === 'dashboard-active'">{{menu.title}}</p>
              <p v-else></p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <hr>
    </nav>
  </div>
</template>
<script>
// import HomeIcon from "../../assets/home-icon";
var moment = require("moment");
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default {
  name: "Vertical",
  props: {
    // menus: Array
  },
  data() {
    return {
      draw: null,
      menus: [
        {
          title: "ダッシュボード",
          icon: "map",
          link: "/users/dashboard",
          meta: ""
        },
        {
          title: "本棚",
          icon: "book",
          link: "/users/dashboard/books",
          meta: "search"
        },
        {
          title: "アナリティクス",
          icon: "chart-pie",
          link: "/users/dashboard/analytics",
          meta: "analytics"
        },
        {
          title: "コメント",
          icon: "comment",
          link: "/users/dashboard/comments",
          meta: "comments"
        }
      ]
    };
  },
  components: {
    // HomeIcon
  },
  watch: {
    // fetchUserId: function() {
    //   ;
    // }
  },
  methods: {
    menuDrawer() {
      this.$store.commit("DASHBOARD_MENU_STATE_CHANGE");
      console.log("dog");
    }
  }
};
</script>





<style lang="scss"  scoped>
.d-nav-h {
  width: 100vw;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  -moz-box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  height: 50px;
  position: fixed;
  top: 0;
  background-color: white;
  // background-color: black;
}
.dashboard-h-menu {
  display: flex;
  align-items: center;
  height: 100%;
  // justify-content: space-around;
  // -webkit-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  // -moz-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  // box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
}
.el-icon-menu {
  margin-left: 16px;
  font-size: 3rem;
  color: #c9b1f5;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    color: #9a7fcc;
    transition: 200ms;
  }
  &:active {
    background-color: #dbd4e9;
    transition: 200ms;
  }
}

.dashboard-logo {
  margin-left: 16px;
  height: 32px;
}
.dashboard-profile {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 155px;
  &-pic {
    border-radius: 100px;
  }
}
.menu-inactive {
  left: -25rem !important;
  transition: 300ms;
}

.d-nav-all .dashboard-inactive {
  width: 50px !important;
}

.d-nav-v {
  /* display: none; */
  width: 255px;
  height: 100vh;
  position: fixed;
  top: 50px;
  // top: 50px;
  left: 0.1rem;
  -webkit-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  -moz-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  /* -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36); */
  // -webkit-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // -moz-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(177, 175, 175, 0.2);
  // -webkit-box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  // -moz-box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  // box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  opacity: 0.75;
  overflow: auto;
  /* animation: content-enter 1s;
  animation-fill-mode: forwards; */
  transition: 300ms;
  // animation: appearSlides 300ms;
  &-list {
    display: flex;
    // padding: 1rem;
    padding-left: 16px;
    align-items: center;
    // justify-content: center;
    text-align: left;
    font-size: 2.5rem;
    height: 48px;
    p {
      font-size: 1.7rem;
    }
    /* position: relative; */
    &:hover {
      cursor: pointer;
      background-color: rgb(227, 236, 245);
    }
  }
  &-icons {
    margin-right: 3rem;
    font-size: 2.5rem;
    width: 20px;
  }
}
.update {
  font-size: 1.35rem;
  margin-top: 10px;
  background-color: #f5f6fc;
  padding: 10px;

  /* border-radius: 5px; */
  position: relative;
  transition: 200ms;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  -moz-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);

  &::before {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 6px;
    height: 6px;
    margin-right: 6px;
    content: "";
    border-radius: 8px;
    background-color: #8860d0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.019);
    transition: 200ms;
  }
  &-title {
    display: flex;
    align-items: center;
    &-text {
      font-size: 1.35rem;
    }
  }

  &-time {
    font-size: 1.5rem;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    opacity: 0.8;
  }
  &-list {
    padding: 5px;
  }
  &-chapter {
    font-size: 1.35rem;
  }
}

@keyframes content-enter {
  from {
    visibility: hidden;
    width: 0rem;
  }
  to {
    visibility: visible;
    width: 25rem;
  }
}
@keyframes content-leave {
  from {
  }
  to {
  }
}
@keyframes appearSlides {
  from {
    left: -25rem;
  }
  to {
    left: 0rem;
  }
}
</style>
