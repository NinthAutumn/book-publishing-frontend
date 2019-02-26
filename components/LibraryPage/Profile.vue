<template>
  <div class="library-up">
    <div class="library-up__container">
      <div class="library-up__avatar flex flex--align flex-column flex--center">
        <div class="library-up__avatar__img">
          <img class="profile-img" src="@/assets/profile.png" alt>
        </div>
        <div class="library-up__avatar__username" v-text="$store.state.auth.user.username"></div>
        <div
          class="library-up__avatar__founding-date"
        >{{$moment($store.state.auth.user.createdAt).year()}} 年から</div>
      </div>
      <ul class="library-up__data__list">
        <li class="library-up__data__item flex flex--align">
          <label class="library-up__data__header">ブックマーク数</label>
          <label class="library-up__data__stats"></label>
        </li>
        <li class="library-up__data__item flex flex--align">
          <label class="library-up__data__header">レビュー数</label>
          <label class="library-up__data__stats"></label>
        </li>
        <li class="library-up__data__item flex flex--align">
          <label class="library-up__data__header">リスト数</label>
          <label class="library-up__data__stats"></label>
        </li>
        <li class="library-up__data__item flex flex--align">
          <label class="library-up__data__header">購入本数</label>
          <label class="library-up__data__stats"></label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.library-up {
  width: 100%;
  $self: &;

  .profile-img {
    width: 80px;
    height: 80px;
    border-radius: 100px;
    box-shadow: 1px 1px 5px 0px rgb(231, 231, 231);
  }
  &__container {
    padding: 10px;
    box-shadow: 1px 1px 5px 0px rgb(231, 231, 231);
  }
  &__avatar {
    &__img {
    }
    &__username {
      margin-top: 5px;
      font-size: 16px;
      font-weight: bold;
    }
    &__founding-date {
      font-size: 11px;
      color: grey;
    }
  }
  &__data {
    &__header {
      font-size: 12px;
    }
    &__item {
      height: 40px;
      border-top: 1px solid rgb(228, 228, 228);
    }
    &__list {
    }
  }
}
</style>
