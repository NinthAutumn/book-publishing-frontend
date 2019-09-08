<template>
  <div class="h-nav" :class="'h-nav--'">
    <nav>
      <div class="left-menu flex-row flex--align">
        <i class="el-icon-menu" :class="$store.state.menuState" @click="menuDrawer"></i>
        <nuxt-link
          v-ripple
          v-if="$device.isDesktop||$device.isTablet"
          tag="div"
          to="/"
          class="site-logo"
        >ノーブル</nuxt-link>
      </div>
      <SearchBar class="searchbar"></SearchBar>

      <div class="user-nav flex-row flex--align">
        <nuxt-link v-ripple tag="div" to="/dashboard/books/new" class="create-book">
          <fa icon="pen"></fa>
        </nuxt-link>
        <div class="site-sub" @click.stop="openSubModal">
          <fa icon="rainbow"></fa>
        </div>
        <div
          v-ripple
          v-if="loggedIn"
          class="inbox-icon flex flex--align flex--center"
          @click.stop="notification = !notification"
        >
          <span v-if="notificationCount > 0">
            <div class="inbox-icon__count" v-if="notificationCount < 9">{{notificationCount}}</div>
            <div class="inbox-icon__count" v-else>9+</div>
          </span>
          <fa icon="bell"></fa>
        </div>

        <transition v-if="loggedIn" name="grow-shrink">
          <notification-list v-if="notification" v-click-outside="closeNotification"></notification-list>
        </transition>
        <div v-if="loggedIn" class="flex-row" style="z-index:3000;" id="prof">
          <div class="profile-pic" @click.stop="userProfile">
            <v-avatar
              size="30"
              class="profile-pic__avatar"
              :class="{'profile-pic__avatar--bronze': user.status === 'bronze'}"
            >
              <v-img :src="user.avatar? user.avatar : avatar"></v-img>
            </v-avatar>
            <div class="profile-pic__info">
              <div class="profile-pic__meta">
                <div class="profile-pic__username">{{user.username}}</div>
                <div class="profile-pic__money">
                  <Currency small :amount="wealth"></Currency>
                </div>
              </div>

              <fa class="profile-pic__icon" icon="caret-down"></fa>
            </div>
          </div>

          <div class>
            <transition name="grow-shrink">
              <Dropdown v-click-outside="userProfile" v-if="profile"></Dropdown>
            </transition>
          </div>
        </div>
        <div class="not-loggedin" v-else>
          <v-avatar size="40" class="not-loggedin__img text--link" @click.stop="loginInState">
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <!-- <img
            class=""
            style="border-radius:10rem;"
            src="~/assets/profile.png"

          />-->
        </div>
      </div>
    </nav>
    <Username></Username>

    <client-only>
      <transition name="grow-shrink" class="loginform">
        <AuthModal v-if="loginState"></AuthModal>
      </transition>
      <transition name="grow-shrink" class="productform">
        <product-modal v-if="productState"></product-modal>
      </transition>
      <transition name="grow-shrink">
        <setting-form v-if="dialog"></setting-form>
      </transition>
      <transition name="grow-shrink">
        <sub-main v-if="subscribe"></sub-main>
      </transition>
    </client-only>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  name: "Horizontal",
  data() {
    return {
      menuStates: "menu-inactive",
      profile: false,
      notification: false,
      head: "ノーブル",
      avatar: require("~/assets/profile.png?webp&url")
    };
  },
  components: {
    SearchBar: () => import("@/components/Navigation/SearchBar"),
    AuthModal: () => import("@/components/Navigation/Auth/AuthModal"),
    Dropdown: () => import("@/components/Navigation/Dropdown"),
    ProductModal: () => import("@/components/Navigation/Stripe/ProductModal"),
    SettingForm: hydrateWhenVisible(() =>
      import("@/components/Navigation/Setting")
    ),
    NotificationList: hydrateWhenVisible(() =>
      import("@/components/Navigation/Notification")
    ),
    Currency: () => import("@/components/All/Currency"),
    Username: () => import("@/components/Navigation/Username"),
    SubMain: hydrateWhenVisible(() =>
      import("@/components/Navigation/Subscribe/SubMain")
    )
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      loggedIn: "auth/isAuthenticated",
      loginState: "getLoginFormState",
      productState: "getProductModalState",
      notificationCount: "user/getCommentNotificationCount",
      wealth: "wallet/getWealth",
      dialog: "getSettingModal",
      subscribe: "subscription/getSiteModalState"
    })
  },
  async mounted() {
    if (this.loggedIn) {
      await this.$store.dispatch("user/fetchCommentNotificationsCount");
      await this.$store.dispatch("wallet/wealth");
    }
    if (this.notificationCount > 0) {
      this.head = `ノーブル　(${this.notificationCount})`;
    }
  },
  head() {
    return {
      title: this.head
    };
  },
  methods: {
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },
    openSubModal() {
      if (!this.loggedIn) {
        return this.$store.commit("LOGIN_STATE");
      }
      this.$store.commit("subscription/TOGGLE_SITE_MODAL");
    },
    stateDropChange() {
      this.$store.commit("DROPDOWN_STATE");
    },
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    userProfile() {
      this.profile = !this.profile;
    },
    loginInState() {
      this.$store.commit("LOGIN_STATE");
    },
    closeNotification() {
      this.notification = !this.notification;
    }
  }
};
</script>
<style lang="scss" scoped>
.site-sub {
  font-size: 2rem;
  color: #000000;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
}
.create-book {
  font-size: 1.7rem;
  margin-right: 1rem;
  padding: 1rem;
  display: flex;
  border-radius: 10rem;
  &:hover {
    cursor: pointer;
  }
}
.inbox-icon {
  position: relative !important;

  font-size: 20px;
  // margin-right: 0.5rem;
  color: rgb(85, 85, 85);
  width: 35px;
  border-radius: 100px;
  height: 35px;
  transition: 200ms;
  &__count {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.1rem 0.5rem;
    border-radius: 10rem;
    background-color: red;
    color: white;
  }
  &:hover {
    cursor: pointer;
  }
}
.loginform {
  width: 440px;
  margin: auto;
}
.signupform {
  width: 440px;
  margin: auto;
}
.not-loggedin {
  &__img {
    width: 40px;
    border-radius: 100px;
    box-shadow: 1px 1px 5px 0px rgb(201, 200, 200);
    transition: 300ms;
    margin: 0 1rem;
    &:hover {
      transform: scale(1.1);
      box-shadow: 3px 3px 5px 0px rgb(184, 182, 182);
      transition: 300ms;
    }
    &:active {
      box-shadow: 1px 1px 5px 0px rgb(201, 200, 200);
      transition: 300ms;
    }
  }
  margin-right: 10px;
  // font-size: 16px;
  span {
    font-size: 16px;
  }
  .signup {
  }
  .login {
    &:hover {
      // cursor: pointer;
    }
  }
}
.dropdown-inactive {
  position: fixed;
  top: -1111px;
  height: 0;
  border-radius: 100px;
}

