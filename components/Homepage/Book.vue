<template>
  <div class="book-homepage">
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
          <a class="animated-link">{{book.title | truncate(17)}}</a>
        </p>
        <span class="p-ending"></span>
        <no-ssr>
          <star-rating
            v-model="book.ratings"
            :star-size="18"
            :read-only="true"
            inactive-color="#D8D7D5"
            active-color="#FFB727"
            :increment="0.01"
            :round-start-rating="false"
            border-color="#FFB727"
            :glow="1"
            class="star-rating flex flex--center"
          ></star-rating>
        </no-ssr>
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
      book.ratings = Math.round(book.ratings);
    },
    roundT() {
      // book._id.book[0] = Mo
    }
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 17) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>
<style lang="scss">
#book-card {
  display: flex;
  flex-direction: column;
  // border-radius: 5px;
  // margin-right: 2rem;
  width: 142px;
  /* height: 245px; */
  position: relative;
  .book-cover {
    width: 142px;
    height: 209px;
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
        /* z-index: -1; */
        /* border-radius: 10px; */
        opacity: 0.2;
        display: block;
        animation: gradualAppearance 200ms ease-out;
        animation-fill-mode: reverse;
        width: 100%;
        height: 100%;
        // border-radius: 1rem;
      }
    }

    .book-img {
      width: 142px;
      height: 209px;
      position: relative;
      /* border-radius: 10px; */

      // border-radius: 5px;
      /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
    }
  }
  .text-info {
    display: flex;
    // align-items: center;
    flex-direction: column;
    /* background: white; */
    // position: relative;
    /* height: 7rem; */
    // padding: 0.5rem;
    .vue-star-rating-rating-text {
      font-size: 1.6rem;
      // position: absolute;
      // right: 0;
      margin: 0 !important;
      // margin-bottom: 5px !important;
      // margin-left: 2px !important;
      // height: 16px;
    }
    /* width: 100%; */
    /* padding-left: 5px; */

    /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
    .book-title {
      margin: 0;
      font-weight: 400;
      /* text-align: center; */
      /* margin-top: 10px; */
      // color: black !important;
      padding: 0;
      text-align: left !important;
      // width: 95%;
      /* height: 5rem; */
      // overflow: hidden;
      // text-overflow: ellipsis;
      // position: relative;
      /* line-clamp: 2; */
      // white-space: nowrap;
      /* display: -webkit-box;
  white-space: normal;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; */
      // color: black;
      transition: 300ms;
      &:hover {
        // overflow: visible;
        cursor: pointer;
        // white-space: normal;
        /* transition: overflow 500ms; */
        transition: 200ms;
      }
    }
  }
}

/* .book-title::after {
  position: absolute;
  content: "...";
  right: 0;
  bottom: 0;
} */

/* .book-card::after {
  position: absolute;
  height: 18px;
  width: 18px;
  background-color: #fec936;
  background: #fec936c4;
  top: -6px;
  left: -6px;
  content: "1";
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 14px;
  font-weight: bold;
} */

/* .p-ending {
  position: absolute;
  height: 10%;
  width: 30%; */
/* top: 0; */
/* right: 0; */
/* background: linear-gradient(to left, white, transparent); */
/* } */

// .big {
//   width: 16.5rem;
//   /* height: 245px; */
// }

.medium {
  width: 14.5rem;
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