<template>
  <div class="payment-method">
    <div class="payment-method__buy-price">{{`合計 ¥${price}円`}}</div>
    <div class="payment-method__container">
      <ul class="payment-method__stored-list">
        <li
          class="payment-method__stored-item"
          v-for="(method, index) in paymentMethods"
          :key="index"
        ></li>
      </ul>
      <ul class="payment-method__list">
        <li class="payment-method__item" v-for="(method,index) in methods" :key="index">
          <button
            class="payment-method__button elevation-2"
            :class="`payment-method__button--${method.value}`"
            v-ripple
            @click="selectPayment(method.step)"
          >
            <fa class="payment-method__button__icon" :icon="method.icon"></fa>
            {{`${method.key} を選択`}}
          </button>
          <div class="payment-method__image-list elevation-1">
            <div class="payment-method__image-item" v-for="(img) in method.img" :key="img">
              <v-img width="5rem" :src="img"></v-img>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "price"],
  async created() {
    await this.$store.dispatch("stripe/fetchPaymentMethods", {
      customerId: this.$store.getters.loggedInUser.stripeCustomerId,
      type: "card"
    });
  },
  data() {
    return {
      methods: [
        { key: "銀行", img: [""], value: "bank", icon: "university", step: 4 },
        {
          key: "カード",
          icon: "credit-card",
          img: [
            require("@/assets/png/jcb.png"),
            require("@/assets/png/visa.png"),
            require("@/assets/png/master.png"),
            require("@/assets/png/america.png")
          ],
          value: "card",
          step: 3
        }
      ]
    };
  },
  computed: {
    paymentMethods() {
      return this.$store.getters["stripe/getPaymentMethods"];
    }
  },
  methods: {
    selectPayment(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
.payment-method {
  $self: &;
  &__buy-price {
    font-size: 1.6rem;
    text-align: right;
    margin-bottom: 1rem;
    // margin-right: 0.5rem;
    padding: 0 2rem;
  }
  &__container {
    padding: 0 2rem;
  }
  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    #{$self}__item {
      #{$self}__button {
        font-size: 1.6rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        margin: 1rem;
        &__icon {
          margin-right: 0.5rem;
        }
        // display: flex;
        // align-items: center;
        // box-shadow
        &--bank {
          background-color: #32325d;
          color: white;
          transition: 300ms;
          &:hover {
            color: #32325d;
            background-color: white;
            transition: 300ms;
          }
        }
        &--card {
          background-color: #4554ff;
          color: white;
          transition: 300ms;
          &:hover {
            color: #4554ff;
            background-color: white;
            transition: 300ms;
          }
        }
        &:focus,
        &:active {
          outline: none;
        }
      }

      #{$self}__image-list {
        display: flex;
        align-items: center;
        justify-content: center;
        #{$self}__image-item {
          // text-align: center;
          // margin-right: 0.5rem;
          // box-shadow:
        }
      }
    }
  }
  &__buy-price {
  }
}
</style>
