<template>
  <div class="latest-chapters">
    <ul class="latest-chapters__list">
      <nuxt-link
        tag="li"
        class="latest-chapters__item"
        v-ripple
        v-for="(notification,index) in notifications"
        :key="index"
        :to="`/books/${notification.book_id}/${notification.chapter_id}`"
      >
        <div class="latest-chapters__chapter-title flex flex--between">
          <p v-text="notification.title"></p>
        </div>
        <div class="latest-chapters__chapter-meta flex flex--between">
          <div class="latest-chapters__chapter-index">第{{notification.index}}話</div>
          <div
            class="latest-chapters__chapter-date"
          >{{$moment(notification.created_at).startOf('minute').fromNow()}}</div>
        </div>
        <div class="latest-chapters__notification"></div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.$store.state.auth.loggedIn) {
      await this.$store.dispatch("user/fetchNotifications");
    }
  },
  computed: {
    notifications() {
      return this.$store.getters["user/getNotification"];
    }
  },
  methods: {
    async removeInbox(chapterId, bookId) {
      await this.$store.dispatch("library/patchLatestChapters", { chapterId });
      this.$router.push("/books/" + bookId + "/" + chapterId);
    }
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 17) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.latest-chapters {
  width: 100%;
  $self: &;
  height: 300px;
  overflow: auto;
  &__list {
    width: inherit;
    padding: 0.5rem;
  }
  &__item {
    position: relative;
    width: inherit;
    // height: 55px;
    border-radius: 1rem;

    padding: 8px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    transition: 300ms;
    margin-bottom: 5px;
    &:hover {
      user-select: none;
      cursor: pointer;
      box-shadow: 1px 1px 5px 0 rgb(207, 207, 207);
      transition: 300ms;
    }
    #{$self}__chapter-meta {
    }
    #{$self}__notification {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 100px;
      background-color: $primary;
      position: absolute;
      top: 5px;
      right: 5px;
    }
    #{$self}__chapter-title {
      width: 95%;
      font-size: 13px;
      margin-bottom: 1rem;
      // width: 200px;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    #{$self}__chapter-index {
      font-size: 12px;
    }
    #{$self}__chapter-date {
      font-size: 12px;
    }
  }
}
</style>
