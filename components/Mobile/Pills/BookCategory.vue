<template>
  <div class="category-pills">
    <div class="category-pills__title">{{title}}</div>
    <div class="category-pills__list">
      <nuxt-link
        v-ripple
        :to="`/browse?${type}=${category}`"
        class="category-pills__item"
        :style="style"
        v-for="(category,index) in categories"
        :key="index"
      >{{category}}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: [Object, Array]
    },
    color: {
      type: String,
      default: "rgb(44, 44, 44)"
    },
    backgroundColor: {
      type: String,
      default: " rgb(241, 241, 241)"
    },
    title: String,
    type: {
      type: String,
      default: "genre"
    }
  },
  data() {
    return {
      style: {}
    };
  },
  mounted() {
    this.style = {
      backgroundColor: this.backgroundColor,
      color: this.color
    };
  }
};
</script>

<style lang="scss">
.category-pills {
  $self: &;
  &__title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    #{$self}__item {
      border-radius: 0.2rem;
      font-size: 1.2rem;
      // color: rgb(44, 44, 44);
      padding: 0.5rem 2rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
      // background-color: rgb(241, 241, 241);
    }
  }
}
</style>
