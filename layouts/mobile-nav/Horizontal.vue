<template>
  <nav class="mobile-horizontal flex-row flex--between flex--align">
    <div class="mobile-horizontal__meta" v-ripple @click.stop="toggleMenu(false)">
      <fa icon="bars" class="mobile-horizontal__bar"></fa>
    </div>
    <div class="mobile-horizontal__profile" v-ripple @click="toggleMenu(true)">
      <!-- <v-avatar class="mobile-horizontal__avatar" :size="40" v-if="!loggedIn">
        <img :src="avatar">
      </v-avatar>-->
      <v-avatar class="mobile-horizontal__avatar" :size="41">
        <v-img :src="$store.getters['auth/isAuthenticated']&&user.avatar? user.avatar.img:avatar"></v-img>
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
      avatar: require("~/assets/profile.png")
    };
  },
  computed: {
    ...mapGetters({
      user: "user/loggedInUser",
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
  padding: 0 1rem;
  // border-radius: 2rem;
  // border-bottom--radius: 2rem;
  &__meta {
    padding: 1rem;
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

