
<template>
  <div class="chapter-form">
    <form action class="flex flex-column chapter-new" @submit.prevent="createChapter">
      <!-- <h3></h3> -->
      <!-- <fa icon="plus"></fa> -->
      <el-steps :active="progress">
        <el-step title="ステップ１" icon="el-icon-upload"></el-step>
        <el-step title="ステップ２" icon=" el-icon-edit"></el-step>
        <el-step title="ステップ３" icon="el-icon-picture"></el-step>
      </el-steps>
      <div class="chapter-form__navigation flex flex--between" style="margin-top:10px;">
        <div
          class="divider chapter-form__navigation__button chapter-form__navigation__button--back"
        >
          <div @click="back" class="flex flex--align" v-if="progress > 1">
            <fa
              class="chapter-form__navigation__item chapter-form__navigation__item--icon"
              style
              icon="chevron-left"
            ></fa>
            <p
              class="chapter-form__navigation__item chapter-form__navigation__item--text"
              style="margin-left:2px;"
            >戻ろ</p>
          </div>
        </div>
        <div
          class="divider chapter-form__navigation__button chapter-form__navigation__button--front"
        >
          <div @click="front" class="flex flex--align" v-if="progress < 3">
            <p
              class="chapter-form__navigation__item chapter-form__navigation__item--text"
              style="margin-right:2px;"
            >進む</p>
            <fa
              class="chapter-form__navigation__item chapter-form__navigation__item--icon"
              style
              icon="chevron-right"
            ></fa>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="chapter-form__announcement" v-if="progress === 1">
          <div class="form-control flex-column">
            <transition name="placeholder-up">
              <div class="label-animation" for="header" v-if="!upPlaceHolder">上書き</div>
            </transition>
            <textarea
              maxlength="280"
              @focus="textAreaFocus(true)"
              @blur="textAreaBlur(true)"
              :placeholder="upPlaceHolder"
              name="header"
              v-model="form.extra.announcement.header"
              id
              rows="5"
            ></textarea>
          </div>
          <div class="form-control flex-column">
            <transition name="placeholder-up">
              <div class="label-animation" for="footer" v-if="!downPlaceHolder">下書き</div>
            </transition>
            <textarea
              maxlength="280"
              @focus="textAreaFocus(false)"
              @blur="textAreaBlur(false)"
              :placeholder="downPlaceHolder"
              name="footer"
              v-model="form.extra.announcement.footer"
              id
              rows="5"
            ></textarea>
          </div>
          <div class="form-control flex flex--align">
            <label for="locked" style="margin-right:10px;">有料</label>
            <el-switch v-model="form.locked"></el-switch>
          </div>
          <div class="form-control flex flex--align">
            <label for="schedule" style="margin-right:10px;">投稿する時間を指定する</label>
            <el-switch v-model="schedule"></el-switch>
          </div>
          <transition name="grow-shrink">
            <div class="form-control" v-if="schedule">
              <date-picker
                type="datetime"
                format="DD/MM/YYYY HH:mm"
                :not-before="$moment()"
                :minute-step="1"
                :lang="lang"
                v-model="form.date"
              ></date-picker>
              <!-- <input type="time" name id> -->
            </div>
          </transition>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="chapter-form__content-subject" v-if="progress === 2">
          <div class="form-control">
            <input
              placeholder="タイトル"
              type="text"
              class="chapter-title form-input"
              v-model="form.title"
            >
          </div>
          <div class="form-control">
            <!-- <TextEditor
              class="chapter-content-new"
              :editorToolbar="customToolbar"
              v-model="form.content"
              placeholder="本文"
            ></TextEditor>
            -->
            <froala class="chapter-content-new" :config="config" v-model="form.content">Init text</froala>
            <!-- <div v-text="form.wordCount"></div> -->
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="chapter-form__extra" v-if="progress === 3">
          <el-upload
            class="upload-demo"
            action
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="successPhoto"
            list-type="picture"
            :limit="3"
            :on-exceed="handleExceed"
            accept="image/*"
          >
            <el-button size="small" type="primary">絵など写真の投稿</el-button>
            <div slot="tip" class="el-upload__tip">jpeg などイメージフォーマットでお願いします</div>
          </el-upload>
        </div>
      </transition>
      <div class="chapter-form__navigation flex flex--between">
        <div
          class="divider chapter-form__navigation__button chapter-form__navigation__button--back"
        >
          <div @click="back" class="flex flex--align" v-if="progress > 1">
            <fa
              class="chapter-form__navigation__item chapter-form__navigation__item--icon"
              style
              icon="chevron-left"
            ></fa>
            <p
              class="chapter-form__navigation__item chapter-form__navigation__item--text"
              style="margin-left:2px;"
            >戻る</p>
          </div>
        </div>
        <div
          class="divider chapter-form__navigation__button chapter-form__navigation__button--front"
        >
          <div @click="front" class="flex flex--align" v-if="progress < 3">
            <p
              class="chapter-form__navigation__item chapter-form__navigation__item--text"
              style="margin-right:2px;"
            >進む</p>
            <fa
              class="chapter-form__navigation__item chapter-form__navigation__item--icon"
              style
              icon="chevron-right"
            ></fa>
          </div>
        </div>
      </div>

      <div class="flex flex--right" v-if="progress === 3">
        <input
          type="submit"
          class="form-submit form-submit--primary chapter-new-submit"
          value="話を投稿する"
        >
      </div>
    </form>
  </div>
