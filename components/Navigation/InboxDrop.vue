<template>
  <div class="inbox-dropdown">
    <ul class="inbox-dropdown__list">
      <li class="inbox-dropdown__item" v-for="(notification, index) in notifications" :key="index"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.inbox-dropdown {
  $self: &;
  max-width: 400px;
  max-height: 480px;
  &__list {
    #{$self}__item {
    }
  }
}
</style>
