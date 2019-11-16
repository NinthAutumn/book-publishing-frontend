<template>
  <div
    class="navigation-icons"
    @click.stop="clickHandler"
    :class="{'navigation-icons--rotate':rotate}"
  >
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
    },
    animation: Boolean
  },
  data() {
    return {
      rotate: false
    };
  },
  computed: {
    notification() {
      return this.notificationCount < 9;
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
      if (this.animation) {
        this.rotate = !this.rotate;
      }
    }
  }
};
</script>

<style lang="scss">
.navigation-icons {
  $self: &;
  &--rotate {
    #{$self}__container {
      border-radius: 10rem;
      transform: rotate(180deg);
      transition: transform 200ms ease-in;
    }
  }
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
    transition: transform 200ms ease-in;
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
