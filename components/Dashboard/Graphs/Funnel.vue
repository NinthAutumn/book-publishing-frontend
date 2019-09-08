<template>
  <div class="funnel-graph">
    <div class="funnel-graph__header">
      <div class="funnel-graph__title">作品ファネル</div>
      <Select :width="100" v-model="bookId" name="作品" :object="books" transition="grow-shrink"></Select>
    </div>
    <div class="funne-graph__graph">
      <div
        class="funne-graph__book-title"
        style="padding:1rem 2rem;font-size:1.4rem;"
      >{{bookId.title}}</div>
      <no-ssr>
        <ve-funnel :data="chartData" :settings="chartSetting"></ve-funnel>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      books: "analytic/getFunnelBookList"
    })
  },
  watch: {
    bookId: async function(val) {
      const data = await this.$store.dispatch("dashboard/fetchBookFunnel", {
        bookId: val.id
      });

      let row = Object.keys(data);
      this.chartData.rows = [];
      row.forEach(item => {
        let object = {
          status: item,
          value: data[item]
        };
        this.chartData.rows.push(object);
      });
    }
  },
  components: {
    Select: () => import("@/components/All/Select")
  },
  data() {
    return {
      chartData: {
        columns: ["status", "value"],
        rows: []
      },
      chartSetting: {
        dimension: "status",
        useDefaultOrder: true,
        ascending: true,
        metrics: "value"
        // scale: [true, true]
      },
      book_list: [],
      bookId: {}
    };
  },
  async mounted() {
    if (this.books[0]) {
      this.books[0];
      // alert(this.books[0]);
      this.bookId = {
        id: this.books[0].value.id,
        title: this.books[0].value.title
      };
    } else {
      this.bookId = {
        id: 0,
        title: 0
      };
    }
    const data = await this.$store.dispatch("dashboard/fetchBookFunnel", {
      bookId: this.bookId.id
    });
    this.chartData.rows = [];
    let row = Object.keys(data);
    row.forEach(item => {
      let object = {
        status: item,
        value: data[item]
      };
      this.chartData.rows.push(object);
    });
    // let row = Object.keys
    // .then(data => {

    // });
  }
};
</script>

<style lang="scss">
.funnel-graph {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  $self: &;
  margin-bottom: 1rem;
  width: 49%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #{$self}__title {
      font-size: 1.6rem;
      padding: 2rem;
      font-weight: bold;
    }
  }
  &__graph {
  }
}
</style>
