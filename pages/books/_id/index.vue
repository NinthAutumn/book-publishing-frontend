<template>
  <main class="book page-padding" :class="{'book--mobile': $device.isMobile}">
    <div class="book__container">
      <v-img
        class="book__cover"
        :src="book.cover"
        alt="book cover"
        max-width="20rem"
        min-width="10rem"
        :aspect-ratio="1/1.5"
      ></v-img>
      <div class="book__info flex flex-column flex--around">
        <header class="book__title">{{book.title}}</header>
        <div class="book__title--more-info" v-if="$device.isMobile">
          <div class="book__title__author">作者: {{book.pen_name}}</div>
        </div>
        <div class="book__meta flex-row">
          <nuxt-link
            class="book__meta__item"
            :class="'book__meta__item--' +item.type"
            v-for="(item, index) in meta"
            :key="index"
            :to="item.url"
            tag="div"
          >
            <fa class="book__meta__icon" :icon="item.icon"></fa>
            <p>{{item.key}}</p>
          </nuxt-link>
        </div>
        <div class="book__rating">
          <no-ssr>
            <v-rating
              half-increments
              color="#FF8D29"
              :readonly="true"
              :size="star"
              :value="+book.rating"
            ></v-rating>
            <!-- <v-rating medium color="#FF8D29" v-else :readonly="true" :value="0"></v-rating> -->
          </no-ssr>
        </div>
      </div>

      <div class="book__avatar">
        <v-img v-if="book.avatar" class="book-author" :src="book.avatar" alt="author avatar"></v-img>
      </div>
      <div @mouseleave="navLeave" class="book__content-nav book-showtab　flex flex-row">
        <div
          @mouseenter="navLine(1)"
          ref="review"
          class="book__content-nav__item book__content-nav__item--review"
          @click="navSelect('review')"
        >作品情報</div>
        <div
          @click="navSelect('toc')"
          @mouseenter="navLine(2)"
          ref="toc"
          class="book__content-nav__item"
        >目次</div>
        <div :style="tabs.position" class="book__content-nav__line"></div>
      </div>
      <div class="book__synopsis" v-show="tabs.open === 'review'">
        <BookContent :book="book"></BookContent>
        <Tags v-if="!$device.isMobile"></Tags>
        <section class="book__reviews">
          <div class="book__reviews__title">レビュー({{this.$store.getters["review/getReviewCount"]}})</div>
          <ReviewsList :rating="book.rating"></ReviewsList>
        </section>
      </div>
      <BookChapterList class="book__synopsis" v-show="tabs.open ==='toc'"></BookChapterList>
      <announcements v-if="!$device.isMobile" class="book__announcements"></announcements>
      <div class="book__all" v-if="!$device.isMobile">
        <div class="book__information"></div>
        <div class="book__buttons">
          <span
            class="book-content__buttons__item book-content__buttons__item--vote button button--primary--open button--shadow button--big"
            v-ripple
            @click="voteHandler"
            v-if="$store.getters.isAuthenticated"
          >
            <div v-if="loading" class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <fa
              v-if="!loading"
              class="book-content__buttons__item__icon"
              style="font-size:15px;"
              icon="bolt"
            ></fa>
            <span v-if="!loading">投票をかける</span>
          </span>
          <span
            class="book-content__buttons__item book-content__buttons__item--vote button button--primary--open button--shadow button--big"
            v-ripple
            @click.stop="$store.commit('LOGIN_STATE')"
            v-else
          >
            <fa
              v-if="!loading"
              class="book-content__buttons__item__icon"
              style="font-size:15px;"
              icon="bolt"
            ></fa>
            <span v-if="!loading">投票をかける</span>
          </span>
          <span
            class="book-content__buttons__item button button--primary--open button--shadow button--big"
            v-ripple
          >サポートする</span>
          <span
            v-if="$store.getters.isAuthenticated"
            @click="bookmarkBook"
            class="book-content__buttons__item button button--shadow button--big"
            @mouseenter="bookmarkHover"
            @mouseleave="bookmarkLeave"
            :class="{'button--secondary': bookmarked, 'button--secondary--open': !bookmarked}"
            v-ripple
          >
            <fa class="book-content__buttons__item__icon" style="font-size:15px;" icon="bookmark"></fa>
            <span style="font-size:13px;" v-text="text"></span>
          </span>
          <span
            v-else
            @click.stop="$store.commit('LOGIN_STATE')"
            class="book-content__buttons__item button button--shadow button--big"
            @mouseenter="bookmarkHover"
            @mouseleave="bookmarkLeave"
            :class="{'button--secondary': bookmarked, 'button--secondary--open': !bookmarked}"
            v-ripple
          >
            <fa class="book-content__buttons__item__icon" style="font-size:15px;" icon="bookmark"></fa>
            <span style="font-size:13px;" v-text="text"></span>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  auth: false,
  async asyncData({ params, store }) {},
  async created() {
    // await this.$store.dispatch("book/fetchBookView", this.$route.params.id);
    // await this.$store.dispatch(
    //   "book/fetchBookChapterCount",
    //   this.$route.params.id
    // );
  },
  async fetch({ store, params }) {
    if (store.getters.isAuthenticated) {
      await store.dispatch("book/fetchBook", {
        id: params.id,
        userId: store.getters["loggedInUser"].id
      });
      // await store.dispatch("review/reviewedStatus", params.id);
      // await store.dispatch("library/checkBookmark", params.id);
    } else {
      await store.dispatch("book/fetchBook", { id: params.id });
      // await store.dispatch("chapter/fetchPublishedTOC", params.id);
    }
  },
  computed: {
    ...mapGetters({
      book: "book/getBook",
      view: "book/getBookView",
      chapterCount: "book/getBookChapterCount"
    }),
    bookmarkedText() {
      if (!this.bookmarked) {
        return "ブックマーク";
      } else {
        return "ブックマーク済み";
      }
    }
  },
  data() {
    return {
      reviews: [],
      bookmarked: this.$store.getters["book/getBook"].bookmarked,
      star: 20,
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
      meta: [
        // {
        //   key: this.$store.getters["book/getBook"].genres[0] || "ファンタ",
        //   icon: "landmark",
        //   type: "genre",
        //   url: `/browse?genre=${this.$store.getters["book/getBook"].genres[0]}`
        // },
        {
          key: this.$store.getters["book/getBookChapterCount"] + "話",
          icon: "scroll",
          type: "chapter",
          url: "/browse"
        },
        {
          key: this.$store.getters["book/getBook"].view,
          icon: "eye",
          type: "view",
          url: "/browse"
        }
      ],
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
        type: "bookmark",
        bookId: this.book.id
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
            const remove = await this.$store.dispatch("library/patchStore", {
              store
            });
            this.bookmarked = false;
          } catch (error) {
            this.$message({
              message: `ブックマーク解除に失敗しました`,
              type: "error"
            });
          }
        } else {
          try {
            const addStore = await this.$store.dispatch("library/patchStore", {
              store
            });
            this.bookmarked = true;
          } catch (error) {
            this.$message({
              message: `ブックマークを失敗しました`,
              type: "error"
            });
          }
        }
      }
    },
    async voteHandler() {
      this.loading = true;
      try {
        const { error } = await this.$store.dispatch("book/postVote", {
          bookId: this.$route.params.id
        });
        if (error) {
          this.$message({
            message: error,
            type: "error"
          });
        }
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
    }
  },
  components: {
    BookContent: () => import("@/components/Bookpage/BookContent"),
    BookChapterList: () => import("@/components/Bookpage/BookChapterList"),
    ReviewsList: () => import("@/components/Bookpage/ReviewsList"),
    ReviewsForm: () => import("@/components/Bookpage/ReviewForm"),
    Tags: () => import("@/components/Bookpage/Tags"),
    Announcements: () => import("@/components/Bookpage/Announcements")
    // TextEditor
  },
  transition: false,
  async mounted() {
    // while (1) {
    //   alert("なぜそれが");
    // }
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
    if (this.bookmarked) {
      this.text = "ブックマーク済み";
    } else {
      this.text = "ブックマーク";
    }
  }
};
</script>

