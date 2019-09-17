<template>
  <div class="bselect-modal" v-click-outside="toggleModal" :class="{'bselect-modal--top':top}">
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
import { mapGetters } from "vuex";
export default {
  props: {
    bookId: Number,
    top: Boolean
  },
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
  computed: {
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
    toggleModal() {
      this.$emit("toggle");
    },
    mainHandler(key) {
      if (key === "reading") {
        if (!this.auth) return this.$store.commit("LOGIN_STATE");
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
  &--top {
    width: 12rem;
    top: 0;
    left: -11rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    background-color: #fff;
  }
  bottom: 2rem;
  z-index: 10000;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);

  &__container {
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    background-color: #fff;
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
