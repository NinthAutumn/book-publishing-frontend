<template>
  <div class="search-bar">
    <form action @submit.prevent="searchOutput" class="search-form">
      <!-- <span>
        <i class="el-icon-search"></i>
      </span>-->
      <input
        type="text"
        class="search-input"
        placeholder="Find the right Book"
        v-model="searchItem"
        @focus="clickedSearch"
        @blur="clickedSearch"
      >
      <input type="submit" class="btn btn-search" value="Search">
    </form>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchItem: "",
      inputclicked: false
    };
  },
  methods: {
    async searchOutput() {
      await this.$store
        .dispatch("search/searchBooks", this.searchItem)
        .then(() => {
          this.$router.push("/search?query=" + this.searchItem);
        });
      console.log(this.searchItem);
    },
    clickedSearch() {
      this.inputclicked = !this.inputclicked;
      if (this.inputclicked) {
        this.show = "show";
      } else {
        this.show = "noShow";
      }
    },
    dropOff() {
      this.$store.commit("DROPDOWN_FALSE");
    }
  }
};
</script>
<style lang="scss" >
.search-bar {
  /* display: flex; */
}
.search-input {
  height: 100%;
  width: 100%;
  border: none;
  // border-radius: 14px;
  font-size: 14px;
  background: url("");
  /* margin-left: 10px; */
  padding: 10px;
  color: $primary;
  font-weight: 500;
  transition: 200ms;
  &:focus,
  &:hover {
    font-size: 16px;
    transition: 200ms;
  }
}

.search-form {
  height: 32px;
  // border-radius: 10px;
  /* padding: 0 2px; */
  display: flex;
  align-items: center;
  width: 45vw;
  /* position: relative; */
  border: 1px solid #c9b1f583;
  animation: stay 200ms ease-out 1s;
  transition: height 200ms ease-out, width 200ms ease-out;
  position: relative;

  &:focus-within,
  &:hover {
    /* border: 2px solid #a16dff; */
    animation: shadowes 200ms ease-out;
    /* -webkit-box-shadow: 0px 0px 10px 0px rgba(122, 122, 122, 0.48);
  -moz-box-shadow: 0px 0px 10px 0px rgba(122, 122, 122, 0.48);
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28); */
    animation-fill-mode: forwards;
    /* animation- */
    height: 40px;
    width: 50vw;
    transition: height 200ms ease-out, width 200ms ease-out;
    /* font-size: 15px !important; */
    /* transition: width 200ms ease-out; */
  }
}
// .search-form:focus-within,
// .search-form:hover {
// }
// .search-input:focus,
// .search-input:hover {
// }

/* .show {
  position: absolute;
  background-color: #5bb8eb;
  height: 30px;
  width: 100px;
  bottom: -30px;
  left: 10px;
  border-radius: 10px;
  animation: appearmenu 1000ms; */
/* align-content: center; */
/* display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 300ms;
} */
/* .noShow {
  position: absolute;
  background-color: #5bb8eb;
  height: 30px;
  width: 100px;
  bottom: -30px;
  left: 10px;
  border-radius: 10px;
  animation: disappearrmenu 1000ms; */
/* align-content: center; */
/* display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 300ms;
  animation-fill-mode: forwards;
} */
@keyframes disappearrmenu {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes appearmenu {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shadowes {
  from {
    /* -webkit-box-shadow: 0px 1px 0px 0px rgba(122, 122, 122, 0.48);
    -moz-box-shadow: 0px 1px 0px 0px rgba(122, 122, 122, 0.48);
    box-shadow: 0 1px 0px 0 rgba(32, 33, 36, 0.28); */
  }

  to {
    -webkit-box-shadow: 0px 0px 10px 0px rgba(122, 122, 122, 0.48);
    -moz-box-shadow: 0px 0px 10px 0px rgba(122, 122, 122, 0.48);
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
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
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  margin: 0;
  /* font-size: 17px; */
  background-color: #f9f9fc;
}
.search-bar span i {
  color: #a16dff;
  opacity: 0.5;
  font-weight: bold;
  font-size: 2rem;
}
input:focus {
  outline: none;
}

@keyframes underNav {
  0% {
    border-bottom: 1rem solid #a16dff;
  }
  100% {
    border: 0.5rem solid #a16dff;
  }
}

.btn {
  width: 8rem;
  height: 100%;
  // border-top-right-radius: 0.8rem;
  // border-bottom-right-radius: 0.8rem;
  /* padding: 10px; */
  color: white;
  background-color: $primary;
  border: 2px solid $primary;
  /* font-weight: bold; */
  font-size: 14px;
}
.btn:hover {
  cursor: pointer;
}
</style>
