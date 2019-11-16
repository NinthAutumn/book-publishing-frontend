<template>
  <main
    class="book-page"
    :class="{'book--mobile': $device.isMobile, 'page-padding': !$device.isMobile}"
  >
    <book-header v-if="!$device.isMobile" :book="book"></book-header>
    <mobile-page :book="book" v-else></mobile-page>
    <div class="book-page__container" v-if="!$device.isMobile">
      <div @mouseleave="navLeave" class="book-page__nav book-showtab　flex flex-row">
        <div
          @mouseenter="navLine(1)"
          ref="review"
          class="book-page__nav-item book-page__nav-item--review"
          @click="navSelect('review')"
        >作品情報</div>
        <div
          @click="navSelect('toc')"
          @mouseenter="navLine(2)"
          ref="toc"
          class="book-page__nav-item"
        >目次</div>
        <div :style="tabs.position" class="book-page__nav-line"></div>
      </div>
      <div
        class="desktop book-page__content book-page__content--main"
        v-show="tabs.open === 'review'"
      >
        <book-category class="book-page__category" v-if="!$device.isMobile"></book-category>
        <BookContent class="book-page__synopsis" :book="book"></BookContent>
        <!-- <Tags :tags="tags" :genres="genres" ></Tags> -->
        <section class="book-page__reviews">
          <div class="book-page__review-title">レビュー({{reviewCount}})</div>
          <ReviewsList :rating="book.rating"></ReviewsList>
        </section>
      </div>
      <BookChapterList :sections="volumes" class="book-page__content" v-show="tabs.open ==='toc'"></BookChapterList>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible, hydrateSsrOnly } from "vue-lazy-hydration";
export default {
  auth: false,
  async asyncData({ store, route, app }) {
    await store.dispatch("book/fetchBookChapterCount", route.params.id);
  },
  async fetch({ store, route }) {
    await store.dispatch("book/fetchBook", {
      id: route.params.id
    });
    await store.dispatch("chapter/fetchChapterList", {
      bookId: route.params.id,
      state: "published",
      structured: true
    });
  },
  head() {
    return {
      title: this.book.title,
      meta: [
        {
          name: "description",
          content: this.book.synopsis
        },
        {
          name: "keywords",
          content: this.book.title
        },
        {
          name: "title",
          content: this.book.title
        },
        {
          property: "og:type",
          content: "book"
        },
        {
          property: "og:url",
          content: `https://nobles.jp/books/${this.$route.params.id}`
        },
        {
          property: "og:title",
          content: this.book.title
        },
        {
          property: "og:description",
          content: this.book.synopsis
        },
        {
          property: "og:image",
          content: this.book.cover
        },
        {
          property: "og:site_name",
          content: "ノーブル"
        },
        {
          property: "og:locale",
          content: "ja_JP"
        },
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:site",
          content: "@NoblesJp"
        },
        {
          name: "twitter:title",
          content: this.book.title
        },
        {
          name: "twitter:description",
          content: this.book.synopsis
        },
        {
          name: "twitter:url",
          content: `https://nobles.jp/books/${this.$route.params.id}`
        }
      ]
    };
  },
  async mounted() {},
  computed: {
    ...mapGetters({
      book: "book/getBook",
      view: "book/getBookView",
      count: "book/getBookChapterCount",
      reviewCount: "review/getReviewCount",
      genres: "book/getBookGenres",
      volumes: "chapter/getChapterList",
      tags: "book/getBookTags"
    })
  },
  data() {
    return {
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
      head: {
        title: "",
        desc: "",
        rating: ""
      },

      review: {
        title: "",
        content: "",
        rating: {
          total: 5
        }
      },
      text: "",
      reviewState: false,
      loading: false
    };
  },
  methods: {
    navLine(index) {
      let left = 0;
      let lefty = 0;
      if (index === 1) {
        this.tabs.position = {
          width: `${this.tabs.review}px`,
          left: lefty
        };
      } else {
        this.tabs.position = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30 + left}px`
        };
      }
    },
    navLeave() {
      this.tabs.position = this.tabs.selected;
    },
    navSelect(name) {
      this.tabs.open = name;
      let left = 0;
      let lefty = 0;
      if (name === "toc") {
        this.tabs.position = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30 + left}px`
        };
        this.tabs.selected = {
          width: `${this.tabs.toc}px`,
          left: `${this.tabs.review + 30 + left}px`
        };
      } else {
        this.tabs.position = {
          width: `${this.tabs.review}px`,
          left: lefty
        };
        this.tabs.selected = {
          width: `${this.tabs.review}px`,
          left: lefty
        };
      }
    }
  },
  components: {
    BookContent: hydrateWhenVisible(() =>
      import("@/components/Bookpage/BookContent")
    ),
    BookChapterList: hydrateWhenVisible(() =>
      import("@/components/Web/Lists/Chapter")
    ),
    ReviewsList: hydrateWhenVisible(() =>
      import("@/components/Bookpage/ReviewsList")
    ),
    ReviewsForm: hydrateWhenVisible(() =>
      import("@/components/Bookpage/ReviewForm")
    ),
    BookHeader: () => import("@/components/Web/Cards/Book/Header"),
    MobilePage: hydrateWhenVisible(() =>
      import("@/components/Mobile/Cards/Book/Page")
    ),
    BookCategory: hydrateWhenVisible(() =>
      import("@/components/Bookpage/Category")
    )
  },
  pageTransition: false,

  async mounted() {
    if (this.$device.isMobile) {
      return;
    }
    await this.$store.dispatch("review/fetchBookReviewCount", {
      bookId: this.$route.params.id
    });
    await this.$store.dispatch("reading/fetchListByBookId", {
      book_id: this.$route.params.id,
      page: 1,
      limit: 5
    });
    this.head = {
      title: this.book.title,
      desc: this.book.synopsis
    };
    if (this.$refs.review && this.$refs.toc) {
      this.tabs.review = this.$refs.review.clientWidth;
      this.tabs.toc = this.$refs.toc.clientWidth;
    }
    let left = 0;
    this.tabs.position = {
      width: `${this.tabs.review}px`,
      left: left
    };
    this.tabs.selected = {
      width: `${this.tabs.review}px`,
      left: left
    };
  }
};
</script>

