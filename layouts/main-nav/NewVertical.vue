<template>
  <nav class="vertical-nav">
    <div class="vertical-nav__container">
      <div class="vertical-nav__user-profile">
        <div
          @click.stop="auth? null:$store.commit('LOGIN_STATE')"
          class="vertical-nav__profile-container"
        >
          <div class="vertical-nav__user-avatar">
            <v-avatar size="80" class="vertical-nav__avatar">
              <v-img :src="user.avatar? user.avatar: avatar"></v-img>
            </v-avatar>
          </div>
          <div class="vertical-nav__user-wallet">
            <Currency style="margin-right:1rem;" :amount="wealth|| 0"></Currency>
            <Vote :amount="token||0"></Vote>
          </div>
        </div>
      </div>
      <ul class="vertical-nav__menus">
        <div class="vertical-nav__menu-title">Discover</div>
        <li ag="li" class v-for="menu in menu_list" :key="menu.title">
          <div
            :to="menu.link"
            @click.stop="$store.commit('LOGIN_STATE')"
            class="vertical-nav__menu"
            v-if="menu.title === 'ライブラリー'&&!auth"
          >
            <div class="vertical-nav__menu-icon">
              <fa class="vertical-nav__icon" :icon="menu.icon"></fa>
            </div>
            <div class="vertical-nav__menu-text">{{menu.title}}</div>
          </div>
          <nuxt-link :to="menu.link" class="vertical-nav__menu" v-else>
            <div class="vertical-nav__menu-icon">
              <fa class="vertical-nav__icon" :icon="menu.icon"></fa>
            </div>
            <div class="vertical-nav__menu-text">{{menu.title}}</div>
          </nuxt-link>
        </li>
      </ul>
      <div class="vertical-nav__library">
        <div class="vertical-nav__library-title">Bookmark</div>
        <latest-chapters v-if="auth"></latest-chapters>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      avatar: require("~/assets/profile.png"),
      menu_list: [
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
          title: "更新",
          icon: "globe",
          link: "/update",
          meta: "update"
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
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auth: "auth/isAuthenticated",
      wealth: "wallet/getWealth",
      token: "wallet/getToken"
    })
  },
  components: {
    Currency: () => import("@/components/All/Currency"),
    Vote: () => import("@/components/All/Vote"),
    LatestChapters: () => import("@/components/Navigation/LatestChapters")
  },
  created() {},
  methods: {
    navigate(menu) {
      if (menu.title === "ライブラリー" && !this.auth) {
        return;
      }
      this.$router.push(menu.link);
    }
  }
};
</script>

<style lang="scss">
.vertical-nav {
  $self: &;

  &__container {
    width: 24rem;
    height: 95vh;
    // overflow: hidden;
    position: fixed;
    left: 0;
    top: 5.1rem;
    background-color: #fff;
    border-radius: 1rem;
    @media screen and (max-width: 1136px) {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      z-index: 10000;
      height: 92.5vh;
    }
    .nuxt-link-exact-active {
      background-color: black !important;
      color: white !important;
    }
    #{$self}__profile-container {
      &--no-user {
        &:hover {
          cursor: pointer;
        }
      }
    }
    #{$self}__user-profile {
      padding: 2rem;
      display: flex;
      padding-bottom: 0rem;
      flex-direction: column;
      align-items: center;
      &--no-user {
      }
      #{$self}__user-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
      }
      #{$self}__avatar {
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
      #{$self}__user-wallet {
        display: flex;
      }
    }
    #{$self}__menus {
      // align-items: center;
      padding: 2rem;
      #{$self}__menu-title {
        padding: 1rem;
        font-size: 2rem;
        font-weight: bold;
        color: #d6dcdd;
      }
      #{$self}__menu {
        display: flex;
        align-items: center;
        padding: 1.25rem 1rem;
        background-color: #fff;
        color: black;
        transition: background-color 300ms, color 300ms;
        &:hover {
          cursor: pointer;
          background-color: black;
          color: white;
          transition: background-color 300ms, color 300ms;
        }
        // background-color: grey;
        margin-bottom: 0.5rem;
        border-radius: 2.2rem;
        #{$self}__menu-icon {
          font-size: 1.5rem;
          min-width: 4rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          // margin-left: 1rem;
          margin-right: 2rem;
        }
        #{$self}__menu-text {
          // text-align: center;
          font-weight: bold;
          font-size: 1.4rem;
        }
      }
    }
    #{$self}__library {
      padding: 0 2rem;
      // height: 25vh;
      #{$self}__library-title {
        padding: 1rem;
        font-size: 2rem;
        font-weight: bold;
        color: #d6dcdd;
      }
      padding-bottom: 1rem;
    }
  }
  // &__upgrade {
  //   padding: 0 2rem;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   margin-top: 1rem;
  //   #{$self}__button {
  //     font-size: 1.4rem;
  //   }
  // }
}
</style>
