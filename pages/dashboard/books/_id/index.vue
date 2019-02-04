<template>
  <div class="book-show-dashboard">
    <chapter-toc :toc="toc"></chapter-toc>
  </div>
</template>

<script>
import ChapterToc from "@/components/Dashboard/ChapterToc";
export default {
  layout: "user-nav/User",
  components: {
    ChapterToc
  },
  async fetch({ store, params }) {
    await store.dispatch("chapter/TOCBook", params.id);
    // console.log(store.state.auth);
  },
  created() {
    console.log(this.$store.state.chapter.cToc);
  },
  computed: {
    toc() {
      return this.$store.state.chapter.cToc;
    }
  },
  methods: {
    handleClick() {}
  },
  data() {
    return {
      tableData3: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.el-table th > .cell {
  font-size: 16px;
}
.el-table .cell {
  font-size: 14px;
  // text-align: center;
}
.el-button + .el-button {
  margin: 0;
}
.el-button--text {
  // font-size: 14px !important;
  margin: 0;

  span {
    font-size: 14px;
  }
}

.book-show-dashboard {
  height: 100vh;
}
</style>
