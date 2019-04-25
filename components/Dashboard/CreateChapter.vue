
<template>
  <div class="chapter-form">
    <form action class="flex flex-column chapter-new" @submit.prevent="createChapter">
      <div class="chapter-form__save-draft flex-row flex--align flex--right">
        <div class="chapter-form__save-draft__button flex-row flex--align flex--center">
          <fa class="chapter-form__save-draft__icon" icon="save"></fa>保存
        </div>
      </div>
      <div class="chapter-form__options flex">
        <Select v-model="form.volume" name="章を選ぶ" icon="archive" :object="volumes"></Select>
        <Select v-model="form.locked" def="無料" icon="yen-sign" name="時価" :object="locked"></Select>
        <div
          class="chapter-form__options__user-news flex-row flex--align flex--center"
          @click.stop="announcementOpen"
        >
          <fa class="chapter-form__options__user-news__icon" icon="newspaper"></fa>告知
        </div>
        <div
          class="chapter-form__options__picture-upload flex-row flex--align flex--center"
          @click.stop="pictureOpen"
        >
          <fa class="chapter-form__options__picture-upload__icon" icon="images"></fa>絵を投稿
        </div>
      </div>

      <transition name="slide-fade">
        <div class="chapter-form__content-subject">
          <div class="form-control flex-row flex--align">
            <p
              v-if="form.volume > 0"
              class="chapter-index"
            >第{{this.$store.getters["chapter/getNewIndex"]}}話</p>
            <p v-else class="chapter-index">第{{0}}話</p>
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
              ruby
              required
            ></TextEditor>
          </div>
        </div>
      </transition>
      <transition name="grow-shrink">
        <dialog class="chapter-form__upload-img" open v-if="picture">
          <fa @click="picture= !picture" class="chapter-form__image-btn__close" icon="times"></fa>
          <transition name="slide-fade">
            <div class="chapter-form__extra">
              <upload-btn
                accept="image/*"
                ripple
                multiple
                title="画像アップロード"
                :fileChangedCallback="upload"
              >
                <template slot="icon">
                  <v-icon>add</v-icon>
                </template>
              </upload-btn>
              <v-img
                class="chapter-form__image-btn"
                v-for="(file, index) in fileList"
                :key="index"
                :src="file.url"
                @click="deleteImage(file.url)"
              >
                <fa class="chapter-form__image-btn__close" icon="times"></fa>
              </v-img>
              <!-- <el-upload
                class="upload-demo"
                action
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="successPhoto"
                list-type="picture-card"
                :limit="3"
                :on-exceed="handleExceed"
                accept="image/*"
              >
                <div slot="tip" class="el-upload__tip">jpeg などイメージフォーマットでお願いします</div>
              </el-upload>-->
            </div>
          </transition>
        </dialog>
      </transition>
      <transition name="grow-shrink">
        <dialog
          open
          class="chapter-form__announcement"
          v-if="announcement"
          v-click-outside="announcementOpen"
        >
          <header>告知・広告・思考</header>
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
              v-model="form.header"
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
              v-model="form.footer"
              id
              rows="5"
            ></textarea>
          </div>
          <div class="chapter-form__announcement__decision flex-row flex--right">
            <div
              class="chapter-form__announcement__button flex flex--align flex--center"
              @click="announcementOpen"
            >決定</div>
          </div>
        </dialog>
      </transition>

      <div class="flex-row flex--right">
        <button
          @click.prevent="submitForm = !submitForm"
          class="form-submit form-submit--primary chapter-new-submit"
        >話を投稿</button>
      </div>
      <transition name="grow-shrink">
        <dialog class="chapter-form__submit-form" open v-if="submitForm">
          <div class="chapter-form__submit-form__title flex-row flex--align flex--between">
            <h3>話を公開する</h3>
            <fa class="close-icon" icon="times" @click="submitForm = !submitForm"></fa>
          </div>
          <div class="chapter-form__submit-form__container">
            <div class="chapter-form__submit-form__chapter-title">
              <span class="chapter-title__placeholder">話のタイトル</span>
              <span class="chapter-title__content">{{form.title}}</span>
            </div>
            <div class="form-control flex-row flex--between">
              <div class="chapter-form__submit-form__chapter-title" style="margin-top:10px;">
                <span class="chapter-title__placeholder">話の章</span>
                <span class="chapter-title__content">第{{form.volume}}章</span>
              </div>
              <div class="chapter-form__submit-form__chapter-title" style="margin-top:10px;">
                <span class="chapter-title__placeholder">話の字数</span>
                <span class="chapter-title__content">{{form.wordCount.length}}</span>
              </div>
              <div
                class="chapter-form__submit-form__chapter-title"
                v-if="form.locked"
                style="margin-top:10px;"
              >
                <span class="chapter-title__placeholder">有料</span>

                <span class="chapter-title__content">
                  <Currency :amount="form.wordCount.length*0.0303"></Currency>
                </span>
              </div>
            </div>

            <div class="form-control flex-row flex--align flex--between">
              <label for="schedule" style="margin-right:10px;font-size:14px;color: #949499;">予約公開する</label>
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
            <div class="form-control flex-row flex--align flex--right">
              <div class="chapter-final-submit" @click="createChapter">公開</div>
            </div>
          </div>
        </dialog>
      </transition>
    </form>
  </div>
