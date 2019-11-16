<template>
  <div class="chapter-list">
    <div class="chapter-list__container">
      <div class="chapter-list__icon">
        <nav-icon :icon="'sort-numeric-down'" animation @click="rotateHandler"></nav-icon>
      </div>

      <transition-group name="list-complete" tag="ul" class="chapter-list__sections">
        <li class="chapter-list__section" v-for="section in sections" :key="section.volume">
          <div class="chapter-list__section-title">{{`${section.volume}章 ${section.volume_title}`}}</div>
          <ul
            name="list-complete"
            tag="ul"
            class="chapter-list__list"
            v-if="section.chapters.length > 0&&section.chapters[0]['id']"
          >
            <chapter-item :chapter="chapter" v-for="chapter in section.chapters" :key="chapter.id"></chapter-item>
          </ul>
          <div v-else class="chapter-list__list chapter-list__list--no-item">まだこの章の話はありません</div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: [Object, Array]
    }
  },
  components: {
    ChapterItem: () => import("./Content"),
    NavIcon: () => import("@/components/Web/Cards/Icon/Nav")
  },
  methods: {
    rotateHandler() {
      this.$store.commit("chapter/TOC_REVERSE", "published");
    }
  }
};
</script>

<style lang="scss">
.chapter-list {
  $self: &;
  &__container {
    #{$self}__icon {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    #{$self}__sections {
    }
    #{$self}__section {
      margin-bottom: 1rem;
    }
    #{$self}__section-title {
      padding: 1rem 1rem;
      background-color: #f6f9fc;
      // box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
      //   0 1px 3px rgba(0, 0, 0, 0.08);
      border-radius: 0.5rem;
      font-size: 1.3rem;
    }
    #{$self}__list {
      margin-top: 0.75rem;
      // box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
      //   0 1px 3px rgba(0, 0, 0, 0.08);
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 100%;
      &--no-item {
        font-size: 1.4rem;
        padding: 1rem;
        margin: 0.25rem 0;
        width: 100%;
      }
    }
  }
}
</style>
