<template>
  <div class="book-homepage">
    <div @mouseenter="menuOpen" @mouseleave="menuClose" id="book-card" class="big">
      <div class="book-cover">
        <span class="star-rating"></span>
        <nuxt-link class="book-img-div" tag="div" :to="'/books/' + book._id">
          <v-img
            :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
            :aspect-ratio="1/1.5"
            max-width="155rem"
            alt="Book cover"
          ></v-img>
        </nuxt-link>
        <div
          @click.stop="menu_modal=true"
          v-if="menu"
          class="book-menu flex-row flex--align flex--center"
        >
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
        <p v-clampy="3" class="book-title full" ref="texting">{{book.title}}</p>
        <span class="p-ending"></span>
        <div class="flex-divider flex-row flex--align">
          <div class="book-rating" v-if="book.ratings" v-text="`(${+book.ratings.toFixed(2)})`"></div>
          <div class="book-rating" v-else-if="book.rating" v-text="`(${+book.rating.toFixed(2)})`"></div>
          <div v-if="!$device.isMobile">
            <v-rating
              color="#FF8D29"
              v-if="book.ratings"
              readonly
              size="20"
              half-increments
              :value="+book.ratings.toFixed(2)"
            ></v-rating>
            <v-rating
              color="#FF8D29"
              size="20"
              half-increments
              v-else-if="book.rating"
              readonly
              :value="+book.rating.toFixed(2)"
            ></v-rating>
            <v-rating size="20" color="#FF8D29" v-else :readonly="true" :value="0"></v-rating>
          </div>
        </div>
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
    trending: Object,
    index: Number
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
  width: 140px;
  /* height: 245px; */
  position: relative;
  .book-rating {
    font-size: 1.3rem;
  }
  .book-menu {
    position: absolute;
    top: 5px;
    right: 0;
    font-size: 2rem;
    z-index: 1000;
    transition: 300ms;
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 10px 5px rgb(211, 211, 211);
    width: 2.5rem;
    height: 2.5rem;
    &__modal {
      position: absolute;
      // right: -118px;
      right: 0 !important;
      top: 0px;
      background-color: white;
      z-index: 2000;
      width: 120px;
      &--left {
      }
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
      transition: 300ms;
      background-color: rgba(70, 70, 70, 0.432);
      border-radius: 100px;
    }
  }
  .book-cover {
    width: 140px;
    // min-height: 180px;
    height: 210px;
    -o-object-fit: contain;
    object-fit: contain;
    // width: 16.5rem;
    // height: 24.5rem;
    position: relative;
    // -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    // -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    // box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
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
      min-width: 120px;
      max-height: 140px;
      min-height: 180px;
      max-height: 210px;

      /* border-radius: 10px; */

      // border-radius: 5px;
      /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
    }
  }
  .text-info {
    display: flex;
    flex-direction: column;
    .v-icon {
      padding: 0 !important;
    }
    .vue-star-rating-rating-text {
      font-size: 1.6rem;

      margin: 0 !important;
    }
    .book-title {
      margin: 0;
      font-weight: 400;
      padding: 0;
      a {
        font-size: 1.4rem;
        color: black;
        &:hover {
          color: $primary;
        }
      }
      text-align: left !important;
      transition: 300ms;
      &:hover {
        cursor: pointer;

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