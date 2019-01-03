<template>
  <div class="book">
    <div class="book__cover">
      <img class="book__cover__img" :src="$store.state.book.book.cover" alt>
    </div>
    <div class="book__info">
      <div class="book__info__title">{{$store.state.book.book.title}}</div>
      <div class="book__info__meta">
        <div class="book__info__meta__genre">
          <div class="book__info__meta__genre__icon"></div>
          <div class="book__info__meta__genre__text">{{$store.state.book.book.genres[0]}}</div>
        </div>
        <div class="book__info__meta__chapterCount">
          <div class="book__info__meta__chapterCount__icon"></div>
          <div class="book__info__meta__chapterCount__text">{{$store.state.book.book.views}}</div>
        </div>
        <div class="book__info__meta__views">
          <div class="book__info__meta__views__icon"></div>
          <div class="book__info__meta__views__text">{{$store.state.book.book.views}}</div>
        </div>
      </div>
      <div class="book_stats">
        <div class="book__stats__text">
          <p>{{$store.state.book.book.synopsis}}</p>
        </div>
        <div class="book__stats__buttons">
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch({ store, params }) {
    await store.dispatch("book/getBook", params.id);
    // const john = JSON.stringify();
    // console.log(book);

    // await store.dispatch('review/getReview')
  },
  data() {
    return {
      book: {}
    };
  }
};
</script>

<style lang="scss">
.book {
  &__cover {
    &__img {
    }
  }

  &__info {
    &__title {
    }
    &__meta {
      &__genre {
        &__icon {
        }
        &__text {
        }
      }
      &__chapterCount {
        &__icon {
        }
        &__text {
        }
      }
      &__views {
        &__icon {
        }
        &__text {
        }
      }
    }
  }
  &__stats {
  }
}
</style>
