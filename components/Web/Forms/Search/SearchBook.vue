<template>
  <div class="search-books">
    <div class="search-books__container">
      <input type="text" class="search-books__input" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.search-books {
  $self: &;
  &__container {
    height: 50px;
    width: 100%;
    border-radius: 10rem;
    // box-shadow:
    #{$self}__input {
    }
  }
}
</style>
