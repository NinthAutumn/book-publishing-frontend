<template>
  <div class="profile-dropdown">
    <transition name="drop-down" appear>
      <div class="profile-dropdown__list">
        <div class="profile-dropdown__user-info flex">
          <div class="profile-dropdown__profile-pic">
            <img :src="user.avatar">
          </div>
          <div class="profile-dropdown__user-text">
            <div class="profile-dropdown__username" v-text="user.username"></div>
            <div class="profile-dropdown__wallet">{{user.email}}</div>
          </div>
        </div>
        <li
          class="profile-dropdown__list__item flex flex-column flex--align flex--center"
          v-for="(item, index) in navList"
          :key="index"
        >
          <div
            v-if="item.title === 'ログアウト'"
            @click="logOut"
            class="profile-dropdown__nav-link flex flex--align"
            v-text="item.title"
          ></div>
          <nuxt-link
            v-else
            :to="item.link"
            tag="div"
            class="profile-dropdown__nav-link flex flex--align"
            v-text="item.title"
          ></nuxt-link>
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { title: "プロフィール", link: "home" },
        { title: "ダッシュボード", link: "/dashboard" },
        { title: "設定", link: "home" },
        { title: "ログアウト", link: "/home" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logOut");
    }
  }
};
</script>

<style lang="scss">
.profile-dropdown {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 300px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
  ul {
  }
  &__user-info {
    padding: 16px;
    height: 100%;
    color: black;
    background-color: rgb(240, 240, 240);
  }
  &__profile-pic {
    margin-right: 10px;
    img {
      width: 50px;
      border-radius: 100px;
    }
  }

  &__user-text {
    height: 100%;
    width: 100%;
  }
  &__username {
    font-size: 18px;
  }
  &__wallet {
  }
  &__list {
    position: relative;
    &::after {
      position: absolute;
      box-shadow: 1px 1px 5px rgb(247, 247, 247);
      content: "";
      height: 10px;
      width: 10px;
      background-color: white;
      top: -10px;
      right: 20px;
      clip-path: polygon(50% 30%, 0% 100%, 100% 100%);
    }
    height: 100%;
    &__item {
      transition: 100ms;
      color: black;
      &:hover {
        background-color: rgb(235, 235, 235);
        cursor: pointer;
        transition: 100ms;
      }
      height: 40px;
    }
  }
  &__nav-list {
  }
  &__nav-link {
    font-size: 16px;
  }
}
</style>

