<template>
  <nav class="mv-right">
    <ul class="mv-right__list">
      <nuxt-link
        tag="li"
        class="mv-right__item"
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.link"
      >{{menu.title}}</nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Horizontal",
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
          title: "リーディングリスト",
          icon: "store",
          link: "/readinglists",
          meta: "store"
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
}
</style>
