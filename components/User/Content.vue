<template>
  <div class="profile-content">
    <div class="profile-content__container">
      <div class="profile-content__meta">
        <div
          class="profile-content__meta-text profile-content__meta-text--username"
          v-text="user.username"
        ></div>
        <div
          class="profile-content__meta-text profile-content__meta-text--meta"
          v-for="(meta, index) in metas"
          :key="index"
        >
          <fa class="profile-content__meta-icon" :icon="meta.icon"></fa>
          {{meta.value}}
        </div>
      </div>
      <div class="profile-content__book-list">
        <div class="profile-content__title">作品リスト</div>
        <book-list :books="books"></book-list>
      </div>

      <div class="profile-content__activity">
        <div class="profile-content__activity-nav flex-row">
          <div class="profile-content__title profile-content__title--activity">レビュー</div>
          <div class="profile-content__title profile-content__title--activity">コメント</div>
        </div>
        <activity-list reviews :user="user" :list="reviews"></activity-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    owner: Boolean
  },
  components: {
    BookList: () => import("./BookList"),
    ActivityList: () => import("./ActivityList")
  },
  computed: {
    reviews() {
      return this.$store.getters["user/getUserReviews"];
    },
    comments() {
      return this.$store.getters["user/getUserComments"];
    },
    books() {
      return this.$store.getters["user/getProfileBooks"];
    }
  },
  data() {
    return {
      metas: [
        {
          key: "登録日",
          value:
            this.$moment(this.user.created_at)
              .startOf("month")
              .fromNow() + " 登録",
          icon: "calendar"
        },
        { key: "県", value: "非表示", icon: "map-marker" },
        { key: "性別", value: "男" || "非表示", icon: "venus-mars" }
      ],
      data: {}
    };
  },
  async mounted() {
    await this.$store.dispatch("user/fetchProfileReviews", {
      userId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
.profile-content {
  $self: &;

  &__container {
    display: grid;
    grid-template-columns: 30rem 1fr 1fr;
    grid-template-areas: "meta books books" "meta activity activity";
    padding-right: 5rem;

    #{$self}__meta {
      grid-area: meta;
      padding-left: 5rem;
      padding-top: 5rem;
    }
    #{$self}__meta-icon {
      display: flex;
      justify-content: flex-start;
      min-width: 30px;
      font-size: 1.8rem;
    }
    #{$self}__meta-text {
      font-size: 1.6rem;
      &--meta {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        user-select: none;
      }
      &--username {
        font-size: 1.8rem;
        font-weight: bold;
      }
    }
    #{$self}__book-list {
      padding-top: 2rem;
      grid-area: books;
    }
    #{$self}__activity {
      padding-top: 2rem;
      grid-area: activity;
    }
    #{$self}__activity-nav {
    }
    #{$self}__title {
      font-size: 2rem;
      &--activity {
        margin-right: 1rem;
      }
    }
  }
}
</style>
