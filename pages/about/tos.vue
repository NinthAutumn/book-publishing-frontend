<template>
  <div id="tos-page" class="tos-page page-padding">
    <div class="tos-page__container">
      <div class="flex-divider flex-row flex--center">
        <v-img width="5rem" max-width="5rem" :src="icon"></v-img>
      </div>
      <header>『ノーブル』 サービス利用規約</header>

      <div class="tos-page__content" v-for="(text,key) in texts" :key="key">
        <div class="tos-page__title" v-text="text.title"></div>
        <div class="tos-page__desc" v-html="text.desc"></div>
        <ul class="tos-page__list">
          <li class="tos-page__item" v-for="(item,index) in text.list" :key="index">
            <div class="tos-page__text" v-text="`${index+1}. ${item}`"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      icon: "/icon.png",
      texts: {
        定義: {
          title: "定義",
          desc:
            "<p>本規約において使用する用語の意義は、次の各号の定める通りとします。</p>",
          list: [
            "「本サービス」とは",
            "「本サイト」,「本アプリ」",
            "「使用者」",
            "「投稿作品」",
            "「投稿コンテンツ」"
          ]
        },
        適用範囲: {
          title: "本規約 (適用範囲)",
          desc: "<p></p>",
          list: [
            "本サイトには、本利用規約及びその他の利用規約等において、本サービスの利用条件が規定されています。その他の利用規約等は名称の如何にかかわらず本利用規約の一部を構成するものとします。",
            "本利用規約の規定とその他の利用規約等の規定が異なる場合は、当該その他の利用規約等の規定が優先して適用されるものとします。"
          ]
        },
        変更: {
          title: "本利用規約の変更",
          desc: "<p></p>",
          list: [
            "変更後の利用規約は、弊社が別途定める場合を除いて、本サイト上に表示した時点より効力を生じるものとします。",
            "弊社は、弊社の判断により、本利用規約をいつでも任意の理由で変更することができるものとします。",
            "使用者が、本利用規約の変更の効力が生じた後に本サービスを利用する場合は、変更後の利用規約の全ての記載内容に同意したものとみなされます。"
          ]
        },
        アカウント登録: {
          title: "",
          desc: "<p></p>",
          list: []
        },
        個人情報: {
          title: "",
          desc:
            "<p>弊社は、個人情報を<a href='/about/pp'>「プライバシーポリシー」</a>に基づき、適切に取り扱うものとします。</p>",
          list: []
        },
        禁止事項: {
          title: "",
          desc: "<p></p>",
          list: []
        },
        権利: {
          title: "",
          desc: "<p></p>",
          list: []
        },

        作品: {
          title: "投稿作品及び投稿コンテンツ",
          desc: "<p></p>",
          list: [
            "本サービスを利用して投稿した作品及び投稿コンテンツの著作権、商標権、意匠権、特許権等の知的財産権及びその他の一切の法的権利は、弊社及び他の会社が本規約等に別途定める場合を除き、すべて作品及びコンテンツを投稿したご本人様が保有するものとします。"
          ]
        },
        活動報酬: {
          title: "",
          desc: "<p></p>",
          list: []
        },
        削除権限: {
          title: "",
          desc: "<p></p>",
          list: []
        },
        準拠法及: {
          title: "",
          desc: "<p></p>",
          list: []
        }
      }
    };
  }
};
</script>

<style lang="scss">
.tos-page {
  $self: &;
  header {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid grey;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  &__container {
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: #f7fafc;
    color: #4c555a;
    #{$self}__content {
      #{$self}__title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 2rem;
      }
      #{$self}__desc {
        font-size: 1.6rem;
      }
      #{$self}__list {
        margin-top: 1rem;
        #{$self}__item {
          padding-left: 3rem;
          margin-bottom: 1rem;
        }
        #{$self}__text {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
