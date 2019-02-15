<template>
  <div class="book__reviews">
    <form class="review-form" @submit.prevent="addReview">
      <!-- <label for="title">Title</label> -->
      <h3 style="text-align:center;">感想を書く</h3>
      <input
        class="review-form__title"
        type="text"
        v-model="review.title"
        name="title"
        placeholder="タイトル"
        max="100"
      >
      <div class="form-control">
        <label for="rating" class="rating-label">評価</label>
        <input
          type="Number"
          placeholder="5"
          v-model="review.rating.total"
          class="rating-input"
          v-validate="'max:5'"
          name="reviewRating"
          step=".01"
        >
        <!-- <span class="help is-danger">{{ errors.first('reviewRating') }}</span> -->
        <no-ssr>
          <star-rating
            name="rating"
            v-model="review.rating.total"
            :star-size="20"
            :read-only="false"
            inactive-color="#D8D7D5"
            active-color="#FFB727"
            :increment="0.01"
            :round-start-rating="false"
            border-color="#FFB727"
            :glow="1"
            class="star-rating"
          ></star-rating>
        </no-ssr>
      </div>
      <no-ssr>
        <vue-editor
          :editorToolbar="customToolbar"
          class="review-form__content-editor"
          required
          name="content"
          v-model="review.content"
          placeholder="本についての感想文"
        ></vue-editor>
      </no-ssr>
      <div class="divider flex flex--right">
        <button type="submit" class="review-submit">投稿</button>
      </div>
    </form>
    <!-- <froala :tag="'textarea'" :config="config" v-model="content"></froala> -->
    <!-- <no-ssr>
        <vue-editor v-model="content" :editorOptions="config"></vue-editor>
    </no-ssr>-->
    <!-- <div v-html="content"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {
        title: "",
        content: "",
        rating: {
          total: 5
        }
      },
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ]
    };
  },
  methods: {
    async addReview() {
      const username = this.$store.state.auth.user.username;
      await this.$store
        .dispatch("review/addReview", {
          review: this.review,
          bookId: this.$route.params.id,
          username: username
        })
        .then(() => {
          this.$message({
            message: "レビューの投稿に成功しました",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            message: "レビューの投稿に失敗しました",
            type: "error"
          });
        });
      // console.log(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.ql-toolbar.ql-snow {
  border: 2px solid $review-color !important;
  border-bottom: 0 !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  // border-top-left-radius: 10;
  // border-top-right-radius: 10px;
}
.ql-container.ql-snow {
  border: 2px solid $review-color !important;
  // border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: #796477;
}
.review-form {
  display: flex;
  flex-direction: column;
  &__title {
    height: 50px;
    font-size: 15px;
    // width: 410px;
    width: 100%;
    padding: 5px;
    border: 2px solid $review-color;
    // border-radius: 5px;
    box-sizing: border-box;
    color: $primary-black;
    margin-bottom: 10px;
  }
  &__content-editor {
    margin-bottom: 10px;
  }
  &__content {
    height: 150px;
    padding: 5px;
    width: 100%;

    border: 2px solid $review-color;
    // border-radius: 5px;
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
    &:focus {
      outline: none;
    }
    margin-bottom: 10px;
  }
  h3 {
    font-size: 20px;
    margin: 0;
    font-weight: 500;
  }
  .star-rating {
    // margin-bottom: 10px;
    .vue-star-rating-rating-text {
      font-size: 15px;
      margin: 0;
    }
  }
  .form-control {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .rating-label {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .rating-input {
    width: 32px;
    // height: 50px;
    height: 22px;
    font-size: 15px;
    border: 2px solid $review-color;
    padding: 2px 1px;
    border-radius: 5px;
    margin-right: 5px;
    // margin-bottom: 12px;
    // box-sizing: border-box;
  }
  .review-submit {
    background-color: $review-color;
    width: 90px;
    height: 33px;
    border-radius: 10px;
    font-size: 15px;
    border: none;
    color: white;
    transition: 300ms;
    &:hover {
      cursor: pointer;
      background-color: rgb(228, 212, 231);
      transition: 300ms;
    }
    // align-self: right;
    // align-content: right;
    // display: flex;
    // -webkit-box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
    // -moz-box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
    // box-shadow: 1px 1px 5px 0px rgba(224, 224, 224, 1);
  }
}
</style>
