<template>
  <div class="user-analytics">
    <div class="main-analytics">
      <div class="main-analytics__list">
        <div v-for="(value, key,index) in mainAnalytics" :key="index" class="main-analytics__item">
          <div class="main-analytics__title" v-text="value.title"></div>
          <div class="main-analytics__stats" v-text="value.stats"></div>
          <fa :icon="value.icon" class="main-analytics__icon"></fa>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainAnalytics: {
        views: {
          title: "総計視聴回数",
          icon: "eye",
          stats: 1000
        },
        bookmark: {
          title: "総計ブックマーク数",
          icon: "bookmark",
          stats: 30
        },
        comments: {
          title: "総計コメント数",
          icon: "comment",
          stats: 1234
        }
      }
    };
  }
};
</script>

<style lang="scss">
.main-analytics {
  $self: &;
  &__list {
  }
  &__item {
    #{$self}__title {
    }
    #{$self}__stats {
    }
    #{$self}__icon {
    }
  }
}
</style>
