<template>
  <div
    class="mr-page dialog dialog__container"
    :class="{'mr-page--disabled':!value}"
    style="padding-bottom:5rem!important;"
  >
    <transition name="slide-left">
      <div
        class="mr-page__container dialog__content"
        v-on:scroll="toggleNav"
        v-if="value&&review"
        v-touch:swipe.right="handleClose"
        ref="page"
      >
        <transition name="slide-down">
          <div class="mr-page__nav mr-page__nav--top flex--between" v-if="nav">
            <div class="flex-divider flex-row flex--align">
              <v-avatar :size="40" class="mr-page__img" v-if="review.avatar">
                <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar"></v-img>
              </v-avatar>
              <div class="flex-divider">
                <div class="mr-page__title mr-page__title--nav" v-text="review.title"></div>
                <v-rating color="#FF8D29" readonly :size="15" half-increments :value="+book.rating"></v-rating>
              </div>
            </div>

            <div class="mr-page__close" v-ripple @click="handleClose">
              <fa icon="chevron-down"></fa>
            </div>
          </div>
        </transition>
        <!-- <div class="mr-page__nav--header"></div> -->
        <div class="flex-divider flex-row flex--align flex--between" ref="navi">
          <div class="flex-divider flex-row flex--align">
            <div class="mr-page__avatar">
              <v-avatar :size="50" class="mr-page__img" v-if="review.avatar">
                <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar"></v-img>
              </v-avatar>
            </div>
            <div class="flex-divider flex-column">
              <div class="mr-page__title" v-text="review.title"></div>
              <v-rating color="#FF8D29" readonly :size="18" half-increments :value="+book.rating"></v-rating>
              <div class="flex-divider flex-row flex--align">
                <div class="mr-page__author" v-text="review.username"></div>
                <div class="mr-page__writer" v-if="book.user_id === review.user_id">作者</div>
              </div>
            </div>
          </div>
          <div class="mr-page__close" v-ripple @click="handleClose">
            <fa icon="chevron-down"></fa>
          </div>
        </div>
        <div class="mr-page__meta">
          <div class="mr-page__content" v-html="review.content"></div>
        </div>
        <div class="mr-page__nav mr-page__nav--bottom flex-row flex--between flex--align">
          <div
            class="mr-page__rate mr-page__rate--dislike"
            @click="dislikedReview"
            :class="{'mr-page__rate--disliked':disliked}"
          >
            <fa class="mr-page__rate-icon mr-page__rate-icon--dislike" icon="thumbs-up"></fa>
          </div>
          <div class="mr-page__rating" v-text="likeNumber"></div>
          <div
            class="mr-page__rate mr-page__rate--like"
            @click="likedReview"
            :class="{'mr-page__rate--liked':liked}"
          >
            <fa class="mr-page__rate-icon mr-page__rate-icon--like" icon="thumbs-up"></fa>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    book: Object,
    value: {
      default: false
    }
  },
  data() {
    return {
      // review: {},
      nav: false,
      liked: false,
      disliked: false,
      likeNumber: 0
    };
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
  computed: {
    ...mapGetters({
      review: "review/getReview"
    })
  },
  async mounted() {
    if (this.value) {
      await this.$store.dispatch("review/fetchReview", { id: this.value });

      // this.review = data;
      this.liked = this.review.voted > 0;
      this.disliked = this.review.voted < 0;
      this.likeNumber = this.review.likes;
    }

    // window.addEventListener("onscroll", this.toggleNav);
  },
  methods: {
    handleClose() {
      this.nav = false;
      if (this.$route.query.modal) {
        this.$router.push("?modal=true");
      } else {
        this.$router.push("");
      }
    },
    toggleNav(e) {
      // alert("scrolled");
      // console.log(e);
      if (!process.client) {
        return;
      }
      // console.log();
      if (this.$refs.page.scrollTop > this.$refs.navi.clientHeight + 10) {
        this.nav = true;
      } else {
        this.nav = false;
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
  created() {
    if (process.client) {
    }

    // this.stats.forEach(item => {
    //   if (item.name === "作品") {
    //     item.value = this.books_count;
    //   }
    // });
  },
  destroyed() {
    // window.removeEventListener("onscroll", this.toggleNav);
  }
};
</script>

<style lang="scss">
.mr-page {
  $self: &;
  &--disabled {
    visibility: hidden;
    transition: 200ms;
  }
  .v-icon {
    padding: 0 !important;
  }
  &__container {
    #{$self}__close {
      font-size: 1.5rem;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #{$self}__rate {
      height: 4rem;
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: rgb(133, 133, 133);
      &--liked {
        color: orangered;
      }
      &--disliked {
        color: #7193ff;
      }
      #{$self}__rate-icon {
        &--dislike {
          transform: rotate(180deg);
        }
      }
    }
    #{$self}__nav {
      position: fixed;

      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      width: 100vw;
      height: 5rem;
      z-index: 1;
      padding: 1rem;
      &--top {
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        // justify-content: cen
      }
      &--bottom {
        bottom: 0;
        left: 0;
      }
    }
    display: flex;
    flex-direction: column;
    // padding: 0.5rem;
    // overflow
    max-height: 100%;
    overflow: auto;
    #{$self}__avatar {
      margin-right: 0.5rem;
      #{$self}__img {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
    }
    // box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    //   0 3px 6px 0 rgba(0, 0, 0, 0.07);
    #{$self}__meta {
      padding: 1rem;
      border-radius: 1rem;
    }
    #{$self}__title {
      font-size: 1.5rem;
      font-weight: bold;
      &--nav {
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    #{$self}__writer {
      font-size: 1rem;
      color: white;
      padding: 0.1rem 1rem;
      border-radius: 10rem;
      background-color: $secondary;
      margin-left: 1rem;
    }
    #{$self}__author {
      // font-size: 1.4rem;
      font-size: 1.4rem;
      color: rgba(27, 27, 27, 0.918);
    }
    #{$self}__rating {
      display: flex;
      align-items: center;
      // justify-content: center;
      color: black;
      font-size: 1.8rem;
      #{$self}__icon {
        margin-right: 0.5rem;
        color: #ff8d29;
      }
      #{$self}__rate {
        color: #ff8d29;
        font-size: 1.6rem;
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
