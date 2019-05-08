<template>
  <div class="user-book flex" style="background-color: #fbf9f9;">
    <BookForm></BookForm>
    <!-- <TagCreate></TagCreate> -->
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  components: {
    BookForm: () => import("@/components/Dashboard/Forms/Book")
  }
};
</script>

<style>
.user-book {
  height: 100%;
}
</style>
