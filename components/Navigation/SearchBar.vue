<template>
  <div class="search-bar" v-click-outside="clickedSearch">
    <form action @submit.prevent="searchOutput" class="search-bar__form">
      <input
        type="text"
        class="search-bar__input"
        placeholder="本を名前、ジャンル、タグなどで検索..."
        v-model="searchItem"
        @focus="clickedSearch"
      >
      <input type="submit" class="search-bar__button" value="検索">
    </form>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchItem: "",
      button: false
    };
  },
  methods: {
    async searchOutput() {
      await this.$store.dispatch("search/searchBooks", this.searchItem);
      this.$router.push("/search?query=" + this.searchItem);
      this.button = !this.button;
    },
    clickedSearch() {
      this.button = !this.button;
    },
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    }
  }
};
</script>
<style lang="scss" >
.search-bar {
  $self: &;
  // width: 100%;
  // height: 100%;
  // padding-left: 12rem;
  &__form {
    // height: 100%;
    // width:
    display: flex;
    #{$self}__input {
      width: 40vw;
      padding: 0.8rem 1.5rem;
      padding-right: 7.5rem;
      // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
      border-radius: 0.4rem;
      height: 100%;
      // width: 80vw;
      border: 1px solid rgb(236, 236, 236);

      transition: 200ms;
      font-size: 1.4rem;
      &:focus {
        outline: none;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        transition: 200ms;
      }
    }
    #{$self}__placeholder {
      width: 7.5rem;
      content: "";
      padding: 0.8rem 1.5rem;
      height: 100%;
    }
    #{$self}__button {
      padding: 0.8rem 1.5rem;
      font-size: 1.4rem;
      width: 7.5rem;
      transform: translateX(-7.5rem);

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
