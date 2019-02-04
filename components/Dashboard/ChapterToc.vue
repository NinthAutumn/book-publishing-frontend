
<template>
  <table class="dashboard-toc">
    <thead class="dashboard-toc__header">
      <tr class="dashboard-toc__header__row">
        <th class="dashboard-toc__header__row__item dashboard-toc__header__row__item--index">目次</th>
        <th class="dashboard-toc__header__row__item">タイトル</th>
        <th class="dashboard-toc__header__row__item">制作日</th>
        <th class="dashboard-toc__header__row__item">オペレーション</th>
      </tr>
    </thead>
    <tbody class="dashboard-toc__body">
      <chapter-toc-item :chapter="chapter" v-for="(chapter) in toc" :key="chapter.index"></chapter-toc-item>
    </tbody>
    <tfoot style="background:none;">
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>
          <div class="button button--primary--open">最新</div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import ChapterTocItem from "./ChapterTocItem";
export default {
  props: {
    toc: Array
  },
  components: {
    ChapterTocItem
  }
};
</script>

<style lang="scss">
.dashboard-toc {
  border-spacing: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 5px 0px rgb(228, 228, 228);
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
}
</style>
