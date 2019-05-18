<template>
  <div class="book-browse" @mouseenter="menuOpen" @mouseleave="menuClose">
    <div id="book-browse__container" :to="`/books/${book.id}`">
      <div class="book-browse__cover">
        <div class="book-browse__rating flex-row flex--align flex--center" v-if="book.rating">
          {{book.rating|| '未定'}}
          <fa class="book-browse__rating__icon" icon="star"></fa>
        </div>
        <div class="book-browse__rating flex-row flex--align flex--center" v-else>
          <fa class="book-browse__rating__icon" icon="star"></fa>
        </div>
        <nuxt-link class="book-browse__image" tag="div" :to="`/books/${book.id}`">
          <!-- :src="`https://storage.googleapis.com/theta-images/${book.cover}`" -->
          <v-img
            :src="book.cover"
            alt="Book cover"
            :aspect-ratio="1/1.5"
            max-width="15rem"
            style=" border-radius: 0.4rem;"
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
            <div class="book-menu__modal__options flex--center flex-row flex--align">ブックマーク</div>
            <div class="book-menu__modal__options flex--center flex-row flex--align">再読列記に保存</div>
            <div class="book-menu__modal__options flex--center flex-row flex--align">後で読むに保存</div>
          </div>
        </transition>
      </div>
      <div class="book-browse__text-info">
        <p v-line-clamp="2" class="book-browse__book-title full" ref="texting">{{book.title }}</p>
        <p class="book-browse__author">{{book.status}}</p>
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
      this.$router.push("/books/" + this.book._id.book[0]._id);
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
.book-browse {
  &__container {
    position: relative;
  }
  &__author {
    color: grey;
  }
  &__image {
    &:hover {
      cursor: pointer;
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
  &__rating {
    position: absolute;
    z-index: 100;
    // width: 100\\px;
    font-size: 0.9rem;
    border-radius: 0.4rem;
    width: 4rem;
    height: 1.9rem;
    // border-radius: 100px;
    // border-top-right-radius: 100px;
    // border-bottom-right-radius: 100px;
    // box-shadow: 1px 1px 5px rgb(54, 54, 54);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    &__icon {
      margin-left: 2px;
    }
  }
  &__cover {
    margin: 0 !important;

    position: relative;
  }
  &__book-img {
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
    transition: 300ms;
    color: black;
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