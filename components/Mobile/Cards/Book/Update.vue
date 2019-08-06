<template>
  <div class="update-mobile" v-ripple>
    <nuxt-link
      tag="div"
      :to="`books/${book[0].book_id}`"
      class="update-mobile__cover"
      style=" border-radius: 0.4rem;"
    >
      <v-img
        :aspect-ratio="1/1.5"
        max-width="15rem"
        class="update-mobile__img"
        :src="book[0].cover"
        :lazy-src="cover"
        style=" border-radius: 0.4rem;"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="black "></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
      <span class="update-mobile__cover-meta">{{book.length}}</span>
    </nuxt-link>
    <div class="update-mobile__meta">
      <div class="update-mobile__title" v-line-clamp="2">{{book[0].title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapters: Array,
    book: Array
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png")
    };
  },
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
.update-mobile {
  $self: &;
  &:hover {
    cursor: pointer;
  }
  // display: flex;
  &__cover {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    min-width: 5rem;
    margin-right: 1rem;
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
  @media screen and (max-width: 375px) {
    #{$self}__title {
      font-size: 1.2rem !important;
    }
  }
  @media screen and (max-width: 320px) {
    #{$self}__title {
      font-size: 1.1rem !important;
    }
  }
  &__meta {
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    #{$self}__title {
      font-size: 1.4rem;
      max-width: 100%;
      font-weight: bold;
    }
    #{$self}__chapter-container {
      padding: 0.5rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
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
