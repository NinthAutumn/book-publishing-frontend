<template>
  <div class="mbp-reviewp">
    <div class="mbp-reviewp__container">
      <div class="flex-divider flex-row flex--align">
        <div class="mbp-reviewp__avatar">
          <v-avatar :size="50" class="mbp-reviewp__img">
            <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar"></v-img>
          </v-avatar>
        </div>
        <div class="flex-divider flex-column" style="text-overflow:ellipsis;overflow:hidden;">
          <div class="mbp-reviewp__title" v-text="review.title"></div>
          <v-rating color="#FF8D29" readonly :size="18" half-increments :value="+review.rating"></v-rating>
          <div class="flex-divider flex-row flex--align">
            <div class="mbp-reviewp__author" v-text="review.username"></div>
            <div class="mbp-reviewp__writer" v-if="book.user_id === review.user_id">作者</div>
          </div>
        </div>
      </div>
      <div class="mbp-reviewp__meta">
        <div
          v-if="review.content.length > limit-1 &&!open"
          class="mbp-reviewp__content"
          v-html="truncate(review.content,limit)"
        ></div>
        <div
          class="mbp-reviewp__content"
          v-else-if="review.content.length <limit || open"
          v-html="review.content"
        ></div>
        <div class="mbp-reviewp__nav" v-if="review.content.length > limit-1">
          <div class="mbp-reviewp__open" v-if="!open" @click.stop="$emit('selectReview',review.id)">
            詳細
            <fa icon="caret-right" class="mbp-reviewp__icon"></fa>
          </div>
          <div class="mbp-reviewp__close" @click="open=!open" v-else>
            一部を表示
            <fa icon="caret-left" class="mbp-reviewp__icon"></fa>
          </div>
        </div>
        <div v-else class="mbp-reviewp__rating-nav flex-row flex--right flex--align">
          <div
            class="mbp-reviewp__rate mbp-reviewp__rate--dislike"
            @click="dislikedReview"
            :class="{'mbp-reviewp__rate--disliked':disliked}"
          >
            <fa class="mbp-reviewp__rate-icon mbp-reviewp__rate-icon--dislike" icon="thumbs-up"></fa>
          </div>
          <div class="mbp-reviewp__rating" v-text="likeNumber"></div>
          <div
            class="mbp-reviewp__rate mbp-reviewp__rate--like"
            @click="likedReview"
            :class="{'mbp-reviewp__rate--liked':liked}"
          >
            <fa class="mbp-reviewp__rate-icon mbp-reviewp__rate-icon--like" icon="thumbs-up"></fa>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
    book: Object,
    limit: { type: Number, default: 300 }
  },
  data() {
    return {
      open: false,
      liked: false,
      disliked: false,
      likeNumber: 0
    };
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "...";
      } else {
        return string;
      }
    },
    async likedReview() {
      if (this.liked) {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 0
        });
        this.likeNumber--;
        this.liked = false;
      } else {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 1
        });
        this.liked = true;
        if (this.disliked) {
          this.likeNumber = _.toNumber(this.likeNumber) + 2;
          this.disliked = false;
        } else {
          this.likeNumber++;
        }
      }
    },
    async dislikedReview() {
      if (this.disliked) {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: 0
        });
        this.likeNumber++;
        this.disliked = false;
      } else {
        await this.$store.dispatch("review/likeReview", {
          reviewId: this.review.id,
          data: -1
        });
        this.disliked = true;
        if (this.liked) {
          this.likeNumber = _.toNumber(this.likeNumber) - 2;
          this.liked = false;
        } else {
          this.likeNumber--;
        }
      }
    }
  },
  mounted() {
    this.liked = this.review.voted > 0;
    this.disliked = this.review.voted < 0;
    this.likeNumber = this.review.likes;
  }
};
</script>

<style lang="scss">
.mbp-reviewp {
  $self: &;
  .v-icon {
    padding: 0 !important;
  }
  &__container {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    max-width: 100%;
    overflow: hidden;
    #{$self}__avatar {
      margin-right: 0.5rem;
      #{$self}__img {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
    }
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    #{$self}__meta {
      padding: 1rem;
      border-radius: 1rem;
    }
    #{$self}__title {
      font-size: 1.5rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: bold;
      max-width: 100%;
    }
    #{$self}__author {
      font-size: 1.4rem;
      color: rgba(27, 27, 27, 0.918);
    }
    #{$self}__writer {
      font-size: 1rem;
      color: white;
      padding: 0.1rem 1rem;
      border-radius: 10rem;
      background-color: $secondary;
      margin-left: 1rem;
    }
    #{$self}__rating {
      display: flex;
      align-items: center;
      // justify-content: center;
      color: black;
      font-size: 1.4rem;
      margin: 0 1rem;
      #{$self}__icon {
        margin-right: 0.5rem;
        color: #ff8d29;
      }
      #{$self}__rate {
        color: #ff8d29;
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
    #{$self}__rating-nav {
      background-color: #fff;
    }
    #{$self}__rate {
      // height: 4rem;
      // width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      color: rgb(133, 133, 133);
      &--liked {
        // margin-left: 0.5rem;
        color: orangered;
      }
      &--disliked {
        // margin-right: 0.5rem;
        color: #7193ff;
      }
      #{$self}__rate-icon {
        &--dislike {
          transform: rotate(180deg) translateY(-5px);
        }
      }
    }
    #{$self}__nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: $secondary;

      #{$self}__icon {
        margin-left: 0.5rem;
      }
      #{$self}__open {
        font-size: 1.4rem;
        font-weight: bold;
      }
      #{$self}__close {
        font-size: 1.4rem;
        font-weight: bold;
      }
    }
    #{$self}__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      // self
    }
    #{$self}__content {
    }
  }
}
</style>
