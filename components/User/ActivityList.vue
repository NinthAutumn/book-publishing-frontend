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
        <div class="user-activity__meta" v-if="item.type === 'review'">
          <div class="user-activity__title">{{item.title}}</div>
          <div v-if="reviews&&item.rating" class="user-activity__rating">
            <v-rating color="#FF6452" readonly size="20" half-increments :value="item.rating"></v-rating>
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
        <div class="user-activity__meta" v-else>
          <div class="user-activity__content" v-text="item.content"></div>

          <nuxt-link
            :to="`/books/${item.book_id}/${item.chapter_id}`"
            tag="div"
            class="user-activity__parent"
          >
            <div
              class="user-activity__child"
              v-if="item.parent_content"
              v-text="`${item.parent_user}: ${item.parent_content}`"
            ></div>
            {{`${item.book_title}: 第${item.rating}話`}}
          </nuxt-link>
        </div>
      </li>
      <client-only>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </client-only>
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
      avatar: require("~/assets/img/profile.png"),
      page: 2
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
    },
    infiniteHandler: async function($state) {
      let list = await this.$store.dispatch("user/fetchUserActivityList", {
        userId: this.$route.params.id,
        page: this.page++,
        infinite: true
      });
      if (list.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #{$self}__meta {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
    #{$self}__child {
      padding: 1rem;
      font-size: 1.3rem;
      border-radius: 0.5rem;
      background-color: rgb(248, 248, 248);
      margin-bottom: 1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #{$self}__parent {
      font-size: 1.4rem;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(241, 241, 241);
      color: grey;
      transition: transform 200ms;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
