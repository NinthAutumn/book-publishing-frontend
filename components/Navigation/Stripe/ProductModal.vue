<template>
  <div open class="product-modal" width="30rem" height="50rem">
    <div class="product-modal__wrapper elevation-10">
      <div class="product-modal__header flex-row flex--between flex--align">
        <fa @click="goBack" v-if="step > 1" icon="arrow-left" class="product-modal__back"></fa>クラウンコインを入手
        <fa
          @click="$store.commit('TOGGLE_PRODUCT_MODAL')"
          class="product-modal__close"
          icon="times"
        ></fa>
      </div>
      <div class="product-modal__container">
        <p
          class="product-modal__description"
        >*クラウンコインとは本の話の購入・作者のサポート・広告のスキップなどができる nobles.jp ないの仮想通貨である</p>
        <transition name="slide-fade">
          <div class="product-modal__content" v-if="step ===1">
            <div class="product-modal__buy-price_show">{{`合計 ¥${price}円`}}</div>
            <li
              class="product-modal__item"
              v-for="(product,index) in products"
              :key="index"
              :class="{'product-modal__item--active':selected===index}"
              @click="selectProduct(index,product.amount,product.value,product.id)"
            >
              <div class="product-modal__crown-coin">
                <Currency :amount="product.amount"></Currency>
              </div>
              <div class="product-modal__price">
                {{`¥${product.value + (product.value*0.08)}円`}}
                <span class="product-modal__tax">税込</span>
              </div>
            </li>
            <div @click="step = 2" v-ripple class="product-modal__button">{{`クラウンコインを${coin}個買う`}}</div>
          </div>
        </transition>
        <transition name="slide-fade">
          <payment-method :price="price" v-model="step" v-if="step === 2" :coin="coin" :skuId="id"></payment-method>
        </transition>
        <transition name="slide-fade">
          <payment-form-card v-if="step === 3" :price="price" :coin="coin" :skuId="id"></payment-form-card>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      products: [
        { amount: 30, value: 100, selected: false, id: "sku_EzvZQ4Yx0HJwAI" },
        { amount: 150, value: 500, selected: false, id: "sku_EzvdVvAjFFbOmK" },
        { amount: 300, value: 1000, selected: false, id: "sku_EzvbfgXi08lDyX" },
        { amount: 750, value: 2500, selected: false, id: "sku_F01o0Cvj1cIEM6" },
        {
          amount: 1500,
          value: 5000,
          selected: false,
          id: "sku_F01prA6uqwsuqD"
        },
        {
          amount: 3000,
          value: 10000,
          selected: false,
          id: "sku_F01ps58bR5lbRw"
        }
      ],
      open: true,
      selected: 1,
      step: 1,
      price: 500 + 500 * 0.08,
      id: "sku_EzvdVvAjFFbOmK",
      coin: 150
    };
  },
  watch: {},
  components: {
    Currency: () => import("@/components/All/Currency"),
    PaymentFormCard: () =>
      import("@/components/Navigation/Stripe/PaymentFormCard"),
    PaymentMethod: () => import("@/components/Navigation/Stripe/PaymentMethod")
  },
  methods: {
    selectProduct: function(index, coin, price, id) {
      this.selected = index;
      this.coin = coin;
      this.price = price + price * 0.08;
      this.id = id;
    },
    goBack() {
      if (this.step === 4) {
        this.step--;
        this.step--;
      } else if (
        this.step === 3 &&
        this.$store.getters["stripe/getPaymentMethods"].data.length < 1
      ) {
        this.step = 1;
      } else {
        this.step--;
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("stripe/fetchPaymentMethods", {
      customerId: this.$store.getters["user/loggedInUser"].stripeCustomerId,
      type: "card"
    });
  }
};
</script>

<style lang="scss">
.product-modal {
  width: 100%;
  margin-top: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  $self: &;
  #card-element {
  }
  &__wrapper {
    border-radius: 0.4rem;
    #{$self}__content {
      color: black;
    }
    background-color: #fff;
    #{$self}__container {
      min-height: 55rem;
      border-radius: 0.4rem;
      max-width: 40rem;
      color: #6b7c93;
      background-color: #f7f8f9;
    }

    #{$self}__header {
      font-size: 1.8rem;
      padding: 1rem 2rem;
      border-bottom: 1px solid rgb(238, 238, 238);
    }
    #{$self}__back {
      color: $secondary;
      &:hover {
        cursor: pointer;
        // transform: translateX(2px);
        // transition: transform 100ms;
      }
      &:active {
        transform: translateX(-1px);
        transition: transform 100ms;
      }
    }
    #{$self}__close {
      color: grey;
      transform: scale(1);
      transition: transform 200ms;
      &:hover {
        transform: scale(1.2);
        transition: transform 200ms;
        cursor: pointer;
      }
    }
    #{$self}__description {
      padding: 1rem 2rem;
      font-size: 1.3rem;
      // padding: 1rem;
      border-radius: 1rem;
      margin-bottom: 1rem;
      color: rgb(102, 102, 102);
    }
    #{$self}__item {
      margin: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(211, 211, 211);
      transition: border 300ms;
      &:hover {
        border: 1px solid $secondary;
        transition: border 300ms;
        cursor: pointer;
      }
      &--active {
        border: 1px solid $secondary;
        background-color: rgb(232, 244, 255);
        transition: background-color 300ms;
      }
      #{$self}__crown-coin {
      }
      #{$self}__price {
        font-size: 1.6rem;
      }
    }
    #{$self}__submit {
      padding: 0 2rem;
    }
    #{$self}__buy-price_show {
      font-size: 1.6rem;
      text-align: right;
      margin-bottom: 1rem;
      // margin-right: 0.5rem;
      padding: 0 2rem;
    }
    #{$self}__button {
      font-size: 1.6rem;
      padding: 0.75rem 0;
      box-sizing: border-box;
      margin: 0rem 2rem;
      text-align: center;
      border-radius: 0.25rem;
      color: white;
      background-color: $secondary;
      transition: box-shadow 300ms, background-color 300ms;
      user-select: none;
      &:hover {
        cursor: pointer;
        color: $secondary;
        background-color: #fff;
        box-shadow: 1px 1px 5px rgb(226, 226, 255);
        transition: box-shadow 300ms, background-color 300ms;
      }
    }
  }
}
</style>
