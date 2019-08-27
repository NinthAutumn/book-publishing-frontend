<template>
  <div class="verify-component">
    <div class="pixel-spinner" v-if="loading">
      <div class="pixel-spinner-inner"></div>
    </div>
  </div>
</template>

<script>
// import { PixelSpinner } from "epic-spinners";

export default {
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    this.loading = true;
    if (!this.$route.query.token) {
      this.loading = false;
      return this.$router.push("/");
    }
    const { data } = await this.$axios.patch("/auth/verify", {
      token: this.$route.query.token
    });
    if (!data.found) {
      this.loading = false;
      this.$router.push({ path: "/", query: {} });
      return this.$toast.error("アカウント確認に失敗しました", {
        duration: 5000,
        position: "top-right",
        icon: "extension"
      });
    }
    this.$storage.setUniversal("access_token", data.access_token);
    this.$storage.setUniversal("refresh_token", data.refresh_token);
    this.$storage.setUniversal("strategy", "local");
    this.$axios.defaults.headers.common["Authorization"] =
      "Bearer " + data.access_token;
    this.$store.commit("auth/SET_AUTH", {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      strategy: "local"
    });
    const val = await this.$store.dispatch("auth/fetchUser");
    this.$toast.success(
      "アカウント確認に成功しました、サイトがリフレッシュされます",
      {
        duration: 2000,
        position: "top-right",
        icon: "check_circle",
        class: "verify-component__toast"
      }
    );
    this.loading = false;
    this.$router.push({ path: "/", query: {} });
  }
};
</script>

<style lang="scss">
.verify-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  &__toast {
    z-index: 1001;
  }
}
.pixel-spinner,
.pixel-spinner * {
  box-sizing: border-box;
}

.pixel-spinner {
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pixel-spinner .pixel-spinner-inner {
  width: calc(70px / 7);
  height: calc(70px / 7);
  background-color: #f7fafc;
  color: #f7fafc;
  box-shadow: 15px 15px 0 0, -15px -15px 0 0, 15px -15px 0 0, -15px 15px 0 0,
    0 15px 0 0, 15px 0 0 0, -15px 0 0 0, 0 -15px 0 0;
  animation: pixel-spinner-animation 1250ms linear infinite;
}

@keyframes pixel-spinner-animation {
  50% {
    box-shadow: 20px 20px 0px 0px, -20px -20px 0px 0px, 20px -20px 0px 0px,
      -20px 20px 0px 0px, 0px 10px 0px 0px, 10px 0px 0px 0px, -10px 0px 0px 0px,
      0px -10px 0px 0px;
  }
  75% {
    box-shadow: 20px 20px 0px 0px, -20px -20px 0px 0px, 20px -20px 0px 0px,
      -20px 20px 0px 0px, 0px 10px 0px 0px, 10px 0px 0px 0px, -10px 0px 0px 0px,
      0px -10px 0px 0px;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
