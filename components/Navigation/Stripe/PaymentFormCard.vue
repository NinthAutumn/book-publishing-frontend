<template>
  <div class="payment-form">
    <div class="payment-form__buy-price">{{`合計 ¥${price}円`}}</div>
    <div class="payment-form__select-payment">
      <!-- <div
        class="product-modal__card-list"
        v-for="(card,index) in customer.sources.data"
        :key="index"
      >{{card.card.last4}}</div>-->
    </div>
    <div class="form-container">
      <div class="flex-control flex-row flex--between">
        <div class="flex-control" style="width:45%;">
          <label for="fullname">姓名</label>
          <input
            class="payment-form__input payment-form__input--name payment-form__input--firstname"
            v-model="form.lastname"
            type="text"
            name="fullname"
            placeholder="姓名"
          />
        </div>
        <div class="flex-control" style="width:45%;">
          <label for="fullname">名前</label>
          <input
            class="payment-form__input payment-form__input--name"
            v-model="form.firstname"
            type="text"
            name="fullname"
            placeholder="名前"
          />
        </div>
      </div>
      <div class="flex-control">
        <label for="email">Eメール</label>
        <input
          class="payment-form__input payment-form__input--email"
          v-validate="'required|email'"
          type="email"
          v-model="form.email"
          data-vv-as="記入されたメールアドレス"
          name="email"
          placeholder="example@email.com"
        />
      </div>
      <div class="flex-control">
        <label for="phone">電話番号</label>
        <input
          class="payment-form__input payment-form__input--phone"
          v-model="form.phone"
          @keypress="isNumber"
          type="text"
          name="phone"
          placeholder="080-1234-5678"
        />
      </div>
    </div>
    <label class="payment-form__card-label">クレジット・デビット カード</label>
    <div id="card-element"></div>
    <div id="card-errors" role="alert" v-text="cardError"></div>
    <v-checkbox v-model="saveCard" :label="`カードを保存する`"></v-checkbox>
    <div
      v-loading="loading"
      v-ripple
      @click="buttonSelect"
      class="payment-form__buy-button"
    >{{price_word||`¥${price}円払う`}}</div>
    <div id="payment-request-button">
      <!-- A Stripe Element will be inserted here. -->
    </div>
  </div>
</template>


<script>
export default {
  props: {
    coin: Number,
    skuId: String,
    planId: String,
    sub: Boolean,
    price: Number,
    price_word: String
  },
  data() {
    return {
      stripe: this.$stripe.import(),
      form: {
        phone: "",
        email: this.$store.getters["auth/getUser"].email,
        fullname: "",
        firstname: "",
        lastname: ""
      },
      card: "",
      cardError: "",
      saveCard: true,
      loading: false
    };
  },
  watch: {
    "form.phone": function(val) {
      this.form.phone = this.form.phone.replace(/\D/g, "");
    }
  },
  computed: {
    customer() {
      return this.$store.getters["stripe/getCustomer"];
    },
    paymentIntent() {
      return this.$store.getters["stripe/getPaymentIntent"];
    }
  },
  components: {
    // Currency: () => import("@/components/All/Currency")
  },
  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (this.form.phone.length === 11) {
        return evt.preventDefault();
      }
      if (!/\d/g.test(evt.key)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    buttonSelect: async function() {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.card,
        {
          billing_details: {
            name: `${this.form.lastname} ${this.form.firstname}`,
            email: this.form.email,
            phone: `+88${this.form.phone}`
          }
        }
      );
      if (error) {
        return (this.cardError = error.message);
      }
      this.loading = true;

      if (this.saveCard) {
        await this.$store.dispatch("stripe/savePaymentMethod", {
          customerId: this.$store.getters["auth/getUser"].stripeCustomerId,
          paymentMethodId: paymentMethod.id
        });
      }
      let res;
      if (this.customer) {
        if (this.sub) {
          res = await this.$store.dispatch("stripe/setSubscription", {
            planId: this.selectedPlan.id,
            stripePlanId: this.selectedPlan.stripe_plan_id,
            paymentMethod: paymentMethod.id
          });
        } else {
          res = await this.$store.dispatch("stripe/postPaymentIntent", {
            payment_method_id: paymentMethod.id,
            amount: this.price,
            skuId: this.skuId
          });
        }
      } else {
        res = await this.$store.dispatch("stripe/postPaymentIntent", {
          payment_method_id: paymentMethod.id,
          amount: this.price,
          skuId: this.skuId
        });
      }
      this.handleServerResponse(res);
      this.loading = false;
    },
    paymentHandler: async function() {
      if (this.customer.sources.data.length > 0) {
      }
      const { source, error } = await this.stripe.createSource(this.card);
      if (error) {
        return (this.cardError = error.message);
      }
      const form = {
        phone: this.form.phone,
        email: this.form.email,
        fullname: `${this.form.lastname} ${this.form.firstname}`,
        skuId: this.skuId,
        source
      };
      await this.$store.dispatch("wallet/buyCoin", { sku_id: this.skuId });
    },
    handlePayment: async function() {
      this.loading = true;
      res = await this.$store.dispatch("stripe/postPaymentIntent", {
        payment_method_id: paymentMethod.id,
        amount: this.price,
        skuId: this.skuId
      });
      this.handleServerResponse(res);
      this.loading = false;
    },
    handleServerResponse: async function(response) {
      if (response.error) {
        console.log(response.error);
        return this.$toast.show("クラウンコインの購入に失敗しました", {
          icon: "extension",
          duration: 1000,
          position: "top-right",
          theme: "toasted-primary"
        });
      } else if (response.requires_action) {
        const result = await this.stripe.handleCardAction(
          this.paymentIntent.client_secret
        );
        if (result.error) {
          return this.$toast.show("クラウンコインの購入に失敗しました", {
            icon: "extension",
            duration: 1000,
            position: "top-right",
            theme: "toasted-primary"
          });
        } else {
          const res = await this.$axios.get("/stripe/confirmPayment", {
            payment_intent_id: this.paymentIntent.id
          });
          this.handleServerResponse(res);
        }
      } else {
        const form = {
          phone: this.form.phone,
          email: this.form.email,
          fullname: `${this.form.lastname} ${this.form.firstname}`,
          skuId: this.skuId
        };
        await this.$store.dispatch("wallet/buyCoin", { sku_id: this.skuId });
        this.$store.commit("TOGGLE_PRODUCT_MODAL", false);
        this.$emit("stripe");
        return this.$toast.show("クラウンコインの購入に成功しました", {
          icon: "check_circle",
          duration: 1000,
          position: "top-right",
          theme: "toasted-primary"
        });
      }
    }
  },
  async created() {},
  async mounted() {
    const elements = this.stripe.elements({ locale: "ja" });
    const self = this;
    let style = {
      base: {
        fontSize: "16px",
        color: "#32325d"
      }
    };
    const paymentRequest = this.stripe.paymentRequest({
      country: "JP",
      currency: "jpy",
      total: {
        label: "クラウンコイン",
        amount: this.price
      },
      requestPayerName: false,
      requestPayerEmail: false
    });
    const prButton = elements.create("paymentRequestButton", {
      paymentRequest
    });

    (async () => {
      // Check the availability of the Payment Request API first.
      const result = await paymentRequest.canMakePayment();
      if (result) {
        prButton.mount("#payment-request-button");
      } else {
        document.getElementById("payment-request-button").style.display =
          "none";
      }
    })();
    paymentRequest.on("paymentmethod", async ev => {
      res = await this.$store.dispatch("stripe/postPaymentIntent", {
        payment_method_id: ev.paymentMethod.id,
        amount: this.price,
        skuId: this.skuId
      });
      let clientSecret = this.paymentIntent.client_secret;
      const {
        error: confirmError,
        paymentIntent
      } = await this.stripe.confirmPaymentIntent(clientSecret, {
        payment_method: ev.paymentMethod.id
      });

      if (confirmError) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        ev.complete("fail");
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        ev.complete("success");
        // Let Stripe.js handle the rest of the payment flow.
        const { error } = await stripe.handleCardPayment(clientSecret);
        if (error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          // The payment has succeeded.
        }
      }
    });
    this.card = elements.create("card", { style: style });
    this.card.addEventListener("change", async function(event) {
      let displayError = document.getElementById("card-errors");
      if (event.error) {
        self.cardError = event.error.message;
      } else {
        self.cardError = "";
      }
    });
    // Add an instance of the card Element into the `card-element` <div>
    this.card.mount("#card-element");
  }
};
</script>

