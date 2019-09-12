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
          def="今週"
        ></Select>
      </div>
    </div>

    <div class="views-bargraph__graph" v-loading="loading" ref="bargraph">
      <client-only>
        <ve-line ref="view-bar" :height="height" :settings="chartSetting" :data="time"></ve-line>
      </client-only>
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
        nullAddZero: true,
        area: true
        // scale: [true, true]
      },
      chartData: {
        columns: ["date"],
        rows: []
      },
      object: {},
      sort_type: [
        // { key: "視聴回数", value: "views" },
        { key: "今週", value: 7 },
        { key: "今月", value: 31 },
        { key: "今年", value: 365 }
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
    }
  },
  watch: {
    type: function(val) {
      this.changeDate();
    }
  },
  methods: {
    async changeDate() {
      this.loading = true;
      await this.$store.dispatch("analytic/fetchUserViews", {
        type: this.type
      });
      this.loading = false;
    }
  },

  async mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
.views-bargraph {
  // margin-top: 30px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
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
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
</style>
