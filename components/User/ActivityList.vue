<template>
  <div class="user-activity">
    <ul class="user-activity__list">
      <li class="user-activity__item" v-for="(item, index) in list" :key="index">
        <div class="user-activity__avatar">
          <v-avatar size="45">
            <v-img
              v-if="user.avatar&&user.author_avatar"
              :src="$route.query.author?user.author_avatar:user.avatar"
            ></v-img>
            <v-img v-else :src="avatar"></v-img>
          </v-avatar>
        </div>
        <div class="user-activity__meta">
          <div class="user-activity__title">{{item.title}}</div>
          <div v-if="reviews&&item.rating" class="user-activity__rating">
            <v-rating color="#FF8D29" readonly size="20" half-increments :value="item.rating"></v-rating>
          </div>
          <div
            class="user-activity__content"
            v-if="reviews&&!readMore"
            v-html="truncate(item.content, 250)"
          ></div>
          <div class="user-activity__content" v-if="reviews&&readMore" v-html="item.content"></div>
          <p class="user-activity__content" v-else-if="comment">{{item.content}}</p>
          <div v-if="reviews&&item.content.length > 251" class="buts">
            <a @click="toggleCollapse" v-if="!readMore" class="reviews-content-text-more">詳細></a>
            <a @click="toggleCollapse" v-else class="reviews-content-text-more">{{'<'}}一部を表示</a>
          </div>

          <nuxt-link :to="'/books/'+item.book_id" tag="div" class="user-activity__parent">
            <fa class="user-activity__parent__icon" icon="book"></fa>
            {{item.book_title}}
          </nuxt-link>
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
  },
  data() {
    return {
      readMore: false,
      avatar: require("~/assets/img/profile.png")
    };
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    },
    toggleCollapse: function() {
      this.readMore = !this.readMore;
    }
  }
};
</script>

<style lang="scss">
.user-activity {
  $self: &;
  &__list {
    #{$self}__item {
      display: flex;
      margin-bottom: 1rem;
    }
    #{$self}__meta {
      width: 100%;
    }
    #{$self}__rating {
      margin-bottom: 0.5rem;
      .v-icon {
        padding: 0 !important;
      }
    }
    #{$self}__avatar {
      img {
        box-sizing: 1px 1px 5px rgb(243, 243, 243);
      }
      margin-right: 1rem;
    }
    #{$self}__content {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    #{$self}__title {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
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
