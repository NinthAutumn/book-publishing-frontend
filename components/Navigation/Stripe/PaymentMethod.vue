<template>
  <div class="payment-method" v-loading="loading">
    <div class="payment-method__buy-price">{{price_word||`合計 ¥${price}円`}}</div>
    <div class="payment-method__container">
      <ul class="payment-method__stored-list">
        <li
          class="payment-method__cards"
          v-for="(method, index) in paymentMethods.data"
          :key="index"
          @click="selectCard(index,method.id,method.card.last4)"
        >
          <Card
            :last="method.card.last4"
            :name="method.billing_details.name"
            :expYear="method.card.exp_year"
            :expMonth="method.card.exp_month"
            :brand="method.card.brand"
            :selected="selectedCard.index === index"
          ></Card>
          <!-- {{method}} -->
        </li>
        <!-- <div id="ideal-bank-element"></div> -->
      </ul>
      <ul class="payment-method__list">
        <li class="payment-method__item" v-for="(method,index) in methods" :key="index">
          <button
            class="payment-method__button elevation-2"
            :class="`payment-method__button--buy`"
            v-if="method.value==='buy'"
            @click="buyButton"
            v-ripple
          >
            <!-- <fa class="payment-method__button__icon" ></fa> -->
            {{`最後${selectedCard.last}桁のカードを使用`}}
          </button>
          <button
            class="payment-method__button elevation-2"
            :class="`payment-method__button--${method.value}`"
            v-ripple
            @click="selectPayment(method.step)"
            v-else
          >
            <fa class="payment-method__button__icon" :icon="method.icon"></fa>
            {{`新しい${method.key}を使う`}}
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
import { get } from "lodash";
import { mapGetters } from "vuex";
export default {
  props: {
    value: String,
    price: [String, Number],
    skuId: String,
    coin: [String, Number],
    price_word: String,
    sub: Boolean
  },
  components: {
    Card: () => import("@/components/All/Card")
  },
  computed: {
    ...mapGetters({
      paymentMethods: "stripe/getPaymentMethods",
      paymentIntent: "stripe/getPaymentIntent",
      selectedPlan: "subscription/getSitePlan",
      subscription: "stripe/getSubscription"
    })
  },
  data() {
    return {
      methods: [
        { key: "銀行", img: [""], value: "buy", icon: "university", step: 4 },
        {
          key: "カード",
          icon: "credit-card",
          img: [
            require("@/assets/img/jcb.png"),
            require("@/assets/img/visa.png"),
            require("@/assets/img/mastercard.png"),
            require("@/assets/img/amex.png"),
            require("@/assets/img/diner.png")
          ],
          value: "card",
          step: 3
        }
      ],
      loading: false,
      selectedCard: {
        index: 0,
        id: "",
        last: ""
      },
      stripe: this.$stripe.import(),
      card: {
        number: "••••••••••••4242",
        name: "Comprador T Cielo",
        expiry: "12/2018",
        cvc: "123"
      }
    };
  },

  async mounted() {
    // const elements = this.stripe.elements({ locale: "ja" });
    if (get(this.paymentMethods, "data.length", 0) < 1) {
      this.$emit("input", 3);
    } else {
      this.selectedCard = {
        index: 0,
        id: this.$store.getters["stripe/getPaymentMethods"].data[0].id,
        last: this.$store.getters["stripe/getPaymentMethods"].data[0].card.last4
      };
    }
    const options = {
      // Custom styling can be passed to options when creating an Element.
      style: {
        base: {
          // Add your base input styles here. For example:
          fontSize: "16px",
          color: "#32325d",
          padding: "10px 12px"
        }
      }
    };

    // Create an instance of the idealBank Element.
    // const idealBank = elements.create("idealBank", options);

    // Add an instance of the idealBank Element into
    // the `ideal-bank-element` <div>.
    // idealBank.mount("#ideal-bank-element");
  },
  methods: {
    async selectPayment(value) {
      this.$emit("input", value);
    },
    async buyButton() {
      this.loading = true;
      let res;
      if (this.sub) {
        res = await this.$store.dispatch("stripe/setSubscription", {
          planId: this.selectedPlan.id,
          stripePlanId: this.selectedPlan.stripe_plan_id,
          paymentMethod: this.selectedCard.id
        });
      } else {
        res = await this.$store.dispatch("stripe/postPaymentIntent", {
          payment_method_id: this.selectedCard.id,
          amount: this.price,
          skuId: this.skuId
        });
      }

      this.handleServerResponse(res);
      this.loading = false;
    },
    selectCard(index, id, last) {
      this.selectedCard = {
        index: index,
        id: id,
        last: last
      };
    },
    handleServerResponse: async function(response) {
      if (response.error) {
      } else if (response.requires_action) {
        const result = await this.stripe.handleCardAction(
          this.paymentIntent.client_secret
        );
        if (result.error) {
          if (this.sub) {
            return this.$toast.show("会員登録に失敗しました", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 2000,
              icon: "extension"
            });
          }
          return this.$toast.show("クラウンコインの購入に失敗しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 2000,
            icon: "extension"
          });
        } else {
          const res = await this.$axios.get("/stripe/confirmPayment", {
            payment_intent_id: this.paymentIntent.id
          });
          this.handleServerResponse(res);
        }
      } else {
        const form = {
          skuId: this.skuId
        };
        if (this.sub) {
          await this.$store.dispatch("subscription/setSubscription", {
            planId: this.selectedPlan.id,
            subscription: this.subscription
          });
          await this.$store.dispatch("user/fetchUser");

          return this.$toast.show("プレミアム会員登録に成功しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 2000,
            icon: "check_circle"
          });
        } else {
          await this.$store.dispatch("wallet/buyCoin", { form });
          this.$store.commit("TOGGLE_PRODUCT_MODAL");
          return this.$toast.show("クラウンコインの購入に成功しました", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 2000,
            icon: "check_circle"
          });
        }
      }
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
    #{$self}__stored-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 200px;
      overflow: auto;
      padding: 1rem;
    }
    #{$self}__cards {
      width: 47%;
      margin-bottom: 2rem;
    }
  }
  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

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
      &--buy {
        background-color: #32325d;
        color: white;
        transition: 300ms;
        margin-top: 3rem;
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
    #{$self}__item {
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
    color: black;
  }
}
</style>
