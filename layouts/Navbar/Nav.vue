<template>
  <div class="nav">
    <Horizontal @onClick="showClicked"></Horizontal>
    <Vertical :showed="showed"></Vertical>
  </div>
</template>
<script>
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";
export default {
  components: {
    Horizontal,
    Vertical
  },
  data() {
    return {
      show: "notClicked"
    };
  },
  methods: {
    showClicked() {
      if (this.showed !== "clicked") {
        this.showed = "clicked";
      } else {
        this.showed = "notClicked";
      }
    }
  }
};
</script>
<style>
</style>
