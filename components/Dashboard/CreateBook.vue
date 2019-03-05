<template>
  <div class="book-form">
    <h3 class="book-form__title">本の情報</h3>
    <form ref="form" @submit.prevent="postBook" class="flex flex-column">
      <div class="divider">
        <div class="divider" style="margin-right:10px;">
          <label for="avatar-uploader">本のカバー</label>
          <el-upload
            class="avatar-uploader flex"
            action
            drag
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="divider flex flex-column" style="width:100%;">
          <label for="book-title">タイトル</label>
          <input
            type="text"
            name="book-title"
            for="book-title"
            class="book-form--input form-input form-input--primary"
            placeholder="タイトル"
            v-model="form.title"
          >
          <label for="synopsis">あらすじ</label>
          <textarea
            class="book-form--textarea"
            name="synopsis"
            for="synopsis"
            placeholder="あらすじ"
            v-model="form.synopsis"
          ></textarea>
        </div>
      </div>
      <label for="mgenre">メインジャンル</label>
      <el-select v-model="form.mgenre" filterable placeholder="Select">
        <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <label for="genre">ジャンル</label>
      <el-select v-model="form.genre" multiple filterable placeholder="Select">
        <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <label for>タグ</label>
      <el-select
        v-model="form.tags"
        multiple
        allow-create
        default-first-option
        filterable
        placeholder="タグを作る"
      >
        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <div class="divider flex flex--center">
        <input type="submit" class="form-submit form-submit--primary book-form__submit" value="投稿">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],
      imageUrl: "",
      form: {
        synopsis: "",
        title: "",
        tags: [],
        mgenre: "",
        genre: [],
        avatar: {}
      },

      selected: [],
      list: [
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
        "学園"
      ],
      tags: ["最強", "最弱"]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
    async postBook() {
      await this.$store
        .dispatch("upload/image", this.form.avatar)
        .then(async () => {
          const book = {
            title: this.form.title,
            tags: this.form.tags,
            genres: this.form.genre,
            synopsis: this.form.synopsis,
            cover: this.$store.state.upload.url
          };
          await this.$store
            .dispatch("book/addBook", book)
            .then(() => {
              this.$message({
                message: "本の投稿に成功しました",
                type: "success"
              });
              this.$router.push("/dashboard/books");
            })
            .catch(e => {
              this.$message({
                message: `本の投稿に失敗しました！`,
                type: "error"
              });
            });
        });
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
    &:hover {
      border: none;
    }
  }
  .avatar-uploader .el-upload {
    border: 2px solid;
    border-color: $primary-lighter;
    // border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
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
    width: 30.8rem;
    height: 45.9rem;
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
  background-color: white;
  padding: 50px;
  // border-radius: 10px;
  // box-shadow: 1px 1px 5px 0px rgb(199, 198, 198);
  overflow: scroll;
  // height: 80vh;
  width: 440px;
  &__title {
    font-size: 25px;
    margin-top: 0;
    color: #8b8b8b;
    font-weight: 400;
    text-align: center;
    // mar
  }
  &--input {
    margin-bottom: 20px;
    line-height: 20px;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }
  label {
    font-size: 18px;
    color: #bfbfc2;
  }

  &__submit {
    width: 140px;
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
}
</style>
