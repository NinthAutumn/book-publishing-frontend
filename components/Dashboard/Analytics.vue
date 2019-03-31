<template>
  <div class="user-analytics">
    <div class="main-analytics">
      <div class="main-analytics__list flex-row flex--between">
        <div
          v-for="(value, key,index) in mainAnalytics"
          :key="index"
          class="main-analytics__item flex-column flex--center"
        >
          <div class="main-analytics__title" v-text="value.title"></div>
          <div class="flex-divider flex-row flex--align flex--between">
            <div class="main-analytics__stats" v-text="value.stats"></div>
            <fa :icon="value.icon" class="main-analytics__icon"></fa>
          </div>
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
    height: 125px;
    width: 250px;
    border-radius: 3px;
    box-shadow: 1px 1px 5px rgb(233, 233, 233);
    background-color: #fff;
    position: relative;
    overflow: hidden;
    user-select: none;
    // color: red;
    padding: 1.7rem;
    box-sizing: border-box;
    #{$self}__title {
      text-align: left;
      font-size: 1.4rem;
      z-index: 1;
      color: #4a4a4a;
    }
    #{$self}__stats {
      font-size: 34px;
      color: #718af4;
    }
    #{$self}__icon {
      font-size: 35px;
      color: #718af4;
    }
  }
}
</style>
