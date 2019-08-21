<template>
  <div class="mr-page dialog dialog__container" :class="{'mr-page--disabled':!value}">
    <transition name="slide-left">
      <div
        class="mr-page__container dialog__content"
        v-if="value&&review"
        v-touch:swipe.right="handleClose"
      >
        <div class="flex-divider flex-row flex--align">
          <div class="mr-page__avatar">
            <v-avatar :size="50" class="mr-page__img" v-if="review.avatar">
              <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar.img"></v-img>
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
        <div class="mr-page__meta">
          <div class="mr-page__content" v-html="review.content"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    value: {
      default: false
    }
  },
  data() {
    return {
      review: {}
    };
  },
  watch: {
    value: async function() {
      const { data } = await this.$axios.get(`/review/show?id=${this.value}`);
      this.review = data;
    }
  },
  async mounted() {
    if (this.value) {
      const { data } = await this.$axios.get(`/review/show?id=${this.value}`);
      this.review = data;
    }
  },
  methods: {
    handleClose() {
      if (this.$route.query.modal) {
        this.$router.push("?modal=true");
      } else {
        this.$router.push("");
      }
    }
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
  &__container {
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
