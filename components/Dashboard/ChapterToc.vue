
<template>
  <div class="table-list-component">
    <div class="divider" v-if="!published">
      <table class="dashboard-toc">
        <tbody class="dashboard-toc__body">
          <chapter-toc-item :chapter="chapter" v-for="(chapter, index) in toc" :key="index"></chapter-toc-item>
        </tbody>
      </table>
    </div>
    <div class="table" v-else v-for="(volume, index) in toc" :key="index">
      <div class="table-volume" v-if="volume.chapters.length > 0">
        <div class="table-header flex flex--align">
          <div class="volume-title">
            <h3>{{volume.title || `第${volume.index}章`}}</h3>
          </div>
        </div>
      </div>
      <table class="dashboard-toc">
        <tbody class="dashboard-toc__body">
          <chapter-toc-item
            :published="published"
            :chapter="chapter"
            v-for="(chapter, index) in volume.chapters"
            :key="index"
          ></chapter-toc-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ChapterTocItem from "./ChapterTocItem";
export default {
  props: {
    toc: Array,
    published: Boolean
  },
  components: {
    ChapterTocItem
  }
};
</script>

<style lang="scss">
.table-header {
  width: 100%;
  background-color: #f5f5f5;
  padding: 5px;
  box-sizing: border-box;
  height: 45px;
  // dispay:
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
}
.dashboard-toc {
  .divider {
    width: 100%;
  }
  .table {
    width: 100%;
  }
  border-spacing: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  // box-shadow: 1px 1px 5px 0px rgb(228, 228, 228);
  &__header {
    &__row {
      &__item {
        border-bottom: 1px solid $primary-lighter;
        padding: 5px;
        text-align: left;
        font-size: 16px;
        font-weight: 400;

        &--index {
          // width: 20px;
        }
      }
    }
  }

  &__footer {
    background-color: grey;
    &__row {
      background-color: rgba(112, 51, 51, 0);
      &__item {
        width: 100px;
      }
    }
  }
}
</style>
