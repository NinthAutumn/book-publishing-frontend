<template>
  <div class="user-analytics">
    <BookForm></BookForm>
  </div>
</template>

<script>
import BookForm from "@/components/Dashboard/CreateBook";
export default {
  layout: "user-nav/User",
  components: {
    BookForm
  }
};
</script>

<style>
</style>
