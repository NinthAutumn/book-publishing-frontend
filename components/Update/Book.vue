<template>
  <div class="update-book" v-ripple>
    <nuxt-link
      tag="div"
      :to="`books/${book[0].book_id}`"
      class="update-book__cover"
      style=" border-radius: 0.4rem;"
    >
      <v-img
        :aspect-ratio="1/1.5"
        max-width="15rem"
        class="update-book__img"
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
      <span class="update-book__cover-meta">{{book.length}}</span>
    </nuxt-link>
    <div class="update-book__meta">
      <div class="update-book__title">
        <p v-line-clamp="2">{{book[0].title}}</p>
      </div>
      <div class="flex-divider flex-row flex--align flex--between">
        <div class="update-book__author">{{book[0].author}}</div>
        <div
          class="update-book__createdAt"
          v-if="$moment().format('l') === $moment(book[0].published).format('l')"
        >{{$moment(book[0].published).startOf('second').fromNow()}}</div>
        <div
          class="update-book__createdAt"
          v-else
        >{{$moment(book[0].published).startOf('hour').fromNow()}}</div>
      </div>
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
.update-book {
  $self: &;
  &:hover {
    cursor: pointer;
  }
  &__cover {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
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
    #{$self}__title {
      font-size: 1.35rem;
      max-width: 100%;

      p {
        &:hover {
          text-decoration: solid;
          word-break: break-word;
        }
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        font-size: inherit;
      }
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
