<template>
  <div class="mobile-comment__item">
    <div class="mobile-comment__avatar">
      <v-avatar size="40">
        <v-img :src="chapter.author_id === comment.user_id? comment.author_avatar : comment.avatar"></v-img>
      </v-avatar>
    </div>
    <div class="mobile-comment__meta">
      <div class="flex-divider flex-row flex--align mobile-comment__user">
        <div
          class="mobile-comment__username"
          v-text="comment.user_id === chapter.author_id ? comment.pen_name : comment.username"
        ></div>
        <fa
          class="mobile-comment__badge"
          icon="feather-alt"
          v-if="comment.user_id===chapter.author_id"
        ></fa>
      </div>

      <div
        class="mobile-comment__content"
        v-ripple
        @click.stop="$emit('create', {parent_id:comment.id})"
      >
        <div class="mobile-comment__text">{{comment.content}}</div>
        <div class="mobile-comment__parent" v-if="comment.parent_username">
          <div
            class="mobile-comment__parent-user"
            v-text="comment.parent_user_id === chapter.author_id ? comment.parent_pen_name : comment.parent_username"
          ></div>
          <div class="mobile-comment__parent-content">{{comment.parent_content}}</div>
        </div>
      </div>
      <div class="flex-divider flex-row flex--align flex--between">
        <div class="mobile-comment__rating flex-row flex--align">
          <div
            class="mobile-comment__rate mobile-comment__rate--like"
            :class="{'mobile-comment__rate--liked':liked}"
            @click.stop="likedComment"
          >
            <fa icon="thumbs-up"></fa>
          </div>
          <div
            class="mobile-comment__rate mobile-comment__rate--dislike"
            :class="{'mobile-comment__rate--disliked':disliked}"
            @click.stop="dislikedComment"
          >
            <fa icon="thumbs-up"></fa>
          </div>
        </div>
        <div
          class="mobile-comment__date"
        >{{$moment(comment.created_at).startOf('minute').fromNow()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    chapter: Object
  },

  data() {
    return {
      current: this.comment.content,
      liked: this.comment.voted > 0,
      disliked: this.comment.voted < 0,
      likeNumber: this.comment.likes
    };
  },
  methods: {
    async likedComment() {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (this.liked) {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 0
        });
        this.likeNumber--;
        this.liked = false;
      } else {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 1
        });
        this.liked = true;
        if (this.disliked) {
          this.likeNumber = this.likeNumber + 2;
          this.disliked = false;
        } else {
          this.likeNumber++;
        }
      }
    },
    async dislikedComment() {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (this.disliked) {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 0
        });
        this.likeNumber++;
        this.disliked = false;
      } else {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: -1
        });
        this.disliked = true;
        if (this.liked) {
          this.likeNumber = this.likeNumber - 2;
          this.liked = false;
        } else {
          this.likeNumber--;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.mobile-comment {
  $self: &;
  &__item {
    display: flex;
    width: 100%;
    max-width: 100%;
    // min-height:
    #{$self}__avatar {
      width: 5.5rem;
    }
    #{$self}__meta {
      display: flex;
      width: 100%;
      max-width: 100%;
      // align-items: center;
      margin-bottom: 0.75rem;
      flex-direction: column;
      #{$self}__badge {
        color: #3ecf8e;
        font-size: 1.6rem;
      }
      #{$self}__user {
      }
      #{$self}__username {
        margin-right: 1rem;
        font-size: 1.6rem;
        font-weight: bold;
      }
      #{$self}__text {
        font-size: 1.8rem;
        margin-bottom: 0.75rem;
      }
      #{$self}__parent {
        border: 0.3px solid;
        margin-top: 0.75rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        border-color: rgb(245, 245, 245);
        #{$self}__parent-user {
          font-size: 1.5rem;
          font-weight: bold;
        }
        #{$self}__parent-content {
          font-size: 1.5rem;
        }
      }
      #{$self}__rating {
        #{$self}__rate {
          font-size: 1.5rem;
          &--liked {
            color: orangered;
          }
          &--like {
            margin-right: 0.5rem;
            &:hover {
              color: orangered;
            }
          }
          &--disliked {
            color: #7193ff;
          }
          &--dislike {
            transform: rotate(180deg) translateY(-3px);
            &:hover {
              color: #7193ff;
            }
          }
        }
      }
    }
  }
}
</style>
