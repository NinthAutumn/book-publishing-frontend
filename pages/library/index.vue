<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="flex-divider flex flex-row flex--between">
      <div class="library-bookmark">
        <div class="library-bookmark__header">ブックマーク</div>
        <div class="divider flex flex--right flex--align">
          <div class="library-bookmark__sort-button flex flex--center flex--align">
            <div class="library-bookmark__sort-button__icon">
              <fa icon="sort"></fa>
            </div>
            <div class="library-bookmark__sort-button__text">並び替え</div>
          </div>
        </div>
        <BookList :trendings="true" :books="$store.state.ranking.ratings.total"></BookList>
      </div>
      <div class="library-profile">
        <Profile></Profile>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/LibraryPage/BookList";
import Profile from "@/components/LibraryPage/Profile";
export default {
  components: {
    BookList,
    Profile
  },
  async fetch({ store }) {
    // await store.dispatch("book/getBook", params.id);
  }
};
</script>

<style lang="scss">
.library {
  &-profile {
    width: 180px;
  }
  $self: &;
  &-bookmark {
    // width: 50%;
    margin-right: 10px;

    &__sort-button {
      // background-color:;
      box-shadow: 1px 1px 5px 0px rgb(233, 233, 233);
      // border-radius: 5px;
      width: 100px;
      height: 30px;

      &:hover {
        cursor: pointer;
        background-color: rgb(245, 245, 245);
        transition: 200ms;
      }
      &__icon {
        font-size: 14px;
      }
      &__text {
        font-size: 14px;
      }
    }
    &__header {
      font-size: 16px !important;
    }
  }
  &__header-wrapper {
    height: 60px;
    width: 100%;
  }
  &__header {
    font-size: 20px;
  }
}
</style>