</template>

<script>
import TextEditor from "@/components/TextEditor";
export default {
  components: {
    TextEditor
  },
  data() {
    return {
      upPlaceHolder: "上書き",
      downPlaceHolder: "下書き",
      progress: 1,
      fileList: [],
      schedule: false,
      form: {
        title: "",
        content: "",
        date: "",
        wordCount: 0,
        locked: false,
        extra: {
          announcement: {
            header: "",
            footer: ""
          },
          drawings: []
        }
      },
      config: {
        placeholderText: "本文!",
        charCounterCount: true,
        events: {
          "froalaEditor.initialized": function() {
            // console.log();
            // this.wordCount = $(".selector").froalaEditor("charCounter.count");
          }
        },
        toolbarButtons: [
          "bold",
          "italic",
          "underline",
          "quote",
          "specialCharacters"
        ],
        height: 300,
        quickInsertButtons: ["hr", "table"],
        fontSize: ["16"],
        language: "jp",
        // theme: "dark",
        fontSizeDefaultSelection: "16",
        shortcutsEnabled: ["bold", "italic", "undo", "redo"]
      },
      lang: {
        days: ["日", "月", "火", "水", "木", "金", "土"],
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "日にちを選ぶ",
          dateRange: "Select Date Range"
        }
      }
    };
  },
  methods: {
    textAreaFocus(up) {
      if (up) {
        this.upPlaceHolder = "";
      } else {
        this.downPlaceHolder = "";
      }
    },
    textAreaBlur(up) {
      if (up) {
        this.upPlaceHolder = "上書き";
      } else {
        this.downPlaceHolder = "下書き";
      }
    },
    front() {
      this.progress++;
      const counter = document.querySelector(".fr-counter");
      if (counter) {
        this.form.wordCount = counter.innerText;
      }
    },
    back() {
      this.progress--;
      // const counter = document.querySelector(".fr-counter");
      // if (counter) {
      //   this.wordCount = counter.innerText;
      // }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    successPhoto(res, file) {
      this.form.extra.drawings.push(file.raw);
    },
    async createChapter() {
      if (this.form.extra.drawings) {
        this.form.extra.drawings.forEach(async image => {
          await this.$store.dispatch("upload/multiImage", image);
        });
      }
      const counter = document.querySelector(".fr-counter");
      console.log(counter);
      const chapter = {
        title: this.form.title,
        content: this.form.content,
        date: "",
        wordCount: this.form.wordCount,
        locked: this.form.locked,
        extra: {
          announcement: {
            header: this.form.extra.announcement.header,
            footer: this.form.extra.announcement.footer
          },
          drawings: this.$store.state.upload.urls
        }
      };
      console.log(chapter);
      // await this.$store.dispatch();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    }
    // move(e){
    //   if(e === )
    // }
  }
};
</script>

