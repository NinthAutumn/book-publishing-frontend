<template>
  <div class="book-form">
    <form action class="flex flex-column">
      <el-upload
        class="avatar-uploader"
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
      <input type="submit" class="form-submit" value="投稿">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      form: {
        synopsis: "",
        title: "",
        tags: [],
        genre: []
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
    }
  }
};
</script>

<style lang="scss">
.vue-input-tag-wrapper {
  border: 0px solid $primary;
  border-bottom: 2px solid $primary;
  -webkit-appearance: none;
  font-size: 16px;
  // height: 45px;
  .input-tag {
    border: 1px solid $secondary;
    background-color: white;
    border-radius: 100px;
    padding: 3px 10px;
  }
  span {
    font-size: 16px;
    color: $secondary;
  }
  .remove::before {
    color: $secondary;
    font-size: 20px;
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
  margin-bottom: 10px;
  input {
    font-size: 16px !important;
  }
  .dropdown-toggle {
    height: 45px;
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
  &--input {
    margin-bottom: 10px;
  }
  label {
    font-size: 16px;
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
    margin-bottom: 10px;
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
