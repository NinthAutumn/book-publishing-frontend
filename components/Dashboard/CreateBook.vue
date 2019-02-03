<template>
  <div class="book-form">
    <h3 class="book-form__title">本の情報</h3>
    <form ref="form" @submit.prevent="postBook" class="flex flex-column">
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
      <label for="title">タイトル</label>
      <input
        type="text"
        name="title"
        for="title"
        class="book-form--input form-input form-input--primary"
        placeholder="Title"
        v-model="form.title"
      >
      <label for="synopsis">あらすじ</label>
      <textarea
        class="book-form--textarea"
        name="synopsis"
        id
        cols="30"
        rows="10"
        placeholder="Summary"
        v-model="form.synopsis"
      ></textarea>
      <label for="genre">ジャンル</label>
      <v-select
        required
        name="genre"
        class="tags-form"
        multiple
        v-model="form.genre"
        :options="list"
        :closeOnSelect="false"
        placeholder="ジャンルの検索"
      ></v-select>
      <label for>タグ</label>
      <input-tag v-model="form.tags" placeholder="タグの検索"></input-tag>
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
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("Avatar picture must be JPG format!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("Avatar picture size can not exceed 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    async postBook() {
      const data = new FormData();

      data.append("avatar", this.form.avatar);
      // await thi
      data.append("synopsis", this.form.synopsis);
      data.append("title", this.form.title);
      data.append("tags", this.form.tags);
      data.append("genre", this.form.genre);
      const book = this.form;
      await this.$store
        .dispatch("book/addBook", data)
        .then(() => {
          this.$message({
            message: "本の投稿に成功しました",
            type: "success"
          });
          this.form = {};
        })
        .catch(e => {
          this.$message({
            message: `本の投稿に失敗しました！`,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss">
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
  width: 500px;
  &__title {
    font-size: 20px;
    margin-top: 0;
    color: #8b8b8b;
    font-weight: 400;
    text-align: center;
    // mar
  }
  &--input {
    margin-bottom: 20px;
  }
  label {
    font-size: 16px;
    color: #bfbfc2;
  }

  &__submit {
    width: 140px;
  }
  &--textarea {
    resize: none;
    font-size: 16px;
    border: 0px solid;
    color: #a3a3a3;
    border-bottom-width: 2px;
    border-style: solid;
    border-bottom-color: $primary;
    padding: 5px;
    margin-bottom: 20px;
    &:focus {
      // display: none;
      outline: none;
    }
  }
}
.el-upload-dragger {
  width: 130px;
  height: 191px;
  border: none;
  &:hover {
    border: none;
  }
}
.avatar-uploader .el-upload {
  border: 2px solid;
  border-color: $primary-lighter;
  border-radius: 6px;
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
}
.avatar {
  width: 130px;
  height: 191px;
  display: block;
}
</style>
