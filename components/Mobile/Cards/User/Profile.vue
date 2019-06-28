<template>
  <div class="mobile-profile">
    <div tag="div" class="mobile-profile__avatar">
      <v-avatar size="100" v-if="profile.avatar">
        <v-img :src="author&&profile.author_avatar? profile.author_avatar:profile.avatar.img"></v-img>
      </v-avatar>
      <div class="mobile-profile__name" v-text="author? profile.pen_name : profile.username"></div>
    </div>
    <div class="mobile-profile__stats">
      <div class="mobile-profile__stat-container">
        <div class="mobile-profile__profile" v-for="(value, key) in stats" :key="key">
          <div class="mobile-profile__stat">
            <!-- <fa :icon="value.icon"></fa> -->
            {{value.value}}
          </div>
          <div class="mobile-profile__title">{{key}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    author: [String, Boolean]
  },
  data() {
    return {
      stats: {
        いいね: { value: "", icon: "heart" },
        コメント: { value: "", icon: "comment" },
        レビュー: { value: "", icon: "comment-alt" }
      }
    };
  },
  computed: {
    ...mapGetters({
      profile: "user/getProfile",
      user: "user/loggedInUser",
      stat: "user/getProfileStats"
    })
  },
  mounted() {
    this.stats["いいね"]["value"] = this.stat.likes;
    this.stats["コメント"]["value"] = this.stat.comment_count;
    this.stats["レビュー"]["value"] = this.stat.review_count;
  }
};
</script>

<style lang="scss">
.mobile-profile {
  $self: &;
  @keyframes grow {
    0% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }

  &__avatar {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    animation: grow 200ms ease;
  }
  &__name {
    font-size: 1.8rem;
  }
  &__stats {
    margin-top: 1rem;

    // width: 90vw;
    // background-color: rgb(199, 199, 199);
    display: flex;
    justify-content: center;
    #{$self}__stat-container {
      width: 90%;
      // border-radius: 0.5rem;
      // background-color: #e3e8ee;
      // padding: 0.5rem;
      display: flex;
      justify-content: center;
    }
    #{$self}__profile {
      width: 10rem;
      text-align: center;
    }
    #{$self}__title {
      font-size: 1.2rem;
      color: #aab7c4;
    }
    #{$self}__stat {
      font-size: 2rem;
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
  }
}
</style>
