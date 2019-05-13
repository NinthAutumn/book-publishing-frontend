<template>
  <div class="book-chapters">
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
        >{{volume.volume_title || `第${volume.volume}章`}}</div>
        <transition-group name="list-complete" tag="ul" class="book-chapters__chapter-list">
          <nuxt-link
            tag="li"
            class="book-chapters__chapter-item"
            v-for="(chapter) in volume.chapters"
            :key="chapter.index"
            :to="{path: `/books/${ $route.params.id}/${chapter.id}`}"
            v-ripple
          >
            <div class="flex-divider flex" style="height:100%;">
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
                    v-if="chapter.locked"
                  ></fa>
                </div>
              </div>
            </div>
          </nuxt-link>
        </transition-group>
      </li>
    </transition-group>
  </div>
</template>

<script>
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
    volumes: function() {
      return this.$store.getters["chapter/getChapterList"];
    }
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
    &__chapter-list {
      grid-template-columns: repeat(auto-fill, 100%) !important;
    }
  }
}

.book-chapters {
  $self: &;

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

  &__chapter-list {
    // grid-area: content;
    // display: grid;
    // grid-template-columns: repeat(auto-fill, 50%);
    // grid-template-rows: auto;
    user-select: none;

    #{$self}__chapter-item {
      max-width: 100%;
      margin: 0.3rem 0.3rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid grey;
      height: 6rem;
      &:hover {
        cursor: pointer;
        background-color: rgb(247, 247, 247);
      }
      &__content {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
            max-width: 100%;
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
