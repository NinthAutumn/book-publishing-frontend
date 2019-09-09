<template>
  <div class="volume-form">
    <div class="volume-form__container" v-click-outside=" toggleVolume">
      <label for="title">タイトル</label>
      <input
        class="volume-form__title"
        type="text"
        v-model="volume.title"
        name="タイトル"
        placeholder="タイトル"
        max="50"
        v-validate="'required'"
        data-vv-as="タイトル"
      />
      <label for="title">情報</label>
      <textarea v-model="volume.description" class="volume-form__desc" placeholder="章の説明・あらすじ・情報"></textarea>
      <div class="divider flex flex--right">
        <button @click="createVolume" v-ripple type="submit" class="volume-open button">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    ptitle: String,
    pcontent: String
  },
  data() {
    return {
      volume: {
        title: "",
        description: "",
        book_id: 0
      },
      state: this.value
    };
  },
  async mounted() {
    this.volume.book_id = this.$route.params.id;
  },
  watch: {},
  methods: {
    ...mapMutations({
      toggleVolume: "TOGGLE_VOLUME"
    }),
    async createVolume() {
      const { error } = await this.$store.dispatch("chapter/postVolume", {
        volume: this.volume
      });
      if (error) {
        this.$toast.show(error, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1200,
          icon: "extension"
        });
      }
      await this.$store.dispatch("chapter/fetchChapterList", {
        bookId: this.$route.params.id,
        state: "published",
        structured: true
      });
      this.toggleVolume();
    }
  }
};
</script>

<style lang="scss">
.volume-form {
  display: flex;
  // width:
  width: 100%;
  height: 100%;
  position: fixed;
  border: none;
  z-index: 1000;
  left: 0;
  top: 0;
  $self: &;
  display: flex;
  align-items: center;
  justify-content: center;
  &__container {
    z-index: 1000;
    scroll-behavior: unset;
    // overflow: hidden;
    // height: 100%;
    width: 50rem;
    // margin-top: 4rem;
    background-color: white;
    -webkit-box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
  }
  .volume-open {
    width: 8rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    font-size: 1.5rem;
    height: 3.5rem;
    // border-radius: 0.8rem;
    &:active,
    &:focus {
      outline: none;
    }
  }
  flex-direction: column;
  textarea {
    height: 10rem;
    font-size: 1.6rem;
    padding: 10px 14px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d9d1dd;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    transition: 300ms;
    margin-bottom: 2rem;
    line-height: 2.8rem;
    &:active,
    &:focus {
      outline: none;
    }
  }
  &__title {
    height: 5rem;
    font-size: 1.6rem;
    padding: 10px 14px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d9d1dd;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    transition: 300ms;
    margin-bottom: 2rem;
    &:active,
    &:focus {
      outline: none;
    }
    &--error {
    }
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
}
</style>