</template>

<script>
import TextEditor from "@/components/TextEditor";
import Select from "@/components/All/Select";
import Currency from "@/components/All/Currency";
export default {
  components: {
    TextEditor: () => import("@/components/TextEditor"),
    Select: () => import("@/components/All/Select"),
    Currency: () => import("@/components/All/Currency")
  },
  created() {
    this.$store.getters["chapter/getVolumeList"].forEach((volume, index) => {
      if (index === 0) {
        this.volumes.push({ key: volume.title, value: volume.index });
      } else {
        if (volume.index < 10) {
          this.volumes.push({ key: `00${volume.index}`, value: volume.index });
        } else if (volume.index < 100) {
          this.volumes.push({ key: `0${volume.index}`, value: volume.index });
        } else {
          this.volumes.push({ key: `${volume.index}`, value: volume.index });
        }
      }
    });
    this.form.volume = this.volumes[this.volumes.length - 1].value;
  },
  watch: {
    "form.content": function(val) {
      this.form.wordCount = this.form.content
        .replace(/(\s*)?&nbsp;(\s*)?/, "")
        .replace(/<[^>]+>/gm, "")
        .replace(/\s/g, "");
    },
    "form.volume": async function(val) {
      this.getNewLatestChapter();
    }
  },
  data() {
    return {
      volumes: [],
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
      announcement: false,
      picture: false,
      fileList: [],
      schedule: false,
      error: {
        content: false,
        title: false
      },
      submitForm: false,
      form: {
        title: "",
        content: "",
        date: "",
        wordCount: "",
        volume: "",
        bookId: this.$route.params.id,
        locked: false,
        drawings: [],
        header: "",
        footer: ""
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
    async getNewLatestChapter() {
      await this.$store.dispatch("chapter/fetchLatestIndex", {
        bookId: this.$route.params.id,
        volume_index: this.form.volume
      });
    },
    contentFocus() {
      this.contentHolder = "";
    },
    upload(files) {
      let dogs = Object.keys(files);
      let store = [];
      dogs.forEach(dog => {
        store.push(files[dog]);
      });
      // files.forEach(file => {
      //
      // });
      const reader = new FileReader();
      store.forEach(file => {
        this.form.drawings.push(file);
        this.fileList.push({ url: URL.createObjectURL(file), file: file });
      });

      console.log(this.fileList);
    },
    deleteImage(url) {
      this.fileList = this.fileList.filter(file => {
        return file.url !== url;
      });
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
    announcementOpen() {
      this.announcement = !this.announcement;
    },
    pictureOpen() {
      this.picture = !this.picture;
    },

    async createChapter() {
      if (this.form.drawings) {
        this.form.drawings.forEach(async image => {
          await this.$store.dispatch("upload/multiImage", image);
        });
      }

      if (!this.form.content || !this.form.title) {
        return (this.progress = 2);
      }
      let state = "published";
      if (this.schedule) {
        state = "scheduled";
      }
      // console.log(this.$store.state.upload.urls, "dog so nad");
      let chapter = {
        title: this.form.title,
        content: this.form.content,
        schedule: this.form.date,
        wordCount: this.form.wordCount.length,
        locked: this.form.locked,
        volume: this.form.volume,
        index: this.$store.getters["chapter/getNewIndex"],
        state,
        header: this.form.header,
        footer: this.form.footer,
        drawings: this.$store.state.upload.urls
      };
      // chapter.extra.drawings = this.$store.state.upload.urls;
      const bookId = this.$route.params.id;
      await this.$store.dispatch("chapter/createChapter", { bookId, chapter });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    }
  }
};
</script>

<style lang="scss">
dialog {
  border: 0px;
  margin: auto;
}
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
  &:active,
  &:focus {
    outline: none;
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
  position: relative;
  .v-btn:not(.v-btn--outline).primary {
    color: black;
  }
  $self: &;
  &__upload-img {
    padding: 10px;
    box-shadow: 1px 1px 5px 2px rgb(238, 238, 238);
    width: 300px;
    #{$self}__image-btn {
      position: relative;
      &__close {
        font-size: 1.6rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        transition: 200ms;
        &:hover {
          cursor: pointer;
          transform: rotate(180deg) scale(1.2);
          transition: transform 200ms;
        }
      }
    }
  }
  &__submit-form {
    padding: 0;
    // height: 300px;
    width: 500px;
    box-shadow: 1px 1px 5px rgb(240, 240, 240);
    &__container {
      padding: 20px 20px;
    }
    &__chapter-title {
      display: flex;
      flex-direction: column;

      .chapter-title__placeholder {
        color: #949499;
        font-size: 14px;
      }
      .chapter-title__content {
        font-size: 16px;
      }
      span {
      }
    }
    &__title {
      user-select: none;
      .close-icon {
        color: #949499;
        transition: 300ms;
        &:hover {
          color: #666669;
          transition: 300ms;
          cursor: pointer;
        }
      }
      h3 {
        color: #949499;
        font-size: 14px;
        font-weight: 400;
        margin: 0;
      }
      padding: 0 15px;
      height: 40px;
      font-size: 17px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ededf1;
    }
  }
  .chapter-index {
    font-size: 18px;
    height: 50px;

    &:hover {
      user-select: none;
    }
    background-color: rgb(247, 247, 247);
    width: 120px;
    box-shadow: 1px 1px 5px 0px #d1d1d1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__announcement {
    &__decision {
      width: 100%;
    }
    &__button {
      height: 35px;
      width: 100px;
      background-color: rgb(240, 240, 240);
      font-size: 15px;
      transition: 300ms;

      user-select: none;
      &:hover {
        box-shadow: 1px 1px 5px 2px rgb(250, 250, 250);
        transform: translateY(-2px);
        transition: 300ms;
        cursor: pointer;
      }
      &:active {
        transition: 300ms;
        cursor: pointer;
        box-shadow: 1px 1px 5px 2px rgb(250, 250, 250);
        transform: translateY(1px);
      }
    }
    header {
      font-size: 20px;
      text-align: center;
      margin-bottom: 15px;
    }
    width: 600px;
    background-color: #fff;
    padding: 20px 10px;
    border: 0px;
    box-shadow: 1px 1px 5px rgb(223, 223, 223);
  }
  &__options {
    user-select: none;
    &__user-news {
      height: 30px;
      width: 100px;
      font-size: 14px;
      box-shadow: 1px 1px 5px rgb(235, 235, 235);
      color: $primary;
      // border: 1px solid rgb(241, 241, 241);
      transition: 200ms;
      margin-right: 5px;
      &:hover {
        cursor: pointer;
        user-select: none;
        background-color: rgb(247, 247, 247);
        transition: 200ms;
      }

      &__icon {
        margin-right: 5px;
      }
    }
    &__picture-upload {
      height: 30px;
      width: 100px;
      font-size: 14px;
      box-shadow: 1px 1px 5px rgb(235, 235, 235);
      color: $secondary;
      // border: 1px solid rgb(241, 241, 241);
      transition: 200ms;
      &:hover {
        cursor: pointer;
        user-select: none;
        background-color: rgb(247, 247, 247);
        transition: 200ms;
      }

      &__icon {
        margin-right: 5px;
      }
    }
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
    textarea {
      height: 400px;
    }
  }
  .chapter-final-submit {
    height: 30px;
    width: 100px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $secondary;
    border: 1px solid $secondary;
    transition: 300ms;
    &:hover {
      user-select: none;
      cursor: pointer;
      color: white;
      background-color: $secondary;
      transition: 300ms;
    }
  }
}
</style>
