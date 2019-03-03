<template>
  <div class="select-component" :style="{width: width+'px'}">
    <div class="object-data"></div>
    <div class="normal-data" v-if="!object">
      <div
        class="select-component__name flex flex--align flex--center"
        @click="openModal"
        v-if="!multiple&&!selectD"
      >{{name}}</div>
      <div
        class="select-component__name flex flex--align flex--center"
        @click="openModal"
        v-if="!multiple&&selectD"
      >{{selectD}}</div>
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
            class="select-component__option select-component__option--name flex flex--align flex--around"
          >{{name}}</div>
          <div
            @click="select(index)"
            class="select-component__option select-component__option flex flex--align flex--around"
            v-for="(item, index) in multiData"
            :key="index"
            v-text="item.name"
            :class="{selected:item.selected}"
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
    transition: String,
    object: Object
  },
  data() {
    return {
      multiData: [],
      selectD: "",
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
    },
    select: function(index) {
      this.multiData.forEach((e, n) => {
        if (n === index) {
          if (e.selected) {
            this.selectD = "";
          } else {
            this.selectD = e.name;
            this.modal = false;
          }
          e.selected = !e.selected;
          this.$emit("input", e.name);
        } else {
          e.selected = false;
        }
      });
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
  user-select: none;
  // width: 100%;
  width: 100px;
  height: 35px;
  position: relative;
  margin: 0 5px;
  z-index: 1000;
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
    box-sizing: border-box;
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
  .selected {
    color: #f4648a;
  }
  &__option {
    font-size: 14px;

    &--name {
      color: #f4648a;
      &:hover {
        cursor: default !important;
        user-select: none;
      }
      &:active {
        background-color: white;
      }
    }
    &:active {
      background-color: rgb(241, 241, 241);
    }
    height: 35px;
    &:hover {
      cursor: pointer;
      user-select: none;
      color: #f4648a;
    }
  }
}
</style>
