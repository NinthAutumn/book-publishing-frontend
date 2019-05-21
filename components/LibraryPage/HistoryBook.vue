<template>
  <div class="history-book">
    <ul class="history-book__list">
      <li class="history-book__item" v-for="(book,index) in books" :key="index">
        <div class="history-book__cover">
          <!--             :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          -->
          <v-img :src="book.cover" :aspect-ratio="1/1.5" max-width="14rem"></v-img>
        </div>
        <div class="history-book__meta">
          <nuxt-link
            :to="`/books/${book.book_id}`"
            tag="h3"
            class="history-book__title"
          >{{book.title}}</nuxt-link>
          <ul class="history-book__genres-list">
            <li
              class="history-book__genres-item"
              v-for="(genre,index) in book.genres"
              :key="index"
              v-ripple
            >{{genre}}</li>
          </ul>
          <div class="history-book__rating flex-row flex--align">
            <v-rating color="#FF8D29" readonly size="20" half-increments :value="+book.rating"></v-rating>
            <span>{{book.rating}}</span>
          </div>
          <div class="history-book_synopsis-wrapper" style="height:5rem;">
            <p class="history-book__synopsis" v-line-clamp="2">{{book.synopsis}}</p>
          </div>
          <div class="history-book__position">
            <div class="history-book__progress">
              <span>{{book.chapter_index}}</span>
              /{{book.chapter_count}} 歴史
            </div>
            <div class="history-book__buttons">
              <nuxt-link
                tag="div"
                :to="`/books/${book.book_id}/${book.chapter_id}`"
                class="history-book__continue"
              >
                読み続ける
                <fa icon="angle-double-right"></fa>
              </nuxt-link>
              <div class="history-book__bookmark" v-ripple>
                <span v-if="!book.bookmarked" @click="bookmarkBook(book.book_id)">
                  <fa class="history-book__bookmark__icon" icon="plus"></fa>ブックマークする
                </span>
                <span v-else>
                  <fa class="history-book__bookmark__icon" icon="check"></fa>ブックマーク済み
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array
  },
  async mounted() {
    await this.$store.dispatch("library/getHistory");
  },
  methods: {
    async bookmarkBook(id) {
      const store = {
        type: "bookmark",
        bookId: id
      };
      try {
        const addStore = await this.$store.dispatch("library/patchStore", {
          store
        });
        await this.$store.dispatch("library/getHistory");
      } catch (error) {
        this.$message({
          message: `ブックマークを失敗しました`,
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.history-book {
  $self: &;
  .v-rating .v-icon {
    padding: 0 !important;
  }
  &__list {
    #{$self}__item {
      display: flex;
      padding: 1.5rem;
      transition: background-color 300ms;
      &:hover {
        background-color: #f5f6fc;
        transition: background-color 300ms;
      }
      #{$self}__meta {
        width: 100%;
      }
      #{$self}__cover {
        min-width: 12rem;
        margin-right: 1.5rem;
      }
      #{$self}__genres-list {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
        transform: scale(1);
        transition: transform 200ms;
        #{$self}__genres-item {
          &:active {
            transform: scale(0.9);
            transition: transform 200ms;
          }
          &:hover {
            cursor: pointer;
          }
          font-size: 1rem;
          padding: 0.25rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid $secondary;
          color: $secondary;
          margin-right: 1rem;
        }
      }
      #{$self}__title {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          cursor: pointer;
          color: $primary;
        }
      }
      #{$self}__synopsis-wrapper {
        height: 5rem;
        min-height: 5rem;
      }
      #{$self}__synopsis {
        font-size: 1.6rem;
        margin-bottom: 1rem;
      }
      #{$self}__position {
        display: flex;
        align-items: center;
        justify-content: space-between;
        #{$self}__progress {
          font-size: 1.6rem;
          color: grey;
          span {
            font-size: 1.6rem;
          }
        }

        #{$self}__buttons {
          display: flex;
          align-items: center;

          #{$self}__continue {
            color: $secondary;
            font-size: 1.4rem;
            margin-right: 0.5rem;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          #{$self}__bookmark {
            padding: 1rem 1.5rem;
            border: 1px solid $secondary;
            color: $secondary;
            margin-left: 0.5rem;
            box-shadow: 0;
            transition: box-shadow 300ms;
            user-select: none;
            border-radius: 0.5rem;
            &__icon {
              margin-right: 0.5rem;
            }
            &:hover {
              box-shadow: 1px 1px 5px grey;
              cursor: pointer;
              transition: box-shadow 300ms;
            }
            span {
              font-size: 1.8rem;
            }
          }
        }
      }
      #{$self}__rating {
        margin-bottom: 1rem;
        span {
          font-size: 1.3rem;
        }
      }
    }
  }
}
</style>
