<template>
  <div>
    <Dashboard></Dashboard>
    <div class="dashboards">
      <nuxt :class="$store.state.dashboardMenuState"></nuxt>
    </div>
  </div>
</template>

<script>
import Dashboard from "./Dashboard";

export default {
  components: {
    Dashboard
  }
};
</script>

<style>
.dashboards .dashboard-active {
  margin-left: 255px;
  margin-top: 50px;
  padding: 0 45px;
  padding-top: 10px;
  /* height: 100vh; */
  background-color: #fbf9f9;
  transition: 200ms;
}
.dashboards .dashboard-inactive {
  margin-top: 50px;
  margin-left: 50px;
  padding: 0 45px;
  padding-top: 10px;
  height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
}
</style>
