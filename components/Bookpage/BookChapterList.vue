<template>
  <div class="book-chapters" :class="{'book-chapters--mobile':$device.isMobile}">
    <div class="bookchapterlists__options">
      <fa
        class="bookchapterlists__options--sort"
        icon="sort-numeric-down"
        @click="asc"
        :class="{rotate: ascending}"
      ></fa>
    </div>
    <transition-group name="list-complete" tag="ul" class="book-chapters__volume-list">
      <li v-for="(volume) in volumes" :key="volume.volume" class="book-chapters__volume-item">
        <div
          v-if="volume.chapters.length> 0"
          class="book-chapters__volume-item__content"
        >{{ `第${volume.volume}章 ${volume.volume_title}`}}</div>
        <div class="book-chapters__container" v-if="volume.chapters[0].id">
          <transition-group name="list-complete" tag="ul" class="book-chapters__chapter-list">
            <nuxt-link
              tag="li"
              class="book-chapters__chapter-item"
              v-for="(chapter) in volume.chapters"
              :key="chapter.id"
              :to="{path: `/books/${ chapter.book_id}/${chapter.id}`}"
              :class="{'book-chapters__chapter-item--disable':chapter.locked&&!auth}"
              v-ripple
            >
              <div class="flex-divider flex-row" style="height:100%;max-width:100%;">
                <div class="book-chapters__chapter-item__content--index">{{chapter.index}}</div>
                <div
                  class="flex-divider flex--between flex-column book-chapters__chapter-item__content book-chapters__chapter-item__content--divider"
                >
                  <div
                    class="book-chapters__chapter-item__content book-chapters__chapter-item__content--title"
                  >
                    <p>{{chapter.title}}</p>
                  </div>
                  <div
                    class="book-chapters__chapter-item__content book-chapters__chapter-item__content--chapter-meta"
                  >
                    <p
                      class="book-chapters__chapter-item__content book-chapters__chapter-item__content--createdAt"
                      v-if="today < $moment(chapter.created_at).add(6, 'days').toDate()"
                    >{{$moment(chapter.created_at).startOf('minute').fromNow()}}</p>
                    <p
                      class="book-chapters__chapter-item__content--createdAt"
                      v-else
                    >{{$moment(chapter.created_at).format('l')}}</p>
                    <fa
                      class="book-chapters_chapter-item__content--locked"
                      icon="lock"
                      v-if="chapter.locked&&!chapter.bought"
                    ></fa>
                    <fa
                      class="book-chapters_chapter-item__content--locked"
                      icon="unlock"
                      v-if="chapter.locked&&chapter.bought"
                    ></fa>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </transition-group>
        </div>
        <div class="book-chapters__chapter-list book-chapters__chapter-list--no" v-else>
          <div class="book-chapters__no-chapter">まだこの章に話はありません</div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// const _ = require("lodash");
export default {
  props: {
    // chapters: Array
  },
  data() {
    return {
      rowCount: 0,
      createdAt: "null",
      ascending: false,
      today: ""
      // ascState: "asc"
      // chapters: {}
    };
  },
  created() {
    this.today = this.$moment().toDate();
  },
  async mounted() {
    await this.$store.dispatch("chapter/fetchPublishedList", {
      bookId: this.$route.params.id
    });
  },
  methods: {
    async asc() {
      this.$store.commit("chapter/TOC_REVERSE");
      this.ascending = !this.ascending;
    }
  },
  computed: {
    ...mapGetters({
      volumes: "chapter/getChapterList",
      auth: "auth/isAuthenticated"
    })
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 17) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.chapter-createdAt {
  font-size: 13px;
  text-align: right;
}

@media screen and (max-width: 882px) {
  .book-chapters {
    $self: &;
    &__chapter-list {
      /* autoprefixer: ignore next; */
      grid-template-columns: repeat(auto-fill, 100%) !important;
    }
  }
}

.book-chapters {
  $self: &;
  &--mobile {
    #{$self}__volume-item {
      &__content {
        font-size: 1.4rem !important;
        color: #2a2f45 !important;
      }
    }
    #{$self}__chapter-item {
      border-bottom: 0px solid !important;
      background-color: #fff !important;
      &:hover {
        background-color: #fff !important;
      }
    }
  }
  &__volume-list {
    // display: grid;
    // grid-template-areas: "volume volume" "content content";
    // grid-template-columns: 1fr 1fr;
    // grid-gap: 0, 2rem 1.5rem;
    #{$self}__volume-item {
      // grid-area: volume;
      &__content {
        font-size: 1.6rem;
      }
    }
  }
  &__container {
    width: 100%;
  }
  &__chapter-list {
    // grid-area: content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 0; /* NEW */
    min-width: 0;
    /* autoprefixer: ignore next; */
    grid-gap: 0 5px;
    // overflow: hidden;

    // grid-template-rows: auto;
    &--no {
      #{$self}__no-chapter {
        font-size: 1.6rem;
        height: 4rem;
        display: flex;
        align-items: center;
        color: grey;
      }
    }
    user-select: none;

    #{$self}__chapter-item {
      min-width: 100%;
      color: #2a2f45;
      &--disable {
        display: none;
      }
      &:nth-child(4n - 1),
      &:nth-child(4n) {
        background-color: #f6f9fc;
        &:hover {
          background-color: #fff;
        }
      }
      border-bottom: 1px solid #aab7c4;
      // border-radius: 1rem;
      // background-color: #fff8f8;

      margin: 0.3rem 0.3rem;
      padding: 0.5rem 0;
      // border-bottom: 1px solid grey;
      height: 6rem;
      &:hover {
        cursor: pointer;
        background-color: #f6f9fc;
      }
      &__content {
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        &--index {
          padding: 0.5rem 0.2rem;
          font-size: 1.6rem;
          margin-right: 1rem;
        }
        &--chapter-meta {
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          justify-content: space-between;
          font-size: 1.3rem !important;
        }
        &--divider {
          padding-right: 10px;
        }
        &--title {
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          p {
            font-size: 1.6rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        &--createdAt {
          font-size: 1.4rem !important;
        }
      }
    }
  }
}

.bookchapterlists {
  // -webkit-box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  // -moz-box-shadow: 0px 2px 5px 0px rgb(255, 255, 255);
  // box-shadow: 0px 2px 5px 0px rgb(233, 218, 233);
  padding: 10px 5px 10px 0px;
  // height: 482px;
  width: 100%;
  box-sizing: border-box;
  //
  &__options {
    text-align: right;
    margin-right: 17.12px;
    margin-bottom: 5px;
    font-size: 25px;

    // transition: 300ms;
    .rotate {
      transform: rotate(-180deg);
      transition: 300ms;
    }
    &--sort {
      // text-align: right;
      // position: sticky;
      color: #885cd3;
      transform: rotate(-360deg);
      transition: 300ms;
      &:hover {
        cursor: pointer;
        color: #512e8d;
      }
    }
    &--bookmark {
      margin-right: 10px;
      // font-size: 25px;
      color: #c1c9e4;
    }
  }
  // border: 1px solid $primary;
}
</style>
