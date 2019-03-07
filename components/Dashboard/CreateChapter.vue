
<template>
  <div class="chapter-form">
    <form action class="flex flex-column chapter-new" @submit.prevent="createChapter">
      <div class="chapter-form__save-draft flex flex--align flex--right">
        <div class="chapter-form__save-draft__button flex flex--align flex--center">
          <fa class="chapter-form__save-draft__icon" icon="save"></fa>保存
        </div>
      </div>
      <div class="chapter-form__options flex">
        <Select name="章を選ぶ" icon="archive" :data="volumes"></Select>
        <Select v-model="form.locked" def="無料" icon="yen-sign" name="有料" :object="locked"></Select>
      </div>

      <transition name="slide-fade">
        <div class="chapter-form__content-subject">
          <div class="form-control">
            <input
              placeholder="タイトル"
              type="text"
              class="chapter-title form-input"
              v-model="form.title"
              required
              maxlength="100"
            >
          </div>
          <div class="form-control">
            <TextEditor
              class="chapter-content-new"
              v-model="form.content"
              :placeholder="contentHolder"
              required
            ></TextEditor>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="chapter-form__extra">
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
      <transition name="slide-fade">
        <div class="chapter-form__announcement">
          <div class="form-control flex-column">
            <transition name="placeholder-up">
              <div class="label-animation" for="header" v-if="!upPlaceHolder">上書き</div>
            </transition>
            <textarea
              style="margin-bottom: 25px;"
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
              style="margin-bottom: 25px;"
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
          <div class="lock-method" v-if="form.locked">
            <p>ブロンズ作者の場合: 字数 x 0.00303 ゴールド</p>
            <p>シルバー作者の場合: 字数 x 0.00404 ゴールド</p>
            <p>ゴールド作者の場合: 字数 x 0.00505 ゴールド</p>
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
            </div>
          </transition>
        </div>
      </transition>
      <div class="flex flex--right">
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
import Select from "@/components/All/Select";
export default {
  components: {
    TextEditor,
    Select
  },
  data() {
    return {
      volumes: ["設定", "001", "002"],
      locked: [
        {
          key: "無料",
          value: false
        },
        {
          key: "有料",
          value: true
        }
      ],
      upPlaceHolder: "上書き",
      downPlaceHolder: "下書き",
      contentHolder: "本文",
      progress: 1,
      fileList: [],
      schedule: false,
      error: {
        content: false,
        title: false
      },
      form: {
        title: "",
        content: "",
        date: "",
        wordCount: "",
        volume: "",
        bookId: this.$route.params.id,
        locked: false,
        extra: {
          announcement: {
            header: "",
            footer: ""
          },
          drawings: []
        }
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
          date: "日にちを選ぶ"
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
    contentFocus() {
      this.contentHolder = "";
    },
    contentBlur() {
      this.contentHolder = "本文";
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
      // const counter = document.querySelector(".fr-view");
      // if (counter) {
      //   this.form.wordCount = counter.innerText;
      // }
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
      this.form.wordCount = this.form.content
        .replace(/(\s*)?&nbsp;(\s*)?/, "")
        .replace(/<[^>]+>/gm, "")
        .replace(/\s/g, "");
      if (!this.form.content || !this.form.title) {
        return (this.progress = 2);
      }
      let state = "published";
      if (this.schedule) {
        state = "scheduled";
      }

      const chapter = {
        title: this.form.title,
        content: this.form.content,
        schedule: this.form.date,
        wordCount: this.form.wordCount.length,
        locked: this.form.locked,
        voluem: this.form.volume,
        state,
        extra: {
          announcement: {
            header: this.form.extra.announcement.header,
            footer: this.form.extra.announcement.footer
          },
          drawings: this.$store.state.upload.urls
        }
      };
      await this.$store.dispatch("chapter/createchapter", { bookId, chapter });
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
  transition: 300ms;
  border-radius: 0;
  &:hover {
    background-color: #fff;
    border: 1px solid $primary;
    color: $primary;
    transition: 300ms;
  }
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
  &__options {
    width: 220px;
  }
  &__save-draft {
    &__button {
      font-size: 15px;
      background-color: white;
      border: 1px solid $secondary-light;
      width: 80px;
      color: $secondary-light;
      height: 35px;
      transition: 100ms;
      &:hover {
        background-color: $secondary-light;
        color: white;
        cursor: pointer;
        transition: 100ms;
      }
    }

    &__icon {
      margin-right: 5px;
    }
  }
  .el-button {
    border-radius: 0 !important;
  }
  transition: 300ms;
  .el-step__title {
    font-size: 14px;
    line-height: 1;
  }
  &__navigation {
    &__button {
      // margin: 0 10px;

      border-radius: 100px;

      height: 30px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 1px 5px rgb(240, 240, 240);
      transition: 300ms;
      border: 1px solid $primary;
      &:hover {
        // transform: scale(1.2);
        background-color: $primary;
        color: white;
        transition: 300ms;
      }
      &--back {
        display: flex;
        align-items: center;
        color: $secondary;
        border: 1px solid $secondary;
        &:hover {
          // transform: scale(1.2);
          background-color: $secondary;
          color: white;
          transition: 300ms;
        }
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
      font-size: 14px;
      // &--icon {
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
    // margin-bottom: 25px;
    color: #a3a3a3;
    border: 0px solid $review-color !important;
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
    // border: 1px solid rgb(202, 202, 202);

    text-align: left;
    // box-sizing: bord !important;
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    // margin-bottom: 10px;
    &:focus {
      outline: none;
    }
  }
  .chapter-content-new {
    // margin-bottom: 10px;
    // height: 100vh;
    // height: 88%;
  }
}
</style>
