<template>
  <div class="user-book flex" style="background-color: #fbf9f9;">
    <BookForm></BookForm>
    <TagCreate></TagCreate>
  </div>
</template>

<script>
import BookForm from "@/components/Dashboard/CreateBook";
import TagCreate from "@/components/Dashboard/TagCreate";
export default {
  layout: "user-nav/User",
  components: {
    BookForm,
    TagCreate
  }
};
</script>

<style>
.user-book {
  height: 100%;
}
</style>
