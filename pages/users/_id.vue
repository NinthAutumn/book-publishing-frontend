<template>
  <div class="user-profile">
    <div class="user-profile__web" v-if="!$device.isMobile">
      <profile-nav :books_count="books.length" :user="user"></profile-nav>
      <user-content :books="books" :user="user"></user-content>
    </div>
    <div class="user-profile__mobile page-padding" v-else>
      <mobile-profile :author="$route.query.author"></mobile-profile>
      <div class="user-profile__books" v-if="$route.query.author">
        <div class="user-profile__title">作品</div>
        <mobile-books v-if="books.length > 0" :slides="3.5" :books="books"></mobile-books>
        <div class="user-profile__no-book" v-else></div>
      </div>
      <div class="user-profile__moments">
        <mobile-moment :user="user"></mobile-moment>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  auth: false,
  components: {
    ProfileNav: hydrateWhenVisible(() =>
      import("@/components/User/ProfileNav")
    ),
    UserContent: hydrateWhenVisible(() => import("@/components/User/Content")),
    MobileProfile: hydrateWhenVisible(() =>
      import("@/components/Mobile/Cards/User/Profile")
    ),
    MobileBooks: hydrateWhenVisible(() =>
      import("@/components/Mobile/List/Book")
    ),
    MobileMoment: hydrateWhenVisible(() =>
      import("@/components/Mobile/List/Moment")
    )
  },
  async fetch({ store, route }) {
    await store.dispatch("user/fetchUserWithUserId", {
      userId: route.params.id
    });
    await store.dispatch("user/fetchProfileStats", {
      userId: route.params.id
    });
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
      books: "user/getProfileBooks",
      current: "auth/getUser"
    }),
    owner: function() {
      return this.user.id === this.current.id;
    }
  },
  async mounted() {
    await this.$store.dispatch("user/fetchProfileBooks", {
      userId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
.user-profile {
  padding: 10px 0;
  $self: &;
  &__books {
    padding: 1rem 0;
  }
  $min_width: 320px;
  $max_width: 430px;
  $min_font: 1.8rem;
  $max_font: 2.2rem;
  //  @include fluid-type($min_width, $max_width, $min_font, $max_font);
  &__title {
    font-size: 1.8rem;
    margin: 1rem 0;
    font-weight: bold;
  }
}
</style>
