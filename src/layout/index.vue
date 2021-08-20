<template>
  <el-container
    :class="classObj"
    class="app-wrapper"
  >
    <!-- <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->

    <!-- 头部 -->
    <el-header>
      <!-- Logo -->
      <div style="display: flex;">
        <div class="brand">YYDS物业公司名称</div>
        <!-- 导航栏 -->
        <sidebar class="sidebar-container" />
      </div>
      <!-- 用户头像 -->
      <div class="profile">
        <navbar />
      </div>
    </el-header>

    <!-- 主内容 -->
    <el-main class="main-container">
      <!-- 模块导航 -->
      <div class="nav-container">
        <router-link :class="{active: $route.path === '/dashboard'}" to="/dashboard">工作台</router-link>
        <router-link :class="{active: $route.path === '/call-center'}" to="/call-center">呼叫中心</router-link>
        <router-link :class="{active: $route.path === '/serv-center'}" to="/serv-center">客服中心</router-link>
        <router-link :class="{active: $route.path === '/secure-center'}" to="/secure-center">安保中心</router-link>
      </div>
      <!-- 主页面 -->
      <app-main />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import { DeviceType, AppModule } from '@/store/modules/app'
import { AppModule } from '@/store/modules/app'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/resize'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      // hideSidebar: !this.sidebar.opened,
      // openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation
      // mobile: this.device === DeviceType.Mobile
    }
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false)
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  @include flex-justify-space-between;
  padding: 0 70px;
  background: $menuBg;

  .brand {
    @include flex-align-items-center;
    margin-right: 115px;
    color: #FFF;
    font-size: 20px;
  }
}

.el-main {

}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
}

.nav-container {
  @include flex-horizon;

    > a {
      display: block;
      margin-left: 5px;
      padding: 11px 22px;
      color: #E6A23C;
      background: #FFF7EB;
      font-size: 14px;
      border-radius: 4px 4px 0px 0px;
      cursor: pointer;

       &.active, &:hover {
        color: #fff;
        background: #FCB140;
      }
    }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  padding: 17px 0 0 70px;
  transition: margin-left .28s;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  // width: $sideBarWidth !important;
  // height: 100%;
  // position: fixed;
  // font-size: 0px;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // z-index: 1001;
  // overflow: hidden;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
