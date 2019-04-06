<template>
  <div class="user-profile">
    <profile-nav :books_count="books.length" :owner="owner" :user="user"></profile-nav>
    <user-content
      :reviews="reviews"
      :comments="comments"
      :books="books"
      :owner="owner"
      :user="user"
    ></user-content>
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
  methods: {
    changeSticky() {
      console.log("called");
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("user/fetchUser", { userId: params.id });
  },
  computed: {
    user() {
      return this.$store.getters["user/getUserProfile"];
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
      return this.$store.getters["user/getUserBooks"];
    },
    reviews() {
      return this.$store.getters["user/getUserReviews"];
    },
    comments() {
      return this.$store.getters["user/getUserComments"];
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.user-profile {
  padding: 10px 0;
}
</style>
