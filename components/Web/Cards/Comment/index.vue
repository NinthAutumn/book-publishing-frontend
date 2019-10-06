<template>
  <div class="comment-card" :style="indent" :id="`${comment.id}`">
    <div
      class="comment-card__container flex-row"
      :class="{'comment-card__container--selected':$route.query.comment==comment.id}"
    >
      <div class="comment-card__avatar flex-column flex--align">
        <v-avatar size="40">
          <v-img :src="author_id===comment.user_id?comment.author_avatar:comment.avatar"></v-img>
        </v-avatar>
      </div>
      <div class="comment-card__meta">
        <header-nav :author_id="author_id" :likes="likes" :comment="comment"></header-nav>
        <div class="comment-card__content">{{comment.content}}</div>
        <footer-nav
          @rateComment="rateComment"
          @toggleReply="toggleReply"
          :auth="auth"
          :user_id="user_id"
          @toggleReport="toggleReport"
          :comment="comment"
        ></footer-nav>
        <component
          @toggleForm="toggleReply"
          :theme="theme"
          :parentId="comment.id"
          :is="formInstance"
        />
      </div>
    </div>
    <component
      @toggleReport="toggleReport"
      v-for="child in comment.children"
      :user_id="user_id"
      :key="child.id"
      :author_id="author_id"
      :comment="child"
      :auth="auth"
      :theme="theme"
      :depth="depth+1"
      :is="childInstance"
    />
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    user_id: Number,
    theme: String,
    depth: Number,
    auth: Boolean,
    author_id: Number
  },
  data() {
    return {
      likes: 0,
      reply: false,
      hide: false
    };
  },
  computed: {
    childInstance() {
      if (this.comment.children.length > 0)
        return () => import("@/components/Web/Cards/Comment");
      return;
    },
    indent() {
      return `padding-left:${this.depth > 0 ? 4 : 0}rem`;
    },
    formInstance() {
      if (this.reply) return () => import("@/components/Web/Forms/Comment");
      return;
    }
  },
  components: {
    HeaderNav: () => import("./HeaderNav"),
    FooterNav: () => import("./FooterNav")
  },
  methods: {
    rateComment(val) {
      this.likes = parseInt(this.likes) + parseInt(val);
    },
    toggleReply() {
      return (this.reply = !this.reply);
    },
    toggleReport(id) {
      this.$emit("toggleReport", id);
    }
  },
  mounted() {
    this.likes = this.comment.likes;
  }
};
</script>

<style lang="scss">
.comment-card {
  $self: &;
  position: relative;

  &__container {
    padding-bottom: 1rem;
    &--selected {
      background-color: rgb(240, 240, 240);
    }
    #{$self}__meta {
      width: 100%;
    }
    #{$self}__content {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    #{$self}__avatar {
      margin-right: 1rem;
    }
  }
}
</style>
