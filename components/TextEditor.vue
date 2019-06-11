<template>
  <div class="text-editor">
    <button v-if="ruby" class="text-editor__ruby-button" @click.prevent="createRuby">ルビを作る</button>
    <!-- <transition name="text-editor-up">
      <div class="text-editor__title" v-text="placeholder" v-if="!placehold"></div>
    </transition>-->
    <textarea
      :class="{'text-editor__disappear': !placehold}"
      ref="text"
      :placeholder="placehold"
      @focus="contentFocus"
      @blur="contentBlur"
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
    placeholder: String,
    ruby: Boolean
    // text: String
  },
  data() {
    return {
      textArray: [],
      tempText: "",
      realArray: [],
      selectedText: "",
      activeE: "",
      text: "",
      placehold: this.placeholder
    };
  },
  watch: {
    text: function(val) {
      this.changes();
    },
    content: function(val) {
      this.text = val;
    }
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
      return this.text
        .replace(/\s/g, "")
        .replace(/[|]/g, "")
        .replace(/[》]/g, "")
        .replace(/[《]/g, "").length;
    }
  },
  mounted() {
    if (this.content) {
      this.text = this.content;
      this.changes();
    }

    if (this.value) {
    }
  },
  created() {
    console.log(this.text);

    if (this.content) {
      this.text = this.content;
      this.changes();
    }
    // if (this.content) {
    //   this.text = this.content;
    // }
  },
  methods: {
    createRuby() {
      let rubyText = " |ルビをつける字《ルビ》";
      if (!this.activeE || this.activeE.tagName.toUpperCase() !== "TEXTAREA") {
        this.text = this.text + rubyText;
        return;
      }
      let start = this.activeE.selectionStart;
      let end = this.activeE.selectionEnd;
      let rubyK = [];
      this.text.split("").forEach((item, index) => {
        if (end > index && index >= start) {
          rubyK.push(item);
        }
      });

      if (!rubyK.length) {
        this.text = this.text + rubyText;
        return;
      }

      rubyText = ` |${rubyK.join("")}《ルビ》`;

      let selectionStart = this.activeE.selectionStart,
        value = this.$refs.text.value;

      this.text = value.substr(0, start - 1) + rubyText + value.substr(end);
      this.$refs.text.setSelectionRange(start + 1, end);
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
      let temp = [];
      this.textArray.forEach((text, index) => {
        this.textArray[index] = text
          .replace(/[|]/g, "<ruby>")
          .replace(/[》]/g, "</rt></ruby>")
          .replace(/[《]/g, "<rt>");
      });
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
          value.replace(/[|]/, "<ruby>");
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
      this.$emit("input", this.tempText);
    },
    selectEvent(event) {
      this.activeE = event.target;
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
  &__ruby-button {
    height: 30px;
    background-color: #fff;
    border: 1px solid grey;
    font-size: 13px;
    margin-bottom: 5px;
    transition: 200ms;
    padding: 0 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
      background-color: black;
      color: white;
      transition: 200ms;
    }
  }
  &-up {
  }
  &__title {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 16px;
  }
  // &__disappear {
  //   padding-top: 20px !important;
  //   transition: 300ms;
  // }
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
    right: 2px;
    bottom: 2px;
    background-color: #fff;
    padding: 5px;
  }
}
</style>
