<template>
  <section class="comment-modal">
    <article class="comment-modal__container" v-if="showChildren">
      <div :style="indent" class="divider flex">
        <div class="comment-modal__rate flex flex-column flex--align flex--left">
          <div class="rate-up" @click="likedComment">
            <no-ssr>
              <Zondicon
                :class="{'comment-like--black': theme==='black', 'comment-like--liked': liked}"
                class="comment-like"
                icon="arrow-thick-up"
              ></Zondicon>
            </no-ssr>
          </div>
          <div class="rate-down" @click="dislikedComment">
            <no-ssr>
              <Zondicon
                :class="{'comment-dislike--black': theme==='black','comment-dislike--disliked': disliked}"
                class="comment-dislike"
                icon="arrow-thick-down"
              ></Zondicon>
            </no-ssr>
          </div>
        </div>
        <div class="comment-modal__div">
          <div class="comment-modal__content">
            <div
              class="comment-modal__divider flex-row flex--align"
              @mouseenter="contentFalse"
              @mouseleave="contentTrue"
            >
              <div class="comment-modal__username">{{comment.userId.username}}</div>
              <div
                class="comment-modal__author"
                v-if="$store.state.book.author === comment.userId.username"
              ></div>
              <div class="comment-modal__likes" :class="{blue: blue}">{{likeNumber}}</div>
              <div
                class="comment-modal__createdAt"
                @click="toggleChildren"
              >・{{$moment(comment.createdAt).startOf('minute').fromNow()}}</div>
              <div class="hide-content" v-if="!hideContent" @click="toggleChildren">
                <fa icon="anchor"></fa>
              </div>
            </div>
            <div class="comment-modal__subject flex">
              <div class="content">{{comment.content}}</div>
            </div>
            <div class="comment-modal__operations flex flex--align">
              <div class="comment-modal__reply" @click="replyOpen">
                <fa icon="comment-alt" style="transform:rotateY(180deg);margin-right:2px;"></fa>返信
              </div>
              <div class="comment-modal__media">シェア</div>
              <div class="comment-modal__report">レポート</div>
            </div>
          </div>
          <form
            @submit.prevent="addComment"
            class="comment-reply-form flex-column"
            v-if="replyForm"
          >
            <textarea
              required
              v-model="content"
              class="form-input comment-reply-content"
              placeholder="コメントを書く"
            ></textarea>
            <div class="divider flex-row flex--right">
              <input
                type="submit"
                class="form-submit form-submit--primary comment-form__submit flex--align flex-row flex--center"
                value="投稿"
              >
            </div>
          </form>
        </div>
      </div>

      <div class="comment-children flex flex-column">
        <comment-modal
          v-for="(child, index) in children"
          :children="child.children"
          :comment="child"
          :key="index"
          :depth="depth + 1"
        ></comment-modal>
      </div>
    </article>
    <div class="comment-modal__closed" v-else>
      <div :style="indented" class="container">
        <div class="open-comment" @click="toggleChildren">
          <div class="comment-modal__divider flex flex--align">
            <Zondicon class="open-comment__icon" icon="add-solid" style="width:14px;"></Zondicon>
            <div class="comment-modal__username">{{comment.userId.username}}</div>
            <div class="comment-modal__likes">{{comment.likes}}</div>
            <div
              class="comment-modal__createdAt"
            >・{{$moment(comment.createdAt).startOf('minute').fromNow()}}</div>
            <div class="comment-modal__child-count">(返事{{comment.children.length}}個)</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "comment-modal",
  props: { children: Array, comment: Object, depth: Number },
  data() {
    return {
      showChildren: true,
      hideContent: true,
      content: "",
      replyForm: false,
      liked: this.comment.liked,
      disliked: this.comment.disliked,
      likeNumber: this.comment.likes
    };
  },
  computed: {
    indent() {
      return { "padding-left": `${this.depth * 30}px` };
    },
    indented() {
      return { "padding-left": `${this.depth * 30}px` };
    },
    blue() {
      return this.comment.likes < 1;
    },
    theme() {
      return this.$store.state.user.theme;
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
      this.hideContent = true;
    },
    contentFalse() {
      this.hideContent = false;
    },
    contentTrue() {
      this.hideContent = true;
    },
    replyOpen() {
      this.replyForm = !this.replyForm;
    },
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      const content = this.content;
      const parent = this.comment._id;
      await this.$store
        .dispatch("comment/addComment", {
          bookId,
          chapterId,
          content,
          parent
        })
        .then(async () => {
          this.$message({
            message: "返信の投稿に成功しました",
            type: "success"
          });
          await this.$store.dispatch("comment/getComments", {
            chapterId: this.$route.params.chaptersId
          });
          this.replyForm = false;
          this.content = "";
        })
        .catch(() => {
          this.$message({
            message: "返信の投稿に成功しました",
            type: "error"
          });
        });
    },
    async likedComment() {
      if (this.liked) {
        this.liked = false;
        this.$store.dispatch("comment/unLikeComment", {
          commentId: this.comment._id,
          type: "like"
        });
        this.likeNumber--;
      } else {
        this.liked = true;
        if (this.disliked) {
          this.disliked = false;
          await this.$store.dispatch("comment/unLikeComment", {
            commentId: this.comment._id,
            type: "dislike"
          });
          this.likeNumber++;
        }
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment._id,
          type: "like"
        });
        this.likeNumber++;
      }
    },
    async dislikedComment() {
      if (this.disliked) {
        this.disliked = false;

        await this.$store.dispatch("review/unLikeComment", {
          commentId: this.comment._id,
          type: "dislike"
        });
        this.likeNumber++;
      } else {
        this.disliked = true;

        if (this.liked) {
          this.liked = false;
          await this.$store.dispatch("review/unLikeComment", {
            commentId: this.comment._id,
            type: "like"
          });
          this.likeNumber--;
        }
        await this.$store.dispatch("review/likeComment", {
          commentId: this.comment._id,
          type: "dislike"
        });
        this.likeNumber--;
      }
    }
  }
};
</script>

