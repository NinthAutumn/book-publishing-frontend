<template>
  <div class="text-editor">
    <div class="text-editor__nav" v-if="ruby">
      <button
        v-if="ruby"
        class="text-editor__button text-editor__button--ruby text-editor__ruby-button"
        @click.prevent="createRuby"
      >ルビを振る</button>
      <button @click.prevent="drawing_modal=true" class="text-editor__button">画像を挟む</button>
    </div>
    <textarea
      :class="{'text-editor__disappear': !placehold, 'text-editor__textarea--nav': ruby}"
      class="text-editor__textarea"
      ref="text"
      :placeholder="placehold"
      v-model="text"
      @select="selectEvent"
    ></textarea>
    <p class="text-editor__count" v-text="textLength"></p>
    <drawing-modal
      @select="insertImage"
      v-model="insertDrawings"
      editor
      :multiple="false"
      v-if="drawing_modal"
      @close="toggleDrawingModal"
    ></drawing-modal>
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
      placehold: this.placeholder,
      drawing_modal: false,
      insertDrawings: {}
    };
  },
  watch: {
    text: function(val) {
      this.changes();
    },
    content: function(val) {
      if (val) {
        this.text = val;
      }
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
        .replace(/[《]/g, "")
        .replace(/\[(.*?)\]/g, ``).length;
    }
  },
  mounted() {
    if (this.content) {
      this.text = this.content;
      // this.changes();
    }
  },
  components: {
    DrawingModal: () => import("@/components/Web/Modals/Chapter/Drawing")
  },
  methods: {
    toggleDrawingModal() {
      // this.$refs.text.focus();

      this.drawing_modal = !this.drawing_modal;
    },
    insertImage() {
      this.drawing_modal = !this.drawing_modal;
      this.$refs.text.focus();
      console.log("safadsfdsaf");
      // console.log(thiinsertDrawings);
      // console.log(Object.keys());
      Object.keys(this.insertDrawings).forEach((val, index) => {
        console.log(this.insertDrawings[val]);
        if (
          !this.activeE ||
          this.activeE.tagName.toUpperCase() !== "TEXTAREA"
        ) {
          this.text = this.text + "\n\n" + `[${this.insertDrawings[val].url}]`;
        } else {
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

          // rubyText = `${rubyK.join("")}《ルビ》`;

          let selectionStart = this.activeE.selectionStart,
            value = this.$refs.text.value;

          this.text =
            value.substr(0, start - 1) +
            "\n\n" +
            `[${this.insertDrawings[val].url}]` +
            "\n\n" +
            value.substr(end);
        }
      });
      // this.insertDrawings.forEach(() => {});
    },
    createRuby() {
      this.$refs.text.focus();
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

      setTimeout(() => {
        if (start === 0) {
          this.$refs.text.setSelectionRange(start + 2, end + 2);
        } else {
          this.$refs.text.setSelectionRange(start + 1, end + 1);
        }
      }, 0);

      // console.log(start);
      // this.$refs.text.selectionStart = start + 1;
      // this.$refs.text.selectionEnd = end;
    },
    contentFocus() {
      this.placehold = "";
    },
    contentBlur() {
      this.placehold = this.placeholder;
    },
    changes() {
      this.text = this.text.replace();
      this.text = this.text
        .replace(/<rp>\(<\/rp>/, "")
        .replace(/<ruby>/gi, "|")
        .replace(/<rp>\)<\/rp>/, "")
        .replace(/<\/rt><\/ruby>/gi, "》")
        .replace(/<rt>/gi, "《")
        .replace(/(<\/[^>]+>)/gi, "\n")
        .replace(/(<br>)/gi, "\n")
        .replace(/(<([^>]+)>)/gi, "");

      this.textArray = this.text.split(/\n/);
      let temp = [];
      this.textArray.forEach((text, index) => {
        this.textArray[index] = text
          .replace(/[|]/g, "<ruby>")
          .replace(/[》]/g, "</rt></ruby>")
          .replace(/[《]/g, "<rt>")
          .replace(/\[/g, `<img src="`)
          .replace(/\]/g, `" >`);
        // this.textArray[index] = text
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
        .map((value, index) => {
          // value.replace(/[|]/, "<ruby>");
          if (value) {
            br = 0;
            return `<p>${value}</p>`;
          } else if (index === this.textArray.length - 1) {
            return "";
          } else {
            return `<br>`;
          }

          // value + "dog";
        });
      this.tempText = this.realArray.join("");
      this.$emit("input", this.tempText);
      this.$emit("wordCount", this.textLength);
    },
    selectEvent(event) {
      this.activeE = event.target;

      console.log();
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
  // border-top: 1px solid grey;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  &__nav {
    border-bottom: 1px solid #b8b8b8;
    position: sticky;
    top: 100px;
    background-color: #fff;
  }
  &__button {
    height: 30px;
    background-color: #fff;
    // border: 1px solid grey;

    font-size: 13px;
    // margin-bottom: 5px;
    transition: 200ms;
    padding: 0 10px;
    // position: absolute;
    // top: 0;
    // left: 0;
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
    &--ruby {
      border-top-left-radius: 0.4rem;
    }
  }
  &__ruby-button {
  }
  &__title {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 16px;
  }

  textarea {
    transition: 300ms;
    // border: 2px solid $review-color;
    height: 300px;
    width: 100%;
    resize: none;
    overflow: auto;
    font-size: 16px;
    line-height: 20px;
    padding: 10px;
    // padding-top: 5rem;
    padding-bottom: 20px !important;
    box-sizing: border-box;
    &:focus {
      outline: none;
      -ms-outline: none;
    }
  }
  &__textarea {
    &--nav {
      // padding-top: 5rem !important;
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
