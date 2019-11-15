<template>
  <nav class="mc-nav" :class="`mc-nav--${theme}`">
    <div class="mc-nav__header flex-row flex--align　flex--between">
      <nuxt-link :to="`/books/${$route.params.id}`" class="mc-nav__back" v-ripple>
        <fa icon="arrow-left"></fa>
      </nuxt-link>
      <div class="mc-nav__title">{{`${chapter.index}話 ${chapter.title} `}}</div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      chapter: "chapter/getChapter",
      theme: "user/getTheme"
    })
  }
};
</script>

<style lang="scss">
.mc-nav {
  $self: &;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  @include themify($themes) {
    background: themed("modalBackgroundColor");
    color: themed("textColor");
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
    height: 100%;
    #{$self}__back {
      font-size: 1.6rem;
      height: 3rem;
      width: 3rem !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
    }
    #{$self}__title {
      font-size: 1.4rem;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