<style lang="scss">
.comment-reply-form {
  .comment-reply-content {
    border: 2px solid #b4b7b9;
    resize: none;
    height: 75px;
    margin-bottom: 5px;
    font-size: 12px;
    &:focus {
      outline: none;
    }
  }
}
.content {
  font: inherit;
}
.comment-like {
  &--liked {
    fill: orangered;
  }
  &--black {
    fill: rgb(215, 218, 220);
  }
  &:hover {
    fill: rgb(218, 76, 76);
    cursor: pointer;
  }
}
.comment-dislike {
  &--disliked {
    fill: #7193ff;
  }
  &--black {
    fill: rgb(215, 218, 220);
  }
  &:hover {
    fill: rgb(98, 98, 240);
    cursor: pointer;
  }
}
.hide-content {
  margin-left: 5px;
  font-size: 14px;
  color: $secondary;
  &:hover {
    cursor: pointer;
  }
}
.comment-header {
  font-size: 20px;
}
.open-comment {
  font-size: 13px;
  color: $primary;
  // margin-left
  &__icon {
    fill: $primary;
    margin-right: 10px;
    // width: 20px;
    margin-left: 3px;
  }
  &:hover {
    cursor: pointer;
  }
}

.rate-down {
  // font-size: 14px;
  width: 18px;
}
.rate-up {
  width: 18px;
}

.comment-modal {
  font-size: 14px;
  // display: inline-block;

  // overflow: hidden;/
  &__container {
    width: 100%;

    .divider {
      margin-bottom: 10px;
    }
  }
  &__divider {
    &:hover {
      // cursor: pointer;
    }
  }
  &__div {
    width: 100%;
  }
  &__rate {
    width: 20px;
    margin-right: 10px;
  }
  &__username {
    font-size: 14px;
    margin-right: 10px;
    color: $primary;
  }
  &__child-count {
    font-size: 12px;
    margin-right: 10px;
    color: $primary;
  }
  &__likes {
    font-size: 13px;
    margin-right: 10px;
  }
  &__createdAt {
    font-size: 12px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  &__subject {
    font-size: 14px;
    line-height: 24px;
    // &:hover {
    //   cursor: pointer;
    // }
  }
  &__operations {
  }
  &__reply {
    font-size: 12px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      color: $secondary;
    }
  }
  &__media {
    font-size: 12px;
    margin-right: 10px;
  }
  &__report {
    font-size: 12px;
    margin-right: 10px;
  }
}
</style>
