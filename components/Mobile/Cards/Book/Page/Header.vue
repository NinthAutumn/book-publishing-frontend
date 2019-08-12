<template>
  <div class="pmb-header">
    <div class="pmb-header__container">
      <div class="pmb-header__cover">
        <transition
          appear
          enter-active-class="animation animation--medium animation--ease-in animation__slide--down"
          leave-active-class="animation animation--medium animation--ease-out animation__slide--up animation--backwards animation--reverse"
        >
          <v-img
            :lazy-src="cover"
            height="40vh"
            class="pmb-header__img"
            width="100vw"
            v-if="showImage"
            :src="book.cover"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="black "></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </transition>
      </div>
      <div class="pmb-header__title" v-text="book.title"></div>
      <div class="pmb-header__author">{{`by ${book.pen_name} ・ ${book.status}`}}</div>
      <nav class="pmb-header__nav">
        <div
          class="pmb-header__nav-item"
          :class="`pmb-header__nav-item--${key}`"
          v-for="(value,key) in nav"
          :key="key"
          v-ripple
          @click="navHandler(key)"
        >
          <fa class="pmb-header__nav-icon" :icon="value.icon"></fa>
          <div class="pmb-header__nav-header" v-text="value.title"></div>
        </div>
      </nav>
    </div>
    <transition name="slide-up">
      <toc-modal :book="book" v-if="$route.query.toc"></toc-modal>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async mounted() {
    this.bookmarked = this.book.bookmarked;
    if (this.bookmarked) {
      this.nav["bookmark"]["icon"] = "bookmark";
      this.nav["bookmark"]["title"] = "ブックマーク済み";
    }
    try {
      const { data } = await this.$axios.get(`/library/${this.book.id}`);
      this.latestChapter = data;
    } catch (error) {}

    this.nav["toc"]["title"] = `${this.chapter_count || 0}話`;
    // this.showImage = true;
    // this.
  },
  components: {
    TocModal: () => import("./TOC")
  },
  props: {
    book: Object
  },
  computed: {
    ...mapGetters({ chapter_count: "book/getBookChapterCount" })
  },
  data() {
    return {
      bookmarked: false,
      latestChapter: "",
      toc: false,
      nav: {
        continue: {
          icon: "play",
          title: "読む"
        },
        toc: {
          icon: "list",
          title: "あらすじ"
        },
        bookmark: {
          icon: { prefix: "far", iconName: "bookmark" },
          title: "ブックマーク"
        }
      },
      cover: require("~/assets/img/NobleCardLight@2x.png"),
      showImage: true
    };
  },
  methods: {
    async navHandler(key) {
      switch (key) {
        case "bookmark":
          this.bookmarkHandler();
          break;
        case "toc":
          this.$router.push(`/books/${this.book.id}?toc=true`);
          break;
        default:
          this.latestChapter;
          this.$router.push(`/books/${this.book.id}/${this.latestChapter.id}`);
          break;
      }
    },
    async bookmarkHandler() {
      const store = {
        type: "bookmark",
        bookId: this.book.id
      };
      if (this.$store.state.loggedIn === false) {
        this.$toast.error(
          `ブックマークをするにはログインかアカウント作成が必要です`,
          {
            position: "top-right",
            duration: 1000,
            icon: "extension"
          }
        );

        return this.$store.commit("LOGIN_STATE");
      } else {
        if (this.bookmarked) {
          try {
            const remove = await this.$store.dispatch("library/patchStore", {
              store
            });
            this.bookmarked = false;
            this.nav["bookmark"]["icon"] = {
              prefix: "far",
              iconName: "bookmark"
            };
            this.nav["bookmark"]["title"] = "ブックマーク";
          } catch (error) {
            this.$toast.error(`ブックマーク解除に失敗しました`, {
              position: "top-right",
              duration: 1000,
              icon: "extension"
            });
          }
        } else {
          try {
            const addStore = await this.$store.dispatch("library/patchStore", {
              store
            });
            this.bookmarked = true;
            this.nav["bookmark"]["icon"] = "bookmark";
            this.nav["bookmark"]["title"] = "ブックマーク済み";
          } catch (error) {
            this.$toast.error(`ブックマークに失敗しました`, {
              position: "top-right",
              duration: 1000,
              icon: "extension"
            });
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.pmb-header {
  $self: &;
  &__container {
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    #{$self}__img {
    }
    #{$self}__title {
      font-size: 2.1rem;
      font-weight: bold;
      text-align: center;
    }
    #{$self}__author {
      font-size: 1.2rem;
      text-align: center;
    }
    #{$self}__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 0rem;
      #{$self}__nav-item {
        padding: 0.5rem 0;
        width: 10rem;
        font-size: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $secondary;
      }
      #{$self}__nav-header {
        margin-top: 1rem;
        font-size: 1.1rem;
        font-weight: bold;
        color: black;
      }
      #{$self}__nav-icon {
      }
    }
  }
}
</style>
