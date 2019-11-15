<template>
  <div class="navigation-icons" @click.stop="$emit('click')">
    <div
      class="navigation-icons__container"
      :class="`navigation-icons__container--${size}`"
      v-ripple
    >
      <div
        v-if="notificationCount > 0&&inbox"
        class="navigation-icons__count"
      >{{notification?notificationCount:'9+'}}</div>
      <fa :icon="icon"></fa>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notificationCount: Number,
    inbox: Boolean,
    icon: String,
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    notification() {
      return this.notificationCount < 9;
    }
  }
};
</script>

<style lang="scss">
.navigation-icons {
  $self: &;
  &__container {
    font-size: 20px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rem;
    margin: 0 2.5px;
    position: relative;
    &:hover {
      cursor: pointer;
      @include themify($themes) {
        background: themed("textColor");
        color: themed("textBackgroundColor");
      }
    }
    #{$self}__count {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.1rem 0.5rem;
      border-radius: 10rem;
      background-color: red;
      color: white;
    }
  }
}
</style>
