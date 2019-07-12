<template>
  <nav class="mc-nav" :class="`mc-nav--${theme}`">
    <div class="mc-nav__header flex-row flex--align　flex--between">
      <div class="mc-nav__back" @click="goBack" v-ripple>
        <fa icon="arrow-left"></fa>
      </div>
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
  },
  methods: {
    goBack() {
      this.$router.push(`/books/${this.$route.params.id}`);
    }
  }
};
</script>

<style lang="scss">
.mc-nav {
  $self: &;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  &--black {
    background-color: #1a1a1b !important;
    color: #d7dadc;
  }
  &--tan {
    background-color: #e9e1b8;
  }
  &__header {
    // padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
    height: 100%;
    #{$self}__back {
      font-size: 2.5rem;
      height: 40px;
      width: 40px !important;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      // padding: 0 1rem;
      // border-radius: 1rem;
      // color: grey;
      margin-right: 1rem;
      // background-color: #e3e8ee;
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
