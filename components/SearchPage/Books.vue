<template>
  <section class="search-books">
    <div class="book-container flex-row flex-row--betweeen">
      <div class="divider flex flex-column">
        <div class="book-cover">
          <nuxt-link :to="{path: `books/${book._id}`}">
            <img
              class="book-cover-img"
              :src="'https://storage.googleapis.com/theta-images/' + book.cover"
              alt
            >
          </nuxt-link>
        </div>
        <div class="book-rating">
          <no-ssr>
            <star-rating
              :rating="book.ratings.toFixed(2)"
              :star-size="18"
              :read-only="true"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
              :glow="1"
              class="star-rating"
            ></star-rating>
          </no-ssr>
        </div>
      </div>

      <div class="book-info flex-column" :class="readMore">
        <div class="book-title">
          <nuxt-link :to="{path: `books/${book._id}`}">
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
          <p class="synopsis" :class="readMore">{{book.synopsis}}</p>
          <div class="divider" v-if="readMore">
            <a
              class="primary flex-row flex-row--around"
              @click="openState"
              v-if="!readMore"
            >Read More</a>
            <a class="primary flex-row flex-row--around" @click="openState" v-else>Read Less</a>
          </div>
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
  width: 119px;
  height: 175px;
  border-radius: 5px;
  margin-right: 10px;
}
.book-container {
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

    p {
      font-size: 16.5px;
      font-weight: 300;
      height: 70px;
      overflow: hidden;
    }
    p .open {
      font-size: 16.5px;
      font-weight: 300;
      overflow: visible;
    }
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
