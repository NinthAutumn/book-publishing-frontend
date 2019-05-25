<template>
  <div class="book-form">
    <div class="book-form__container">
      <h3 class="book-form__title">本の情報</h3>
      <form ref="form" @submit.prevent class="flex flex-column">
        <div class="divider">
          <div class="divider" style="margin-right:10px;">
            <label for="avatar-uploader">本のカバー</label>
            <el-upload
              class="avatar-uploader flex"
              action
              drag
              accept="image/*"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :aspect-ratio="1/1.5"
              width="150"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="divider flex flex-column" style="width:100%;">
            <label for="book-title">タイトル*</label>
            <input
              minlength="2"
              type="text"
              v-validate="'required||min:5'"
              data-vv-as="タイトル"
              name="book-title"
              for="book-title"
              class="book-form__input book-form__input--title"
              placeholder="タイトル"
              v-model="form.title"
            >
            <span class="form-error">{{ errors.first('book-title') }}</span>
            <label for="synopsis">あらすじ*</label>
            <textarea
              class="book-form__input book-form__input--textarea"
              name="synopsis"
              for="synopsis"
              placeholder="あらすじ"
              v-model="form.synopsis"
            ></textarea>
          </div>
          <div class="book-form__main-genre">
            <Select
              transition="grow-shrink"
              name="メインジャンル"
              multiple
              :data="items"
              icon="location-arrow"
              v-model="form.main_genre"
              top
              :limit="1"
              style="margin-bottom:2rem;"
              :disabled="form.genre.length > 0"
              disableMessage="メインジャンルをまた選ぶには関連ジャンルを全部選択解除してください"
            ></Select>
          </div>
        </div>
        <div class="book-form__genre">
          <label for>メインジャンル</label>
          <transition-group tag="ul" name="list" class="book-form__genre-list">
            <li
              class="book-form__genre-item"
              v-for="(genre) in form.main_genre"
              :key="genre"
              v-text="genre"
            ></li>
          </transition-group>
          <span>作品のメインジャンル *必ず1ジャンルを選択</span>
        </div>
        <div class="book-form__genre">
          <Select
            :disable="form.main_genre[0]"
            transition="grow-shrink"
            name="ジャンル"
            multiple
            :data="items"
            :latestData="preGenre"
            icon="location-arrow"
            v-model="form.genre"
            top
            :limit="6"
            style="margin-bottom:2rem;"
          ></Select>
          <label for>関連ジャンル</label>
          <transition-group tag="ul" name="list" class="book-form__genre-list">
            <li
              class="book-form__genre-item"
              v-for="(genre) in form.genre"
              :key="genre"
              v-text="genre"
            ></li>
          </transition-group>
          <span>*最高６ジャンルまで &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *必ず1ジャンルを選択</span>
        </div>
        <TagCreate :limit="6" v-model="form.tags"></TagCreate>
        <div class="book-form__genre">
          <label for>タグ</label>
          <transition-group tag="ul" name="list" class="book-form__genre-list">
            <li
              class="book-form__genre-item book-form__genre-item--tag"
              v-for="(tag) in form.tags"
              :key="tag"
              v-text="tag"
            ></li>
          </transition-group>
          <span>*最高６タグまで &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *必ず1タグを選択</span>
        </div>
        <div class="divider flex flex--right">
          <input
            type="submit"
            class="form-submit form-submit--primary book-form__submit"
            value="投稿"
            @click="postBook"
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      content: "",
      imageUrl: "",
      rotation: 0,
      preGenre: [],
      scale: 1,
      form: {
        synopsis: "",
        title: "",
        tags: [],
        main_genre: [],
        genre: [],
        cover: {}
      },
      search: "",
      selected: [],
      items: [
        "ファンタジー",
        "恋愛",
        "文学",
        "異世界",
        "空想科学",
        "SF",
        "武術",
        "ミステリー",
        "サスペンス",
        "冒険",
        "アクション",
        "ノンフィクション",
        "ホラー",
        "オカルト",
        "時代",
        "歴史",
        "コメディ",
        "政治",
        "スポーツ",
        "武俠",
        "経済",
        "推理",
        "青春",
        "学園",
        "ボーイズラブ",
        "少女愛",
        "メカ",
        "少年",
        "青年",
        "音楽",
        "日常",
        "ゲーム"
      ]
    };
  },

  computed: {
    ...mapGetters({
      url: "upload/getUrl",
      book: "book/getBook",
      genres: "book/getBookGenres",
      tags: "book/getBookTags"
    }),
    isFormInValid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  },
  watch: {
    // "form.tags": function(val) {
    //   if (val.length > 5) {
    //     this.form.tags.pop();
    //   }
    // }
  },
  components: {
    Select: () => import("@/components/All/Select"),
    TagCreate: () => import("./Tag")
  },
  created() {
    if (this.$route.query.bookId) {
      for (let genre of this.genres) {
        this.form.genre.push(genre.name);
        this.preGenre.push(genre.name);
      }
      for (let tag of this.tags) {
        this.form.tags.push(tag.name);
      }
      // this.form.genre = this.form.tags;
      this.form.main_genre = [this.book.name];
      this.form.title = this.book.title;
      this.form.synopsis = this.book.synopsis;
      this.imageUrl = this.book.cover;
    }
  },
  async mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.cover = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
    async postBook() {
      if (
        this.form.genre.length < 1 ||
        this.form.tags.length < 1 ||
        this.form.main_genre.length < 1
      ) {
        return this.$message({
          message:
            "関連ジャンル・メインジャンル・タグは必ず一個以上選択してください",
          type: "error"
        });
      }

      try {
        let book = {
          title: this.form.title,
          tags: this.form.tags,
          genres: this.form.genre,
          synopsis: this.form.synopsis,
          main_genre: this.form.main_genre[0]
          //   cover: url.url,
          //   cover_path: url.path
        };
        const url = await this.$store.dispatch("upload/image", this.form.cover);
        book["cover"] = url.url;
        book["coverPath"] = url.path;
        await this.$store.dispatch("book/addBook", book);
        this.$message({
          message: "本の投稿に成功しました",
          type: "success"
        });
        this.$router.go(-1);
      } catch (error) {
        this.$message({
          message: `本の投稿に失敗しました！${error}`,
          type: "error"
        });
      }
    },
    saveClicked() {
      var img = this.$refs.vueavatar.getImageScaled();
      this.$refs.image.src = img.toDataURL();
    },
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    }
  }
};
</script>

