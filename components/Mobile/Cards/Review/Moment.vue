<template>
  <div class="review-moment">
    <div class="review-moment__container">
      <div class="review-moment__avatar">
        <v-avatar size="30">
          <v-img :src="$route.query.author? user.author_avatar : user.avatar"></v-img>
        </v-avatar>
      </div>
      <div class="review-moment__meta" v-if="review.type === 'review'">
        <div class="review-moment__title" v-text="review.title"></div>
        <!-- {{review.rating}} -->
        <v-rating color="#FF6452" readonly size="20" half-increments :value="+review.rating"></v-rating>
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
                  <trinity-rings-spinner :animation-duration="1500" :size="30" color="#ff1d5e" />
                </div>
              </template>
            </v-img>
          </div>
          <div class="review-moment__divider">
            <div class="review-moment__book-title" v-line-clamp="1">{{review.book_title}}</div>
            <div class="review-moment__author">{{review.pen_name}} ・ {{review.genre_name}}</div>
          </div>
        </div>
      </div>
      <div class="review-moment__meta" v-else-if="review.type === 'comment'">
        <div class="review-moment__content" v-text="review.content"></div>
        <div class="review-moment__book flex-column">
          <div
            class="review-moment__parent"
            v-if="review.parent_content"
            v-text="`${review.parent_user}: ${review.parent_content}`"
          ></div>
          <div
            class="review-moment__book-title review-moment__book-title--chapter"
            v-text="`${review.book_title}: 第${review.rating}話`"
          ></div>
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
      lazyCover: require("~/assets/img/NobleCardLight.png")
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
  max-width: 100%;
  overflow: hidden;
  .v-icon {
    padding: 0 !important;
  }

  &__container {
    widows: 100%;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    #{$self}__content {
      word-break: break-word;
      max-width: 100%;
      font-size: 1.4rem;
    }
    #{$self}__avatar {
      // width: 5rem;
      min-width: 4rem;
    }
    #{$self}__meta {
      max-width: 100%;
      width: 100%;
      overflow: hidden;
    }
    #{$self}__title {
      max-width: 100%;
      font-size: 1.6rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      word-break: break-word;
    }
    #{$self}__parent {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      word-break: break-word;
    }
    .v-icon {
      padding: 0 !important;
    }
    #{$self}__book {
      overflow: hidden;
      display: flex;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      width: 100%;
      max-width: 100%;
      background-color: #f7fafc;
      white-space: nowrap;
      overflow: hidden;
      word-break: break-word;
      #{$self}__divider {
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #{$self}__book-cover {
        margin-right: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;

        min-width: 5rem;
        max-width: 100%;
      }
      #{$self}__book-title {
        max-width: 100%;
        font-size: 1.4rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        word-break: break-word;

        &--chapter {
          font-size: 1.2rem;
        }
      }
      #{$self}__author {
        font-size: 1.2rem;
        color: #4f566b;
      }
    }
  }
}
</style>
