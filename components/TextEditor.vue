<template>
  <div class="text-editor">
    <textarea
      placeholder="本文"
      @blur="changes"
      @keydown="changes"
      @keypress="changes"
      @mouseleave="changes"
      v-model="text"
      @select="selectEvent"
    ></textarea>
    <!-- <p v-text="tempText"></p> -->
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      text: "",
      textArray: [],
      tempText: "",
      realArray: [],
      selectedText: ""
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
    }
  },
  methods: {
    bold() {
      this.selectedText = window.getSelection().toString();

      console.log(this.tempText);
    },
    changes() {
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
  textarea {
    border: 2px solid $review-color;
    height: 300px;
    width: 100%;
    resize: none;
    overflow: scroll;
    font-size: 16px;
    line-height: 20px;
    padding: 5px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      -ms-outline: none;
    }
  }
}
</style>
