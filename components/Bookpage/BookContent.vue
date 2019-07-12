<template>
  <div class="book-content" :class="{'book-content--mobile':$device.isMobile}">
    <div class="book-content__container">
      <div class="book-content__title">あらすじ</div>
      <div class="book-content__summary">
        <v-clamp autoresize :max-lines="5" :expanded="opened">
          {{book.synopsis}}
          <template v-slot:before="clamped">{{setClamp(clamped.clamped)}}</template>
        </v-clamp>
        <div class="book-content__nav">
          <div class="book-content__toggle" v-if="!opened&&clamp" @click="opened = !opened">
            <fa icon="angle-down" style="margin-right:1rem;"></fa>
            <div>詳細</div>
          </div>
          <div class="book-content__toggle" v-if="opened" @click="opened = !opened">
            <fa icon="angle-up" style="margin-right:1rem;"></fa>
            <div>一部を表示</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="book-content__left flex flex-column divider">
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
    </div>-->
  </div>
</template>

<script>
import { get } from "lodash";
import { mapGetters } from "vuex";
// import clampy from "@clampy-js/vue-clampy";
export default {
  components: {
    VClamp: () => import("vue-clamp")
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
      opened: false,
      limit: 250,
      clamp: false,
      length: 0
    };
  },

  computed: {
    bookSynopsis() {
      return this.$store.state.book.bookSynopsis;
    },
    ...mapGetters({
      book: "book/getBook"
    })
  },
  methods: {
    setClamp(clamped) {
      this.clamp = clamped;
    }
  },
  created() {
    this.text = this.bookmarkedText;
    if (this.$device.isMobile) {
      this.limit = 100;
    }
  },
  mounted() {
    this.length = this.book.synopsis.length;
  },
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
  padding-bottom: 2rem;
  $self: &;
  &--mobile {
  }
  &__container {
    #{$self}__title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    span {
      font-size: 1.6rem;
    }
    #{$self}__nav {
      //  background:bl;
      right: 0;
      bottom: 0;
      display: flex;
      position: absolute;
      justify-content: flex-end;
    }
    #{$self}__toggle {
      text-align: right;
      font-size: 1.4rem;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
      div {
        font-size: inherit;
      }
    }
  }
}
</style>
