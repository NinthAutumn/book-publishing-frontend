<template>
  <div class="social-auth">
    <div class="social-auth__header text--center text--large">ノーブル</div>

    <ul class="social-auth__list flex-column flex--center flex--align">
      <li
        v-ripple
        class="social-auth__item flex-row flex--align flex--between"
        :class="`social-auth__item--${social.value}`"
        v-for="social in social_auth"
        :key="social.value"
        @click="socialLogin(social.value)"
      >
        <fa
          v-if="social.value !== 'google'"
          class="social-auth__icon"
          :icon="{prefix:social.pref, iconName:social.icon}"
        ></fa>
        <svg-icon class="social-auth__icon social-auth__icon--google" name="google" v-else></svg-icon>
        <div class="social-auth__key">{{social.key}}</div>
      </li>
    </ul>
    <div class="social-auth__create-account">
      アカウントを持っていない?
      <span @click="changeStep">サインアップ!</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      social_auth: [
        {
          key: "グーグルでログイン",
          value: "google",
          icon: "google",
          pref: "fab"
        },
        {
          key: "ツイッターでログイン",
          value: "twitter",
          icon: "twitter",
          pref: "fab"
        },
        {
          key: "フェースブックでログイン",
          value: "facebook",
          icon: "facebook",
          pref: "fab"
        },
        {
          key: "メールアドレスでログイン",
          value: "local",
          icon: "envelope",
          pref: "fas"
        }
      ]
    };
  },
  methods: {
    async socialLogin(value) {
      if (value === "local") {
        return this.$store.commit("SET_AUTH_PAGE", 1);
      }
      this.$auth.loginWith(value);
    },
    async changeStep() {
      this.$store.commit("SET_AUTH_PAGE", 2);
    }
  }
};
</script>

<style lang="scss">
.social-auth {
  $self: &;
  width: 100%;
  height: 90%;
  padding: 3rem;
  &__header {
    margin-bottom: 2rem;
  }
  &__list {
    #{$self}__item {
      background-color: #fff;
      font-size: 1.6rem;
      padding: 1.25rem 4rem;
      // display:flex;
      min-width: 35rem;
      max-width: 50rem;
      border: 0px solid;
      margin-bottom: 1.5rem;
      border-radius: 0.5rem;
      transition: box-shadow 150ms ease;
      user-select: none;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);

      transition: box-shadow 150ms ease;
      &:hover {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);

        transition: box-shadow 150ms ease;
      }
      &:active,
      &:focus {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
        transition: box-shadow 150ms ease;
      }
      &--facebook {
        color: #4065b4;
        border-color: rgb(247, 247, 247);
      }
      &--google {
        border-color: rgb(247, 247, 247);

        &__key {
          color: black;
        }
      }
      &--local {
        color: $primary;
      }
      &--twitter {
        color: #059ff5;
        border-color: rgb(247, 247, 247);
      }
      #{$self}__icon {
        // margin-right: 3rem;
        font-size: 2rem;
        &--google {
          width: 2.2rem;
          height: 2.2rem;
        }
      }

      #{$self}__key {
        width: 20rem;
        font-weight: bold;
        font-size: 1.6rem;
        justify-self: right;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__create-account {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 2rem;
    // color: ;
    span {
      font-size: 1.6rem;
      color: $secondary;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
