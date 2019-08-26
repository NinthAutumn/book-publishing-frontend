<template>
  <div class="chapter-form">
    <div class="chapter-form__wrapper">
      <div class="chapter-form__container">
        <div class="chapter-form__nav flex-row flex--align flex--between">
          <div class="chapter-form__label flex-row" v-if="!$route.query.chapterId">
            第
            <word-select v-model="form.volume" :options="volume_list" label="章を選ぶ"></word-select>
            章 {{form.volume.index === 0? 0 :latestIndex}}話
          </div>
          <div class="chapter-form__label flex-row" v-else>
            第
            <word-select v-model="form.volume" disabled :options="volume_list" label="章を選ぶ"></word-select>
            章 {{chapter.index}}話
          </div>
          <div class="chapter-form__actions flex-row flex--align">
            <div
              class="chapter-form__action chapter-form__action--drawing"
              @click.stop="picture = !picture"
            >絵を投稿・付ける</div>
          </div>
          <div class="chapter-form__button-list flex-row">
            <div
              v-if="!$route.query.chapterId"
              class="chapter-form__button chapter-form__button--save"
              v-text="'話を保存'"
            ></div>
            <div
              @click="$route.query.chapterId? handleUpdate():handleChapter()"
              class="chapter-form__button"
              v-text="$route.query.chapterId? '話を更新する':'話を投稿する'"
            ></div>
          </div>
        </div>
        <form action.prevent>
          <label for="title"></label>
          <input v-model="form.title" type="text" placeholder="タイトル" class="chapter-form__input" />
          <div class="chapter-form__content">
            <div class="chapter-form__announcement chapter-form__announcement--header">
              <div class="chapter-form__announcement-form flex-column" v-if="header">
                <label for="header">上書き</label>
                <textarea
                  v-model="form.header"
                  placeholder="上書き"
                  name="header"
                  class="chapter-form__ann-textarea"
                ></textarea>
              </div>

              <div class="chapter-form__add-announcement" @click="header = !header" v-else>
                <fa class="chapter-form__add-icon" icon="plus"></fa>上書きを足す
              </div>
            </div>
            <text-editor
              v-model="form.content"
              :content="content"
              @wordCount="wordCountHandler"
              class="chapter-form__textarea"
              placeholder="話の本文"
              ruby
            ></text-editor>
            <div class="chapter-form__announcement chapter-form__announcement--footer">
              <div class="chapter-form__announcement-form flex-column" v-if="footer">
                <label for="footer">下書き</label>
                <textarea
                  v-model="form.footer"
                  placeholder="下書き"
                  name="footer"
                  class="chapter-form__ann-textarea"
                ></textarea>
              </div>
              <div class="chapter-form__add-announcement" @click="footer = !footer" v-else>
                <fa class="chapter-form__add-icon" icon="plus"></fa>下書きを足す
              </div>
            </div>
          </div>
          <before-upload :index="latestIndex" v-model="beforeUpload" :form="form"></before-upload>
          <drawing-modal @close="picture = !picture" v-model="form.drawings" v-if="picture"></drawing-modal>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      header: false,
      footer: false,
      volume_list: {},
      selected_volume: {},
      content: "",
      picture: false,
      form: {
        volume: {},
        content: "",
        title: "",
        wordCount: 0,
        bookId: this.$route.params.id,
        drawings: {}
        // locked: false
      },
      beforeUpload: false
    };
  },
  computed: {
    ...mapGetters({
      volumes: "chapter/getVolumeList",
      latestIndex: "chapter/getNewIndex",
      chapter: "chapter/getChapter",
      drawings: "upload/getMultipleFile",
      chapterDrawings: "drawing/getChapterDrawings"
    })
  },
  components: {
    TextEditor: () => import("@/components/TextEditor"),
    WordSelect: () => import("@/components/Web/Select/Word"),
    BeforeUpload: () => import("@/components/Web/Modals/Chapter/BeforeUpload"),
    DrawingModal: () => import("@/components/Web/Modals/Chapter/Drawing")
  },
  async created() {},
  watch: {
    "form.volume": async function(val) {
      this.getNewLatestChapter();
    }
  },
  methods: {
    async getNewLatestChapter() {
      await this.$store.dispatch("chapter/fetchLatestIndex", {
        bookId: this.$route.params.id,
        volumeId: this.form.volume.id
      });
    },
    wordCountHandler(val) {
      this.form.wordCount = val;
      // console.log(this.form.wordCount);
    },
    async handleUpdate() {
      this.loading = true;
      let bookId = this.$route.params.id;
      let state = "published";
      let chapter = {
        title: this.form.title,
        content: this.form.content,
        wordCount: this.form.wordCount,
        header: this.form.header,
        footer: this.form.footer,
        drawings: this.form.drawings
      };
      try {
        await this.$store.dispatch("chapter/patchChapter", {
          chapter,
          chapterId: this.$route.query.chapterId
        });
      } catch (error) {}

      this.loading = false;
      this.$router.push("/dashboard/books/");
    },
    handleChapter() {
      if (this.form.title.length < 1)
        return this.$toast.error("タイトルは必要です");
      if (this.form.wordCount < 1) return this.$toast.error("本文は必要です");
      this.beforeUpload = !this.beforeUpload;
    },
    coolerNumbers(index) {
      let val;
      if (index === 0) {
        val = "設定";
      } else if (index < 10) {
        val = `00${index}`;
      } else if (index < 100) {
        val = `0${index}`;
      } else {
        val = `${index}`;
      }
      return val;
    }
  },
  created() {
    if (this.$route.query.chapterId) {
      this.chapterDrawings.forEach(drawing => {
        this.form.drawings[drawing.id] = drawing;
      });
    }
  },
  async mounted() {
    // let chan
    this.volumes.forEach((volume, index) => {
      let cool = this.coolerNumbers(volume.index);
      this.volume_list[volume.id] = {
        key: cool,
        value: { id: volume.id, index: volume.index, key: cool }
      };
    });

    if (this.$route.query.chapterId) {
      // console.log(this.chapter);
      this.content = this.chapter.content;
      this.form.title = this.chapter.title;
      this.form.content = this.chapter.content;
      // console.log(this.chapterDrawings);

      this.form.footer = this.chapter.footer;
      this.chapter.footer ? (this.footer = true) : (this.footer = false);
      this.form.header = this.chapter.header;
      this.chapter.header ? (this.header = true) : (this.header = false);
      this.form.volume = this.volume_list[this.chapter.volume_id].value;
    } else {
      let keys = Object.keys(this.volume_list);
      this.form.volume = this.volume_list[keys[keys.length - 1]].value;
    }
  }
};
</script>

