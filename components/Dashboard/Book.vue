<template>
  <div class="dash-book">
    <div class="dash-booklist__cover" @mouseenter="image = !image" @mouseleave="image = !image">
      <v-img
        :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
        :aspect-ratio="1/1.5"
        max-width="12rem"
        style=" "
      ></v-img>
      <transition name="fade">
        <fa v-if="image" class="dash-booklist__camera" icon="image"></fa>
      </transition>
    </div>
    <fa class="dash-booklist__edit" icon="edit"></fa>

    <div class="dash-booklist__title">{{book.title}}</div>
    <div class="dash-booklist__stats-list">
      <div class="dash-booklist__stats-item">
        <div class="dash-booklist__stats-title">視聴回数</div>
        <div class="dash-booklist__stats-content">{{book.views}}</div>
      </div>
      <div class="dash-booklist__stats-item">
        <div class="dash-booklist__stats-title">ブックマーク数</div>
        <div class="dash-booklist__stats-content">{{book.bookmark_count||0}}</div>
      </div>
      <div class="dash-booklist__stats-item">
        <div class="dash-booklist__stats-title">話数</div>
        <div class="dash-booklist__stats-content">{{book.chapter_count||0}}</div>
      </div>
      <div class="dash-booklist__stats-item">
        <div class="dash-booklist__stats-title">話数</div>
        <div class="dash-booklist__stats-content">{{book.status||'連載中'}}</div>
      </div>
    </div>
    <div class="dash-booklist__buttons">
      <div
        class="dash-booklist__button dash-booklist__button--announcement"
        @click="openForm"
        v-ripple
      >報告する</div>
      <nuxt-link
        tag="div"
        :to="`/dashboard/books/${book.id}/published`"
        class="dash-booklist__button dash-booklist__button--chapter"
        v-ripple
      >目次</nuxt-link>
      <nuxt-link
        tag="div"
        :to="`/dashboard/books/${book.id}/new`"
        class="dash-booklist__button dash-booklist__button--create-chapter"
        v-ripple
      >話を作る</nuxt-link>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">報告をする</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-validate="'required|max:100'"
            :error-messages="errors.collect('タイトル')"
            data-vv-name="タイトル"
            v-model="announcement.title"
            :counter="100"
            label="タイトル"
            required
          ></v-text-field>
          <v-textarea
            v-validate="'required|max:500'"
            :error-messages="errors.collect('報告')"
            data-vv-name="報告"
            :max="500"
            v-model="announcement.content"
            :counter="500"
            label="報告"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="openForm">キャンセル</v-btn>
          <v-btn color="blue darken-1" flat @click="postAnnouncement">投稿</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  data() {
    return {
      image: false,
      dialog: false,
      announcement: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async openForm() {
      this.dialog = !this.dialog;
    },
    async postAnnouncement() {
      try {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          const announcement = await this.$store.dispatch(
            "book/postAnnouncement",
            {
              bookId: this.bookId,
              content: this.announcement.content,
              title: this.announcement.title
            }
          );
          this.dialog = false;
        }
      } catch (error) {
        return this.$message({
          message: "報告の投稿に失敗しました",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
</style>
