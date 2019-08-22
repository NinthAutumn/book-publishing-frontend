<template>
  <div class="mbp-reviewp">
    <div class="mbp-reviewp__container">
      <div class="flex-divider flex-row flex--align">
        <div class="mbp-reviewp__avatar">
          <v-avatar :size="50" class="mbp-reviewp__img">
            <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar.img"></v-img>
          </v-avatar>
        </div>
        <div class="flex-divider flex-column">
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
      open: false
    };
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "...";
      } else {
        return string;
      }
    }
  },
  filters: {}
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
      font-weight: bold;
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
