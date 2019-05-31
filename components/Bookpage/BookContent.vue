<template>
  <div class="book-content">
    <div class="book-content__left flex flex-column divider">
      <div class="book-content--text">
        <transition name="slide-fade" mode="out-in">
          <div v-show="bookSynopsis" class="book-content--text__summary">
            <h4>あらすじ</h4>
            <div class="flex-divider"></div>
            <p
              v-if="read"
              class="book-content--text__summary--text"
            >{{book.synopsis|truncate(limit-1)}}</p>
            <p v-else class="book-content--text__summary--text">{{book.synopsis}}</p>
            <div class="book-content__truncate-nav" v-if="length > limit">
              <div class="book-content__read-more" @click="read=!read" v-if="read">>>詳細</div>
              <div class="book-content__read-less" @click="read=!read" v-else><<一部を表示</div>
            </div>
          </div>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <div v-show="!bookSynopsis" class="book-content--text__statistics">
            <span class="book-content--text__statistics--title">作品の統計</span>
            <Statics></Statics>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Statics from "./Statistics";
import { get } from "lodash";
// import clampy from "@clampy-js/vue-clampy";
export default {
  components: {
    Statics
  },
  directives: {
    // clampy: {
    //   truncationChar: "........"
    // }
  },
  props: {
    // book: Object
  },
  data() {
    return {
      text: "",
      read: true,
      limit: 250,
      length: get(this.book, "synopsis", "").length
    };
  },
  computed: {
    bookSynopsis() {
      return this.$store.state.book.bookSynopsis;
    },
    book() {
      return this.$store.state.book.book;
    }
  },
  methods: {},
  created() {
    this.text = this.bookmarkedText;
    if (this.$device.isMobile) {
      this.limit = 50;
    }
  },
  mounted() {},
  filters: {
    truncate: (string, number) => {
      if (!string) {
        return;
      }
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.hidden {
  display: none;
}
.book-author {
  // position: absolute;
  border-radius: 100px;
  width: 100px;
  box-shadow: 1px 1px 5px 0 rgb(177, 177, 177);
}
.book-content {
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  &__truncate-nav {
    display: flex;
    justify-content: flex-end;
    font-size: 1.6rem;
    color: $primary;
    margin-right: 10px;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  }
  &__read-more {
    font-size: inherit;
  }
  &__read-less {
    font-size: inherit;
  }
  &__buttons {
    // position: absolute;
    display: flex;
    // justify-content: ;
    align-items: center;
    justify-content: flex-end;
    &__item {
      width: 14rem;
      margin-left: 1rem;
      &__icon {
        margin-right: 0.5rem;
      }
    }
  }
  &__left {
    justify-content: space-between;
  }

  &--text {
    overflow: hidden;
    flex-grow: 1;
    line-height: 3rem;

    // text-overflow: ellipsis;
    // position: relative;
    /* line-clamp: 2; */
    // white-space: nowrap;
    &__summary {
      h4 {
        margin: 0;
        font-size: 2rem;
        font-weight: 400;
      }
      &--text {
        // display: none;
        font-size: 1.6rem;
        line-height: 30px;
        font-weight: 300;
        text-align: left;
      }
    }
    &__statistics {
      // display: none;
      // height: 250px;

      p {
        text-align: left !important;
        font-size: 1.6rem;
        line-height: 28px;
        font-weight: 300;
      }

      &--title {
        font-size: 2.2rem;
      }
    }
  }
}
</style>
