<template>
  <div id="search " class="page-padding">
    <Books :books="books"></Books>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "search",
  components: {
    Books: () => import("@/components/SearchPage/Books")
  },
  computed: {
    ...mapGetters({
      books: "search/getBookList"
    })
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  auth: false
};
</script>
<style>
#search {
  position: relative;
}

.search-book-item {
  margin-bottom: 10px;
}
</style>
