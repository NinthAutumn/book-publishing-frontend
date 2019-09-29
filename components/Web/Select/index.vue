<template>
  <div class="main-select">
    <div class="main-select__container">
      <div class="main-select__placeholder" v-text="placeholder|| '選ぶ'" @click.stop="toggleModal"></div>
      <div class="main-select__modal" v-if="modal" v-click-outside="toggleModal">
        <div
          class="main-select__option"
          v-for="(value,key) in options"
          :key="value.key"
          @click.stop="selectHandler(value,key)"
          v-text="value.key"
          :class="{'main-select__option--selected':value.selected}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    options: [Array, Object],
    multiple: Boolean,
    limit: Number,
    value: [String, Array, Object],
    preSelected: [String, Array, Object]
  },
  data() {
    return {
      selected: "",
      modal: false
    };
  },
  watch: {
    preSelected: val => {
      return this.preSelectWatcher(val);
    }
  },
  mounted() {
    if (this.disable) this.preSelectDisabled();
  },
  updated() {
    if (this.disable) this.preSelectDisabled();
  },
  methods: {
    toggleModal: () => (this.modal = !this.modal),
    preSelectDisabled() {
      this.options = this.options.map(item => {
        if (item.key === this.disable.key) item.selected = true;
        return item;
      });
    },
    preSelectWatcher(val) {
      return (this.options = this.options.map(option => {
        val.forEach(item => {
          if (item.key === option.key) {
            option["selected"] = true;
            return option;
          }
        });
        return option;
      }));
    },
    selectHandler(item, key) {
      if (this.multiple) {
        return this.multipleSelectHandler(item, key);
      }
      return this.singleSelectHandler(item);
    },
    multipleSelectHandler(item, key) {
      if (limit && this.value.length > limit) return;
      this.options[key].selected = !this.options[key].selected;
      this.selected.push(this.options[key]);
      return this.$emit("input", this.selected);
    },
    singleSelectHandler(item) {
      this.options = this.options.map(val => {
        if (val.key === item.key) {
          val.selected = true;
          this.$emit("input", val);
        } else {
          val.selected = false;
        }
        return val;
      });
      return (this.modal = !this.modal);
    }
  }
};
</script>

<style lang="scss">
.main-select {
  $self: &;
  &__container {
    #{$self}__placeholder {
      font-size: 1.4rem;
      padding: 0.5rem 2rem;
      border-radius: 0.5rem;
    }
    #{$self}__modal {
      #{$self}__option {
        font-size: 1.4rem;
        padding: 0.5rem 2rem;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
