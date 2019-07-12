<template>
  <div class="book-scard">
    <div class="book-scard__container">
      <div class="book-scard__cover">
        <v-img
          class="book-scard__img"
          :src="cover"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        >
          <template v-slot:placeholder>
            <div class="book-scard__loading">
              <div class="trinity-rings-spinner">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </template>
        </v-img>
      </div>
      <div class="book-scard__meta">
        <div class="book-scard__title" v-text="book.title"></div>
        <div class="book-scard__genre" v-text="`${book.pen_name}・${book.name}`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
.book-scard {
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
