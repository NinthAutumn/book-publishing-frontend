<template>
  <div class="views-bargraph">
    <no-ssr>
      <ve-histogram :height="height" :settings="chartSetting" :data="chartData"></ve-histogram>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: ["height"],
  data() {
    return {
      chartSetting: {},
      chartData: {
        columns: ["date"],
        rows: []
      }
    };
  },
  async mounted() {
    console.log(this.$store.getters["dashboard/getTotalViews"]);
    this.$store.getters["dashboard/getTotalViews"].forEach(stat => {
      if (this.chartData.columns.indexOf(stat._id.book[0]) === -1) {
        this.chartData.columns.push(stat._id.book[0]);
      }
      this.chartData.rows.push({
        date: stat._id.day,
        [stat._id.book[0]]: stat.sum
      });
    });
  }
};
</script>

<style lang="scss">
.views-bargraph {
  padding: 10px;
  width: 500px;
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgb(233, 233, 233);
  border-radius: 5px;
}
</style>
