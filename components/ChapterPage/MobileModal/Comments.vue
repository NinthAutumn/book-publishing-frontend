<template>
  <div class="mobile-comment" :class="`mobile-comment--${theme}`" v-touch:swipe.right="toggleModal">
    <div class="mobile-comment__header">
      <div class="mobile-comment__back" v-ripple @click="toggleModal">
        <fa icon="arrow-left"></fa>
      </div>
      <div class="mobile-comment__title">コメント欄</div>
    </div>
    <div class="mobile-comment__list">
      <Comment
        @create="toggleComment"
        :comment="comment"
        :chapter="chapter"
        v-for="comment in comments"
        :key="comment.id"
      ></Comment>
      <div class="mobile-comment__none" v-if="comments.length < 1">
        <div class="mobile-comment__non-title">コメントがありません</div>
        <div class="mobile-comment__svg">
          <svg-icon class="mobile-comment__empty-svg" name="empty"></svg-icon>
        </div>
      </div>
    </div>
    <div class="mobile-comment__form">
      <div class="mobile-comment__input" @click.stop="toggleComment({parent_id:false})">コメントを追加</div>
    </div>
    <transition name="slide-up">
      <div v-if="modal" class="mobile-comment__form-modal" v-click-outside="toggleComment">
        <div class="mobile-comment__modal-title">コメントを追加</div>
        <textarea
          class="mobile-comment__textarea"
          v-model="content"
          ref="form"
          placeholder="コメントを書く"
        ></textarea>
        <div
          class="mobile-comment__button"
          @click="createComment"
          v-ripple
          v-text="parent_id ? '返信': '投稿'"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    chapter: Object,
    theme: String
  },
  data() {
    return {
      modal: false,
      parent_id: null,
      content: ""
    };
  },
  computed: {
    ...mapGetters({
      comments: "comment/getComments"
    })
  },
  methods: {
    toggleModal() {
      this.$emit("toggle", 4);
    },
    toggleComment({ parent_id }) {
      this.modal = !this.modal;
      if (parent_id) {
        this.parent_id = parent_id;
      } else {
        this.parent_id = null;
      }
      if (this.modal) {
        setTimeout(() => {
          if (this.$refs.form) {
            this.$refs.form.focus();
            clearTimeout();
          }
        }, 1);
      }
    },
    async createComment() {
      try {
        // console.log(this.parent_id);

        if (this.parent_id) {
          await this.$store.dispatch("comment/addCommentMobile", {
            bookId: this.$route.params.id,
            chapterId: this.$route.params.chaptersId,
            content: this.content,
            parentId: this.parent_id
          });
        } else {
          await this.$store.dispatch("comment/addCommentMobile", {
            bookId: this.$route.params.id,
            chapterId: this.$route.params.chaptersId,
            content: this.content
            // parentId: this.parent_id
          });
        }
        await this.$store.dispatch("comment/fetchMobileComments", {
          chapterId: this.$route.params.chaptersId
        });
        this.modal = !this.modal;
        this.content = null;
        this.parent_id = null;
      } catch (error) {
        console.log(error);
        return this.$toast.show("返信の投稿に失敗しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });
      }
    }
  },
  components: {
    Comment: () => import("./Comment")
  },
  async mounted() {
    await this.$store.dispatch("comment/fetchMobileComments", {
      chapterId: this.$route.params.chaptersId
    });
  }
};
</script>

<style lang="scss">
.mobile-comment {
  $self: &;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: fixed;
  z-index: 100;
  // position
  top: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  // align-items:center;
  // justify-content: space-between;
  flex-direction: column;

  &--default {
    background: url("../../../assets/noise/noise-default-container.png");
    border-color: #dae0e6;

    #{$self}__header {
      background-color: black;
      color: #d7dadc;
    }
  }
  &--black {
    background-color: rgb(53, 53, 53);
    border-color: black;
    #{$self}__form-modal {
      background-color: black;
    }
    #{$self}__form {
      background-color: black;
      #{$self}__input {
        background-color: rgb(53, 53, 53);
      }
    }
  }
  &--tan {
    background: url("../../../assets/noise/noise-tan-container.png");
    border-color: #eed368;
    #{$self}__header {
      background-color: #e9e1b8;
      // color:blac
    }
    #{$self}__form-modal {
      background-color: #e9e1b8;
    }
    #{$self}__form {
      background-color: #e9e1b8;
      #{$self}__input {
        border-color: #eed368;
        border: 1px solid;
        background: url("../../../assets/noise/noise-tan-container.png");
      }
    }
  }
  &--ruby {
    background: url("../../../assets/noise/noise-ruby-container.png");
    border-color: red;
  }
  &--sapphire {
    background: url("../../../assets/noise/noise-sapphire-container.png");
    border-color: blue;
  }
  &__none {
    display: flex;
    flex-direction: column;
    align-items: center;
    #{$self}__non-title {
      font-size: 2.5rem;
      opacity: 0.8;
    }
    #{$self}__svg {
      // font-size: 50vw;
      #{$self}__empty-svg {
        width: 100%;
      }
    }
  }
  &__list {
    padding: 1rem;
    padding-bottom: 5rem;
    justify-self: flex-start;
    overflow: auto;
  }
  &__header {
    height: 5rem;
    // background-color: black;
    // color: #d7dadc;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    #{$self}__back {
      font-size: 2.5rem;
      margin-right: 3rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }
  }
  &__form-modal {
    position: absolute;
    height: 20rem;
    background-color: #fff;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 -1px #e3e8ee;
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    #{$self}__modal-title {
      font-size: 1.4rem;
      padding: 0.2rem 1.2rem;
    }
    #{$self}__button {
      align-self: flex-end;
      font-size: 1.5rem;
      padding: 0.75rem 3rem;
      background-color: #566cd6;
      color: white;
      border-radius: 2rem;
    }
    textarea {
      font-size: 1.6rem;
      height: 15rem;
      padding: 1rem 1.2rem;
      width: 100%;
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  &__form {
    height: 5rem;
    // align-self: flex-end;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.75rem 1rem;
    #{$self}__input {
      height: 100%;
      // border: 1px solid;
      background-color: #e3e8ee;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      width: 100%;
      border-radius: 2rem;
      padding: 0 1rem;
    }
  }
}
</style>
