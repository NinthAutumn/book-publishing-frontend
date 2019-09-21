<template>
  <div class="sticky-right">
    <div class="sticky-right__container">
      <ul class="sticky-right__list">
        <nuxt-link
          tag="li"
          class="sticky-right__item"
          v-for="(item,index) in list"
          :key="index"
          v-text="item.value"
          :to="item.link"
        ></nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: [Object, Array]
  }
};
</script>

<style lang="scss">
.sticky-right {
  position: fixed;
  top: 5rem;
  right: 2rem;
  // display: block;
  padding: 0.5rem;
  .nuxt-link-exact-active {
    color: $secondary !important;
    // border: 1px solid $secondary;
  }
  $self: &;
  &__container {
    #{$self}__list {
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      border-radius: 0.5rem;
      #{$self}__item {
        &:hover {
          cursor: pointer;
          color: $secondary;
        }
        font-weight: bold;
        font-size: 1.5rem;
        color: rgb(189, 189, 189);
        padding: 1rem 2rem;
      }
    }
  }
}
</style>
