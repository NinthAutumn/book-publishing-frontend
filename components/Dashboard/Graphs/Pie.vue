<template>
  <div class="pie-graph">
    <div class="pie-graph__header flex-row flex--align flex--between">
      <div class="pie-graph__title">作品比較</div>
      <div class="pie-graph__select flex-row">
        <Select
          :width="100"
          v-model="dataSelected"
          name="タイプ"
          :object="data_type"
          transition="grow-shrink"
          def="視聴回数"
        ></Select>

        <Select
          :width="100"
          v-model="graph"
          name="時間"
          :object="graph_select"
          transition="grow-shrink"
          def="パイ"
        ></Select>
      </div>
    </div>
    <div class="pie-graph__graph">
      <no-ssr>
        <ve-pie v-if="graph === 0" :data="chartData" :settings="chartSetting"></ve-pie>
        <ve-ring v-if="graph=== 1" :data="chartData" :settings="chartSetting"></ve-ring>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartSetting: {
        nullAddZero: true,
        offsetY: 250
        // radius: 90
        // scale: [true, true]
      },
      chartData: {
        columns: ["book", "sum"],
        rows: []
      },
      data_type: [
        { key: "投票", value: 0 },
        { key: "視聴回数", value: 1 },
        { key: "購入履歴", value: 2 },
        { key: "ブックマーク", value: 3 }
      ],
      graph_select: [{ key: "パイ", value: 0 }, { key: "リング", value: 1 }],
      graph: 0,
      dataSelected: 1
    };
  },
  watch: {
    dataSelected: async function(val) {
      this.changeDateHandler();
    }
  },
  components: {
    Select: () => import("@/components/All/Select")
  },
  methods: {
    changeDateHandler() {
      this.chartData.rows = [];
      this.$store
        .dispatch("dashboard/fetchPieAnalytics", {
          type: this.dataSelected,
          time: 7
        })
        .then(books => {
          books.forEach(item => {
            this.chartData.rows.push({ book: item.title, sum: item.sum });
          });
        });
    }
  },
  async mounted() {
    this.$store
      .dispatch("dashboard/fetchPieAnalytics", {
        type: this.dataSelected,
        time: 7
      })
      .then(books => {
        books.forEach(item => {
          this.chartData.rows.push({ book: item.title, sum: item.sum });
        });
      });
  }
};
</script>

<style lang="scss">
.pie-graph {
  width: 49%;
  margin-right: 0;
  padding: 1rem;
  background-color: #fff;
  // width: 50%;
  // height: 50rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  // position: relative;
  $self: &;
  &__header {
    padding: 2rem 1rem;
    #{$self}__title {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
  &__pie {
  }
}
</style>
