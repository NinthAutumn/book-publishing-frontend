<template>
  <div class="dashboard-page">
    <Dashboard></Dashboard>
    <div class="dashboards">
      <nuxt :class="menu"></nuxt>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    Dashboard: () => import("./Dashboard")
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthor");
  },
  computed: {
    ...mapGetters({
      menu: "getDMenuState"
    })
  },
  data() {
    return {
      // opened:
    };
  }
};
</script>

<style lang="scss">
.dashboard-page {
  background-color: #fbf9f9;
}
.d-nav-v {
  z-index: 100;
  background-color: #fff;
}
.dashboards .dashboard-active {
  margin-left: 5.6rem;

  margin-top: 50px;
  padding: 0 45px;
  padding-top: 10px;
  min-height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
  z-index: 10;
}
.dashboards .dashboard-inactive {
  margin-left: 5.6rem;
  margin-top: 50px;
  padding: 0 45px;
  padding-top: 10px;
  min-height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
  z-index: 10;
}
@media screen and (max-width: 1300px) {
  .d-nav-v {
    z-index: 100;
    background-color: #fff;
  }
  .dashboards .dashboard-active {
    /* margin-left: 255px; */
    margin-left: 5.6rem;
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
    margin-left: 5.6rem;
    padding: 0 45px;
    padding-top: 10px;
    min-height: 100vh;
    background-color: #fbf9f9;
    transition: 200ms;
  }
}
</style>
