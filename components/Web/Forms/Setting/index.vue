<template>
  <div class="setting-form">
    <div class="setting-form__container">
      <div class="setting-form__main">
        <div class="setting-form__avatar flex-column flex--align">
          <v-avatar size="150" @click.stop="picture =!picture">
            <v-img :src="user.avatar?user.avatar:avatar"></v-img>
          </v-avatar>
          <button @click.stop="picture =!picture" class="setting-form__upload">アバターを投稿</button>
          <drawing-modal
            :current="user.avatar?user.avatar:avatar"
            :multiple="false"
            @close="picture = !picture"
            v-model="user.avatar"
            editor
            cover
            v-if="picture"
          ></drawing-modal>
        </div>

        <label for="username">ユーザー名</label>
        <input
          :class="{'setting-form__input--error': errors.has('username')||usernameAvailable}"
          v-model="user.username"
          v-validate="'required|min:3'"
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
        <textarea v-model="profile.bio" placeholder="好きな食べ物など"></textarea>
      </div>
      <div class="setting-form__sub">
        <div class="flex-divider flex-row flex--between">
          <div class="flex-divider flex-column">
            <label for="fullname">姓*</label>
            <input
              v-model="profile.last_name"
              placeholder="姓"
              class="setting-form__input setting-form__input--small"
              name="last_name"
              data-vv-as="姓"
              required
            />
          </div>

          <div class="flex-divider flex-column">
            <label for="fullname">名*</label>
            <input
              v-model="profile.first_name"
              placeholder="名"
              class="setting-form__input setting-form__input--small"
              name="first_name"
              data-vv-as="名"
              required
            />
          </div>
        </div>
        <label for="birthday">生年月日*</label>
        <date-picker type="date" format="YYYY/MM/DD" :lang="lang" v-model="profile.birthday"></date-picker>
        <!-- <label for="username">新パスワード</label>
        <input
          :class="{'setting-form__input--error': errors.has('password')}"
          v-model="password"
          v-validate="'min:6'"
          placeholder="新パスワード"
          class="setting-form__input"
          name="password"
          data-vv-as="新パスワード"
          required
        />
        <input
          :class="{'setting-form__input--error': errors.has('password')}"
          v-model="cpassword"
          v-validate="'confirmed:password'"
          placeholder="パスワード確認"
          class="setting-form__input"
          name="password"
          data-vv-as="パスワード確認"
          required
        />-->
      </div>
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
        avatar: "",
        username: "",
        gender: "",
        newAvatar: false
      },
      password: "",
      avatar_url: "",
      profile: {
        bio: "",
        birthday: "",
        last_name: "",
        first_name: ""
      },
      picture: false,
      cpassword: "",
      avatar: require("~/assets/img/profile.png"),
      genders: [
        { key: "男性", value: "male" },
        { key: "女性", value: "female" },
        { key: "非公開", value: "other" }
      ],
      lang: {
        days: ["日", "月", "火", "水", "木", "金", "土"],
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "誕生日"
        }
      }
    };
  },
  components: {
    DrawingModal: () => import("@/components/Web/Modals/Image/ImageList")
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
      current_profile: "user/getProfile",
      usernameAvailable: "user/userNameExists"
    })
  },

  async mounted() {
    this.user.username = this.current.username;
    this.user.gender = this.current.gender;
    this.user.avatar = this.current.avatar;
    this.profile.bio = this.current_profile.bio;
    this.profile.last_name = this.current_profile.last_name;
    this.profile.first_name = this.current_profile.first_name;
    this.profile.birthday = this.current_profile.birthday;
  },
  methods: {
    onChange({ coordinates, canvas }) {
      this.user.avatar = canvas.toDataURL();
    },
    async updateHandler() {
      try {
        await this.$validator.validateAll();
        // alert(this.errors.any());
        if (this.errors.any()) {
          return this.$toast.error("");
        }

        await this.$store.dispatch("user/patchUser", { user: this.user });

        if (this.password) {
        }

        await this.$store.dispatch("user/patchProfile", {
          profile: this.profile
        });
        await this.$store.dispatch("auth/fetchUser");
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
  @media screen and (max-width: 1020px) {
    &__container {
      grid-template-areas: "main " "sub" "submit" !important;
    }
    &__submit {
      max-width: 50rem !important;
    }
  }
  &__container {
    display: grid;
    grid-template-areas: "main sub ." "main sub  ." "submit submit .";
    .mx-datepicker {
      margin: 1rem 0;
    }
    #{$self}__upload {
      margin-top: 1rem;
      font-size: 1.4rem;
      padding: 0.75rem 2rem;
      background-color: $secondary;
      color: white;
      border-radius: 0.5rem;
    }
    #{$self}__main {
      padding: 2rem;
      display: flex;
      width: 100%;
      // align-items: center;
      // justify-content: center;
      flex-direction: column;
      grid-area: main;
      max-width: 50rem;
    }
    #{$self}__sub {
      grid-area: sub;
      padding: 2rem;
      display: flex;
      width: 100%;
      // align-items: center;
      // justify-content: center;
      flex-direction: column;
      max-width: 50rem;
    }
    #{$self}__avatar {
      width: 100%;
      // display:
    }
    #{$self}__header {
      font-size: 2rem;

      #{$self}__title {
        font-size: inherit;
      }
    }
  }
  &__submit {
    grid-area: submit;
    width: 100%;
    max-width: 100rem;
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
    &--small {
    }
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
