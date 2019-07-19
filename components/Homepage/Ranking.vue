<template>
  <div class="recommendation-books__ranking">
    <div class="recommendation-books__ranking__list">
      <nuxt-link
        :to="`/books/${book.id}`"
        class="recommendation-books__ranking__item"
        v-for="book in ranking"
        :key="book.id"
        tag="div"
        v-ripple
      >
        <div class="recommendation-books__ranking__index">{{book.dense_rank}}.</div>
        <!-- <div class="recommendation-books__ranking__cover"> -->
        <v-img
          :src="book.cover+'?s'"
          :aspect-ratio="1/1.5"
          max-width="4rem"
          :lazy-src="cover"
          min-width="4rem"
          alt="Book cover"
          style="border-radius: 0.4rem;box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
          0 3px 9px 0 rgba(0, 0, 0, 0.08);
        margin-right: 1rem;"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular size="30" indeterminate color="#555555 "></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
        <!-- </div> -->
        <div class="recommendation-books__ranking__meta">
          <div class="recommendation-books__ranking__title">{{book.title}}</div>
          <div class="recommendation-books__ranking__author">うん戦乱</div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      ranking: "analytic/getVoteRanking"
    })
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png")
    };
  }
};
</script>

<style lang="scss">
.recommendation-books {
  &__ranking {
    $self: &;

    &__list {
      border-radius: 0.5rem;
      background-color: #f4f6f8;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      min-height: 38.2rem;
      max-height: 100%;
      box-sizing: border-box;
      width: 20vw;
      #{$self}__item {
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
      }
      #{$self}__cover {
        // height: 100%;
      }
      #{$self}__index {
        font-size: 1.2rem;
        font-weight: bold;
        width: 2.5rem;
        min-width: 2.5rem;
      }
      #{$self}__title {
        max-width: 100%;
        font-weight: bold;
        word-break: break-all;
      }
      #{$self}__author {
        color: #79bdff;
        font-weight: bold;
      }
    }
  }
}
// .tab-ranking__
</style>
