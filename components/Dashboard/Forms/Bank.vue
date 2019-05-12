<template>
  <div class="bank-form flex-column">
    <div class="bank-form__container">
      <label for>金融機関</label>
      <div class="bank-form__select-container">
        <div class="bank-form__bank-select" @click.stop="toggleBankModal">
          {{form.bank.name||`銀行を選択する・・`}}
          <fa icon="sort"></fa>
        </div>
        <!-- <transition name="grow-shrink"> -->
        <div class="bank-form__select-modal" v-if="bankModal" v-click-outside="closeBankModal">
          <input v-model="search" class="bank-form__search-input">
          <ul class="bank-form__options" v-loading="loading">
            <li
              class="bank-form__option bank-form__option--default"
              v-if="search.length < 1"
            >銀行名を入力してください。</li>
            <li
              class="bank-form__option"
              v-else
              v-for="bank in banks"
              :key="bank.code"
              @click="selectBank(bank)"
              :class="{'bank-form__option--selected':bank === form.bank}"
            >{{bank.name}}</li>
          </ul>
        </div>
        <!-- </transition> -->
      </div>
      <label for>支店</label>
      <div class="bank-form__select-container">
        <button
          class="bank-form__bank-select"
          @click="toggleShopModal"
          :class="{'bank-form__bank-select--disabled':!form.bank.name}"
        >
          {{form.shop.name||`支店を選択する・・`}}
          <fa icon="sort"></fa>
        </button>
        <div class="bank-form__select-modal" v-if="shopModal" v-click-outside="closeShopModal">
          <input v-model="searchShop" class="bank-form__search-input">
          <ul class="bank-form__options" v-loading="loading">
            <li
              class="bank-form__option bank-form__option--default"
              v-if="searchShop.length < 1"
            >支店名を入力してください。</li>
            <li
              class="bank-form__option"
              v-else
              v-for="shop in shops"
              :key="shop.code"
              @click="selectShop(shop)"
              :class="{'bank-form__option--selected':shop === form.shop}"
            >{{`${shop.name}支店`}}</li>
          </ul>
        </div>
      </div>
      <label for>口座名義人 (カタカナ)</label>
      <input placeholder="イロハストア" type="text" v-model="form.fullname">
      <label for>口座番号</label>
      <input placeholder="1234567" type="text" v-model="form.bankNumber">
      <label for>口座番号(確認)</label>
      <input placeholder="1234567" type="text" v-model="form.bankNumberConfirm">
    </div>
    <div class="bank-form__footer flex-divider flex-row flex--between flex--align">
      <div @click="changeStep(0)" class="bank-form__button bank-form__button--back">戻る</div>

      <div @click="changeStep(1)" class="bank-form__button">進む</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      searchShop: "",
      selected: {},
      form: {
        bank: "",
        shop: "",
        fullname: "",
        bankNumber: "",
        bankNumberConfirm: ""
      },
      bankModal: false,
      shopModal: false,
      loading: false
    };
  },
  watch: {
    search: async function(val) {
      this.loading = true;
      await this.$store.dispatch("dashboard/fetchBanks", {
        search: this.search
      });
      this.loading = false;
    },
    searchShop: async function(val) {
      this.loading = true;
      await this.$store.dispatch("dashboard/fetchShops", {
        search: this.searchShop,
        bankCode: this.form.bank.code
      });
      this.loading = false;
    }
  },
  methods: {
    selectBank(bank) {
      this.form.bank = bank;
      this.bankModal = !this.bankModal;
    },
    selectShop(shop) {
      this.form.shop = shop;
      this.shopModal = !this.shopModal;
    },
    toggleBankModal() {
      this.bankModal = !this.bankModal;
    },
    toggleShopModal() {
      if (!this.form.bank) {
      } else {
        this.shopModal = !this.shopModal;
      }
    },
    changeStep(step) {
      this.$store.commit("SET_CONTRACT_STEP", step);
    },
    closeBankModal() {
      this.bankModal = false;
    },
    closeShopModal() {
      this.bankModal = false;
    }
  },
  computed: {
    banks() {
      return this.$store.getters["dashboard/getBanks"];
    },
    shops() {
      return this.$store.getters["dashboard/getShops"];
    }
  },
  async mounted() {}
};
</script>

<style lang="scss">
.bank-form {
  $self: &;
  padding: 2rem;
  min-height: 30rem;
  // align-items: flex-end;
  justify-content: space-between;
  // align-items: baseline;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
  &__select-container {
    position: relative;
    flex-grow: 1;
    #{$self}__bank-select {
      height: 40px;
      padding: 0 14px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d9d1dd;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      font-size: 1.6rem;
      transition: 300ms;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
      }
      &--disabled {
        background-color: #f7fafc;
        color: #b8c0c9;
        border: 1px solid #d3d6db;
        &:hover {
          cursor: default;
        }
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
    #{$self}__select-modal {
      z-index: 10;
      position: absolute;
      top: 4.1rem;
      width: 100%;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      border-radius: 0.4rem;
      overflow: hidden;
      #{$self}__search-input {
        margin-bottom: 0rem;
        box-shadow: none;
        // border-top: 0.4rem;

        border-radius: 0;
        &:active,
        &:focus {
          outline: none;
        }
      }
      #{$self}__options {
        border-top: 1px solid #e3e8ee;
        width: 100%;
        max-height: 15rem;
        overflow: auto;
      }

      #{$self}__option {
        height: 3rem;
        font-size: 1.3rem;
        color: #32325d;
        padding: 0px 14px;
        display: flex;
        align-items: center;
        background-color: white;
        width: 100%;
        transition: 300ms;
        &:hover {
          background-color: #f7fafc;
          cursor: pointer;
        }
        &--selected {
          background-color: #f7fafc;
        }
        &--default {
          height: 3rem;
          font-size: 1.3rem;
          &:hover {
            background-color: white;
            cursor: default;
          }
          // justify-content: cen
          padding: 0px 14px;
        }
      }
    }
  }
  &__button {
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
    border-radius: 0.4rem;
    color: #fff;
    background: #6772e5;
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
      0 1px 3px rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    &--back {
      color: #6d77e6;
      background: #ffffff;
    }
    &:hover {
      cursor: pointer;
    }
  }
  input {
    height: 40px;
    padding: 12px 14px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d9d1dd;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;
    transition: 300ms;
    margin-bottom: 2rem;
    &:active,
    &:focus {
      outline: none;
    }
  }
  &__fonter {
    align-self: flex-end;
  }
}
</style>
