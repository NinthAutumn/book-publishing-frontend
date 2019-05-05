<template>
  <div class="card-component" v-ripple :class="{'card-component--selected':selected}">
    <div class="card-component__brand">
      <v-img :src="require(`@/assets/img/${brand}.png`)" width="3rem"></v-img>
    </div>
    <div class="card-component__header">
      <div class="card-component__digits">{{`•••• •••• •••• ${last}`}}</div>
      <div class="flex-divider flex-row flex--between flex--align">
        <div class="card-component__name">{{name}}</div>
        <div class="card-component__exp-date">{{`${expMonth}/${expYear}`}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    last: String,
    name: String,
    expYear: Number,
    expMonth: Number,
    brand: String,
    selected: Boolean
  },
  data() {
    return {
      // selected: false
    };
  },
  methods: {
    selectCard() {
      this.selected = !this.selected;
    }
  }
};
</script>

<style lang="scss">
.card-component {
  border-radius: 0.8rem;
  padding: 1.5rem 0.5rem;
  // background-color: black;
  // color: b;
  width: 100%;
  // height: 10rem;x

  border: 1px solid white;
  &--selected {
    border: 1px solid #4554ff;
    transition: border 200ms ease;
  }
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  background-color: #fff;
  position: relative;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transform: scale(1);
  transition: box-shadow 150ms ease, transform 150ms ease, border 200ms ease;
  user-select: none;
  &:hover {
    box-shadow: 1 1px 5px 0 #e6ebf1;
    transform: scale(1.1);
    transition: box-shadow 150ms ease, transform 150ms ease;
    cursor: pointer;
  }
  // color: black;
  &__brand {
    position: absolute;
    top: 1rem;
    right: 1rem;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    transition: box-shadow 150ms ease;
  }
  &__header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem;
  }
  &__digits {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  &__name {
    font-size: 1rem;
  }
  &__exp-date {
    font-size: 0.9rem;
  }
}
</style>
