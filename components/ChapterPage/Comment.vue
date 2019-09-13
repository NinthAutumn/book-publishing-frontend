<template>
  <section class="comment-modal">
    <article class="comment-modal__container" v-if="showChildren">
      <div
        :id="`#comment${comment.id}`"
        :style="indent"
        class="divider flex-row"
        :class="{'comment-modal__selected':$route.query.comment === `${comment.id}`}"
      >
        <a :href="`#comment${comment.id}`"></a>
        <div class="comment-modal__avatar flex-column flex--align flex--left">
          <v-avatar size="40" v-if="!comment.deleted">
            <v-img v-if="comment.user_id === chapter.author_id" :src="comment.author_avatar"></v-img>
            <v-img v-else :src="comment.avatar? comment.avatar:avatar"></v-img>
          </v-avatar>
        </div>
        <div class="comment-modal__div">
          <div class="comment-modal__content">
            <div
              class="comment-modal__divider flex-row flex--align"
              @mouseenter="contentFalse"
              @mouseleave="contentTrue"
            >
              <div
                class="comment-modal__username"
                v-if="comment.user_id === chapter.author_id"
              >{{comment.pen_name}}</div>
              <div class="comment-modal__username" v-else>{{comment.username}}</div>
              <div
                class="comment-modal__author"
                v-if="$store.state.book.author === comment.username"
              ></div>

              <div
                class="comment-modal__likes"
                :class="{'comment-modal__likes--blue': blue}"
              >{{likeNumber}}</div>
              <div
                class="comment-modal__createdAt"
                @click="toggleChildren"
              >・{{$moment(comment.created_at).startOf('minute').fromNow()}}</div>
              <div class="hide-content" v-if="!hideContent" @click="toggleChildren">
                <fa icon="anchor"></fa>
              </div>
            </div>
            <div class="comment-modal__subject flex-row" v-if="!edit">
              <div class="content deleted" v-if="comment.deleted">[削除されました]</div>
              <div class="content" v-else>{{current}}</div>
            </div>
            <div class="comment-modal__subject" v-else>
              <textarea v-model="editContent"></textarea>
              <div class="flex-divider flex-row flex--right">
                <button
                  type
                  class="comment-form__submit comment-form__submit--cancel"
                  @click="cancelEdit"
                >キャンセル</button>
                <button @click="patchComment" class="comment-form__submit">更新</button>
              </div>
            </div>
            <div v-if="!comment.deleted&&!edit" class="comment-modal__operations flex flex--align">
              <div class="comment-modal__rate">
                <div
                  class="comment-modal__rate__item comment-modal__rate__item--like"
                  @click.stop="likedComment"
                >
                  <fa icon="thumbs-up" class :class="{liked: liked}"></fa>
                </div>
                <div
                  class="comment-modal__rate__item comment-modal__rate__item--dislike"
                  @click.stop="dislikedComment"
                >
                  <fa icon="thumbs-up" :class="{disliked: disliked}"></fa>
                </div>
              </div>
              <div class="comment-modal__reply" @click.stop="replyOpen">
                <fa icon="comment-alt" style="transform:rotateY(180deg);margin-right:2px;"></fa>返信
              </div>
              <div class="comment-modal__media">シェア</div>
              <div class="comment-modal__report" @click.stop="reportOpen">報告</div>
              <div v-if="logged">
                <div
                  v-if="user.id === comment.user_id"
                  class="comment-modal__edit"
                  @click="edit= !edit"
                >編集</div>
              </div>
            </div>
          </div>
          <form
            @submit.prevent="addComment"
            class="comment-reply-form flex-column"
            v-if="replyForm"
          >
            <textarea required v-model="content" placeholder="コメントを書く"></textarea>
            <div class="divider flex-row flex--right">
              <button class="comment-form__submit">投稿</button>
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
      <transition name="grow-shrink">
        <div v-if="report.state" class="report-comment dialog dialog__container">
          <div v-click-outside="reportOpen" class="report-comment__container dialog__content">
            <div v-loading="loading" @submit.prevent class="report-comment__form flex-column">
              <label class="flex-row flex--between flex--align">
                報告の理由
                <span>
                  <fa @click="reportOpen" class="report-comment__close" icon="times"></fa>
                </span>
              </label>
              <v-radio-group v-model="report.problem">
                <v-radio v-for="n in problems" :key="n" :label="n" :value="n"></v-radio>
              </v-radio-group>
              <textarea
                v-model="report.moreInfo"
                placeholder="詳しく報告の理由"
                v-if="report.problem === 'その他'"
                name="problem"
                id
              ></textarea>
              <div class="flex-divider flex-row report-comment__button">
                <button
                  class="report-comment__submit report-comment__submit--close"
                  @click="reportOpen"
                >キャンセル</button>
                <button class="report-comment__submit" @click="reportHandler">報告</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </article>
    <div class="comment-modal__closed" v-else>
      <div :style="indented" class="container">
        <div class="open-comment" @click="toggleChildren">
          <div class="comment-modal__divider flex flex--align">
            <Zondicon class="open-comment__icon" icon="add-solid" style="width:14px;"></Zondicon>
            <div class="comment-modal__username">{{comment.username}}</div>
            <div class="comment-modal__likes">{{comment.likes}}</div>
            <div
              class="comment-modal__createdAt"
            >・{{$moment(comment.created_at).startOf('minute').fromNow()}}</div>
            <div class="comment-modal__child-count">(返事{{comment.children.length}}個)</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "comment-modal",
  props: {
    children: Array,
    comment: Object,
    depth: Number
  },
  data() {
    return {
      showChildren: true,
      hideContent: true,
      content: "",
      replyForm: false,
      current: this.comment.content,
      liked: this.comment.voted > 0,
      disliked: this.comment.voted < 0,
      likeNumber: this.comment.likes,
      edit: false,
      editContent: this.comment.content,
      report: {
        state: false,
        problem: "",
        moreInfo: ""
      },
      problems: [
        "差別的または攻撃的な内容",
        "テロリズムの助長",
        "スパムや誤解を招く話",
        "児童虐待",
        "その他"
      ],
      loading: false,
      avatar: require("~/assets/img/profile.png")
    };
  },
  watch: {
    comment: function(val) {
      this.liked = this.comment.voted > 0;
      this.disliked = this.comment.voted < 0;
      this.likeNumber = this.comment.likes;
      this.editContent = this.comment.content;
      this.current = this.comment.content;
    }
  },
  computed: {
    indent() {
      return { "padding-left": `${this.depth * 30}px` };
    },
    indented() {
      return { "padding-left": `${this.depth * 30}px` };
    },
    blue() {
      return this.likeNumber < 1;
    },
    ...mapGetters({
      theme: "user/getTheme",
      logged: "isAuthenticated",
      user: "auth/getUser",
      chapter: "chapter/getChapter"
    })
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
    reportOpen() {
      this.report.state = !this.report.state;
    },
    replyOpen() {
      if (this.$store.getters["auth/isAuthenticated"]) {
        this.replyForm = !this.replyForm;
      } else {
        this.$store.commit("LOGIN_STATE");
      }
    },
    async reportHandler() {
      try {
        const report = {
          type: "chapter",
          type_id: this.comment.id,
          problem: this.report.problem,
          more_info: this.report.moreInfo
        };

        this.loading = true;
        await this.$store.dispatch("report/postReport", { report });
        this.loading = false;
        this.problem = !this.problem;
        return this.$toast.show("報告に成功しました", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 1000,
          icon: "check_circle"
        });
      } catch (error) {
        return this.$toast.show("報告に失敗しました", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 1000,
          icon: "extension"
        });
      }
    },
    async patchComment() {
      let comment = {
        content: this.editContent,
        id: this.comment.id
      };
      this.current = this.editContent;
      await this.$store.dispatch("comment/patchComment", { comment });
      this.edit = false;
    },
    cancelEdit() {
      this.editContent = this.current;
      this.edit = false;
    },
    async addComment() {
      const bookId = this.$route.params.id;
      const chapterId = this.$route.params.chaptersId;
      const content = this.content;
      const parentId = this.comment.id;
      try {
        const { error, code } = await this.$store.dispatch(
          "comment/addComment",
          {
            bookId,
            chapterId,
            content,
            parentId
          }
        );
        if (error) {
          return this.$toast.error(error);
        }
        this.$toast.show("返信の投稿に成功しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });

        this.replyForm = false;
        this.content = "";
      } catch (error) {
        this.$toast.error("返信の投稿に失敗しました");
      }
    },
    async likedComment() {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (this.liked) {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 0
        });
        this.likeNumber--;
        this.liked = false;
      } else {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 1
        });
        this.liked = true;
        if (this.disliked) {
          this.likeNumber = this.likeNumber + 2;
          this.disliked = false;
        } else {
          this.likeNumber++;
        }
      }
    },
    async dislikedComment() {
      if (!this.$store.getters["auth/isAuthenticated"]) {
        return this.$store.commit("LOGIN_STATE");
      }
      if (this.disliked) {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: 0
        });
        this.likeNumber++;
        this.disliked = false;
      } else {
        await this.$store.dispatch("comment/likeComment", {
          commentId: this.comment.id,
          data: -1
        });
        this.disliked = true;
        if (this.liked) {
          this.likeNumber = this.likeNumber - 2;
          this.liked = false;
        } else {
          this.likeNumber--;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.comment-reply-form {
  textarea {
    border-radius: 0.4rem;
    resize: none;
    border: 2px solid;
    height: 75px;
    margin-bottom: 5px;
    margin-top: 1rem;
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
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
@keyframes godown {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
.comment-modal {
  font-size: 14px;
  // display: inline-block;
  $self: &;
  &__selected {
    // background-color: rgb(238, 238, 238);
    position: relative;
    &::after {
      content: "";
      top: 0;
      right: 0;
      width: 8px;
      height: 8px;
      border-radius: 10rem;
      background-color: $primary;
    }
    #{$self}__div {
      // background-color: #fff;
    }
  }
  textarea {
    animation: godown 300ms ease-out;
    animation-fill-mode: backwards;
    border-radius: 0.4rem;
    resize: none;
    border: 2px solid;
    height: 75px;
    margin-bottom: 5px;
    margin-top: 1rem;
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  // overflow: hidden;/
  &__avatar {
    margin-right: 1rem;
    width: 4rem;
  }
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
    // width: 20px;
    display: flex;
    margin-right: 10px;
    &__item {
      &:hover {
        cursor: pointer;
      }
      &--like {
        font-size: 1.2rem;
        margin-right: 0.5rem;
        &:hover {
          color: orangered;
        }
      }
      &--dislike {
        font-size: 1.2rem;
        transform: rotate(180deg) translateY(-3px);
        &:hover {
          color: #7193ff;
        }
      }
      .liked {
        color: orangered;
      }
      .disliked {
        color: #7193ff;
      }
    }
  }
  &__username {
    font-size: 14px;
    margin-right: 10px;
    // color: $primary;
  }
  &__child-count {
    font-size: 12px;
    margin-right: 10px;
    // color: $primary;
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
    .content {
      font-size: 1.4rem;
    }
    .deleted {
      font-size: 1.2rem;
    }
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
  &__edit {
    font-size: 12px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }
}
.report-comment {
  $self: &;
  .v-label {
    line-height: 25px;
  }
  #{$self}__container {
    border-radius: 2rem;
    max-width: 95%;
    // bottom: ;
    #{$self}__form {
      font-size: 3vh;

      span {
        padding: 0.5rem 0.75rem;
        border-radius: 10rem;
        background-color: #e3e8ee;
      }
      #{$self}__close {
        font-size: 2vh;
        color: #4f566b;
      }
      label {
        font-size: 3vh;
      }
      textarea {
        font-size: 3vh;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
      #{$self}__button {
        width: 100%;
        height: 7vh;
        border-radius: 1rem;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      #{$self}__submit {
        font-size: 3vh;
        // align-self: flex-end;
        // padding: 0 2rem;
        width: 50%;
        background-color: #566cd6;
        color: white;
        &--close {
          background-color: white;
          color: #566cd6;
          // align-self: flex-start;
        }
      }
    }

    // background-color:;
  }
}
</style>
