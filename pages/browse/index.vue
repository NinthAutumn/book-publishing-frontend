<template>
  <div class="page-padding">
    <book-page></book-page>
  </div>
</template>

<script>
export default {
  auth: false,
  components: {
    BookPage: () => import("@/components/Web/Page/Browse")
  },
  async fetch({ store, route }) {
    let direction = 0,
      type = 5,
      genres = [],
      tags = [];
    if (route.query.genre && route.query.genre !== "undefined") {
      genres = [route.query.genre];
    }
    if (route.query.tag && route.query.tag !== "undefined") {
      tags.push(route.query.tag);
    }
    await store.dispatch("book/browseBooks", {
      type,
      direction,
      tags,
      genres,
      page: 1,
      limit: 20
    });
  }
};
</script>
