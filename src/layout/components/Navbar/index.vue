<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    /> -->
    <!-- <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    /> -->
    <div class="right-menu">
      <div class="notice">
        <i class="el-icon-bell"></i>
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <!-- <a
            target="_blank"
            href="https://github.com/armour/vue-typescript-admin-template/"
          >
            <el-dropdown-item>
              Github
            </el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://armour.github.io/vue-typescript-admin-docs/"
          >
            <el-dropdown-item>
              Docs
            </el-dropdown-item>
          </a> -->
          <el-dropdown-item>
            <span
              style="display:block;"
              @click="logout"
            >退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户名 -->
      <div class="username">YYDS0615</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  get avatar() {
    return UserModule.avatar
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  private async logout() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  // height: 50px;
  // overflow: hidden;
  // position: relative;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  // .hamburger-container {
  //   line-height: 46px;
  //   height: 100%;
  //   float: left;
  //   padding: 0 15px;
  //   cursor: pointer;
  //   transition: background .3s;
  //   -webkit-tap-highlight-color:transparent;

  //   &:hover {
  //     background: rgba(0, 0, 0, .025)
  //   }
  // }

  // .breadcrumb-container {
  //   float: left;
  // }

  display: flex;
  height: 100%;

  .notice {
    margin-right: 22px;
    font-size: 28px;
    color: #EEE;
    cursor: pointer;
  }

  .right-menu {
    @include flex-align-items-center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 4px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }
    }

    .username{
      color: #FFF;
      font-size: 14px;
    }
  }
}
</style>
