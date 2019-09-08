<template>
  <div class="update-book">
    <nuxt-link
      tag="div"
      :to="`books/${book? book[0].book_id: ''}`"
      class="update-book__cover"
      style=" border-radius: 0.4rem;"
    >
      <v-img
        :aspect-ratio="1/1.5"
        max-width="15rem"
        class="update-book__img"
        :src="book[0].cover + '/m'"
        :lazy-src="cover"
        style=" border-radius: 0.4rem;"
      ></v-img>
      <span class="update-book__cover-meta">{{book.length}}</span>
    </nuxt-link>
    <div class="update-book__meta">
      <nuxt-link
        :to="`books/${book? book[0].book_id: ''}`"
        class="update-book__title"
        v-line-clamp="2"
      >{{book[0].title}}</nuxt-link>
      <div class="update-book__chapter-list">
        <div
          class="update-book__chapter-item"
          :key="chapter.chapter_id"
          v-for="(chapter,index) in book"
        >
          <nuxt-link
            tag="div"
            v-ripple
            :to="`/books/${chapter.book_id}/${chapter.chapter_id}`"
            class="update-book__chapter-container flex-row"
            v-if="index < 3"
          >
            <div class="update-book__chapter-index">{{chapter.index}}</div>
            <div class="update-book__chapter-title" v-line-clamp="1">{{chapter.chapter_title}}</div>
          </nuxt-link>
        </div>
        <p class="text--right" v-if="book.length > 3">・・・ {{book.length- 3}}+</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "update-bookcard",
  serverCacheKey: props => props.book.id,
  props: {
    book: {
      type: Array,
      default: () => {
        return [{ title: "", cover: "" }];
      }
    }
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png")
    };
  },
  methods: {},
  filters: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.update-book {
  $self: &;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  &__cover {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    width: 13rem;
    min-width: 13rem;
    margin-right: 1rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    #{$self}__img {
      &:hover {
        transform: scale(1.1);
        transition: 200ms;
      }
      transition: 200ms;
    }
    #{$self}__cover-meta {
      user-select: none;
      position: absolute;
      padding: 2px 10px;
      font-size: 1.3rem;
      background-color: rgb(255, 70, 37);
      border-top-left-radius: 0.4rem;
      color: white;
      top: 0;
      left: 0;
    }
  }
  &__meta {
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    #{$self}__title {
      font-size: 1.6rem;
      max-width: 100%;

      p {
        font-size: 1.6rem !important;
        &:hover {
          text-decoration: solid;
          word-break: break-word;
        }
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // font-size: inherit;
      }
    }
    #{$self}__chapter-container {
      width: 100%;
      padding: 0.5rem;
      // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
      margin-bottom: 0.5rem;
    }
    #{$self}__chapter-title {
      font-size: 1.4rem;
    }
    #{$self}__chapter-index {
      font-size: 1.4rem;
      margin-right: 1rem;
    }
    #{$self}__author {
      font-size: 1.3rem;
      color: grey;
    }
    #{$self}__createdAt {
      font-size: 1.3rem;
      color: grey;
    }
  }
}
</style>
