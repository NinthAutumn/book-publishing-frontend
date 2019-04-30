<template>
  <div class="vote-token">
    <div class="vote-token__bolt">
      <fa icon="bolt"></fa>
    </div>
    <div class="vote-token__amount">{{amount}}</div>
  </div>
</template>

<script>
export default {
  props: {
    amount: Number
  }
};
</script>

<style lang="scss">
.vote-token {
  display: flex;
  align-items: center;
  &__bolt {
    font-size: 1.6rem;
    color: rgb(255, 64, 64);
    margin-right: 0.5rem;
  }
  &__amount {
    font-size: 1.6rem;
  }
}
</style>
