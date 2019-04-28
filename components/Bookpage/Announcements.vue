<template>
  <div class="book-announcement">
    <ul class="book-announcement__list">
      <li
        class="book-announcement__item"
        v-for="(announcement,index) in announcements"
        :key="index"
      >{{announcemnt.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    announcements() {
      return this.$store.getters["book/getAnnouncements"];
    }
  },
  async mounted() {
    this.$store.dispatch("book/fetchAnnouncements", {
      bookId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
</style>
