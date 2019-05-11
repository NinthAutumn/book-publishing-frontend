<template>
  <v-dialog class="username-form" v-model="open" persistent>
    <!-- <div class="flex-divider flex-row flex--align flex--center">
      <croppa
        :accept="'image/*'"
        :canvas-color="'default'"
        :placeholder="'作者としてのアバター'"
        v-model="user.avatar"
      ></croppa>
    </div>-->
    <div class="username-form__username">
      <input type="text" v-model="user.username">
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      user: {
        avatar: "",
        username: ""
      }
    };
  },
  async mounted() {
    if (!this.$store.getters.loggedInUser.username) {
      this.open = true;
    }
  }
};
</script>

<style lang="scss">
</style>
