<template>
  <div>
    <Horizontal></Horizontal>
    <NewVertical v-if="$store.state.menuState=== 'menu-active'"></NewVertical>
  </div>
</template>

<script>
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  components: {
    Horizontal: hydrateWhenVisible(() => import("./Horizontal")),
    NewVertical: hydrateWhenVisible(() => import("./NewVertical"))
  },
  methods: {
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    }
  }
};
</script>

<style lang="scss">
</style>
