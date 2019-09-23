<template>
  <div
    :style="{'font-size':font + 'px', 'font-family':fontStyle}"
    class="chapter-content"
    ref="chapterContent"
    v-html="content"
  ></div>
</template>

<script>
export default {
  props: ["font", "fontStyle", "content"]
};
</script>

<style lang="scss">
</style>
