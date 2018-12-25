<template>
  <nav class="v-nav" :class="show">
    <ul>
      <li v-for="menu in menus" :key="menu.title">
        <div class="list" :to="menu.link">
          <i :class="menu.icon" class="icons"></i>
          <p>{{menu.title}}</p>
        </div>
      </li>
    </ul>
    <hr>
    <ul class="update-list">
      <p>ブックマーク</p>
      <li v-for="update in updates" :key="update.index" class="updates">
        <div class="updates-title">
          <span class="updates-title-text">{{update.title}}</span>
        </div>
        <div class="updates-info">
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
  props: {
    show: String
  },
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
<style scoped>
.v-nav {
  background-color: #fbf9f9;
  /* display: none; */
  width: 25rem;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0;
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
}
.list {
  display: flex;
  padding: 1rem;
  padding-left: 3rem;
  align-items: center;
  font-size: 1.8rem;
  /* position: relative; */
}

.list:hover {
  cursor: pointer;
  background-color: rgb(227, 236, 245);
}

.icons {
  margin-right: 24px;
  font-size: 1.6rem;
}
p {
  margin: 0;
}
ul {
  padding: 0;
}
li {
  list-style: none;
}
.updates::before {
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

hr {
  border-color: #fbf9f9;
}

p {
  font-size: 1.4rem;

  text-align: center;
}

.updates-title {
  display: flex;
  align-items: center;

  /* justify-content: space-around; */
}

.updates {
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
}

.updates-title-text {
  font-size: 1.35rem;
}

.updates:hover {
  cursor: pointer;
  transform: scale(1.019);
  transition: 200ms;
}
.update-time {
  font-size: 1.5rem;
}

.update-list {
  padding: 5px;
  /* -webkit-box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.48);
  -moz-box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.48);
  box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.48); */
}

.updates-info {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  /* font-size: 1.35rem; */
}

.update-chapter {
  font-size: 1.35rem;
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
