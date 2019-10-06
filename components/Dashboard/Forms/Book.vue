<template>
  <div class="book-form">
    <div class="book-form__container">
      <h3 class="book-form__title">本の情報</h3>
      <form ref="form" @submit.prevent class="flex flex-column" v-loading.fullscreen="loading">
        <div class="divider">
          <div class="divider" style="margin-right:10px;">
            <label for="avatar-uploader">本のカバー</label>
            <div class="book-form__cover">
              <v-img
                @click.stop="image = !image"
                style="border-radius:0.5rem;"
                class="book-form__img"
                v-if="imageUrl"
                :src="imageUrl"
                :aspect-ratio="1/1.5"
                width="150"
              ></v-img>
              <div @click.stop="image = !image" v-else class="book-form__cover-place">
                <fa icon="plus"></fa>
              </div>
            </div>
          </div>
          <div class="divider flex flex-column" style="width:100%;">
            <label for="book-title">タイトル*</label>
            <input
              maxlength="250"
              type="text"
              v-validate="'required||min:5'"
              data-vv-as="タイトル"
              name="book-title"
              for="book-title"
              class="book-form__input book-form__input--title"
              placeholder="タイトル"
              v-model="form.title"
            />
            <span class="form-error">{{ errors.first('book-title') }}</span>
            <label for="synopsis">あらすじ*</label>
            <textarea
              maxlength="1500"
              class="book-form__input book-form__input--textarea"
              name="synopsis"
              for="synopsis"
              placeholder="あらすじ"
              v-model="form.synopsis"
            ></textarea>
          </div>
          <div class="book-form__type" style="margin-bottom:2rem;">
            <Select
              :width="120"
              v-model="form.type"
              name="タイプ"
              :object="book_type"
              transition="grow-shrink"
              def="連載"
            ></Select>
          </div>
          <div class="book-form__type" style="margin-bottom:2rem;">
            <Select
              :width="120"
              v-model="form.status"
              name="ステータス"
              :object="book_status"
              transition="grow-shrink"
              def="連載中"
            ></Select>
          </div>
          <div class="book-form__main-genre">
            <Select
              transition="grow-shrink"
              name="メインジャンル"
              multiple
              :data="items"
              icon="location-arrow"
              v-model="form.main_genre"
              genre
              top
              :limit="1"
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
              :key="genre.name"
              v-text="genre.name"
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
            genre
            top
            :limit="6"
          ></Select>
        </div>
        <label for>関連ジャンル</label>
        <transition-group tag="ul" name="list" class="book-form__genre-list">
          <li
            class="book-form__genre-item"
            v-for="(genre) in form.genre"
            :key="genre.name"
            v-text="genre.name"
          ></li>
        </transition-group>
        <span>*最高６ジャンルまで &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *必ず1ジャンルを選択</span>
        <TagCreate :limit="12" v-model="form.tags"></TagCreate>
        <div class="book-form__genre">
          <label for>タグ</label>
          <transition-group tag="ul" name="list" class="book-form__genre-list">
            <li
              class="book-form__genre-item book-form__genre-item--tag"
              v-for="(tag) in form.tags"
              :key="tag.name"
              v-text="tag.name"
            ></li>
          </transition-group>
          <span>*最高12タグまで &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *必ず1タグを選択</span>
        </div>
        <div class="book-form__paid flex-divider flex--align flex-row--reverse">
          <fa icon="question-circle" :style="{fontSize:14}" @mouseenter="toggleTip"></fa>
          <transition name="grow-shrink">
            <div v-if="tip" class="book-form__paid-modal" v-click-outside="toggleTip">
              <p>一定の字数を超えたらその作品の話の二割がロックされ、有料化します。 また、一話相当の値段は様々な基準を分析し決められます</p>
            </div>
          </transition>
          <v-checkbox label="有料作品にする" v-model="form.paid"></v-checkbox>
        </div>
        <div class="divider flex flex--right">
          <input
            type="submit"
            class="form-submit form-submit--primary book-form__submit"
            :value="$route.query.bookId? '更新':'投稿'"
            @click="postBook"
          />
        </div>
      </form>
    </div>
    <image-modal @selectImage="handleCoverSelect" v-model="image"></image-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uuid from "uuid/v1";
