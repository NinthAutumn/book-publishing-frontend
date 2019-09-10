<template>
  <nav class="mobile-horizontal flex-row flex--between flex--align">
    <div class="mobile-horizontal__meta">
      <v-img
        width="3.3rem"
        height="3.3rem"
        style="mobile-horizontal__img"
        max-height="3.3rem"
        max-width="3.3rem"
        :src="icon"
        @click="$router.push('/')"
      ></v-img>
    </div>
    <nuxt-link class="mobile-horizontal__search" to="/search">
      <fa icon="search" class="mobile-horizontal__search-icon"></fa>
      <div class="mobile-horizontal__text">検索</div>
    </nuxt-link>
    <div class="mobile-horizontal__profile" v-ripple @click="toggleMenu(true)">
      <!-- <v-avatar class="mobile-horizontal__avatar" :size="40" v-if="!loggedIn">
        <img :src="avatar">
      </v-avatar>-->
      <v-avatar class="mobile-horizontal__avatar" size="3.5rem">
        <v-img :src="$store.getters['auth/isAuthenticated']&&user.avatar? user.avatar:avatar"></v-img>
        <!-- <v-img v-else :src="avatar"></v-img> -->
        <div class="mobile-horizontal__notification" v-if="notificationCount"></div>
      </v-avatar>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      avatar: require("~/assets/profile.png"),
      icon: require("~/assets/No-shadow-icon.png")
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      loggedIn: "auth/isAuthenticated",
      notificationCount: "user/getCommentNotificationCount"
    })
  },
  methods: {
    toggleMenu(val) {
      this.$emit("toggle", val);
    }
  }
};
</script>

<style lang="scss">
.mobile-horizontal {
  $self: &;
  position: fixed;
  top: 0;
  left: 0;
  height: 5rem;
  width: 100vw;
  background-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  padding: 0 1.5rem;
  // border-radius: 2rem;
  // border-bottom--radius: 2rem;
  &__search {
    width: 10rem;
    height: 3rem;
    background-color: #f4f6f8;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #4a4b4c;
    #{$self}__search-icon {
      font-size: 1.3rem;
      // margin-left: 0.5rem;
    }
    #{$self}__text {
      font-size: 1.3rem;
      margin-left: 1rem;
    }
  }
  &__meta {
    // padding: 1rem;
    transition: 200ms;
    #{$self}__img {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
    }
    transform: scale(1);
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: scale(0.96);
      transition: 200ms;
    }
    #{$self}__bar {
      font-size: 2rem;
    }
  }
  &__notification {
    position: absolute;
    top: 0.5px;
    right: 0.1rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 20rem;
    background-color: red;
    content: "";
    // color:
  }
  &__profile {
    #{$self}__avatar {
      -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
}
</style>

