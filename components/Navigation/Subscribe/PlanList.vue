<template>
  <li
    class="plan-list flex-row flex--between"
    :class="{'plan-list--selected': selected === plan_index, 'plan-list--disabled':disable}"
    @click="selectCard"
  >
    <div class="plan-list__bought" v-if="user.status === plan[0].status">
      <div class="plan-list__message">もう{{plan_key}}のメンバーです</div>
    </div>
    <div class="flex-divider">
      <div class="plan-list__header flex-row flex--align">
        <fa
          icon="crown"
          class="plan-list__icon"
          :class="{'plan-list__icon--bronze':plan[0].status=== 'bronze'}"
        ></fa>
        <div class="plan-list__title">{{plan_key}}</div>
      </div>
      <div class="plan-list__description">{{plan[0].desc}}</div>
    </div>
    <div class="plan-list__pricing flex-column flex--between">
      <div class="plan-list__price">¥{{selected_option.price}}円/{{selected_option.interval_short}}</div>
      <div class="plan-list__select">
        <div class="plan-list__name" @click.stop="openModal">
          <span>{{selected_option.interval}}</span>
          <fa icon="sort"></fa>
        </div>
        <transition name="grow-shrink">
          <div class="plan-list__options" v-if="selectState" v-click-outside="openModal">
            <div
              class="plan-list__option"
              @click="selectOption(key)"
              v-for="(value,key) in options"
              :class="{'plan-list__option--selected': selected_option.interval === value.key}"
              :key="key"
            >{{value.key}}</div>
          </div>
        </transition>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["plan", "plan_key", "plan_index", "selected", "value", "disable"],
  components: {},
  data() {
    return {
      options: {
        month: {
          key: "月間",
          value: {
            id: "",
            price: "",
            interval: "月間",
            interval_short: "月",
            stripe_plan_id: "",
            name: this.plan_key,
            status: ""
          }
        },
        year: {
          key: "年間",
          value: {
            id: "",
            price: "",
            interval: "年間",
            interval_short: "年",
            stripe_plan_id: "",
            name: this.plan_key,
            status: ""
          }
        }
      },
      selected_option: {},
      selectState: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser"
    })
  },
  methods: {
    openModal: function() {
      if (this.disable) {
        return this.$toast.show("まだこのプランはサポートされていません", {
          duration: 2000,
          theme: "toasted-primary",
          icon: "extension"
        });
      }
      this.selectState = !this.selectState;
    },
    selectOption: function(key) {
      if (this.disable) {
        return this.$toast.show("まだこのプランはサポートされていません", {
          duration: 2000,
          theme: "toasted-primary",
          icon: "extension"
        });
      }
      this.selected_option = this.options[key].value;
      this.selectState = !this.selectState;
      if (this.selected === this.plan_index) {
        this.$store.commit("subscription/SET_SITE_PLAN", this.selected_option);
      }
    },
    selectCard: function() {
      (this.plan_index);
      if (this.disable) {
        return this.$toast.show("まだこのプランはサポートされていません", {
          duration: 2000,
          theme: "toasted-primary",
          icon: "extension"
        });
      }
      this.$emit("select_modal", this.plan_index);
      this.$store.commit("subscription/SET_SITE_PLAN", this.selected_option);
    }
  },
  async mounted() {
    this.$store.dispatch("subscription/fetchSubscription").then(val => {
      this.plan.forEach(item => {
        if (item.interval === "month") {
          this.selected_option = {
            id: item.id,
            price: item.price,
            interval: "月間",
            interval_short: "月",
            stripe_plan_id: item.stripe_plan_id,
            name: this.plan_key,
            status: item.status
          };
        }
        this.options[item.interval].value.id = item.id;
        this.options[item.interval].value.status = item.status;
        this.options[item.interval].value.price = item.price;
      });
      if (this.selected === this.plan_index) {
        this.$store.commit("subscription/SET_SITE_PLAN", this.selected_option);
      }
    });
  }
};
</script>

<style lang="scss">
.plan-list {
  $self: &;
  padding: 1rem;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  background-color: white;
  border: 1px solid white;
  transition: border-color 300ms;
  min-height: 10rem;
  position: relative;
  &__bought {
    width: 100%;
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.836);
    top: 0;
    left: 0;
    border-radius: 0.4rem;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    #{$self}__message {
      // position: absolute;
      font-size: 1.6rem;
      color: #fff;
    }
  }
  &--disabled {
    background-color: rgb(78, 78, 78);
    #{$self}__description {
      display: none;
    }
  }
  &--selected {
    transition: border-color 300ms;
    border: 1px solid $secondary;
  }

  &:hover {
    cursor: pointer;
    transition: border-color 300ms;
    border: 1px solid $secondary;
  }

  &__select {
    position: relative;
    #{$self}__name {
      border-radius: 0.4rem;
      span {
        font-size: 1.4rem;
        margin-right: 1rem;
      }
      // min-width
      height: 2.7rem;
      // min-width: 12rem;
      font-size: 1.4rem;
      padding: 0.3rem 1.2rem;

      &:hover {
        cursor: pointer;
      }
      box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
        rgba(42, 47, 69, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    }
    #{$self}__options {
      top: -1rem;
      border-radius: 0.4rem;
      position: absolute;
      width: 110%;
      right: 0;
      background-color: #fff;
      text-align: center;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      #{$self}__option {
        padding: 0.3rem 1.2rem;
        text-align: center;
        font-size: 1.4em;
        &--selected {
          background-color: #f7fafc;
        }
        &:hover {
          cursor: pointer;
          background-color: #f7fafc;
        }
      }
    }
  }
  &__header {
    #{$self}__title {
      font-size: 1.6rem;
    }
    #{$self}__icon {
      font-size: 1.6rem;
      margin-right: 1rem;
      &--bronze {
        color: #cd7f32;
      }
    }
    margin-bottom: 1rem;
  }
  #{$self}__pricing {
    min-width: 10rem;
    align-items: flex-end;
    #{$self}__price {
      font-size: 1.6rem;
    }
  }
  &__description {
    font-size: 1.4rem;
    color: #6f798b;
    word-break: break-all;
    // max-width: 0%;
  }
}
</style>
