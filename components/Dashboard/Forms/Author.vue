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
import { mapGetters } from "vuex";
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
    ...mapGetters({
      isAuthor: "user/isAuthor",
      url: "upload/getUrl"
    })
  },
  methods: {
    async createAuthor() {
      // return;
      try {
        this.author.avatar.generateBlob(
          blob => {
            this.$store
              .dispatch("upload/uploadAvatar", blob)
              .then(async url => {
                const author = {
                  avatar: url.url,
                  pen_name: this.author.penname
                };

                await this.$store.dispatch("user/postAuthor", { author });
                this.$toast.success("おめでとうございます、作者になりました", {
                  duration: 1200
                });
              });
          },
          "image/jpeg",
          0.8
        );
      } catch (error) {
        this.$toast.error("作者の作成に失敗しました", {
          duration: 1200,
          icon: "extension"
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
    // border-radius: 100px;
    border: 1px solid rgb(219, 219, 219);
    // box-shadow: inset 1px 1px 5px rgb(238, 238, 238);
  }
  .v-btn__content {
    font-size: 1.4rem !important;
  }
}
</style>
