<template>
  <div class="user-analytics">
    <div class="main-analytics">
      <div class="main-analytics__list flex flex--between">
        <div
          v-for="(value, key,index) in mainAnalytics"
          :key="index"
          class="main-analytics__item flex flex--align flex-column flex--center"
        >
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
        ranking: {
          title: "ランキング",
          icon: "crown",
          stats: 30
        },
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
    height: 150px;
    width: 250px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgb(233, 233, 233);
    background-color: #fff;
    position: relative;
    overflow: hidden;
    #{$self}__title {
      font-size: 20px;
      z-index: 1;
    }
    #{$self}__stats {
      font-size: 20px;
    }
    #{$self}__icon {
      position: absolute;
      font-size: 70px;
      top: -5px;
      color: $primary;
      opacity: 0.8;
      left: -5px;
    }
  }
}
</style>
