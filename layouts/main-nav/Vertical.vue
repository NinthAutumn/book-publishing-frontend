<template>
  <nav class="v-nav" :class="$store.state.menuState">
    <ul>
      <li>
        <nuxt-link to="/" class="v-nav-list">
          <div class="v-nav-icon">
            <fa icon="home" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>ホーム</p>
          </div>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/browse" class="v-nav-list">
          <div class="v-nav-icon">
            <fa icon="search" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>検索</p>
          </div>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/rankings" class="v-nav-list">
          <div class="v-nav-icon">
            <fa icon="crown" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>ランキング</p>
          </div>
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/store" class="v-nav-list">
          <div class="v-nav-icon">
            <fa icon="store" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>ストアー</p>
          </div>
        </nuxt-link>
      </li>-->
      <li>
        <nuxt-link to="/library" class="v-nav-list" v-if="$store.state.auth.loggedIn">
          <div class="v-nav-icon">
            <fa icon="book" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>ライブラリー</p>
          </div>
        </nuxt-link>
        <div @click="loginInState" class="v-nav-list" v-else>
          <div class="v-nav-icon">
            <fa icon="book" class="v-nav-icons"></fa>
          </div>
          <div class="v-nav-title">
            <p>ライブラリー</p>
          </div>
        </div>
      </li>
    </ul>
    <hr>
    <ul class="update-list" v-if="loggedIn">
      <p>ブックマーク・ニュース</p>
      <LatestChapters></LatestChapters>
      <hr>
    </ul>
  </nav>
</template>
<script>
import HomeIcon from "@/assets/home-icon";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { faGithub } from '@fortawesome/free-brands-svg-icons'
import LatestChapters from "@/components/Navigation/LatestChapters";
export default {
  name: "Vertical",
  props: {
    // menus: Array
  },
  data() {
    return {
      userId: "",
      draw: null,
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
          title: "リーディングリスト",
          icon: "store",
          link: "/readinglists",
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
    HomeIcon,
    LatestChapters
  },
  watch: {
    // fetchUserId: function() {
    //   ;
    // }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    loginInState() {
      this.$store.commit("LOGIN_STATE");
    }
  }
};
</script>





<style lang="scss"  scoped>
.nuxt-link-exact-active {
  background-color: rgb(227, 236, 245);
}
.menu-inactive {
  transform: translateX(-240px);
  transition: 300ms;
}
.menu-active {
  transform: translateX(0px);
  transition: 300ms;
}
.v-nav-title__item {
  color: $primary;
}
.v-nav-icon {
  color: grey !important;
}
.v-nav-icons {
  color: grey !important;
}
.v-nav {
  // margin: 0 !important;
  &--black {
    background-color: #1a1a1b;
    color: white;
  }
  background-color: white;
  z-index: 3;
  /* display: none; */
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0;
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
  // transform: translateX(1px);
  transition: 300ms;
  // animation: appearSlides 300ms;
  // color: #5bb8eb;
  ul {
    padding: 10px 0;
  }
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
    color: $primary;
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
