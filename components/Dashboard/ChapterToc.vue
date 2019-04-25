
<template>
  <div class="table-list-component">
    <div class="divider" v-if="!published">
      <v-data-table :headers="innerHeaders" hide-actions :items="toc" class="elevation-1">
        <template v-slot:no-data>
          <p style="text-align:center;">データがないです</p>
        </template>
        <template v-slot:items="props">
          <td>{{ props.item.index }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ $moment(props.item.created_at).format('DD-M-YYYY') }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <div v-else-if="published" v-for="(volume,index) in toc" :key="index" class="elevation-1">
      <h3 class="volume-list__title">{{'第'+ (index+1) + '章: '+ volume.volume_title }}</h3>
      <v-data-table
        :headers="innerHeaders"
        hide-actions
        :items="volume.chapters"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.index }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ $moment(props.item.created_at).format('DD-M-YYYY') }}</td>
          <td>
            <v-icon class="mr-2">edit</v-icon>
            <v-icon>delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="table" v-else v-for="(volume, index) in toc" :key="index">
      <div class="table-volume" v-if="volume.chapters.length > 0">
        <div class="table-header flex flex--align">
          <div class="volume-title">
            <h3>{{volume.volume_title || `第${volume.volume}章`}}</h3>
          </div>
        </div>
      </div>
      <table class="dashboard-toc" v-if="volume.chapters.length > 0">
        <thead>
          <th>話</th>
          <th>タイトル</th>
          <th>投稿日</th>
          <th>更新</th>
        </thead>
        <tbody class="dashboard-toc__body">
          <chapter-toc-item
            :published="published"
            :chapter="chapter"
            v-for="(chapter, index) in volume.chapters"
            :key="index"
          ></chapter-toc-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ChapterTocItem from "./ChapterTocItem";
export default {
  data() {
    return {
      headers: [{ text: "章", value: "volume" }],
      innerHeaders: [
        { text: "話", value: "chapters", sortable: false },
        { text: "タイトル", value: "title", sortable: false },
        { text: "投稿日", value: "update", sortable: false },
        { text: "更新", value: "edit", sortable: false }
      ]
    };
  },
  props: {
    toc: Array,
    published: Boolean
  },
  components: {
    ChapterTocItem: () => import("./ChapterTocItem")
  }
};
</script>

<style lang="scss">
.table-header {
  width: 100%;
  background-color: #f5f5f5;
  padding: 5px;
  box-sizing: border-box;
  height: 45px;
  // dispay:
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
}
.volume-list__title {
  background-color: #fff;
  height: 50px;
  font-size: 1.7rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding-left: 2rem;
}
.dashboard-toc {
  .divider {
    width: 100%;
  }
  .table {
    width: 100%;
  }
  border-spacing: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  // box-shadow: 1px 1px 5px 0px rgb(228, 228, 228)
  thead {
    th {
      font-size: 1.6rem;
      text-align: left;
      padding: 1rem 0.5rem;
    }
  }
  &__header {
    &__row {
      &__item {
        border-bottom: 1px solid $primary-lighter;
        padding: 5px;
        text-align: left;
        font-size: 16px;
        font-weight: 400;

        &--index {
          // width: 20px;
        }
      }
    }
  }
  tbody {
    border: 1px solid grey;
  }
  &__footer {
    background-color: grey;
    &__row {
      background-color: rgba(112, 51, 51, 0);
      &__item {
        width: 100px;
      }
    }
  }
}
</style>
