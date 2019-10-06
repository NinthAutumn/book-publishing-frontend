<template>
  <div class="dialog dialog__container sub-modal__wrapper">
    <div class="dialog__content sub-modal__container" v-click-outside="toggle">
      <div class="sub-modal__header flex-row flex--between flex--align">
        <div class="sub-modal__prev" v-if="step > 1" @click.stop="step--">
          <fa icon="arrow-left"></fa>
        </div>
        <div class="sub-modal__title">
          <fa icon="chess-king" style="margin-right:1rem;"></fa>プレミアム会員になる
        </div>
        <fa class="sub-modal__icon" icon="times" @click="toggle"></fa>
      </div>
      <div class="sub-modal__content" v-if="!loading">
        <transition name="slide-fade">
          <sub-list v-model="step" v-if="step===1"></sub-list>
          <PaymentMethod
            :price_word="`合計 ¥${selectedPlan.price}円/${selectedPlan.interval_short}`"
            :price="selectedPlan.price"
            v-model="step"
            sub
            v-if="step === 2"
          ></PaymentMethod>
          <payment-form
            :price_word="`¥${selectedPlan.price}円/${selectedPlan.interval_short}に登録`"
            :price="selectedPlan.price"
            v-model="step"
            sub
            v-if="step === 3"
          ></payment-form>
        </transition>
      </div>
      <div class="sub-modal__loading" v-else>
        <ripple-loader color="#556CD6" height="50rem"></ripple-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      step: 1,
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      selectedPlan: "subscription/getSitePlan"
    })
  },
  methods: {
    ...mapMutations({
      toggle: "subscription/TOGGLE_SITE_MODAL"
    })
  },
  components: {
    SubList: () => import("./SubList"),
    SubPaymentList: () => import("./SubPaymentList"),
    SubPaymentMethod: () => import("./SubPaymentMethod"),
    PaymentMethod: () => import("@/components/Navigation/Stripe/PaymentMethod"),
    PaymentForm: () => import("@/components/Navigation/Stripe/PaymentFormCard"),
    RippleLoader: () => import("@/components/Web/Loaders/Ripple")
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("subscription/fetchSubscription");
    await this.$store.dispatch("subscription/fetchSitePlans");
    await this.$store.dispatch("stripe/fetchPaymentMethods", {
      type: "card"
    });
    this.loading = false;
  }
};
</script>

<style lang="scss">
.sub-modal {
  $self: &;
  &__container {
    width: 40rem;
    height: 60rem;

    padding: 0 !important;
    background-color: #f7fafc !important;
  }
  &__prev {
    font-size: 1.8rem;
    color: #5580e9;
    &:hover {
      cursor: pointer;
    }
  }
  &__content {
  }

  &__header {
    padding: 1rem 2rem;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 2rem;
    #{$self}__title {
      font-size: 1.8rem;
    }
    #{$self}__icon {
      font-size: 1.8rem;
    }
  }
}
</style>
