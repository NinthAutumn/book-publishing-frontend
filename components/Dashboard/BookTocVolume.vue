<template>
  <div class="book-toc__volume-container">
    <div class="book-toc__volume-meta">
      <div class="book-toc__volume-index">{{`第${volume.volume}章`}}</div>
      <div class="book-toc__volume-title" v-if="!editVolume">{{volume.volume_title}}</div>
      <div class="book-toc__volume-edit" v-else>
        <input type="text">
      </div>
      <div class="book-toc__volume-edit" @click="editVolume=!editVolume">編集</div>
    </div>
    <div class="book-toc__chapter-list">
      <div class="book-toc__chapter-item" v-if="!volume.chapters[0].id">
        <div class="book-toc__title">まだ話はありません</div>
      </div>
      <div
        class="book-toc__chapter-item"
        v-else
        v-for="(chapter,index) in volume.chapters"
        :key="index"
        v-ripple
        @click="editChapter(chapter.id)"
      >
        <div class="flex-divider flex-row flex--align">
          <div class="book-toc__index">{{chapter.index}}</div>
          <div class="book-toc__title">{{chapter.title}}</div>
        </div>
        <div class="flex-divider flex-row flex--align">
          <!-- <div class="book-toc__delete">削除</div> -->
          <div class="book-toc__created-at">{{$moment(chapter.created_at).calendar()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    volume: {}
  },
  data() {
    return {
      editVolume: false
    };
  },
  methods: {
    async editChapter(chapterId) {
      await this.$store.dispatch("chapter/fetchChapterDetail", { chapterId });
      this.$router.push(
        `/dashboard/books/${this.$route.params.id}/new?chapterId=${chapterId}`
      );
    }
  }
};
</script>

<style lang="scss">
</style>
