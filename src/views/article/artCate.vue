<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>基础配置</span>
        <el-button type="primary" size="mini">添加配置</el-button>
      </div>
      <!-- 分类数据的表格 -->
      <template>
        <el-table :data="cateList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="100px"> </el-table-column>
          <el-table-column prop="name" label="分类名称"> </el-table-column>
          <el-table-column prop="alias" label="分类别名"> </el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: []
    }
  },
  created () {
    this.getArtCateFn()
  },
  methods: {
    async getArtCateFn () {
      const res = await getArticleAPI()
      this.cateList = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
