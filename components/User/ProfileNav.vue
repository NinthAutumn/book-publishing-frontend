<template>
  <nav class="profile-nav">
    <div class="profile-nav__container" v-if="scrolled"></div>
    <div class="profile-nav__container" :class="{'profile-nav__container--fixed': scrolled}">
      <transition name="reverse-twitter-nav">
        <div class="profile-nav__avatar" v-if="!scrolled">
          <v-avatar
            :size="180"
            class="profile-nav__avatar-img"
            @click.stop="$store.commit('TOGGLE_SETTING_MODAL')"
            v-if="user.avatar"
          >
            <!-- <img
            :src="`https://storage.googleapis.com/theta-images/${user.avatar}`"
            alt="user profile picture"
            >-->
            <img :src="user.avatar.img" alt>
          </v-avatar>
        </div>
      </transition>
      <div class="profile-nav__grid"></div>
      <div class="profile-nav__fixed-container">
        <transition name="twitter-nav">
          <div class="profile-nav__fixed-avatar" v-if="scrolled">
            <v-avatar class="profile-nav__avatar-img" :size="45">
              <img :src="user.avatar.img" alt>
            </v-avatar>
            <div class="flex-divider flex-column flex--between">
              <div class="profile-nav__fixed-username">{{user.username}}</div>
              <div class="profile-nav__fixed-meta" v-if="books_count > 0">作家</div>
              <div class="profile-nav__fixed-meta" v-else>メンバー</div>
            </div>
          </div>
        </transition>
      </div>

      <div class="profile-nav__content">
        <ul class="profile-nav__stats-list">
          <li v-for="(stat,index) in stat_menu" :key="index" class="profile-nav__stats-item">
            <div class="profile-nav__stats-item__title" v-text="stat.name"></div>
            <div class="profile-nav__stats-item__stats" v-text="stat.value"></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: Object,
    owner: Boolean,
    books_count: Number,
    reviews_count: Number
  },
  computed: {
    stats() {
      return this.$store.getters["users/getProfileStats"];
    }
  },
  data() {
    return {
      stat_menu: [
        {
          name: "作品",
          value: this.$store.getters["user/getProfileStats"].book_count
        },
        {
          name: "レビュー",
          value: this.$store.getters["user/getProfileStats"].review_count
        },
        {
          name: "良いね",
          value: this.$store.getters["user/getProfileStats"].likes
        },
        {
          name: "コメント",
          value: this.$store.getters["user/getProfileStats"].comment_count
        }
      ],
      scrolled: false
    };
  },
  methods: {
    changeSticky: function() {
      if (document.documentElement.scrollTop > 120) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
  },

  async mounted() {
    // this.stat_menu[1].value = this.stats.review_count;
    // this.stat_menu[2].value = this.stats.likes;
    // this.stat_menu[3].value = this.stats.comment_like;
  },
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.changeSticky);
    }

    // this.stats.forEach(item => {
    //   if (item.name === "作品") {
    //     item.value = this.books_count;
    //   }
    // });
  },
  destroyed() {
    window.removeEventListener("scroll", this.changeSticky);
  }
};
</script>

<style lang="scss">
.menu-active {
  .profile-nav {
    &__container {
      &--fixed {
        left: 22rem !important;
      }
    }
  }
}
.profile-nav {
  $self: &;
  &__container {
    height: 6rem;
    display: flex;
    position: sticky;
    box-shadow: 1px 1px 5px rgb(240, 240, 240);
    margin-top: 10rem;
    left: 0;
    top: 5rem;
    background-color: #fff;
    width: 100vw;
    transition: position 200ms;

    &--fixed {
      transition: position 200ms;
      top: 5rem;
      position: fixed;
      margin: 0;
      width: 100vw;
      margin: 0 auto;
      z-index: 1;
      background-color: #fff;
      padding: 0.5rem 0;
      box-sizing: border-box;
      // overflow: hidden;
      #{$self}__grid {
        width: 5rem;
      }
      #{$self}__fixed-container {
        // overflow: hidden;
      }
      #{$self}__fixed-avatar {
        width: 30rem;
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        // justify-content: center;
        #{$self}__avatar-img {
          box-shadow: 1px 1px 5px rgb(228, 228, 228);
        }
      }
      .flex-divider {
        margin-left: 5px;
        height: 100%;
      }
      #{$self}__fixed-username {
        font-size: 1.4rem;
      }
      #{$self}__fixed-meta {
        font-size: 1.4rem;
      }
    }
  }
  &__avatar {
    position: absolute;
    left: 5rem;
    bottom: -50px;
    border: 10px solid white;
    border-radius: 50%;
    box-shadow: 1px 1px 5px rgb(240, 240, 240);
    &-img {
    }
  }
  &__grid {
    width: 35rem;
  }
  &__content {
    #{$self}__stats-list {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 1rem;
      #{$self}__stats-item {
        display: flex;
        flex-direction: column;

        align-items: center;
        margin-right: 5rem;

        &__title {
          font-size: 1.4rem;
        }
        &__stats {
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>
