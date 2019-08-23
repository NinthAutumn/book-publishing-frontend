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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
