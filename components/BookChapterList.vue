<template>
  <div class="bookchapterlists">
    <ul class="bookchapterlists__list">
      <li class="bookchapterlists__list--items" v-for="chapter in chapters" :key="chapter.index">
        <nuxt-link
          :to="{path: `${ $store.state.book.book._id}/${chapter._id}`}"
        >{{chapter.index}}: {{chapter.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    chapters: Array
  }
};
</script>

<style lang="scss">
.bookchapterlists {
  -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
  box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  padding: 10px 20px;
  height: 482px;
  width: 100%;
  box-sizing: border-box;

  &__list {
    display: flex;
    flex-wrap: wrap;
    &--items {
      padding-left: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
      -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
      box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
      height: 50px;
      flex: 0 0 50%;
    }
  }
}
</style>
