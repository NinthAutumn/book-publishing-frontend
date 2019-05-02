<template>
  <div class="transaction-list" v-loading="loading">
    <header>購入リスト</header>
    <v-data-table
      :headers="headers"
      hide-actions
      :items="transactions"
      class="transaction-list__list"
    >
      <template v-slot:items="props">
        <td>
          <v-img
            :src="`https://storage.googleapis.com/theta-images/${props.item.cover}`"
            :aspect-ratio="1/1.5"
            max-width="5rem"
          ></v-img>
        </td>
        <td class="transaction-list__item transaction-list__item--title">{{ props.item.book_title }}</td>
        <td class="transaction-list__item transaction-list__item--index">{{ props.item.index }}</td>
        <td class="transaction-list__item transaction-list__item--amount">{{ props.item.amount }}</td>
        <td
          class="transaction-list__item transaction-list__item--created_at"
        >{{ $moment(props.item.created_at).startOf('second').fromNow() }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "カバー", value: "cover", sortable: false },
        { text: "タイトル", value: "title", sortable: false },
        { text: "何話", value: "chapter", sortable: false },
        { text: "金額", value: "amount", sortable: false },
        { text: "時間", value: "date", sortable: false }
      ],
      loading: false
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["dashboard/getTransactions"];
    }
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("dashboard/fetchTransactionList");
    this.loading = false;
  }
};
</script>

<style lang="scss">
.transaction-list {
  box-shadow: 1px 1px 5px rgb(219, 219, 219);
  border-radius: 0.5rem;
  header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  $self: &;
  // max-width: 50rem;
  &__list {
    box-shadow: 0px;
  }
  &__item {
    &--title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 15rem;
    }
  }
  height: 100%;
  background-color: #fff;
}
</style>
