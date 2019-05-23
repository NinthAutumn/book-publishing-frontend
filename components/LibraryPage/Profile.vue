<template>
  <div class="library-up">
    <div class="library-up__container">
      <div class="library-up__avatar flex flex--align flex-column flex--center">
        <div class="library-up__avatar__img">
          <v-avatar :size="80" class="profile-nav__avatar-img">
            <!-- <img
            :src="`https://storage.googleapis.com/theta-images/${user.avatar}`"
            alt="user profile picture"
            >-->
            <img :src="user.avatar" alt>
          </v-avatar>
        </div>
        <div class="library-up__avatar__username" v-text="user.username"></div>
        <div class="library-up__avatar__founding-date">{{$moment(user.createdAt).year()}} 年から</div>
      </div>
      <ul class="library-up__data__list">
        <li class="library-up__data__item flex flex--align flex--between">
          <label class="library-up__data__header">ブックマーク数</label>
          <label
            class="library-up__data__stats"
            v-if="this.$store.state.library.bookmarks"
            v-text="this.$store.state.library.bookmarks.length + '個'"
          ></label>
          <label class="library-up__data__stats" v-else v-text="0+ '個'"></label>
        </li>
        <li class="library-up__data__item flex flex--between flex--align">
          <label class="library-up__data__header">レビュー数</label>
          <label
            class="library-up__data__stats"
            v-if="this.$store.state.review.myReviews"
            v-text="this.$store.state.review.myReviews.length + '個'"
          ></label>
          <label class="library-up__data__stats" v-else v-text="0 + '個'"></label>
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "user/loggedInUser"
    })
  }
};
</script>

<style lang="scss">
.library-up {
  width: 100%;
  $self: &;
  .profile-img {
    border-radius: 100px;
    box-shadow: 1px 1px 5px 0px rgb(231, 231, 231);
  }
  &__container {
    padding: 10px;
  }
  &__avatar {
    &__img {
      box-shadow: 1px 1px 5px 0px rgb(231, 231, 231);
      border-radius: 50%;
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
    &__stats {
      font-size: 12px;
      margin-right: 5px;
    }
  }
}
</style>
