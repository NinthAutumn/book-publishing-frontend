<template>
  <div class="bselect-modal" v-click-outside="toggleModal">
    <div class="bselect-modal__container">
      <div
        class="bselect-modal__item"
        @click.stop="mainHandler(key)"
        v-for="(item,key) in list"
        :key="key"
        v-text="item.title"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bookId"],
  data() {
    return {
      list: {
        reading: {
          title: "リストに保存"
        },
        bookmark: {
          title: "ブックマーク"
        }
      }
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggle");
    },
    mainHandler(key) {
      if (key === "reading") {
        this.$store.commit("reading/TOGGLE_STATE", this.bookId);
      }
    }
  }
};
</script>

<style lang="scss">
.bselect-modal {
  $self: &;
  position: absolute;
  bottom: 2rem;
  z-index: 10000;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);

  &__container {
    #{$self}__item {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
