<template>
  <div class="user-books">
    <div class="user-books__header flex flex--align flex--between">
      <header>本棚</header>
    </div>
    <div class="user-books__books-list">
      <div class="user-books__book flex" v-for="(book, index) in books" :key="index">
        <div class="user-books__cover">
          <img
            :src="'https://storage.googleapis.com/theta-images/' + book.cover"
            alt="user created book cover"
          >
        </div>
        <div class="user-books__meta-info">
          <div class="user-books__title flex flex--align flex--between">
            <nuxt-link tag="p" :to="{path: `/books/${book._id}`}">{{book.title|truncate(17)}}</nuxt-link>
            <fa class="user-books__title__icon" icon="cog"></fa>
          </div>
          <div class="user-books__content">
            <div class="user-books__latest-chapter flex flex--align">第3話: これが最新の話なのか</div>
            <div class="user-books__state flex-column flex--center flex--align">
              <div class="user-books__state__title flex flex--align flex--center">作品状態</div>
              <div class="user-books__state__stat flex flex--align flex--center">連載中</div>
            </div>
            <div class="user-books__bookmark flex-column flex--center flex--align">
              <div class="user-books__bookmark__title flex flex--align flex--center">ブックマーク数</div>
              <div
                class="user-books__bookmark__stat flex flex--align flex--center"
              >{{book.bookmarkCount}}</div>
            </div>
            <div class="user-books__view flex-column flex--center flex--align">
              <div class="user-books__view__title flex flex--align flex--center">視聴回数</div>
              <div class="user-books__view__stat flex flex--align flex--center">{{book.views}}</div>
            </div>
            <div class="user-books__review flex-column flex--center flex--align">
              <div class="user-books__review__title flex flex--align flex--center">レビュー数</div>
              <div
                class="user-books__review__stat flex flex--align flex--center"
              >{{book.reviewsCount}}</div>
            </div>
            <nuxt-link
              :to="{path: `/dashboard/books/${book._id}/new-chapter`}"
              tag="div"
              class="user-books__create flex flex--align flex--center"
            >話を投稿する</nuxt-link>
            <nuxt-link
              :to="{path: `/dashboard/books/${book._id}/published`}"
              tag="div"
              class="user-books__toc flex flex--align flex--center"
            >作品の目次</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store }) {
    await store.dispatch("user/getBooks");
  },
  computed: {
    books() {
      return this.$store.state.user.books;
    }
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 16) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.user-books {
  height: 100vh;
  $self: &;
  &__books-list {
    width: 100%;
    height: 199px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 500px);
    grid-gap: 10px;
    #{$self}__book {
      height: 199px;
      width: 100%;
      box-shadow: 1px 1px 5px rgb(243, 243, 243);
      #{$self}__content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas:
          "chapter chapter chapter chapter"
          "state bookmark view review"
          "none none toc create";
        grid-gap: 5px;
        grid-row-gap: 20px;
        #{$self}__latest-chapter {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          width: 100%;
          grid-area: chapter;
          // height: 30px;
          // height: 35px;
          padding: 10px;
          color: grey;
          font-size: 13px;
        }
        #{$self}__state {
          grid-area: state;
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          color: $primary;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__bookmark {
          height: 50px;
          grid-area: bookmark;
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          color: $primary;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__view {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: view;
          color: $primary;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__review {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: review;
          color: $primary;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__create {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: create;
          color: white;
          font-size: 12px;
          background-color: $primary;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid $primary;
            color: $primary;
          }
        }
        #{$self}__toc {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: toc;
          color: white;
          font-size: 12px;
          background-color: $secondary;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid $secondary;
            color: $secondary;
          }
        }
      }
      #{$self}__title {
        &__icon {
          font-size: 18px;
          color: $secondary;
          transition: 200ms;
          &:hover {
            cursor: pointer;
            transform: rotate(360deg);
            transition: 200ms;
          }
        }
        p {
          font-size: 16px;
          width: 100%;
          height: 24px;
          &:hover {
            cursor: pointer;
            color: grey;
          }
        }
        overflow: hidden;
        width: 350px;
      }
      #{$self}__meta-info {
        padding: 10px;
        background-color: #fff;
        font-size: 16px;
        width: 100%;
      }
    }

    margin-top: 20px;
    // background-color: white;
    img {
      height: 199px;
      width: 135px;
    }
  }
  &__header {
    header {
      font-size: 20px;
    }
  }
}
</style>
