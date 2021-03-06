<template>
  <div class="h-nav">
    <nav>
      <div class="left-menu flex flex--align">
        <nuxt-link v-ripple tag="div" to="/" class="site-logo flex-row">
          ノーブル
          <div class="beta-small">ベータ</div>
        </nuxt-link>
        <div class="nav-title flex flex--align">
          <nuxt-link class="nav-title__book" v-text="`${title}`" :to="`/books/${$route.params.id}`"></nuxt-link>
          <span class="nav-title__chapter-index" v-text="`/第${chapter.index}話:`"></span>
          <div class="nav-title__chapter">
            <h4 v-text="chapter.title"></h4>
          </div>
          <div class="nav-title__progress" v-text="`${progress.toFixed(2)}%`"></div>
        </div>
      </div>
      <div class="user-nav flex-row flex--align">
        <nav-icon @click="openSubModal" icon="rainbow"></nav-icon>
        <nav-icon :notificationCount="notificationCount" @click="closeNotification" icon="bell"></nav-icon>
        <!-- <div
          v-ripple
          class="inbox-icon flex flex--align flex--center"
          @click.stop="closeNotification"
        >
          <span v-if="notificationCount > 0">
            <div class="inbox-icon__count" v-if="notificationCount < 9">{{notificationCount}}</div>
            <div class="inbox-icon__count" v-else>9+</div>
          </span>

          <fa icon="bell"></fa>
        </div>-->
        <transition name="grow-shrink">
          <notification-list v-if="notification" v-click-outside="closeNotification"></notification-list>
        </transition>
        <span style="z-index:3000;" id="prof" v-click-outside="dropOff" v-if="auth">
          <div class="profile-pic" @click.stop="stateDropChange">
            <v-avatar
              size="30"
              class="profile-pic__avatar"
              :class="{'profile-pic__avatar--bronze':user.status === 'bronze'}"
            >
              <img :src="user.avatar? user.avatar:avatar" />
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

          <div :class="$store.state.dropdownState">
            <div>
              <transition name="grow-shrink">
                <Dropdown v-if="$store.state.dropdownState"></Dropdown>
              </transition>
            </div>
          </div>
        </span>
        <div class="not-loggedin" v-else>
          <v-avatar size="35" class="profile-pic__avatar" @click.stop="loginInState()">
            <img :src="auth? user.avatar:avatar" />
          </v-avatar>
        </div>
      </div>
    </nav>

    <transition name="grow-shrink">
      <product-modal v-if="productState"></product-modal>
    </transition>
    <transition name="grow-shrink">
      <sub-main v-if="subscribe"></sub-main>
    </transition>
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
      notification: false,
      avatar: require("~/assets/img/profile.png")
    };
  },
  async mounted() {
    await this.$store.dispatch("chapter/fetchChapterBookTitle", {
      bookId: this.$route.params.id
    });
    if (this.$store.getters.isAuthenticated) {
      await this.$store.dispatch("user/fetchCommentNotificationsCount");
    }
  },
  components: {
    Dropdown: hydrateWhenVisible(() =>
      import("@/components/Navigation/Dropdown")
    ),
    ProductModal: hydrateWhenVisible(() =>
      import("@/components/Navigation/Stripe/ProductModal")
    ),
    NotificationList: hydrateWhenVisible(() =>
      import("@/components/Navigation/Notification")
    ),
    Currency: hydrateWhenVisible(() => import("@/components/All/Currency")),
    SubMain: hydrateWhenVisible(() =>
      import("@/components/Navigation/Subscribe/SubMain")
    ),
    NavIcon: () => import("@/components/Web/Cards/Icon/Nav")
  },
  computed: {
    ...mapGetters({
      notificationCount: "user/getCommentNotificationCount",
      user: "auth/getUser",
      chapter: "chapter/getChapter",
      auth: "auth/isAuthenticated",
      productState: "getProductModalState",
      title: "chapter/getChapterBookTitle",
      wealth: "wallet/getWealth",
      subscribe: "subscription/getSiteModalState"
    }),
    loginState() {
      return this.$store.state.loginForm;
    },
    progress() {
      return (
        (this.$store.state.chapter.chapter.index /
          this.$store.getters["chapter/getChapterCount"]) *
        100
      );
    }
  },
  methods: {
    menuDrawer() {
      this.$store.commit("menuStateChange");
    },
    logOut() {
      this.$store.dispatch("auth/logOut");
    },
    stateDropChange() {
      this.$store.commit("DROPDOWN_STATE");
    },
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    },
    userProfile() {
      this.$router.push("/dashboard");
    },
    loginInState() {
      this.$store.commit("LOGIN_STATE");
    },
    closeNotification() {
      if (!this.auth) {
        return this.$store.commit("LOGIN_STATE");
      }
      this.notification = !this.notification;
    },
    openSubModal() {
      if (!this.auth) {
        return this.$store.commit("LOGIN_STATE");
      }
      this.$store.commit("subscription/TOGGLE_SITE_MODAL");
    }
  }
};
</script>
<style lang="scss" scoped>
.site-sub {
  font-size: 2rem;
  @include themify($themes) {
    color: themed("textColor");
  }
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
}
.inbox-icon {
  position: relative !important;
  font-size: 20px;
  margin-right: 0.5rem;
  color: rgb(85, 85, 85);
  width: 35px;
  border-radius: 100px;
  height: 35px;
  transition: 200ms;
  @include themify($themes) {
    color: themed("textColor");
  }
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
@media screen and (max-width: 856px) {
  .site-logo {
    display: none !important;
  }
  .nav-title__book {
    margin-left: 0 !important;
  }
}
.beta-small {
  font-size: 1rem;
  color: white;
  // margin-left: 1rem;
  align-self: flex-start;
  padding: 0.2rem 1rem;
  background-color: $secondary;
  border-radius: 10rem;
}
.not-loggedin {
  &__img {
    width: 40px;
    // border-radius: 100px;
    box-shadow: 1px 1px 5px 0px rgb(201, 200, 200);
    transition: 300ms;
    margin-right: 5px;
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
    &:hover {
      cursor: pointer;
    }
    &--bronze {
      img {
        border: 1px solid $bronze;
      }
    }
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    #{$self}__username {
      font-size: 1.2rem;
    }
    #{$self}__icon {
      font-size: 1.4rem;
    }
  }
}
.h-nav {
  .nav-title {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &__book {
      margin-left: 10px;
      font-size: 1.6rem;
      max-width: 20em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @include themify($themes) {
        color: themed("textColor");
      }
      &:hover {
        text-decoration: underline;
      }
    }
    &__chapter-index {
      font-size: 1.6rem;
      margin-right: 5px;
    }
    &__progress {
      font-size: 1.6rem;
      border-left: 1px solid grey;
      padding: 0 10px;
      margin-left: 10px;
    }
    &__chapter {
      max-width: 30em;
      // max-width: 90rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      h4 {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
  }

  height: 50px;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1000;
  @include themify($themes) {
    background: themed("textBackgroundColor");
    color: themed("textColor");
  }
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-active {
  background-color: #eaecf5;
}
.left-menu {
  margin-left: 10px;
  max-width: 100%;
}

.profile-info {
  display: flex;
  align-items: center;
  flex-direction: row;
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
      font-weight: 300;
    }
  }
}
</style>
