<template>
  <div class="mcr-card">
    <div class="mcr-card__container">
      <fa class="mcr-card__question" icon="question-circle"></fa>
      <div class="flex-divider flex-row flex--between">
        <div class="mcr-card__meta mcr-card__meta--rank">
          <div class="mcr-card__label" v-text="'今日の投票ランキング'"></div>
          <div class="mcr-card__number" v-text="`No.${ranking.ranking}`"></div>
        </div>
        <div class="flex-divider flex-row mcr-card__score">
          <fa class="mcr-card__icon mcr-card__icon--score" icon="bolt"></fa>
          <div class="mcr-card__number" v-text="`${ranking.votes}`"></div>
        </div>
      </div>
      <hr />
      <div class="mcr-card__vote flex-row flex--right">
        <div class="mcr-card__button" @click="voteHandler" v-text="'投票'"></div>
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
    ...mapGetters({
      auth: "auth/isAuthenticated"
    })
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `/v2/ranking/${this.$route.params.id}/vote?period=daily`
    );
    if (!data || data === "undefined") {
      this.ranking = {
        ranking: "999+",
        votes: 0
      };
    } else {
      this.ranking = data;
    }
  },
  methods: {
    async voteHandler() {
      this.loading = "vote";
      try {
        if (!this.auth) {
          this.$toast.error(`投票をするにはログインかアカウント作成が必要です`);
          this.loading = false;
          return this.$store.commit("LOGIN_STATE");
        }
        const { error } = await this.$store.dispatch("book/postVote", {
          bookId: this.$route.params.id
        });
        if (error) {
          return this.$toast.error(`${error}`, {
            position: "top-right",
            duration: 1000,
            icon: "extension"
          });
        }
      } catch (error) {}
      this.loading = false;
      this.ranking.votes++;
      await this.$store.dispatch("wallet/wealth");
    }
  }
};
</script>

<style lang="scss">
.mcr-card {
  $self: &;
  &__container {
    padding: 1rem;
    box-shadow: 0 2px 4px 0 rgba(31, 33, 41, 0.08),
      0 4px 16px 0 rgba(59, 102, 245, 0.12);
    margin: 0rem 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    position: relative;
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
    #{$self}__question {
      position: absolute;
      font-size: 1.2rem;
      top: 1rem;
      right: 1rem;
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
