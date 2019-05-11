<template>
  <div class="ranking-item" v-ripple>
    <nuxt-link tag="div" :to="`books/${book.id}`" class="ranking-item__container">
      <div
        class="book-ranking"
        :class="{first:index === 0,second:index === 1,third:index === 2, other:index > 2}"
        v-if="!book.rank"
      >{{index + 1}}</div>
      <div
        class="book-ranking"
        :class="{first:index === 0,second:index === 1,third:index === 2, other:index > 2}"
        v-else
      >{{book.rank }}</div>
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
      <div v-if="score" class="book-score">
        <fa v-if="vote" icon="bolt" style="margin-right:1rem;color:rgb(255, 64, 64);"></fa>
        {{score}}
        <span v-if="vote">ポイント</span>
        <span v-if="!vote">スコアー</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    index: Number,
    score: Number,
    trending: Boolean,
    vote: Boolean
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
  border-radius: 0.8rem;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  // -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
  //   0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  // box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
  //   0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  // -webkit-transition-property: color, background-color, -webkit-box-shadow,
  //   -webkit-transform;
  // transition-property: color, background-color, -webkit-box-shadow,
  //   -webkit-transform;
  // transition-property: color, background-color, box-shadow, transform;
  // transition-property: color, background-color, box-shadow, transform,
  //   -webkit-box-shadow, -webkit-transform;
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
    margin-bottom: 1rem;
    h4 {
      font-size: 16px;
      margin: 0 !important;
    }
  }
  &__container {
    display: flex;
    width: 100%;
  }
  .book-score {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    span {
      font-size: 1.6rem;
    }
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
