<template>
  <div class="book-homepage">
    <div @mouseenter="menuOpen" @mouseleave="menuClose" id="book-card" class="big">
      <div class="book-cover">
        <span class="star-rating"></span>
        <nuxt-link class="book-img-div" tag="div" :to="'/books/' + book._id">
          <img
            :src=" 'https://storage.googleapis.com/theta-images/'+ book.cover"
            class="book-img"
            alt="Book cover"
          >
        </nuxt-link>
        <div @click="menu_modal=true" v-if="menu" class="book-menu">
          <fa icon="ellipsis-v"></fa>
        </div>
        <transition name="grow-shrink">
          <div class="book-menu__modal" v-if="menu_modal" v-click-outside="menuModalClose">
            <div class="book-menu__modal__options flex--center flex flex--align">ブックマーク</div>
            <div class="book-menu__modal__options flex--center flex flex--align">再読列記に保存</div>
            <div class="book-menu__modal__options flex--center flex flex--align">後で読むに保存</div>
          </div>
        </transition>
      </div>
      <nuxt-link tag="div" :to="'/books/' + book._id" class="text-info">
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
      </nuxt-link>
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
      rating: 3.5,
      menu: false,
      menu_modal: false
    };
  },
  methods: {
    linkTo() {
      this.$router.push("/books/" + this.book._id);
    },
    linkToT() {
      this.$router.push();
    },
    menuOpen() {
      this.menu = true;
    },
    menuClose() {
      this.menu = false;
    },
    menuModalClose() {
      this.menu_modal = false;
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
  },
  created() {}
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
  .book-menu {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    z-index: 1000;
    transition: 300ms;
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 10px 5px rgb(211, 211, 211);
    &__modal {
      position: absolute;
      right: -118px;
      top: 0px;
      background-color: white;
      z-index: 2000;
      width: 120px;
      box-shadow: 1px 1px 5px 0px rgb(219, 219, 219);
      &__options {
        &:hover {
          background-color: rgb(247, 247, 247);
          cursor: pointer;
        }
        font-size: 14px;
        height: 30px;
      }
    }
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: 300ms;
    }
  }
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
    .book-img-div {
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
    }
    .book-img {
      width: 142px;
      height: 209px;

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
      a {
        color: black;
        &:hover {
          color: $primary;
        }
      }
      text-align: left !important;
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