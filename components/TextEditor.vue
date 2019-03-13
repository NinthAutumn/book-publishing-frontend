<template>
  <div class="text-editor">
    <transition name="text-editor-up">
      <div class="text-editor__title" v-text="placeholder" v-if="!placehold"></div>
    </transition>

    <textarea
      :class="{'text-editor__disappear': !placehold}"
      :placeholder="placehold"
      @focus="contentFocus"
      @blur="contentBlur"
      @keydown="changes"
      @keypress="changes"
      @keyup="changes"
      @mouseleave="changes"
      v-model="text"
      @select="selectEvent"
    ></textarea>
    <p class="text-editor__count" v-text="textLength"></p>
    <!-- <div v-html="tempText"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    content: String,
    placeholder: String
  },
  data() {
    return {
      text: "",
      textArray: [],
      tempText: "",
      realArray: [],
      selectedText: "",
      placehold: this.placeholder
    };
  },
  computed: {
    propModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      }
    },
    textLength() {
      return this.text.replace(/\s/g, "").length;
    }
  },
  created() {
    if (this.content) {
      this.text = this.content;
      this.text = this.text.replace(/(<([^>]+)>)/gi, "");
      this.textArray = this.text.split(/\n/);
      let br = 0;
      this.realArray = this.textArray
        .filter((value, index) => {
          if (value) {
            br = 0;
            return true;
          } else if (br > 0) {
            return false;
          } else {
            br++;
            return true;
          }
        })
        // .filter(value => value)
        .map((value, index) => {
          // console.log(value );
          if (value) {
            br = 0;
            return `<p>${value}</p>`;
          } else if (index === this.textArray.length - 1) {
            return "";
          } else {
            return `<p><br></p>`;
          }

          // value + "dog";
        });
      this.tempText = this.realArray.join("");
      // console.log(this.tempText);
      this.$emit("input", this.tempText);
    }
  },
  methods: {
    bold() {
      this.selectedText = window.getSelection().toString();

      console.log(this.tempText);
    },
    contentFocus() {
      this.placehold = "";
    },
    contentBlur() {
      this.placehold = this.placeholder;
    },
    changes() {
      this.text = this.text.replace(/(<([^>]+)>)/gi, "");
      this.textArray = this.text.split(/\n/);
      let br = 0;
      this.realArray = this.textArray
        .filter((value, index) => {
          if (value) {
            br = 0;
            return true;
          } else if (br > 0) {
            return false;
          } else {
            br++;
            return true;
          }
        })
        // .filter(value => value)
        .map((value, index) => {
          // console.log(value );
          if (value) {
            br = 0;
            return `<p>${value}</p>`;
          } else if (index === this.textArray.length - 1) {
            return "";
          } else {
            return `<p><br></p>`;
          }

          // value + "dog";
        });
      this.tempText = this.realArray.join("");
      // console.log(this.tempText);
      this.$emit("input", this.tempText);
    },
    enter() {
      this.text = this.text.replace(/(<([^>]+)>)/gi, "");
      this.textArray = this.text.split(/\n/);
      this.realArray = this.textArray
        // .filter(value => value)
        .map((value, index) => {
          // console.log(value );
          if (value) {
            return `<p>${value}</p>`;
          } else if (index === this.textArray.length - 1) {
            return "";
          } else {
            return `<p><br></p>`;
          }

          // value + "dog";
        });
      this.tempText = this.realArray.join("");
      // console.log(this.tempText);
      this.$emit("input", this.tempText);
    },
    selectEvent() {
      console.log(this.tempText);
    }
  }
};
</script>

<style lang="scss">
.text-editor {
  // font-size: inherit;
  height: 100%;
  width: 100%;
  position: relative;
  &__title {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 16px;
  }
  &__disappear {
    padding-top: 20px !important;
    transition: 300ms;
  }
  textarea {
    transition: 300ms;
    border: 2px solid $review-color;
    height: 300px;
    width: 100%;
    resize: none;
    overflow: scroll;
    font-size: 16px;
    line-height: 20px;
    padding: 10px;
    padding-bottom: 20px !important;
    box-sizing: border-box;
    &:focus {
      outline: none;
      -ms-outline: none;
    }
  }
  &__count {
    font-size: 16px;
    position: absolute;
    // right: 10px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 5px;
  }
}
</style>
