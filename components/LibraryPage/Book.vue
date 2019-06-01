<template>
  <div class="book-library">
    <nuxt-link tag="div" :to="`books/${book.book_id}`" id="book-library__container">
      <div class="book-library__cover">
        <span class="star-rating"></span>
        <!-- :src="`https://storage.googleapis.com/theta-images/${book.cover}`" -->

        <v-img
          :src="book.cover"
          alt="Book cover"
          :aspect-ratio="1/1.5"
          max-width="13.5rem"
          :lazy-src="cover"
          style=" border-radius: 0.4rem;"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="black "></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </div>
      <div class="book-library__text-info">
        <div class="book-library__progress-bar">
          <v-progress-linear
            class="book-library__progress-line"
            color="#F05A77"
            height="4"
            v-if="book.chapter_count"
            :value="(book.read/book.chapter_count)*100"
          ></v-progress-linear>
          <span
            class="book-library__progress"
            v-if="book.chapter_count"
            v-text="`${((book.read/book.chapter_count)*100).toFixed(0)}%`"
          ></span>
        </div>
        <p v-line-clamp="2" class="book-library__book-title full" ref="texting">{{book.title}}</p>
        <div class="book-library__more-info flex-row flex--align">
          <div class="book-library__author">{{book.author}}</div>

          <!-- <span class="book-library__progress" v-else v-text="'栞: '+0+ '/' + book.id"></span> -->
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: "book-card",
  comonents: {},
  props: {
    book: Object,
    size: String,
    trending: Object,
    progress: Object
  },
  data() {
    return {
      rating: 3.5,
      cover: require("~/assets/img/NobleCardLight.png")
    };
  },
  methods: {
    linkTo() {
      this.$router.push("/books/" + this.book.id);
    },
    linkToT() {
      this.$router.push("/books/" + this.book.id);
    }
  },
  computated: {
    round() {},
    roundT() {}
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
.book-library {
  max-width: 13.5rem;
  &__container {
    max-width: 13.5rem;
    position: relative;
  }
  &__cover {
    margin: 0 !important;
    max-width: 13.5rem;
    position: relative;
    border-radius: 0.4rem;
    &:hover {
      cursor: pointer;
      // -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      //   0 8px 16px -8px rgba(0, 0, 0, 0.3),
      //   0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      // box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      //   0 8px 16px -8px rgba(0, 0, 0, 0.3),
      //   0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      // -webkit-transition-property: color, background-color, -webkit-box-shadow,
      //   -webkit-transform;
      // transition-property: color, background-color, -webkit-box-shadow,
      //   -webkit-transform;
      // transition-property: color, background-color, box-shadow, transform;
      // transition-property: color, background-color, box-shadow, transform,
      //   -webkit-box-shadow, -webkit-transform;
      &::after {
        border-radius: 0.4rem;
        position: absolute;
        background: black;
        top: 0;
        left: 0;
        content: "";
        opacity: 0.2;
        display: block;
        animation: gradualAppearance 200ms ease-out;
        animation-fill-mode: reverse;
        width: 100%;
        height: 100%;
      }
    }
  }
  &__book-img {
    max-width: 13rem;
    position: relative;
  }
  &__book-title {
    margin: 0;
    word-break: break-word;
    a {
      font-size: 14px;
      font-weight: 500;
      word-break: break-word;
    }
    padding: 0;
    text-align: left;
    width: 95%;
    transition: 300ms;
    &:hover {
      cursor: pointer;
      transition: 200ms;
    }
  }
  &__more-info {
  }
  &__author {
    font-size: 12px;
  }
  $self: &;
  &__progress-bar {
    #{$self}__progress-line {
      border-radius: 100px;
    }
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__progress {
    font-size: 13px;
    margin-left: 0.25rem;
    color: #83848f;
  }
}

.book-library {
  #book-card {
    .text-info {
      .book-title {
      }
    }
  }
}

@keyframes gradualAppearance {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}
</style>