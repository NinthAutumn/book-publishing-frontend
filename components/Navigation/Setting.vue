<template>
  <v-dialog class="setting-form" v-model="dialog" max-width="500px" persistent>
    <div class="setting-form__container">
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
          initial-image
        ></croppa>
      </div>

      <v-text-field v-model="user.username" label="ユーザー名" required></v-text-field>
      <v-radio-group v-model="user.gender" row>
        <v-radio v-for="n in genders" :key="n" :label="`${n}`" :value="n" color="#566CD6"></v-radio>
      </v-radio-group>
      <v-textarea label="自己紹介" v-model="user.bio" hint="好きな食べ物など"></v-textarea>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatar: {},
        username: "",
        gender: "",
        bio: ""
      },
      genders: ["男性", "女性", "非公開"]
    };
  },
  computed: {
    dialog() {
      return this.$store.getters["getSettingModal"];
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("TOGGLE_SETTING_MODAL");
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
  textarea {
    font-size: 1.6rem;
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
