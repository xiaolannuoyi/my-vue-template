<template>
  <div class="header">
    <div id="header-sidebar-open-close">
      <i
        :class="[
        getsidebar.opened ? 'el-icon-caret-right' : 'el-icon-caret-left',
        'icon'
      ]"
        @click="toggleSideBar"
      ></i>
    </div>

    <!-- 右侧下拉菜单 -->
    <el-dropdown class="avatar-container" id="header-right">
      <span>
        <img :src="getavatar + '?imageView2/1/w/40/h/40'" class="user-avatar">
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    // logout() {
    // this.$store.dispatch("LogOut").then(() => {
    //   location.reload(); // 为了重新实例化vue-router对象 避免bug
    // });
    // },
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push(`/login`);
    }
  },
  computed: {
    ...mapGetters(["getsidebar", "getavatar"])
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #ccc;
  height: 60px;
}
.icon {
  font-size: 40px;
  margin-top: 10px;
}
.avatar-container {
  height: 40px;
  display: inline-block;
  position: absolute;
  right: 35px;
  margin-top: 10px;
}
.user-avatar {
  border-radius: 10px;
  cursor: pointer;
}
#header-sidebar-open-close {
  display: inline-block;
}
</style>
