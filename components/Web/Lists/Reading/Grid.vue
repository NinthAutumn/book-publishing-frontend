<template>
  <div class="readinggrid-list">
    <div class="readinggrid-list__container">
      <reading-list library :reading="reading" v-for="reading of readinglist" :key="reading.id"></reading-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    ReadingList: () => import("@/components/Web/Cards/ReadingList")
  },
  computed: {
    ...mapGetters({
      readinglist: "reading/getUserReadingList"
    })
  },
  async mounted() {
    await this.$store.dispatch("reading/fetchMyReadingList");
  }
};
</script>

<style lang="scss">
.readinggrid-list {
  $self: &;
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 19rem);
    grid-gap: 1rem;
  }
}
</style>
