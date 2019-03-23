<template>
  <div class="ranking-item">
    <div class="ranking-item__container">
      <div
        class="book-ranking"
        :class="{first:index === 0,second:index === 1,third:index === 2, other:index > 2}"
      >{{index + 1}}</div>
      <div class="book-cover">
        <img
          class="book-cover__img"
          v-lazyload
          :data-src="`https://storage.googleapis.com/theta-images/${book.cover}`"
          alt
        >
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
              :rating="+book.rating.toFixed(2)"
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
              v-else-if="book.ratings"
              :rating="+book.ratings.toFixed(2)"
              :star-size="18"
              :read-only="true"
              inactive-color="#D8D7D5"
              active-color="#FFB727"
              :increment="0.01"
              :round-start-rating="false"
              border-color="#FFB727"
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
      <div v-if="!trending" class="book-score">{{score}}</div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/All/Select";
export default {
  props: {
    book: Object,
    index: Number,
    score: Number,
    trending: Boolean
  },
  components: {
    Select
  },
  created() {}
};
</script>

<style lang="scss">
.ranking-item {
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
  .book-cover {
    width: 100px;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
    &__img {
      border-radius: 10px;
      width: 100px;
      height: 150px;
      transition: 300ms;
      &:hover {
        transform: scale(1.1);
        transition: 300ms;
      }
    }
  }
}
</style>
