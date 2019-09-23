<template>
  <div class="chapter-header" :class="`chapter-header--${position}`">
    <h4>
      <fa style="margin-right:10px;" icon="envelope"></fa>
      {{title}}
    </h4>
    <p v-text="content"></p>
    <fa class="chapter-header__icon" icon="quote-right"></fa>
  </div>
</template>

<script>
export default {
  props: ["content", "title", "position"]
};
</script>

<style lang="scss">
.chapter-header {
  $self: &;
  position: relative;
  padding: 20px;
  padding-top: 10px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  font-family: "Noto Sans JP" !important;
  border-radius: 1rem;
  &--header {
    margin-bottom: 10px;
  }
  &--footer {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  h4 {
    font-family: "Noto Sans JP", "sans-serif" !important;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  p {
    font-family: "Noto Sans JP", "sans-serif" !important;
    font-size: 16px;
    margin: 0 !important;
  }
  &__icon {
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
    color: $primary-lighter;
  }
}
</style>
