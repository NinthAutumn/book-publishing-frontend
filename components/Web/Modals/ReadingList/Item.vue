<template>
  <div class="reading-modal__item">
    <div class="reading-modal__checkbox">
      <!-- {{inserted}} -->
      <v-checkbox v-ripple="false" @click.stop="checkboxHandler" v-model="inserted"></v-checkbox>
    </div>
    <div class="reading-modal__title" v-text="`${list.title} ${inserted? '(保存ずみ)':''}`"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
    bookId: Number
  },

  data() {
    return {
      inserted: false
    };
  },
  methods: {
    async checkboxHandler() {
      this.inserted = !this.inserted;
      await this.$store.dispatch("reading/addBookToReadingList", {
        id: this.list.id,
        book: {
          book_id: this.bookId
        }
      });
    }
  },
  mounted() {
    this.inserted = this.list.inserted;
  }
};
</script>

<style lang="scss">
</style>
