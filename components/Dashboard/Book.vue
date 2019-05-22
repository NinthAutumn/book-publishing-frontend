<template>
  <div class="dash-book">
    <div class="dash-book__cover">
      <v-img :src="book.cover" :aspect-ratio="1/1.5" min-width="12rem" class="dash-book__image"></v-img>
    </div>
    <div class="dash-book__meta">
      <div class="dash-book__title">{{book.title}}</div>
      <div class="dash-book__stats">
        <div class="dash-book__select flex-row flex--between">
          <div class="dash-book__total"></div>
          <select-list
            :width="100"
            v-model="type"
            name="詳細条件"
            :object="select_data"
            transition="grow-shrink"
            def="投票"
          ></select-list>
        </div>
        <!-- {{labels}} -->
        <v-sparkline
          fill
          :value="value"
          :padding="padding"
          :smooth="true"
          :line-width="5"
          :gradient="['#6fa8dc', '#42b983']"
        ></v-sparkline>

        <!-- <no-ssr>
          <bars :data="value" :gradient="['#6fa8dc', '#42b983']"></bars>
        </no-ssr>-->
      </div>
    </div>
    <div class="dash-book__buttons">
      <div class="dash-book__button dash-book__button--announcement" @click="openForm" v-ripple>報告する</div>
      <nuxt-link
        tag="div"
        :to="`/dashboard/books/${book.id}/published`"
        class="dash-book__button dash-book__button--chapter-list"
        v-ripple
      >目次</nuxt-link>
      <nuxt-link
        tag="div"
        :to="`/dashboard/books/${book.id}/published`"
        class="dash-book__button dash-book__button--chapter"
        v-ripple
      >話を投稿</nuxt-link>
    </div>
    <!-- <div class="dash-booklist__cover" @mouseenter="image = !image" @mouseleave="image = !image">
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
    </div>-->
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
  components: {
    SelectList: () => import("@/components/All/Select")
  },
  watch: {
    type: function(val) {
      this.changeStat();
    }
  },
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: ["#00c6ff", "#F0F", "#FF0"],
      value: [],
      type: 0,
      gradientDirection: "top",
      select_data: [
        { key: "投票", value: 0 },
        { key: "ブックマーク", value: 1 },
        { key: "評価", value: 2 },
        { key: "購入", value: 3 },
        { key: "視聴回数", value: 4 }
      ],
      gradients: [
        ["#222"],
        ["#42b3f4"],
        ["red", "orange", "yellow"],
        ["purple", "violet"],
        ["#00c6ff", "#F0F", "#FF0"],
        ["#f72047", "#ffd200", "#1feaea"]
      ],
      image: false,
      dialog: false,
      announcement: {
        title: "",
        content: ""
      },
      labels: []
    };
  },
  async mounted() {
    let i = 6;
    while (i >= 0) {
      let date = this.$moment()
        .subtract(i, "days")
        .format("dddd");

      // .format("YYYY-MM-DD")
      this.labels.push(date);

      i--;
    }
    // console.log(this.labels);
    this.$store
      .dispatch("dashboard/fetchBookStats", {
        bookId: this.book.id,
        type: 0
      })
      .then(book => {
        this.value = [];
        this.labels.forEach((day, index) => {
          book.stat.forEach(stat => {
            // console.log(this.$moment(stat.day).format("dddd"));
            if (day === this.$moment(stat.day).format("dddd")) {
              this.value.push(stat.data);
            }
          });
          if (!this.value[index]) {
            this.value[index] = 0;
          }
        });
      });
  },
  methods: {
    async openForm() {
      this.dialog = !this.dialog;
    },
    async changeStat() {
      this.$store
        .dispatch("dashboard/fetchBookStats", {
          bookId: this.book.id,
          type: this.type
        })
        .then(book => {
          this.value = [];
          this.labels.forEach((day, index) => {
            book.stat.forEach(stat => {
              // console.log(this.$moment(stat.day).format("dddd"));
              if (day === this.$moment(stat.day).format("dddd")) {
                this.value.push(stat.data);
              }
            });
            if (!this.value[index]) {
              this.value[index] = 0;
            }
          });
        });
    },
    async postAnnouncement() {
      try {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          const announcement = await this.$store.dispatch(
            "book/postAnnouncement",
            {
              bookId: this.book.id,
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
.dash-book {
  $self: &;
  margin-top: 5rem;
  margin-left: 5rem;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  background-color: #fff;
  display: flex;
  min-width: 10rem;
  padding: 1rem;
  position: relative;
  &__meta {
    width: 100%;
    height: 100%;
    #{$self}__stats {
      // padding-right: 2rem;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }
  }
  #{$self}__buttons {
    position: absolute;
    bottom: -2rem;
    right: 10px;
    display: flex;
    #{$self}__button {
      padding: 0.8rem 1.5rem;
      font-size: 1.3rem;
      border-radius: 0.4rem;
      color: white;
      transition: color 300ms, box-shadow 300ms;
      user-select: none;
      &:hover {
        cursor: pointer;
        transition: color 300ms, box-shadow 300ms;
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
      &--chapter {
        background-color: #7231c0;
        margin-left: 1rem;
        &:hover {
          color: #7231c0;
          background-color: #fff;
        }
      }
      &--chapter-list {
        background-color: #6772e5;
        margin-left: 1rem;
        &:hover {
          color: #6772e5;
          background-color: #fff;
        }
      }
      &--announcement {
        background-color: #00d3d7;
        &:hover {
          color: #00d3d7;
          background-color: #fff;
        }
      }
    }
  }
  &__cover {
    position: relative;
    #{$self}__image {
      border-radius: 0.4rem;
      box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
        0 3px 9px 0 rgba(0, 0, 0, 0.08);
      transform: translateX(-5rem) translateY(-5rem);
    }
  }
  &:hover {
    // background-color: grey;
  }
}
</style>