<style lang="scss">
.payment-form {
  $self: &;
  padding: 0 2rem;
  padding-bottom: 1rem;

  .form-container {
    // label {
    //   font-size: 1.6rem;
    //   width: 10rem;
    // }
    .flex-control {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
    }
  }
  &__input {
    height: 40px;
    padding: 10px 12px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;

    margin-bottom: 2rem;
    &--firstname {
      // width: 48%;
    }
    &--name {
      // width: 80%;
      width: 100%;
      max-width: 17rem;
    }
    &--email {
      width: 100%;
    }
    &--phone {
      width: 100%;
    }
  }

  &--hidden {
    opacity: 0;
  }
  opacity: 1;
  #card-element {
    height: 40px;
    padding: 10px 12px;
    color: #32325d;
    padding: 10px 12px;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    // margin-bottom: 3rem;
  }
  @media screen and (max-width: 450px) {
    #{$self}__buy-button {
      &:hover {
        background-color: #6772e4;
        color: white;
      }
    }
  }
  &__buy-button {
    font-size: 1.6rem;
    padding: 0.75rem 0;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0.5rem;
    background-color: #6772e4;
    color: white;
    transition: box-shadow 300ms, background-color 300ms, color 300ms;
    user-select: none;
    box-shadow: 1px 1px 5px grey;
    &:hover {
      cursor: pointer;
      color: #6772e4;
      background-color: #fff;
      // background-color: #cad3ff;
      transition: box-shadow 300ms, background-color 300ms, color 300ms;
    }
  }
  &__buy-price {
    font-size: 1.6rem;
    text-align: right;
    margin-bottom: 1rem;
    // margin-right: 0.5rem;
    color: black;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
  .v-input__slot {
    flex-direction: row-reverse;
    // box-shadow: 1px 1px 5px grey;
    // padding: 1rem;
    align-items: center;
    border-radius: 0.5rem;
    margin-bottom: 0 !important;
  }
  .v-input {
    margin-top: 1rem;
    justify-content: flex-end;
    .v-label {
      margin-bottom: 0 !important;
      color: #6b7c93;
    }
  }
  #card-errors {
    font-size: 1.4rem;
    text-align: center;
    margin-top: 0.8rem;
    color: #ffa1ae;
  }
  .v-input--selection-controls__input {
    margin-right: 0;
    margin-left: 8px;
    color: white;
  }
}
</style>
