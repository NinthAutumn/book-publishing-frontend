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
  padding-left: 45px;
  height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
}
.dashboards .dashboard-inactive {
  margin-left: 50px;
  padding-left: 45px;
  height: 100vh;
  background-color: #fbf9f9;
  transition: 200ms;
}
</style>
