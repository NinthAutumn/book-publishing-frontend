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
      <!-- <div class="flex-divider flex-row flex--align flex--center"> -->
      <div class="create-author__avatar flex-column flex--align">
        <v-avatar size="150" @click.stop="picture =!picture">
          <v-img :src="author.avatar"></v-img>
        </v-avatar>
        <button @click.stop="picture =!picture" class="create-author__upload">アバターを投稿</button>
        <drawing-modal
          :current="user.avatar?user.avatar:avatar"
          :multiple="false"
          @close="picture = !picture"
          v-model="author.avatar"
          editor
          cover
          v-if="picture"
        ></drawing-modal>
      </div>
      <!-- </div> -->

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
      <div class="create-author__error" v-if="author_error" v-text="author_error"></div>
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
        avatar: ""
      },
      picture: false,
      author_error: "",
      url: ""
    };
  },
  mounted() {
    this.author.avatar = this.user.avatar;
    this.author.penname = this.user.username;
  },
  components: {
    DrawingModal: () => import("@/components/Web/Modals/Image/ImageList")
  },
  computed: {
    ...mapGetters({
      isAuthor: "user/isAuthor",
      user: "auth/getUser"
    })
  },
  methods: {
    async createAuthor() {
      try {
        const author = {
          avatar: this.author.avatar,
          pen_name: this.author.penname
        };
        const { error, code } = await this.$store.dispatch("user/postAuthor", {
          author
        });
        if (error) {
          if (code === 100) {
            this.$router.push("/");
          }
          this.author_error = error;
          return this.$toast.error(error);
        }
        this.$toast.success("おめでとうございます、作者になりました", {
          duration: 1200
        });
      } catch (error) {
        console.log(error);
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
  &__avatar {
    width: 100%;
    // display:
  }
  &__upload {
    margin-top: 1rem;
    font-size: 1.4rem;
    padding: 0.75rem 2rem;
    background-color: $secondary;
    color: white;
    border-radius: 0.5rem;
  }
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
  &__error {
    font-size: 1.4rem;
    color: orangered;
    margin: 0.5rem 0;
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
