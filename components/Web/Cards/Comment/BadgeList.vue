<template>
  <div class="comment-badges">
    <div class="comment-badges__list flex-row flex--align">
      <div
        class="comment-badges__item"
        :style="{color:badge.color}"
        v-for="(badge,index) in badges"
        :key="index"
      >
        <fa v-if="badge.icon" :icon="badge.icon"></fa>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["badges"]
};
</script>

<style lang="scss">
.comment-badges {
  $self: &;
  &__list {
    #{$self}__item {
      margin-right: 0.5rem;
      font-size: 1.3rem;
    }
  }
}
</style>
