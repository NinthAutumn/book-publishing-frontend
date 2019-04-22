<template>
  <div class="ranking-item" v-ripple>
    <nuxt-link tag="div" :to="`books/${book.id}`" class="ranking-item__container">
      <div
        class="book-ranking"
        :class="{first:index === 0,second:index === 1,third:index === 2, other:index > 2}"
      >{{index + 1}}</div>
      <div class="book-cover">
        <v-img
          :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          alt="Book cover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
        ></v-img>
      </div>
      <div class="book-meta">
        <div class="book-title">
          <h4>{{book.title}}</h4>
        </div>
        <div class="book-author">
          <p>{{book.author}}</p>
        </div>
        <div class="book-rating">
          <no-ssr>
            <star-rating
              v-if="book.rating"
              :rating="book.rating"
              :star-size="18"
              :read-only="true"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
              :glow="1"
              class="star-rating"
            ></star-rating>
            <star-rating
              v-else
              :show-rating="false"
              :rating="0"
              :star-size="18"
              :read-only="true"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
              class="star-rating"
            ></star-rating>
          </no-ssr>
        </div>
      </div>
      <div v-if="score" class="book-score">{{score}}</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    index: Number,
    score: Number,
    trending: Boolean
  },
  components: {
    Select: () => import("@/components/All/Select")
  },
  created() {}
};
</script>

<style lang="scss">
.ranking-item {
  user-select: none;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgb(202, 202, 202);
  padding: 10px 0;
  background: linear-gradient(to right, rgb(248, 248, 248) 50%, white 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 300ms ease;
  &:hover {
    // color: white;
    background-position: left bottom;
  }
  box-sizing: border-box;
  .book-author {
    box-shadow: none;
  }
  width: 100%;
  .vue-star-rating-rating-text {
    margin: 0 !important;
    font-size: 13px;
  }
  .book-meta {
    flex-grow: 1;
    padding: 0 5px;
  }
  .book-title {
    h4 {
      font-size: 16px;
      margin: 0 !important;
    }
  }
  &__container {
    display: flex;
    width: 100%;
  }
  .book-ranking {
    font-size: 18px;
    font-weight: bold;
    width: 35px;
    // height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .first {
    // background-color: #fec936;
  }
  .second {
    // background-color: #c0c0c0c2;
  }
  .third {
    // background-color: #cd7f32c2;
  }
  .other {
    // background-color: #11c6ff7a;
  }
  @media screen and (max-width: 400px) {
    .book-cover {
      max-width: 13rem !important;
      min-width: 7rem !important;
    }
  }
  .book-cover {
    border-radius: 10px;
    max-width: 15rem;
    min-width: 10rem;
    overflow: hidden;

    &__img {
      max-width: 15rem;
      border-radius: 10px;
      transition: 300ms;
      &:hover {
        transform: scale(1.1);
        transition: 300ms;
      }
    }
  }
}
</style>
