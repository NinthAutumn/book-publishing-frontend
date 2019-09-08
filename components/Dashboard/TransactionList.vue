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
        <td class="flex-column flex--align flex--center">
          <v-avatar class="elevation-1" :size="35">
            <!-- :src="`https://storage.googleapis.com/theta-images/${props.item.avatar}`" -->
            <v-img
              :src="props.item.avatar?props.item.avatar:avatar"
              :aspect-ratio="1/1.5"
              max-width="5rem"
            ></v-img>
          </v-avatar>
        </td>
        <td class="transaction-list__item transaction-list__item--title">{{ props.item.username }}</td>
        <td class="transaction-list__item transaction-list__item--title">{{ props.item.book_title }}</td>
        <td class="transaction-list__item transaction-list__item--index">{{ props.item.index }}</td>
        <td class="transaction-list__item transaction-list__item--amount">
          {{ }}
          <Currency :amount="props.item.amount" size="small"></Currency>
        </td>
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
        { text: "アバター", value: "avatar", sortable: false },
        { text: "ユーザー", value: "user", sortable: false },
        { text: "タイトル", value: "title", sortable: false },
        { text: "何話", value: "chapter", sortable: false },
        { text: "金額", value: "amount", sortable: false },
        { text: "時間", value: "date", sortable: false }
      ],
      loading: false,
      avatar: require("~/assets/profile.png")
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["dashboard/getTransactions"];
    }
  },
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("dashboard/fetchTransactionList", { page: 1 });
    this.loading = false;
  }
};
</script>

<style lang="scss">
.transaction-list {
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
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
    max-height: 30rem;
    overflow: auto;
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
