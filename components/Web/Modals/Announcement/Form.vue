<template>
  <div
    class="announcement-form dialog dialog__container"
    :class="{'announcement-form--disabled':!value}"
  >
    <transition name="grow-shrink">
      <div
        v-if="value"
        class="announcement-form__container dialog__content"
        v-click-outside="toggleModal"
      >
        <form @submit.prevent="submitHandler" class="announcement-form__form">
          <div class="flex-divider flex-column">
            <label for="title" class="announcement-form__label">タイトル</label>
            <input
              placeholder="読者への報告タイトル"
              v-model="form.title"
              name="title"
              v-validate="'required|max:100'"
              :error-messages="errors.collect('タイトル')"
              data-vv-name="タイトル"
              type="text"
              class="announcement-form__input"
            />
            <div class="flex-divider flex-row flex--right">
              <div class="announcement-form__count" v-text="`${form.title.length}/100`"></div>
            </div>
          </div>
          <div class="flex-divider flex-column">
            <label for="content" class="announcement-form__label">本文</label>
            <textarea
              placeholder="読者への報告本文"
              v-model="form.content"
              data-vv-name="本文"
              v-validate="'required|max:500'"
              name="content"
              class="announcement-form__input announcement-form__input--textarea"
            ></textarea>
            <div class="flex-divider flex-row flex--right">
              <div class="announcement-form__count" v-text="`${form.content.length}/500`"></div>
            </div>
          </div>
          <div class="announcement-form__error">{{errors.first('タイトル')||errors.first('本文')}}</div>
          <div class="flex-control flex-row flex--right">
            <button class="announcement-form__button" type="submit">投稿</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["value", "bookId"],
  data() {
    return {
      form: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggleAnnouncement");
    },
    async submitHandler() {
      try {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          const announcement = await this.$store.dispatch(
            "book/postAnnouncement",
            {
              bookId: this.bookId,
              content: this.form.content,
              title: this.form.title
            }
          );
          this.$emit("toggleAnnouncement");
        }
      } catch (error) {
        return this.$toast.show("報告の投稿に失敗しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1200
        });
      }
    }
  }
};
</script>

<style lang="scss">
.announcement-form {
  $self: &;
  &--disabled {
    visibility: hidden;
    transition: 300ms;
  }
  &__container {
    width: 40rem;
    #{$self}__count {
      font-size: 1.25rem;
      color: #6b7c93;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
    #{$self}__error {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
      color: orangered;
      margin-bottom: 1rem;
    }
    #{$self}__label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      font-variant: normal;
      -webkit-font-smoothing: antialiased;
      color: #6b7c93;
    }
    @keyframes slide-left {
      from {
        transform: translateX(10px);
      }
      to {
        transform: translate(0);
      }
    }
    #{$self}__input {
      &:focus {
        outline: none;
      }
      height: 40px;
      padding: 10px 12px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #e6ebf1;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      font-size: 1.6rem;
      animation: slide-left 300ms ease;
      &--textarea {
        height: 100px;
        resize: none;
      }
    }
    #{$self}__button {
      font-size: 1.5rem;
      padding: 0.5rem 2rem;
      border-radius: 0.4rem;
      color: #fff;
      background: #6772e5;

      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
