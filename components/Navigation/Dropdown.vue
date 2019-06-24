<template>
  <div class="profile-dropdown">
    <transition name="drop-down" appear>
      <div class="profile-dropdown__list">
        <div class="profile-dropdown__user-info flex-row flex--align">
          <div
            class="profile-dropdown__profile-pic"
            :class="{'profile-dropdown__profile-pic--bronze':user.status==='bronze'}"
          >
            <v-avatar size="50">
              <img :src="user.avatar.img">
            </v-avatar>
          </div>
          <div class="profile-dropdown__user-text">
            <div class="profile-dropdown__username" v-text="user.username"></div>
            <div class="profile-dropdown__email">{{user.email}}</div>
          </div>
        </div>
        <div
          v-loading="loading"
          class="profile-dropdown__wallet flex-row flex--between flex--align"
        >
          <div class="profile-dropdown__wallet__content flex-row">
            <Currency style="margin-right:1rem;" :amount="wealth"></Currency>
            <Vote :amount="token"></Vote>
          </div>
          <div class="flex-divider flex-row flex--right">
            <div
              class="profile-dropdown__wallet__buy-more"
              @click="$store.commit('TOGGLE_PRODUCT_MODAL')"
            >買う</div>
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
            v-else-if="item.title === 'プロフィール'"
            :to="item.link + user.id"
            tag="div"
            class="profile-dropdown__nav-link flex flex--align"
            v-text="item.title"
          ></nuxt-link>
          <div
            v-else-if="item.title === '設定'"
            tag="div"
            class="profile-dropdown__nav-link flex flex--align"
            v-text="item.title"
            @click.stop="$store.commit('TOGGLE_SETTING_MODAL')"
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
import { mapGetters } from "vuex";
export default {
  components: {
    Currency: () => import("@/components/All/Currency"),
    Vote: () => import("@/components/All/Vote")
  },
  async mounted() {
    await this.$store.dispatch("wallet/wealth");
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      user: "user/loggedInUser",
      wealth: "wallet/getWealth",
      token: "wallet/getToken"
    })
  },
  data() {
    return {
      navList: [
        { title: "プロフィール", link: "/users/" },
        { title: "ダッシュボード", link: "/dashboard" },
        { title: "設定", link: "/users/setting" },
        { title: "ログアウト", link: "/home" }
      ],
      loading: true,
      product: false
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("auth/logout");
      this.$axios.setHeader("Authorization", null);
    }
  }
  // loading: false
};
</script>

<style lang="scss">
.profile-dropdown {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 300px;
  box-sizing: border-box;
  border-radius: 0.4rem;
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
    &--bronze {
      img {
        border: 2px solid $bronze;
      }
    }
    img {
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
  &__email {
    font-size: 1.6rem;
    color: rgb(83, 83, 83);
  }
  &__wallet {
    font-size: 2rem;
    color: $primary;
    padding: 0.5rem 2rem;
    position: relative;
    overflow: hidden;
    flex-wrap: wrap;
    .wallet-icon {
      position: absolute;
      top: 5px;
      left: 20px;
      font-size: 2rem;
      opacity: 0.5;
    }
    &__content {
      color: black;
      // padding: 1rem 1.5rem;
      // border: 1px solid grey;
      // box-shadow: inset 1px 1px 5px rgb(240, 240, 240);
      border-radius: 1rem;
    }
    &__buy-more {
      // margin-left: 10px;
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
        transition: 300ms;
      }
      height: 3rem;
      width: 10rem;
      background-color: white;
      border: 1px solid $primary;
      color: $primary;
    }
  }
  &__list {
    user-select: none;
    position: relative;
    height: 100%;
    &__item {
      user-select: none;
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

