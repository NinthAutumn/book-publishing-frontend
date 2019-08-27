<template></template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  async mounted() {
    await this.authTwitter();
  },
  methods: {
    ...mapMutations({
      auth: "auth/SET_AUTH"
    }),
    async authTwitter() {
      try {
        const { oauth_token, oauth_verifier } = this.$route.query;
        const { data } = await this.$axios.post("/auth/social/twitter/login", {
          oauth_token,
          oauth_verifier
        });
        if (data.error) {
          return this.$toast.error(data.error);
        }

        const { access_token, refresh_token } = data;
        this.auth({ access_token, refresh_token, strategy: "twitter" });
        this.$storage.setUniversal("access_token", access_token);
        this.$storage.setUniversal("refresh_token", refresh_token);
        this.$storage.setUniversal("strategy", "twitter");
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        await this.$store.dispatch("auth/fetchUser");
        // this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
