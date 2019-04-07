<template>
  <div class="user-activity">
    <ul class="user-activity__list">
      <li class="user-activity__item" v-for="(item, index) in list" :key="index">
        <div class="user-activity__avatar">
          <v-avatar size="45">
            <img :src="user.avatar" alt>
          </v-avatar>
        </div>
        <div class="user-activity__meta">
          <div class="user-activity__title">{{item.title}}</div>
          <div v-if="reviews" class="user-activity__rating">
            <v-rating color="#FF8D29" readonly size="20" half-increments :value="item.rating.total"></v-rating>
          </div>
          <div class="user-activity__content" v-clampy="4" v-if="reviews" v-html="item.content"></div>
          <p class="user-activity__content" v-clampy="3" v-else>{{item.content}}</p>
          <div class="user-activity__parent">
            <fa class="user-activity__parent__icon" icon="book"></fa>
            {{item.bookId.title}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    user: Object,
    reviews: Boolean,
    comment: Boolean
  }
};
</script>

<style lang="scss">
.user-activity {
  $self: &;
  &__list {
    #{$self}__item {
      display: flex;
    }
    #{$self}__meta {
    }
    #{$self}__rating {
      .v-icon {
        padding: 0 !important;
      }
    }
    #{$self}__avatar {
      img {
        box-sizing: 1px 1px 5px rgb(243, 243, 243);
      }
    }
    #{$self}__content {
      font-size: 1.4rem;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }
    #{$self}__parent {
      font-size: 1.4rem;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(241, 241, 241);
      color: grey;
      transition: transform 200ms;
      &__icon {
        margin-right: 0.5rem;
      }
      &:hover {
        cursor: pointer;
      }
      &:active {
        transform: scale(0.98);
        transition: transform 200ms;
      }
    }
  }
}
</style>
