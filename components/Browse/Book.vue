<template>
  <div class="book-browse">
    <div id="book-browse__container" @click="linkTo">
      <div class="book-browse__cover">
        <div class="book-browse__rating flex flex--align flex--center" v-if="book.ratings">
          {{book.ratings.toFixed(2)}}
          <fa class="book-browse__rating__icon" icon="star"></fa>
        </div>
        <div class="book-browse__rating flex flex--align flex--center" v-else>
          <fa class="book-browse__rating__icon" icon="star"></fa>
        </div>
        <img
          v-lazyload
          :data-src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          class="book-browse__book-img"
          alt="Book cover"
        >
      </div>
      <div class="book-browse__text-info">
        <p class="book-browse__book-title full" ref="texting">
          <a class>{{book.title | truncate(17)}}</a>
        </p>
        <p class="book-browse__author">{{book.author}}</p>
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
.book-browse {
  width: 135px;
  &__container {
    width: 135px;
    position: relative;
  }
  &__author {
    color: grey;
  }
  &__rating {
    position: absolute;
    z-index: 100;
    // width: 100\\px;
    font-size: 9px;
    width: 40px;
    height: 19px;
    // border-radius: 100px;
    // border-top-right-radius: 100px;
    // border-bottom-right-radius: 100px;
    // box-shadow: 1px 1px 5px rgb(54, 54, 54);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    &__icon {
      color: #fbbd08;
      margin-left: 2px;
    }
  }
  &__cover {
    margin: 0 !important;
    width: 140px;
    height: 210px;
    position: relative;
    // -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    // -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
    // box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
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
    width: 140px;
    height: 210px;
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