<style lang="scss">
.el-scrollbar {
  font-size: 16px !important;
  span {
    font-size: 16px !important;
  }
}
.el-select__tags-text {
  font-size: 14px;
}
.el-input__inner {
  font-size: 16px;
}
.book-form {
  // background-color: rgb(245, 245, 245);

  .el-input__inner {
    // height: 40px;
  }
  .el-select {
    margin-bottom: 10px;
  }
  .el-input__inner {
    border-radius: 0;
    border: 0;
    border-bottom: 2px solid $primary;
    padding-left: 2px;
  }
  .el-select__input {
    margin: 0;
  }
  .el-upload-dragger {
    width: 130px;
    height: 191px;
    display: flex;
    border: none;
    border-radius: 0;
    &:hover {
      border: none;
    }
  }

  .avatar-uploader .el-upload {
    border: 0px solid;
    border-color: $primary-lighter;
    // border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    &:hover {
      -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      -webkit-transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, box-shadow, transform;
      transition-property: color, background-color, box-shadow, transform,
        -webkit-box-shadow, -webkit-transform;
      -webkit-transition-duration: 0.15s;
      transition-duration: 0.15s;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: $primary;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 191px;
    line-height: 178px;
    text-align: center;
    margin: auto;
  }
  .avatar {
    width: 130px;
    height: 191px;
    display: block;
  }
}

