<template>
  <div class="bank-list">
    <div class="bank-list__container" v-if="verified">
      <div class="bank-list__header">
        <div class="bank-list__title">貴方への支払方法</div>
      </div>

      <div class="bank-list__list" v-loading="loading">
        <bank-card @selectDefault="selectDefault" :bank="bank" v-for="bank in banks" :key="bank.id"></bank-card>
        <div v-ripple class="bank-list__plus" @click.stop="modal = !modal">
          <fa icon="plus"></fa>
          <!-- <div class="bank-list__add"></div> -->
        </div>
      </div>

      <transition name="grow-shrink">
        <div class="bank-list__modal dialog dialog__container" v-if="modal">
          <bank-modal @close="bankModal" 　 class="bank-list__add dialog__content"></bank-modal>
        </div>
      </transition>
    </div>
    <div class="bank-list__unverified" v-if="!verified">
      <div class="bank-list__unverified-text">本人確認が必要です</div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   banks: Array
  // },
  data() {
    return {
      modal: false,
      modalContainer: false,
      banks: [],
      loading: false,
      verified: true
    };
  },
  methods: {
    bankModal() {
      this.modal = !this.modal;
    },
    async selectDefault(bank) {
      this.loading = true;
      const res = await this.$axios.patch("/v2/connect/external/default", {
        bank_id: bank.id
      });
      const { data } = await this.$axios.get("/v2/connect/external/list");
      this.banks = data;
      this.loading = false;
    }
  },
  async mounted() {
    const { data } = await this.$axios.get("/v2/connect/external/list");
    if (data.error) {
      this.banks = [];
      if (data.error === "本人確認がされていません")
        return (this.verified = false);
      return this.$toast.error(data.error);
    }
    this.banks = data;
    console.log(this.banks);
  },
  components: {
    BankCard: () => import("./Bank"),
    BankModal: () => import("@/components/Dashboard/Forms/Bank")
  }
};
</script>

<style lang="scss">
.bank-list {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.4rem;
  padding: 1rem;
  $self: &;
  position: relative;
  &__container {
    // position: relative;
  }
  &__unverified {
    border-radius: 0.4rem;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.082);
    #{$self}__unverified-text {
      font-size: 1.4rem;
      color: rgb(82, 80, 80);
    }
  }
  &__title {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  &__add {
    min-width: 40rem;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    #{$self}__plus {
      font-size: 2rem;
      border-radius: 0.5rem;
      border: 2px solid $secondary;
      color: $secondary;
      &:hover {
        cursor: pointer;
      }
      padding: 1rem;
      width: 5rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
