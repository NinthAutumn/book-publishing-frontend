<template>
  <div class="sent-mail">
    <div @click="moveAuth(2)" class="flex-row go-back">
      <div class="divider">
        <Zondicon class="zond-back" icon="arrow-thick-left"></Zondicon>
      </div>
      <div class="divider">
        <p>戻る</p>
      </div>
    </div>
    <header class="sent-mail__header text--center text--large">Eメールの確認</header>
    <p class="sent-mail__content">
      Eメールがあなたに送られました、
      もし貴方の受信トレイにメールが届いていなければ、
      スパムやプロモーションにあるかもしれません。
    </p>
    <div class="sent-mail__email">{{email}}</div>
    <div class="flex-divider flex-row flex--right">
      <div @click="resendMail" class="sent-mail__button">メールを新しく送る</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["email"],
  methods: {
    ...mapMutations({
      moveAuth: "SET_AUTH_PAGE"
    }),
    async resendMail() {}
  },
  mounted() {}
};
</script>

<style lang="scss">
.sent-mail {
  padding: 3rem;
  header {
    // font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }
  $self: &;
  &__content {
    margin-bottom: 1rem;
  }
  &__mail {
    font-size: 1.6rem;
    padding: 1rem;
    font-weight: bold;
  }
  &__button {
    font-size: 1.4rem;
    background-color: rgb(85, 108, 214);
    box-shadow: rgb(61, 78, 172) 0px 1px 0px 0px,
      rgb(85, 108, 214) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(42, 47, 69, 0.22) 0px 2px 4px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 0.5rem;
    user-select: none;
    cursor: pointer;
  }
}
</style>
