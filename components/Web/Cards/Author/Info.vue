<template>
  <div class="author-info">
    <div class="author-info__container">
      <div class="author-info__meta">.</div>
      <div class="author-info__avatar">
        <v-avatar>
          <v-img :src="author.avatar"></v-img>
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      author: "user/getAuthor"
    })
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthor");
  }
};
</script>

<style lang="scss">
</style>
