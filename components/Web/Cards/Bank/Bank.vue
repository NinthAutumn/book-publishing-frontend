<template>
  <div class="bank-card">
    <div
      class="bank-card__container"
      v-ripple
      @click="$emit('selectDefault',bank)"
      :class="{'bank-card__container--default':bank.default_for_currency}"
    >
      <div class="bank-card__icon">
        <fa icon="landmark"></fa>
        <div class="bank-card__name">{{ bank.bank_name}}</div>
      </div>
      <div class="bank-card__detail">
        <div class="bank-card__label">•••• {{bank.last4}}</div>
        <div class="bank-card__description" v-text="`${bank.account_holder_name}`"></div>
        <div
          class="bank-card__status"
          :class="{'bank-card__status--error': bank.status === 'errored'}"
        >{{status}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bank: Object
  },
  data() {
    return {
      status: ""
    };
  },
  mounted() {
    switch (this.bank.status) {
      case "validated":
        this.status = "存在確認済み";
        break;
      case "verified":
        this.status = "検証済み";
        break;
      case "verification_failed":
        this.status = "検証に失敗しました";
        break;
      case "errored":
        this.status = "講座に問題があります";
        break;
      default:
        this.status = "新";
        break;
    }
  }
};
</script>

<style lang="scss">
.bank-card {
  $self: &;
  &__container {
    display: flex;
    padding: 1rem;
    position: relative;
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    user-select: none;
    margin-right: 1rem;
    &--default {
      border: 2px solid rgb(46, 46, 46);
    }
    #{$self}__icon {
      font-size: 2.3rem;
      text-align: center;
      color: white;
      padding: 0.5rem;

      background-color: rgb(46, 46, 46);
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      #{$self}__name {
        margin-top: 0.5rem;
        font-size: 1.3rem;
      }
      margin-right: 1rem;
    }
    #{$self}__detail {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      flex-direction: column;
      #{$self}__label {
        font-size: 1.2rem;
        align-self: flex-end;
      }
      #{$self}__description {
        font-size: 1.1rem;
        color: grey;
      }
      #{$self}__status {
        align-self: flex-end;
        font-size: 1.1;
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        background-color: $secondary;
        color: white;
        &--error {
          color: black;
          background-color: orangered;
        }
      }
    }
  }
}
</style>
