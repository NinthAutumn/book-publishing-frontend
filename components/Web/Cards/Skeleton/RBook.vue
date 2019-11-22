<template>
  <v-sheet class="rbook-skeleton">
    <div
      class="rbook-skeleton__divider"
      :class="{'rbook-skeleton__divider--mobile':$device.isMobile}"
    >
      <v-skeleton-loader
        style="margin-right: 2rem;"
        :style="{marginBottom:$device.isMobile?'1rem':'0'}"
        :width="$device.isMobile?'8rem':'12rem'"
        :height="$device.isMobile?'12rem':'18rem'"
        :aspect-ratio="1/1.5"
        ref="skeleton"
        :type="'image'"
      ></v-skeleton-loader>
      <v-skeleton-loader
        :width="$device.isMobile?'8rem':'12rem'"
        ref="skeleton"
        :type="$device.isMobile?'sentences':'paragraph'"
      ></v-skeleton-loader>
    </div>
  </v-sheet>
</template>

<script>
export default {};
</script>

<style lang="scss">
.rbook-skeleton {
  max-width: 100%;
  width: 100%;
  $self: &;
  &__divider {
    width: 100%;
    height: 18rem;
    display: flex;

    &--mobile {
      flex-direction: column;
    }
  }
}
</style>
