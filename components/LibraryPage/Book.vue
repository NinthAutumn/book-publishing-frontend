<template>
  <div class="book-library">
    <div id="book-card" class="big" @click="linkTo">
      <div class="book-cover">
        <span class="star-rating"></span>
        <img
          :src=" 'https://storage.googleapis.com/theta-images/'+ book.cover"
          class="book-img"
          alt="Book cover"
        >
      </div>
      <div class="text-info">
        <p class="book-title full" ref="texting">
          <a class>{{book.title | truncate(17)}}</a>
        </p>
        <span class="p-ending"></span>
      </div>
    </div>
  </div>
</template>
<script>
// import StarRating from "vue-star-rating";
export default {
  name: "book-card",
  comonents: {
    // StarRating
  },
  props: {
    book: Object,
    size: String,
    trending: Object
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
    round() {
      // book.ratings = Math.round(book.ratings);
    },
    roundT() {
      // book._id.book[0] = Mo
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
.book-library {
  #book-card {
    // border-radius: 5px;
    margin-right: 2rem;
    width: 113px;
    /* height: 245px; */
    position: relative;
    .book-cover {
      width: 113px;
      height: 167px;
      // width: 16.5rem;
      // height: 24.5rem;
      position: relative;
      -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
      -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
      box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
      // border-radius: 5px;
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

      .book-img {
        width: 113px;
        height: 167px;
        position: relative;
      }
    }
    .text-info {
      .book-title {
        margin: 0;
        font-weight: 400;
        a {
          font-size: 13px;
        }
        padding: 0;
        text-align: center;
        width: 95%;

        transition: 300ms;
        &:hover {
          cursor: pointer;

          transition: 200ms;
        }
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