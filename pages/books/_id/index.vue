<template>
  <main class="book">
    <div class="flex-divider flex">
      <div class="book__cover">
        <img
          class="book__cover__img"
          :src="'https://storage.googleapis.com/theta-images/' + $store.getters['book/showbook'].cover"
          alt
        >
      </div>
      <section class="book__info flex flex-column flex--between">
        <div class="divider flex-row flex--align flex--between">
          <div class="divider flex-column flex--between">
            <header class="book__info__title">{{$store.getters['book/showbook'].title}}</header>
            <div class="book-meta flex">
              <div class="book-genre pill pill-secondary-light">
                <div class="book-genre-icon pill-text pill--icon">
                  <fa icon="fist-raised"></fa>
                </div>
                <div class="book-genre-text pill-text pill--icon">
                  <p>{{$store.getters['book/showbook'].genres[0]}}</p>
                </div>
              </div>
              <div class="book-chapterCount pill pill-secondary">
                <div class="book-chapter-count-icon pill-text pill--icon">
                  <fa icon="scroll"></fa>
                </div>
                <div class="book-chapter-count-text pill-text">
                  <p>{{$store.getters['book/showbook'].chapters.length}} 話</p>
                </div>
              </div>
              <div class="book-views pill pill-primary">
                <div class="book-views-icon pill-text pill--icon">
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
            <img
              class="book-author"
              :src="$store.state.book.book.authorId.avatar"
              alt="author avatar"
            >
          </div>
        </div>

        <div class="book__stats">
          <div class="book__stats__meta"></div>
          <div class="book__stats__text">
            <BookContent :book="$store.getters['book/showbook']"></BookContent>
          </div>
        </div>
        <div class="book-content__buttons">
          <span
            class="book-content__buttons__item button button--primary--open button--shadow button--big"
          >登録</span>
          <span
            @click="bookmarkBook"
            class="book-content__buttons__item button button--shadow button--big"
            @mouseenter="bookmarkHover"
            @mouseleave="bookmarkLeave"
            :class="{'button--secondary': bookmarked, 'button--secondary--open': !bookmarked}"
          >
            <fa class="book-content__buttons__item__icon" style="font-size:15px;" icon="bookmark"></fa>
            <span style="font-size:13px;" v-text="text"></span>
            <!-- <span style="font-size:13px;" v-else>ブックマーク済み</span> -->
          </span>
        </div>
      </section>
    </div>

    <Tags></Tags>
    <div @mouseleave="navLeave" class="book__content-nav book-showtab　flex flex-row">
      <div
        @mouseenter="navLine(1)"
        ref="review"
        class="book__content-nav__item book__content-nav__item--review"
        @click="navSelect('review')"
      >レビュー({{$store.state.review.reviews.length}})</div>
      <div
        @click="navSelect('toc')"
        @mouseenter="navLine(2)"
        ref="toc"
        class="book__content-nav__item"
      >目次</div>
      <div :style="tabs.position" class="book__content-nav__line"></div>
    </div>

    <BookChapterList v-show="tabs.open ==='toc'"></BookChapterList>
    <section class="book__reviews" v-show="tabs.open === 'review'">
      <ReviewsList></ReviewsList>
    </section>
  </main>
</template>

<script>
//
import BookContent from "@/components/Bookpage/BookContent";
import BookChapterList from "@/components/Bookpage/BookChapterList";
import ReviewsList from "@/components/Bookpage/ReviewsList";
import ReviewsForm from "@/components/Bookpage/ReviewForm";
import Tags from "@/components/Bookpage/Tags";

