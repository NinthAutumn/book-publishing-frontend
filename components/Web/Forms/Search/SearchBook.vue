<template>
  <div class="search-books">
    <div class="search-books__container">
      <input
        type="text"
        class="search-books__input"
        v-model="query"
        placeholder="作品をタイトル・あらすじ・作者で検索"
      />
      <div class="search-books__icon" v-ripple>
        <fa icon="search"></fa>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: ""
  }),
  props: {
    param: String
  },
  watch: {
    query(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss">
.search-books {
  $self: &;
  &__container {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    // just
    // box-shadow:
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 10rem;
    // padding: 0.5rem 0;
    padding-left: 2rem;
    #{$self}__icon {
      &:hover {
        cursor: pointer;
      }
      font-size: 1.6rem;
      height: 100%;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rem;
      overflow: hidden;
      color: rgb(26, 26, 27);
    }
    #{$self}__input {
      width: 100%;
      height: 100%;

      font-size: 1.6rem;

      &:focus,
      &:active {
        outline: none;
      }
    }
  }
}
</style>
