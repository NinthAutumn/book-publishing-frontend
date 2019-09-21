<template>
  <div class="mobile-chapter__top" :class="'mobile-chapter__top--'+ theme">
    <div class="mobile-chapter__navigation" @click="$emit('goBack')">
      <fa icon="arrow-left"></fa>
    </div>
    <div class="mobile-chapter__meta">
      <!-- <div class="mobile-chapter__select" v-ripple >
            <fa icon="bookmark"></fa>
      </div>-->
      <div class="mobile-chapter__select" v-ripple @click.stop="$emit('actionHandler')">
        <fa icon="flag"></fa>
      </div>
      <div class="mobile-chapter__select" v-ripple @click.stop="$emit('actionHandler','vote')">
        <fa icon="bolt"></fa>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: [String, Array]
  }
};
</script>

<style lang="scss">
</style>
