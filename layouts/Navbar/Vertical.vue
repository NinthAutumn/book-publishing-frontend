<template>
  <div class="v-nav">
    <nav>
      <ul>
        <li v-for="menu in menus" :key="menu.title">
          <div class="list" :to="menu.link">
            <i :class="menu.icon" class="icons"></i>
            <p>{{menu.title}}</p>
          </div>
        </li>
        <!-- <HomeIcon/> -->
      </ul>
      <hr>
      <ul class="update-list">
        <p>ブックマーク</p>
        <li v-for="update in updates" :key="update.index" class="updates">
          <div class="updates-title">
            <span>{{update.title}}</span>
          </div>
          <div class="updates-info">
            <span class="update-chapter">{{update.chapter}}</span>
            <span class="update-time">{{update.time}}</span>
          </div>
        </li>
      </ul>
      <hr>
    </nav>
  </div>
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
          title: "スライムになった件",
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
  width: 240px;
  height: 100vh;
  position: absolute;
  top: 50px;
  left: 0;
  /* -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.36); */
  -webkit-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0.25px 0.25px 0.25px 0.25px rgba(177, 175, 175, 0.2);
  opacity: 0.75;
}
.list {
  display: flex;
  padding: 10px;
  padding-left: 30px;
  align-items: center;
  font-size: 18px;
  /* position: relative; */
}

.list:hover {
  cursor: pointer;
  background-color: rgb(227, 236, 245);
}

.icons {
  margin-right: 24px;
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
  font-size: 15px;

  text-align: center;
}

.updates-title {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.updates {
  font-size: 14px;
  margin-top: 10px;
  background-color: #f5f6fc;
  padding: 10px;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  -moz-box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);
  /* border-radius: 5px; */
  position: relative;
}

.updates:hover {
  cursor: pointer;
  transform: scale(1.005);
}
.update-time {
  font-size: 15px;
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
}

.update-chapter {
}
</style>
