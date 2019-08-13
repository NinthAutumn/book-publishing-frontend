<template>
  <div class="chapter-actions">
    <div class="chapter-actions__container">
      <div class="chapter-actions__list">
        <div class="chapter-actions__item" v-for="(value,key) in actions" :key="key">
          <div class="chapter-actions__icon"></div>
          <div class="chapter-actions__title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: {
        report: {
          title: "話を報告する",
          icon: "flag"
        },
        vote: {
          title: "作品に登用をかける",
          icon: "bolt"
        }
      }
    };
  },
  methods: {
    actionHandler(key) {
      switch (key) {
        case "report":
          this.reportHandler();
          break;
        default:
          this.voteHandler();
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.chapter-actions {
  $self: &;
  &__container {
    #{$self}__list {
      display: flex;
      align-items: center;
      #{$self}__item {
      }
    }
  }
}
</style>
