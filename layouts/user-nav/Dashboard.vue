<template>
  <div class="d-nav-all">
    <div class="d-nav-h" style="z-index:1000;">
      <div class="dashboard-h-menu flex-row flex--between">
        <div class="divider flex-row flex--align">
          <div class="dashboard-icon">
            <i class="el-icon-menu" @click="menuDrawer"></i>
          </div>
          <nuxt-link v-ripple tag="div" to="/" class="site-logo">ノーブル</nuxt-link>
        </div>
        <div class="flex-divider flex-row">
          <div
            @click.stop="$store.commit('SET_CONTRACT_MODAL_STATE')"
            class="contract-button button--shadow button"
            :class="{'contract-button--pending':author.status==='pending', }"
            v-if="author.status !== 'verified'"
            v-text="author.status==='pending'? '本人確認を検討中': '本人確認を行う'"
          >
            <fa icon="file-contract" class style="margin-right:5px;"></fa>
          </div>
          <!-- <div
            class="contract-button contract-button--pending button--shadow button"
            v-if="author.verified === 'pending'"
          ></div>-->
          <nuxt-link
            v-if="$route.name ==='dashboard-books-id-index-draft'||$route.name ==='dashboard-books-id-index-published'||$route.name ==='dashboard-books-id-index'||$route.name ==='dashboard-books-id-index-deleted'||$route.name ==='dashboard-books-id-new'"
            class="write-chapter"
            :to="{path: `new`}"
            v-ripple
          >
            <fa icon="pen-nib" style="margin-right:1rem;"></fa>新しい話を書く
          </nuxt-link>

          <nuxt-link
            v-else
            :to="'/dashboard/books/new'"
            class="write-book button--shadow button button--primary--open"
          >
            <fa icon="pen-nib" class style="margin-right:5px;"></fa>本を書く
          </nuxt-link>
        </div>
      </div>

      <div class="create-books" v-if="writeBookState">
        <book-form v-click-outside="bookOff"></book-form>
      </div>
    </div>
    <nav class="d-nav-v" :class="$store.state.dashboardMenuState">
      <ul>
        <li>
          <div
            v-if="$store.state.dashboardMenuState === 'dashboard-active'"
            class="dashboard-profile"
            style="margin-bottom:1rem;"
          >
            <v-avatar size="130" class="elevation-1">
              <v-img :src="author.avatar"></v-img>
            </v-avatar>
          </div>
          <div v-else class="flex-row flex--align flex--center" style="margin-bottom:1rem;">
            <v-avatar size="40" class="elevation-1">
              <v-img :src="author.avatar"></v-img>
            </v-avatar>
          </div>
        </li>
        <li v-for="menu in menus" :key="menu.title">
          <nuxt-link class="d-nav-v-list" :to="menu.link">
            <fa :icon="menu.icon" class="d-nav-v-icons"></fa>
            <p v-if="$store.state.dashboardMenuState === 'dashboard-active'">{{menu.title}}</p>
            <p v-else></p>
          </nuxt-link>
        </li>
      </ul>
      <hr />
    </nav>
    <create-author></create-author>
    <transition name="grow-shrink">
      <ContractForm v-if="contract"></ContractForm>
    </transition>
    <transition name="grow-shrink">
      <volume-form v-if="volume"></volume-form>
    </transition>
  </div>
</template>
<script>
// import HomeIcon from "../../assets/home-icon";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { mapGetters } from "vuex";

export default {
  name: "Vertical",
  props: ["value"],
  async mounted() {
    // await this.$store.dispatch("user/fetchAuthor");
  },
  data() {
    return {
      draw: null,
      writeBookState: false,
      // avatarFixed: this.avatar,
      menus: [
        {
          title: "ダッシュボード",
          icon: "map",
          link: "/dashboard",
          meta: ""
        },
        {
          title: "本棚",
          icon: "book",
          link: "/dashboard/books",
          meta: "search"
        },
        {
          title: "アナリティクス",
          icon: "chart-pie",
          link: "/dashboard/analytics",
          meta: "analytics"
        },
        {
          title: "収入",
          icon: "yen-sign",
          link: "/dashboard/earning",
          meta: "comments"
        }
      ]
    };
  },
  components: {
    // HomeIcon
    BookForm: () => import("@/components/Dashboard/Forms/Book"),
    CreateAuthor: () => import("@/components/Dashboard/Forms/Author"),
    ContractForm: () => import("@/components/Dashboard/Forms/Contract"),
    VolumeForm: () => import("@/components/Dashboard/Forms/Volume")
  },
  watch: {
    // fetchUserId: function() {
    //   ;
    // }
  },
  computed: {
    ...mapGetters({
      author: "user/getAuthor",
      contract: "getContractModalState",
      volume: "getVolumeModalState"
    })
  },
  methods: {
    menuDrawer() {
      this.$store.commit("DASHBOARD_MENU_STATE_CHANGE");
    },
    bookOff() {
      this.writeBookState = false;
    }
  }
};
</script>





