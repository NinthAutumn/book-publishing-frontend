<template>
  <div class="reading-modal dialog dialog__container">
    <div
      class="reading-modal__container flex-column flex--between dialog__content"
      v-click-outside="toggle"
    >
      <div class="reading-modal__header">保存先...</div>
      <div class="reading-modal__list">
        <item-component :bookId="selected" v-for="list in reading" :key="list.key" :list="list"></item-component>
      </div>
      <div class="reading-modal__button" v-ripple v-if="!form" @click="form = !form">
        <fa icon="plus" style="margin-right:0.5rem"></fa>新しいリーディングリストを作成
      </div>
      <div class="reading-modal__form" v-if="form">
        <input
          class="reading-modal__input"
          v-model="title"
          maxlength="100"
          type="text"
          placeholder="リストタイトル*"
        />
        <textarea
          class="reading-modal__textarea"
          v-model="description"
          maxlength="400"
          type="text"
          placeholder="リスト情報"
        />
        <div class="flex-divider flex-row flex--align flex--right" style="width:100%">
          <div
            class="reading-modal__button reading-modal__button--small"
            @click="createReadingListHander"
          >作成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      toggle: "reading/TOGGLE_STATE"
    }),
    async createReadingListHander() {
      if (this.title.length < 1) {
        return this.$toast.error("タイトルは必要です");
      }
      try {
        const data = await this.$store.dispatch("reading/setReadingList", {
          title: this.title,
          description: this.description
        });

        await this.$store.dispatch("reading/addBookToReadingList", {
          id: data.id,
          book: {
            book_id: this.selected
          }
        });
        await this.$store.dispatch("reading/fetchMyReadingListWithoutBooks", {
          id: this.selected
        });
      } catch (error) {}
      this.form = !this.form;
    }
  },
  components: {
    ItemComponent: () => import("./Item")
  },
  data() {
    return {
      form: false,
      title: "",
      description: ""
    };
  },
  computed: {
    ...mapGetters({
      reading: "reading/getUserReadingListWithoutBook",
      selected: "reading/getSelectedBook"
    })
  },
  async mounted() {
    await this.$store.dispatch("reading/fetchMyReadingListWithoutBooks", {
      id: this.selected
    });
  }
};
</script>

<style lang="scss">
.reading-modal {
  $self: &;
  &__container {
    min-height: 20rem;
    #{$self}__list {
      max-height: 30rem;
      flex-grow: 1;
      // margin-bottom: auto;
      padding: 0.5rem 1rem;
    }
    #{$self}__header {
      font-size: 1.7rem;
      margin-bottom: 0.5rem;
    }
    #{$self}__form {
      margin-top: 1rem;
      width: 100%;
      border-top: 1px solid grey;
      #{$self}__input {
        &:active,
        &:focus {
          outline: none;
        }
        padding: 1.2rem 1rem;
        width: 100%;
        background-color: #fff;
        font-size: 1.6rem;
      }
      #{$self}__textarea {
        padding: 1.2rem 1rem;
        height: 10rem;
        width: 100%;
        font-size: 1.4rem;
        &:active,
        &:focus {
          outline: none;
        }
      }
    }

    #{$self}__item {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      // justify-content: cente;
      .v-input__slot {
        margin: 0 !important;
      }
      .v-input--selection-controls__ripple {
        // margin: 0 !important;
      }
      .v-input {
        margin: 0 !important;
        padding: 0 !important;
      }
      .v-messages {
        display: none;
      }
      #{$self}__checkbox {
        margin-right: 1rem;
      }
      #{$self}__title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.6rem;
      }
    }
    #{$self}__button {
      font-size: 1.6rem;
      user-select: none;
      border-radius: 0.5rem;
      &--small {
        padding: 0.5rem 2rem !important;
        color: white;
        background-color: $secondary;
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
      &:hover {
        cursor: pointer;
      }
      padding: 1rem 2rem;
    }
  }
}
</style>
