<template>
  <div class="mobile-comment" :class="`mobile-comment--${theme}`">
    <div class="mobile-comment__header">
      <div class="mobile-comment__back" v-ripple>
        <fa icon="arrow-left" @click="toggleModal"></fa>
      </div>
      <div class="mobile-comment__title">コメント欄</div>
    </div>
    <div class="mobile-comment__list">
      <Comment :comment="comment" :chapter="chapter" v-for="comment in comments" :key="comment.id"></Comment>
    </div>
    <div class="mobile-comment__form">
      <input class="mobile-comment__input" placeholder="コメントを追加">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    chapter: Object,
    theme: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      comments: "comment/getComments"
    })
  },
  methods: {
    toggleModal() {
      this.$emit("toggle", 4);
    }
  },
  components: {
    Comment: () => import("./Comment")
  },
  async mounted() {
    await this.$store.dispatch("comment/fetchMobileComments", {
      chapterId: this.$route.params.chaptersId
    });
  }
};
</script>

<style lang="scss">
.mobile-comment {
  $self: &;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: fixed;
  z-index: 100;
  // position
  top: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  // align-items:center;
  // justify-content: space-between;
  flex-direction: column;

  &--default {
    background: url("../../../assets/noise/noise-default-container.png");
    border-color: #dae0e6;
    #{$self}__header {
      background-color: black;
      color: #d7dadc;
    }
  }
  &--black {
    background-color: rgb(53, 53, 53);
    border-color: black;
    #{$self}__form {
      background-color: black;
      input {
        background-color: rgb(53, 53, 53);
      }
    }
  }
  &--tan {
    background: url("../../../assets/noise/noise-tan-container.png");
    border-color: #eed368;
    #{$self}__header {
      background-color: #e9e1b8;
      // color:blac
    }
    #{$self}__form {
      background-color: #e9e1b8;
      input {
        border-color: #eed368;
        border: 1px solid;
        background: url("../../../assets/noise/noise-tan-container.png");
      }
    }
  }
  &--ruby {
    background: url("../../../assets/noise/noise-ruby-container.png");
    border-color: red;
  }
  &--sapphire {
    background: url("../../../assets/noise/noise-sapphire-container.png");
    border-color: blue;
  }
  &__list {
    padding: 1rem;
    padding-bottom: 5rem;
    justify-self: flex-start;
    overflow: auto;
  }
  &__header {
    height: 5rem;
    // background-color: black;
    // color: #d7dadc;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    #{$self}__back {
      font-size: 2.5rem;
      margin-right: 3rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }
  }
  &__form {
    height: 5rem;
    // align-self: flex-end;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.75rem 1rem;
    #{$self}__input {
      height: 100%;
      // border: 1px solid;
      background-color: #e3e8ee;
      width: 100%;
      border-radius: 2rem;
      padding: 0 1rem;
    }
  }
}
</style>
