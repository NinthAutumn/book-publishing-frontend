<template>
  <div class="comment-header">
    <div class="comment-header__container flex-row flex--align">
      <div
        class="comment-header__item comment-header__item--username"
      >{{author_id===comment.user_id?comment.pen_name:comment.username}}</div>
      <div class="comment-header__item">
        <component :is="badgeInstance" :badges="badges" />
      </div>
      <div
        class="comment-header__item comment-header__item--rating"
        :class="{'comment-header__item--bad':likes<0}"
      >{{likes}}</div>
      <div
        class="comment-header__item comment-header__item--date"
      >{{$moment(comment.created_at).startOf('minute').fromNow()}}</div>
      <div
        class="comment-header__item comment-header__item--anchor"
        @click="$emit('toggleChildren')"
      >
        <!-- <fa icon="anchor"></fa> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    likes: [Number, String],
    author_id: [String, Number]
  },
  data() {
    return {
      badges: []
    };
  },
  computed: {
    badgeInstance() {
      if (this.badges.length > 0) return () => import("./BadgeList");
      return;
    }
  },
  mounted() {
    if (this.author_id === this.comment.user_id) {
      this.badges.push({
        icon: "feather-alt",
        color: "#3ECF8E",
        title: "作者",
        description: "この作品の作者である"
      });
    }
  }
};
</script>

<style lang="scss">
.comment-header {
  $self: &;
  &__container {
    &:hover {
      #{$self}__item {
        &--anchor {
          visibility: visible;
        }
      }
    }
    #{$self}__item {
      font-size: 13px;
      margin-right: 10px;
      color: #818384;
      &--rating {
      }
      &--username {
        font-weight: bold;
        color: $primary;
      }
      &--bad {
        color: blue;
      }
      &--date {
        font-size: 11px;
      }
      &--anchor {
        cursor: pointer;
        visibility: hidden;
      }
    }
  }
}
</style>
