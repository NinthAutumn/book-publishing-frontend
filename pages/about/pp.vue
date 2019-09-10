<template>
  <div class="privacy-policy">
    <div class="privacy-policy__container">
      <header class="privacy-policy__header">プライバシーポリシー</header>
      <div class="privacy-policy__content">
        <div class="privacy-policy__title">はじめに</div>
        <div class="privacy-policy__desc">
          <p>語句の定義は利用規約に準じるものとします。</p>
          <br />
          <p>弊社は、本サービスのユーザの個人情報をお預かりしております。</p>
          <br />
          <p>弊社は、ユーザにより良いサービスを提供するために、個人情報の適切な収集を行い、利用の為の具体的なルールを定め、ユーザの個人情報の適切な取扱いに努めてまいります。</p>
          <br />
          <p>弊社は個人情報に関してのルールが適切に守られているかを常にチェックし、ユーザの個人情報の適切な取扱いに努めてまいります。</p>
          <br />
          <p>弊社は、個人情報に関する法令を遵守致します。</p>
        </div>
      </div>
      <div class="privacy-policy__content">
        <div class="privacy-policy__title">１．適用範囲</div>
        <div class="privacy-policy__desc">
          <p>
            本方針はユーザが本サービスを利用される場合に適応されます。
            本サービス内より遷移する広告先、 並びに本サービスを通じて情報発信を行っているユーザのサイトを利用した結果残された個人情報に関しましては、本方針の適用範囲外とさせて頂きます。
          </p>
        </div>
      </div>
      <div class="privacy-policy__content">
        <div class="privacy-policy__title">２．個人情報の取得について</div>
        <div class="privacy-policy__desc">
          <p>弊社は、偽りその他不正の手段によらず適正に個人情報を取得致します。</p>
          <br />
          <p>一部ページでIPアドレスなどの利用者情報を取得していますが、裁判所等からの正式な要請なき場合と本人許可を得てストライプに提供することはありますが、その情報をストライプ以外の第三者に公開することは一切ありません。</p>
          <br />
          <p>当グループは本サービスにおいてクッキーをユーザのコンピュータに保存し、参照することがあります。</p>
          <br />
          <p>また、本サービス内で広告を表示している会社及び弊社へアクセス解析サービスを提供している会社がユーザのコンピュータ内にクッキーを保存し参照することがあります。 この場合、広告主及びアクセス解析サービスの提供者によるクッキーの利用は、広告主等のプライバシーの考え方に従って行われます。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false
};
</script>

<style lang="scss">
.privacy-policy {
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
    padding: 3rem 20rem;
    // margin: 0 5rem;
    border-radius: 0.5rem;
    background-color: #f7fafc;
    color: #4c555a;
    a {
      color: $secondary;
    }
    #{$self}__content {
      margin-bottom: 1rem;
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
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