import imageResize from "@/static/js/imageresize.js";
export default {
  data() {
    return {
      loading: false,
      content: "",
      imageUrl: "",
      rotation: 0,
      preGenre: [],
      oldImageUrl: "",
      paid: false,
      tip: false,
      scale: 1,
      book_type: [
        { key: "短編", value: "short" },
        { key: "連載", value: "serial" },
        { key: "エッセイ", value: "essay" }
      ],
      book_status: [
        { key: "連載中", value: "ongoing" },
        { key: "完結", value: "completed" },
        { key: "休暇", value: "hiatus" }
      ],
      form: {
        paid: true,
        synopsis: "",
        title: "",
        tags: [],
        main_genre: [],
        genre: [],
        cover: {},
        coverPath: "",
        type: "serial",
        status: "ongoing"
      },
      search: "",
      selected: [],
      items: [
        { key: "ファンタジー" },
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
      ],
      image: false
    };
  },

  computed: {
    ...mapGetters({
      url: "upload/getUrl",
      book: "book/getBook",
      genres: "book/getBookGenres",
      tags: "book/getBookTags",
      user: "auth/getUser"
    })
  },
  components: {
    Select: () => import("@/components/All/Select"),
    TagCreate: () => import("./Tag"),
    ImageModal: () => import("@/components/Web/Modals/Image/BookCover")
  },
  async created() {
    if (this.$route.query.bookId) {
      this.form.type = this.book.type;
      this.form.title = this.book.title;
      this.form.status = this.book.status;
      this.form.synopsis = this.book.synopsis;
      this.imageUrl = this.book.cover;
      this.form.tags = this.tags;
      this.form.url = this.book.cover;
      this.oldImageUrl = this.book.cover;
      this.form.coverPath = this.book.cover_path;
      this.form.main_genre.push({
        name: this.book.genre_name,
        id: this.book.genre_id
      });
      this.genres.forEach(genre => {
        this.form.genre.push({ name: genre });
        this.preGenre.push({ name: genre });
      });
    }
  },
  methods: {
    toggleTip() {
      this.tip = !this.tip;
    },
    handleCoverSelect(image) {
      this.form.cover = image;
      this.image = false;
      this.imageUrl = image.url;
    },
    async postBook() {
      this.loading = true;
      if (
        this.form.genre.length < 1 ||
        this.form.tags.length < 1 ||
        this.form.main_genre.length < 1
      ) {
        return this.$toast.error(
          "関連ジャンル・メインジャンル・タグは必ず一個以上選択してください",
          {
            duration: 3000,
            position: "top-right"
          }
        );
      }

      try {
        let book = {
          title: this.form.title,
          synopsis: this.form.synopsis,
          main_genre_id: this.form.main_genre[0].id,
          paid: this.form.paid,
          tags: this.form.tags,
          genres: this.form.genre,
          type: this.form.type,
          status: this.form.status
        };
        if (this.$route.query.bookId) {
          book["cover"] = this.form.cover.url;
          book["id"] = this.$route.query.bookId;
          await this.$store.dispatch("book/updateBook", { book });
          this.$toast.success(`作品のアップデートに成功しました`);
          this.loading = false;
          return;
        }
        if (!this.form.cover)
          return this.$toast.error("作品のカバーを選択してください");

        book["cover"] = this.form.cover.url;

        await this.$store.dispatch("book/addBook", {
          book
        });
        this.$toast.success("本の投稿に成功しました");
        this.loading = false;
        return this.$router.push("/dashboard/books");
      } catch (error) {
        this.$toast.show("本の投稿に失敗しました！", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1200,
          icon: "extension"
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
  .v-input {
    padding: 0;
  }
  .v-input__slot {
    margin: 0 !important;
    label {
      margin: 0;
    }
  }
  .v-messages {
    display: none;
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
  .v-input--selection-controls {
    margin: 0;
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
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
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
  &__paid {
    position: relative;
    #{$self}__paid-modal {
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      p {
        width: 20rem;
      }
      position: absolute;
      padding: 1rem;
      bottom: 100%;
    }
  }
  #{$self}__cover {
    #{$self}__img {
      &:hover {
        cursor: pointer;
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      border-radius: 0.5rem;
    }
    #{$self}__cover-place {
      transition: transform 300ms;
      &:active,
      &:focus {
        transform: scale(0.94);
        transition: 300ms;
      }
      &:hover {
        cursor: pointer;
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
      width: 150px;
      height: 225px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      color: #939599;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      background-color: #fff;
      border-radius: 0.5rem;
      // margin-b
    }
    margin-bottom: 1rem;
  }
  &__input {
    height: 40px;
    padding: 10px 12px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 0.4rem;
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
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    }
  }
  span {
    color: grey;
  }
  &__genre-title {
    font-size: 1.6rem;
    margin-top: 1rem;
  }
  &__genre-item {
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

  &__genre-list {
    display: flex;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    border-radius: 0.4rem;
    transition: box-shadow 150ms ease;
    padding: 0.5rem;
    flex-wrap: wrap;
    min-height: 4.5rem;
    background-color: #fff;
    margin-bottom: 0.8rem;
  }
  &__genre {
    margin-bottom: 2rem;
  }
  &__container {
    background-color: rgb(245, 245, 245);
    padding: 50px;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    overflow: scroll;
    width: 50rem;
  }

  &__title {
    font-size: 2.5rem;
    margin-top: 0;
    color: #000000;
    font-weight: 400;
    text-align: center;
  }
  .form-error {
    font-size: 1.6rem;
    color: red;
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
