<template>
  <div class="loader" v-if="watching" />
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    loader: null,
    watching: false
  }),
  computed: mapState({
    active: state => state.active
  }),
  watch: {
    active(isActive) {
      if (this.watching && !isActive) {
        this.watching = false;
      }
    }
  },
  methods: {
    start() {
      this.watching = true;
    },
    finish() {
      if (this.active) {
        this.watching = true;
      }
    }
  }
};
</script>

<style lang="scss">
.loader {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: $primary;
  z-index: 1000000;
}
</style>



