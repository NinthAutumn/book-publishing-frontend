<template>
  <div class="profile-form">
    <div class="flex-control flex-row flex--between">
      <div class="flex-control flex-column">
        <label for="fullname">氏名*</label>
        <input
          class="profile-form__input profile-form__input--name profile-form__input--firstname"
          v-model="form.lastname"
          type="text"
          name="fullname"
          placeholder="氏名"
        >
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.lastname"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-control flex-column">
        <label for="fullname">名前*</label>
        <input
          class="profile-form__input profile-form__input--name"
          v-model="form.firstname"
          type="text"
          name="fullname"
          placeholder="名前"
        >
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.firstname"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        >
      </div>
    </div>
    <label for="gender">性別*</label>
    <v-radio-group v-model="form.gender" row>
      <v-radio v-for="n in genders" :key="n" :label="`${n}`" :value="n" color="#566CD6"></v-radio>
    </v-radio-group>
    <label for="birthday">誕生日*</label>
    <date-picker
      :not-after="$moment().subtract('18', 'years')"
      type="date"
      format="YYYY/MM/DD"
      :lang="lang"
      v-model="form.birth"
      :default-value="$moment().subtract('18', 'years')"
    ></date-picker>
    <label for="fullname">郵便番号*</label>
    <input
      v-mask="'###-####'"
      class="profile-form__input profile-form__input--post"
      v-model="form.address.postal"
      type="text"
      name="line"
      placeholder="000-0000"
    >
    <div class="flex-divider flex-row flex--between">
      <div class="flex-divider flex-column">
        <label for="fullname">都道府県*</label>
        <input
          class="profile-form__input profile-form__input--state profile-form__input--kanji"
          v-model="form.address.state"
          maxlength="4"
          type="text"
          name="state"
          placeholder="神奈川県"
        >
        <input
          class="profile-form__input profile-form__input--state-kana profile-form__input--kana"
          v-model="kana_form.address.state"
          type="text"
          name="state"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">市区郡*</label>
        <input
          class="profile-form__input profile-form__input--city profile-form__input--kanji"
          v-model="form.address.city"
          type="text"
          name="city"
          placeholder="市区郡"
        >
        <input
          class="profile-form__input profile-form__input--city-kana profile-form__input--kana"
          v-model="kana_form.address.city"
          type="text"
          name="city"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">町村名、丁目を含む*</label>

        <input
          class="profile-form__input profile-form__input--town profile-form__input--kanji"
          v-model="form.address.town"
          type="text"
          name="town"
          placeholder="町村名"
        >
        <input
          class="profile-form__input profile-form__input--town-kana profile-form__input--kana"
          v-model="kana_form.address.town"
          type="text"
          name="town"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">番地*</label>
        <input
          v-mask="'##-##'"
          class="profile-form__input profile-form__input--line profile-form__input--kanji"
          v-model="form.address.line"
          type="text"
          name="line"
          placeholder="01-10"
        >
      </div>
    </div>
    <div class="flex-divider flex-row flex--right">
      <div class="profile-form__button">進む</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genders: ["男性", "女性"],
      menu: false,
      date: "",
      form: {
        firstName: "",
        birth: this.$moment().subtract("18", "years"),
        lastName: "",
        gender: "男性",
        address: {
          state: "",
          city: "",
          town: "",
          line: "",
          postal: ""
        }
      },
      kana_form: {
        firstName: "",
        lastName: "",
        address: {
          state: "",
          city: "",
          town: "",
          line: ""
        }
      },
      prefectures: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県"
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
  watch: {
    "form.address.city": function(val) {
      // console.log("this");
      console.log(this.form.address.city);
      // this.form.address.city.replace(/市/g, "");
    }
  },
  async mounted() {
    // this.date =
  }
};
</script>

<style lang="scss">
.profile-form {
  $self: &;
  padding: 2rem;
  .el-input__inner {
    border: none;
  }
  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
    input {
    }
  }
  .el-input__icon {
    font-size: 1.6rem;
  }
  .el-date-editor {
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    border: 0px solid grey !important;
    margin-bottom: 2rem;
  }
  .mx-datepicker {
    margin-bottom: 2rem;
    input {
      height: 40px;
      padding: 10px 12px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #e6ebf1;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      font-size: 1.6rem;
    }
  }
  &__input {
    height: 40px;
    padding: 10px 12px;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-size: 1.6rem;
    &:focus {
      outline: none;
    }
    margin-bottom: 2rem;
    &--name {
      margin-bottom: 1rem;
      width: 19.4rem;
      &-kana {
        font-size: 1.2rem;
        width: 19.4rem;
        height: 3rem;
      }
    }
    &--kanji {
      margin-bottom: 1rem;
    }
    &--kana {
      // width: 14rem;
    }
    &--kana-name {
    }
    &--firstname {
    }
    &--city {
      width: 13rem;
      &-kana {
        width: 13rem;
        font-size: 1.2rem;
        height: 3rem;
      }
    }
    &--state {
      width: 9rem;
      &-kana {
        width: 9rem;
        font-size: 1.2rem;
        height: 3rem;
      }
    }
    &--hide {
      opacity: 0;
    }
    &--town {
      width: 13rem;
      &-kana {
        width: 13rem;
        font-size: 1.2rem;
        height: 3rem;
      }
    }
    &--line {
      width: 7.25rem;
      &-kana {
        width: 7.25rem;
      }
    }
    &--post {
      width: 10rem;
    }
  }
  &__button {
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
    border-radius: 0.4rem;
    color: #fff;
    background: #6772e5;
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
      0 1px 3px rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    &:hover {
      cursor: pointer;
    }
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    color: #6b7c93;
  }
  .v-input__slot {
    margin-bottom: 0.8rem !important;
  }
  .v-label {
    margin-bottom: 0;
    color: #6b7c93;
  }
}
</style>
