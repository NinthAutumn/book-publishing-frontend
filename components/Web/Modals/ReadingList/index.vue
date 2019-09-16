
<template>
  <div class="reading-mmodal dialog dialog__container" :class="{'reading-mmodal--disabled':!state}">
    <div class="reading-mmodal__container dialog__content" v-click-outside="close">
      <div class="reading-mmodal__header">
        <div class="flex-divider flex-row flex--align flex--between">
          <div class="reading-mmodal__title" v-text="show.title"></div>
          <div class="reading-mmodal__like flex-row flex--align" @click="likeHandler">
            <div class="reading-mmodal__likes" v-text="likes"></div>
            <fa :icon="heart"></fa>
          </div>
        </div>
        <div class="reading-mmodal__description" v-text="show.description"></div>
      </div>
      <div class="reading-mmodal__books">
        <book-card
          noColor
          :index="book.index -1"
          :book="book"
          v-for="(book) in books"
          :key="book.id"
        ></book-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      show: "reading/getListInfo",
      state: "reading/getListModalState",
      selectedId: "reading/getSelectedList",
      books: "reading/getListBooks"
    })
  },
  components: {
    BookCard: () => import("@/components/Web/Cards/Book/Ranking")
  },
  async mounted() {
    await this.$store.dispatch("reading/fetchReadingListInfo", {
      id: this.selectedId
    });
    await this.$store.dispatch("reading/fetchReadingListBookList", {
      id: this.selectedId,
      page: 1,
      limit: 10
    });

    this.likes = this.show.likes;
    this.followed = this.show.followed;
    if (this.show.liked) {
      this.heart.prefix = "fa";
    }
  },
  methods: {
    ...mapMutations({
      close: "reading/TOGGLE_LIST_MODAL"
    }),
    async followHandler() {
      this.followed = !this.followed;
      await this.$store.dispatch("reading/followReadingList", {
        id: this.reading.id
      });
    },
    async likeHandler() {
      if (this.heart.prefix === "far") {
        this.heart.prefix = "fa";
        this.likes++;
        await this.$store.dispatch("reading/likeReadingList", {
          id: this.reading.id
        });
      } else {
        this.likes--;
        this.heart.prefix = "far";
        await this.$store.dispatch("reading/likeReadingList", {
          id: this.reading.id
        });
      }
    }
  },
  data() {
    return {
      heart: {
        prefix: "far",
        iconName: "heart"
      },
      liked: false,
      followed: false
    };
  }
};
</script>

<style lang="scss">
.reading-mmodal {
  $self: &;
  &__container {
    #{$self}__header {
      #{$self}__title {
        font-size: 1.7rem;
        font-weight: bold;
      }
      #{$self}__like {
        font-size: 1.6rem;
        color: red;
        #{$self}__likes {
          font-size: 1.6rem;
          margin-right: 0.5rem;
        }
        &:hover {
          cursor: pointer;
        }
      }
      #{$self}__description {
        border-radius: 0.5rem;
        font-size: 1.4rem;
        padding: 1rem 2rem;
        background-color: #f7f8f9;
        color: #666666;
      }
      margin-bottom: 1rem;
    }
    #{$self}__books {
      max-width: 50rem;
      max-height: 50rem;
      overflow: auto;
    }
  }
}
</style>
