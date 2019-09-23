<template>
  <div class="book-toc__volume-container">
    <div class="book-toc__volume-meta">
      <div class="book-toc__volume-index">{{`第${volume.volume}章`}}</div>
      <div class="book-toc__volume-title" v-if="!editVolume">{{volume.volume_title}}</div>
      <div class="book-toc__volume-edit flex-row flex--align" v-else>
        <input type="text" v-model="volume_title" @keypress.enter="updateVolume" maxlength="100" />
        <div class="book-toc__edit" v-ripple @click="updateVolume">更新</div>
        <div class="book-toc__edit--cancel" v-ripple @click="editVolume=!editVolume">キャンセル</div>
      </div>
      <div class="book-toc__volume-edit" v-if="!editVolume" @click="editVolume=!editVolume">編集</div>
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
          <div
            class="book-toc__index"
          >{{`${chapter.index}${chapter.setting_index? `.${chapter.setting_index}`:''}`}}</div>
          <div class="book-toc__title">{{chapter.title}}</div>
        </div>
        <div class="flex-divider flex-row flex--align">
          <!-- <div class="book-toc__delete">削除</div> -->
          <div
            v-if="chapter.state === 'published'"
            class="book-toc__created-at"
          >{{$moment(chapter.created_at).calendar()}}</div>
          <div v-if="chapter.state === 'scheduled'" class="book-toc__created-at">スケジュールされている話です</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    volume: Object
  },
  data() {
    return {
      editVolume: false,
      volume_title: this.volume.volume_title
    };
  },
  methods: {
    async editChapter(chapterId) {
      this.$router.push(
        `/dashboard/books/${this.$route.params.id}/new?chapterId=${chapterId}`
      );
    },
    async updateVolume() {
      try {
        await this.$store.dispatch("chapter/patchVolume", {
          title: this.volume_title,
          id: this.volume.volume_id
        });
        this.editVolume = !this.editVolume;
        await this.$store.dispatch("chapter/fetchChapterList", {
          bookId: this.$route.params.id,
          state: "published",
          structured: true
        });
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss">
.book-toc {
  &__volume-edit {
    input {
      height: 100%;
      font-size: 14px;
      // width: 20rem;
      min-width: 20rem;
      width: 100%;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      background-color: #fff;
      &:focus {
        outline: none;
      }
      margin-right: 1rem;
    }
  }
  &__edit {
    width: 100%;
    font-size: 14px;
    margin-right: 1rem;
    &--cancel {
      width: 100%;
      font-size: 14px;
      min-width: 7rem;
    }
  }
}
</style>