<style lang="scss">
.book-showtab {
  position: relative;
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

.navActive {
  border-bottom: 2px solid $secondary;
  transition: border-color 500ms;
}

.book-page {
  $self: &;

  &__container {
    /* autoprefixer: ignore next */
    display: grid;
    /* autoprefixer: ignore next */
    grid-template-columns: repeat(4, 1fr);
    /* autoprefixer: ignore next */
    /* autoprefixer: ignore next */
    grid-gap: 1rem;
    grid-template-areas: "nav nav nav nav" "content content content content";
    #{$self}__content {
      width: 100%;
      grid-area: content;
      &--main {
        display: grid;
        grid-template-areas:
          "synopsis synopsis synopsis synopsis"
          "category category category category"
          "reviews reviews reviews reviews";
        grid-template-columns: 1fr 1fr 1fr 20rem;
        #{$self}__synopsis {
          /* autoprefixer: ignore next */
          grid-area: synopsis;
        }
        #{$self}__carousel {
          grid-area: carousel;
        }
        #{$self}__category {
          grid-area: category;
        }

        #{$self}__reviews {
          grid-area: reviews;
          #{$self}__review-title {
            font-size: 2rem;
          }
        }
      }
    }
    #{$self}__nav {
      position: relative;
      /* autoprefixer: ignore next */
      grid-area: nav;
      #{$self}__nav-line {
        border: 2px solid $primary;
        position: absolute;
        top: 100%;
        transition: 300ms;
        border-radius: 0.5rem;
      }
      #{$self}__nav-item {
        user-select: none;
        &:hover {
          cursor: pointer;
          user-select: none;
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

        font-size: 2.2rem;
      }
    }
  }
  // &__synopsis
}

@media screen and (max-width: 1048px) {
  .book__avatar {
    display: none;
  }
  .book__announcements {
    display: none;
  }
  .book__container {
    /* autoprefixer: ignore next */
    grid-template-areas:
      "cover title title title"
      "cover announcements . meta"
      "summary summary summary summary "
      "content content content content ";
    // "summary summary summary summary";
  }
}
</style>