<style lang="scss">
.fr-wrapper {
  font-size: 16px !important;
  color: #444444;
}
.fr-box {
  font-family: inherit;
  font-size: 16px !important;
  color: #444444;
}
.fr-view {
  font-family: inherit;
  font-size: 16px !important;
  color: #444444;
  p {
  }
  * {
    font-size: 16px !important;
    line-height: 20px;
    color: rgb(179, 179, 179);
  }
}
.el-button--mini,
.el-button--small span {
  font-size: 13px;
}
.chapter-new-submit {
  margin-bottom: 10px;
}
.ql-editor {
  padding: 0 15px !important;
}
.ql-editor.ql-blank:before {
  font-style: none;
}
.ql-snow * {
  font-size: 16px;
}
.fr-box.fr-basic .fr-element {
  p {
    // font-size: 16px;
  }
}
.el-step__line {
  font-size: 16px !important;
}
.el-step__icon-inner {
  font-size: 20px !important;
}
.quillWrapper .ql-snow.ql-toolbar {
  // padding: 0 15px !important;
  padding-top: 5px !important;
  padding-bottom: 0px !important;
}
.ql-toolbar.ql-snow {
  border: 1px solid $review-color !important;
  border-bottom: 0 !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
  // box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
  p {
    font-size: 16px;
  }
}
.ql-editor.ql-blank:before {
  font-style: normal !important;
}
.ql-container.ql-snow {
  border: 1px solid $review-color !important;
  border-top: 0 !important;
  // border-radius: 10px;

  p {
    font-size: 16px;
    font-family: $text-font-stack;
    font-weight: 400;
  }

  background-color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #979797;
  //
}
.chapter-form {
  transition: 300ms;
  .el-step__title {
    font-size: 14px;
    line-height: 1;
  }
  &__navigation {
    &__button {
      height: 30px;
      // width: 70px;

      transition: 300ms;
      &:hover {
        transform: scale(1.2);
        transition: 300ms;
      }
      &--back {
        display: flex;
        align-items: center;
        color: $secondary;
        // font-si
      }
      &--front {
        display: flex;
        align-items: center;
        color: $primary;
        // justify-content: flex-end;
      }
      // justify-content: space-around;
    }
    &:hover {
      cursor: pointer;
    }
    &__item {
      line-height: 0;
      font-size: 16px;
      // &--icon {
      //   &:hover {
      //     transform: translateX(100px);
      //   }
      // }
      // display: flex;
      // align-items: center;
    }
  }
  &__extra {
    margin: 10px 0;
  }
  .chapter-new {
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    padding: 10px 40px !important;
    margin-top: 10px;
    background-color: white;
  }
  label {
    font-size: 16px;
    // transition: 300ms;
    // top: -25px;
    // position: absolute;
  }
  .label-animation {
    font-size: 16px;
    // transition: 300ms;
    top: -25px;
    position: absolute;
  }
  .form-control {
    position: relative;
    margin-top: 10px;
  }
  .draft-checkbox {
    // height: 50px;
    font-size: 16px;
  }
  textarea {
    resize: none;
    font-size: 16px;
    padding: 10px;
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    margin-bottom: 25px;
    color: #a3a3a3;
    border: 0px solid $review-color !important;
    border-radius: 5px;
    line-height: 20px;
    transition: 300ms;

    &:focus {
      outline: none;
      // transform: translateY(10px);
      // transition: 300ms;
    }
  }
  .chapter-title {
    height: 50px;
    font-size: 20px;
    width: 100%;
    border: none;
    padding: 12px 12px !important;
    border: 1px solid rgb(202, 202, 202);
    // border-radius: 5px;
    // box-sizing: bord !important;
    // box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    // margin-bottom: 10px;
    &:focus {
      outline: none;
    }
  }
  .chapter-content-new {
    margin-bottom: 10px;
    // height: 100vh;
    height: 88%;
  }
}
</style>
