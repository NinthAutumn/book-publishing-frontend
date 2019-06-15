<template>
  <div class="contract-component">
    <div class="contract-component__modal">
      <div class="contract-component__title flex-row flex--between flex--align">
        <span>
          <fa icon="file-contract" class style="margin-right:5px;"></fa>本人確認
        </span>
        <fa
          icon="times"
          class="contract-component__icon"
          style
          @click="$store.commit('SET_CONTRACT_MODAL_STATE')"
        ></fa>
      </div>
      <transition name="slide-fade">
        <Profile
          @storeBirth="storeBirth"
          :birth="birth"
          :person="account['person']"
          v-if="contractStep === 0"
          @save="profile"
        ></Profile>
        <Address v-if="contractStep === 1" @save="address"></Address>
        <confirm-identity v-if="contractStep===2"></confirm-identity>
        <!-- <Bank v-if="contractStep === 2"></Bank> -->
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true,
      account: {
        country: "JP",
        person: {},
        birth: ""
      }
    };
  },
  computed: {
    contractStep() {
      return this.$store.getters["getContractStep"];
    }
  },
  components: {
    Profile: () => import("./Profile"),
    Bank: () => import("./Bank"),
    Address: () => import("./Address"),
    ConfirmIdentity: () => import("./ConfirmIdentity")
  },
  methods: {
    profile: function(val) {
      console.log(val);
      this.account["person"] = val;
    },
    address: function(val) {
      Object.keys(val).forEach(address => {
        this.account["person"][address] = val[address];
      });
      console.log(this.account);
    },
    storeBirth: function(val) {
      this.birth = val;
    }
  }
};
</script>

<style lang="scss">
.contract-component {
  $self: &;
  width: 100%;
  height: 100%;
  position: fixed;
  border: none;
  z-index: 1000;
  .v-dialog {
  }
  #{$self}__modal {
    // margin: auto;
    // z-index: 100;
    // margin-top: 10px;
    margin: auto;
    z-index: 1000;
    scroll-behavior: unset;
    // overflow: hidden;
    max-height: 70rem;
    overflow: auto;
    min-width: 50rem;
    max-width: 50rem;
    margin-top: 10px;
    background-color: #f7f8f9;
    -webkit-box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    // height: 50rem;
    // width: 50rem;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 50rem;
  }
  &__title {
    font-size: 1.8rem;
    span {
      font-size: inherit;
    }
    #{$self}__icon {
      &:hover {
        cursor: pointer;
      }
    }
    padding: 2rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    background-color: #fff;
  }
}
</style>