<style lang="scss"  scoped>
.nuxt-link-exact-active {
  background-color: rgb(227, 236, 245);
}
.write-book.nuxt-link-exact-active {
  background-color: $primary !important;
  color: white !important;
}
.write-chapter {
  font-size: 1.6rem;
  padding: 0.8rem 2rem;
  background-color: #f6f9fc;
  color: #4f566b;
  box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(42, 47, 69, 0.12) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  margin-right: 4.5rem;
}
.create-books {
  margin: auto;
  width: 40%;

  z-index: 4000;
}
.contract-button {
  // color: white;
  color: #4554ff;
  width: 15rem;
  font-size: 1.6rem;
  margin-right: 1rem;
  transition: 300ms;
  &--pending {
    background-color: #4554ff;
    color: white;
  }
  &:hover {
    background-color: #4554ff;
    color: white;
    transition: 300ms;
  }
}
.d-nav-h {
  width: 100vw;
  box-shadow: 0px 2px 3px 0px rgba(245, 226, 245, 1);
  height: 50px;
  position: fixed;
  top: 0;
  background-color: white;
}
.dashboard-h-menu {
  display: flex;
  align-items: center;
  height: 100%;
  .write-book {
    height: 40px;
    width: 150px;
    font-size: 16px;
    margin-right: 45px;
  }
}
.el-icon-menu {
  margin-left: 16px;
  font-size: 3rem;
  color: #c9b1f5;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    color: #9a7fcc;
    transition: 200ms;
  }
  &:active {
    background-color: #dbd4e9;
    transition: 200ms;
  }
}

.dashboard-logo {
  margin-left: 16px;
  height: 32px;
}
.dashboard-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  &-pic {
    box-shadow: 1px 1px 5px 0px rgb(172, 170, 170);
    width: 125px;
    border-radius: 100px;
    margin-bottom: 5px;
  }
}
.menu-inactive {
  left: -25rem !important;
  transition: 300ms;
}
.d-nav-all {
}

.d-nav-all .dashboard-inactive {
  width: 55px !important;
  background-color: white;
}
.d-nav-v-list {
  color: $primary;
}

.d-nav-v {
  /* display: none; */
  padding-top: 1rem;
  width: 255px;
  min-height: 100vh;
  position: fixed;
  top: 50px;
  // top: 50px;
  left: 0.1rem;
  box-shadow: 2px 0px 3px 0px rgba(245, 226, 245, 1);

  overflow: auto;

  transition: 300ms;
  // animation: appearSlides 300ms;
  ul {
    padding-bottom: 1rem;
  }
  &-list {
    display: flex;
    // padding: 1rem;
    padding-left: 16px;
    align-items: center;
    // justify-content: center;
    text-align: left;
    font-size: 2.5rem;
    height: 48px;

    p {
      font-size: 1.7rem;
    }
    /* position: relative; */
    &:hover {
      cursor: pointer;
      background-color: rgb(227, 236, 245);
    }
  }
  &-icons {
    margin-right: 3rem;
    font-size: 2.5rem;
    width: 20px;
  }
}
.update {
  font-size: 1.35rem;
  margin-top: 10px;
  background-color: #f5f6fc;
  padding: 10px;

  /* border-radius: 5px; */
  position: relative;
  transition: 200ms;

  box-shadow: 0.5px 0.5px 0.5px 1px rgba(116, 114, 114, 0.48);

  &::before {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 6px;
    height: 6px;
    margin-right: 6px;
    content: "";
    border-radius: 8px;
    background-color: #8860d0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.019);
    transition: 200ms;
  }
  &-title {
    display: flex;
    align-items: center;
    &-text {
      font-size: 1.35rem;
    }
  }

  &-time {
    font-size: 1.5rem;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    opacity: 0.8;
  }
  &-list {
    padding: 5px;
  }
  &-chapter {
    font-size: 1.35rem;
  }
}

@keyframes content-enter {
  from {
    visibility: hidden;
    width: 0rem;
  }
  to {
    visibility: visible;
    width: 25rem;
  }
}
@keyframes content-leave {
  from {
  }
  to {
  }
}
@keyframes appearSlides {
  from {
    left: -25rem;
  }
  to {
    left: 0rem;
  }
}
</style>
