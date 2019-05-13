<template>
  <div class="vote-graph">
    <div class="vote-graph__header">
      <div class="vote-graph__title">作品グラフ</div>
      <p
        class="vote-graph__message"
        v-if="dataSelected===4"
      >評価: 5☆ = 4ポイント, 4☆ =2ポイント, 3☆ =0ポイント, 2☆ = -2 ポイント,1☆ = -4ポイント</p>
      <div class="vote-graph__select flex-row">
        <Select
          :width="100"
          v-model="dataSelected"
          name="タイプ"
          :object="data_type"
          transition="grow-shrink"
          def="投票"
        ></Select>
        <Select
          v-if="interval === 0"
          :width="100"
          v-model="type"
          name="期間"
          :object="day_interval"
          transition="grow-shrink"
          def="今週"
        ></Select>
        <Select
          v-if="interval === 1"
          :width="100"
          v-model="type"
          name="期間"
          :object="week_interval"
          transition="grow-shrink"
          def="今月"
        ></Select>
        <!-- <Select
          :width="100"
          v-model="interval"
          name="絶え間"
          :object="time_type"
          transition="grow-shrink"
          def="日間"
        ></Select>-->
        <Select
          :width="100"
          v-model="graph"
          name="グラフ"
          :object="graph_select"
          transition="grow-shrink"
          def="バーグラフ"
        ></Select>
      </div>
    </div>

    <div class="vote-graph__graph">
      <no-ssr>
        <ve-histogram
          :data-zoom="dataZoom"
          v-if="graph===0"
          :data="chartData"
          :settings="chartSetting"
          :loading="loading"
        ></ve-histogram>
        <ve-line
          :data-zoom="dataZoom"
          v-if="graph===1"
          :data="chartData"
          :settings="chartSetting"
          :loading="loading"
        >
          <!-- <div class="data-empty">data empty😂</div> -->
        </ve-line>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day_interval: [
        // { key: "視聴回数", value: "views" },
        { key: "今週", value: 7 },
        { key: "今月", value: 31 },
        { key: "今年", value: 365 }
        // { key: "全体", value: "total" }
      ],
      week_interval: [
        { key: "今月", value: 4 },
        { key: "半年", value: 12 },
        { key: "半年", value: 24 },
        { key: "今年", value: 48 }
      ],
      time_type: [
        { key: "日間", value: 0 },
        { key: "週間", value: 1 }
        // { key: "月間", value: 2 }
      ],
      data_type: [
        { key: "投票", value: 0 },
        { key: "視聴回数", value: 1 },
        { key: "購入履歴", value: 2 },
        { key: "ブックマーク", value: 3 },
        { key: "評価", value: 4 }
      ],
      interval: 0,
      type: 7,
      dataSelected: 0,
      chartSetting: {
        nullAddZero: true,
        area: true,
        dataType: "票"
        // scale: [true, true]
      },
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] }
        }
      },
      chartData: {
        columns: ["date"],
        rows: []
      },
      object: {},
      loading: false,
      graph: 0,
      markLine: {
        data: [
          {
            name: "average",
            type: "average"
          }
        ]
      },
      dataZoom: [
        {
          type: "slider"
        }
      ],
      graph_select: [
        { key: "バーグラフ", value: 0 },
        { key: "ライングラフ", value: 1 }
      ]
      // dataEmpty: true
    };
  },
  components: {
    Select: () => import("@/components/All/Select")
  },
  watch: {
    type: function(val) {
      this.loading = true;
      this.getAnalytics();
      this.loading = false;
    },
    dataSelected: function(val) {
      this.loading = true;
      this.getAnalytics();
      this.loading = false;
    },
    interval: function(val) {
      this.loading = true;
      this.type = 4;
      this.getAnalytics();
      this.loading = false;
    }
  },
  methods: {
    getAnalytics: async function() {
      this.$store
        .dispatch("dashboard/fetchMainAnalytics", {
          time: this.type,
          type: this.dataSelected,
          interval: this.interval
        })
        .then(time => {
          let row = Object.keys(time);
          this.chartData = {
            columns: ["date"],
            rows: []
          };
          if (this.type === "total") {
          } else {
            let i = this.type - 1;
            while (i >= 0) {
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
                  time[item].forEach(book => {
                    if (this.chartData.columns.indexOf(book.title) === -1) {
                      this.chartData.columns.push(book.title);
                    }
                    this.object[book.title] = book.data;
                  });
                  this.chartData.rows[index] = this.object;
                }
              });
            });
          }
        });
    },
    changeDateTransaction: async function() {
      this.$store
        .dispatch("dashboard/fetchTransactionGraph", {
          time: this.type,
          interval: 0
        })
        .then(transaction => {
          let row = Object.keys(transaction);
          let i = this.type - 1;
          this.chartData = {
            columns: ["date"],
            rows: []
          };
          while (i >= 0) {
            let date = this.$moment()
              .subtract(i, "days")
              .format("YYYY-MM-DD");
            this.chartData.rows.push({ date });
            // this.chartData.labels.push(date);
            i--;
          }
          row.forEach(item => {
            this.chartData.rows.forEach((el, index) => {
              if (el.date === item) {
                this.object = {
                  date: item
                };
                transaction[item].forEach(book => {
                  if (this.chartData.columns.indexOf(book.title) === -1) {
                    this.chartData.columns.push(book.title);
                    // this.chartData.labels.push()
                  }
                  this.object[book.title] = book.sum;
                });
                this.chartData.rows[index] = this.object;
              }
            });
          });
        });
    },
    changeDateViews: async function() {
      this.$store
        .dispatch("analytic/fetchUserViews", { type: this.type })
        .then(async time => {
          let row = Object.keys(time);
          this.chartData = {
            columns: ["date"],
            rows: []
          };
          if (this.type === "total") {
          } else {
            let i = this.type - 1;
            while (i >= 0) {
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
                  time[item].forEach(book => {
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
    },
    changeDateVote: async function() {
      this.$store
        .dispatch("dashboard/fetchVotesBar", { time: this.type })
        .then(time => {
          let row = Object.keys(time);
          this.chartData = {
            columns: ["date"],
            rows: []
          };
          let i = this.type - 1;
          while (i >= 0) {
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
                time[item].forEach(book => {
                  if (this.chartData.columns.indexOf(book.title) === -1) {
                    this.chartData.columns.push(book.title);
                  }
                  this.object[book.title] = book.votes;
                });
                this.chartData.rows[index] = this.object;
              }
            });
          });
        });
    }
  },
  mounted: async function() {
    this.$store
      .dispatch("dashboard/fetchMainAnalytics", {
        time: this.type,
        type: this.dataSelected,
        interval: 0
      })
      .then(time => {
        let row = Object.keys(time);
        this.chartData = {
          columns: ["date"],
          rows: []
        };
        if (this.type === "total") {
        } else {
          let i = this.type - 1;
          while (i >= 0) {
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
                time[item].forEach(book => {
                  if (this.chartData.columns.indexOf(book.title) === -1) {
                    this.chartData.columns.push(book.title);
                  }
                  this.object[book.title] = book.data;
                });
                this.chartData.rows[index] = this.object;
              }
            });
          });
        }
      });
  }
};
</script>

<style lang="scss">
.vote-graph {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  $self: &;
  margin-bottom: 1rem;
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
