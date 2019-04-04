<template>
  <nav class="mv-right">
    <ul class="mv-right__list">
      <div class="mv-right__item mv-right__item--profile" v-if="$store.state.auth.loggedIn">
        <v-avatar class="mv-right__avatar" size="5.5rem">
          <img :src="user.avatar">
        </v-avatar>
        <div class="mv-right__meta-list">
          <div class="mv-right__meta mv-right__meta--username">{{user.username}}</div>
          <div class="mv-right__meta mv-right__meta--email">{{user.email}}</div>
        </div>
      </div>
      <nuxt-link
        tag="li"
        v-ripple
        class="mv-right__item mv-right__item--list"
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.link"
      >
        <fa class="mv-right__icon" :icon="menu.icon"></fa>
        <p>{{menu.title}}</p>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Horizontal",
  props: {
    user: Object
  },
  data() {
    return {
      menus: [
        {
          title: "ホーム",
          icon: "home",
          link: "/",
          meta: ""
        },
        {
          title: "検索",
          icon: "search",
          link: "/browse",
          meta: "search"
        },
        {
          title: "ランキング",
          icon: "crown",
          link: "/rankings",
          meta: "ranking"
        },
        {
          title: "更新",
          icon: "globe",
          link: "/update",
          meta: "update"
        },
        {
          title: "ライブラリー",
          icon: "book",
          link: "/library",
          meta: "library"
        }
      ]
    };
  },
  components: {},
  computed: {},
  methods: {}
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
  box-shadow: 1px 1px 5px grey;
  &__item {
    font-size: 1.6rem;
    &--profile {
      padding: 1rem 1.5rem;
    }
    &--list {
      padding: 0 1.5rem;
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
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 2rem;
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
