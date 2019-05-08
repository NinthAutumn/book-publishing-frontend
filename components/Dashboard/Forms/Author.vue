<template>
  <v-dialog
    content-class="create-author"
    v-model="isAuthor"
    persistent
    max-width="600px"
    hide-overlay
  >
    <v-card>
      <v-card-title>
        <span class="headline">作者になる</span>
      </v-card-title>
      <div class="flex-divider flex-row flex--align flex--center">
        <croppa
          :accept="'image/*'"
          :canvas-color="'default'"
          :placeholder="'作者としてのアバター'"
          v-model="author.avatar"
        ></croppa>
      </div>
      <v-card-text>
        <v-text-field
          v-model="author.penname"
          v-validate="'required|max:10'"
          required
          :counter="10"
          :error-messages="errors.collect('penname')"
          label="ペンネーム*"
          name="penname"
          data-vv-name="ペンネーム"
          style="font-size:1.6rem!important"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="createAuthor">作者になる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      author: {
        penname: "",
        avatar: {}
      }
    };
  },
  computed: {
    isAuthor() {
      return this.$store.getters["user/isAuthor"];
    }
  },
  methods: {
    async createAuthor() {
      const author = {
        avatar: this.$store.state.upload.url,
        penname: this.author.penname
      };
      console.log(this.author.penname);
      // return;
      try {
        const uploaded = await this.$store.dispatch(
          "upload/image",
          this.author.avatar.chosenFile
        );

        await this.$store.dispatch("user/postAuthor", { author });
        this.$message({
          message: "おめでとうございます、あなたは作者になりました",
          type: "success"
        });
      } catch (error) {
        this.$message({
          message: "作者の作成に失敗しました",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.create-author {
  z-index: 10;
  &::after {
    content: "";
    width: 100vw;
    height: 100vw;
    color: grey;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .v-text-field__slot {
    font-size: 1.6rem !important;
  }
  .v-input__slot {
    font-size: 1.6rem !important;
  }
  .book-upload {
  }
  .croppa-container {
    border-radius: 100px;
  }
  .v-btn__content {
    font-size: 1.4rem !important;
  }
}
</style>
