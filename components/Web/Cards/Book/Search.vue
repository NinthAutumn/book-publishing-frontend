<template>
  <div class="book-scard">
    <div tag="div" class="book-scard__container">
      <nuxt-link tag="div" class="book-scard__cover" :to="`/books/${book.id}`">
        <v-img
          class="book-scard__img"
          :src="book.cover + '/m'"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        ></v-img>
        <div
          v-if="!$device.isMobile"
          class="book-scard__status"
          :class="{'book-scard__status--completed':book.status === 'completed'}"
          v-text="status"
        ></div>
      </nuxt-link>
      <div class="book-scard__meta">
        <div class="book-scard__header flex-divider flex-row flex--align flex--between">
          <nuxt-link
            tag="a"
            :to="`/books/${book.id}`"
            class="book-scard__title"
            v-line-clamp="1"
            v-text="book.title"
          ></nuxt-link>
          <div class="book-scard__menu" @click.stop="toggleModal" v-if="!$device.isMobile">
            <fa icon="ellipsis-v"></fa>
            <select-modal top v-if="modal" @toggle="toggleModal" :bookId="book.id"></select-modal>
          </div>
        </div>

        <div class="flex-divider flex-row">
          <div class="book-scard__genre" v-text="`${book.pen_name}・${book.name}`"></div>
        </div>
        <v-rating color="#FF6452" readonly :size="20" half-increments :value="+book.rating"></v-rating>

        <div class="flex-divider flex-row book-scard__genre-wrapper">
          <div class="book-scard__genres" v-for="(genre,index) in book.genres" :key="genre">
            <div class="book-scard__genre-container" v-ripple v-if="index < 3">{{genre}}</div>
          </div>
        </div>
        <div class="book-scard__synopsis" v-line-clamp="4" v-text="book.synopsis"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "browse-bookcard",
  props: {
    book: {
      type: Object
    },
    index: Number
  },
  data() {
    return {
      lazyCover: require("~/assets/img/NobleCardLight.png?webp"),
      modal: false,
      status_types: {
        completed: "完結",
        ongoing: "連載中",
        hiatus: "休憩中"
      }
    };
  },
  computed: {
    status() {
      return this.status_types[this.book.status];
    }
  },
  components: {
    SelectModal: () => import("@/components/Web/Modals/Book/Select")
  },
  methods: {
    toggleModal() {
      // alert("in here");
      this.modal = !this.modal;
    }
  }
};
</script>

<style lang="scss">
.book-scard {
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  $self: &;
  &__container {
    #{$self}__status {
      font-size: 1.2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 0.5rem;
      padding: 0.3rem 1.5rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      color: white;
      font-weight: bold;
      background-color: #2a2f45;
      &--completed {
        background-color: white;
        // text-shadow: 1px 1px 5px #2a2f4527;
        color: #2a2f45;
      }
    }
    &:hover {
      #{$self}__menu {
        visibility: visible !important;
      }
    }
    .v-icon {
      padding: 0 !important;
    }
    display: flex;
    // min-width: 50rem;
    transform: scale(1);
    transition: 200ms;
    border-radius: 0.5rem;
    padding: 1rem;
    user-select: none;
    // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
    //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
    &:hover {
      // transform: scale(1.05);
      transition: 200ms;
      // box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      //   0 3px 6px 0 rgba(0, 0, 0, 0.07);
      cursor: pointer;
    }
    &:active,
    &:focus {
      // transform: scale(0.98);
    }
    #{$self}__cover {
      min-width: 13rem;
      margin-right: 1rem;
      position: relative;
      // overflow: hidden;
      #{$self}__img {
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        border-radius: 0.5rem;
      }
    }
    #{$self}__meta {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      #{$self}__menu {
        position: relative;
        font-size: 1.8rem;
        visibility: hidden;
        color: rgb(182, 182, 182);
        &:hover {
          color: grey;
        }
      }
      #{$self}__title {
        font-size: 1.8rem;
      }
      #{$self}__genre-wrapper {
        display: flex;
        flex-wrap: wrap;
      }
      #{$self}__genres {
        #{$self}__genre-container {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          padding: 0.1rem 2rem;
          border: 1px solid $primary;
          border-radius: 50rem;
          background-color: white;
          color: $primary;
          margin-right: 1rem;
          transform: scale(1);
          transition: transform 200ms;
          &:active,
          &:focus {
            transform: scale(0.95);
            transition: transform 200ms;
          }
        }
      }
      #{$self}__genre {
        font-size: 1.4rem;
        padding: 0.3rem 1rem;

        background-color: #556cd6;
        color: white;
        border-radius: 50rem;
      }
      #{$self}__synopsis {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
