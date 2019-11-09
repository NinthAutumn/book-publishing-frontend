
<template>
  <div class="user-status">
    <transition name="slide-up" appear>
      <div class="user-status__banner" :class="{'user-status__banner--mobile':$device.isMobile}">
        <div class="user-status__text" v-text="`${user.email}　の　確認ができていません。`"></div>
        <div class="user-status__send" @click="resendHandler">確認メールを再送信する</div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as cookie from "cookie";
export default {
  props: {
    user: Object,
    limit: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    async limitHandler() {
      this.$storage.setCookie("EMAIL_LIMIT", true, { maxAge: 600 });
      return this.$toast.error("また10分後にリトライしてください");
    },
    async resendHandler() {
      try {
        if (this.$storage.getCookie("EMAIL_LIMIT")) {
          return this.$toast.error("また10分後にリトライしてください");
        }
        if (this.count === this.limit) {
          return this.limitHandler();
        }
        await this.$store.dispatch("auth/resendEmail", {
          email: this.user.email
        });
        this.count++;
        return this.$toast.success("Eメールがまた送られました");
      } catch (error) {
        return this.$toast.error(error);
      }
    }
  }
};
</script>

<style lang="scss">
.user-status {
  $self: &;
  &__banner {
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 3rem;
    position: fixed;
    background-color: rgb(255, 72, 72);
    z-index: 1000000;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    #{$self}__text {
      font-size: 1.4rem;
      color: white;
      margin-right: 1rem;
    }
    #{$self}__send {
      font-size: 1.3rem;
      color: white;
      background-color: $secondary;
      border-radius: 0.5rem;
      padding: 0.5rem 2rem;
      width: 20rem;
      cursor: pointer;
      &:hover {
        color: $secondary;
        background-color: white;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
    }
    &--mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      #{$self}__text {
        margin: 0;
        font-size: 1rem;
      }
    }
  }
}
</style>
