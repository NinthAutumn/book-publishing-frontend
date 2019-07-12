<template>
  <div class="modular-select" v-cloak>
    <div class="modular-select__container">
      <button class="modular-select__button">{{selected_option.key||placeholder}}</button>
    </div>
    <div
      class="modular-select__modal"
      :class="{'modular-select__modal--list': !grid, 'modular-select__modal--grid':grid}"
    >
      <ul class="modular-select__list">
        <div class="modular-select__search" v-show="search">
          <input type="text" v-model="query" />
        </div>
        <li
          class="modular-select__item"
          v-for="(value) in options"
          :key="value"
          :class="{'modular-select__item--selected': value.selected}"
          @click="selectItem(value)"
        >{{value.key}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: [Array, Object],
    value: [Array, String, Object],
    multiple: Boolean,
    search: Boolean,
    placeholder: String,
    grid: Boolean,
    disabled: Boolean,
    disable: [Array, String, Object],
    transition: String
  },
  data() {
    return {
      options: {},
      query: "",
      selected_options: [],
      selected_option: {}
    };
  },
  methods: {
    selectItem(value) {
      if (multiple) {
        this.options[value.value].selected = !this.options[value.value]
          .selected;
        if (this.options[value.value].selected) {
          selected_options.push(value.value);
        } else {
          this.selected_options = this.selected_options.filter(val => {
            return val !== value.value;
          });
        }
        this.$emit("value", this.selected_options);
      } else {
        for (let val in this.options) {
          if (val.key === value.key) {
            val.selected = !val.selected;
          } else {
            val.selected = false;
          }
        }
        this.selected_option = value;
        this.$emit("value", value.value);
      }
    }
  },
  created() {
    if (Array.isArray(this.list)) {
      for (let item in this.list) {
        if (typeof item === "object") {
          this.options[item.value] = {
            selected: false,
            value: item.value,
            key: item.key,
            disable: false
          };
        } else {
          this.options[item] = {
            selected: false,
            value: item,
            key: item,
            disable: false
          };
        }
      }
    } else {
      this.options = this.list;
    }
    if (this.value) {
      if (typeof this.value === "string") {
        this.options[this.value].selected = true;
        if (!this.multiple) {
          this.selected_options = this.options[this.value];
        }
      } else if (Array.isArray(this.value)) {
        this.value.forEach(val => {
          if (typeof val === "string") {
            this.options[val].selected = true;
          } else {
            this.options[val.value].selected = true;
          }
        });
      } else {
        if (this.value.key) {
          this.options[this.value.value].selected = true;
          if (!this.multiple) {
            this.selected_options = this.value;
          }
        } else {
          for (let val in this.value) {
            this.options[val.value].selected = true;
          }
        }
      }
    }
    if (this.disable) {
      if (typeof this.disable === "string") {
        this.options[this.disable].disable = true;
      } else if (Array.isArray(this.value)) {
        this.disable.forEach(val => {
          if (typeof val === "string") {
            this.options[val].disable = true;
          } else {
            this.options[val.value].disable = true;
          }
        });
      } else {
        if (this.disable.value) {
          this.options[this.disable.value].disable = true;
        } else {
          for (let val in this.disable) {
            this.options[val.value].disable = true;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.modular-select {
  $self: &;
  // &
}
</style>

