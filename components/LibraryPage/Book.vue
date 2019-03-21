<template>
  <div class="book-library">
    <div id="book-library__container" @click="linkTo">
      <div class="book-library__cover">
        <span class="star-rating"></span>
        <img
          v-lazyload
          :data-src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          class="book-library__book-img"
          alt="Book cover"
        >
      </div>
      <div class="book-library__text-info">
        <p class="book-library__book-title full" ref="texting">
          <a class>{{book.title | truncate(17)}}</a>
        </p>
        <div class="book-library__more-info flex flex--align">
          <!-- <div class="book-library__author">{{book.author}}</div> -->
          <span
            class="book-library__progress"
            v-if="progress"
            v-text="'栞: '+progress.index + '/' + book.chapters.length"
          ></span>
          <span class="book-library__progress" v-else v-text="'栞: '+0+ '/' + book.chapters.length"></span>
        </div>
      </div>
    </div>
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
      rating: 3.5
    };
  },
  methods: {
    linkTo() {
      this.$router.push("/books/" + this.book._id);
    },
    linkToT() {
      this.$router.push("/books/" + this.book._id.book[0]._id);
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
  width: 135px;
  &__container {
    width: 135px;
    position: relative;
  }
  &__cover {
    margin: 0 !important;
    width: 135px;
    height: 199px;
    position: relative;
    -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    &:hover {
      cursor: pointer;
      &::after {
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
    width: 135px;
    height: 199px;
    position: relative;
  }
  &__book-title {
    margin: 0;
    a {
      font-size: 14px;
      font-weight: 500;
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
  &__progress {
    font-size: 13px;
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