<template>
  <div class="profile-form">
    <div class="flex-control flex-row flex--between">
      <div class="flex-control flex-column">
        <label for="fullname">姓*</label>
        <input
          class="profile-form__input profile-form__input--name profile-form__input--firstname"
          v-model="form.lastname"
          type="text"
          name="fullname"
          v-validate="'required'"
          data-vv-as="漢字姓"
          placeholder="姓"
        >
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.lastname"
          v-validate="'required'"
          data-vv-as="カタカナ姓"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-control flex-column">
        <label for="fullname">名*</label>
        <input
          class="profile-form__input profile-form__input--name"
          v-model="form.firstname"
          type="text"
          v-validate="'required'"
          data-vv-as="漢字名"
          name="fullname"
          placeholder="名"
        >
        <input
          class="profile-form__input profile-form__input--name-kana"
          v-model="kana_form.firstname"
          v-validate="'required'"
          data-vv-as="カタカナ名"
          type="text"
          name="fullname"
          placeholder="カタカナ*"
        >
      </div>
    </div>
    <div class="flex flex--between flex--align">
      <!-- <div class="flex-divider">
        <label for="fullname">Eメール*</label>
        <input
          class="profile-form__input profile-form__input--email"
          v-model="form.firstname"
          type="text"
          v-validate="'required'"
          data-vv-as="漢字名"
          name="email"
          placeholder="example@example.com"
        >
      </div>-->
      <div class="flex-divider">
        <label for="gender">性別*</label>
        <v-radio-group v-model="form.gender" row>
          <v-radio v-for="n in genders" :key="n" :label="`${n}`" :value="n" color="#566CD6"></v-radio>
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
    <label for="fullname">郵便番号*</label>
    <input
      v-validate="'required'"
      data-vv-as="郵便番号"
      class="profile-form__input profile-form__input--post"
      v-model="form.address.postal"
      v-mask="'###-####'"
      type="text"
      name="line"
      placeholder="000-0000"
    >
    <div class="flex-divider flex-row flex--between">
      <div class="flex-divider flex-column">
        <label for="fullname">都道府県*</label>
        <div class="profile-form__select-container">
          <div
            class="profile-form__input profile-form__input--state flex-row flex--between flex--align"
            @click.stop="toggleStateModal"
          >
            {{form.address.state.name||`都道府県`}}
            <fa icon="sort"></fa>
          </div>
          <!-- <transition name="grow-shrink"> -->
          <div
            class="profile-form__select-modal"
            v-if="stateModal"
            v-click-outside="toggleStateModal"
          >
            <input placeholder="検索" v-model="search" class="profile-form__search-input">
            <ul class="profile-form__options">
              <li
                class="profile-form__option profile-form__option--default"
                v-if="search.length < 1"
              >都道府県</li>
              <li
                class="profile-form__option"
                v-else
                v-for="state in selected"
                :key="state"
                @click="selectState(state)"
                :class="{'profile-form__option--selected':state === form.address.state}"
              >{{state.name}}</li>
            </ul>
          </div>
          <!-- </transition> -->
        </div>
        <!-- <input
          class="profile-form__input profile-form__input--state profile-form__input--kanji"
          v-model="form.address.state"
          maxlength="4"
          type="text"
          name="state"
          placeholder="神奈川県"
        >-->
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">市区郡*</label>
        <input
          class="profile-form__input profile-form__input--city profile-form__input--kanji"
          v-model="form.address.city"
          v-validate="'required'"
          data-vv-as="市区郡"
          type="text"
          name="city"
          placeholder="市区郡"
        >
        <input
          class="profile-form__input profile-form__input--city-kana profile-form__input--kana"
          v-model="kana_form.address.city"
          type="text"
          v-validate="'required'"
          data-vv-as="カタカナ市区郡"
          name="city"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">町村名、丁目を含む*</label>

        <input
          class="profile-form__input profile-form__input--town profile-form__input--kanji"
          v-model="form.address.town"
          v-validate="'required'"
          data-vv-as="町村名"
          type="text"
          name="town"
          placeholder="町村名"
        >
        <input
          class="profile-form__input profile-form__input--town-kana profile-form__input--kana"
          v-model="kana_form.address.town"
          type="text"
          v-validate="'required'"
          data-vv-as="カタカナ町村名"
          name="town"
          placeholder="カタカナ*"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="fullname">番地*</label>
        <input
          v-mask="'##-##'"
          v-validate="'required'"
          data-vv-as="番地"
          class="profile-form__input profile-form__input--line profile-form__input--kanji"
          v-model="form.address.line"
          type="text"
          name="line"
          placeholder="01-10"
        >
      </div>
      <div class="flex-divider flex-column">
        <label for="building">建物</label>
        <input
          class="profile-form__input profile-form__input--town profile-form__input--kanji"
          v-model="form.address.lineTwo"
          v-validate="'required'"
          data-vv-as="建物"
          type="text"
          name="building"
          placeholder="建物情報"
        >
        <input
          class="profile-form__input profile-form__input--town-kana profile-form__input--kana"
          v-model="kana_form.address.lineTwo"
          type="text"
          v-validate="'required'"
          data-vv-as="カタカナ町村名"
          name="building_kana"
          placeholder="カタカナ*"
        >
      </div>
    </div>
    <div class="flex-divider flex-row flex--right">
      <div @click="changeStep(1)" class="profile-form__button">進む</div>
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
          lineTwo: "",
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
          line: "",
          lineTwo: ""
        }
      },
      search: "",
      stateModal: false,
      prefectures: {
        北海道: { name: "北海道", kana: "ホッカイドウ", hira: "ほっかいどう" },
        青森県: { name: "青森県", kana: "アオモリケン", hira: "あおもりけん" },
        岩手県: { name: "岩手県", kana: "イワテケン", hira: "いわてけん" },
        宮城県: { name: "宮城県", kana: "ミヤギケン", hira: "みやぎけん" },
        秋田県: { name: "秋田県", kana: "アキタケン", hira: "あきたけん" },
        山形県: { name: "山形県", kana: "ヤマガタケン", hira: "やまがたけん" },
        福島県: { name: "福島県", kana: "フクシマケン", hira: "ふくしまけん" },
        茨城県: { name: "茨城県", kana: "イバラキケン", hira: "いばらきけん" },
        栃木県: { name: "栃木県", kana: "トジギケン", hira: "とちぎけん" },
        群馬県: { name: "群馬県", kana: "グンマケン", hira: "ぐんまけん" },
        埼玉県: { name: "埼玉県", kana: "サイタマケン", hira: "さいたまけん" },
        千葉県: { name: "千葉県", kana: "チバケン", hira: "ちばけん" },
        東京都: { name: "東京都", kana: "トウキョウト", hira: "とうきょうと" },
        神奈川県: {
          name: "神奈川県",
          kana: "カナガワケン",
          hira: "かながわけん"
        },
        新潟県: { name: "新潟県", kana: "ニイガタケン", hira: "にいがたけん" },
        富山県: { name: "富山県", kana: "トヤマケン", hira: "とやまけん" },
        石川県: { name: "石川県", kana: "イシカワケン", hira: "いしかわけん" },
        福井県: { name: "福井県", kana: "フクイケン", hira: "ふくいけん" },
        山梨県: { name: "山梨県", kana: "ヤマナシケン", hira: "やまなしけん" },
        長野県: { name: "長野県", kana: "ナガノケン", hira: "ながのけん" },
        岐阜県: { name: "岐阜県", kana: "ギフケン", hira: "ぎふけん" },
        静岡県: { name: "静岡県", kana: "シズオカケン", hira: "シズオカケン" },
        愛知県: { name: "愛知県", kana: "アイチケン", hira: "あいちけん" },
        三重県: { name: "三重県", kana: "ミエケン", hira: "みえけん" },
        滋賀県: { name: "滋賀県", kana: "シガケン", hira: "しがけん" },
        京都府: { name: "京都府", kana: "キョウトフ", hira: "きょうとふ" },
        大阪府: { name: "大阪府", kana: "オオサカフ", hira: "おおさかふ" },
        兵庫県: { name: "兵庫県", kana: "ヒョウゴケン", hira: "ひょうごけん" },
        奈良県: { name: "奈良県", kana: "ナラケン", hira: "ならけん" },
        和歌山県: {
          name: "和歌山県",
          kana: "ワカヤマケン",
          hira: "わかやまけん"
        },
        鳥取県: { name: "鳥取県", kana: "トットリケン", hira: "とっとりけん" },
        島根県: { name: "島根県", kana: "シマネケン", hira: "しまねけん" },
        岡山県: { name: "岡山県", kana: "オカヤマケン", hira: "おかやまけん" },
        広島県: { name: "広島県", kana: "ヒロシマケン", hira: "ひろしまけん" },
        山口県: { name: "山口県", kana: "ヤマグチケン", hira: "やまぐちけん" },
        徳島県: { name: "徳島県", kana: "トクシマケン", hira: "とくしまけん" },
        香川県: { name: "香川県", kana: "カガワケン", hira: "かがわけん" },
        愛媛県: { name: "愛知県", kana: "アイチケン", hira: "あいちけん" },
        高知県: { name: "高知県", kana: "コウチケン", hira: "こうちけん" },
        福岡県: { name: "福岡県", kana: "フクオカケン", hira: "ふくおかけん" },
        佐賀県: { name: "佐賀県", kana: "サガケン", hira: "さがけん" },
        長崎県: { name: "長崎県", kana: "ナガサキケン", hira: "ながさきけん" },
        熊本県: { name: "熊本県", kana: "クマモトケン", hira: "くまもとけん" },
        大分県: { name: "大分県", kana: "オオイタケン", hira: "おおいたけん" },
        宮崎県: { name: "宮崎県", kana: "ミヤザキケン", hira: "みやざきけん" },
        鹿児島県: {
          name: "鹿児島県",
          kana: "カゴシマケン",
          hira: "かごしまけん"
        },
        沖縄県: {
          name: "沖縄県",
          short: "沖縄",
          kana: "オキナワケン",
          hira: "おきなわけん"
        }
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
  watch: {
    "form.address.postal": function(val) {},
    search: function(val) {
      val.replace("/", "");
      let rows = Object.keys(this.prefectures);
      let select = [];
      rows.forEach(row => {
        let found = this.prefectures[row].name.match(val);
        if (found) {
          select.push(this.prefectures[row]);
        } else {
          found = this.prefectures[row].kana.match(val);
          if (found) {
            select.push(this.prefectures[row]);
          } else {
            found = this.prefectures[row].hira.match(val);
            if (found) {
              select.push(this.prefectures[row]);
            }
          }
        }
      });
      this.selected = select;
      // this.form.address.city.replace(/市/g, "");
    }
  },
  async mounted() {
    // this.date =
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
        this.form.address.postal = this.form.address.postal.replace("-", "");
        const person = {
          countr: "JP",
          person: {
            first_name_kana: this.kana_form.firstName,
            last_name_kana: this.kana_form.lastName,
            phone: this.form.phone,
            dob: {
              day: $moment(this.form.birth).date(),
              month: moment(this.form.birth).month(),
              year: moment(this.form.birth).year()
            },
            address_kana: {
              country: "JP",
              postal_code: this.form.address.postal,
              state: this.form.address.state.kana,
              city: this.kana_form.address.city,
              town: this.kana_form.address.town,
              line1: this.form.address.line,
              line2: this.kana_form.address.lineTwo
            },
            address_kanji: {
              country: "JP",
              postal_code: this.form.address.postal,
              state: this.form.address.state.name,
              city: this.form.address.city,
              town: this.form.address.town,
              line1: this.form.address.line,
              line2: this.form.address.lineTwo
            }
          },
          tos_shown_and_accepted: true
        };
      }
      this.$store.commit("SET_CONTRACT_STEP", 1);
    },
    toggleStateModal() {
      this.stateModal = !this.stateModal;
    },
    selectState(state) {
      this.form.address.state = state;
    }
  }
};
</script>

