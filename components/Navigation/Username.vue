<template>
  <transition name="up-down">
    <div class="username-form dialog dialog__container" v-if="open || modal">
      <!-- <div class="username-form__close" v-if="$store.state.auth.strategy === 'local'"></div> -->
      <div class="username-form__container dialog__content">
        <div class="flex-divider flex-row flex--align flex--center" style="margin-bottom:1rem;">
          <no-ssr>
            <croppa
              :accept="'image/*'"
              :canvas-color="'default'"
              :placeholder="'ユーザーアバター'"
              v-model="avatar"
              :width="150"
              :height="150"
              @file-choose="fileChoose"
            ></croppa>
          </no-ssr>
        </div>
        <div>アバターは要否です</div>
        <div class="username-form__username">
          <v-text-field v-model="user.username" label="ユーザー名*"></v-text-field>
        </div>
        <div class="username-form__submit">
          <div class="username-form__button" v-ripple @click="setUsername">更新</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      modal: "auth/getUsernameModalState",
      loggedInUser: "auth/getUser",
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
    async setUsername() {
      try {
        if (this.newAvatar) {
          this.avatar.generateBlob(async blob => {
            const url = await this.$store.dispatch("upload/uploadAvatar", blob);
            this.user = {
              avatar: url.url,
              username: this.user.username
            };
            this.user["initial"] = true;
            await this.$store.dispatch("user/patchUser", { user: this.user });
          });
        } else {
          await this.$store.dispatch("user/patchUser", { user: this.user });
        }

        this.open = false;
      } catch (error) {
        console.log(error);
      }
    },
    fileChoose() {
      this.newAvatar = true;
    }
  },
  updated() {
    if (this.auth && !this.loggedInUser.username) {
      if (this.$store.state.auth.strategy === "local") {
        return;
      }
      this.open = true;
    }
  },
  async mounted() {
    if (this.auth && !this.loggedInUser.username) {
      if (this.$store.state.auth.strategy === "local") {
        return;
      }
      this.open = true;
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
