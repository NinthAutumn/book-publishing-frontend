<template>
  <div class="book">
    <div class="book__cover">
      <img class="book__cover__img" :src="$store.getters['book/showbook'].cover" alt>
    </div>
    <div class="book__info">
      <div class="divider flex-row flex--align flex--between">
        <div class="divider flex-column flex--between">
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
          <div class="tab-container">
            <div
              class="tab-list__item"
              :class="{navActive: $store.state.book.bookSynopsis}"
              @click="$store.commit('book/SYNOPSIS_TRUE')"
            >あらすじ</div>
            <div
              class="tab-list__item"
              :class="{navActive: !$store.state.book.bookSynopsis}"
              @click="$store.commit('book/SYNOPSIS_FALSE')"
            >情報</div>
          </div>
        </div>
        <div class="book-info">
          <img class="book-author" :src="$store.state.book.book.author.avatar" alt="author avatar">
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
      <BookChapterList></BookChapterList>
    </div>
    <div class="book__reviews">
      <!-- <label for="title">Title</label> -->
      <!-- <froala :tag="'textarea'" :config="config" v-model="content"></froala> -->
      <!-- <no-ssr>
        <vue-editor v-model="content" :editorOptions="config"></vue-editor>
      </no-ssr>-->
      <!-- <div v-html="content"></div> -->
      <div class="book__reviews__divider flex flex--align flex--between">
        <div class="book__rating__all flex flex--align">
          <h3 class="reviews__title">レビュー({{$store.state.review.reviews.length}})</h3>

          <no-ssr class>
            <star-rating
              name="rating"
              v-model="review.rating.total"
              :star-size="23"
              :read-only="true"
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
        <button @click="reviewOpen" class="review-open button">レビューを書く</button>
      </div>
      <hr>
      <ReviewsList></ReviewsList>
    </div>
    <div class="divider">
      <transition name="fade">
        <div
          class="divider review-form-modal"
          v-click-outside="reviewClose"
          v-if="reviewState"
          :class="{center: $store.state.menuState === 'menu-inactive'}"
        >
          <ReviewsForm></ReviewsForm>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//
import BookContent from "@/components/Bookpage/BookContent";
import BookChapterList from "@/components/Bookpage/BookChapterList";
import ReviewsList from "@/components/Bookpage/ReviewsList";
import ReviewsForm from "@/components/Bookpage/ReviewForm";

export default {
  auth: false,
  async asyncData({ params, store }) {},
  async fetch({ store, params }) {
    await store.dispatch("book/getBook", params.id);
    await store.dispatch("review/showAll", params.id);
    await store.dispatch("chapter/TOCBook", params.id);
    if (store.state.auth.loggedIn) {
      await store.dispatch("library/getBookmark").then(() => {
        store.commit("book/BOOKMARKED", store.state.library.bookmarks);
      });
    }

    // await
    // const john = JSON.stringify();
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
      reviewState: false
    };
  },
  // transition: "test",

  methods: {
    allReviews: function(state, change) {
      return state;
    },
    reviewOpen() {
      this.reviewState = !this.reviewState;
    },
    reviewClose() {
      this.reviewState = false;
    }
  },
  components: {
    BookContent,
    BookChapterList,
    ReviewsList,
    ReviewsForm
  },
  created() {},
  scrollToTop: false
};
</script>

<style lang="scss">
.center {
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  transition: 300ms;
}
.review-form-modal {
  position: fixed;
  // margin: auto;
  background-color: white;
  top: 60px;
  width: 500px;
  padding: 10px;
  top: 50%;
  left: 60%;
  transform: translate(-60%, -50%);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0px rgb(212, 212, 212);
  transition: 300ms;
}

.reviews__title {
  font-size: 20px;
  margin-right: 10px;
}
.review-open {
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
  background-color: $review-color;
  color: white;
}
.book__rating__all {
  .star-rating {
    // margin-bottom: 10px;
    .vue-star-rating-rating-text {
      font-size: 20px;
      margin: 0;
    }
  }
}
.navActive {
  border-bottom: 2px solid $secondary;
  transition: border-color 500ms;
}
.tab-container {
  display: flex;
  margin-left: 5px;
  margin-top: 5px;
  border-bottom: 2px solid white;
  .tab-list__item {
    font-size: 19px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
    }
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
    // display: flex;
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
