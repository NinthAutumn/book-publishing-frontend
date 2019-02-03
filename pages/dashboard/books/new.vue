<template>
  <div class="user-book" style="background-color: #fbf9f9;">
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
.user-book {
  height: 100%;
}
</style>
