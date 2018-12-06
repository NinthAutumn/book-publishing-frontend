<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" :width="width" :height="height">
    <title>ic home 48px</title>
    <g :fill="color">
      <path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "home-icon",
  data() {
    return {
      color: "black",
      clicked: false
    };
  },
  methods: {
    clickedColor() {
      if (clicked === false) {
        color = "red";
        clicked = true;
      } else {
        color = "black";
        clicked = false;
      }
    }
  }
};
</script>
