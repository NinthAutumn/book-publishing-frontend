<template>
  <div class="mchapter-nav" v-if="data">
    <nuxt-link
      :to="`/books/${$route.params.id}/${data.id}`"
      v-ripple
      class="mchapter-nav__container"
      :class="`mchapter-nav__container--${theme}`"
    >
      <div class="mchapter-nav__icon">
        <fa :icon="icon"></fa>
      </div>
      <div class="mchapter-nav__title">{{`${data.index}話 ${data.title}`}}</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    data: Object,
    theme: {
      type: String,
      default: "next"
    }
  }
};
</script>

<style lang="scss">
.mchapter-nav {
  $self: &;
  &__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    @include themify($themes) {
      background: themed("textBackgroundColor");
      color: themed("textColor");
    }
    &--prev {
      flex-direction: column-reverse;
    }
    &--next {
      flex-direction: column;
    }
    #{$self}__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      width: 100%;
      height: 3rem;
    }
    #{$self}__title {
      font-size: 1.2rem;
    }
  }
}
</style>