<style lang="scss">
.chapter-form {
  $self: &;
  &__wrapper {
    padding: 1rem 4.5rem;
    background-color: #fff;
    #{$self}__container {
    }
    label {
      font-size: 1.4rem;
      color: #2a2f45;
    }
    .word-select__label {
      color: $secondary;
    }
    #{$self}__content {
      // padding: 0 20rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #{$self}__nav {
      background-color: #fff;
      position: sticky;
      top: 5rem;
      right: 4.5rem;
      padding-top: 1rem;
      z-index: 3;
      margin-bottom: 1rem;
    }
    #{$self}__action {
      background: #3ecf8e;
      text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
      border-radius: 10rem;
      &:hover {
        cursor: pointer;
      }
      color: white;
      padding: 0.5rem 2rem;
      font-size: 1.4rem;
    }
    #{$self}__announcement {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      &--header {
        margin-bottom: 1rem;
      }
      &--footer {
        margin-top: 1rem;
      }
      #{$self}__ann-textarea {
        padding: 1rem 0.5rem;
        width: 100%;
        resize: none;
        height: 15rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        font-size: 1.5rem;
        // line-height: 18px;
        &:focus {
          outline: none;
        }
      }
      #{$self}__announcement-form {
        width: 70%;
      }
      #{$self}__add-announcement {
        font-weight: bold;
        padding: 1rem 2rem;
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(0, 76, 129);
        background-color: #e1f0f9;
        // height: 4rem;
        border-radius: 10rem;
        font-size: 1.6rem;
      }
      #{$self}__add-icon {
        margin-right: 1rem;
      }
    }

    #{$self}__button {
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      &--save {
        color: #2a2f45;
        background-color: #fff;
        margin-right: 1rem;
      }
      font-size: 1.4rem;
      padding: 1rem 2rem;
      color: white;
      background-color: #2a2f45;
      border-radius: 0.5rem;
    }
    #{$self}__label {
      font-size: 1.6rem;
    }
    #{$self}__textarea {
      width: 70%;
      textarea {
        height: 85vh;
      }
    }
    #{$self}__input {
      border: 1px solid #ddd;
      font-weight: bold;
      // height:
      &:focus {
        outline: none;
      }
      margin-bottom: 1.5rem;
      height: 4.5rem;
      width: 100%;
      background-color: #fff;
      border-radius: 0.5rem;
      font-size: 1.5rem;
      padding: 0rem 1.5rem;
    }
  }
}
</style>
