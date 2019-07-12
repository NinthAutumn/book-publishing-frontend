<template>
  <div class="review-moment">
    <div class="review-moment__container">
      <div class="review-moment__avatar">
        <v-avatar size="30">
          <v-img :src="$route.query.author? user.author_avatar : user.avatar.img"></v-img>
        </v-avatar>
      </div>
      <div class="review-moment__meta">
        <div class="review-moment__title" v-text="review.title"></div>
        <!-- {{review.rating}} -->
        <v-rating color="#FF8D29" readonly size="20" half-increments :value="+review.rating"></v-rating>
        <div class="review-moment__content" v-html="truncate(review.content, 100)"></div>
        <div class="review-moment__book">
          <div class="review-moment__book-cover">
            <v-img
              class="review-moment__img"
              :src="review.cover"
              :lazy-src="lazyCover"
              :aspect-ratio="1/1.5"
              width="5rem"
            >
              <template v-slot:placeholder>
                <div class="review-moment__loading">
                  <trinity-rings-spinner :animation-duration="1500" :size="30" color="#ff1d5e"/>
                </div>
              </template>
            </v-img>
          </div>
          <div class="review-moment__divider">
            <div class="review-moment__book-title" v-line-clamp="2">{{review.book_title}}</div>
            <div class="review-moment__author">{{review.pen_name}} ・ {{review.genre_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrinityRingsSpinner } from "epic-spinners";

export default {
  props: {
    review: Object,
    user: Object
  },
  data() {
    return {
      lazyCover: require("@/assets/img/NobleCardLight.png")
    };
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  },
  components: {
    TrinityRingsSpinner
  }
};
</script>

<style lang="scss" >
.review-moment {
  $self: &;
  margin-bottom: 1rem;
  // box-shadow:
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
  padding: 0.5rem;
  border-radius: 0.5rem;
  .v-icon {
    padding: 0 !important;
  }

  &__container {
    display: flex;

    #{$self}__avatar {
      // width: 5rem;
      min-width: 4rem;
    }
    #{$self}__title {
      font-size: 1.7rem;
    }
    .v-icon {
      padding: 0 !important;
    }
    #{$self}__book {
      display: flex;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #f7fafc;
      #{$self}__book-cover {
        margin-right: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        min-width: 5rem;
      }
      #{$self}__book-title {
        font-size: 1.4rem;
      }
      #{$self}__author {
        font-size: 1.2rem;
        color: #4f566b;
      }
    }
  }
}
</style>
