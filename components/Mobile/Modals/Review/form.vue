<template>
  <div class="mrf-modal dialog dialog__container" :class="{'mrf-modal--disabled':!value}">
    <transition appear name="slide-up">
      <div class="mrf-modal__container dialog__content" v-if="value">
        <div class="mrf-modal__nav flex-row flex--align flex--between">
          <div class="mrf-modal__back" v-ripple @click="$emit('toggleForm')">
            <fa class="mrf-modal__back-icon" icon="arrow-left"></fa>
          </div>
          <div class="mrf-modal__header" v-text="reviewed? 'レビューを編集する':'レビューを書く'"></div>
        </div>

        <label for="rating">評価</label>
        <div class="flex-divider flex-row flex--align flex--center">
          <v-rating name="rating" color="#FF8D29" :size="50" half-increments :value="form.rating"></v-rating>
        </div>
        <hr />
        <div class="flex-divider flex-column">
          <label for="title">タイトル</label>
          <input
            ref="title"
            class="mrf-modal__input"
            placeholder="タイトル"
            type="text"
            name="title"
            v-model="form.title"
          />
        </div>
        <!-- <label for="content"></label> -->
        <text-editor
          name="本文"
          placeholder="レビュー本文"
          class="mrf-modal__content"
          v-model="form.content"
          :content="oldReview.content"
          v-validate="'required||min:5'"
          data-vv-as="本文"
        ></text-editor>
        <div @click="handleUpload" class="mrf-modal__button" v-text="reviewed? '編集する':'投稿する'"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["value"],
  data() {
    return {
      form: {
        rating: 5,
        title: "",
        content: ""
      }
    };
  },
  components: {
    TextEditor: () => import("@/components/TextEditor")
  },
  async mounted() {
    await this.$store.dispatch("review/fetchIsReviewed", {
      bookId: this.$route.params.id
    });
    if (this.$refs.title) {
      this.$refs.title.focus();
    }
    if (this.reviewed) {
      await this.$store.dispatch("review/myReview", {
        bookId: this.$route.params.id
      });
      this.form.rating = this.oldReview.rating;
      this.form.content = this.oldReview.content;
      this.form.title = this.oldReview.title;
    }
  },
  methods: {
    async handleUpload() {
      try {
        if (!this.form.rating) {
          return this.$toast.error(
            this.reviewed
              ? "レビューの編集には投票が必要です"
              : "レビューを投稿するには投票が必要です"
          );
        }
        if (this.reviewed) {
          await this.$store.dispatch("review/updateReview", {
            id: this.oldReview.id,
            review: this.form
          });
          await this.$store.dispatch("review/showAll", {
            bookId: this.$route.params.id,
            page: 1,
            limit: 10,
            direction: "desc",
            type: 0
          });
        } else {
          await this.$store.dispatch("review/addReview", {
            review: this.form,
            bookId: this.$route.params.id
          });
          await this.$store.dispatch("review/showAll", {
            bookId: this.$route.params.id,
            page: 1,
            limit: 10,
            direction: "desc",
            type: 0
          });
        }
        this.$toast.success(
          this.reviewed
            ? "レビューの編集に成功しました"
            : "レビューの投稿に成功しました"
        );

        await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          page: 1,
          limit: 10,
          type: 0,
          preview: true
        });
        this.$emit("toggleForm");
      } catch (error) {
        this.$toast.error(
          this.reviewed
            ? "レビューの編集に失敗しました"
            : "レビューの投稿に失敗しました"
        );
      }
    }
  },
  computed: {
    ...mapGetters({
      reviewed: "review/isReviewed",
      oldReview: "review/getMyReview"
    })
  }
};
</script>

<style lang="scss">
.mrf-modal {
  $self: &;
  max-height: 100%;
  &--disabled {
    visibility: hidden;
    transition: 200ms;
  }
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #{$self}__nav {
      height: 4.5rem;
      min-height: 4.5rem;
      #{$self}__back {
        font-size: 1.6rem;
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #{$self}__header {
        font-size: 1.6rem;
      }
    }
    label {
      font-size: 1.6rem;
      color: #2e2e2f;
    }
    #{$self}__input {
      padding: 0.5rem 1rem;
      font-size: 1.9rem;
      &:active,
      &:focus {
        outline: none;
      }
    }
    hr {
      margin: 1rem 0;
    }
  }

  &__form {
    // height: 100%;
    max-height: 100%;
  }
  &__button {
    border-radius: 0.5rem;
    font-size: 1.4rem;
    height: 5rem;
    background-color: #2a2f45;
    color: white;
    width: 100%;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    // height: 100%;
    border: 0 !important;
    .text-editor__count {
      display: none;
    }

    textarea {
      font-size: 1.7rem;
      border: 0 !important;

      height: 100% !important;
    }
  }
}
</style>
