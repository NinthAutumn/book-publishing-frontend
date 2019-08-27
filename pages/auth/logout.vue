<template></template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  async mounted() {
    // if (!this.auth) {
    //   return this.$router.go(-1);
    // }
    this.$store.commit("DROPDOWN_FALSE");
    await this.$store.dispatch("auth/logout");
    this.$nuxt.refresh();
    this.$axios.setHeader("Authorization", null);
    this.$router.go(-1);
  }
  // auth: false
};
</script>

<style lang="scss">
</style>