export default {
  auth: false,
  async asyncData({ params, store }) {},
  async fetch({ store, params }) {
    await store.dispatch("book/getBook", params.id);
    await store.dispatch("review/showAll", params.id);
    await store.dispatch("chapter/publishedTOC", params.id);
    if (store.state.auth.loggedIn) {
      await store.dispatch("review/reviewedStatus", params.id);
      await store.dispatch("library/checkBookmark", params.id);
    }
  },
  data() {
    return {
      book: {},
      reviews: [],
      tabs: {
        review: "",
        toc: "",
        position: {
          width: "",
          left: 0
        },
        selected: {},
        open: "review"
      },
      review: {
        title: "",
        content: "",
        rating: {
          total: 5
        }
      },
      text: "",
      reviewState: false
    };
  },
  methods: {
    navLine(index) {
      if (index === 1) {
        this.tabs.position = {
          width: `${this.tabs.review}px`,
          left: 0
        };
      } else {
        this.tabs.position = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30}px`
        };
      }
    },
    navLeave() {
      this.tabs.position = this.tabs.selected;
    },
    navSelect(name) {
      this.tabs.open = name;
      if (name === "toc") {
        this.tabs.position = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30}px`
        };
        this.tabs.selected = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30}px`
        };
      } else {
        this.tabs.position = {
          width: `${this.tabs.review}px`,
          left: 0
        };
        this.tabs.selected = {
          width: `${this.tabs.review}px`,
          left: 0
        };
      }
    },
    async bookmarkHover() {
      if (!this.bookmarked) {
        this.text = "ブックマークする";
        // return this.bookmarkedText();
      } else {
        this.text = "ブックマーク解除";

        // return this.bookmarkedText();
      }
    },
    async bookmarkLeave() {
      if (!this.bookmarked) {
        this.text = "ブックマーク";
        // return this.bookmarkedText();
      } else {
        this.text = "ブックマーク済み";

        // return this.bookmarkedText();
      }
    },
    async bookmarkBook() {
      const store = {
        storeType: "bookmark",
        bookId: this.$store.state.book.book._id
      };
      if (this.$store.state.loggedIn === false) {
        this.$message({
          message: `ブックマークをするにはログインかアカウント作成が必要です`,
          type: "error"
        });
        return this.$store.commit("LOGIN_STATE");
      } else {
        if (this.bookmarked) {
          try {
            const remove = await this.$store.dispatch(
              "library/removeStore",
              store
            );
          } catch (error) {
            // throw err
            this.$message({
              message: `ブックマーク解除に失敗しました`,
              type: "error"
            });
          }
          await this.$store.dispatch(
            "library/checkBookmark",
            this.$route.params.id
          );
        } else {
          try {
            const addStore = await this.$store.dispatch(
              "library/addStore",
              store
            );
          } catch (error) {
            this.$message({
              message: `ブックマークを失敗しました`,
              type: "error"
            });
          }
          const library = await this.$store.dispatch(
            "library/checkBookmark",
            this.$route.params.id
          );
        }
      }
    }
  },
  components: {
    BookContent,
    BookChapterList,
    ReviewsList,
    ReviewsForm,
    Tags
    // TextEditor
  },
  mounted() {
    this.tabs.review = this.$refs.review.clientWidth;
    this.tabs.toc = this.$refs.toc.clientWidth;
    this.tabs.position = {
      width: `${this.tabs.review}px`,
      left: 0
    };
    this.tabs.selected = {
      width: `${this.tabs.review}px`,
      left: 0
    };
    this.text = this.bookmarkedText;
  },
  scrollToTop: false,
  computed: {
    bookmarked() {
      return this.$store.state.library.bookmarked;
    },
    bookmarkedText() {
      if (!this.$store.state.library.bookmarked) {
        return "ブックマーク";
      } else {
        return "ブックマーク済み";
      }
    }
  }
};
</script>

<style lang="scss">
.book-showtab {
  position: relative;
}
.book__content-nav {
  display: flex;
}
.center {
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  transition: 300ms;
}
.review-form-modal {
  position: fixed;
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
  $self: &;
  .ql-snow,
  .ql-snow * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }

  &__cover {
    margin-right: 10px;
    &__img {
      width: 30.8rem;
      height: 45.9rem;
    }
  }

  &__info {
    width: 100%;
    &__title {
      font-size: 22px;
    }
    &__meta {
      display: flex;
      &__genre {
        color: white;
        display: flex;
        align-items: center;
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
        justify-content: center;
        width: 100px;
        border-radius: 5px;
        background-color: $primary;
        &__icon {
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
  &__tags {
    grid-area: tags;
    // #{$self}
  }
  &__content-nav {
    position: relative;
    // color: red;
    &__line {
      border: 2px solid $primary;
      position: absolute;
      top: 100%;
      transition: 300ms;
    }
    &__item {
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      &--review {
        margin-right: 30px;
        position: relative;
        &:after {
          content: "";
          width: 2px;
          height: 80%;
          background-color: rgb(235, 235, 235);
          top: 5px;
          z-index: 2;
          right: -15px;
          position: absolute;
        }
      }

      font-size: 20px;
    }
  }
}
</style>
