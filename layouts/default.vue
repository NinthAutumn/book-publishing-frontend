<template>
  <div>
    <Nav></Nav>
    <nuxt/>
  </div>
</template>
<script>
import Nav from "./Navbar/Nav";
export default {
  components: {
    Nav
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
