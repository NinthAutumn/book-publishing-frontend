<template>
  <div id="book-card" @click="linkTo" :class="size">
    <div class="book-cover">
      <span class="star-rating"></span>
      <img :src="book.cover" class="book-img" alt="Book cover">
    </div>
    <div class="text-info">
      <p class="book-title full">{{book.title}}</p>
      <span class="p-ending"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "book-card",
  props: {
    book: Object,
    size: String
  },
  data() {
    return {};
  },
  methods: {
    linkTo() {
      this.$router.push("/");
    }
  },
  createdAt() {}
};
</script>
<style>
.book-cover {
  width: 165px;
  height: 245px;
  position: relative;
  -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  border-radius: 10px;
}
#book-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  width: 165px;
  /* height: 245px; */
  position: relative;
}

.book-img {
  width: 165px;
  height: 245px;
  position: relative;
  /* border-radius: 10px; */

  border-radius: 10px;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
}

.book-title {
  margin: 0;
  /* margin-top: 10px; */
  padding: 0;
  font-size: 16px;
  width: inherit;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  /* line-clamp: 2; */
  /* white-space: pre-wrap; */
}
/* .book-title::after {
  position: absolute;
  content: "...";
  right: 0;
  bottom: 0;
} */
.text-info {
  display: flex;
  align-items: center;
  /* background: white; */
  height: 50px;
  padding: 5px;
  /* padding-left: 5px; */

  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
}

/* .book-card::after {
  position: absolute;
  height: 18px;
  width: 18px;
  background-color: #fec936;
  background: #fec936c4;
  top: -6px;
  left: -6px;
  content: "1";
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 14px;
  font-weight: bold;
} */

.book-card:hover {
  cursor: pointer;
}

.book-cover:hover::after {
  position: absolute;
  background: black;
  top: 0;
  left: 0;
  content: "";
  /* z-index: -1; */
  /* border-radius: 10px; */
  opacity: 0.2;
  display: block;
  animation: gradualAppearance 200ms ease-out;
  animation-fill-mode: reverse;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* .p-ending {
  position: absolute;
  height: 10%;
  width: 30%; */
/* top: 0; */
/* right: 0; */
/* background: linear-gradient(to left, white, transparent); */
/* } */

.big {
  width: 165px;
  /* height: 245px; */
}

@keyframes gradualAppearance {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}
</style>