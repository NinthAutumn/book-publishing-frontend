<template>
  <div class="bookchapterlists">
    <div class="bookchapterlists__options">
      <fa
        class="bookchapterlists__options--sort"
        icon="sort-numeric-down"
        @click="asc"
        :class="{rotate: ascending}"
      ></fa>
    </div>
    <ul class="bookchapterlists__list">
      <li class="bookchapterlists__list--items" v-for="(chapter, index) in chap" :key="index">
        <!-- {{rowCount = 0}} -->
        <!-- {{formatDate(chapter.createdAt)}} -->
        <nuxt-link
          v-if="chapter.index === 0"
          class="bookchapterlists__list--items__links"
        >Prologue {{chapter.index}}: {{chapter.title}}</nuxt-link>
        <!-- <nuxt-link
          class="bookchapterlists__list--items__links--darker"
          v-else-if="index  % 2  === 1"
          :to="{path: `${ $route.params.id}/${chapter._id}`}"
        >Chapter {{chapter.index}}: {{chapter.title}}</nuxt-link>-->
        <nuxt-link
          v-else
          class="bookchapterlists__list--items__links"
          :to="{path: `${ $route.params.id}/${chapter.index}`}"
        >
          <p
            class="bookchapterlists__list--items__links--title"
          >{{chapter.index}}話: {{chapter.title}}</p>
          <p class="chapter-createdAt">{{$moment(chapter.createdAt).startOf('hour').fromNow()}}</p>
          <!-- <timeago  :datetime="chapter.createdAt" locale="ja"></timeago> -->
        </nuxt-link>

        <!-- {{rowCounts(index)}} -->
      </li>
    </ul>
  </div>
</template>

<script>
// const _ = require("lodash");
export default {
  props: {
    chapters: Array
  },
  data() {
    return {
      rowCount: 0,
      createdAt: "null",
      ascending: false
      // ascState: "asc"
      // chapters: {}
    };
  },
  methods: {
    async formatDate(date) {
      // this.createdAt =
    },
    // rowCounts(index) {
    //   if (index % 2 === 1) {
    //     this.rowCount++;
    //   }
    //   // console.log(this.rowCount);
    // },
    async asc() {
      await this.$store.commit("chapter/TOC_REVERSE");
      this.ascending = !this.ascending;
    }
  },
  async created() {
    // this.$store.commit("book/FORMAT_DATE");
  },
  computed: {
    chap: function() {
      return this.$store.state.chapter.cToc;
    }
  },
  asyncData() {}
};
</script>

<style lang="scss">
.chapter-createdAt {
  font-size: 13px;
  text-align: right;
}
.bookchapterlists {
  // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
  // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  padding: 10px 5px 10px 20px;
  // height: 482px;
  width: 100%;
  box-sizing: border-box;
  //
  &__options {
    text-align: right;
    margin-right: 17.12px;
    margin-bottom: 5px;
    font-size: 25px;

    // transition: 300ms;
    .rotate {
      transform: rotate(-180deg);
      transition: 300ms;
    }
    &--sort {
      // text-align: right;
      // position: sticky;
      color: #885cd3;
      transform: rotate(-360deg);
      transition: 300ms;
      &:hover {
        cursor: pointer;
        color: #512e8d;
      }
    }
    &--bookmark {
      margin-right: 10px;
      // font-size: 25px;
      color: #c1c9e4;
    }
  }
  // border: 1px solid $primary;
  &__list {
    overflow: scroll;
    // -webkit-box-shadow: inset 0px 2px 5px 0px rgb(233, 218, 233);
    // -moz-box-shadow: inset 0px 2px 5px 0px rgb(255, 255, 255);
    // box-shadow: inset 0px 2px 5px 0px rgb(233, 218, 233);
    // border: 1px solid $primary;
    box-shadow: 1px 1px 5px 0px rgb(179, 179, 179);
    height: 482px;
    display: grid;
    // grid-auto-flow: dense;
    // grid-auto-flow: dense;
    // flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    // grid-template-areas: "chapter";
    grid-gap: 2px 15px;
    grid-template-rows: 50px;
    // justify-content: space-between;
    padding: 10px 15px;
    // grid-auto-flow: dense;
    // transition: 300ms;
    // transition: 100ms;

    &--items {
      // direction: ltr;

      &:nth-child(4n + 1) {
        background-color: #fcefff;
        &:hover {
          background-color: white;
          transition: 100ms;
        }
      }
      &:nth-child(4n + 2) {
        background-color: #fcefff;

        &:hover {
          background-color: white;
          transition: 100ms;
        }
      }
      // margin-right: 5px;
      // padding-right: 10px;
      box-sizing: border-box;
      // grid-area: chapter;
      margin-bottom: 5px;

      height: 50px;
      // width: 50%;
      // margin-left: 5px;
      &__links {
        // width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
        -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
        box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
        padding: 0 10px;

        height: 100%;
        // width: 95%;
        transition: 100ms;
        &--title {
          font-size: 1.6rem;
          color: #8860d0;
        }
        &:hover {
          transition: 100ms;
          cursor: pointer;
        }
      }
      // flex: 0 0 50%;
      // width: 80%;
    }
  }
}
</style>