.h-nav {
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  &--black {
    background-color: #1a1a1b;
    -webkit-box-shadow: 0px 2px 3px 0px #464646;
    -moz-box-shadow: 0px 2px 3px 0px #464646;
    box-shadow: 0px 2px 3px 0px #464646;
  }
  padding: 0 1rem;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1000;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.el-icon-menu {
  font-size: 32px;
  color: black;
}
.el-icon-menu:hover {
  cursor: pointer;
}
.menu-active {
  border-radius: 0.5rem;
  background-color: #e6e6e6;
  transition: 300ms;
}
.menu-inactive {
  transition: 300ms;
}
.left-menu {
  // height: 100%;
}

.profile-pic {
  position: relative;
  // border-radius: 100px;
  min-width: 10rem;
  height: 4rem;
  display: flex;
  align-items: center;
  $self: &;
  // border-radius:
  padding: 0 1rem;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;

    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
  }
  &__avatar {
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    margin-right: 1rem;
    &--bronze {
      .v-image {
        border: 1px solid $bronze;
      }
    }
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;

    #{$self}__meta {
      overflow: hidden;
    }
    #{$self}__username {
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      // margin-right: 2rem;
    }
    #{$self}__icon {
      font-size: 1.4rem;
      color: #555555;
    }
    // margin-right: 2rem;
  }
  &:hover {
  }
  &:focus {
  }
}

.dropdown-menu__item:hover {
  color: black;
  background-color: white;
}

.dropdown-menu__item {
  width: 100%;
  padding: 0;
  text-align: center;
  color: white;
}
.profile-info {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // padding: 10px;
  flex-direction: row;
  // position: relative;
  height: 73px;
  border-top-left-radius: 9px;
  border-top-right-radius: 10px;
  &:hover {
    cursor: pointer;
  }

  h3 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .dropdown-profile-pic {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    // position: absolute;
    // right: 10px;
    // top: 10px;
    border-radius: 100px;
    border: 2px solid #ffd700;
  }
  .profile-text {
    display: flex;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    .profile-name {
      font-size: 20px;
    }
    .profile-profession {
      font-size: 14px;
      // position: absolute;
      font-weight: 300;
    }
  }
}

.popper__arrow::after,
.el-popper {
  content: "arif";
  background-color: black !important;
  color: black !important;
}

@-webkit-keyframes flip-diagonal-2-br {
  0% {
    -webkit-transform: rotate3d(-1, 1, 0, 0deg);
    transform: rotate3d(-1, 1, 0, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(-1, 1, 0, 180deg);
    transform: rotate3d(-1, 1, 0, 180deg);
  }
}
@keyframes flip-diagonal-2-br {
  0% {
    -webkit-transform: rotate3d(-1, 1, 0, 0deg);
    transform: rotate3d(-1, 1, 0, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(-1, 1, 0, 180deg);
    transform: rotate3d(-1, 1, 0, 180deg);
  }
}
</style>
