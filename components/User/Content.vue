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
      </div>
      <div class="profile-content__activity">
        <div class="profile-content__title">アクティビティー</div>
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
  data() {
    return {
      metas: [
        { key: "登録日", value: "2011年4月 に登録", icon: "calendar" },
        { key: "県", value: "宮城県" || "非表示", icon: "map-marker" },
        { key: "性別", value: "男" || "非表示", icon: "venus-mars" }
      ]
    };
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
    #{$self}__title {
      font-size: 2rem;
    }
  }
}
</style>