<style lang="scss">
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}

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
      font-size: 16px;
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
.review-open {
  // width: 100px;
  background-color: #c1c9e4;
  color: white;
  box-shadow: 1px 1px 5px white;
  transition: 300ms;
  &:hover {
    box-shadow: 1px 1px 5px #c1c9e4;
    background-color: #fff;
    color: #c1c9e4;
    transition: 300ms;
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active,
  &:focus {
    box-shadow: 1px 1px 2px #c1c9e4;
    transition: 300ms;
  }
}
.book {
  $self: &;
  .v-icon {
    padding: 0 !important;
  }
  &--mobile {
    #{$self}__container {
      grid-template-rows: auto;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "cover title"
        "cover title"
        "summary summary "
        "content content " !important;
      .book-info {
        width: 100%;
      }
    }
    .book__announcements {
    }
    .book__info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .book-content {
      padding: 0 !important;
      height: 100%;
    }
    .book__synopsis {
      // height: 100%;
    }
    .book__title {
      text-align: left;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      .book__title__author {
        font-size: 1.3rem;
        color: #b7b7b7;
      }
      &--more-info {
        margin-bottom: 1rem;
        width: 100%;
        text-align: left;
      }
    }
    #{$self}__meta {
      display: none;
    }
    #{$self}__avatar {
      display: none;
    }
    .book__cover {
      border-radius: 0.5rem;
      justify-self: center;
      width: 15rem;
      .v-image__image {
        box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
          0 3px 9px 0 rgba(0, 0, 0, 0.08);
      }
    }
  }
  .ql-snow,
  .ql-snow * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }
  &__cover {
    border-radius: 0.5rem;
    // margin-right: 2rem;
  }
  &__container {
    // padding: 10px;
    .vue-star-rating-rating-text {
      margin: 0 !important;
      font-size: 16px;
    }
    display: grid;
    grid-template-columns: 20rem 1fr 1fr 10rem;
    grid-template-rows: 100px 1fr auto;
    grid-gap: 1rem;
    grid-template-areas:
      "cover title title avatar"
      "cover announcements . meta"
      "summary summary summary summary "
      "content content content content ";
    // "summary summary summary summary";
  }

  &__buttons {
    display: flex;
    user-select: none;
    .book-content__buttons__item {
      .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      .lds-ellipsis div {
        position: absolute;
        top: 27px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #f4648a;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
      }
      &--vote {
        border: 1px solid #f4648a !important;
        color: #f4648a !important;
        transition: 300ms;
        span {
          font-size: 1.3rem;
        }
        &:hover {
          background-color: #f4648a !important;
          color: white !important;
          transition: 300ms;
          .lds-ellipsis div {
            background: white;
          }
        }
      }
    }
  }
  &__synopsis {
    grid-area: content;
  }
  &__title {
    font-size: 22px;
  }
  &__announcements {
    grid-area: announcements;
  }
  &__avatar {
    grid-area: avatar;
    justify-self: end;
  }
  &__cover {
    grid-area: cover;
    // width: 20rem;
    // height: 30rem;
  }
  &__info {
    justify-self: stretch;
    grid-area: title;
    padding-left: 5px;
  }
  &__all {
    grid-area: meta;
    justify-self: end;
    align-self: end;
  }
  &__meta {
    width: 100%;
    &__icon {
      margin-right: 5px;
    }
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      padding: 0 20px;
      height: 25px;
      &:hover {
        cursor: pointer;
      }
      p {
        font-size: inherit;
      }
      &--genre {
        color: white;
        background-color: $secondary-light;
      }
      &--chapter {
        color: white;
        background-color: $secondary;
      }
      &--view {
        color: white;
        background-color: $primary;
      }
    }
  }
  &__chapters {
    grid-area: chapters;
  }
  &__reviews {
    grid-area: reviews;
    // margin-bottom: 10px;
    &__title {
      font-size: 2rem;
    }
    &__divider {
      margin-bottom: 5px;
    }
  }
  &__tags {
    grid-area: tags;
    // #{$self}
  }
  &__content-nav {
    position: relative;
    // color: red;
    grid-area: summary;
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
      // margin-bottom: 1.5rem;
    }
  }
}

@media screen and (max-width: 1048px) {
  .book__avatar {
    display: none;
  }
  .book__announcements {
    display: none;
  }
  .book__container {
    grid-template-areas:
      "cover title title title"
      "cover announcements . meta"
      "summary summary summary summary "
      "content content content content ";
    // "summary summary summary summary";
  }
}
</style>
