<template>
  <nav class="v-nav" :class="$store.state.menuState">
    <ul>
      <li v-for="menu in menus" :key="menu.title">
        <nuxt-link :to="menu.link" class="v-nav-list">
          <div class="v-nav-icon">
            <fa :icon="menu.icon" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>{{menu.title}}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <hr>
    <ul class="update-list">
      <p>ブックマーク</p>
      <li v-for="update in updates" :key="update.index" class="update">
        <div class="update-title">
          <span class="update-title-text">{{update.title}}</span>
        </div>
        <div class="update-info">
          <span class="update-chapter">{{update.chapter}}</span>
          <span class="update-time">{{update.time}}</span>
        </div>
      </li>
    </ul>
    <hr>
  </nav>
</template>
<script>
import HomeIcon from "../../assets/home-icon";
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
      userId: "",
      draw: null,
      updates: [
        {
          title: "スライムになった件",
          time: moment().format("LTS"),
          chapter: "10c"
        },
        {
          title: "スライムにならなかった件",
          time: moment().format("LTS"),
          chapter: "90c"
        },
        {
          title: "スライムになった件",
          time: moment().format("LTS"),
          chapter: "40c"
        },
        {
          title: "スライムになった件",
          time: moment().format("LTS"),
          chapter: "46c"
        }
      ],
      menus: [
        {
          title: "ホーム",
          icon: "home",
          link: "/",
          meta: ""
        },
        {
          title: "検索",
          icon: "search",
          link: "/browse",
          meta: "search"
        },
        {
          title: "ランキング",
          icon: "crown",
          link: "/rankings",
          meta: "ranking"
        },
        {
          title: "ストアー",
          icon: "store",
          link: "/store",
          meta: "store"
        },
        {
          title: "ライブラリー",
          icon: "book",
          link: "/library",
          meta: "library"
        }
      ]
    };
  },
  components: {
    HomeIcon
  },
  watch: {
    // fetchUserId: function() {
    //   ;
    // }
  },
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    }
  }
};
</script>





<style lang="scss"  scoped>
.nuxt-link-exact-active {
  background-color: rgb(227, 236, 245);
}
.menu-inactive {
  left: -240px !important;
  transition: 300ms;
}
.v-nav {
  background-color: white;
  /* display: none; */
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0.1rem;
  /* -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36); */
  // -webkit-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // -moz-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  // box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(177, 175, 175, 0.2);
  -webkit-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  -moz-box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);
  // opacity: 0.75;
  overflow: auto;
  /* animation: content-enter 1s;
  animation-fill-mode: forwards; */
  transition: 300ms;
  // animation: appearSlides 300ms;
  // color: #5bb8eb;
  &-list {
    display: flex;
    // padding: 1rem;
    height: 40px;
    padding-left: 3rem;
    align-items: center;
    font-size: 1.8rem;
    /* position: relative; */
    &:hover {
      cursor: pointer;
      background-color: rgb(227, 236, 245);
    }
  }
  &-icons {
    margin-right: 2.4rem;
    font-size: 1.9rem;
    width: 20px;
  }
}
.update {
  color: black;
  font-weight: 500;
  font-size: 1.35rem;
  margin-top: 10px;
  // background-color: #5bb9eb4b;
  padding: 10px;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 1px rgb(243, 243, 243);
  -moz-box-shadow: 0.5px 0.5px 0.5px 1px rgb(243, 243, 243);
  box-shadow: 0.5px 0.5px 0.5px 1px rgb(243, 243, 243);
  /* border-radius: 5px; */
  position: relative;
  transition: 200ms;
  // border-radius: 10px;
  &::before {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 6px;
    height: 6px;
    margin-right: 6px;
    content: "";
    border-radius: 8px;
    background-color: #8768c0;
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
    p {
      text-align: center;
    }
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
