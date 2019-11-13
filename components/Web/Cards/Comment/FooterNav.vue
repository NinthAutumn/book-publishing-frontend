<template>
  <div class="comment-footer">
    <div class="comment-footer__list flex-row flex--align">
      <div
        class="comment-footer__item flex-row flex--align"
        :class="itemClass(item)"
        @click.stop="itemHandler(item.type)"
        v-for="item in list"
        :key="item.type"
      >
        <fa :icon="item.icon"></fa>
        <div class="comment-footer__text" v-if="item.text" v-text="item.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    auth: Boolean,
    user_id: String,
    comment: Object
  },
  methods: {
    ...mapActions({
      likeComment: "comment/likeComment"
    }),
    itemClass(item) {
      return {
        "comment-footer__item--liked": this.isLiked(item.type),
        "comment-footer__item--disliked": this.isDisliked(item.type),
        "comment-footer__item--dislike": this.isDislike(item.type),
        "comment-footer__item--like": this.isLike(item.type)
      };
    },

    isLiked(type) {
      return this.liked && type === "like";
    },
    isLike(type) {
      return type === "like";
    },
    isDislike(type) {
      return type === "dislike";
    },
    isDisliked(type) {
      return this.disliked && type === "dislike";
    },
    itemHandler(type) {
      const typeHandle = {
        like: () => this.likeHandler(),
        dislike: () => this.dislikeHandler(),
        reply: () => this.$emit("toggleReply"),
        report: () => this.$emit("toggleReport")
      };
      return typeHandle[type]();
    },
    async likeHandler() {
      if (!this.auth) return this.$store.commit("LOGIN_STATE");

      if (this.liked) {
        await this.likeComment({
          commentId: this.comment.id,
          data: 0
        });
        this.$emit("rateComment", -1);
        this.liked = false;
      } else {
        await this.likeComment({
          commentId: this.comment.id,
          data: 1
        });
        this.liked = true;
        if (this.disliked) {
          this.$emit("rateComment", 2);
          this.disliked = false;
        } else {
          this.$emit("rateComment", 1);
        }
      }
    },
    async dislikeHandler() {
      if (!this.auth) return this.$store.commit("LOGIN_STATE");
      if (this.disliked) {
        await this.likeComment({
          commentId: this.comment.id,
          data: 0
        });
        this.$emit("rateComment", 1);
        this.disliked = false;
      } else {
        await this.likeComment({
          commentId: this.comment.id,
          data: -1
        });
        this.disliked = true;
        if (this.liked) {
          this.$emit("rateComment", -2);
          this.liked = false;
        } else {
          this.$emit("rateComment", -1);
        }
      }
    }
  },

  data() {
    return {
      liked: false,
      disliked: false,
      list: [
        {
          icon: "thumbs-up",
          type: "like",
          text: ""
        },
        {
          icon: "thumbs-down",
          type: "dislike",
          text: ""
        },
        {
          icon: "comment-alt",
          type: "reply",
          text: "返信"
        },
        {
          icon: "flag",
          type: "report",
          text: "報告"
        }
      ]
    };
  },
  mounted() {
    if (this.comment.user_id === this.user_id) {
      this.list.push({
        icon: "pen",
        type: "edit",
        text: "編集"
      });
    }
    this.liked = this.comment.voted > 0;
    this.disliked = this.comment.voted < 0;
  }
};
</script>

<style lang="scss">
.comment-footer {
  $self: &;
  &__list {
    #{$self}__item {
      // margin-right: px;
      cursor: pointer;
      font-size: 13px;
      @include themify($themes) {
        color: themed("textLightColor");
      }
      padding: 3px 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        @include themify($themes) {
          background: themed("textHoverLightColor");
        }
      }
      &--disliked {
        padding: 3px;
        color: #7193ff;
      }
      &--dislike {
        padding: 3px;
        transform: rotateY(180deg) translateY(3px);
      }
      &--like {
        padding: 3px;
      }
      &--liked {
        padding: 3px;
        color: orangered;
      }
      #{$self}__text {
        // margin-right: 10px;
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
