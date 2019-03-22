<template>
  <div class="ranking-item" :class="{'top-ranked':index <= 2 }">
    <div class="ranking-item__container">
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
              class="star-rating flex flex--center"
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
              class="star-rating flex flex--center"
            ></star-rating>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    index: Number
  },
  created() {}
};
</script>

<style lang="scss">
.top-ranked {
  width: 28% !important;

  .ranking-item__container {
    padding: 20px 0;
    display: flex;
    width: 100%;
    height: 400px;
    background-color: #f2f2f2;
    flex-direction: column;
    align-items: center;
  }

  .book-meta {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .book-title {
    h4 {
      font-size: 16px;
      margin: 0 !important;
    }
  }
  .book-author {
    p {
      font-size: 12px;
      color: grey;
    }
  }
  .book-cover {
    &__img {
      box-shadow: 1px 1px 5px rgb(243, 243, 243);
    }
  }
}
.ranking-item {
  .book-author {
    box-shadow: none;
  }
  width: 100%;
  // margin: auto;
  .vue-star-rating-rating-text {
    margin: 0 !important;
    font-size: 13px;
  }

  &__container {
    display: flex;
    width: 100%;
  }
  .book-cover {
    &__img {
      width: 120px;
      height: 180px;
    }
  }
}
</style>
