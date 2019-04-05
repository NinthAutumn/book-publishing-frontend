<template>
  <div class="user-profile">
    <profile-nav :user="user"></profile-nav>
    <user-content :user="user"></user-content>
  </div>
</template>

<script>
import ProfileNav from "@/components/User/ProfileNav";
import UserContent from "@/components/User/Content";

export default {
  components: {
    ProfileNav,
    UserContent
  },
  async fetch({ store, params }) {
    await store.dispatch("user/fetchUser", { userId: params.id });
  },
  computed: {
    user() {
      return this.$store.getters["user/getUserProfile"];
    }
  }
};
</script>

<style lang="scss">
.user-profile {
  padding: 10px 0;
}
</style>
