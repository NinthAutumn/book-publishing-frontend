<template>
  <div class="user-dashboard">
    <nuxt-child keep-alive></nuxt-child>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User"
};
</script>

<style>
.user-dashboard {
  /* background-color: grey; */
}
</style>
