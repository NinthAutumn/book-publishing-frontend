<template>
  <div class="comment-modal" v-if="showChildren">
    <div :style="indent" class="comment-modal__container">
      <div class="comment-modal__rate"></div>
      <div class="comment-modal__content">
        <div class="comment-modal__divider flex flex--align">
          <div class="comment-modal__username">{{comment.userId.username}}</div>
          <div class="comment-modal__likes">{{comment.likes}}</div>
          <div
            class="comment-modal__createdAt"
          >{{$moment(comment.createdAt).startOf('minute').fromNow()}}</div>
        </div>
        <div class="comment-modal__subject" @click="toggleChildren">{{comment.content}}</div>
        <div class="comment-modal__operations">
          <div class="comment-modal__reply">
            <fa icon="comment-alt" style="transform:rotateY(180deg);"></fa>
          </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "comment-modal",
  props: ["children", "comment", "depth"],
  data() {
    return { showChildren: true };
  },
  computed: {
    indent() {
      return { transform: `translate(${this.depth * 50}px)` };
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    }
  }
};
</script>

<style lang="scss">
.comment-header {
  font-size: 20px;
}

.comment-modal {
  font-size: 14px;
  display: inline-block;

  // overflow: hidden;/
  &__container {
  }
  &__divider {
  }

  &__username {
    font-size: 13px;
    margin-right: 10px;
  }

  &__likes {
    font-size: 13px;
    margin-right: 10px;
  }
  &__createdAt {
    font-size: 13px;
  }

  &__subject {
    font-size: 14px;
    line-height: 28px;
    &:hover {
      cursor: pointer;
    }
  }
  &__operations {
  }
  &__reply {
    font-size: 12px;
  }
}
</style>
