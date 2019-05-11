<template>
  <div class="contract-component">
    <v-dialog v-model="contract" height="50rem" width="50rem" persistent hide-overlay>
      <div class="contract-component__title">
        <fa icon="file-contract" class style="margin-right:5px;"></fa>契約を結ぶ
      </div>
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
  computed: {
    contract() {
      return this.$store.getters["getContractModalState"];
    }
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
  }
  &__title {
    font-size: 1.8rem;
    padding: 2rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    background-color: #fff;
  }
}
</style>
