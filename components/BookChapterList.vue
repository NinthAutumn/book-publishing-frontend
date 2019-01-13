<template>
  <div class="bookchapterlists">
    <ul class="bookchapterlists__list">
      <li class="bookchapterlists__list--items" v-for="chapter in chapters" :key="chapter.index">
        <nuxt-link
          class="bookchapterlists__list--items__links"
          :to="{path: `${ $route.params.id}/${chapter._id}`}"
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
  padding: 10px 5px 10px 20px;
  height: 482px;
  width: 100%;
  box-sizing: border-box;

  &__list {
    display: flex;
    // flex-wrap: wrap;
    flex-flow: row wrap;
    &--items {
      // margin-right: 5px;
      // padding-right: 10px;
      box-sizing: border-box;

      margin-bottom: 5px;

      height: 50px;
      width: 50%;
      // margin-left: 5px;
      &__links {
        display: flex;
        align-items: center;
        -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
        -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
        box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
        padding-left: 10px;

        height: 100%;
        width: 95%;
      }
      // flex: 0 0 50%;
      // width: 80%;
    }
  }
}
</style>
