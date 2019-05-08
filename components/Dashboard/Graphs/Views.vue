<template>
  <div class="views-bargraph">
    <div class="views-bargraph__header">
      <div class="views-bargraph__title">作品の視聴回数</div>
      <div class="views-bargraph__select">
        <Select
          :width="100"
          v-model="type"
          name="時間"
          :object="sort_type"
          transition="grow-shrink"
          def="一週間"
        ></Select>
      </div>
    </div>

    <div class="views-bargraph__graph" v-loading="loading" ref="bargraph">
      <no-ssr>
        <ve-line
          ref="view-bar"
          judge-width
          :height="height"
          :settings="chartSetting"
          :data="chartData"
        ></ve-line>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  props: ["height"],
  components: {
    Select: () => import("@/components/All/Select")
  },
  data() {
    return {
      chartSetting: {
        nullAddZero: true
        // area: true
        // scale: [true, true]
      },
      chartData: {
        columns: ["date"],
        rows: []
      },
      object: {},
      sort_type: [
        // { key: "視聴回数", value: "views" },
        { key: "一週間", value: 8 },
        { key: "今月", value: 32 },
        { key: "今年", value: 366 }
        // { key: "全体", value: "total" }
      ],
      type: "",
      loading: false,
      isMounted: false
    };
  },
  computed: {
    time() {
      return this.$store.getters["analytic/getTotalViews"];
    },
    menu() {
      return this.$store.getters.getDMenuState;
    },
    widthBar() {
      if (this.isMounted) {
        return this.$refs["bargraph"].clientWidth;
      } else {
        return 0;
      }
    }
  },
  watch: {
    type: function(val) {
      this.changeDate();
    },
    widthBar: function(val) {
      console.log(val);
      //  this.$refs["bargraph"].clientWidth;
    },
    menu: function(val) {
      // console.log(this.widthBar);
      this.$refs[`view-bar`].echarts.resize({
        width: "auto"
      });
      // this.$nextTick(_ => {
      //   console.log("object");
      //   this.$refs[`view-bar`].echarts.resize();
      // });
    }
  },
  methods: {
    async changeDate() {
      this.loading = true;
      this.$store
        .dispatch("analytic/fetchUserViews", { type: this.type })
        .then(async () => {
          let row = Object.keys(this.time);
          this.chartData = {
            columns: ["date"],
            rows: []
          };
          if (this.type === "total") {
          } else {
            let i = this.type;
            while (i > 0) {
              let date = this.$moment()
                .subtract(i, "days")
                .format("YYYY-MM-DD");
              this.chartData.rows.push({ date });
              i--;
            }
            row.forEach(item => {
              this.chartData.rows.forEach((el, index) => {
                if (el.date === item) {
                  this.object = {
                    date: item
                  };
                  this.time[item].forEach(book => {
                    if (this.chartData.columns.indexOf(book.title) === -1) {
                      this.chartData.columns.push(book.title);
                    }
                    this.object[book.title] = book.views;
                  });
                  this.chartData.rows[index] = this.object;
                }
              });
            });
          }
        });
      this.loading = false;
    }
  },

  async mounted() {
    // console.log(object);
    this.isMounted = true;
    let row = Object.keys(this.time);
    let i = 8;
    while (i > 0) {
      let date = this.$moment()
        .subtract(i, "days")
        .format("YYYY-MM-DD");
      this.chartData.rows.push({ date });
      i--;
    }
    row.forEach(item => {
      this.chartData.rows.forEach((el, index) => {
        if (el.date === item) {
          this.object = {
            date: item
          };
          this.time[item].forEach(book => {
            if (this.chartData.columns.indexOf(book.title) === -1) {
              this.chartData.columns.push(book.title);
            }
            this.object[book.title] = book.views;
          });
          this.chartData.rows[index] = this.object;
        }
      });
    });

    // console.log(row);
    // this.$store.getters["analytic/getTotalViews"].forEach(day => {
    //   this.object = {
    //     date: day._id.day
    //   };
    //   day.views.forEach(book => {
    //     if (this.chartData.columns.indexOf(book.book[0]) === -1) {
    //       this.chartData.columns.push(book.book[0]);
    //     }
    //     this.object[book.book[0]] = book.view;
    //   });
    //   this.chartData.rows.push(this.object);
    // });
  }
};
</script>

<style lang="scss">
.views-bargraph {
  // margin-top: 30px;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgb(233, 233, 233);
  border-radius: 5px;
  $self: &;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #{$self}__title {
      font-size: 1.6rem;
      padding: 2rem 1rem;
      font-weight: bold;
    }
  }
  &__title {
  }
  &__graph {
    max-width: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
</style>
