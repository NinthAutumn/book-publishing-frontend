<template>
  <div class="user-analytics">
    <div class="main-analytics">
      <div class="main-analytics__list">
        <div
          v-for="(value,index) in mainAnalytics"
          :key="index"
          class="main-analytics__item flex-column flex--center"
        >
          <div class="main-analytics__title" v-text="value.title"></div>
          <div class="flex-divider flex-row flex--align flex--between">
            <div class="main-analytics__stats">
              <div v-if="value.title==='ランキング'&&!value.stats" class="no-rank">未定</div>
              <no-ssr v-else>
                <countTo :startVal="0" :endVal="value.stats" :duration="1000"></countTo>
              </no-ssr>
            </div>
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
      mainAnalytics: [
        {
          title: "ランキング",
          icon: "crown",
          stats: this.$store.getters["dashboard/getRanking"].rank || 0
        },
        {
          title: "総計視聴回数",
          icon: "eye",
          stats: this.$store.getters["dashboard/getStats"].view_count
        },

        {
          title: "総計ブックマーク数",
          icon: "bookmark",
          stats: this.$store.getters["dashboard/getStats"].bookmark_count
        },
        {
          title: "総計コメント数",
          icon: "comment",
          stats: this.$store.getters["dashboard/getStats"].comment_count
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main-analytics {
  $self: &;

  &__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(10rem, 40rem));
    grid-template-rows: repeat(1, 12rem);
    grid-gap: 5rem;
  }
  &__item {
    height: 100%;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
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
      div {
        font-size: 3.4rem;
      }
      color: #718af4;
      span {
        font-size: 3.4rem;
      }
    }
    #{$self}__icon {
      font-size: 35px;
      color: #718af4;
      transform: scale(1);
      transition: transform 300ms;
      &:hover {
        transform: scale(1.2);
        transition: 300ms;
      }
    }
  }
}
</style>
