
<template>
  <tr class="dashboard-toc__body__row">
    <td class="dashboard-toc__body__row__item">{{chapter.index}}話</td>
    <td class="dashboard-toc__body__row__item">{{chapter.title}}</td>
    <td class="dashboard-toc__body__row__item">{{$moment(chapter.createdAt).format('DD-M-YYYY')}}</td>
    <td class="dashboard-toc__body__row__item flex flex--center">
      <fa icon="cog"></fa>
      <fa icon="edit"></fa>
      <fa icon="trash"></fa>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    chapter: Object
  }
};
</script>

<style lang="scss">
.dashboard-toc__body__row {
  &:hover {
    background-color: rgb(239, 247, 247);
    cursor: pointer;
  }
  &__item {
    // height: 50px;
    font-size: 14px;
    padding: 5px;
  }
}
</style>
