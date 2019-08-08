<template>
  <div class="bank-list">
    <div class="bank-list__container">
      <div class="bank-list__header">
        <div class="bank-list__title">貴方への支払方法</div>
      </div>

      <div class="bank-list__list">
        <bank-card :bank="bank" v-for="bank in banks" :key="bank.id"></bank-card>
        <div class="bank-list__plus" @click.stop="modal = !modal">
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
  </div>
</template>

<script>
export default {
  props: {
    banks: Array
  },
  data() {
    return {
      modal: false,
      modalContainer: false
    };
  },
  methods: {
    bankModal() {
      this.modal = !this.modal;
    },
    closeModal() {}
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
      padding: 1rem;
      width: 7.5rem;
      height: 7.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
