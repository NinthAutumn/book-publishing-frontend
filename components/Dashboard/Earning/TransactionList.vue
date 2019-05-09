<template>
  <div class="transaction-list" v-loading="loading">
    <header>購入リスト</header>
    <div class="transaction-list__list">
      <div class="transaction-list__item" v-for="(transaction,index) in transactions" :key="index">
        <div class="transaction-list__component transaction-list__component--avatar">
          <v-avatar class="elevation-1" :size="35">
            <!-- :src="`https://storage.googleapis.com/theta-images/${props.item.avatar}`" -->
            <v-img :src="transaction.avatar" :aspect-ratio="1/1.5" max-width="5rem"></v-img>
          </v-avatar>
        </div>
        <div
          class="transaction-list__component transaction-list__component--user"
        >{{transaction.username}}</div>
        <div
          class="transaction-list__component transaction-list__component--title"
        >{{`${transaction.book_title}`}}</div>
        <div
          class="transaction-list__component transaction-list__component--index"
        >{{`第${transaction.index}話`}}</div>
        <div class="transaction-list__component transaction-list__component--currency">
          <Currency :amount="transaction.amount" size="small"></Currency>
        </div>
        <div
          class="transaction-list__component transaction-list__component--created-at"
        >{{ $moment(transaction.created_at).startOf('second').fromNow() }}</div>
      </div>
      <no-ssr>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </no-ssr>
    </div>
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
      page: 2
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["dashboard/getTransactions"];
    }
  },
  methods: {
    async infiniteHandler($state) {
      const transaction = await this.$store.dispatch(
        "dashboard/fetchTransactionList",
        {
          page: this.page++,
          infinite: true
        }
      );
      if (transaction.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("dashboard/fetchTransactionList", {
      page: 1
    });
    this.loading = false;
  }
};
</script>

<style lang="scss">
.transaction-list {
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  // width: 900px;

  max-width: 100%;
  $self: &;
  // max-width: 50rem;  padding: 0.5rem;
  padding: 0.5rem;

  &__list {
    box-shadow: 0px;
    height: 30rem;
    overflow: auto;
  }
  header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  tbody {
    height: 10rem;
    overflow: auto;
  }
  &__item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.5rem 2rem;
    max-width: 100%;
    height: 5rem;
    // background-color: grey;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      cursor: pointer;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
    }
    #{$self}__avatar {
    }
    #{$self}__component {
      font-size: 1.4rem;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      &--avatar {
        display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        width: 10%;
      }
      &--user {
        width: 10%;
      }
      &--title {
        // min-width: 15rem;
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &--index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
      }
      &--currency {
        text-align: left;
        // justify-content:
        width: 20%;
      }
      &--created-at {
        width: 10%;
      }
    }
    // &--title {
    //   white-space: nowrap;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   max-width: 15rem;
    // }
  }
  height: 100%;
  background-color: #fff;
}
</style>
