<template>
  <div class="setting-form dialog dialog__container" max-width="500px" persistent>
    <div class="setting-form__container dialog__content">
      <div class="setting-form__header flex-row flex--between flex--align">
        <div class="setting-form__title">設定</div>
        <fa @click="closeModal" icon="times"></fa>
      </div>
      <div class="setting-form__avatar flex-row flex--align flex--center">
        <croppa
          :accept="'image/*'"
          :canvas-color="'default'"
          :placeholder="'アバター'"
          v-model="user.avatar"
          :initial-image="current.avatar.img"
        ></croppa>
      </div>
      <label for="username">ユーザー名</label>
      <input v-model="user.username" placeholder="ユーザー名" required>
      <v-radio-group v-model="user.gender" row>
        <v-radio
          v-for="n in genders"
          :key="n.key"
          :label="`${n.key}`"
          :value="n.value"
          color="#566CD6"
        ></v-radio>
      </v-radio-group>
      <label for="自己紹介">自己紹介</label>
      <textarea v-model="user.bio" placeholder="好きな食べ物など"></textarea>
      <div class="setting-form__submit">
        <div class="setting-form__button" @click="updateHandler">更新</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        avatar: {},
        username: "",
        gender: "",
        bio: ""
      },
      genders: [
        { key: "男性", value: "male" },
        { key: "女性", value: "female" },
        { key: "非公開", value: "other" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      current: "user/loggedInUser",
      profile: "user/getProfile"
    })
  },
  async mounted() {
    await this.$store.dispatch("user/fetchProfile", {
      userId: this.current.id
    });
    this.user.username = this.current.username;
    this.user.gender = this.current.gender;
    this.user.bio = this.profile.bio;
  },
  methods: {
    closeModal() {
      this.$store.commit("TOGGLE_SETTING_MODAL");
    },
    async updateHandler() {
      try {
        this.user.avatar.generateBlob(async blob => {
          const url = await this.$store.dispatch("upload/image", blob);
          this.user.avatar = {
            img: url.url,
            path: url.path
          };
          // this.user.avatar.img
          await this.$store.dispatch("user/patchUser", { user: this.user });
          await this.$store.dispatch("user/fetchUser");
        });
      } catch (error) {
        console.log(error);
        return this.$toast.show("更新に失敗しました", { duration: 2000 });
      }
    }
  }
};
</script>

<style lang="scss">
.setting-form {
  $self: &;

  &__container {
    padding: 2rem;
    display: flex;
    min-width: 50rem;
    // align-items: center;
    // justify-content: center;
    flex-direction: column;
    #{$self}__avatar {
      width: 100%;
    }
    #{$self}__header {
      font-size: 2rem;

      #{$self}__title {
        font-size: inherit;
      }
    }
  }
  &__submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    #{$self}__button {
      font-size: 1.4rem;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      color: #fff;
      background: #3ecf8e;
      text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
      font-weight: bold;
      -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      transform: translateX(0px);
      transition: transform 200ms ease;
      &:hover {
        cursor: pointer;
        transform: translateX(1px);
        transition: transform 200ms ease;
      }
    }
  }
  label {
    font-size: 1.4rem;
    color: rgb(122, 122, 122);
  }
  input {
    font-size: 1.5rem;
    padding: 1rem 1.2rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(228, 228, 228);
    margin: 1rem 0;
  }
  textarea {
    font-size: 1.6rem;
    margin: 1rem 0;
    padding: 1rem 1.2rem;
    height: 10rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(228, 228, 228);
  }
  input {
    font-size: 1.6rem;
  }
  .v-dialog {
    background-color: #fff;
  }
  .croppa-container {
    // border-radius: 100px;
    // overflow: hidden;
  }
}
</style>
