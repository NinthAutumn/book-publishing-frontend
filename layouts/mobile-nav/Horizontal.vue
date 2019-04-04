<template>
  <nav class="mh-nav">
    <div class="mh-nav__home"></div>
    <div class="mh-nav__profile">
      <v-avatar>
        <img :src="user.avatar">
      </v-avatar>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>

<style lang="scss">
</style>