.vue-input-tag-wrapper {
  border: 0px solid $primary !important;
  border-bottom: 2px solid $primary !important;
  -webkit-appearance: none !important;
  font-size: 16px !important;
  // height: 45px;
  .input-tag {
    border: 1px solid $secondary !important;
    background-color: white !important;
    border-radius: 100px !important;
    padding: 3px 10px !important;
  }
  span {
    font-size: 16px !important;
    color: $secondary !important;
  }
  .remove::before {
    color: $secondary !important;
    font-size: 20px !important;
  }
  input {
    font-size: 16px !important;
  }
}

.dropdown-menu {
  max-height: none;
  height: 100px;
}
.tags-form {
  // height: 50px;
  margin-bottom: 20px;
  input {
    font-size: 16px !important;
  }
  .dropdown-toggle {
    min-height: 45px;
    border: 0px solid $primary;
    border-bottom: 2px solid $primary;
    border-radius: 0;
    background-color: white;
    .selected-tag {
      font-size: 16px;
      color: white !important;
      background-color: $primary-lighter !important;
    }
    .close {
      span {
        font-size: 20px;
        color: white;
      }
    }
  }
}
.book-form {
  display: flex;
  $self: &;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
  &__input {
    height: 40px;
    padding: 10px 12px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    // border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;
    transition: 300ms;
    margin-bottom: 2rem;
    &--textarea {
      height: 15rem;
      &:focus {
        outline: none;
      }
    }
    &:focus,
    &:hover {
      outline: none;
      -webkit-box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
      -webkit-transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, -webkit-box-shadow,
        -webkit-transform;
      transition-property: color, background-color, box-shadow, transform;
      transition-property: color, background-color, box-shadow, transform,
        -webkit-box-shadow, -webkit-transform;
      -webkit-transition-duration: 0.15s;
      transition-duration: 0.15s;
      transition: 300ms;
    }
  }
  &__genre {
    margin-bottom: 2rem;
    span {
      color: grey;
    }
    #{$self}__genre-list {
      // margin-top: 0.5rem;
      display: flex;
      box-shadow: 0 1px 3px 0 #e6ebf1;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      padding: 0.5rem;
      flex-wrap: wrap;
      min-height: 4.5rem;
      background-color: #fff;
      margin-bottom: 0.8rem;
    }
    #{$self}__genre-title {
      font-size: 1.6rem;
      margin-top: 1rem;
    }
    #{$self}__genre-item {
      padding: 0.5rem 1rem;
      font-size: 1.4rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      color: $primary;
      border: 1px solid $primary;
      &--tag {
        color: $secondary;
        border: 1px solid $secondary;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__container {
    background-color: rgb(245, 245, 245);
    padding: 50px;
    // border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    overflow: scroll;
    // height: 80vh;
    width: 50rem;
  }

  &__title {
    font-size: 2.5rem;
    margin-top: 0;
    color: #000000;
    font-weight: 400;
    text-align: center;
    // mar
  }
  .form-error {
    font-size: 1.6rem;
    color: red;
    // margin-bottom: 1rem;
  }
  &--input {
    line-height: 20px;
    font-size: 18px;
    &:focus {
      outline: none;
    }
    margin-bottom: 2rem;
  }

  &__submit {
    width: 140px;
    border-radius: 0;
    transition: 300ms;
    &:focus,
    &:active {
      outline: none;
    }
    &:hover {
      color: $primary;
      border: 1px solid $primary;
      transition: 300ms;
      background-color: white;
    }
  }
  &--textarea {
    line-height: 20px;
    height: 200px;
    resize: none;
    font-size: 16px;
    border: 0px solid;
    color: #a3a3a3;
    border-bottom-width: 2px;
    border-style: solid;
    border-bottom-color: $primary;
    padding: 5px;
    margin-bottom: 20px;
    width: 100%;
    &:focus {
      // display: none;
      outline: none;
    }
  }

  .author-avatar {
    width: 20rem;
    height: 20rem;
  }
}
</style>
