<template>
  <div class="product-modal__payment" v-loading="loading">
    <div class="product-modal__buy-price">{{`合計 ¥${price}円`}}</div>
    <div class="product-modal__select-payment">
      <!-- <div
        class="product-modal__card-list"
        v-for="(card,index) in customer.sources.data"
        :key="index"
      >{{card.card.last4}}</div>-->
    </div>
    <div class="form-container">
      <div class="flex-control">
        <label for="fullname">名前</label>
        <input v-model="form.fullname" type="text" name="fullname" placeholder="名字　名前">
      </div>
      <div class="flex-control">
        <label for="email">Eメール</label>
        <input
          v-validate="'required|email'"
          type="email"
          v-model="form.email"
          data-vv-as="記入されたメールアドレス"
          name="email"
          placeholder="example@email.com"
        >
      </div>
      <div class="flex-control">
        <label for="phone">電話番号</label>
        <input
          v-model="form.phone"
          @keypress="isNumber"
          type="text"
          name="phone"
          placeholder="080-1234-5678"
        >
      </div>
    </div>
    <div id="card-element"></div>
    <v-checkbox v-model="saveCard" :label="`カードを保存する`"></v-checkbox>
    <div id="card-errors" role="alert" v-text="cardError"></div>
    <div v-ripple @click="buttonSelect" class="product-modal__buy-button">{{`¥${price}円払う`}}</div>
  </div>
</template>


<script>
export default {
  props: {
    coin: Number,
    skuId: String,
    price: Number
  },
  data() {
    return {
      stripe: this.$stripe.import(),
      form: {
        phone: "",
        email: this.$store.getters.loggedInUser.email,
        fullname: ""
      },
      card: "",
      cardError: "",
      saveCard: false,
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
    Currency: () => import("@/components/All/Currency")
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
      this.loading = true;
      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.card,
        {
          billing_details: {
            name: this.form.fullname,
            email: this.form.email,
            phone: `+88${this.form.phone}`
          }
        }
      );
      if (error) {
        return (this.cardError = error.message);
      }
      let res;
      if (this.customer) {
        res = await this.$store.dispatch("stripe/postPaymentIntent", {
          customerId: this.customer.id,
          payment_method_id: paymentMethod.id,
          amount: this.price,
          skuId: this.skuId
        });
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
        fullname: this.form.fullname,
        skuId: this.skuId,
        source
      };
      await this.$store.dispatch("wallet/buyCoin", { form });
    },
    handleServerResponse: async function(response) {
      if (response.error) {
      } else if (response.requires_action) {
        const result = await this.stripe.handleCardAction(
          this.paymentIntent.client_secret
        );
        if (result.error) {
          return this.$message({
            message: "クラウンコインの購入に失敗しました",
            type: "error"
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
          fullname: this.form.fullname,
          skuId: this.skuId
        };
        await this.$store.dispatch("wallet/buyCoin", { form });
        return this.$message({
          message: "クラウンコインの購入に成功しました",
          type: "success"
        });
      }
    }
  },
  async created() {
    await this.$store.dispatch("stripe/fetchPaymentMethods", {
      customerId: this.$store.getters.loggedInUser.stripeCustomerId,
      type: "card"
    });
  },
  async mounted() {
    const elements = this.stripe.elements({ locale: "ja" });
    const self = this;
    let style = {
      base: {
        fontSize: "16px",
        color: "#32325d"
      }
    };
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
.product-modal {
  $self: &;
  #{$self}__payment {
    padding: 0.75rem 2rem;

    .form-container {
      box-shadow: 1px 1px 5px grey;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
      label {
        font-size: 1.6rem;
        width: 10rem;
      }
      .flex-control {
        display: flex;
        align-items: center;
        // justify-content: space-between;
      }
    }
    input {
      font-size: 1.6rem;
      padding: 0.75rem 1rem;
      width: 100%;
    }
    &--hidden {
      opacity: 0;
    }
    opacity: 1;
    #card-element {
      border-radius: 0.5rem;
      box-shadow: 1px 1px 5px grey;
      padding: 1rem;
      // margin-bottom: 3rem;
    }
    #{$self}__buy-button {
      font-size: 1.6rem;
      padding: 0.75rem 0;
      box-sizing: border-box;
      text-align: center;
      border-radius: 0.5rem;
      color: white;
      background-color: $primary;
      transition: box-shadow 300ms, background-color 300ms, color 300ms;
      user-select: none;
      box-shadow: 1px 1px 5px grey;
      &:hover {
        cursor: pointer;
        color: $primary;
        background-color: white;
        transition: box-shadow 300ms, background-color 300ms, color 300ms;
      }
    }
    #{$self}__buy-price {
      font-size: 1.6rem;
      text-align: right;
      margin-bottom: 1rem;
      // margin-right: 0.5rem;
    }
  }
  .v-input__slot {
    flex-direction: row-reverse;
    // box-shadow: 1px 1px 5px grey;
    // padding: 1rem;
    border-radius: 0.5rem;
    // margin-bottom: 0 !important;
  }
  .v-input {
    margin-top: 1rem;
    justify-content: flex-end;
  }
  .v-input--selection-controls__input {
    margin-right: 0;
    margin-left: 8px;
  }
}
</style>
