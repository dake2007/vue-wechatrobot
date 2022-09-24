<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img :src="user_pic" alt="" class="avatar" v-if="user_pic" />
            <img src="../../assets/images/avatar.jpg" class="avatar" alt="" v-else />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/images/avatar.jpg" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏的导航区域 -->
        <el-menu
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <!-- 不包含子菜单的“一级菜单” -->
          <el-menu-item index="/home"><i class="el-icon-s-tools"></i>首页</el-menu-item>
          <el-submenu index="/my">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/personal"><i class="el-icon-s-custom"></i>基本信息</el-menu-item>
            <el-menu-item index="/avatar"><i class="el-icon-s-custom"></i>修改头像</el-menu-item>
            <el-menu-item index="/repassword"><i class="el-icon-s-custom"></i>修改密码</el-menu-item>
          </el-submenu>
          <!-- 包含子菜单的“一级菜单” -->
          <el-submenu index="/pson">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>智能配置</span>
            </template>
            <el-menu-item index="/basic"><i class="el-icon-s-custom"></i>基础配置</el-menu-item>
            <el-menu-item index="/reply"><i class="el-icon-s-custom"></i>关键词回复</el-menu-item>
            <el-menu-item index="/events"><i class="el-icon-s-custom"></i>关键词事件</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>好友管理</span>
            </template>
            <el-menu-item index="2-1"><i class="el-icon-s-custom"></i>好友列表</el-menu-item>
            <el-menu-item index="2-2"><i class="el-icon-s-custom"></i>每日说任务</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i
                class="el-icon-s-promotion
"
              ></i>
              <span>群管理</span>
            </template>
            <el-menu-item index="3-1"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >群列表</el-menu-item
            >
            <el-menu-item index="3-2"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >多群消息同步</el-menu-item
            >
            <el-menu-item index="3-3"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >关键词入群</el-menu-item
            >
            <el-menu-item index="3-4"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >群资讯任务</el-menu-item
            >
            <el-menu-item index="3-5"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >群定时任务</el-menu-item
            >
            <el-menu-item index="3-6"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >群合影</el-menu-item
            >
            <el-menu-item index="3-7"
              ><i
                class="el-icon-s-promotion
"
              ></i
              >群词云</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span>素材中心</span>
            </template>
            <el-menu-item index="4-1"><i class="el-icon-picture"></i>文字素材</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-picture"></i>文件素材</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'my-layout',
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    quitFn () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', '')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          })
        })
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
.el-aside {
  overflow-y: scroll;
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
