<template>
  <div class="contract-component">
    <v-dialog v-model="open" height="50rem" width="50rem" persistent>
      <Profile></Profile>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true
    };
  },
  components: {
    Profile: () => import("./Profile")
  }
};
</script>

<style lang="scss">
.contract-component {
  $self: &;
  .v-dialog {
    background-color: #f7f8f9;
    padding: 2rem;
  }
}
</style>
