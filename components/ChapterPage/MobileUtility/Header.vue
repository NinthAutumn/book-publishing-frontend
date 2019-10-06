<template>
  <nav class="mc-navtop" :class="'mc-navtop--'+ theme">
    <div class="mc-navtop__navigation" @click="$emit('goBack')">
      <fa icon="arrow-left"></fa>
    </div>
    <div class="mc-navtop__meta">
      <!-- <div class="mc-navtop__select" v-ripple >
            <fa icon="bookmark"></fa>
      </div>-->
      <div class="mc-navtop__select" v-ripple @click.stop="$emit('actionHandler')">
        <fa icon="flag"></fa>
      </div>
      <div class="mc-navtop__select" v-ripple @click.stop="$emit('actionHandler','vote')">
        <fa icon="bolt"></fa>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    theme: [String, Array]
  }
};
</script>

<style lang="scss">
.mc-navtop {
  position: fixed;
  top: 0;
  left: 0;
  height: 4rem;
  background-color: #fff;
  z-index: 10000;
  width: 100vw;
  $self: &;

  font-size: 1.7rem;
  &--black {
    background-color: #19191a;
    color: #949698;
  }
  &--tan {
    background-color: #e9e1b8;
  }
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  #{$self}__navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    height: 3rem;
    width: 3rem;
  }
  #{$self}__meta {
    display: flex;
    align-items: center;
    font-size: inherit;

    #{$self}__select {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: inherit;
      height: 3rem;
      width: 3rem;
    }
  }
}
</style>
