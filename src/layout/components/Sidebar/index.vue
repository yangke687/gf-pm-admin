<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      :router="true"
      mode="horizontal"
    >
      <!-- <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      /> -->
      <template v-for="(route,idx) in routes">
        <!-- 隐藏的菜单项不显示 -->
        <template v-if="route.meta && route.meta.hidden" />
        <!-- 显示的菜单项 -->
        <template v-else>
          <!-- 只有一级的菜单 -->
          <el-menu-item
            v-if="
              theOnlyOneChild(route) &&
              !theOnlyOneChild(route).children &&
              theOnlyOneChild(route).meta"
            :key="idx"
            :index="route.path"
          >
            <span
              v-if="theOnlyOneChild(route).meta.title"
              slot="title"
            >{{ theOnlyOneChild(route).meta.title }}</span>
          </el-menu-item>
          <!-- 含有子级的菜单 -->
          <el-submenu v-else
            :index="route.path"
            :key="idx"
            popper-class="el-sub-menu"
          >
            <span
              v-if="route.meta.title"
              slot="title"
              @mouseover="resetThirdLvlMenuItems"
            >{{ route.meta.title }}</span>

            <!-- 向上箭头 -->
            <div class="arrow-up-box" />

            <!-- 二级子菜单 -->
            <div class="second-lvl-menu">
              <template v-for="(subRoute, subIdx) in route.children">
                <el-menu-item
                  :index="subRoute.path"
                  :key="subIdx"
                >
                  <span
                    v-if="subRoute.meta.title"
                    slot="title"
                    @mouseover="setThirdLvlMenuItems(subRoute)"
                  >{{ subRoute.meta.title }}</span>
                </el-menu-item>
              </template>
            </div>
            <!-- end of 二级子菜单  -->

            <!-- 三级子菜单 -->
            <div class="third-lvl-menu" v-if="thirdLvlMenuItems.length">
              <div class="third-lvl-menu-container">
                <div
                  class="third-lvl-menu-entry"
                  v-for="(route, idx) in thirdLvlMenuItems"
                  :key="idx"
                >
                  <i class="icon-24" :class="route.meta.icon" />
                  <span>{{ route.meta.title }}</span>
                </div>
              </div>
            </div>
            <!-- end of 三级子菜单 -->

          </el-submenu>
          <!-- end of 含有子级的菜单 -->
        </template>
      </template>
    </el-menu>
  <!-- </el-scrollbar> -->
</template>

<script lang="ts">
import { RouteConfig } from 'vue-router'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
// import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'

@Component({
  name: 'SideBar',
  components: {
  // SidebarItem
  }
})
export default class extends Vue {
  @Prop({ default: '' }) private basePath!: string

  private thirdLvlMenuItems = [];

  get sidebar() {
    return AppModule.sidebar
  }

  get routes() {
    return (this.$router as any).options.routes
  }

  get variables() {
    return variables
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  get isCollapse() {
    return !this.sidebar.opened
  }

  private showingChildNumber(route: RouteConfig): number {
    if (route.children) {
      const showingChildren = route.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  private theOnlyOneChild(route: RouteConfig) {
    if (this.showingChildNumber(route) > 1) {
      return null
    }
    if (route.children) {
      for (const child of route.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    return { ...route, path: '' }
  }

  private setThirdLvlMenuItems(subRoute: any) {
    this.thirdLvlMenuItems = subRoute.children || []
  }

  private resetThirdLvlMenuItems() {
    this.thirdLvlMenuItems = []
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}

.el-menu-item, .el-submenu {
  &.is-active {
    border: none !important;
  }

  .el-submenu__title {
    border: none !important;
  }

  .el-submenu__icon-arrow, .el-icon-arrow-down {
    display: none;
  }
}

.el-sub-menu {
  position: relative;

  .third-lvl-menu {
    margin: -5px 0;
    background: white;
    box-shadow: 0px 3px 6px #E4E7ED;
    width: 600px;
    min-height: 300px;

    &-container {
      width: 800px;
      height: 100%;
      padding: 28px 25px;
    }

    &-entry {
      @include flex-align-items-center;
      display: inline-flex;
      margin-right: 20px;
      padding: 10px 15px;
      border: 1px solid #E4E7ED;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;

      > i {
        margin-right: 10px;
      }
    }
  }

  .el-menu--popup-bottom-start{
    margin-top: 0;
  }

  .el-menu {
    display: flex;
    background-color: $subMenuBg !important;
    min-width: 115px;
    justify-content: center;

    .el-menu-item {
      background-color: $subMenuBg !important;
      text-align: center;
      padding: 0 30px;

      &:hover,&.is-active {
        color: $subMenuActiveText !important;
        background-color: $subMenuActiveBg !important;
      }
    }
  }

  .arrow-up-box {
    position: absolute;
    left: 0;
    top: -26px;
    width: 0;
    height: 0;
    border: 13px solid red;
    border-color: $subMenuBg;
    border-color: transparent transparent $subMenuBg transparent;
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.el-menu {
  border: none;
}
</style>
