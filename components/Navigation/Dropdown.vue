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
            <div class="profile-dropdown__wallet flex flex--align flex--between">
              <Currency amount="50"></Currency>
              <div class="profile-dropdown__wallet__buy-more">買う</div>
            </div>
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
import Currency from "@/components/All/Currency";
export default {
  components: {
    Currency
  },
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
  top: 50px;
  right: 20px;
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
    background-color: rgb(243, 243, 243);
  }
  &__profile-pic {
    margin-right: 10px;
    img {
      width: 50px;
      border-radius: 100px;
      box-shadow: 1px 1px 5px rgb(233, 233, 233);
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
    font-size: 15px;
    color: rgb(46, 46, 46);
    &__buy-more {
      margin-left: 10px;
      // height: 2px
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      // padding: 10px;
      user-select: none;
      border-radius: 2px;
      &:hover {
        cursor: pointer;
        background-color: $primary;
        color: white;
      }
      height: 30px;
      width: 100px;
      background-color: white;
      border: 1px solid $primary;
      color: $primary;
    }
  }
  &__list {
    position: relative;
    height: 100%;
    &__item {
      transition: 100ms;
      color: black;
      &:hover {
        background-color: rgb(248, 248, 248);
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

