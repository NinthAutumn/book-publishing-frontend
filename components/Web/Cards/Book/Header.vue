<template>
  <div class="book-header">
    <div class="book-header__container">
      <div class="book-header__cover">
        <v-img
          v-if="!$device.isMobile"
          class="book-header__img"
          :src="book.cover+'/l'"
          alt="book cover"
          max-width="20rem"
          min-width="10rem"
          :lazy-src="cover"
          :aspect-ratio="1/1.5"
        ></v-img>
        <div
          class="book-header__status"
          :class="{'book-header__status--completed':book.status === 'completed'}"
          v-text="status"
        ></div>
      </div>
      <div class="book-header__content">
        <div class="book-header__title" v-text="book.title"></div>
        <div class="book-header__meta">
          <div
            class="book-header__data"
            v-for="(value,key) in meta"
            :key="key"
            :style="value.style"
            @click="contentHandler(key)"
          >
            <fa class="book-header__icon" :icon="value.icon"></fa>
            <div class="book-header__info" v-text="value.data"></div>
          </div>
        </div>

        <div class="book-header__rating">
          <v-rating half-increments color="#FF8D29" readonly :size="25" :value="+book.rating"></v-rating>
        </div>
      </div>
      <div class="book-header__announcement">
        <announcement-card></announcement-card>
      </div>
      <div class="book-header__actions">
        <div class="book-header__actions-container">
          <div
            class="book-header__action-item"
            v-for="(value,key) in actions"
            :key="key"
            :class="`book-header__action-item--${key}`"
            v-ripple
          >
            <div
              @click.stop="actionHandler(key)"
              class="book-header__button"
              :class="{'book-header__button--bookmarked': key==='bookmark'&&bookmarked}"
            >
              <div class="book-header__content" v-if="loading !== key">
                <fa class="book-header__button-icon" :icon="value.icon"></fa>
                <div class="book-header__button-text" v-text="value.title"></div>
              </div>
              <div class="book-header__content book-header__content--loading" v-else></div>
            </div>
          </div>
        </div>
      </div>

      <div class="book-header__author" @mouseenter="author = true" @mouseleave="author = false">
        <v-avatar size="100" @click="author = true">
          <v-img
            :src="book.avatar"
            class="book-header__author-img"
            alt="author avatar"
            v-if="book.avatar"
          ></v-img>
        </v-avatar>
        <author-card :id="book.user_id" class="book-header__author-card" v-if="author"></author-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    book: Object
  },
  async mounted() {
    this.meta["genre"]["data"] = this.book.name;
    this.meta["chapter"]["data"] = `${this.chapter_count || 0}話`;
    this.meta["view"]["data"] = `${this.book.view || 0}回`;
    const { data } = await this.$axios.get(
      `/v2/book/${this.$route.params.id}/wordCount`
    );
    this.meta["word"]["data"] = `${data.word_count || 0}字`;
    this.bookmarked = this.book.bookmarked;
    if (this.bookmarked) {
      this.actions["bookmark"]["title"] = "ブックーク済み";
    }
  },
  components: {
    AnnouncementCard: () => import("@/components/Bookpage/Announcements"),
    AuthorCard: () => import("@/components/Web/Cards/Author/Info")
  },
  computed: {
    ...mapGetters({
      chapter_count: "book/getBookChapterCount",
      auth: "auth/isAuthenticated"
    }),
    status() {
      return this.status_types[this.book.status];
    }
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight@2x.png"),
      status_types: {
        completed: "完結",
        ongoing: "連載中",
        hiatus: "休憩中"
      },
      meta: {
        genre: {
          style: {
            backgroundColor: "#00C5FF",
            color: "white",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem"
          },
          data: "",
          icon: "landmark"
        },
        chapter: {
          style: { backgroundColor: "#556CD6", color: "white" },
          data: "",
          icon: "scroll"
        },
        view: {
          style: { backgroundColor: "#885CD3", color: "white" },
          data: "",
          icon: "eye"
        },
        word: {
          style: {
            backgroundColor: "#EEABC8",
            color: "white",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem"
          },
          data: "",
          icon: "cube"
        }
      },
      actions: {
        vote: {
          icon: "bolt",
          title: "投票をかける"
        },
        list: {
          icon: "list",
          title: "リストに入れる"
        },
        support: {
          icon: "gift",
          title: "サポートする"
        },
        bookmark: {
          icon: "bookmark",
          title: "ブックマークする"
        }
      },
      bookmarked: false,
      author: false,
      loading: false
    };
  },
  methods: {
    async actionHandler(key) {
      switch (key) {
        case "vote":
          this.voteHandler();
          break;
        case "support":
          this.$toast.show("現在サポート機能が公開されていません");
          break;
        case "list":
          this.$store.commit("reading/TOGGLE_STATE", this.book.id);
          break;
        default:
          this.bookmarkHandler();
          break;
      }
    },
    contentHandler(key) {
      const action = {
        genre: () => {
          return this.$router.push(`/browse?genre=${this.book.name}`);
        },
        view: () => {},
        word: () => {},
        chapter: () => {}
      };
      return action[key]();
    },
    async bookmarkHandler() {
      this.loading = "bookmark";
      const store = {
        type: "bookmark",
        bookId: this.book.id
      };
      if (!this.auth) {
        this.$toast.error(
          `ブックマークをするにはログインかアカウント作成が必要です`
        );
        this.loading = false;
        return this.$store.commit("LOGIN_STATE");
      }
      if (this.bookmarked) {
        try {
          await this.$store.dispatch("library/patchStore", {
            store
          });
          this.bookmarked = false;
        } catch (error) {
          this.$toast.error(`ブックマーク解除に失敗しました`);
        }
      } else {
        try {
          await this.$store.dispatch("library/patchStore", {
            store
          });
          this.bookmarked = true;
        } catch (error) {
          this.$toast.error(`ブックマークを失敗しました`);
        }
      }
      this.loading = false;
    },
    async voteHandler() {
      this.loading = "vote";
      try {
        if (!this.auth) {
          this.$toast.error(`投票をするにはログインかアカウント作成が必要です`);
          this.loading = false;
          return this.$store.commit("LOGIN_STATE");
        }
        const { error } = await this.$store.dispatch("book/postVote", {
          bookId: this.$route.params.id
        });
        if (error) {
          this.$toast.error(`${error}`, {
            position: "top-right",
            duration: 1000,
            icon: "extension"
          });
        }
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
      await this.$store.dispatch("wallet/wealth");
    }
  }
};
</script>

