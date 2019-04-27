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
            <nuxt-link tag="p" :to="{path: `/books/${book.id}`}">{{book.title}}</nuxt-link>
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
              >{{book.bookmark_count}}</div>
            </div>
            <div class="user-books__view flex-column flex--center flex--align">
              <div class="user-books__view__title flex flex--align flex--center">視聴回数</div>
              <div class="user-books__view__stat flex flex--align flex--center">{{book.views}}</div>
            </div>
            <div class="user-books__review flex-column flex--center flex--align">
              <div class="user-books__review__title flex flex--align flex--center">レビュー数</div>
              <div
                class="user-books__review__stat flex flex--align flex--center"
              >{{book.rating_count}}</div>
            </div>
            <div
              @click="openForm(book.id)"
              class="user-books__announcement flex flex--align flex--center"
            >通告を投稿</div>
            <nuxt-link
              :to="{path: `/dashboard/books/${book.id}/new`}"
              tag="div"
              class="user-books__create flex flex--align flex--center"
            >新話を投稿</nuxt-link>
            <nuxt-link
              :to="{path: `/dashboard/books/${book.id}/published`}"
              tag="div"
              class="user-books__toc flex flex--align flex--center"
            >作品の目次</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">報告をする</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-validate="'required|max:100'"
            :error-messages="errors.collect('タイトル')"
            data-vv-name="タイトル"
            v-model="announcement.title"
            :counter="100"
            label="タイトル"
            required
          ></v-text-field>
          <v-textarea
            v-validate="'required|max:500'"
            :error-messages="errors.collect('報告')"
            data-vv-name="報告"
            :max="500"
            v-model="announcement.content"
            :counter="500"
            label="報告"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">投稿</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store }) {
    await store.dispatch("analytic/fetchUserBooks");
  },
  data() {
    return {
      dialog: false,
      bookId: 0,
      announcement: {
        title: "",
        content: ""
      }
    };
  },
  watch: {
    "announcement.title": val => {
      if (val.length > 100) {
        return alert("over");
      }
    }
  },
  computed: {
    books() {
      return this.$store.getters["analytic/getBookList"];
    }
  },
  methods: {
    async openForm(id) {
      this.dialog = true;
      this.bookId = id;
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
  min-height: 100vh;
  $self: &;
  .v-text-field__slot {
    font-size: 1.6rem;
  }
  &__books-list {
    width: 100%;
    height: 100%;
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
          "none announcement toc create";
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
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          color: #888582;
          background-color: #f5f6f5;
          &__title {
            font-size: 11px;
            font-weight: bold;

            max-width: 100%;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__bookmark {
          height: 50px;
          grid-area: bookmark;
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__view {
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: view;
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__review {
          // box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 50px;
          grid-area: review;
          background-color: #f5f6f5;
          color: #888582;
          &__title {
            font-size: 11px;
            font-weight: bold;
          }
          &__stat {
            font-size: 13px;
          }
        }
        #{$self}__announcement {
          box-shadow: 1px 1px 5px rgb(243, 243, 243);
          height: 30px;
          grid-area: announcement;
          color: white;
          font-size: 12px;
          background-color: #bca0ff;
          &:hover {
            user-select: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #bca0ff;
            color: #bca0ff;
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
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
