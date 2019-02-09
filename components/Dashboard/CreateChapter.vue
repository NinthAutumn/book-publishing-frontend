
<template>
  <div class="chapter-form">
    <form action class="flex flex-column">
      <!-- <h3></h3> -->
      <div class="form-control flex-column">
        <textarea placeholder="前書き" name="header" id rows="5"></textarea>
      </div>
      <div class="form-control">
        <input placeholder="タイトル" type="text" class="chapter-title form-input" v-model="form.title">
      </div>
      <div class="form-control" style="height:500px;">
        <vue-editor
          class="chapter-content-new"
          :editorToolbar="customToolbar"
          v-model="form.content"
          placeholder="本文"
        ></vue-editor>
      </div>
      <div class="form-control flex-column">
        <textarea placeholder="後書き" name="footer" id rows="5"></textarea>
      </div>
      <div class="form-control flex flex--right">
        <input type="submit" class="form-submit chapter-new-submit" value="話を投稿する">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        date: "",
        extra: {
          announcement: {
            header: "",
            footer: ""
          }
        }
      },
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ],
      lang: {
        days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
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
          date: "日にちを選ぶ(選ばなかったら関係ない)",
          dateRange: "Select Date Range"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.chapter-new-submit {
  margin-bottom: 10px;
}
.ql-editor.ql-blank:before {
  font-style: none;
}
.ql-snow * {
  font-size: 16px;
}
.ql-toolbar.ql-snow {
  border: 0px solid $review-color !important;
  border-bottom: 0 !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  // border-top-left-radius: 10;
  // border-top-right-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
  p {
    font-size: 16px;
  }
}
.ql-container.ql-snow {
  border: 0px solid $review-color !important;
  // border-radius: 10px;
  p {
    font-size: 16px;
  }
  background-color: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: #796477;
  box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
}
.chapter-form {
  label * {
    font-size: 16px;
  }
  .draft-checkbox {
    // height: 50px;
    font-size: 16px;
  }
  textarea {
    resize: none;
    font-size: 16px;
    padding: 10px;
    border: none;
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    margin-bottom: 10px;
    color: #a3a3a3;
    &:focus {
      outline: none;
    }
  }
  .chapter-title {
    width: 100%;
    border: none;
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    margin-bottom: 10px;
    &:focus {
      outline: none;
    }
  }
  .chapter-content-new {
    margin-bottom: 10px;
    // height: 100vh;
    height: 88%;
  }
}
</style>
