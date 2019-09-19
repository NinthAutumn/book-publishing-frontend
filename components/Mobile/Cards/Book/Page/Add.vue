<template>
  <div class="mp-addlist">
    <div class="mp-addlist__button" @click.stop="mainHandler">
      <fa icon="layer-group"></fa>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
    mainHandler() {
      if (!this.auth) return this.$store.commit("LOGIN_STATE");
      this.$store.commit("reading/TOGGLE_STATE", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.mp-addlist {
  $self: &;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    height: 4rem;
    width: 4rem;
    border-radius: 15rem;
    background-color: $secondary;
    color: white;
  }
}
</style>
