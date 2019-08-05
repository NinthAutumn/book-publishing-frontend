<template>
  <div class="pmb-toc dialog dialog__container">
    <div class="pmb-toc__container dialog__content">
      <div class="pmb-toc__header">
        <div class="pmb-toc__icon" v-ripple @click="$router.push(`/books/${book.id}`)">
          <fa icon="chevron-down" class="pmb-toc__close"></fa>
        </div>
        <div class="pmb-toc__book-title" v-text="book.title"></div>
      </div>
      <div class="pmb-toc__nav flex-row flex--align flex--right">
        <Select
          transition="grow-shrink"
          :width="100"
          :height="30"
          :fontSize="14"
          def="上り"
          name="並び替え"
          class="reviews-list__sort"
          :object="sort_type"
          v-model="sort"
        ></Select>
      </div>
      <div class="pmb-toc__volumes">
        <div class="pmb-toc__volume" v-for="volume in volumes" :key="volume.volume">
          <div class="pmb-toc__volume-title" v-text="`${volume.volume}章 ${volume.volume_title}`"></div>

          <div class="pmb-toc__chapters">
            <div
              class="pmb-toc__chapter flex-row"
              v-for="chapter in volume.chapters"
              :key="chapter.id"
              v-ripple
            >
              <div class="pmb-toc__index" v-text="`${chapter.index}話`"></div>
              <div class="pmb-toc__meta flex-divider flex-column">
                <div class="pmb-toc__title" v-text="`${chapter.title}`"></div>
                <div class="flex-divider flex-row flex--align flex--between">
                  <div
                    class="pmb-toc__created"
                    v-text="(today < $moment(chapter.created_at).add(6, 'days').toDate())? $moment(chapter.created_at).startOf('minute').fromNow():$moment(chapter.created_at).format('l')"
                  ></div>
                  <fa class="pmb-toc__locked" v-if="chapter.bought" :icon="'unlock'"></fa>
                  <fa class="pmb-toc__locked" v-else-if="chapter.locked" :icon="'lock'"></fa>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    book: Object
  },
  data() {
    return {
      sort_type: [{ key: "上り", value: 0 }, { key: "下がり", value: 1 }],
      sort: 0
    };
  },
  watch: {
    sort: {
      immediate: true,
      handler: function(newReview, oldREview) {
        this.asc();
      }
    }
  },
  computed: {
    ...mapGetters({
      volumes: "chapter/getChapterList",
      auth: "auth/isAuthenticated"
    })
  },
  components: {
    Select: () => import("@/components/All/Select")
  },
  methods: {
    async asc() {
      this.$store.commit("chapter/TOC_REVERSE");
      this.ascending = !this.ascending;
    }
  },
  async mounted() {
    await this.$store.dispatch("chapter/fetchPublishedList", {
      bookId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
.pmb-toc {
  $self: &;
  &__container {
    overflow: auto;
    #{$self}__header {
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.4rem;
      #{$self}__icon {
        min-width: 4rem;
        min-height: 4rem;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $secondary;
      }
      #{$self}__book-title {
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    #{$self}__volume {
      #{$self}__volume-title {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: rgb(32, 32, 32);
        font-weight: bold;
      }
      #{$self}__chapters {
        width: 100%;
        max-width: 100%;

        .flex-divider {
          width: 100%;
        }
        #{$self}__meta {
          // padding: 0 0.5rem;
        }
        #{$self}__chapter {
          overflow: auto;
          width: 100%;
          max-width: 100%;
          margin-bottom: 0.5rem;
        }
        #{$self}__index {
          // width: 100%;
          width: 5rem;
          font-size: 1.2rem;
          align-self: flex-start;
        }
        #{$self}__created {
          font-size: 1.2rem;
        }
        #{$self}__title {
          font-size: 1.3rem;
        }
      }
    }
  }
}
</style>
