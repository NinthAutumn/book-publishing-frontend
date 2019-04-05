<template>
  <div class="user-profile">
    <profile-nav :owner="owner" :user="user"></profile-nav>
    <user-content :owner="owner" :user="user"></user-content>
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
    },
    owner() {
      return (
        this.$store.getters["user/getUserProfile"]._id ===
        this.$store.getters["loggedInUser"]._id
      );
    }
  }
};
</script>

<style lang="scss">
.user-profile {
  padding: 10px 0;
}
</style>
