<template>
  <div class="book">
    <div class="book__cover">
      <img class="book__cover__img" :src="$store.state.book.book.cover" alt>
    </div>
    <div class="book__info">
      <div class="book__info__title">{{$store.state.book.book.title}}</div>
      <div class="book__info__meta">
        <div class="book__info__meta__genre">
          <div class="book__info__meta__genre__icon">
            <fa icon="fist-raised"></fa>
          </div>
          <div class="book__info__meta__genre__text">{{$store.state.book.book.genres[0]}}</div>
        </div>
        <div class="book__info__meta__chapterCount">
          <div class="book__info__meta__chapterCount__icon">
            <fa icon="scroll"></fa>
          </div>
          <div
            class="book__info__meta__chapterCount__text"
          >{{$store.state.book.book.chapters.length}} Chapters</div>
        </div>
        <div class="book__info__meta__views">
          <div class="book__info__meta__views__icon">
            <fa icon="eye"></fa>
          </div>
          <div class="book__info__meta__views__text">{{$store.state.book.view}}</div>
        </div>
      </div>
      <div class="book__stats">
        <div class="book__stats__meta"></div>
        <div class="book__stats__text">
          <BookContent :book="$store.state.book.book"></BookContent>
        </div>
        <div class="book__stats__buttons"></div>
      </div>
    </div>
    <div class="book__chapters">
      <BookChapterList :chapters="$store.state.book.book.chapters"></BookChapterList>
    </div>
    <div class="book__reviews">
      <header>Reviews</header>
      <form submit.prevent>
        <label for="title"></label>
        <input type="text" name="title">
        <textarea v-model="content" name="content" id cols="30" rows="10"></textarea>
        <!-- <p style="white-space:pre-wrap">{{content}}</p> -->
      </form>
      <!-- <froala :tag="'textarea'" :config="config" v-model="content"></froala> -->
      <no-ssr>
        <vue-editor v-model="content" :editorOptions="config"></vue-editor>
      </no-ssr>

      <!-- <div v-html="content"></div> -->
      <ReviewsList :reviews="$store.state.review.reviews"></ReviewsList>
    </div>
  </div>
</template>

<script>
import BookContent from "@/components/Bookpage/BookContent";
import BookChapterList from "@/components/Bookpage/BookChapterList";
import ReviewsList from "@/components/Bookpage/ReviewsList";

export default {
  auth: false,
  async fetch({ store, params }) {
    await store.dispatch("book/getBook", params.id);
    await store.dispatch("review/showAll", params.id);
    // await
    // const john = JSON.stringify();
    // console.log(book);

    // await store.dispatch('review/getReview')
    // console.log(object);
  },
  data() {
    return {
      book: {},
      content: "<p>Dog lol Dogg<p>",
      customToolBar: false,
      config: {
        theme: "snow",
        modules: {
          toolbar: false
        }
      }
    };
  },

  components: {
    BookContent,
    BookChapterList,
    ReviewsList
  }
};
</script>

<style lang="scss">
.book {
  .ql-snow,
  .ql-snow * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }
  // margin-top: 6.6rem !important;
  display: grid;
  grid-template-columns: 30.8rem auto auto;
  grid-template-areas:
    "cover info info"
    "chapters chapters chapters"
    "reviews reviews reviews";
  grid-gap: 10px;
  grid-template-columns: 3;
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
      display: flex;
      // justify-content: center;/
      &__genre {
        color: white;
        display: flex;
        align-items: center;
        // height: 32px;
        margin-right: 10px;
        justify-content: center;
        border-radius: 5px;
        padding: 3px 7px;
        background-color: #c3aee9;
        &__icon {
          font-size: 14px;
          margin-right: 5px;
        }
        &__text {
          &::first-letter {
            text-transform: capitalize;
          }
          font-size: 14px;
        }
      }
      &__chapterCount {
        color: white;
        display: flex;
        margin-right: 10px;

        align-items: center;
        // height: 32px;
        // width: 150px;
        border-radius: 5px;
        background-color: #5580e9;
        justify-content: center;
        padding: 3px 7px;
        &__icon {
          font-size: 14px;
          margin-right: 5px;
        }
        &__text {
          font-size: 14px;
        }
      }
      &__views {
        color: white;
        display: flex;
        margin-right: 10px;

        align-items: center;
        // height: 32px;
        justify-content: center;
        // width: 150px;
        padding: 3px 7px;
        border-radius: 5px;
        background-color: #8860d0;
        &__icon {
          // color: black;
          font-size: 18px;
          margin-right: 5px;
        }
        &__text {
          font-size: 14px;
          margin-top: 1px;
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
