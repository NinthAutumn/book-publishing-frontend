<template>
  <div class="views-bargraph">
    <div class="views-bargraph__title">作品の視聴回数</div>
    <div class="views-bargraph__graph">
      <no-ssr>
        <ve-line :height="height" :settings="chartSetting" :data="chartData"></ve-line>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  props: ["height"],
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
      object: {}
    };
  },
  async mounted() {
    let row = Object.keys(this.$store.getters["analytic/getTotalViews"]);
    let i = 7;
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
          this.$store.getters["analytic/getTotalViews"][item].forEach(book => {
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
  &__title {
    font-size: 1.6rem;
    padding: 2rem 1rem;
    font-weight: bold;
  }
  &__graph {
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
</style>
