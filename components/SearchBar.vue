<template>
  <div class="search-bar">
    <form action @submit class="search-form">
      <input type="text" class="search-input">
      <input type="submit" class="btn btn-search" value>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style >
.search-input {
  height: 40px;
  /* height: 30px; */
  /* width: 100%; */
  border: none;
  border-radius: 10px;
  font-size: 16px;
  background: url("");
}

.search-form {
  height: 40px;
  border-radius: 10px;
  opacity: 0.5;
  border: 1px solid #8860d0;
  padding: 0 2px;
}

.search-bar {
  height: 40px;
  width: 700px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-icon {
  /* position: absolute;
  top: 2px;
  left: 3px; */
}

.search-icon {
  font-weight: 700;
  font-size: 30px;
  color: #8860d0;
  opacity: 0.5;
}
</style>
