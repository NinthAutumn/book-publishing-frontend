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
          <div class="book__info__meta__chapterCount__text">{{$store.state.book.view}}</div>
        </div>
        <div class="book__info__meta__views">
          <div class="book__info__meta__views__icon"></div>
          <div class="book__info__meta__views__text">{{$store.state.book.book.views}}</div>
        </div>
      </div>
      <div class="book__stats">
        <div class="book__stats__meta"></div>
        <div class="book__stats__text">
          <BookContent :book="book"></BookContent>
        </div>
        <div class="book__stats__buttons">
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
    <div class="book__chapters"></div>
    <div class="book__reviews"></div>
  </div>
</template>

<script>
import BookContent from "@/components/BookContent";
export default {
  auth: false,
  async fetch({ store, params }) {
    await store.dispatch("book/getBook", params.id);
    // await
    // const john = JSON.stringify();
    // console.log(book);

    // await store.dispatch('review/getReview')
  },
  data() {
    return {
      book: {}
    };
  },

  components: {
    BookContent
  }
};
</script>

<style lang="scss">
.book {
  // margin-top: 6.6rem !important;
  display: grid;
  grid-template-areas: "cover info info" "chapters chapters chapters" "reviews reviews reviews";
  grid-gap: 10px;
  &__cover {
    grid-area: cover;
    &__img {
      width: 30.8rem;
      height: 45.9rem;
      border-radius: 10px;
    }
  }

  &__info {
    grid-area: info;
    &__title {
      font-size: 22px;
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
  &__chapters {
    grid-area: chapters;
  }
  &__reviews {
    grid-area: reviews;
  }
}
</style>
