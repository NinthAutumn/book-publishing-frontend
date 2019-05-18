<template>
  <section class="search-books">
    <div class="book-container flex-row flex-row--betweeen">
      <div class="flex-column">
        <div class="book-cover">
          <nuxt-link :to="{path: `books/${book.id}`}">
            <v-img
              class="book-cover-img"
              :src="book.cover"
              :aspect-ratio="1/1.5"
              max-width="14rem"
              min-width="12rem"
              alt="Book cover"
            ></v-img>
          </nuxt-link>
        </div>
        <div class="book-rating">
          <v-rating color="#FF8D29" readonly size="20" half-increments :value="+book.rating"></v-rating>
        </div>
      </div>

      <div class="book-info flex-column" :class="readMore">
        <div class="book-title">
          <nuxt-link :to="{path: `books/${book.id}`}">
            <header class="book-title--text">{{book.title}}</header>
          </nuxt-link>
        </div>
        <div class="book-genres">
          <ul class="genre-list flex-row">
            <li
              v-for="(genre,index) in book.genres"
              :key="index"
              class="pill pill-secondary-open pill-round"
            >
              <div class="pill-text">
                <p>{{genre}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="book-header flex-row flex-row--between"></div>
        <div class="book-synopsis">
          <p class="synopsis" v-clampy="3">{{book.synopsis}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    book: Object
  },
  computed: {},
  data() {
    return {
      readMore: null
    };
  },
  methods: {
    openState() {
      if (this.readMore) {
        this.readMore = "";
      } else {
        this.readMore = "open";
      }
    }
  },
  created() {
    if (this.book.synopsis.length > 340) {
      this.readMore = "open";
    } else {
      this.readMore = "";
    }
  }
};
</script>

<style lang="scss">
.book-synopsis {
  a {
    &:hover {
      cursor: pointer;
    }
  }
}
.book-cover-img {
  margin-right: 10px;
}
.book-container {
  .v-icon {
    padding: 0 !important;
  }
  padding: 5px 7px;
  .vue-star-rating-rating-text {
    margin: 0 !important;
    font-size: 15px;
  }
  .book-info {
  }
  .book-info .open {
    height: none;
    height: 100% !important;
    overflow: visible;
    transition: 300ms;
  }
  .book-header {
  }
  .book-synopsis {
    overflow: hidden;
    line-height: 27px;
  }
}

.book-title {
  &--text {
    font-size: 18px;
    font-weight: 500;
    color: rgb(65, 57, 66);
    &:hover {
      color: $primary;
    }
  }
}

.genre-list {
  &--item {
    height: 25px;
    p {
      font-size: 13px;
      color: $secondary;
    }

    border-radius: 5px;
    border: 1.4px solid $secondary;
    padding: 0px 7px;
    margin-left: 2px;

    &:hover {
      background-color: $secondary;
      p {
        color: white;
      }
      cursor: pointer;
    }
  }
}
</style>
