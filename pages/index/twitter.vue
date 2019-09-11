<template></template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  async mounted() {
    await this.authTwitter();
  },
  computed: {
    ...mapGetters({
      path: "auth/getPath",
      user: "auth/getUser"
    })
  },
  methods: {
    ...mapMutations({
      auth: "auth/SET_AUTH"
    }),
    async authTwitter() {
      try {
        const { oauth_token, oauth_verifier } = this.$route.query;
        const { data } = await this.$axios.post(
          "/v2/auth/social/twitter/login",
          {
            oauth_token,
            oauth_verifier
          }
        );
        if (data.error) {
          this.$router.push("/");
          return this.$toast.error(data.error);
        }

        const { access_token, refresh_token } = data;
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        this.auth({ access_token, refresh_token, strategy: "twitter" });
        this.$nuxt.refresh();
        this.$storage.setUniversal("access_token", access_token);
        this.$storage.setUniversal("refresh_token", refresh_token);
        this.$storage.setUniversal("strategy", "twitter");

        await this.$store.dispatch("auth/fetchUser");
        this.$router.push(this.$storage.getUniversal("path"));
        if (!this.user.username) {
          this.$store.commit("auth/TOGGLE_USERNAME_MODAL");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
