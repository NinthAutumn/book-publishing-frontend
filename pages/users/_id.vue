<template>
  <div class="user-profile">
    <profile-nav :books_count="books.length" :user="user"></profile-nav>
    <user-content :books="books" :user="user"></user-content>
  </div>
</template>

<script>
export default {
  auth: false,
  components: {
    ProfileNav: () => import("@/components/User/ProfileNav"),
    UserContent: () => import("@/components/User/Content")
  },
  methods: {
    changeSticky() {}
  },
  async fetch({ store, params }) {
    await store.dispatch("user/fetchProfile", { userId: params.id });
    await store.dispatch("user/fetchProfileStats", {
      userId: params.id
    });
  },
  computed: {
    user() {
      return this.$store.getters["user/getProfile"];
    },

    owner() {
      if (this.$store.getters["isLoggedIn"]) {
        return (
          this.$store.getters["user/getUserProfile"]._id ===
          this.$store.getters["loggedInUser"]._id
        );
      } else {
        return false;
      }
    },
    books() {
      return this.$store.getters["user/getProfileBooks"];
    }
  },
  async mounted() {}
};
</script>

<style lang="scss">
.user-profile {
  padding: 10px 0;
}
</style>
