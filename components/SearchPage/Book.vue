<template>
  <div class="search-book">
    <div class="search-book__cover">
      <v-img
        class="search-book__image"
        :src="book.cover"
        :aspect-ratio="1/1.5"
        max-width="14rem"
        min-width="12rem"
        alt="Book cover"
      ></v-img>
    </div>
    <div class="search-book__meta">
      <div class="search-book__title">{{book.title}}</div>
      <div class="search-book__rating">
        <v-rating color="#FF8D29" readonly size="20" half-increments :value="+book.rating"></v-rating>
      </div>
      <div class="search-book__category search-book__category--genre">
        <div class="search-book__category-list">
          <div
            class="search-book__category-item"
            v-for="genre in book.genres"
            :key="genre"
          >{{genre}}</div>
        </div>
      </div>
      <div class="search-book__category search-book__category--tag">
        <div class="search-book__category-list">
          <div class="search-book__category-item" v-for="tag in book.tags" :key="tag">{{tag}}</div>
        </div>
      </div>
      <div class="search-book__synopsis">
        <v-clamp autoresize :max-lines="2" :expanded="opened">
          {{book.synopsis}}
          <template v-slot:before="clamped">{{setClamp(clamped.clamped)}}</template>
        </v-clamp>
        <div class="search-book__nav">
          <div class="search-book__toggle" v-if="!opened&&clamp" @click="opened = !opened">
            <fa icon="angle-down" style="margin-right:1rem;"></fa>
            <div>詳細</div>
          </div>
          <div class="search-book__toggle" v-if="opened" @click="opened = !opened">
            <fa icon="angle-up" style="margin-right:1rem;"></fa>
            <div>一部を表示</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  components: {
    VClamp: () => import("vue-clamp")
  },
  data() {
    return {
      opened: false,
      clamp: false
    };
  },
  methods: {
    setClamp(clamped) {
      this.clamp = clamped;
    }
  }
};
</script>

<style lang="scss">
.search-book {
  $self: &;
  display: flex;

  border-bottom: 1px solid grey;
  padding: 1rem;
  position: relative;
  &__cover {
    margin-right: 2rem;
    #{$self}__image {
      border-radius: 0.4rem;
    }
  }
  &__meta {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;

    .v-icon {
      padding: 0;
    }
    #{$self}__rating {
      margin-bottom: 1rem;
    }
    #{$self}__title {
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }
    #{$self}__synopsis {
      padding-bottom: 2rem;

      span {
        font-size: 1.4rem;
      }
    }
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
  &__category {
    margin-bottom: 0.5rem;
    &--genre {
      #{$self}__category-item {
        border: 1px solid $primary;
        color: $primary;
        &:hover {
          background-color: $primary;
          color: white;
        }
      }
    }
    &--tag {
      #{$self}__category-item {
        border: 1px solid $secondary;
        color: $secondary;
        &:hover {
          background-color: $secondary;
          color: white;
        }
      }
    }
    #{$self}__category-list {
      display: flex;
      flex-wrap: nowrap;
      // margin-bottom:1rem;
    }
    #{$self}__category-item {
      border-radius: 0.5rem;
      padding: 0.1rem 1.5rem;
      font-size: 1.4rem;
      margin-right: 1rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
