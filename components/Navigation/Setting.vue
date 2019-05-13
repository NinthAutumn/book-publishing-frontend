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

      <label for="username">ユーザー名</label>
      <input type="text" name="username" v-model="user.username">
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
        avatar: "",
        username: "",
        gender: "",
        bio: ""
      },
      genders: ["男性", "女性", "内緒"]
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
