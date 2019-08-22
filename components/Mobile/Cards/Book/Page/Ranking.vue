<template>
  <div class="mcr-card">
    <div class="mcr-card__container">
      <div class="flex-divider flex-row flex--between">
        <div class="mcr-card__meta mcr-card__meta--rank">
          <!-- <fa class="mcr-card__icon mcr-card__icon--rank" icon="pager"></fa> -->
          <div class="mcr-card__label" v-text="'今日の投票ランキング'"></div>
          <div class="mcr-card__number" v-text="`No.${ranking.ranking}`"></div>
        </div>
        <div class="flex-divider flex-row mcr-card__score">
          <fa class="mcr-card__icon mcr-card__icon--score" icon="bolt"></fa>
          <!-- <div class="mcr-card__label" v-text="'投票トークン'"></div> -->
          <div class="mcr-card__number" v-text="`${ranking.votes}`"></div>
        </div>
        <!-- <div class="mcr-card__meta mcr-card__meta--score"> -->

        <!-- </div> -->
      </div>
      <hr />
      <div class="mcr-card__vote flex-row flex--right">
        <div class="mcr-card__button" v-text="'投票'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ranking: {
        ranking: 999,
        votes: 0
      }
    };
  },
  computed: {
    // ...mapGetters({
    //   ranking
    // })
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `/ranking/${this.$route.params.id}?period=daily&type=vote`
    );
    console.log(data);
    this.ranking = data;
  }
};
</script>

<style lang="scss">
.mcr-card {
  $self: &;
  &__container {
    padding: 1rem;
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    // border:1p
    #{$self}__label {
      font-size: 1.4rem;
      font-weight: bold;
    }
    hr {
      margin: 0.5rem 0;
      border: 1px solid rgb(235, 235, 235);
    }
    #{$self}__button {
      font-size: 1.2rem;
      padding: 0.25rem 2rem;
      border-radius: 0.5rem;
      background: #f4648a;
      text-shadow: 0 1px 3px #f4648a65;
      color: white;
    }
    #{$self}__number {
      font-weight: bold;
      font-size: 2rem;
    }
    #{$self}__score {
      align-self: flex-end;
      align-items: center;
    }
    #{$self}__icon {
      font-size: 1.4rem;
      &--score {
        color: #f4648a;
        margin-right: 0.5rem;
      }
      &--rank {
        color: $secondary;
      }
    }

    #{$self}__number {
    }
    #{$self}__meta {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }
}
</style>
