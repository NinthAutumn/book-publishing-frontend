<template>
  <div class="sub-list">
    <div class="sub-list__container">
      <ul class="sub-list__list">
        <plan-list
          :selected="selected"
          :plan_index="index"
          :plan="plan"
          :plan_key="key"
          v-for="(plan,key,index) in plans"
          :key="key"
          @select_modal="selectModal"
          :disable="index > 0"
        ></plan-list>
      </ul>
      <div
        v-ripple
        @click="moveStep"
        class="sub-list__button"
      >{{`¥${selectedPlan.price}円/${selectedPlan.interval_short}のプランに登録`}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["input"],
  data() {
    return {
      selected: 0
    };
  },
  watch: {},
  components: {
    PlanList: () => import("./PlanList")
  },
  computed: {
    ...mapGetters({
      plans: "subscription/getSitePlans",
      selectedPlan: "subscription/getSitePlan"
    })
  },
  methods: {
    selectModal(e) {
      this.selected = e;
    },
    moveStep() {
      this.$emit("input", 2);
    }
  },
  async mounted() {
    await this.$store.dispatch("subscription/fetchSitePlans");
    await this.$store.dispatch("stripe/fetchPaymentMethods", {
      type: "card"
    });
  }
};
</script>

<style lang="scss">
.sub-list {
  $self: &;
  padding: 0 2rem;
  &__container {
    #{$self}__list {
    }
    #{$self}__button {
      // height: 4rem;

      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      padding: 1.2rem 1rem;
      border-radius: 0.5rem;
      background-color: #4554ff;
      color: white;
      user-select: none;
      transition: 300ms;
      -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      &:hover {
        cursor: pointer;
        color: #4554ff;
        background-color: white;
        transition: 300ms;
      }
    }
  }
}
</style>
