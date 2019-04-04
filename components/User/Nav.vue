<template>
  <nav class="user-nav">
    <div class="user-nav__container">
      <div class="user-nav__avatar"></div>
      <div class="user-nav__content">
        <ul class="user-nav__stats-list">
          <li v-for="(stat,index) in stats" :key="index" class="user-nav__stats-item">
            <div class="user-nav__stats-item__title"></div>
            <div class="user-nav__stats-item__stats"></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        { name: "作品", value: "123432" },
        { name: "レビュー", value: "143" },
        { name: "良いね", value: "143" },
        { name: "コメント", value: "433" }
      ]
    };
  }
};
</script>

<style lang="scss">
.user-nav {
  $self: &;
  &__container {
  }
  &__avatar {
  }
  &__content {
    #{$self}__stats-list {
      #{$self}__stats-item {
        display: flex;
        flex-direction: column;
        &__title {
        }
        &__stats {
        }
      }
    }
  }
}
</style>
