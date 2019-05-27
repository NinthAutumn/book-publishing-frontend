<template>
  <div
    class="select-component"
    :style="{width: width+'px',height: height+'px','font-size': fontSize + 'px'}"
  >
    <div class="normal-data" :class="theme">
      <div
        :style="{width: width+'px',height: height+'px','font-size': fontSize + 'px'}"
        class="select-component__name flex flex--align flex--center"
        @click.stop="openModal"
        v-if="!multiple&&!selectD&&!def"
      >
        <fa v-if="icon" class="select-component__icon" :icon="icon"></fa>
        {{name}}
      </div>
      <div
        :style="{width: width+'px',height: height+'px','font-size': fontSize + 'px'}"
        class="select-component__name flex flex--align flex--center"
        @click.stop="openModal"
        v-if="!multiple&&def&&!selectD"
      >
        <fa v-if="icon" class="select-component__icon" :icon="icon"></fa>
        {{def}}
      </div>
      <div
        :style="{width: width+'px',height: height+'px','font-size': fontSize + 'px'}"
        class="select-component__name flex flex--align flex--center"
        @click.stop="openModal"
        v-if="!multiple&&selectD"
      >
        <fa v-if="icon" class="select-component__icon" :icon="icon"></fa>
        {{selectD}}
      </div>
      <div
        class="select-component__name select-component__name--multiple flex flex--align flex--center"
        @click.stop="openModal"
        v-if="multiple"
      >
        <fa class="select-component__name__icon" :icon="icon"></fa>
        {{name}}
      </div>
      <transition
        class="select-component__modal"
        :name="transition"
        :style="{width: width+'px','font-size': fontSize + 'px'}"
      >
        <div
          :style="{width: width+'px',height: mheight+'px','font-size': fontSize + 'px'}"
          class="select-component__list"
          v-if="!multiple && modal"
          v-click-outside="closeModal"
        >
          <div
            :style="{'font-size': fontSize + 'px'}"
            class="select-component__option select-component__option--name flex flex--align flex--around"
          >{{name}}</div>
          <div
            @click="select(index)"
            class="select-component__option select-component__option flex flex--align flex--around"
            v-for="(item, index) in multiData"
            :key="index"
            :style="{'font-size': fontSize + 'px'}"
            v-text="item.key"
            :class="{selected:item.selected}"
          ></div>
        </div>

        <div
          class="select-component__list select-component__list--multiple"
          :class="{modalDR: modalD === 'right',modalDL: modalD !== 'right',top: top, bottom: bottom}"
          v-if="multiple && modal&&genre"
          :style="gridSetting"
          v-click-outside="closeModal"
        >
          <div class="select-component__refresh" @click="reset">
            <fa icon="sync-alt"></fa>
          </div>
          <div
            class="select-component__option select-component__option--title flex flex--align flex--center"
          >{{name}}</div>
          <div
            class="select-component__option flex flex--align flex--around"
            :class="{selected: item.selected, disable: item.key === disable.name}"
            v-for="(item, index) in multiData"
            :key="index"
            v-text="item.key"
            @click="selected(index,item.key === disable.name )"
          ></div>
        </div>
        <div
          class="select-component__list select-component__list--multiple"
          :class="{modalDR: modalD === 'right',modalDL: modalD !== 'right',top: top, bottom: bottom}"
          v-if="multiple && modal&&!genre"
          :style="gridSetting"
          v-click-outside="closeModal"
        >
          <div class="select-component__refresh" @click="reset">
            <fa icon="sync-alt"></fa>
          </div>
          <div
            class="select-component__option select-component__option--title flex flex--align flex--center"
          >{{name}}</div>
          <div
            class="select-component__option flex flex--align flex--around"
            :class="{selected: item.selected}"
            v-for="(item, index) in multiData"
            :key="index"
            v-text="item.key"
            @click="selected(index)"
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    latestData: Array,
    multiple: Boolean,
    data: Array,
    name: String,
    column: Number,
    width: Number,
    height: Number,
    mheight: Number,
    transition: String,
    object: Array,
    def: String,
    modalD: String,
    icon: String,
    top: Boolean,
    bottom: Boolean,
    fontSize: Number,
    theme: String,
    selected_item: String,
    limit: Number,
    backgroundColor: String,
    color: String,
    value: [Object, String, Array, Number],
    volume: Boolean,
    disable: [Array, String, Object],
    disabled: Boolean,
    disableMessage: String,
    genre: Boolean
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
  computed: {
    ...mapGetters({
      genres: "book/getGenres"
    })
  },
  watch: {
    latestData: function(val) {
      console.log("in here");
      console.log(this.latestData);
      for (let store of this.latestData) {
        for (let val of this.multiData) {
          if (store === val) {
            val.selected = !val.selected;
          }
        }
      }
    }
  },
  methods: {
    selected: function(index, disable) {
      if (disable) {
        return;
      }
      if (this.genre) {
        this.multiData.forEach((item, n) => {
          if (n === index) {
            item.selected = !item.selected;
            if (item.selected) {
              this.selectedData.push({ name: item.key, id: item.value });
            } else {
              this.selectedData = this.selectedData.filter(
                element => element !== item.key
              );
            }
          }
        });
      } else {
        this.multiData.forEach((item, n) => {
          if (n === index) {
            item.selected = !item.selected;
            if (item.selected) {
              this.selectedData.push(item.key);
            } else {
              this.selectedData = this.selectedData.filter(
                element => element !== item.key
              );
            }
          }
        });
      }

      if (this.selectedData.length > this.limit) {
        this.$toast.show(`これ以上選べません`, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });
        this.selectedData.pop();
        this.multiData.forEach((item, n) => {
          if (n === index) {
            item.selected = !item.selected;
            if (item.selected) {
              this.selectedData.push();
            } else {
              this.selectedData = this.selectedData.filter(
                element => element !== item.key
              );
            }
          }
        });
      }
      this.$emit("input", this.selectedData);
    },
    openModal: function() {
      if (this.disabled) {
        this.$toast.show(this.disableMessage, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000,
          icon: "extension"
        });
      } else {
        this.modal = true;
      }
    },
    closeModal: function() {
      this.modal = false;
    },
    reset: function() {
      this.mutliData = this.multiData.forEach(element => {
        element.selected = false;
      });
      this.selectedData = [];
      this.$emit("input", []);
    },
    select: function(index) {
      if (this.object) {
        this.multiData.forEach((e, n) => {
          if (n === index) {
            if (e.selected) {
              this.selectD = "";
            } else {
              this.selectD = e.key;
              this.modal = false;
            }
            e.selected = !e.selected;
            this.$emit("input", e.value);
          } else {
            e.selected = false;
          }
        });
      } else {
        this.multiData.forEach((e, n) => {
          if (n === index) {
            if (e.selected) {
              this.selectD = "";
            } else {
              this.selectD = e.key;
              this.modal = false;
            }
            e.selected = !e.selected;
            this.$emit("input", e.key);
          } else {
            e.selected = false;
          }
        });
      }
    }
  },
  created() {
    if (this.genre) {
      this.genres.forEach(genre => {
        this.multiData.push({
          key: genre.name,
          value: genre.id,
          selected: false
        });
      });
    } else if (!this.object) {
      this.data.forEach(item => {
        this.multiData.push({ key: item, selected: false });
      });
    } else {
      this.object.forEach(item => {
        let disable = false;

        this.multiData.push({
          key: item.key,
          value: item.value,
          selected: false,
          disable
        });
      });
    }
  },
  mounted() {
    if (this.data && this.value) {
      for (let store of this.value) {
        for (let val of this.multiData) {
          if (store === val) {
            val.selected = !val.selected;
          }
        }
      }
    } else if (this.value && this.volume) {
      this.multiData.forEach((e, n) => {
        if (e.value.id === this.value.id) {
          if (e.selected) {
            this.selectD = "";
          } else {
            this.selectD = e.key;
            // this.modal = false;
          }
          e.selected = !e.selected;
          // this.$emit("input", e.value);
        }
      });
    } else if (this.value) {
      if (this.object) {
        this.multiData.forEach((e, n) => {
          if (e.value === this.value) {
            this.selectD = e.key;

            e.selected = !e.selected;
            // this.$emit("input", e.value);
          }
        });
      } else {
        this.multiData.forEach((e, n) => {
          if (e === this.value) {
            this.selectD = e.key;

            e.selected = !e.selected;
          }
        });
      }
    }
    if (
      this.selected_item &&
      this.selected_item !== "undefined" &&
      this.selected_item !== undefined
    ) {
      this.multiData.forEach((item, index) => {
        if (item.key === this.selected_item) {
          this.multiData[index].selected = true;
          item.selected = true;
          this.selectedData.push(this.selected_item);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.modalDR {
  right: 0px !important;
}
.modalDL {
  left: 0px;
}

.select-component {
  $self: &;
  border-radius: 0.4rem;
  user-select: none;
  // width: 100%;
  // width: 100%;
  height: 35px;
  position: relative;
  margin: 0 5px;
  // z-index: 1;
  color: black;
  &__icon {
    margin-right: 5px;
  }
  &__name {
    background-color: #fff;
    color: grey;
    font-size: 14px;
    width: 100px;
    height: 30px;
    border-radius: 0.4rem;
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
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
  }
  .top {
    top: -400px;
  }
  &__list {
    border-radius: 0.4rem;
    z-index: 10000;
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    padding: 5px;
    width: 100%;
    top: -30px;
    overflow: auto;
    position: absolute;
    box-sizing: border-box;
    #{$self}__refresh {
      position: absolute;
      top: 10px;
      right: 15px;
      z-index: 100000;
      font-size: 14px;
      color: #8fb0ff;
      transition: 300ms;
      &:hover {
        cursor: pointer;
        transform: rotate(180deg);
        transition: 300ms;
      }
    }

    &--multiple {
      // height: 500px;
      top: 0;
      /* autoprefixer: ignore next */
      grid-gap: 2px;

      // width: 200px;
      #{$self}__modal {
      }
      display: grid;
      // grid-auto-rows: 30px;
      #{$self}__option {
        z-index: 10000;
        width: 100%;
        height: 35px;
        &--title {
          grid-column: span 3;
          color: #f4648a;
          background-color: white;
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
  .disable {
    color: #f4648a;
  }
  &__option {
    border-radius: 0.4rem;
    font-size: 14px;
    z-index: 10000;
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
