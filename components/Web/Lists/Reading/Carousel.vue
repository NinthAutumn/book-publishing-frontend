<template>
  <div class="carousel-reading">
    <v-carousel
      :height="'33rem'"
      hide-delimiter-background
      show-arrows-on-hover
      progress-color="#556CD6"
      light
    >
      <v-carousel-item v-for="list in reading" :key="list.id" class="flex-row flex--align">
        <reading-card :reading="list"></reading-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  },

  props: ["reading"],
  components: {
    ReadingCard: () => import("@/components/Web/Cards/ReadingList")
  },
  async mounted() {}
};
</script>

<style lang="scss">
.carousel-reading {
  height: 33rem;
  width: 20rem;
  .v-carousel__controls {
    background: rgba(252, 252, 252, 0);
  }
  .v-carousel {
    box-shadow: none !important;
  }
  .v-responsive__content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
}
</style>
