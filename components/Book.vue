<template>
  <div id="book-card" :class="size">
    <div class="book-cover" @click="linkTo">
      <span class="star-rating"></span>
      <img :src="book.cover" class="book-img" alt="Book cover">
    </div>
    <div class="text-info">
      <p class="book-title full" ref="texting">{{book.title}}</p>
      <span class="p-ending"></span>
      <star-rating
        v-model="book.rating"
        :star-size="20"
        read-only="true"
        :show-rating="true"
        inactive-color="#CCCCCC"
        active-color="#5580E9"
        :increment="0.01"
        :round-start-rating="false"
        border-color="#5580E9"
        :glow="1"
        glow-color="#CCCCCC"
        class="star-rating"
      ></star-rating>
    </div>
  </div>
</template>
<script>
// import StarRating from "vue-star-rating";
export default {
  name: "book-card",
  comonents: {
    // StarRating
  },
  props: {
    book: Object,
    size: String
  },
  data() {
    return {
      rating: 3.5
    };
  },
  methods: {
    linkTo() {
      this.$router.push("/");
    }
  },
  mounted() {
    var el = this.$refs.texting;
    var wordArray = el.innerHTML.split("");
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join("") + "...";
    }
  }
};
</script>
<style>
.book-cover {
  width: 16.5rem;
  height: 24.5rem;
  position: relative;
  -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  border-radius: 1rem;
}
#book-card {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin-right: 2rem;
  width: 16.5rem;
  /* height: 245px; */
  position: relative;
}

.book-img {
  width: 16.5rem;
  height: 24.5rem;
  position: relative;
  /* border-radius: 10px; */

  border-radius: 1rem;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
}

.book-title {
  margin: 0;
  /* margin-top: 10px; */
  padding: 0;
  font-size: 1.6rem;
  width: inherit;
  height: 5rem;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  position: relative;
  /* line-clamp: 2; */
  /* white-space: normal; */
  /* display: -webkit-box; */
  /* white-space: normal; */
  /* word-wrap: break-word; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 1; */
}

.book-title:hover {
  overflow: visible;
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
  flex-direction: column;
  /* background: white; */
  /* height: 7rem; */
  padding: 0.5rem;
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

.book-cover:hover {
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
  border-radius: 1rem;
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
  width: 16.5rem;
  /* height: 245px; */
}

.vue-star-rating-rating-text {
  font-size: 1.6rem;
  margin: 0 !important;
  margin-left: 0.5rem !important;
}
.star-rating {
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