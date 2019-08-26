<template>
  <div class="word-select" @mouseleave="mouseLeave">
    <div class="word-select__container">
      <div
        class="word-select__label"
        @mouseenter="mouseEnter"
        v-text="!selected? label:value.key"
        @click="clickedLabelhandler"
      ></div>
      <transition name="grow-shrink">
        <div class="word-select__options" v-if="modal">
          <div
            class="word-select__option"
            :class="{'word-select__option--selected':val.value.id === selected_item.id}"
            v-for="(val,key) in options"
            :key="key"
            @click="selectHandler(val.value)"
            v-text="val.key"
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    options: {
      type: Object
    },
    value: {
      type: Object
    },
    disabled: Boolean
  },
  data() {
    return {
      selected: false,
      selected_item: {},
      modal: false,
      clicked: false
    };
  },
  mounted() {
    if (this.value) {
      this.selected = true;
      this.selected_item = this.value;
    }
  },
  methods: {
    clickedLabelhandler() {
      if (this.disabled) return;
      if (this.clicked) {
        this.modal = false;
        this.clicked = false;
      } else {
        this.modal = true;
        this.clicked = true;
      }
      // this.clicked = !this.clicked;
    },
    mouseEnter() {
      if (this.disabled) return;
      this.modal = true;
    },
    mouseLeave() {
      if (this.disabled) return;
      this.modal = false;
    },
    selectHandler(value) {
      if (this.disabled) return;
      this.selected_item = value;
      this.$emit("input", value);
    },
    toggleModal() {
      if (this.disabled) return;
      if (this.clicked) {
        // this.modal = true;
      } else {
        this.modal = !this.modal;
      }
    }
  }
};
</script>

<style lang="scss">
.word-select {
  font-size: inherit;
  $self: &;
  &__container {
    position: relative;
    font-size: inherit;
    // min-width: 10rem;
    height: 100%;
    #{$self}__label {
      display: flex;
      align-items: center;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
      padding: 0 1.5rem;
      // width: 100%;
      font-size: inherit;
    }
    #{$self}__options {
      position: absolute;
      top: 100%;
      border-radius: 0.5rem;
      left: 0;
      width: 100%;
      // min-width: 5rem;

      background-color: #fff;
      font-size: inherit;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.12),
        0 3px 6px 0 rgba(0, 0, 0, 0.12);

      // align-items:center;

      #{$self}__option {
        &:hover {
          cursor: pointer;
          color: $secondary;
        }
        &--selected {
          color: $secondary;
        }
        // padding:01rem;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        padding: 0.5rem 1.5rem;
      }
    }
  }
}
</style>

