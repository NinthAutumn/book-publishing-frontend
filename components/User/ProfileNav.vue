<template>
  <nav class="profile-nav">
    <div class="profile-nav__container">
      <div class="profile-nav__avatar">
        <v-avatar :size="180" class="profile-nav__avatar-img">
          <!-- <img
            :src="`https://storage.googleapis.com/theta-images/${user.avatar}`"
            alt="user profile picture"
          >-->
          <img :src="user.avatar" alt>
        </v-avatar>
      </div>
      <div class="profile-nav__grid"></div>
      <div class="profile-nav__content">
        <ul class="profile-nav__stats-list">
          <li v-for="(stat,index) in stats" :key="index" class="profile-nav__stats-item">
            <div class="profile-nav__stats-item__title" v-text="stat.name"></div>
            <div class="profile-nav__stats-item__stats" v-text="stat.value"></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: Object,
    owner: Boolean
  },
  data() {
    return {
      stats: [
        { name: "作品", value: "123432" },
        { name: "レビュー", value: "143" },
        { name: "良いね", value: "143" },
        { name: "コメント", value: "433" }
      ]
    };
  }
};
</script>

<style lang="scss">
.profile-nav {
  $self: &;
  &__container {
    height: 6rem;
    display: flex;
    position: sticky;
    box-shadow: 1px 1px 5px rgb(240, 240, 240);
    margin-top: 10rem;
  }
  &__avatar {
    position: absolute;
    left: 5rem;
    bottom: -50px;
    border: 10px solid white;
    border-radius: 50%;
    box-shadow: 1px 1px 5px rgb(240, 240, 240);
    &-img {
    }
  }
  &__grid {
    width: 35rem;
  }
  &__content {
    #{$self}__stats-list {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 1rem;
      #{$self}__stats-item {
        display: flex;
        flex-direction: column;

        align-items: center;
        margin-right: 5rem;

        &__title {
          font-size: 1.4rem;
        }
        &__stats {
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>
