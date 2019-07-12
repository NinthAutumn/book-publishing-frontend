<template>
  <div class="address-form">
    <label for="fullname">郵便番号*</label>
    <input
      v-validate="'required'"
      data-vv-as="郵便番号"
      class="address-form__input address-form__input--post"
      v-model="address.postal"
      v-mask="'###-####'"
      type="text"
      name="line"
      placeholder="000-0000"
    >
    <div class="flex-divider flex-row flex--between">
      <div class="flex-divider flex-column">
        <label for="fullname">都道府県*</label>
        <div class="address-form__select-container">
          <div
            class="address-form__input address-form__input--state flex-row flex--between flex--align"
            @click.stop="toggleStateModal"
          >
            {{address.state.name||`都道府県`}}
            <fa icon="sort"></fa>
          </div>
          <!-- <transition name="grow-shrink"> -->
          <div
            class="address-form__select-modal"
            v-if="stateModal"
            v-click-outside="toggleStateModal"
          >
            <input placeholder="検索" v-model="search" class="address-form__search-input">
            <ul class="address-form__options">
              <li
                class="address-form__option address-form__option--default"
                v-if="search.length < 1"
              >都道府県</li>
              <li
                class="address-form__option"
                v-else
                v-for="state in selected"
                :key="state.id"
                @click="selectState(state)"
                :class="{'address-form__option--selected':state === address.state}"
              >{{state.name}}</li>
            </ul>
          </div>
          <!-- </transition> -->
        </div>
        <!-- <input
          class="address-form__input address-form__input--state address-form__input--kanji"
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
          class="address-form__input address-form__input--city address-form__input--kanji"
          v-model="address.city"
          v-validate="'required'"
          data-vv-as="市区郡"
          type="text"
          name="city"
          placeholder="市区郡"
        >
        <input
          class="address-form__input address-form__input--city-kana address-form__input--kana"
          v-model="address_kana.city"
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
          class="address-form__input address-form__input--town address-form__input--kanji"
          v-model="address.town"
          v-validate="'required'"
          data-vv-as="町村名"
          type="text"
          name="town"
          placeholder="町村名"
        >
        <input
          class="address-form__input address-form__input--town-kana address-form__input--kana"
          v-model="address_kana.town"
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
          v-validate="'required'"
          data-vv-as="番地"
          class="address-form__input address-form__input--line address-form__input--kanji"
          v-model="address.line"
          type="text"
          name="line"
          placeholder="8-9"
        >
      </div>
    </div>
    <div class="flex-divider flex-column">
      <label for="building">建物</label>
      <input
        class="address-form__input address-form__input--town address-form__input--kanji"
        v-model="address.lineTwo"
        data-vv-as="建物"
        type="text"
        name="building"
        placeholder="建物情報"
      >
      <input
        class="address-form__input address-form__input--town-kana address-form__input--kana"
        v-model="address_kana.lineTwo"
        type="text"
        data-vv-as="カタカナ町村名"
        name="building_kana"
        placeholder="カタカナ*"
      >
    </div>
    <div class="flex-divider flex-row flex--between" style="width:100%;">
      <div @click="changeStep(0)" class="address-form__button address-form__button--back">戻る</div>
      <div @click="changeStep(2)" class="address-form__button">進む</div>
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
      search: "",
      address: {
        state: "",
        city: "",
        town: "",
        line: "",
        lineTwo: "",
        postal: ""
      },
      address_kana: {
        state: "",
        city: "",
        town: "",
        line: "",
        lineTwo: ""
      },
      selected: [],
      stateModal: false,
      prefectures: {
        北海道: {
          id: 1,
          region: 1,
          name: "北海道",
          short: "北海道",
          kana: "ホッカイドウ",
          en: "hokkaido",
          neighbor: [2]
        },
        青森県: {
          id: 2,
          region: 2,
          name: "青森県",
          short: "青森",
          kana: "アオモリ",
          en: "aomori",
          neighbor: [1, 3, 5]
        },
        岩手県: {
          id: 3,
          region: 2,
          name: "岩手県",
          short: "岩手",
          kana: "イワテ",
          en: "iwate",
          neighbor: [2, 4, 5]
        },
        宮城県: {
          id: 4,
          region: 2,
          name: "宮城県",
          short: "宮城",
          kana: "ミヤギ",
          en: "miyagi",
          neighbor: [3, 5, 6, 7]
        },
        秋田県: {
          id: 5,
          region: 2,
          name: "秋田県",
          short: "秋田",
          kana: "アキタ",
          en: "akita",
          neighbor: [2, 3, 4, 6]
        },
        山形県: {
          id: 6,
          region: 2,
          name: "山形県",
          short: "山形",
          kana: "ヤマガタ",
          en: "yamagata",
          neighbor: [4, 5, 7, 15]
        },
        福島県: {
          id: 7,
          region: 2,
          name: "福島県",
          short: "福島",
          kana: "フクシマ",
          en: "fukushima",
          neighbor: [4, 6, 8, 9, 10, 15]
        },
        茨城県: {
          id: 8,
          region: 3,
          name: "茨城県",
          short: "茨城",
          kana: "イバラキ",
          en: "ibaraki",
          neighbor: [7, 9, 11, 12]
        },
        栃木県: {
          id: 9,
          region: 3,
          name: "栃木県",
          short: "栃木",
          kana: "トチギ",
          en: "tochigi",
          neighbor: [8, 7, 10, 11]
        },
        群馬県: {
          id: 10,
          region: 3,
          name: "群馬県",
          short: "群馬",
          kana: "グンマ",
          en: "gunma",
          neighbor: [7, 9, 11, 15, 20]
        },
        埼玉県: {
          id: 11,
          region: 3,
          name: "埼玉県",
          short: "埼玉",
          kana: "サイタマ",
          en: "saitama",
          neighbor: [8, 9, 10, 12, 13, 19, 20]
        },
        千葉県: {
          id: 12,
          region: 3,
          name: "千葉県",
          short: "千葉",
          kana: "チバ",
          en: "chiba",
          neighbor: [8, 11, 13, 14]
        },
        東京都: {
          id: 13,
          region: 3,
          name: "東京都",
          short: "東京",
          kana: "トウキョウ",
          en: "tokyo",
          neighbor: [11, 12, 14, 19]
        },
        神奈川県: {
          id: 14,
          region: 3,
          name: "神奈川県",
          short: "神奈川",
          kana: "カナガワ",
          en: "kanagawa",
          neighbor: [12, 13, 19, 22]
        },
        新潟県: {
          id: 15,
          region: 4,
          name: "新潟県",
          short: "新潟",
          kana: "ニイガタ",
          en: "niigata",
          neighbor: [6, 7, 10, 16, 20]
        },
        富山県: {
          id: 16,
          region: 4,
          name: "富山県",
          short: "富山",
          kana: "トヤマ",
          en: "toyama",
          neighbor: [15, 17, 20, 21]
        },
        石川県: {
          id: 17,
          region: 4,
          name: "石川県",
          short: "石川",
          kana: "イシカワ",
          en: "ishikawa",
          neighbor: [16, 18, 21]
        },
        福井県: {
          id: 18,
          region: 4,
          name: "福井県",
          short: "福井",
          kana: "フクイ",
          en: "fukui",
          neighbor: [17, 21, 25, 26]
        },
        山梨県: {
          id: 19,
          region: 4,
          name: "山梨県",
          short: "山梨",
          kana: "ヤマナシ",
          en: "yamanashi",
          neighbor: [11, 13, 14, 20, 22]
        },
        長野県: {
          id: 20,
          region: 4,
          name: "長野県",
          short: "長野",
          kana: "ナガノ",
          en: "nagano",
          neighbor: [10, 11, 15, 16, 19, 21, 22, 23]
        },
        岐阜県: {
          id: 21,
          region: 4,
          name: "岐阜県",
          short: "岐阜",
          kana: "ギフ",
          en: "gifu",
          neighbor: [16, 17, 18, 20, 23, 24, 25]
        },
        静岡県: {
          id: 22,
          region: 4,
          name: "静岡県",
          short: "静岡",
          kana: "シズオカ",
          en: "shizuoka",
          neighbor: [14, 19, 20, 23]
        },
        愛知県: {
          id: 23,
          region: 4,
          name: "愛知県",
          short: "愛知",
          kana: "アイチ",
          en: "aichi",
          neighbor: [20, 21, 22, 24]
        },
        三重県: {
          id: 24,
          region: 5,
          name: "三重県",
          short: "三重",
          kana: "ミエ",
          en: "mie",
          neighbor: [21, 23, 25, 26, 29, 30]
        },
        滋賀県: {
          id: 25,
          region: 5,
          name: "滋賀県",
          short: "滋賀",
          kana: "シガ",
          en: "shiga",
          neighbor: [18, 21, 24, 26]
        },
        京都府: {
          id: 26,
          region: 5,
          name: "京都府",
          short: "京都",
          kana: "キョウト",
          en: "kyoto",
          neighbor: [18, 24, 25, 27, 28, 29]
        },
        大阪府: {
          id: 27,
          region: 5,
          name: "大阪府",
          short: "大阪",
          kana: "オオサカ",
          en: "osaka",
          neighbor: [26, 28, 29, 30]
        },
        兵庫県: {
          id: 28,
          region: 5,
          name: "兵庫県",
          short: "兵庫",
          kana: "ヒョウゴ",
          en: "hyogo",
          neighbor: [26, 27, 30, 31, 33, 36, 37]
        },
        奈良県: {
          id: 29,
          region: 5,
          name: "奈良県",
          short: "奈良",
          kana: "ナラ",
          en: "nara",
          neighbor: [24, 26, 27, 30]
        },
        和歌山県: {
          id: 30,
          region: 5,
          name: "和歌山県",
          short: "和歌山",
          kana: "ワカヤマ",
          en: "wakayama",
          neighbor: [24, 27, 28, 29, 36]
        },
        鳥取県: {
          id: 31,
          region: 6,
          name: "鳥取県",
          short: "鳥取",
          kana: "トットリ",
          en: "tottori",
          neighbor: [28, 32, 33, 34]
        },
        島根県: {
          id: 32,
          region: 6,
          name: "島根県",
          short: "島根",
          kana: "シマネ",
          en: "shimane",
          neighbor: [31, 34, 35]
        },
        岡山県: {
          id: 33,
          region: 6,
          name: "岡山県",
          short: "岡山",
          kana: "オカヤマ",
          en: "okayama",
          neighbor: [28, 31, 34, 37]
        },
        広島県: {
          id: 34,
          region: 6,
          name: "広島県",
          short: "広島",
          kana: "ヒロシマ",
          en: "hiroshima",
          neighbor: [31, 32, 33, 35, 37, 38]
        },
        山口県: {
          id: 35,
          region: 6,
          name: "山口県",
          short: "山口",
          kana: "ヤマグチ",
          en: "yamaguchi",
          neighbor: [32, 34, 38, 40, 44]
        },
        徳島県: {
          id: 36,
          region: 7,
          name: "徳島県",
          short: "徳島",
          kana: "トクシマ",
          en: "tokushima",
          neighbor: [28, 30, 37, 38, 39]
        },
        香川県: {
          id: 37,
          region: 7,
          name: "香川県",
          short: "香川",
          kana: "カガワ",
          en: "kagawa",
          neighbor: [28, 33, 34, 36, 38]
        },
        愛媛県: {
          id: 38,
          region: 7,
          name: "愛媛県",
          short: "愛媛",
          kana: "エヒメ",
          en: "ehime",
          neighbor: [33, 34, 35, 36, 37, 39, 44]
        },
        高知県: {
          id: 39,
          region: 7,
          name: "高知県",
          short: "高知",
          kana: "コウチ",
          en: "kochi",
          neighbor: [36, 38]
        },
        福岡県: {
          id: 40,
          region: 8,
          name: "福岡県",
          short: "福岡",
          kana: "フクオカ",
          en: "fukuoka",
          neighbor: [35, 41, 42, 43, 44]
        },
        佐賀県: {
          id: 41,
          region: 8,
          name: "佐賀県",
          short: "佐賀",
          kana: "サガ",
          en: "saga",
          neighbor: [40, 42]
        },
        長崎県: {
          id: 42,
          region: 8,
          name: "長崎県",
          short: "長崎",
          kana: "ナガサキ",
          en: "nagasaki",
          neighbor: [41, 43]
        },
        熊本県: {
          id: 43,
          region: 8,
          name: "熊本県",
          short: "熊本",
          kana: "クマモト",
          en: "kumamoto",
          neighbor: [40, 41, 42, 44, 45, 46]
        },
        大分県: {
          id: 44,
          region: 8,
          name: "大分県",
          short: "大分",
          kana: "オオイタ",
          en: "oita",
          neighbor: [35, 38, 40, 43, 45]
        },
        宮崎県: {
          id: 45,
          region: 8,
          name: "宮崎県",
          short: "宮崎",
          kana: "ミヤザキ",
          en: "miyazaki",
          neighbor: [43, 44, 46]
        },
        鹿児島県: {
          id: 46,
          region: 8,
          name: "鹿児島県",
          short: "鹿児島",
          kana: "カゴシマ",
          en: "kagoshima",
          neighbor: [43, 45, 47]
        },
        沖縄県: {
          id: 47,
          region: 8,
          name: "沖縄県",
          short: "沖縄",
          kana: "オキナワ",
          en: "okinawa",
          neighbor: [46]
        }
      }
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
            found = this.prefectures[row].en.match(val);
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
  mounted() {
    const person = {
      address_kana: {
        country: "JP",
        postal_code: this.address.postal,
        state: this.address.state.kana,
        city: this.address_kana.city,
        town: this.address_kana.town,
        line1: this.address.line,
        line2: this.address_kana.lineTwo
      },
      address_kanji: {
        country: "JP",
        postal_code: this.address.postal,
        state: this.address.state.name,
        city: this.address.city,
        town: this.address.town,
        line1: this.address.line,
        line2: this.address.lineTwo
      }
    };
    if (this.person) {
      this.address.state = this.person["person"]["address_kanji"]["state"];
      this.address.city = this.person["person"]["address_kanji"]["city"];
      this.address.postal = this.person["person"]["address_kanji"][
        "postal_code"
      ];
      this.address.town = this.person["person"]["address_kanji"]["town"];
      this.address.line = this.person["person"]["address_kanji"]["line1"];
      this.address.lineTwo = this.person["person"]["address_kanji"]["line2"];

      this.address_kana.state = this.person["person"]["address_kana"]["state"];
      this.address_kana.city = this.person["person"]["address_kana"]["city"];
      this.address_kana.town = this.person["person"]["address_kana"]["town"];
      this.address_kana.lineTwo = this.person["person"]["address_kana"][
        "line2"
      ];
    }
  },
  methods: {
    toggleStateModal() {
      this.stateModal = !this.stateModal;
    },
    selectState(state) {
      this.address.state = state;
      this.stateModal = !this.stateModal;
    },
    async changeStep(step) {
      if (step === 0) return this.$store.commit("SET_CONTRACT_STEP", step);

      await this.$validator.validateAll();
      if (this.errors.any()) {
        return this.$toast.show("空欄がまだ残っています", {
          duration: 1000,
          theme: "toasted-primary",
          icon: "extension",
          position: "top-right"
        });
      }
      this.address.postal = this.address.postal.replace("-", "");
      const person = {
        address_kana: {
          country: "JP",
          postal_code: this.address.postal,
          state: this.address.state.kana,
          city: this.address_kana.city,
          town: this.address_kana.town,
          line1: this.address.line,
          line2: this.address_kana.lineTwo
        },
        address_kanji: {
          country: "JP",
          postal_code: this.address.postal,
          state: this.address.state.name,
          city: this.address.city,
          town: this.address.town,
          line1: this.address.line,
          line2: this.address.lineTwo
        }
      };
      this.$emit("save", person);
      this.$store.commit("SET_CONTRACT_STEP", step);
    }
  }
};
</script>

<style lang="scss">
.address-form {
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
  @keyframes slide-left {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: translate(0);
    }
  }
  &__input {
    opacity: 0;
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
    animation-fill-mode: forwards;
    &:focus {
      outline: none;
    }
    margin-bottom: 2rem;
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
      animation-delay: 100ms;
      width: 13rem;
      &-kana {
        animation-delay: 100ms;
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
      animation-delay: 200ms;
      &-kana {
        animation-delay: 200ms;
        width: 13rem;
        font-size: 1.2rem;
        height: 3rem;
      }
    }
    &--line {
      animation-delay: 300ms;
      width: 7.25rem;
      &-kana {
        animation-delay: 300ms;
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
    &--back {
      background: #fff;
      color: #6772e5;
    }
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
}
</style>

