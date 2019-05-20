<template>
  <div class="latest-chapters">
    <ul class="latest-chapters__list">
      <li
        tag="li"
        class="latest-chapters__item"
        v-ripple
        v-for="(notification,index) in notifications"
        :key="index"
        @click="clickHandler(notification.book_id,notification.chapter_id,notification.notification_object_id)"
      >
        <div class="latest-chapters__cover">
          <v-img
            :src="notification.cover"
            :aspect-ratio="1/1.5"
            width="3rem"
            alt="Book cover"
            style
            class="latest-chapters__image"
          ></v-img>
        </div>
        <div class="latest-chapters__chapter-meta flex--center flex-column">
          <div class="latest-chapters__chapter-title">
            <p v-text="notification.title"></p>
          </div>
          <div class="flex-divider flex-row flex--align flex--between">
            <div class="latest-chapters__chapter-index">第{{notification.index}}話</div>
            <div
              class="latest-chapters__chapter-date"
            >{{$moment(notification.created_at).startOf('minute').fromNow()}}</div>
          </div>
        </div>
        <!-- <div class="latest-chapters__chapter-title">
          <p v-text="notification.title"></p>
        </div>
        <div class="latest-chapters__chapter-meta flex flex--between">
          <div class="latest-chapters__chapter-index">第{{notification.index}}話</div>
          <div
            class="latest-chapters__chapter-date"
          >{{$moment(notification.created_at).startOf('minute').fromNow()}}</div>
        </div>-->
        <div v-if="!notification.read" class="latest-chapters__notification"></div>
      </li>
      <no-ssr>
        <no-ssr>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </no-ssr>
      </no-ssr>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 2
    };
  },
  async mounted() {
    if (this.$store.state.auth.loggedIn) {
      await this.$store.dispatch("user/fetchNotifications", {
        page: 1,
        limit: 7
      });
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
    },
    async clickHandler(bookId, chapterId, id) {
      console.log(id);
      //  :to="`/books/${notification.book_id}/${notification.chapter_id}`"
      await this.$axios.patch(`/notification/chapter/read?objectId=${id}`);
      this.$router.push(`/books/${bookId}/${chapterId}`);
    },
    async infiniteHandler($state) {
      let notification = await this.$store.dispatch("user/fetchNotifications", {
        page: this.page++,
        limit: 7,
        infinite: true
      });

      if (notification.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
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
    padding: 1rem 0.5rem;
  }
  &__item {
    position: relative;
    width: inherit;
    // height: 55px;
    border-radius: 1rem;
    // height: 4rem;
    display: flex;
    // padding: 8px;
    color: #4f566b;
    box-sizing: border-box;
    box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
      rgba(42, 47, 69, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    transition: 300ms;
    margin-bottom: 5px;
    // margin: 3rem 0;
    &:hover {
      user-select: none;
      cursor: pointer;
      // box-shadow: 1px 1px 5px 0 rgb(207, 207, 207);
      transition: 300ms;
    }
    #{$self}__cover {
      // position: absolute;
      // top: 0;
      // min-width: 4rem;
      #{$self}__image {
        // transform: translateY(-1rem);
        // border-radius: 0.4rem;
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
      }
      // bottom: 0;
    }
    #{$self}__chapter-meta {
      // padding: 0.4rem 0.1rem;
      padding-left: 1rem;
    }
    #{$self}__notification {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 100px;
      background-color: $primary;
      position: absolute;
      top: 5px;
      right: 5px;
    }
    #{$self}__chapter-title {
      // width: 95%;
      font-size: 6px;
      // margin-bottom: 1rem;
      // width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // max-width: 100%;
      p {
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 18rem;
      }
    }
    #{$self}__chapter-index {
      color: #4f566b;
      font-size: 1rem;
      // transform: translateX(5rem);
    }
    #{$self}__chapter-date {
      font-size: 1rem;
      color: #aab7c4;
    }
  }
}
</style>
