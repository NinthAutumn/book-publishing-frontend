<template>
  <div class="mobile-inbox">
    <ul class="mobile-inbox__list" :style="{maxHeight}">
      <li
        class="mobile-inbox__item flex-row"
        v-for="(notification,index) in notifications"
        v-ripple
        :key="index"
        tag="li"
      >
        <div class="mobile-inbox__avatar">
          <v-avatar size="25" v-if="notification.avatar">
            <v-img :src="notification.avatar"></v-img>
          </v-avatar>
        </div>
        <div class="mobile-inbox__meta flex-column">
          <p class="mobile-inbox__content">{{`${notification.username}: ${notification.content}`}}</p>
          <div
            class="mobile-inbox__parent"
            v-if="notification.parent_content"
            v-text="notification.parent_content"
          ></div>
          <span
            class="mobile-inbox__created-at"
          >{{$moment(notification.created_at).startOf('second').fromNow()}}</span>
        </div>
      </li>
      <no-ssr>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </no-ssr>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// :to="`/books/${notification.book_id}/${notification.chapter_id}?comment=${notification.comment_id}#comments`"

export default {
  props: {
    maxHeight: {
      type: String,
      default: "30vh"
    }
  },
  data() {
    return {
      loading: false,
      page: 2
    };
  },
  computed: {
    ...mapGetters({
      notifications: "user/getCommentNotification"
    })
  },
  methods: {
    async infiniteHandler($state) {
      let notifications = await this.$store.dispatch(
        "user/fetchCommentNotifications",
        {
          page: this.page++,
          infinite: true
        }
      );
      if (notifications.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("user/fetchCommentNotifications", { page: 1 });
    await this.$store.dispatch("user/patchCommentNotificationRead");
  }
};
</script>

<style lang="scss">
.mobile-inbox {
  $self: &;
  &__list {
    padding: 1rem 0.5rem;

    overflow: auto;
    #{$self}__item {
    }
    #{$self}__avatar {
      min-width: 3.5rem;
    }
    #{$self}__meta {
      width: 100%;
    }
    #{$self}__content {
      font-size: 1.5rem;
    }
    #{$self}__created-at {
      margin-left: auto;
      // align
    }
    #{$self}__parent {
      padding: 0.5rem;
      border-radius: 0.4rem;
      border: 1px solid #e3e8ee;
      background-color: #f7fafc;
      font-size: 1.5rem;
    }
  }
}
</style>
