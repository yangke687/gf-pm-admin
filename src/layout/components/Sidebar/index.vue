<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
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
            >{{ route.meta.title }}</span>
            <!-- 二级子菜单 -->
            <template v-for="(subRoute, subIdx) in route.children">
              <el-menu-item
                :index="subRoute.path"
                :key="subIdx"
              >
                <span
                  v-if="subRoute.meta.title"
                  slot="title"
                >{{ subRoute.meta.title }}</span>
              </el-menu-item>
            </template>
            <!-- end of 二级子菜单  -->
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
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  @Prop({ default: '' }) private basePath!: string

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
}

.el-sub-menu {
  .el-menu--popup-bottom-start{
    margin-top: 0;
  }

  .el-menu {
    background-color: $subMenuBg !important;

    .el-menu-item {
      background-color: $subMenuBg !important;

      &:hover,&.is-active {
        color: $subMenuActiveText !important;
        background-color: $subMenuActiveBg !important;
      }
    }
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
