<template>
  <div class="chapter-nav" :class="`chapter-nav--${theme}`">
    <div class="chapter-nav__container">
      <nuxt-link
        v-if="data"
        :to="`/books/${$route.params.id}/${data.id}`"
        class="chapter-nav__content"
      >
        <div class="chapter-nav__icon">
          <fa :icon="icon"></fa>
        </div>
        <div class="chapter-nav__title" v-text="data.title"></div>
      </nuxt-link>
      <div v-else class="chapter-nav__placeholder"></div>
    </div>
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
.chapter-nav {
  $self: &;
  &--prev {
    #{$self}__content {
      flex-direction: row-reverse;
    }
  }
  &__container {
    position: sticky;
    height: 100vh;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      #{$self}__icon {
        @include themify($themes) {
          background: themed("textColor");
          color: themed("textBackgroundColor");
        }
      }
    }
    #{$self}__content {
      width: 6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // padding: 0 1rem;
      @include themify($themes) {
        color: themed("textColor");
      }
      #{$self}__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        font-size: 2rem;
        height: 100vh;
        &:hover {
          cursor: pointer;
        }
      }
      #{$self}__title {
        -webkit-text-orientation: upright;
        text-orientation: upright;
        -ms-writing-mode: tb-rl;
        writing-mode: vertical-rl;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.6rem;
        height: 50vh;
      }
    }
    #{$self}__placeholder {
      width: 6rem;
    }
  }
}
</style>
