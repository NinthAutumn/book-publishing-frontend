<template>
  <nav class="right-vertical-nav">
    <div class="comments-modal"></div>
    <div class="nav-container flex flex-column flex--align flex--center">
      <div class="nav-icons">
        <div class="nav-icon">
          <fa class="nav-icon__item" icon="user-ninja"></fa>
        </div>
        <div class="nav-icon">
          <fa class="nav-icon__item" icon="image"></fa>
        </div>
        <div class="nav-icon">
          <fa class="nav-icon__item" icon="list-ul"></fa>
        </div>
        <div class="nav-icon">
          <fa class="nav-icon__item" icon="cog"></fa>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.right-vertical-nav {
  // box-shadow: 1px 1px 5px 0 grey;
  // position: relative;
  .nav-container {
    // height: 100vh;
    position: fixed;
    right: 0;
    width: 50px;
    height: 100%;
    top: 0;
    color: $primary;
    background-color: rgb(241, 226, 248);
  }
  .nav-icons {
    width: 100%;
  }
  .nav-icon {
    // margin-bottom: 20px;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 5px;
    &:hover {
      background-color: $primary;
      color: white;
      cursor: pointer;
    }
    &__item {
      transform: rotateY(180deg);
      font-size: 30px;
    }
  }
}
</style>
