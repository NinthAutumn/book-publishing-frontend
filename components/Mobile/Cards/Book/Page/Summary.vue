<template>
  <div class="mbp-summary">
    <div class="mbp-summary__container">
      <book-category :categories="genres" title="ジャンル"></book-category>

      <div class="mbp-summary__content">
        <div class="mbp-summary__title">あらすじ</div>
        <div class="mbp-summary__synopsis" v-text="synopsis"></div>
      </div>
      <div class="mbp-summary__nav" v-if="!extra" @click="extra = !extra">
        詳細
        <fa class="mbp-summary__nav-icon" icon="caret-down"></fa>
      </div>
      <book-category :categories="tags" title="タグ" v-if="extra"></book-category>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    synopsis: String
  },
  data() {
    return {
      extra: false
    };
  },
  computed: {
    ...mapGetters({
      genres: "book/getBookGenres",
      tags: "book/getBookTags"
    })
  },
  components: {
    BookCategory: () => import("@/components/Mobile/Pills/BookCategory")
  },
  async mounted() {
    await this.$store.dispatch(
      "book/fetchBookGenreAndTags",
      this.$route.params.id
    );
  }
};
</script>

<style lang="scss">
.mbp-summary {
  $self: &;
  &__container {
    // box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    //   0 3px 6px 0 rgba(0, 0, 0, 0.07);
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    #{$self}__title {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    #{$self}__synopsis {
      color: rgb(44, 44, 44);
      p {
        font-size: 1.3rem;
      }
      font-size: 1.3rem;
    }
    #{$self}__nav {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      font-weight: bold;
      color: $secondary;
      justify-content: center;
      #{$self}__nav-icon {
        margin-left: 0.5rem;
      }
    }
    #{$self}__categories {
      display: flex;
      flex-wrap: wrap;
      #{$self}__category {
        border-radius: 0.2rem;
        font-size: 1.2rem;
        color: rgb(44, 44, 44);
        padding: 0.5rem 2rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        background-color: rgb(241, 241, 241);
      }
    }
  }
}
</style>
