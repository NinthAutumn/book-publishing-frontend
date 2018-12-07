<template>
  <div class="search-bar">
    <form action @submit class="search-form">
      <!-- <span>
        <i class="el-icon-search"></i>
      </span>-->
      <input type="text" class="search-input">
      <input type="submit" class="btn btn-search" value="Search">
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style >
.search-input {
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  background: url("");
  margin-left: 10px;
  color: #a16dff;
  font-weight: 500;
}

.search-form {
  height: 38px;
  border-radius: 10px;
  /* padding: 0 2px; */
  display: flex;
  align-items: center;
  width: 700px;
  /* position: relative; */
  border: 2px solid #c9b1f5;
}

.search-form:focus-within {
  border: 2px solid #a16dff;
}

.search-form:hover {
  /* animation: underNav 1000ms ease-out; */
}

.search-bar {
  /* width: 700px; */
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

.search-bar span {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin: 0;
  /* font-size: 17px; */
  background-color: #f9f9fc;
}
.search-bar span i {
  color: #a16dff;
  opacity: 0.5;
  font-weight: bold;
  font-size: 20px;
}
input:focus {
  outline: none;
}

@keyframes underNav {
  0% {
    border-bottom: 10px solid #a16dff;
  }
  100% {
    border: 1px solid #a16dff;
  }
}

.btn {
  width: 80px;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  /* padding: 10px; */
  color: white;
  background-color: #e7daff;
  border: 2px solid #e7daff;
  /* font-weight: bold; */
  font-size: 14px;
}
.btn:hover {
  cursor: pointer;
}
</style>
