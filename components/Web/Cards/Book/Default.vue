<template>
  <nuxt-link
    tag="div"
    :to="`/books/${book.book_id||book.id}`"
    class="book-card"
    :class="customClass"
  >
    <!-- {{book}} -->
    <div class="book-card__container" v-ripple="isMobile">
      <div class="book-card__cover" :class="{'book-card__cover--desktop': !isMobile}">
        <v-img
          class="book-card__img"
          :src="`${cover}/m`"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        >
          <template v-slot:placeholder>
            <div class="book-card__loading">
              <div class="trinity-rings-spinner">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </template>
        </v-img>
      </div>
      <div class="book-card__progress-bar" v-if="progress">
        <v-progress-linear
          class="book-card__progress-line"
          color="#F05A77"
          height="4"
          v-if="book.chapter_count"
          :value="(book.read/book.chapter_count)*100"
        ></v-progress-linear>
        <span
          class="book-card__progress"
          v-if="book.chapter_count"
          v-text="`${((book.read/book.chapter_count)*100).toFixed(0)}%`"
        ></span>
      </div>
      <div v-line-clamp="clampLine" class="book-card__title" v-text="book.title"></div>
      <!-- {{rating}} -->
      <div class="book-card__rating" v-if="!isMobile">
        <v-rating
          v-if="rating"
          color="#FF634C"
          readonly
          :size="25"
          half-increments
          :value="+book.rating"
        ></v-rating>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
// import { TrinityRingsSpinner } from "epic-spinners";
export default {
  props: {
    cover: {
      type: [String, Object],
      default: require("~/assets/img/NobleCardLight.png?webp")
    },
    book: {
      type: Object
    },
    progress: {
      type: Boolean,
      default: false
    },
    clampLine: {
      type: [String, Number],
      default: 2
    },
    customClass: {
      type: [String, Object],
      default: ""
    },
    // progress: {
    //   type: [String, Number],
    //   default: 0
    // },
    isMobile: {
      type: Boolean,
      default: false
    },
    rating: Boolean
  },
  data() {
    return {
      lazyCover: require("~/assets/img/NobleCardLight.png?webp")
    };
  },
  components: {
    // TrinityRingsSpinner
  }
  // mounted: {}
};
</script>

<style lang="scss">
.book-card {
  $self: &;
  &:hover {
    user-select: none;
    cursor: pointer;
  }
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  &__cover {
    position: relative;

    &--desktop {
      &:hover {
        &::before {
          border-radius: 0.5rem;
          height: 100%;
          z-index: 1;
          width: 100%;
          content: "";
          background-color: rgba(0, 0, 0, 0.205);
          position: absolute;
        }
      }
    }
    #{$self}__img {
      border-radius: 0.5rem;
    }
  }
  @media screen and (max-width: 450px) {
    #{$self}__title {
      font-size: 1.3rem;
    }
  }
  &__title {
    font-size: 1.4rem;
  }
  &__rating {
    // text-align: center;
    .v-icon {
      padding: 0 !important;
    }
  }
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

.trinity-rings-spinner,
.trinity-rings-spinner * {
  box-sizing: border-box;
}

.trinity-rings-spinner {
  height: 3.5rem;
  width: 3.5rem;
  padding: 3px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  box-sizing: border-box;
}
.trinity-rings-spinner .circle {
  position: absolute;
  display: block;
  border-radius: 50%;
  border: 3px solid #ff1d5e;
  opacity: 1;
}

.trinity-rings-spinner .circle:nth-child(1) {
  height: 3.5rem;
  width: 3.5rem;
  animation: trinity-rings-spinner-circle1-animation 1.5s infinite linear;
  border-width: 3px;
}
.trinity-rings-spinner .circle:nth-child(2) {
  height: calc(3.5rem * 0.65);
  width: calc(3.5rem * 0.65);
  animation: trinity-rings-spinner-circle2-animation 1.5s infinite linear;
  border-width: 2px;
}
.trinity-rings-spinner .circle:nth-child(3) {
  height: calc(3.5rem * 0.1);
  width: calc(3.5rem * 0.1);
  animation: trinity-rings-spinner-circle3-animation 1.5s infinite linear;
  border-width: 1px;
}

@keyframes trinity-rings-spinner-circle1-animation {
  0% {
    transform: rotateZ(20deg) rotateY(0deg);
  }
  100% {
    transform: rotateZ(100deg) rotateY(360deg);
  }
}
@keyframes trinity-rings-spinner-circle2-animation {
  0% {
    transform: rotateZ(100deg) rotateX(0deg);
  }
  100% {
    transform: rotateZ(0deg) rotateX(360deg);
  }
}
@keyframes trinity-rings-spinner-circle3-animation {
  0% {
    transform: rotateZ(100deg) rotateX(-360deg);
  }
  100% {
    transform: rotateZ(-360deg) rotateX(360deg);
  }
}
</style>
