<template>
  <transition name="up-down">
    <div class="username-form dialog dialog__container" v-if=" modal">
      <!-- <div class="username-form__close" v-if="$store.state.auth.strategy === 'local'"></div> -->
      <div class="username-form__container dialog__content">
        <div class="flex-divider flex-row flex--align flex--center" style="margin-bottom:1rem;">
          <client-only>
            <croppa
              :accept="'image/*'"
              :canvas-color="'default'"
              :placeholder="'ユーザーアバター'"
              v-model="avatar"
              :width="150"
              :height="150"
              @file-choose="fileChoose"
              :initial-image="loggedInUser.avatar"
            ></croppa>
          </client-only>
        </div>
        <div>アバターは要否です</div>
        <div class="username-form__username">
          <v-text-field
            v-validate="'required|min:3|alpha_dash'"
            placeholder="ユーザー名"
            data-vv-as="ユーザー名"
            v-model="user.username"
            label="ユーザー名*"
          ></v-text-field>
          <div
            class="username-form__error"
            v-if="errors.first('username')"
          >>{{ errors.first('username') }}</div>
          <div class="username-form__error" v-else-if="usernameAvailable">ユーザー名はもう使われています</div>
        </div>
        <div class="username-form__submit">
          <div class="username-form__button" v-ripple @click="setUsername">更新</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      open: false,
      blob: "",
      avatar: {},
      newAvatar: false,
      user: {
        username: "",
        avatar_path: ""
      }
    };
  },
  watch: {
    "user.username": async function(username) {
      if (username.length > 2) {
        await this.$store.dispatch("user/checkUsername", { username });
      }
    }
  },
  computed: {
    ...mapGetters({
      modal: "auth/getUsernameModalState",
      loggedInUser: "auth/getUser",
      auth: "auth/isAuthenticated",
      usernameAvailable: "user/userNameExists"
    })
  },
  methods: {
    ...mapActions({
      uploadAvatar: "upload/uploadAvatar",
      patchUser: "user/patchUser",
      fetchUser: "auth/fetchUser"
    }),
    async generateBlobHandler(blob) {
      const url = await this.uploadAvatar(blob);
      this.user = {
        avatar: url.url,
        username: this.user.username
      };
      this.user["initial"] = true;
      await this.patchUser({ user: this.user });
    },
    async setUsername() {
      try {
        if (this.usernameAvailable) return;
        if (this.newAvatar) {
          this.avatar.generateBlob(this.generateBlobHandler);
        } else {
          await this.patchUser({ user: this.user });
        }
        this.$store.commit("auth/TOGGLE_USERNAME_MODAL");
        await this.fetchUser();
        this.open = false;
      } catch (error) {
        this.$store.commit("auth/TOGGLE_USERNAME_MODAL");
        await this.fetchUser();
      }
    },
    fileChoose() {
      this.newAvatar = true;
    }
  }
};
</script>

<style lang="scss">
.username-form {
  &__container {
    min-width: 30rem;
  }
  $self: &;
  input {
    font-size: 1.4rem;
  }
  .croppa-container {
    //  background-color: lightblue;
    //  border: 2px solid grey;
    border-radius: 1rem;
  }
  &__error {
    font-size: 1.4rem;
  }
  &__submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    #{$self}__button {
      font-size: 1.4rem;
      padding: 0.5rem 1rem;
      box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
        rgba(42, 47, 69, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
      border-radius: 0.4rem;
      &:hover {
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
