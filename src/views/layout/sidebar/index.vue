<template>
  <div>
    <el-menu
      :default-active="$route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
      router
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
    >
      <sidebar-item :menu="getrouters"/>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["getrouters", "getsidebar"]),
    isCollapse() {
      return !this.getsidebar.opened;
    },
    variables() {
      return variables;
    }
  }
};
</script>
<style></style>
