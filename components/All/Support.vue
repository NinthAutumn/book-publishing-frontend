<template>
  <div class="support-component">
    <ul class="support-component__list">
      <li class="support-component__item" v-for="(item,index) in list" :key="index">
        <div class="support-component__button">{{item.key}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { key: "コインをあげる", value: "donate", selected: false },
        { key: "登録", value: "subscribe", selected: false }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
