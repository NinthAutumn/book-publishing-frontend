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
          :initial-image="current.avatar? current.avatar : avatar"
          @file-choose="handleCroppaFileChoose"
        ></croppa>
      </div>
      <label for="username">ユーザー名</label>
      <input
        :class="{'setting-form__input--error': errors.has('username')||usernameAvailable}"
        v-model="user.username"
        v-validate="'required|min:3|alpha_dash'"
        placeholder="ユーザー名"
        class="setting-form__input"
        name="username"
        data-vv-as="ユーザー名"
        required
      />
      <span
        v-if="errors.first('username')"
        class="setting-form__error is-danger"
      >{{ errors.first('username') }}</span>
      <span
        v-else-if="usernameAvailable&&user.username !== current.username"
        class="setting-form__error help is-danger"
      >このユーザー名はもう使われています</span>
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
        bio: "",
        newAvatar: false
      },
      avatar: require("~/assets/img/profile.png"),
      genders: [
        { key: "男性", value: "male" },
        { key: "女性", value: "female" },
        { key: "非公開", value: "other" }
      ]
    };
  },
  watch: {
    "user.username": async function(username) {
      if (username === this.current.username) {
        return;
      }
      if (username.length > 2) {
        await this.$store.dispatch("user/checkUsername", { username });
      }
    }
  },
  computed: {
    ...mapGetters({
      current: "auth/getUser",
      profile: "user/getProfile",
      usernameAvailable: "user/userNameExists"
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
        await this.$validator.validateAll();
        if (this.errors.any()) {
          return this.$toast.error("");
        }
        if (this.user.newAvatar) {
          // alert(this.user.avatar.generateDataUrl());

          this.user.avatar.generateBlob(async blob => {
            const { url, path } = await this.$store.dispatch(
              "upload/uploadAvatar",
              blob
            );
            this.user.avatar = url;
            await this.$store.dispatch("user/patchUser", { user: this.user });
            await this.$store.dispatch("auth/fetchUser");
          });

          // this.user.avatar
        } else {
          this.user.avatar = this.current.avatar;
          // this.user.avatar
          await this.$store.dispatch("user/patchUser", { user: this.user });
          await this.$store.dispatch("auth/fetchUser");
        }
        this.$store.commit("TOGGLE_SETTING_MODAL");
      } catch (error) {
        console.log(error);
        return this.$toast.show("更新に失敗しました", { duration: 2000 });
      }
    },
    handleCroppaFileChoose() {
      this.user.newAvatar = true;
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
  &__error {
    font-size: 1.4rem;
    color: orangered;
  }
  &__input {
    font-size: 1.5rem;
    &:focus,
    &:active {
      outline: none;
    }
    padding: 1rem 1.2rem;
    &--error {
      border-left: 2px solid orangered;
    }
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
