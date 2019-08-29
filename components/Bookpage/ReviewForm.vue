<template>
  <form class="review-form" @submit.prevent="addReview">
    <!-- <label for="title">Title</label> -->
    <input
      class="review-form__title"
      type="text"
      v-model="review.title"
      name="タイトル"
      placeholder="タイトル"
      max="50"
      v-validate="'required'"
      data-vv-as="タイトル"
      :class="{'review-form__title--error':errors.first('タイトル')}"
    />
    <div class="form-control">
      <v-rating
        color="#FF8D29"
        :hover="true"
        :half-increments="true"
        v-model="review.rating"
        :clearable="true"
      ></v-rating>
    </div>
    <text-editor
      name="本文"
      placeholder="レビュー本文"
      :content="pcontent"
      class="review-form__content"
      v-model="review.content"
      v-validate="'required||min:5'"
      data-vv-as="本文"
    ></text-editor>
    <span class="help is-danger">{{ errors.first('本文')}}</span>
    <div class="divider flex flex--right">
      <button v-ripple type="submit" class="review-open button">投稿</button>
    </div>
  </form>
</template>

<script>
// import TextEditor from ;
export default {
  props: {
    ptitle: String,
    pcontent: String,
    prating: Number,
    reviewed: Boolean
  },
  data() {
    return {
      review: {
        title: this.ptitle,
        content: "",
        rating: this.prating
      },
      state: this.value,
      text: ""
    };
  },
  components: {
    TextEditor: () => import("@/components/TextEditor")
  },
  watch: {},
  methods: {
    async addReview() {
      if (this.reviewed) {
        try {
          await this.$store.dispatch("review/updateReview", {
            id: this.$store.state.review.myReview.id,
            review: this.review
          });
          await this.$store.dispatch("review/showAll", {
            bookId: this.$route.params.id,
            userId: this.$store.getters["auth/getUser"].id,
            page: 1,
            limit: 10,
            direction: "desc",
            type: "likes"
          });
        } catch (error) {
          this.$toast.show("レビューの投稿に失敗しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 1000,
            icon: "extension"
          });
          error;
        }
      } else {
        try {
          if (!this.review.rating) {
            this.$toast.error("レビューを投稿するには投票が必要です");
          }
          await this.$store.dispatch("review/addReview", {
            review: this.review,
            bookId: this.$route.params.id
          });
          await this.$store.dispatch("review/showAll", {
            bookId: this.$route.params.id,
            userId: this.$store.getters["auth/getUser"].id,
            page: 1,
            limit: 10,
            direction: "desc",
            type: "likes"
          });
          this.$toast.show("レビューの投稿に成功しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 1000,
            icon: "extension"
          });

          this.$emit("input", false);
        } catch (error) {
          this.$toast.show("レビューの投稿に失敗しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 1000,
            icon: "extension"
          });
          // (error);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.review-form {
  display: flex;
  .review-open {
    // width: 8rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
    // height: 3.5rem;
    // border-radius: 0.8rem;
  }
  flex-direction: column;
  &__title {
    height: 50px;
    font-size: 18px;
    // width: 410px;
    width: 100%;
    padding: 12px;
    // border: 2px solid $review-color;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 4px;
    // border-radius: 0.8rem;
    box-sizing: border-box;
    margin-bottom: 10px;
    background-color: #fff;
    &--error {
    }
  }
  &__content-editor {
    margin-bottom: 10px;
  }
  &__content {
    height: 300px;
    background-color: #fff;
    // padding: 5px;
    // width: 100%;
    // border-radius: 0.8rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 4px;

    textarea {
      border: 0px solid white !important;
      border-radius: 4px;
    }

    // border: 2px solid $review-color;
    // border-radius: 5px;
    // box-sizing: border-box;
    // resize: none;
    // font-size: 14px;
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
  .v-rating {
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    background-color: #fff;
    // border-radius: 0.8rem;
    border-radius: 4px;

    padding: 0.5rem 1rem;
  }
  .review-submit {
    background-color: $review-color;
    width: 90px;
    height: 33px;
    // border-radius: 10px;
    font-size: 15px;
    border: none;
    color: white;
    transition: 300ms;
    &:hover {
      cursor: pointer;
      background-color: rgb(228, 212, 231);
      transition: 300ms;
    }
  }
}
</style>
