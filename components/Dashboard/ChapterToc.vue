
<template>
  <div class="table-list-component">
    <div class="divider" v-if="!published">
      <table class="dashboard-toc">
        <!-- <thead class="dashboard-toc__header">
      <tr class="dashboard-toc__header__row">
        <th
          class="dashboard-toc__header__row__item dashboard-toc__header__row__item--index"
          v-if="published"
        >目次</th>
        <th class="dashboard-toc__header__row__item">タイトル</th>
        <th class="dashboard-toc__header__row__item">制作日</th>
        <th class="dashboard-toc__header__row__item"></th>
      </tr>
        </thead>-->
        <tbody class="dashboard-toc__body">
          <chapter-toc-item :chapter="chapter" v-for="(chapter, index) in toc" :key="index"></chapter-toc-item>
        </tbody>
      </table>
    </div>
    <div class="table" v-else v-for="(volume, index) in toc" :key="index">
      <div class="table-volume">
        <div class="table-header">
          <div class="volume-title">
            <h3>第{{index + 1}}章</h3>
          </div>
        </div>
      </div>
      <table class="dashboard-toc">
        <tbody class="dashboard-toc__body">
          <chapter-toc-item
            :published="published"
            :chapter="chapter"
            v-for="(chapter, index) in volume"
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
  background-color: $primary-lighter;
  padding: 5px;
  box-sizing: border-box;
  h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 400;
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
