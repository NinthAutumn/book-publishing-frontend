<template>
  <div class="mreview-modal dialog dialog__container" :class="{'mreview-modal--disabled':!value}">
    <transition name="grow-shrink">
      <div
        class="mreview-modal__container dialog__content"
        v-if="value"
        v-click-outside="closeModal"
      >
        <div class="mreview-modal__header flex-row">
          <div class="mreview-modal__avatar">
            <v-avatar>
              <v-img :src="review.avatar? review.avatar: avatar"></v-img>
            </v-avatar>
          </div>
          <div class="mreview-modal__meta">
            <div class="mreview-modal__title" v-text="review.title"></div>
            <v-rating color="#FF6452" readonly :size="15" half-increments :value="review.rating"></v-rating>
          </div>
        </div>
        <div class="mreview-modal__body">
          <div class="mreview-modal__content" v-html="review.content"></div>
        </div>
        <div class="mreview-modal__rating-nav">
          <div
            class="mreview-modal__rate mreview-modal__rate--dislike"
            @click="dislikedReview"
            :class="{'mreview-modal__rate--disliked':disliked}"
          >
            <fa class="mreview-modal__rate-icon mreview-modal__rate-icon--dislike" icon="thumbs-up"></fa>
          </div>
          <div class="mreview-modal__rating" v-text="likeNumber"></div>
          <div
            class="mreview-modal__rate mreview-modal__rate--like"
            @click="likedReview"
            :class="{'mreview-modal__rate--liked':liked}"
          >
            <fa class="mreview-modal__rate-icon mreview-modal__rate-icon--like" icon="thumbs-up"></fa>
          </div>
        </div>
        <nuxt-link
          tag="div"
          :to="`/books/${review.book_id}`"
          class="mreview-modal__footer"
          v-ripple
        >
          <div class="mreview-modal__book-cover">
            <v-img
              class="mreview-modal__book-img"
              width="5rem"
              :aspect-ratio="1/1.5"
              :lazy-src="cover"
              :src="review.cover"
            ></v-img>
          </div>
          <div class="mreview-modal__meta">
            <div class="mreview-modal__book-title" v-text="review.book_title"></div>
            <div class="mreview-modal__author" v-text="`${review.pen_name} -  ${review.name}`"></div>
            <v-rating
              color="#FF6452"
              readonly
              :size="15"
              half-increments
              :value="review.book_rating"
            ></v-rating>
          </div>
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["value"],
  computed: {
    ...mapGetters({
      review: "review/getReview"
    })
  },
  methods: {
    closeModal() {
      this.$emit("selectReview");
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
  watch: {
    value: async function(val) {
      if (!this.value) {
        return;
      }
      await this.$store.dispatch("review/fetchReview", { id: this.value });
      this.liked = this.review.voted > 0;
      this.disliked = this.review.voted < 0;
      this.likeNumber = this.review.likes;
    }
  },
  data() {
    return {
      avatar: require("~/assets/img/profile.png"),
      cover: require("~/assets/img/cover.png"),
      wordCount: 200,
      liked: false,
      disliked: false,
      likeNumber: 0
    };
  },
  async mounted() {
    if (this.value) {
      await this.$store.dispatch("review/fetchReview", { id: this.value });

      // this.review = data;
      this.liked = this.review.voted > 0;
      this.disliked = this.review.voted < 0;
      this.likeNumber = this.review.likes;
    }
  }
};
</script>

<style lang="scss">
.mreview-modal {
  $self: &;
  &--disabled {
    visibility: hidden;
    transition: 200ms;
  }
  &__container {
    width: 40rem;
    #{$self}__rating-nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 1rem;
      #{$self}__rate {
        font-size: 1.6rem;
        &--liked {
          color: orangered;
        }
        &--disliked {
          color: #7193ff;
        }
        #{$self}__rate-icon {
          &--dislike {
            transform: rotate(180deg) translateY(-5px);
          }
        }
      }
      #{$self}__rating {
        font-size: 1.6rem;
        margin: 0px 1rem;
      }
    }
    #{$self}__header {
      margin-bottom: 1rem;
      #{$self}__avatar {
        margin-right: 1rem;
      }
      #{$self}__title {
        font-size: 1.6rem;
        font-weight: bold;
        word-break: break-all;
      }
    }
    #{$self}__body {
      max-height: 30rem;
      margin-bottom: 1rem;
      overflow: auto;
      #{$self}__content {
        word-break: break-all;
        p {
          margin-bottom: 0.5rem;
        }
      }
    }
    #{$self}__footer {
      display: flex;
      #{$self}__author {
        font-size: 1.2rem;
        padding: 0.2rem 2rem;
        background-color: $secondary;
        color: white;
        border-radius: 10rem;
      }
      #{$self}__book-title {
        font-size: 1.6rem;
        font-weight: bold;
      }
      #{$self}__book-cover {
        margin-right: 1rem;
        #{$self}__book-img {
          border-radius: 0.5rem;
          box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
            0 3px 6px 0 rgba(0, 0, 0, 0.07);
        }
      }
    }
  }
}
</style>
