<template>
  <nav class="v-nav" :class="$store.state.menuState">
    <ul>
      <li>
        <div class="dashboard-profile">
          <img class="dashboard-profile-pic" src="http://placehold.jp/100x100.png">
        </div>
      </li>
      <li v-for="menu in menus" :key="menu.title">
        <nuxt-link :to="menu.link">
          <div class="v-nav-list">
            <fa :icon="menu.icon" class="v-nav-icons"></fa>
            <p>{{menu.title}}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <hr>
  </nav>
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
  methods: {}
};
</script>





<style lang="scss"  scoped>
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
.v-nav {
  background-color: #fbf9f9;
  /* display: none; */
  width: 25rem;
  height: 100vh;
  position: fixed;
  // top: 50px;
  left: 0.1rem;
  /* -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36); */
  // -webkit-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // -moz-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(177, 175, 175, 0.2);
  -webkit-box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  -moz-box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  box-shadow: inset 0px 0px 3px 0px rgba(122, 122, 122, 1);
  opacity: 0.75;
  overflow: auto;
  /* animation: content-enter 1s;
  animation-fill-mode: forwards; */
  transition: 300ms;
  // animation: appearSlides 300ms;
  &-list {
    display: flex;
    // padding: 1rem;
    padding-left: 3rem;
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
    margin-right: 2.4rem;
    font-size: 2.5rem;
    width: 20px;
  }
}
.update {
  font-size: 1.35rem;
  margin-top: 10px;
  background-color: #f5f6fc;
  padding: 10px;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  -moz-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  /* border-radius: 5px; */
  position: relative;
  transition: 200ms;

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
