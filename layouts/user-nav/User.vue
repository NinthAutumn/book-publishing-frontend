<template>
  <div>
    <Dashboard></Dashboard>
    <div class="dashboards">
      <nuxt :class="menu"></nuxt>
    </div>
  </div>
</template>

<script>
import Dashboard from "./Dashboard";

export default {
  components: {
    Dashboard: () => import("./Dashboard")
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthor");
  },
  computed: {
    menu() {
      return this.$store.getters.getDMenuState;
    }
  },
  data() {
    return {
      // opened:
    };
  }
};
</script>

<style lang="scss">
.d-nav-v {
  z-index: 100;
  background-color: #fff;
}
.dashboards .dashboard-active {
  margin-left: 50px;
  margin-top: 50px;
  padding: 0 45px;
  padding-top: 10px;
  min-height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
  z-index: 10;
}
.dashboards .dashboard-inactive {
  margin-top: 50px;
  margin-left: 50px;
  padding: 0 45px;
  padding-top: 10px;
  min-height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
}
@media screen and (max-width: 1300px) {
  .d-nav-v {
    z-index: 100;
    background-color: #fff;
  }
  .dashboards .dashboard-active {
    /* margin-left: 255px; */
    margin-left: 50px;
    margin-top: 50px;
    padding: 0 45px;
    padding-top: 10px;
    min-height: 100vh;
    background-color: #fbf9f9;
    transition: 200ms;
    position: fixed;
    z-index: 10;
    .d-nav-v {
    }
  }
  .dashboards .dashboard-inactive {
    margin-top: 50px;
    margin-left: 50px;
    padding: 0 45px;
    padding-top: 10px;
    min-height: 100vh;
    background-color: #fbf9f9;
    transition: 200ms;
  }
}
</style>
