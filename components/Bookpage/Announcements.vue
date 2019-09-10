<template>
  <div class="book-announcement">
    <v-dialog
      v-model="open"
      :width="500"
      :height="500"
      hide-overlay
      class="book-announcement__modal elevation-1"
    >
      <div class="book-announcement__modal__container">
        <div class="book-announcement__modal__header flex-row flex--between flex--align">
          <div class="book-announcement__modal__title">
            <fa style="margin-right:0.5rem;" icon="envelope-open-text"></fa>報告
          </div>
          <fa class="book-announcement__modal__close" icon="times" @click="open = !open"></fa>
        </div>

        <div class="book-announcement__modal__title">{{selected.title}}</div>
        <div class="book-announcement__modal__content">{{selected.content}}</div>
        <div class="book-announcement__modal__date">{{selected.date}}</div>
      </div>
    </v-dialog>
    <p class="book-announcement__header">作者からの報告</p>
    <ul class="book-announcement__list">
      <li
        class="book-announcement__item"
        v-for="(announcement,index) in announcements"
        :key="index"
        @click="selectAnnouncement(announcement.title,announcement.content,$moment(announcement.created_at).startOf('seconds').fromNow())"
      >
        <div class="book-announcement__title">{{announcement.title}}</div>
        <div
          class="book-announcement__created"
        >{{$moment(announcement.created_at).startOf('seconds').fromNow()}}</div>
      </li>
      <client-only>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    announcements() {
      return this.$store.getters["book/getAnnouncements"];
    }
  },
  data() {
    return {
      page: 2,
      open: false,
      selected: {
        title: "",
        content: "",
        date: ""
      }
    };
  },
  methods: {
    infiniteHandler: async function($state) {
      let { announcement } = await this.$store.dispatch(
        "book/fetchAnnouncements",
        {
          bookId: this.$route.params.id,
          page: this.page++,
          infinite: true
        }
      );
      if (announcement.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    selectAnnouncement: function(title, content, date) {
      this.open = true;
      this.selected = {
        title,
        content,
        date
      };
    }
  },
  async mounted() {
    this.$store.dispatch("book/fetchAnnouncements", {
      bookId: this.$route.params.id,
      page: 1
    });
  }
};
</script>

<style lang="scss">
.book-announcement {
  $self: &;
  // max-width: 0rem;
  padding: 1rem;
  max-width: 100%;
  #{$self}__header {
    font-size: 1.7rem;
    padding: 1rem;
  }
  &__list {
    max-height: 15rem;
    overflow: auto;
    #{$self}__item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid rgb(226, 226, 226);
      box-shadow: 0;
      transition: 300ms ease;
      &:hover {
        cursor: pointer;
        background-color: rgb(245, 245, 245);
        box-shadow: 1px 1px 5px rgb(226, 226, 226);
        transition: 300ms ease;
      }
      #{$self}__title {
        font-size: 1.6rem;
        max-width: 82%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #{$self}__created {
        font-size: 1.6rem;
        color: grey;
      }
    }
  }
  &__modal {
    $self: &;
    &__container {
      background-color: white;
      height: 100%;
      width: 100%;
      #{$self}__header {
        border-bottom: 1px solid rgb(236, 236, 236);
        padding: 1rem 2rem;
        font-size: 2rem;
        color: #32325d;
        // padding-top: 2rem;
      }
      #{$self}__close {
        &:hover {
          cursor: pointer;
        }
      }
      #{$self}__title {
        font-size: 1.8rem;
        // padding: 1rem;

        text-align: center;
      }
      #{$self}__content {
        font-size: 1.6rem;
        padding: 1rem 2rem;
        border-bottom: 1px solid rgb(236, 236, 236);
      }
      #{$self}__date {
        padding: 1rem 2rem;
        text-align: right;
        font-size: 1.4rem;
        color: grey;
      }
    }
  }
}
</style>
