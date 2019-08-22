<template>
  <div class="mrf-modal dialog dialog__container" :class="{'mrf-modal--disabled':!value}">
    <transition appear name="slide-up">
      <div class="mrf-modal__container dialog__content" v-if="value">
        <div class="mrf-modal__nav flex-row flex--align flex--between">
          <div class="mrf-modal__back" v-ripple @click="$emit('toggleForm')">
            <fa class="mrf-modal__back-icon" icon="arrow-left"></fa>
          </div>
          <div class="mrf-modal__header">レビューを書く</div>
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
        <!-- <hr /> -->
        <label for="content"></label>

        <text-editor
          name="本文"
          placeholder="レビュー本文"
          class="mrf-modal__content"
          v-model="form.content"
          v-validate="'required||min:5'"
          data-vv-as="本文"
        ></text-editor>
        <div class="mrf-modal__button">投稿する</div>
      </div>
    </transition>
  </div>
</template>

<script>
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
  mounted() {
    if (this.$refs.title) {
      this.$refs.title.focus();
    }
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
