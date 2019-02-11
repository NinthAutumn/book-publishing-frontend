
<template>
  <tr class="dashboard-toc__body__row">
    <td v-if="published" class="dashboard-toc__body__row__item">{{chapter.index}}話</td>
    <td class="dashboard-toc__body__row__item">{{chapter.title}}</td>
    <td class="dashboard-toc__body__row__item">{{$moment(chapter.createdAt).format('DD-M-YYYY')}}</td>
    <td
      class="dashboard-toc__body__row__item dashboard-toc__body__row__item--icons flex flex--center flex--align"
    >
      <fa class="dashboard-toc__body__row__item--icons--edit" icon="edit"></fa>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    chapter: Object,
    published: Boolean
  }
};
</script>

<style lang="scss">
.dashboard-toc__body__row {
  &:hover {
    background-color: rgb(239, 247, 247);
    cursor: default;
  }
  &__item {
    height: 45px;
    &--icons {
      font-size: 20px;
      &:hover {
        cursor: pointer;
      }
      &--cog {
        transform: roate(0deg) scale(1);
        transition: 300ms;
        &:hover {
          transform: rotate(180deg) scale(1.2);
          transition: 300ms;
        }
        color: $secondary;
        margin-right: 10px;
      }
      &--edit {
        transform: scale(1);
        transition: transform 300ms;
        &:hover {
          transform: scale(1.2);
        }
        color: $primary;
        margin-right: 10px;
      }
      &--trash {
        color: rgb(241, 136, 136);
        transition: color 300ms;
        &:hover {
          color: red;
          transition: color 300ms;
        }
        margin-right: 10px;
      }
    }
    font-size: 16px;
    padding: 5px;
  }
}
</style>
