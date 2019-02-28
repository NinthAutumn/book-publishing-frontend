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
            <div class="profile-dropdown__wallet"></div>
          </div>
        </div>
        <transition-group tag="ul" name="list-complete" appear>
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
        </transition-group>
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
  width: 250px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 1px 1px 5px 0px rgb(228, 228, 228);
  // border-radius: 5px;
  ul {
  }
  &__user-info {
    padding: 20px 30px;
    height: 100%;
    color: black;
  }
  &__profile-pic {
    margin-right: 10px;
    img {
      width: 60px;
      border-radius: 100px;
    }
  }

  &__user-text {
    height: 100%;
    width: 100%;
  }
  &__username {
    margin-top: 10px;
    font-size: 18px;
  }
  &__wallet {
  }
  &__list {
    position: relative;
    &::after {
      position: absolute;
      box-shadow: 1px 1px 5px rgb(236, 236, 236);
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
        background-color: white;
        color: $secondary;
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

