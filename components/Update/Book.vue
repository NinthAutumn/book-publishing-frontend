<template>
  <div class="update-book" v-ripple>
    <nuxt-link tag="div" :to="`books/${book._id}`" class="update-book__cover">
      <v-img
        :aspect-ratio="1/1.5"
        min-width="10rem"
        class="update-book__img"
        :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
      ></v-img>
      <span class="update-book__cover-meta">{{chapters.length}}</span>
    </nuxt-link>
    <div class="update-book__meta">
      <div class="update-book__title">
        <p v-clampy="3">{{book.title}}</p>
      </div>
      <div class="flex-divider flex-row flex--align flex--between">
        <div class="update-book__author">{{book.author}}</div>
        <div
          class="update-book__createdAt"
          v-if="$moment().format('l') === $moment(chapters[0].createdAt).format('l')"
        >{{$moment(chapters[0].createdAt).startOf('second').fromNow()}}</div>
        <div
          class="update-book__createdAt"
          v-else
        >{{$moment(chapters[0].createdAt).startOf('day').fromNow()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapters: Array,
    book: Object
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
