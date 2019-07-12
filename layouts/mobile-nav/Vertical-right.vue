<template>
  <nav class="mv-right">
    <div class="mv-right__nav">
      <div class="mv-right__icon" v-ripple @click.stop="toggleMenu">
        <fa icon="bars" class="mv-right__bar"></fa>
      </div>
    </div>
    <ul class="mv-right__list">
      <!-- <div class="mv-right__item mv-right__item--profile" v-if="$store.state.auth.loggedIn">
        <v-avatar class="mv-right__avatar" size="5.5rem" v-if="user.avatar">
          <v-img :src="user.avatar.img||avatar"></v-img>
        </v-avatar>
        <div class="mv-right__meta-list">
          <div class="mv-right__meta mv-right__meta--username">{{user.username}}</div>
          <div class="mv-right__meta mv-right__meta--email">{{user.email}}</div>
        </div>
      </div>-->
      <nuxt-link
        :to="!auth&&menu.meta==='library'? '/auth/login' :menu.link"
        tag="li"
        v-ripple
        class
        v-for="(menu, key) in menus"
        :key="key"
      >
        <div class="mv-right__item mv-right__item--list">
          <fa class="mv-right__icon" :icon="menu.icon"></fa>
          <p>{{menu.title}}</p>
        </div>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Horizontal",
  props: {
    user: Object
  },
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  data() {
    return {
      avatar: require("~/assets/profile.png"),
      menus: {
        home: {
          title: "ホーム",
          icon: "home",
          link: "/",
          meta: ""
        },
        search: {
          title: "検索",
          icon: "search",
          link: "/browse/mobile",
          meta: "search"
        },
        ranking: {
          title: "ランキング",
          icon: "crown",
          link: "/rankings",
          meta: "ranking"
        },
        update: {
          title: "更新",
          icon: "globe",
          link: "/update",
          meta: "update"
        },
        library: {
          title: "ライブラリー",
          icon: "book",
          link: "/library",
          meta: "library"
        }
      }
    };
  },
  components: {},
  methods: {
    navigate(key) {
      if (key === "library") {
        if (!this.$store.getters["auth/isAuthenticated"]) {
          this.$toast.show("ライブラリーを使用する場合アカウントが必要です", {
            theme: "toasted-primary",
            duration: 1000,
            position: "top-center",
            icon: "extension"
          });
          return this.$router.push("/auth/login");
        }
      }
      return this.$router.push(this.menus[key].link);
    },
    toggleMenu() {
      this.$emit("toggle", false);
    }
  }
};
</script>
<style lang="scss">
.mv-right {
  position: fixed;
  width: 300px;
  height: 100vh;
  background-color: white;
  top: 0;
  left: 0;
  z-index: 1111;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  $self: &;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &__nav {
    height: 5rem;
    display: flex;
    align-items: center;
    // justify
    padding: 0 1rem;
    #{$self}__icon {
      padding: 1rem;
      #{$self}__bar {
        font-size: 2rem;
      }
    }
  }
  &__item {
    font-size: 1.6rem;
    &--profile {
      padding: 1rem 1.5rem;
    }
    &--list {
      padding: 0 1.8rem;
      // padding: 0 1.5rem;
      height: 4.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        flex-grow: 1;
        font-size: inherit;
        margin-left: 1.5rem;
      }
    }
  }
  &__icon {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 2.5rem;
  }
  &__avatar {
    box-shadow: 1px 1px 5px rgb(245, 245, 245);
  }
  &__meta-list {
    margin-top: 1rem;
  }
  &__meta {
    font-size: 1.4rem;
    &--username {
      font-weight: bold;
    }
    &--email {
      font-size: 1.3rem;
    }
  }
}
</style>
