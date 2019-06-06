<template>
  <nav class="mobile-horizontal flex-row flex--between flex--align">
    <div class="mobile-horizontal__meta">
      <nuxt-link
        v-ripple
        v-if="$device.isDesktop||$device.isTablet"
        tag="div"
        to="/"
        class="site-logo"
      >ノーブル</nuxt-link>
    </div>
    <div class="mobile-horizontal__profile" v-ripple>
      <!-- <v-avatar class="mobile-horizontal__avatar" :size="40" v-if="!loggedIn">
        <img :src="avatar">
      </v-avatar>-->
      <v-avatar
        class="mobile-horizontal__avatar"
        :size="40"
        v-if="$store.getters['auth/isAuthenticated']"
      >
        <v-img :src="user.avatar.img||avatar"></v-img>
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
      avatar: require("~/assets/profile.png")
    };
  },
  computed: {
    ...mapGetters({
      user: "user/loggedInUser",
      loggedIn: "auth/isAuthenticated"
    })
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
  padding: 0 1rem;
  // border-radius: 2rem;
  // border-bottom--radius: 2rem;
  &__meta {
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

