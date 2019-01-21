<template>
  <div class="book">
    <div class="book__cover">
      <img class="book__cover__img" :src="$store.getters['book/showbook'].cover" alt>
    </div>
    <div class="book__info">
      <div class="book__info__title">{{$store.getters['book/showbook'].title}}</div>
      <div class="book-meta flex">
        <div class="book-genre pill pill-secondary-light">
          <div class="book-genre-icon pill-text">
            <fa icon="fist-raised"></fa>
          </div>
          <div class="book-genre-text pill-text">
            <p>{{$store.getters['book/showbook'].genres[0]}}</p>
          </div>
        </div>
        <div class="book-chapterCount pill pill-secondary">
          <div class="book-chapter-count-icon pill-text">
            <fa icon="scroll"></fa>
          </div>
          <div class="book-chapter-count-text pill-text">
            <p>{{$store.getters['book/showbook'].chapters.length}} 話</p>
          </div>
        </div>
        <div class="book-views pill pill-primary">
          <div class="book-views-icon pill-text">
            <fa icon="eye"></fa>
          </div>
          <div class="book-views-icon pill-text">
            <p>{{$store.state.book.view}}</p>
          </div>
        </div>
      </div>
      <div class="book__stats">
        <div class="book__stats__meta"></div>
        <div class="book__stats__text">
          <BookContent :book="$store.getters['book/showbook']"></BookContent>
        </div>
        <div class="book__stats__buttons"></div>
      </div>
    </div>
    <div class="book__chapters">
      <BookChapterList :chapters="$store.getters['book/showbook'].chapters"></BookChapterList>
    </div>
    <div class="book__reviews">
      <form class="review-form" @submit.prevent="addReview">
        <!-- <label for="title">Title</label> -->
        <h3>感想を書く</h3>
        <input
          class="review-form__title"
          type="text"
          v-model="review.title"
          name="title"
          placeholder="タイトル"
        >
        <div class="form-control">
          <label for="rating" class="rating-label">評価</label>
          <input
            type="Number"
            placeholder="5"
            v-model="review.rating.total"
            class="rating-input"
            v-validate="'max:5'"
            :class="{'is-danger': errors.has('reviewRating')}"
            step=".01"
          >
          <no-ssr>
            <star-rating
              name="rating"
              v-model="review.rating.total"
              :star-size="20"
              :read-only="false"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
              :glow="1"
              class="star-rating"
            ></star-rating>
          </no-ssr>
        </div>

        <textarea
          class="review-form__content"
          v-model="review.content"
          name="content"
          placeholder="本についての感想文"
          required
        ></textarea>
        <button type="submit" class="review-submit">投稿</button>
      </form>
      <!-- <froala :tag="'textarea'" :config="config" v-model="content"></froala> -->
      <!-- <no-ssr>
        <vue-editor v-model="content" :editorOptions="config"></vue-editor>
      </no-ssr>-->
      <!-- <div v-html="content"></div> -->
      <ReviewsList></ReviewsList>
    </div>
  </div>
</template>

<script>
//
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
      reviews: [],
      review: {
        title: "",
        content: "",
        rating: {
          total: 5
        }
      },
      customToolBar: false,
      config: {
        theme: "snow",
        modules: {
          toolbar: false
        }
      }
    };
  },
  methods: {
    async addReview() {
      const username = this.$store.state.auth.user.username;
      await this.$store.dispatch("review/addReview", {
        review: this.review,
        bookId: this.$route.params.id,
        username: username
      });
    },
    allReviews: function(state, change) {
      return state;
    }
  },
  components: {
    BookContent,
    BookChapterList,
    ReviewsList
  },
  created() {},
  scrollToTop: false
};
</script>

<style lang="scss">
.review-form {
  display: flex;
  flex-direction: column;
  &__title {
    height: 50px;
    font-size: 15px;
    // width: 410px;
    width: 50%;
    padding: 5px;
    border: 2px solid $review-color;
    border-radius: 10px;
    box-sizing: border-box;
    color: $primary-black;
    margin-bottom: 10px;
  }
  &__content {
    height: 150px;
    padding: 5px;
    width: 50%;

    border: 2px solid $review-color;
    border-radius: 10px;
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
    &:focus {
      outline: none;
    }
    margin-bottom: 10px;
  }
  h3 {
    font-size: 20px;
    margin: 0;
    font-weight: 500;
  }
  .star-rating {
    // margin-bottom: 10px;
    .vue-star-rating-rating-text {
      font-size: 15px;
      margin: 0;
    }
  }
  .form-control {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .rating-label {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .rating-input {
    width: 32px;
    // height: 50px;
    height: 22px;
    font-size: 15px;
    border: 2px solid $review-color;
    padding: 2px 1px;
    border-radius: 5px;
    margin-right: 5px;
    // margin-bottom: 12px;
    // box-sizing: border-box;
  }
  .review-submit {
    background-color: $review-color;
    width: 90px;
    height: 33px;
    border-radius: 10px;
    font-size: 15px;
    border: none;
    color: white;
    transition: 300ms;
    &:hover {
      cursor: pointer;
      background-color: rgb(228, 212, 231);
      transition: 300ms;
    }
    // align-self: right;
    // align-content: right;
    // display: flex;
    // -webkit-box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
    // -moz-box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
    // box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
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
        width: 100px;
        background-color: $secondary-light;
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
        background-color: $secondary;
        justify-content: center;
        width: 100px;
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
        width: 100px;
        border-radius: 5px;
        background-color: $primary;
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
