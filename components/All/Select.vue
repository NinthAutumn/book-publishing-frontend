<template>
  <div class="select-component">
    <div
      class="select-component__name flex flex--align flex--center"
      @click="openModal"
      v-if="!multiple"
    >{{name}}</div>
    <div
      class="select-component__name select-component__name--multiple flex flex--align flex--center"
      @click="openModal"
      v-if="multiple"
    >
      <fa class="select-component__name__icon" icon="filter"></fa>
      {{name}}
    </div>
    <transition class="select-component__modal" :name="transition">
      <div class="select-component__list" v-if="!multiple && modal" v-click-outside="closeModal">
        <div
          class="select-component__option"
          v-for="(item, index) in data"
          :key="index"
          v-text="item"
        ></div>
      </div>

      <div
        class="select-component__list select-component__list--multiple"
        v-if="multiple && modal"
        :style="gridSetting"
        v-click-outside="closeModal"
      >
        <div
          class="select-component__option select-component__option--title flex flex--align flex--center"
        >{{name}}</div>
        <div
          class="select-component__option flex flex--align flex--around"
          :class="{selected: item.selected}"
          v-for="(item, index) in multiData"
          :key="index"
          v-text="item.name"
          @click="selected(index)"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    multiple: Boolean,
    data: Array,
    name: String,
    column: Number,
    width: Number,
    transition: String
  },
  data() {
    return {
      multiData: [],
      selectedData: [],
      modal: false,
      gridSetting: {
        "grid-template-columns": `repeat(${this.column || 3}, 1fr)`,
        width: `${this.width || 350}px`
      }
    };
  },
  methods: {
    selected: function(index) {
      this.multiData.forEach((item, n) => {
        if (n === index) {
          item.selected = !item.selected;
          if (item.selected) {
            this.selectedData.push(item.name);
          } else {
            this.selectedData = this.selectedData.filter(
              element => element !== item.name
            );
          }
        }
      });
      this.$emit("input", this.selectedData);
    },
    openModal: function() {
      this.modal = true;
    },
    closeModal: function() {
      this.modal = false;
    }
  },
  created() {
    this.data.map(item => {
      this.multiData.push({ name: item, selected: false });
    });
  }
};
</script>

<style lang="scss">
.select-component {
  $self: &;
  // width: 100px;
  width: 100px;
  height: 35px;
  position: relative;

  &__name {
    color: grey;
    font-size: 14px;
    width: 100px;
    height: 30px;
    &--multiple {
      width: 120px;
    }
    &__icon {
      margin-right: 5px;
      font-size: 14px;
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(248, 248, 248);
    }
    box-shadow: 1px 1px 5px rgb(238, 238, 238);
  }
  &__list {
    background-color: #fff;
    box-shadow: 1px 1px 5px 0px rgb(235, 235, 235);
    padding: 5px;
    width: 100%;
    position: absolute;
    top: 0;
    // left: 105px;
    &--multiple {
      // height: 500px;
      grid-gap: 2px;
      // width: 200px;
      #{$self}__modal {
      }
      display: grid;
      // grid-auto-rows: 30px;
      #{$self}__option {
        width: 100%;
        height: 35px;
        &--title {
          grid-column: span 3;
          color: #f4648a;
          &:hover {
            cursor: default;
            user-select: none;
          }
          &:active {
            background-color: white;
          }
        }
        // width: 100%;
        // height: 100%;
        background-color: #fff;
        transition: 200ms;
      }

      .selected {
        // background-color: $primary;
        color: #f4648a;
        transition: 200ms;
      }
    }
  }
  &__option {
    font-size: 14px;
    &:active {
      background-color: rgb(241, 241, 241);
    }
    &:hover {
      cursor: pointer;
      color: #f4648a;
    }
  }
}
</style>
