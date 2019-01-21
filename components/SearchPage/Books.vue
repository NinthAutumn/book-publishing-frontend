<template>
  <section class="search-books">
    <div class="container flex-row flex-row--betweeen">
      <div class="book-cover">
        <img class="book-cover-img" :src="book.cover" alt>
      </div>
      <div class="book-info flex-column">
        <div class="book-header flex-row">
          <div class="book-title">{{book.title}}</div>
          <div class="book-rating">
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
                class="star-rating"
              ></star-rating>
            </no-ssr>
          </div>
        </div>
        <div class="book-synopsis">{{book.synopsis}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    book: Object
  },
  computed: {}
};
</script>

<style>
.book-cover-img {
  width: 84px;
  height: 124px;
  border-radius: 10px;
}
</style>
