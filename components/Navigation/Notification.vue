<template>
  <div class="notification-component" v-loading="loading">
    <div class="notification-component__header">
      <div class="notification-component__title">通知</div>
    </div>
    <ul class="notification-component__list">
      <nuxt-link
        class="notification-component__item flex-row"
        v-for="(notification,index) in notifications"
        :key="index"
        tag="li"
        :to="`/books/${notification.book_id}/${notification.chapter_id}?comment=${notification.comment_id}#comments`"
      >
        <div class="notification-component__avatar">
          <v-avatar v-if="notification.avatar">
            <v-img :src="notification.avatar"></v-img>
          </v-avatar>
        </div>
        <div class="nofitication-component__meta">
          <p
            class="notification-component__content"
          >{{`${notification.username} さんが: "${notification.content}" とあなたのコメントに返事をしました`}}</p>
          <span
            class="notification-component__created-at"
          >{{$moment(notification.created_at).startOf('second').fromNow()}}</span>
        </div>
      </nuxt-link>
      <client-only>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
    this.loading = true;
    await this.$store.dispatch("user/fetchCommentNotifications", { page: 1 });
    await this.$store.dispatch("user/patchCommentNotificationRead");
    this.loading = false;
  }
};
</script>

<style lang="scss">
.notification-component {
  position: fixed;
  top: 5rem;
  width: 40rem;
  right: 15rem;
  color: black;
  border-radius: 0.4rem;
  background-color: #fff;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
  $self: &;
  &__header {
    font-size: 1.8rem;
    #{$self}__title {
      font-size: inherit;
    }
    padding: 1.6rem;
  }
  &__list {
    height: 40rem;
    overflow: auto;
    #{$self}__item {
      padding: 1.6rem;
      background-color: #fff;
      transition: background-color 150ms ease;

      &:hover {
        background-color: rgb(243, 243, 243);
        cursor: pointer;
        user-select: none;
        transition: background-color 150ms ease;
      }
      #{$self}__content {
        word-break: break-all;
        font-size: 1.6rem;
      }
      #{$self}__created-at {
        font-size: 1.4rem;
        color: grey;
      }
      #{$self}__avatar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-right: 1.6rem;
        .v-avatar {
          box-shadow: 0 1px 3px 0 #e6ebf1;

          transition: box-shadow 150ms ease, border 200ms ease,
            -webkit-transform 150ms ease;
          transition: box-shadow 150ms ease, transform 150ms ease,
            border 200ms ease;
          transition: box-shadow 150ms ease, transform 150ms ease,
            border 200ms ease, -webkit-transform 150ms ease;
          -webkit-user-select: none;
        }
      }
    }
  }
}
</style>
