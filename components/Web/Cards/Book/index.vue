<template>
  <div class="book-component">
    <default-type
      v-if="type === 'default'"
      :cover="cover"
      :book="book"
      :customClass="customClass"
      :isMobile="isMobile"
      :progress="progress"
      :clampLine="clampLine"
      :rating="rating"
    ></default-type>
    <search-type v-else-if="type === 'search'" :book="book"></search-type>
    <update-type v-else-if="type === 'update'" :book="book"></update-type>
  </div>
</template>

<script>
// import { TrinityRingsSpinner } from "epic-spinners";
export default {
  props: {
    type: {
      type: String,
      default: "default"
    },
    cover: {
      type: [String, Object],
      default: () => require("~/assets/img/NobleCardLight.png")
    },
    book: {
      type: [Object, Array]
    },
    progress: {
      type: Boolean,
      default: false
    },
    clampLine: {
      type: [String, Number],
      default: 2
    },
    customClass: {
      type: [String, Object],
      default: ""
    },
    // progress: {
    //   type: [String, Number],
    //   default: 0
    // },
    isMobile: {
      type: Boolean,
      default: false
    },
    rating: Boolean
  },
  data() {
    return {
      // lazyCover: require("~/assets/img/NobleCardLight.png")
    };
  },
  components: {
    DefaultType: () => import("./Default"),
    SearchType: () => import("./Search"),
    UpdateType: () => import("./Update")
  }
  // mounted: {}
};
</script>

<style lang="scss">
</style>
