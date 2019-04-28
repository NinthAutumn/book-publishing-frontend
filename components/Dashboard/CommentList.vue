<template>
  <div class="dash-comments">
    <ul class="dash-comments__list">
      <h3 class="dash-comments__header">コメントリスト</h3>
      <li class="dash-comments__item" v-for="(comment, index) in comments" :key="index">
        <div class="dash-comments__avatar">
          <v-avatar :size="60" style="box-shadow:1px 1px 5px rgb(240, 240, 240);">
            <v-img :src="comment.avatar"></v-img>
          </v-avatar>
          <div class="dash-comments__user-name">{{comment.username}}</div>
        </div>
        <div class="flex-divider">
          <div class="dash-comments__comment">{{comment.content}}</div>
          <div class="flex-divider flex-column dash-comments__book-info">
            <div class="dash-comments__book-title">{{comment.title}}</div>
            <div class="flex-divider flex-row flex--align">
              <div class="dash-comments__chapter-index">第{{comment.index}}話:</div>
              <div class="dash-comments__chapter-title">{{comment.chapter_title}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("analytic/fetchUserComments");
  },
  computed: {
    comments() {
      return this.$store.getters["analytic/getComments"];
    }
  }
};
</script>

<style lang="scss">
.dash-comments {
  // height: 400px;
  max-width: 40rem;
  max-height: 50rem;
  overflow: auto;
  box-shadow: 1px 1px 5px rgb(240, 240, 240);
  border-radius: 0.5rem;
  // margin-top:
  $self: &;
  &__header {
    font-size: 1.6rem;
  }
  &__list {
    background-color: #fff;
    padding: 1rem;

    #{$self}__book-info {
      max-width: 30rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid rgb(236, 236, 236);
      #{$self}__book-title {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #{$self}__chapter-index {
      }
      #{$self}__chapter-title {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // max-width: 10rem;
      }
    }
    #{$self}__item {
      display: flex;
      padding: 1rem;
    }
    #{$self}__user-name {
      text-align: center;
      word-break: break-all;
    }
    #{$self}__avatar {
      width: 6rem !important;
      margin-right: 0.5rem;
    }
    #{$self}__comment {
      font-size: 1.2rem;
    }
  }
}
</style>
