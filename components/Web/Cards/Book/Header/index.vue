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
          eager
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
          <v-rating half-increments color="#FF6452" readonly :size="25" :value="+book.rating"></v-rating>
        </div>
      </div>
      <div class="book-header__announcement">
        <announcement-card></announcement-card>
      </div>
      <book-actions :auth="auth" :bookmarked="bookmarked" @toggleBookmark="bookmarkHandler"></book-actions>

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
  },
  components: {
    AnnouncementCard: () => import("@/components/Bookpage/Announcements"),
    AuthorCard: () => import("@/components/Web/Cards/Author/Info"),
    BookActions: () => import("./ActionList")
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
      bookmarked: false,
      author: false,
      loading: false
    };
  },
  methods: {
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
    bookmarkHandler(state) {
      this.bookmarked = state;
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

    #{$self}__announcement {
      grid-area: announcement;
    }
  }
}
</style>
