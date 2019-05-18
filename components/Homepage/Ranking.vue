<template>
  <div class="recommendation-books__ranking">
    <div class="recommendation-books__ranking__list">
      <div class="recommendation-books__ranking__item" v-for="book in ranking" :key="book.id">
        <div class="recommendation-books__ranking__index">{{book.dense_rank}}.</div>
        <!-- <div class="recommendation-books__ranking__cover"> -->
        <v-img
          :src="book.cover"
          :aspect-ratio="1/1.5"
          max-width="4rem"
          min-width="4rem"
          alt="Book cover"
          style="border-radius: 0.4rem;box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
          0 3px 9px 0 rgba(0, 0, 0, 0.08);
        margin-right: 1rem;"
        ></v-img>
        <!-- </div> -->
        <div class="recommendation-books__ranking__meta">
          <div class="recommendation-books__ranking__title">{{book.title}}</div>
          <div class="recommendation-books__ranking__author">うん戦乱</div>
        </div>
      </div>
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
        display: flex;
        align-items: center;
      }
      #{$self}__cover {
        // height: 100%;
      }
      #{$self}__index {
        font-size: 1.2rem;
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
