<template>
  <div class="confirm-identity">
    <div class="confirm-identity__container" v-loading="loading">
      <div class="confirm-identity__select">
        <div class="confirm-identity__text" @click.stop="toggleCardSelect">
          <span>{{selected_card.type||`本人確認`}}</span>
          <fa icon="sort"></fa>
        </div>
        <div class="confirm-identity__modal" v-if="cardModal" v-click-outside="toggleCardSelect">
          <div
            class="confirm-identity__option"
            v-for="allow in allowed"
            :key="allow.type"
            @click="selectCard(allow)"
          >{{allow.type}}</div>
        </div>
      </div>

      <div class="confirm-identity__upload">
        <!-- <div class="confirm-identity__title"></div> -->
        <div class="confirm-identity__cover">
          <div class="confirm-identity__title" v-if="selected_card.require">表</div>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            action
            :on-success="handleChangeCover"
          >
            <div v-ripple class="confirm-identity__upload-button">
              <fa icon="plus"></fa>
              <span>アップロード</span>
            </div>
            <div slot="tip" class="el-upload__tip">jpg/png/pdf ファイル、5mb以下</div>
          </el-upload>
          <div class="confirm-identity__uploaded" v-if="form.cover.name">
            <fa icon="file-image" style="margin:0 1rem;"></fa>
            {{form.cover.name}}
          </div>
        </div>
        <div class="confirm-identity__back" v-if="selected_card.require">
          <div class="confirm-identity__title" v-if="selected_card.require">裏</div>
          <el-upload class="upload-demo" :show-file-list="false" :on-success="handleChangeBack">
            <div class="confirm-identity__upload-button">
              <fa icon="plus"></fa>
              <span>アップロード</span>
            </div>
            <div slot="tip" class="el-upload__tip">jpg/png ファイル、5mb以下</div>
          </el-upload>
          <div class="confirm-identity__uploaded" v-if="form.back.name">
            <fa icon="file-image" style="margin:0 1rem;"></fa>
            {{form.back.name}}
          </div>
        </div>
      </div>
      <div class="confirm-identity__finish flex-row flex--between">
        <div class="confirm-identity__button" @click="changeStep">戻る</div>
        <div
          class="confirm-identity__button confirm-identity__button--confirm"
          @click="createAccount"
        >本人確認</div>
      </div>
      <div class="confirm-identity__confirm">
        本人確認することにより,
        <nuxt-link to="/tos">利用契約</nuxt-link>と
        <a href="https://stripe.com/connect-account/legal">Stripe Connectアカウント契約</a>
        に従い同意することになる。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: Object
  },
  data() {
    return {
      allowed: [
        { type: "パスポート", require: null },
        { type: "マイナンバーカード", require: null },
        { type: "運転免許証", require: "表裏" },
        { type: "在留カード", require: null },
        { type: "外国人登録証明書", require: null }
      ],
      selected_card: { type: "パスポート", require: null },
      cardModal: false,
      loading: false,
      form: {
        cover: {
          file: "",
          name: "",
          url: "",
          type: ""
        },
        back: {
          file: "",
          name: "",
          url: "",
          type: ""
        }
      },
      stripe: this.$stripe.import()
    };
  },
  methods: {
    selectCard: function(card) {
      this.selected_card = card;
      this.cardModal = !this.cardModal;
    },
    toggleCardSelect: function() {
      this.cardModal = !this.cardModal;
      // this.cardModal = this
    },
    handleChangeCover(res, file) {
      this.form.cover.file = file.raw;
      this.form.cover.name = file.name;
      this.form.cover.type = file.raw.type;
      // console.log(file);
      // this.form['cover']['url'] =
      // this.fileList = fileList.slice(-3);
    },
    handleChangeBack(res, file) {
      this.form.back.file = file.raw;
      this.form.back.name = file.name;
      this.form.back.type = file.raw.type;
    },
    changeStep() {
      this.$store.commit("SET_CONTRACT_STEP", 1);
    },
    createAccount: async function() {
      try {
        this.loading = true;
        if (!this.form.cover.name) {
          return this.$toast.show("身分証明書が必要です", {
            theme: "toasted-primary",
            position: "top-right",
            icon: "extension",
            duration: 2000
          });
          this.loading = false;
        }
        // return console.log(this.person);
        let file;
        if (this.selected_card.require) {
          if (!this.form.back.name) {
            return this.$toast.show("身分証明書の裏側の写真が必要です", {
              theme: "toasted-primary",
              position: "top-right",
              icon: "extension",
              duration: 2000
            });
          }
          // this.form.back.url = await this.$store.dispatch(
          //   "upload/image",
          //   this.form.back.file
          // );
        }
        // this.form.cover.url = await this.$store.dispatch(
        //   "upload/image",
        //   this.form.cover.file
        // );
        // return
        // this.person["person"]["tos_shown_and_accepted"] = true;
        const { token, error } = await this.stripe.createToken(
          "person",
          this.person["person"]
        );
        // clg
        if (error) throw error;
        let formData = new FormData();
        console.log(token);
        formData.append("person", token.id);
        formData.append("cover", this.form.cover.file);
        formData.append(
          "first_name_kanji",
          this.person["person"]["first_name_kanji"]
        );
        let res;
        if (this.selected_card.require) {
          formData.append("cover", this.form.back.file);
          res = await this.$axios.post("/stripe/connect/account", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          if (res.status !== 200) {
            throw new Error("bad");
          }
          // await this.$store.dispatch("stripe/setAccount", {
          //   person: token,
          //   cover: this.form.cover,
          //   back: this.form.back
          // });
        } else {
          res = await this.$axios.post("/stripe/connect/account", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          if (res.status !== 200) {
            throw new Error("bad");
          }
        }
        this.loading = false;
        return this.$toast.show("本人確認を完了しました", {
          theme: "toasted-primary",
          position: "top-right",
          icon: "check_circle",
          duration: 2000
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
        return this.$toast.show("本人確認に失敗しました", {
          theme: "toasted-primary",
          position: "top-right",
          icon: "extension",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss">
.confirm-identity {
  padding: 2rem;
  $self: &;
  user-select: none;
  #{$self}__upload {
    margin-top: 2rem;
    #{$self}__uploaded {
      margin: 1rem 0;
      font-size: 1.4rem;
      color: #697386;
      border-radius: 0.2rem;
      background-color: #fff;
      padding: 0.2rem 0rem;
      width: 20rem;
    }
    #{$self}__title {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
    #{$self}__cover {
    }
    #{$self}__back {
      margin-top: 2rem;
    }
    #{$self}__upload-button {
      padding: 0.5rem 1rem;
      background-color: #fff;
      border-radius: 0.5rem;
      font-size: 1.4rem;
      -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
      color: #566cd6;
      span {
        font-size: inherit;
      }
    }
  }
  &__finish {
    margin: 2rem 0;
    #{$self}__button {
      font-size: 1.5rem;
      padding: 0.5rem 2rem;
      border-radius: 0.5rem;
      background-color: #566cd6;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      color: white;
      transition: 200ms ease;
      &:hover {
        cursor: pointer;
        transform: translate(-1px);
      }
      &--confirm {
        // color:white;
        background: #3ecf8e;
        text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
        &:hover {
          cursor: pointer;
          transform: translate(1px);
        }
      }
    }
  }
  &__confirm {
    // margin-top: 2rem;
    font-size: 1.2rem;
    text-align: center;
    a {
      font-size: inherit;
      color: #3d4eac;
    }
  }
  &__select {
    position: relative;
    #{$self}__modal {
      position: absolute;
      top: 101%;
      width: 18rem;
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      color: #2a2f45;
      #{$self}__option {
        color: #2a2f45;
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
        &:hover {
          cursor: pointer;
          background-color: #f7fafc;
        }
      }
    }
    #{$self}__text {
      padding: 0.5rem 1rem;
      width: 18rem;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
        rgba(42, 47, 69, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

      &:hover {
        cursor: pointer;
      }
      span {
        font-size: inherit;
      }
    }
  }
}
</style>
