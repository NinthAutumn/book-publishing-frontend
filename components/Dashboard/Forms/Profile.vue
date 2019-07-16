<template>
  <div class="profile-form">
    <div class="flex-control flex-row flex--between">
      <div class="flex-control flex-column">
        <label for="fullname">姓*</label>
        <input
          class="profile-form__input profile-form__input--name profile-form__input--firstname"
          v-model="form.lastName"
          type="text"
          name="fullname"
          v-validate="'required'"
          data-vv-as="漢字姓"
          placeholder="姓"
        />
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.lastName"
          v-validate="'required'"
          data-vv-as="カタカナ姓"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        />
      </div>
      <div class="flex-control flex-column">
        <label for="fullname">名*</label>
        <input
          class="profile-form__input profile-form__input--name"
          v-model="form.firstName"
          type="text"
          v-validate="'required'"
          data-vv-as="漢字名"
          name="fullname"
          placeholder="名"
        />
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.firstName"
          v-validate="'required'"
          data-vv-as="カタカナ名"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        />
      </div>
    </div>
    <div class="flex-divider">
      <label for="email">Eメール*</label>
      <input
        class="profile-form__input profile-form__input--email"
        v-model="form.email"
        type="text"
        v-validate="'required|email'"
        data-vv-as="Eメール"
        name="email"
        placeholder="example@example.com"
      />
      <label for="phone">携帯番号*</label>
      <input
        class="profile-form__input profile-form__input--email"
        v-model="form.phone"
        type="text"
        v-validate="'required'"
        data-vv-as="携帯"
        name="email"
        placeholder="00 0000 0000"
      />
    </div>
    <div class="flex flex--between flex--align">
      <div class="flex-divider">
        <label for="gender">性別*</label>
        <v-radio-group v-model="form.gender" row>
          <v-radio
            v-for="n in genders"
            :key="n.key"
            :label="`${n.key}`"
            :value="n.value"
            color="#566CD6"
          ></v-radio>
        </v-radio-group>
      </div>
    </div>

    <label for="birthday">生年月日*</label>
    <date-picker
      :not-after="$moment().subtract('18', 'years')"
      type="date"
      format="YYYY/MM/DD"
      :lang="lang"
      v-model="form.birth"
      :default-value="$moment().subtract('18', 'years')"
    ></date-picker>

    <div class="flex-divider flex-row flex--right">
      <div @click="changeStep(1)" class="profile-form__button">進む</div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  props: {
    person: Object,
    birth: [String, Object, Date]
  },
  data() {
    return {
      genders: [
        { key: "男性", value: "male" },
        { key: "女性", value: "female" }
      ],
      menu: false,
      date: "",
      form: {
        firstName: "",
        birth: this.$moment().subtract("18", "years"),
        lastName: "",
        gender: "male",
        phone: "",
        email: ""
      },
      kana_form: {
        firstName: "",
        lastName: ""
      },
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
      },
      selected: []
    };
  },
  mounted() {
    if (this.birth) {
      this.form.birth = this.birth;
    }
    if (this.person) {
      this.kana_form.firstName = this.person["first_name_kana"];
      this.kana_form.lastName = this.person["last_name_kana"];
      this.form.firstName = this.person["first_name_kanji"];
      this.form.lastName = this.person["last_name_kanji"];
      this.form.phone = this.person["phone"];
      this.form.email = this.person["email"];
    }
  },
  methods: {
    async changeStep(step) {
      await this.$validator.validateAll();
      if (this.errors.any()) {
        return this.$toast.show("空欄がまだ残っています", {
          duration: 1000,
          theme: "toasted-primary",
          icon: "extension",
          position: "top-right"
        });
      }
      // this.form.address.postal = this.form.address.postal.replace("-", "");
      const person = {
        first_name_kana: this.kana_form.firstName,
        last_name_kana: this.kana_form.lastName,
        first_name_kanji: this.form.firstName,
        last_name_kanji: this.form.lastName,
        phone: this.form.phone,
        email: this.form.email,
        dob: {
          day: this.$moment(this.form.birth).date(),
          month: this.$moment(this.form.birth).month() + 1,
          year: this.$moment(this.form.birth).year()
        },
        gender: this.form.gender
      };
      this.$emit("save", person);
      this.$emit("storeBirth", this.form.birth);
      this.$store.commit("SET_CONTRACT_STEP", 1);
    }
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
  @keyframes slide-left {
    from {
      transform: translateX(10px);
    }
    to {
      transform: translate(0);
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
    animation: slide-left 300ms ease;
    &:focus {
      outline: none;
    }
    margin-bottom: 2rem;
    &--email {
      width: 40rem;
    }
    &--name {
      margin-bottom: 1rem;
      width: 20rem;
      &-kana {
        font-size: 1.2rem;
        width: 20rem;
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
      width: 10rem;
      padding: 0 12px;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      &:hover {
        cursor: pointer;
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
