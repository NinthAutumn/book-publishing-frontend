<template>
  <div class="mobile-vleft">
    <div class="mobile-vleft__container">
      <div tag="div" class="mobile-vleft__user flex-row flex--between" v-ripple @click="navigate">
        <div class="mobile-vleft__meta">
          <div class="mobile-vleft__username" v-text="user.username"></div>
          <div class="mobile-vleft__email" v-text="user.email"></div>
        </div>
        <div class="mobile-vleft__avatar">
          <v-avatar size="50">
            <v-img :src="auth? user.avatar.img: avatar"></v-img>
          </v-avatar>
        </div>
      </div>
      <div class="mobile-vleft__wealth flex-row flex--between">
        <div class="flex-divider flex-row">
          <Currency fontSize="1.6rem" :amount="wealth"></Currency>
          <Vote fontSize="1.6rem" :amount="token"></Vote>
        </div>
        <div class="mobile-vleft__buy" @click.stop="$emit('stripe')">買う</div>
      </div>
      <div class="mobile-vleft__nav" v-cloak>
        <div class="mobile-vleft__menu">
          <nuxt-link
            :to="menu.link"
            tag="div"
            class="mobile-vleft__item"
            v-ripple
            v-for="menu in menu_list"
            :key="menu.title"
          >
            <div class="mobile-vleft__title" v-text="menu.title"></div>
            <fa class="mobile-vleft__icon" :icon="menu.icon"></fa>
          </nuxt-link>
        </div>
        <!-- <div v-ripple @click="logout" class="mobile-vleft__logout">サインアウト</div> -->

        <!-- <div class="mobile-vleft__title">通知</div>
        <inbox-list v-cloak></inbox-list>
        <div class="mobile-vleft__title">ブックマーク</div>
        <latest-chapters height="30vh" v-cloak></latest-chapters>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated",
      user: "auth/getUser",
      wealth: "wallet/getWealth",
      token: "wallet/getToken"
    })
  },
  async mounted() {
    await this.$store.dispatch("wallet/wealth");
    this.menu_list["profile"].link = `/users/${this.user.id}`;
  },
  data() {
    return {
      avatar: require("~/assets/profile.png"),
      menu_list: {
        profile: {
          title: "プロフィール",
          icon: "user",
          link: "/users/"
        },
        library: {
          title: "ライブラリー",
          icon: "book-open",
          link: "/library",
          auth: true
        },
        inbox: {
          title: "通知",
          icon: "bell",
          link: "/library",
          auth: true
        },
        logout: {
          title: "ログアウト",
          icon: "sign-out-alt",
          link: "/auth/logout",
          auth: true
        }
      }
    };
  },
  methods: {
    navigate: function() {
      this.$router.push(`/users/${this.user.id}`);
      this.$emit("toggle", true);
    },
    ...mapActions({
      logout: "auth/logout"
    })
  },
  components: {
    Currency: () => import("@/components/All/Currency"),
    Vote: () => import("@/components/All/Vote"),
    LatestChapters: () => import("@/components/Navigation/LatestChapters"),
    InboxList: () => import("@/components/Mobile/List/Inbox")
  }
};
</script>

<style lang="scss">
.mobile-vleft {
  $self: &;
  height: 100vh;
  z-index: 1000;
  right: 0;
  position: fixed;
  width: 80vw;
  background-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);

  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__nav {
    padding: 1.5rem;
    #{$self}__item {
      font-size: 1.5rem;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // text-align: center;
      #{$self}__title {
        font-size: 1.5rem;
      }
    }
  }
  // &__title {
  //   font-size: 1.6rem;
  //   // color:#d6dcdd;
  //   font-weight: bold;
  //   margin: 1rem 0rem;
  // }

  &__wealth {
    padding: 0 1.5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e3e8ee;
    // padding-bottom: 1.5rem;

    @media screen and (max-width: 320px) {
      #{$self}__buy {
        font-size: 1.3rem !important;
        padding: 0.1rem 1.5rem !important;
      }
    }
    #{$self}__buy {
      font-size: 1.6rem;
      white-space: nowrap;
      // paddin
      padding: 0.2rem 2.5rem;
      border-radius: 0.5rem;
      background-color: #566cd6;
      color: white;
      box-shadow: rgb(61, 78, 172) 0px 1px 0px 0px,
        rgb(85, 108, 214) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(42, 47, 69, 0.22) 0px 2px 4px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    }
  }
  &__user {
    padding: 1.5rem;

    // margin-bottom: 1rem;
    position: relative;

    border-bottom: 1px solid #e3e8ee;
  }
  &__logout {
    font-size: 1.6rem;
    text-align: center;
    // padding-bottom: 1rem;
  }
  &__meta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #{$self}__username {
      font-size: 1.8rem;
    }
    #{$self}__email {
      font-size: 1.4rem;
    }
  }
}
</style>
