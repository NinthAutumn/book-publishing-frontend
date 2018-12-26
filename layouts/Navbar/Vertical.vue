<template>
  <nav class="v-nav">
    <ul>
      <li v-for="menu in menus" :key="menu.title">
        <div class="v-nav-list" :to="menu.link">
          <i :class="menu.icon" class="v-nav-icons"></i>
          <p>{{menu.title}}</p>
        </div>
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

export default {
  name: "Vertical",
  data() {
    return {
      draw: null,
      menus: [
        {
          title: "ホーム",
          icon: "el-icon-search",
          link: "/",
          meta: ""
        },
        { title: "検索", icon: "el-icon-search", link: "/", meta: "search" },
        {
          title: "ランキング",
          icon: "el-icon-search",
          link: "/",
          meta: "ranking"
        },
        { title: "ストアー", icon: "el-icon-search", link: "/", meta: "store" },
        {
          title: "ライブラリー",
          icon: "el-icon-search",
          link: "/",
          meta: "library"
        }
      ],
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
      ]
    };
  },
  components: {
    HomeIcon
  }
};
</script>





<style lang="scss"  scoped>
.v-nav {
  background-color: #fbf9f9;
  /* display: none; */
  width: 25rem;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: -25rem;
  /* -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36); */
  -webkit-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(177, 175, 175, 0.2);
  opacity: 0.75;
  overflow: auto;
  /* animation: content-enter 1s;
  animation-fill-mode: forwards; */
  transition: 500ms;

  &-list {
    display: flex;
    padding: 1rem;
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
    font-size: 1.6rem;
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
</style>
