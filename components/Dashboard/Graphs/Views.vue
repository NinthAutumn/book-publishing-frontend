<template>
  <div class="views-bargraph">
    <div class="views-bargraph__title">作品の視聴回数</div>
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
      },
      object: {}
    };
  },
  async mounted() {
    this.$store.getters["dashboard/getTotalViews"].forEach(day => {
      this.object = {
        date: day._id.day
      };
      day.views.forEach(book => {
        if (this.chartData.columns.indexOf(book.book[0]) === -1) {
          this.chartData.columns.push(book.book[0]);
        }
        this.object[book.book[0]] = book.view;
      });
      this.chartData.rows.push(this.object);
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
  &__title {
    font-size: 16px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
}
</style>