<style lang="scss">
.book-header {
  $self: &;
  &__container {
    display: grid;
    grid-template-columns: 20rem 1fr 1fr 10rem;
    grid-template-areas: "cover content content avatar" "cover announcement announcement announcement" ". . action action";
    grid-gap: 1rem;
    user-select: none;
    #{$self}__cover {
      grid-area: cover;
      position: relative;
      #{$self}__img {
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
    }
    #{$self}__status {
      font-size: 1.6rem;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      color: white;
      font-weight: bold;
      background-color: #2a2f45;
      &--completed {
        background-color: white;
        // text-shadow: 1px 1px 5px #2a2f4527;
        color: #2a2f45;
      }
    }
    #{$self}__author {
      grid-area: avatar;
      position: relative;
      #{$self}__author-img {
        &:hover {
          cursor: pointer;
        }
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
      #{$self}__author-card {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    #{$self}__content {
      grid-area: content;
      #{$self}__title {
        font-size: 2.2rem;
        margin-bottom: 1rem;
      }
      #{$self}__meta {
        margin-bottom: 1rem;
        display: flex;
        #{$self}__data {
          display: flex;
          padding: 0.5rem 2rem;
          align-items: center;
          font-size: 1.2rem;
          #{$self}__icon {
            margin-right: 0.5rem;
          }
          #{$self}__info {
            font-size: inherit;
          }
        }
      }
    }
    #{$self}__actions {
      grid-area: action;
      justify-self: end;
      align-self: end;
      display: flex;
      align-items: center;
      #{$self}__actions-container {
        display: flex;
        align-items: center;
      }
      #{$self}__action-item {
        border: 1px solid;
        border-radius: 0.5rem;
        margin-right: 1rem;
        user-select: none;
        &:hover {
          cursor: pointer;
        }
        &--bookmark {
          border-color: $secondary;
          color: $secondary;
        }
        &--list {
          border-color: #00c5ff;
          color: #00c5ff;
        }
        &--vote {
          border-color: #f4648a;
          color: #f4648a;
        }
        &--support {
          border-color: $primary;
          color: $primary;
        }
        // &--
      }
      #{$self}__button {
        #{$self}__content {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          width: 14rem;
          height: 3.5rem;
          padding: 0.4rem;
          box-sizing: border-box;
          justify-content: center;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
        }
        &--bookmarked {
          color: white;
          // border-color:none;
          background: $secondary;
        }

        #{$self}__button-icon {
          margin-right: 1rem;
        }
        #{$self}__button-text {
          font-size: inherit;
        }
      }
    }
    #{$self}__announcement {
      grid-area: announcement;
    }
  }
}
</style>
