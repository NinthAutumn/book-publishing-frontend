
<template>
  <div class="book-toc">
    <div class="book-toc__chapter-list" v-if="!published">
      <div class="book-toc__chapter-item" v-if="toc.length < 1">
        <div class="book-toc__title">まだ話はありません</div>
      </div>
      <div
        v-else
        class="book-toc__chapter-item"
        v-for="(chapter,index) in toc"
        :key="index"
        v-ripple
        @mouseenter="deleteButton = index"
        @mouseleave="deleteButton = null"
      >
        <div class="flex-divider flex-row">
          <div class="book-toc__index">{{chapter.index}}</div>
          <div class="book-toc__title">{{chapter.title}}</div>
        </div>
        <div class="flex-divider flex-row flex--align">
          <div class="book-toc__delete" v-show="deleteButton === index">削除</div>
          <div class="book-toc__created-at">{{chapter.created_at}}</div>
        </div>
      </div>
    </div>
    <div class="book-toc__volume" v-for="(volume,index) in toc" :key="index" v-else>
      <div class="book-toc__volume-meta">
        <div class="book-toc__volume-index">第{{volume.volume}}章</div>
        <div class="book-toc__volume-title">{{volume.volume_title}}</div>
        <div class="book-toc__volume-edit">編集</div>
      </div>
      <div class="book-toc__chapter-list">
        <div
          class="book-toc__chapter-item"
          v-for="(chapter,index) in volume.chapters"
          :key="index"
          v-ripple
          @mouseenter="deleteButton = index"
          @mouseleave="deleteButton = null"
        >
          <div class="flex-divider flex-row">
            <div class="book-toc__index">{{chapter.index}}</div>
            <div class="book-toc__title">{{chapter.title}}</div>
          </div>
          <div class="flex-divider flex-row flex--align">
            <div class="book-toc__delete" v-show="deleteButton === index">削除</div>
            <div class="book-toc__created-at">{{chapter.created_at}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toc: Array,
    published: Boolean
  },
  data() {
    return {
      deleteButton: null,
      editButton: null
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.book-toc {
  $self: &;
  &__volume {
    #{$self}__volume-meta {
      padding: 1rem 2rem;
      background-color: #f6f9fc;
      display: flex;
      align-items: center;
      -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      #{$self}__volume-title {
        font-size: 1.4rem;
        color: #41465a;
      }
      #{$self}__volume-index {
        font-size: 1.4rem;
        color: #41465a;
      }
      #{$self}__volume-edit {
        color: grey;
        margin-left: 1rem;
        font-size: 1.3rem;
        &:hover {
          cursor: pointer;
        }
      }
      margin-bottom: 0.5rem;
    }

    #{$self}__volume-meta {
      display: flex;
    }
  }
  #{$self}__chapter-list {
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
      0 1px 3px rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    #{$self}__chapter-item {
      padding: 1.2rem 2rem;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      color: #6772e5;
      margin-bottom: 2px;
      &:hover {
        background-color: rgb(248, 248, 248);
      }
    }
    #{$self}__delete {
      margin-right: 0.5rem;
      color: #f4648a;
      font-size: 1.2rem;
      &:hover {
        cursor: pointer;
      }
    }
    #{$self}__index {
      font-size: 1.6rem;
      margin-right: 0.5rem;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }

    #{$self}__created-at {
      font-size: 1.6rem;
    }
  }
}
</style>
