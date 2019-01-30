<template>
  <div class="chapter-page">
    <Horizontal></Horizontal>
    <LeftV></LeftV>
    <RightV></RightV>
    <nuxt class="yes"></nuxt>
  </div>
</template>

<script>
import Horizontal from "./Horizontal";
import LeftV from "./Left-V";
import RightV from "./Right-V";

export default {
  components: {
    Horizontal,
    LeftV,
    RightV
  }
};
</script>

<style lang="scss">
/* .chapter-page .menu-active {
  margin-left: 240px;
  margin-top: 6.6rem;
  padding: 1rem 5rem;
  transition: 300ms;
  position: relative !important;
} */
.chapter-page .yes {
  // padding: 1rem 0rem;
  transition: 300ms;
  // position: relative !important;
  margin-top: 50px;
  margin-right: 50px;
  background-color: #f2f2f2;
}
</style>
