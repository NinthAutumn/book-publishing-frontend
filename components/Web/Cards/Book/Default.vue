<template>
  <div tag="div" class="book-card" :class="customClass">
    <!-- {{book}} -->
    <div
      class="book-card__container"
      v-ripple="isMobile"
      v-touch:start="startHandler"
      v-touch:end="endHandler"
      @click="selectItem"
    >
      <div v-if="editMode" class="book-card__editmode"></div>
      <nuxt-link
        :to="editMode? '?editMode=true':`/books/${book.book_id||book.id}${book.current_chapter? `/${book.current_chapter}`:''}`"
        class="book-card__cover"
        tag="div"
        :class="{'book-card__cover--desktop': !isMobile}"
      >
        <div v-if="editMode" class="book-card__edit">
          <div v-if="!selected" class="book-card__check"></div>
          <div v-else class="book-card__check book-card__check--selected">
            <fa icon="check"></fa>
          </div>
        </div>
        <v-img
          class="book-card__img"
          :src="`${cover}/m`"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        ></v-img>
      </nuxt-link>
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
      <nuxt-link
        tag="div"
        :to="`/books/${book.book_id||book.id}`"
        v-line-clamp="clampLine"
        class="book-card__title"
        v-text="book.title"
      ></nuxt-link>
      <div v-if="book.name" class="book-card__genre" v-text="book.name"></div>
      <div class="book-card__rating flex-row flex--align" v-if="!isMobile">
        <v-rating
          v-if="rating"
          color="#FF634C"
          readonly
          :size="20"
          half-increments
          :value="+book.rating"
        ></v-rating>
        <div v-if="rating" class="book-card__rating-number" v-text="+book.rating"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { TrinityRingsSpinner } from "epic-spinners";
export default {
  name: "default-bookcard",
  serverCacheKey: props => props.book.id,
  props: {
    cover: {
      type: [String, Object],
      default: require("~/assets/img/NobleCardLight.png?size=510")
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
    rating: Boolean,
    editMode: [Boolean, String]
  },
  data() {
    return {
      lazyCover: require("~/assets/img/NobleCardLight.png"),
      timer: false,
      lockTimer: false,
      touchduration: 500,
      selected: false
    };
  },
  components: {
    // TrinityRingsSpinner
  },
  methods: {
    startHandler(e) {
      if (!this.progress) {
        return;
      }
      if (this.lockTimer) {
        return;
      }
      this.timer = setTimeout(this.onlongtouch, this.touchduration);
      this.lockTimer = true;
    },
    selectItem() {
      this.selected = !this.selected;
      // console.log(this.book);
      if (this.selected) {
        this.$emit("addBook", { bookId: this.book.book_id });
      } else {
        this.$emit("removeBook", { bookId: this.book.book_id });
      }
    },
    onlongtouch() {
      this.$emit("editModeToggle", this.book.id);
      // alert("dope");
    },
    endHandler(e) {
      if (this.timer) {
        clearTimeout(this.timer); // clearTimeout, not cleartimeout..
        this.lockTimer = false;
      }
    }
  }
};
</script>

<style lang="scss">
.book-card {
  $self: &;
  &:hover {
    user-select: none;
    cursor: pointer;
  }
  &__container {
    position: relative;
  }
  &__editmode {
    position: absolute;
    height: 100%;
    width: 100%;

    // background-color: ;
    z-index: 5;
  }
  @media screen and (min-width: 500px) {
    &__edit {
      #{$self}__check {
        width: 4rem !important;
        height: 4rem !important;
        border: 2px solid white !important;

        &--selected {
          border: 0px !important;
          font-size: 1.5rem !important;
        }
      }
    }
  }
  &__edit {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(31, 31, 31, 0.644);
    align-items: center;
    justify-content: center;
    z-index: 6;
    border-radius: 0.5rem;

    // border
    #{$self}__check {
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      height: 2rem;
      // background-color: #fff;
      border: 2px solid white;
      border-radius: 100rem;
      &--selected {
        font-size: 1.1rem;
        background-color: $secondary;
        color: white;
      }
    }
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
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
    }
  }
  @media screen and (max-width: 450px) {
    #{$self}__title {
      font-size: 1.2rem;
    }
    #{$self}__genre {
      font-size: 1.1rem;
    }
  }
  @media screen and (max-width: 375px) {
    #{$self}__title {
      font-size: 1.1rem;
    }
    #{$self}__genre {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 320px) {
    #{$self}__title {
      font-size: 1rem;
    }
    #{$self}__genre {
      font-size: 0.9rem;
    }
  }
  &__title {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    font-weight: bold;
  }
  &__rating {
    // text-align: center;
    .v-icon {
      padding: 0 !important;
    }
  }
  &__genre {
    font-size: 1.2rem;
    color: #83848f;
    font-weight: bold;
  }
  &__rating-number {
    font-size: 1.4rem;
    margin-left: 1rem;
    opacity: 0.6;
    font-weight: bold;
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
