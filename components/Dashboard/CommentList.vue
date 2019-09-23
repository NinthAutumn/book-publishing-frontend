<template>
  <div class="dash-comments">
    <h3 class="dash-comments__header">最新コメント</h3>

    <ul class="dash-comments__list">
      <li class="dash-comments__item" v-for="(comment, index) in comments" :key="index">
        <div class="dash-comments__avatar">
          <v-avatar :size="45" style="box-shadow:1px 1px 5px rgb(240, 240, 240);">
            <v-img :src="comment.avatar? comment.avatar:avatar"></v-img>
          </v-avatar>
        </div>
        <div class="flex-divider" style="width:100%;">
          <div class="flex-row flex--between flex--align">
            <div class="dash-comments__user-name">{{comment.username}}</div>
            <div
              class="dash-comments__created-at"
            >{{$moment(comment.created_at).startOf('second').fromNow()}}</div>
          </div>
          <div class="dash-comments__comment">{{comment.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("analytic/fetchUserComments", {
      limit: 10,
      page: 1,
      infinite: false
    });
  },
  computed: {
    comments() {
      return this.$store.getters["analytic/getComments"];
    }
  },
  data() {
    return {
      avatar: require("~/assets/img/profile.png")
    };
  }
};
</script>

<style lang="scss">
.dash-comments {
  // height: 400px;
  max-width: 100%;
  min-width: 35.4rem;

  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  // margin-top:
  $self: &;
  background-color: #fff;

  &__header {
    font-size: 1.6rem;
  }
  &__list {
    max-height: 30rem;
    overflow: auto;
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

      margin: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgb(226, 226, 226);
    }
    #{$self}__user-name {
      text-align: left;
      font-size: 1.4rem;
      font-weight: bold;
      word-break: break-all;
    }
    #{$self}__avatar {
      width: 4rem !important;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    #{$self}__comment {
      font-size: 1.2rem;
      color: grey;
    }
    #{$self}__created-at {
      font-size: 1rem;
      color: rgb(184, 184, 184);
    }
  }
  &__header {
    padding: 2rem 1rem;
    border-bottom: 1px solid rgb(226, 226, 226);
  }
}
</style>
