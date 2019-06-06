<template>
  <div class="username-form dialog dialog__container" v-if="open">
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
          ></croppa>
        </no-ssr>
      </div>
      <div class="div" v-if="$store.state.auth.strategy === 'local'"></div>
      <div class="username-form__username" v-else>
        <v-text-field v-model="user.username" label="ユーザー名*"></v-text-field>
      </div>
      <div class="username-form__submit">
        <div class="username-form__button" v-ripple @click="setUsername">更新</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      blob: "",
      avatar: {},
      user: {
        avatar: {},
        username: this.$store.getters["user/loggedInUser"],
        avatar_path: ""
      }
    };
  },
  methods: {
    async setUsername() {
      try {
        this.avatar.generateBlob(async blob => {
          const url = await this.$store.dispatch("upload/image", blob);
          this.user["avatar"] = url.url;
          this.user["avatar_path"] = url.path;
          if (this$store.state.auth.strategy !== "local") {
            await this.$store.dispatch("user/patchUser", { user: this.user });
          } else {
          }
        });

        // await this.$auth.fetchUser();
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    if (
      this.$store.getters["auth/isAuthenticated"] &&
      !this.$store.getters["user/loggedInUser"].username
    ) {
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