<style lang="scss">
.profile-form {
  $self: &;
  padding: 2rem;
  &__select-container {
    position: relative;
    input {
      height: 3rem;
      font-size: 1.3rem;
      padding: 10px 14px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d9d1dd;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      transition: 300ms;
      margin-bottom: 2rem;
      &:active,
      &:focus {
        outline: none;
      }
    }
    #{$self}__bank-select {
      height: 3rem;
      font-size: 1.3rem;
      padding: 0 14px;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d9d1dd;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      transition: 300ms;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
      }
      &--disabled {
        background-color: #f7fafc;
        color: #b8c0c9;
        border: 1px solid #d3d6db;
        &:hover {
          cursor: default;
        }
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
    #{$self}__select-modal {
      z-index: 10;
      position: absolute;
      top: 4.1rem;
      width: 100%;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
      border-radius: 0.4rem;
      overflow: hidden;
      #{$self}__search-input {
        margin-bottom: 0rem;
        box-shadow: none;
        // border-top: 0.4rem;
        border-radius: 0;
        &:active,
        &:focus {
          outline: none;
        }
      }
      #{$self}__options {
        border-top: 1px solid #e3e8ee;
        width: 100%;
        max-height: 8rem;
        overflow: auto;
      }

      #{$self}__option {
        height: 3rem;
        color: #32325d;
        padding: 0px 14px;
        display: flex;
        align-items: center;
        background-color: white;
        width: 100%;
        font-size: 1.4rem;
        transition: 300ms;
        &:hover {
          background-color: #f7fafc;
          cursor: pointer;
        }
        &--selected {
          background-color: #f7fafc;
        }
        &--default {
          height: 3rem;
          font-size: 1.3rem;
          &:hover {
            background-color: white;
            cursor: default;
          }
          // justify-content: cen
          padding: 0px 14px;
          font-size: 1.4rem;
        }
      }
    }
  }
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
